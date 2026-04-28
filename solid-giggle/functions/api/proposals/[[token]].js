export async function onRequestGet(context) {
  try {
    var env = context.env;
    var token = context.params.token;
    if (Array.isArray(token)) token = token.join("");

    if (!env.PROPOSALS) return json({ error: "KV not bound" }, 500);

    var data = await env.PROPOSALS.get("proposal:" + token);
    if (!data) return json({ error: "not_found", message: "This proposal has expired or does not exist." }, 404);

    return new Response(data, { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return json({ error: "Server error: " + err.message }, 500);
  }
}

export async function onRequestPost(context) {
  try {
    var env = context.env;
    var request = context.request;
    var token = context.params.token;
    if (Array.isArray(token)) token = token.join("");

    if (!env.PROPOSALS) return json({ error: "KV not bound" }, 500);

    var data = await env.PROPOSALS.get("proposal:" + token);
    if (!data) return json({ error: "Proposal not found or expired" }, 404);

    var proposal = JSON.parse(data);
    var body = await request.json();

    // Handle edited content save (before or after signing)
    if (body.editedContent) {
      proposal.editedContent = body.editedContent;
      proposal.lastEditedAt = new Date().toISOString();
    }

    // Handle signature finalization
    if (body.clientSignature) {
      if (proposal.status === "signed") return json({ error: "Already signed" }, 409);
      proposal.clientSignature = body.clientSignature;
    }
    if (body.providerSignature) {
      proposal.providerSignature = body.providerSignature;
      proposal.providerSignedAt = new Date().toISOString();
    }
    if (body.clientSignature) {
      proposal.status = "signed";
      proposal.signedAt = new Date().toISOString();
    }

    // Re-store WITHOUT TTL — signed/edited = permanent
    await env.PROPOSALS.put("proposal:" + token, JSON.stringify(proposal));

    return json({ 
      success: true, 
      signedAt: proposal.signedAt, 
      lastEditedAt: proposal.lastEditedAt,
      status: proposal.status 
    });
  } catch (err) {
    return json({ error: "Server error: " + err.message }, 500);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: { "Content-Type": "application/json" } });
}

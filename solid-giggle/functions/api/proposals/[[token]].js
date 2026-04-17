// GET /api/proposals/:token  — Fetch proposal for client viewer
// POST /api/proposals/:token — Sign the proposal

export async function onRequestGet(context) {
  const { env, params } = context;
  const token = params.token.join("");

  const data = await env.PROPOSALS.get(`proposal:${token}`);

  if (!data) {
    return new Response(JSON.stringify({
      error: "not_found",
      message: "This proposal has expired or does not exist.",
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(data, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { env, params, request } = context;
  const token = params.token.join("");

  const data = await env.PROPOSALS.get(`proposal:${token}`);

  if (!data) {
    return new Response(JSON.stringify({ error: "Proposal not found or expired" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const proposal = JSON.parse(data);

  if (proposal.status === "signed") {
    return new Response(JSON.stringify({ error: "Already signed" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();

  proposal.status = "signed";
  proposal.clientSignature = body.clientSignature;
  proposal.signedAt = new Date().toISOString();

  // Re-store WITHOUT TTL so signed proposals live forever
  await env.PROPOSALS.put(
    `proposal:${token}`,
    JSON.stringify(proposal)
  );

  return new Response(JSON.stringify({
    success: true,
    signedAt: proposal.signedAt,
  }), {
    headers: { "Content-Type": "application/json" },
  });
}

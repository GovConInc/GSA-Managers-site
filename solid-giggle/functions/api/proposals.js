// POST /api/proposals
// Called when you click "Generate Proposal" in the admin form
// Stores the proposal in KV with a 48-hour expiration

export async function onRequestPost(context) {
  const { env, request } = context;

  // Check admin password
  const auth = request.headers.get("X-Admin-Key");
  if (auth !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData = await request.json();
    const token = crypto.randomUUID();

    const proposal = {
      token,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 48 * 3600000).toISOString(),
      cageCode: formData.client_uei || "",
      clientName: formData.client_legal_name || "",
      contactName: formData.client_contact_name || "",
      contactTitle: formData.client_contact_title || "",
      contactEmail: formData.client_email || "",
      programType: formData.program_type || "",
      price: formData.price || "",
      termLength: formData.term_length || "",
      paymentTerms: formData.payment_terms || "",
      squareLink: formData.square_checkout_link || "",
      providerCompany: formData.provider_company || "",
      providerSigner: formData.provider_signer_name || "",
      providerTitle: formData.provider_signer_title || "",
      formData: formData,
      clientSignature: null,
      signedAt: null,
    };

    // Store with 48-hour auto-delete
    await env.PROPOSALS.put(
      `proposal:${token}`,
      JSON.stringify(proposal),
      { expirationTtl: 172800 }
    );

    const siteUrl = env.SITE_URL || "https://GSAmanager.com";

    return new Response(JSON.stringify({
      success: true,
      token,
      url: `${siteUrl}/p/proposal.html?id=${token}`,
      expiresAt: proposal.expiresAt,
    }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

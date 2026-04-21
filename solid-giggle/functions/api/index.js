export async function onRequestGet(context) {
  return json({ error: "This endpoint only accepts POST requests. Use the admin form at /admin/" }, 405);
}

export async function onRequestPost(context) {
  try {
    const { env, request } = context;

    var auth = request.headers.get("X-Admin-Key");
    if (!env.ADMIN_PASSWORD || auth !== env.ADMIN_PASSWORD) {
      return json({ error: "Unauthorized" }, 401);
    }

    if (!env.PROPOSALS) {
      return json({ error: "KV not bound. Go to Cloudflare Dashboard > Pages project > Settings > Functions > KV namespace bindings > add PROPOSALS." }, 500);
    }

    var fd = await request.json();
    var token = crypto.randomUUID();

    // Parse price
    var priceCents = 0;
    var displayPrice = fd.price || "";
    if (displayPrice) {
      priceCents = Math.round(parseFloat(displayPrice.replace(/[^0-9.]/g, "")) * 100) || 0;
    }

    // Handle discount
    var discountDisplay = "";
    var finalPrice = displayPrice;
    var discountCents = 0;
    if (fd.discount_amount && fd.discount_amount.trim() !== "") {
      discountCents = Math.round(parseFloat(fd.discount_amount.replace(/[^0-9.]/g, "")) * 100) || 0;
      if (discountCents > 0 && priceCents > 0) {
        discountDisplay = fd.discount_label || ("-$" + (discountCents / 100).toLocaleString());
        priceCents = priceCents - discountCents;
        finalPrice = "$" + (priceCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 });
      }
    }

    // Auto-generate Square checkout link
    var squareLink = fd.square_checkout_link || "";
    if (!squareLink && priceCents > 0 && env.SQUARE_ACCESS_TOKEN && env.SQUARE_LOCATION_ID) {
      try {
        var progNames = { annual_management: "GSA Annual Management", gsa_submission: "GSA Submission Program", gsa_modification: "GSA Modification Program", new_contractor_fcp: "GSA New Contractor FCP" };
        var sqRes = await fetch("https://connect.squareup.com/v2/online-checkout/payment-links", {
          method: "POST",
          headers: { "Square-Version": "2024-01-18", "Authorization": "Bearer " + env.SQUARE_ACCESS_TOKEN, "Content-Type": "application/json" },
          body: JSON.stringify({
            idempotency_key: token,
            quick_pay: {
              name: (progNames[fd.program_type] || "GSA Service") + " - " + (fd.client_legal_name || "Client"),
              price_money: { amount: priceCents, currency: "USD" },
              location_id: env.SQUARE_LOCATION_ID,
            },
          }),
        });
        if (sqRes.ok) {
          var sqData = await sqRes.json();
          if (sqData.payment_link && sqData.payment_link.url) squareLink = sqData.payment_link.url;
        }
      } catch (e) { /* Square failed, continue without */ }
    }

    var proposal = {
      token: token,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 48 * 3600000).toISOString(),
      cageCode: fd.client_uei || "",
      clientName: fd.client_legal_name || "",
      contactName: fd.client_contact_name || "",
      contactTitle: fd.client_contact_title || "",
      contactEmail: fd.client_email || "",
      programType: fd.program_type || "annual_management",
      price: displayPrice,
      finalPrice: finalPrice,
      discountDisplay: discountDisplay,
      discountAmount: fd.discount_amount || "",
      discountLabel: fd.discount_label || "",
      termLength: fd.term_length || "12 months",
      paymentTerms: fd.payment_terms || "Due upon execution",
      squareLink: squareLink,
      providerCompany: fd.provider_company || "",
      providerSigner: fd.provider_signer_name || "",
      providerTitle: fd.provider_signer_title || "",
      majorMods: fd.major_mods_included || "2",
      trainingSessions: fd.training_sessions || "2",
      callsPerMonth: fd.calls_per_month || "1",
      reportingCadence: fd.reporting_support || "Quarterly",
      samSupport: fd.sam_support || "yes",
      eBuySupport: fd.ebuy_support || "yes",
      meetingNotes: fd.meeting_notes || "",
      priorityGoals: fd.priority_goals || "",
      knownPainPoints: fd.known_pain_points || "",
      urgency: fd.urgency || "standard",
      customPhases: (function(){
        var defs=[
          {ph:"Phase 1",pct:25},{ph:"Phase 2",pct:50},{ph:"Phase 3",pct:75},{ph:"Phase 4",pct:100}
        ];
        var any=false;
        var phases=defs.map(function(d,i){
          var n=i+1;
          var t=(fd["phase_"+n+"_title"]||"").trim();
          var dur=(fd["phase_"+n+"_dur"]||"").trim();
          var raw=(fd["phase_"+n+"_items"]||"").trim();
          var items=raw?raw.split("\n").map(function(s){return s.trim();}).filter(Boolean):null;
          if(t||dur||items)any=true;
          return {ph:d.ph,t:t||null,dur:dur||null,items:items,pct:d.pct};
        });
        return any?phases:null;
      })(),
      formData: fd,
      clientSignature: null,
      signedAt: null,
    };

    try {
      await env.PROPOSALS.put("proposal:" + token, JSON.stringify(proposal), { expirationTtl: 172800 });
    } catch (kvErr) {
      return json({ error: "Failed to save proposal: " + kvErr.message }, 500);
    }

    var siteUrl = env.SITE_URL || "https://gsamanager.com";

    return json({ success: true, token: token, url: siteUrl + "/p/proposal.html?id=" + token, squareLink: squareLink, expiresAt: proposal.expiresAt });

  } catch (err) {
    return json({ error: "Server error: " + err.message }, 500);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), { status: status || 200, headers: { "Content-Type": "application/json" } });
}

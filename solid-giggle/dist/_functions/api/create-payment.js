/**
 * Cloudflare Pages Function: /api/create-payment
 *
 * Processes Square payments from the Order page.
 * Receives a card nonce (sourceId) from the Square Web Payments SDK,
 * then charges the card via the Square Payments API.
 *
 * Required Cloudflare environment variables:
 *   SQUARE_ACCESS_TOKEN  – Square OAuth or personal access token
 *   SQUARE_LOCATION_ID   – Your Square location ID
 */

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;

  // ── CORS headers ──
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    // ── Validate env vars ──
    if (!env.SQUARE_ACCESS_TOKEN) {
      return json({ error: "Square not configured: SQUARE_ACCESS_TOKEN is missing. Set it in Cloudflare Pages > Settings > Environment variables." }, 500, corsHeaders);
    }
    if (!env.SQUARE_LOCATION_ID) {
      return json({ error: "Square not configured: SQUARE_LOCATION_ID is missing. Set it in Cloudflare Pages > Settings > Environment variables." }, 500, corsHeaders);
    }

    // ── Parse request body ──
    var body = await request.json();
    var sourceId = body.sourceId;
    var amountCents = body.amountCents;
    var currency = body.currency || "USD";
    var orderInfo = body.order || {};

    if (!sourceId) {
      return json({ error: "Missing payment source (sourceId). Please re-enter your card details." }, 400, corsHeaders);
    }
    if (!amountCents || amountCents < 100) {
      return json({ error: "Invalid payment amount. Minimum charge is $1.00." }, 400, corsHeaders);
    }

    // ── Build idempotency key ──
    var idempotencyKey = crypto.randomUUID();

    // ── Build order description ──
    var serviceNames = {
      "test-payment": "Test Connection",
      "fcp-transition": "FCP Transition & Compliance Assurance",
      "standalone-mod": "Standalone GSA Modification",
      "core-maintenance": "GSA Core Maintenance / Back Office (6 Months)",
      "complete-management": "GSA Complete Management (12 Months)",
      // Legacy ids kept for backward compatibility
      "fcp-baseline": "FCP Catalog Baseline",
      "new-vendor": "New Vendor Special",
      "gsa-submission": "GSA Schedule Submission",
      "contract-management": "GSA Contract Management",
    };
    var serviceList = (orderInfo.services || []).map(function (id) {
      return serviceNames[id] || id;
    }).join(", ");
    var description = "GSA Managers - " + (serviceList || "GSA Service");
    if (orderInfo.companyName) {
      description += " - " + orderInfo.companyName;
    }

    // ── Create Square payment ──
    var squareRes = await fetch("https://connect.squareup.com/v2/payments", {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        "Authorization": "Bearer " + env.SQUARE_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        source_id: sourceId,
        amount_money: {
          amount: amountCents,
          currency: currency,
        },
        description: description,
        location_id: env.SQUARE_LOCATION_ID,
        note: JSON.stringify({
          services: orderInfo.services,
          company: orderInfo.companyName,
          contact: orderInfo.contactName,
          email: orderInfo.email,
          phone: orderInfo.phone,
          uei: orderInfo.dunsUei,
          existingGsa: orderInfo.existingGsa,
          gsaContractNumber: orderInfo.gsaContractNumber,
        }),
      }),
    });

    var squareData = await squareRes.json();

    if (!squareRes.ok) {
      console.error("Square payment error:", JSON.stringify(squareData));
      var errorMsg = "Payment failed";
      if (squareData.errors && squareData.errors.length > 0) {
        errorMsg = squareData.errors[0].detail || squareData.errors[0].code || errorMsg;
      }
      return json({ error: errorMsg }, 400, corsHeaders);
    }

    var payment = squareData.payment || {};

    // ── Optional: Send confirmation email via Resend ──
    if (env.RESEND_API_KEY && orderInfo.email) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + env.RESEND_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "GSA Managers <noreply@gsamanagers.com>",
            to: [orderInfo.email],
            subject: "Payment Confirmation - " + description,
            html: [
              "<h2>Payment Confirmation</h2>",
              "<p>Thank you, <strong>" + (orderInfo.contactName || "Customer") + "</strong>!</p>",
              "<p>Your payment of <strong>$" + (amountCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 }) + "</strong> has been processed.</p>",
              "<p><strong>Services:</strong> " + serviceList + "</p>",
              "<p><strong>Payment ID:</strong> " + (payment.id || "N/A") + "</p>",
              "<hr/>",
              "<p>Our onboarding team will reach out within 1 business day to schedule your kickoff call.</p>",
              "<p>Questions? Call us at (813) 665-0308 or email Info@GSAManagers.com</p>",
            ].join(""),
          }),
        });
      } catch (emailErr) {
        // Email failure should not block the payment response
        console.error("Resend email error:", emailErr.message);
      }
    }

    // ── Return success ──
    return json({
      success: true,
      paymentId: payment.id,
      amount: amountCents,
      currency: currency,
      status: payment.status,
      receiptUrl: payment.receipt_url || "",
    }, 200, corsHeaders);

  } catch (err) {
    console.error("create-payment error:", err);
    return json({ error: "Server error: " + err.message }, 500, corsHeaders);
  }
}

function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json",
      ...(extraHeaders || {}),
    },
  });
}
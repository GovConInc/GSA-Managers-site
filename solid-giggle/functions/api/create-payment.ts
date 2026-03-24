export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const body = await context.request.json();
    const { sourceId, amountCents, currency, order } = body;

    if (!sourceId || !amountCents) {
      return new Response(
        JSON.stringify({ error: "Missing payment source or amount" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Square credentials from Cloudflare environment variables
    const squareAccessToken = context.env.SQUARE_ACCESS_TOKEN;
    const squareLocationId = context.env.SQUARE_LOCATION_ID;
    const squareEnv = context.env.SQUARE_ENV || "sandbox";

    if (!squareAccessToken || !squareLocationId) {
      console.error("SQUARE_ACCESS_TOKEN or SQUARE_LOCATION_ID not configured");
      return new Response(
        JSON.stringify({ error: "Payment processing is not configured" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const baseUrl =
      squareEnv === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com";

    // Create payment via Square Payments API
    const paymentResponse = await fetch(`${baseUrl}/v2/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${squareAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: crypto.randomUUID(),
        amount_money: {
          amount: amountCents,
          currency: currency || "USD",
        },
        location_id: squareLocationId,
        note: `GSA Managers Order — ${order?.companyName || "Unknown"} — ${(order?.services || []).join(", ")}`,
        buyer_email_address: order?.email,
      }),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error("Square payment failed:", JSON.stringify(paymentData));
      const errorDetail =
        paymentData?.errors?.[0]?.detail || "Payment was declined";
      return new Response(
        JSON.stringify({ error: errorDetail }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Optionally send confirmation email via Resend
    const resendApiKey = context.env.RESEND_API_KEY;
    const toEmail = context.env.CONTACT_TO_EMAIL || "Info@GSAManagers.com";

    if (resendApiKey && order?.email) {
      const services = (order.services || []).join(", ");
      const totalDisplay = `$${(amountCents / 100).toLocaleString()}`;

      // Notify the business
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "orders@gsamanagers.com",
          to: toEmail,
          subject: `New Order: ${order.companyName} — ${totalDisplay}`,
          html: `
            <h2>New Order Received</h2>
            <p><strong>Company:</strong> ${order.companyName}</p>
            <p><strong>Contact:</strong> ${order.contactName}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>UEI/DUNS:</strong> ${order.dunsUei || "N/A"}</p>
            <p><strong>Existing GSA:</strong> ${order.existingGsa}</p>
            ${order.gsaContractNumber ? `<p><strong>Contract #:</strong> ${order.gsaContractNumber}</p>` : ""}
            <p><strong>Services:</strong> ${services}</p>
            <p><strong>Total:</strong> ${totalDisplay}</p>
            ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}
            <p><strong>Square Payment ID:</strong> ${paymentData.payment?.id}</p>
          `,
        }),
      }).catch((err) => console.error("Failed to send notification email:", err));

      // Send confirmation to customer
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "orders@gsamanagers.com",
          to: order.email,
          subject: `Order Confirmed — GSA Managers Inc.`,
          html: `
            <h2>Thank you for your order, ${order.contactName}!</h2>
            <p>We've received your payment of <strong>${totalDisplay}</strong> for the following services:</p>
            <p>${services}</p>
            <p>Our team will be in touch within 1 business day to get started.</p>
            <br/>
            <p>— GSA Managers Inc.</p>
            <p>(813) 665-0308 | Info@GSAManagers.com</p>
          `,
        }),
      }).catch((err) => console.error("Failed to send confirmation email:", err));
    }

    return new Response(
      JSON.stringify({
        ok: true,
        paymentId: paymentData.payment?.id,
      }),
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error("Payment endpoint error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

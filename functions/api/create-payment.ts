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
          from: "GSA Managers <info@gsamanagers.com>",
          to: order.email,
          subject: `Welcome to GSA Managers! (Order Receipt)`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #2A9D8F;">Welcome to GSA Managers!</h2>
              <p>Hi ${order.contactName},</p>
              <p>Thank you for choosing GSA Managers. We are thrilled to partner with <strong>${order.companyName}</strong>!</p>
              <p>Our team has received your order and payment. One of our onboarding specialists will be reaching out to you within <strong>1 business day</strong> to schedule your kickoff call and get things moving.</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              
              <h3 style="color: #433E38;">Your Receipt</h3>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p style="margin: 0 0 10px 0;"><strong>Services Ordered:</strong><br/> ${services}</p>
                <p style="margin: 0 0 10px 0;"><strong>Total Paid:</strong> ${totalDisplay}</p>
                <p style="margin: 0; font-size: 12px; color: #888;"><strong>Transaction ID:</strong> ${paymentData.payment?.id}</p>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              
              <p>If you have any immediate questions, feel free to reply directly to this email or call us at <strong>(813) 665-0308</strong>.</p>
              <p>We look forward to working with you!</p>
              <br/>
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 5px 0 0 0;"><strong>The GSA Managers Team</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #888;"><a href="https://gsamanagers.com" style="color: #2A9D8F;">gsamanagers.com</a></p>
            </div>
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

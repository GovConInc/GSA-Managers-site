/**
 * Cloudflare Pages Function: /api/contact
 *
 * Receives contact-form and lead-magnet submissions.
 * Optional Cloudflare environment variables:
 *   GOOGLE_SHEETS_WEBHOOK_URL – Apps Script web app URL (see GOOGLE_SHEETS_SETUP.md)
 *   RESEND_API_KEY            – sends an internal notification email
 *   CONTACT_NOTIFY_EMAIL      – where notifications go (default Info@GSAManagers.com)
 */

export async function onRequestPost(context) {
  var env = context.env;
  var request = context.request;

  try {
    var body = await request.json();

    var name = (body.name || "").toString().trim().slice(0, 200);
    var email = (body.email || "").toString().trim().slice(0, 200);
    var phone = (body.phone || "").toString().trim().slice(0, 50);
    var company = (body.company || "").toString().trim().slice(0, 200);
    var cage = (body.cage || "").toString().trim().slice(0, 20);
    var interest = (body.interest || "").toString().trim().slice(0, 200);
    var bestTime = (body.bestTime || "").toString().trim().slice(0, 100);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, message: "A valid email address is required." }, 400);
    }
    if (!name) {
      return json({ ok: false, message: "Name is required." }, 400);
    }

    var record = {
      date: new Date().toISOString(),
      name: name,
      email: email,
      company: company,
      phone: phone,
      cage: cage,
      interest: interest,
      bestTime: bestTime,
    };

    // ── Log to Google Sheets (optional) ──
    if (env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
      } catch (sheetErr) {
        console.error("Google Sheets webhook error:", sheetErr.message);
      }
    }

    // ── Internal notification via Resend (optional) ──
    if (env.RESEND_API_KEY) {
      try {
        var notifyTo = env.CONTACT_NOTIFY_EMAIL || "Info@GSAManagers.com";
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + env.RESEND_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "GSA Managers <noreply@gsamanagers.com>",
            to: [notifyTo],
            subject: "New Lead: " + (interest || "General Inquiry") + " — " + name,
            html: [
              "<h2>New Website Lead</h2>",
              "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>",
              "<p><strong>Email:</strong> " + escapeHtml(email) + "</p>",
              company ? "<p><strong>Company:</strong> " + escapeHtml(company) + "</p>" : "",
              phone ? "<p><strong>Phone:</strong> " + escapeHtml(phone) + "</p>" : "",
              cage ? "<p><strong>CAGE:</strong> " + escapeHtml(cage) + "</p>" : "",
              "<p><strong>Interest:</strong> " + escapeHtml(interest || "General Inquiry") + "</p>",
              bestTime ? "<p><strong>Best time:</strong> " + escapeHtml(bestTime) + "</p>" : "",
              "<p><strong>Received:</strong> " + record.date + "</p>",
            ].join(""),
          }),
        });
      } catch (emailErr) {
        console.error("Resend notification error:", emailErr.message);
      }
    }

    return json({ ok: true, message: "Submission received." }, 200);
  } catch (err) {
    console.error("contact error:", err);
    return json({ ok: false, message: "Server error: " + err.message }, 500);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json" },
  });
}

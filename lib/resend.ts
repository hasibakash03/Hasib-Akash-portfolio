import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSubmissionNotification(data: {
  name: string; email: string; phone?: string | null;
  businessName: string; website?: string | null;
  revenueRange: string; challenge: string; tierInterest: string;
}) {
  const notifyEmail = process.env.NOTIFICATION_EMAIL ?? "hasib@tradefigur.com";
  
  try {
    await resend.emails.send({
      from: "Portfolio CMS <noreply@tradefigur.com>",
      to: notifyEmail,
      subject: `New ${data.tierInterest} application — ${data.name} (${data.businessName})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#5B2D8E;margin:0 0 4px">New Strategy Application</h2>
          <p style="color:#888;margin:0 0 24px;font-size:14px">From hasibakash.com contact form</p>
          <table style="width:100%;border-collapse:collapse">
            ${[
              ["Name", data.name],
              ["Email", data.email],
              ["Phone/WhatsApp", data.phone || "—"],
              ["Business", data.businessName],
              ["Website", data.website || "—"],
              ["Revenue Range", data.revenueRange],
              ["Tier Interest", data.tierInterest],
            ].map(([l, v]) => `
              <tr>
                <td style="padding:10px 12px;background:#f8f5ff;font-size:12px;font-weight:700;color:#7B5EA7;text-transform:uppercase;letter-spacing:.05em;width:140px;border-bottom:1px solid #ede8f9">${l}</td>
                <td style="padding:10px 12px;font-size:14px;color:#1a0a2e;border-bottom:1px solid #ede8f9">${v}</td>
              </tr>`).join("")}
            <tr>
              <td style="padding:10px 12px;background:#f8f5ff;font-size:12px;font-weight:700;color:#7B5EA7;text-transform:uppercase;letter-spacing:.05em;vertical-align:top">Challenge</td>
              <td style="padding:10px 12px;font-size:14px;color:#1a0a2e;line-height:1.6">${data.challenge}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f0ebff;border-radius:8px">
            <a href="mailto:${data.email}?subject=Re: Your Strategy Diagnostic Application" style="display:inline-block;padding:10px 20px;background:#7B3FBE;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:14px">Reply to ${data.name.split(" ")[0]}</a>
            ${data.phone ? `<a href="https://wa.me/${data.phone.replace(/\D/g,"")}" style="display:inline-block;margin-left:10px;padding:10px 20px;background:#25D366;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:14px">WhatsApp</a>` : ""}
          </div>
        </div>
      `,
    });
  } catch (err) {
    // Don't throw — form submission should succeed even if email fails
    console.error("Resend error:", err);
  }
}

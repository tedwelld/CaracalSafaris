import { REF_LINK } from "@/lib/mailer";

export function emailShell(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#fbf4e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf4e8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#1f140e;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#f06522;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">
              Zimbabwe · Zambia · Botswana
            </p>
            <h1 style="margin:8px 0 0;color:#fbf4e8;font-size:26px;font-weight:normal;font-family:Georgia,serif;">
              Caracal Africa Safaris
            </h1>
            <p style="margin:6px 0 0;color:#f06522;font-size:12px;font-style:italic;font-family:Georgia,serif;">
              Born on the Zambezi. Built for you.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px;">
            ${body}
          </td>
        </tr>
        <tr>
          <td style="background:#1f140e;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#fbf4e8;font-size:11px;font-family:Arial,sans-serif;opacity:0.5;">
              Caracal Africa Safaris · Victoria Falls, Zimbabwe
            </p>
            <p style="margin:8px 0 0;font-size:11px;font-family:Arial,sans-serif;">
              <a href="${REF_LINK}" style="color:#f06522;text-decoration:none;">caracalsafaris.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function detailTable(title: string, rows: [string, string][]) {
  const rowsHtml = rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f9f6f1"};">
        <td style="padding:10px 16px;color:#6b6b6b;font-size:13px;font-family:Arial,sans-serif;width:40%;vertical-align:top;border-bottom:1px solid #e8e0d4;">${label}</td>
        <td style="padding:10px 16px;color:#1f140e;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;border-bottom:1px solid #e8e0d4;">${value}</td>
      </tr>`
    )
    .join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d4;border-radius:4px;overflow:hidden;margin-top:8px;">
      <tr style="background:#1f140e;">
        <td colspan="2" style="padding:10px 16px;color:#f06522;font-size:11px;font-family:Arial,sans-serif;letter-spacing:0.15em;text-transform:uppercase;font-weight:bold;">${title}</td>
      </tr>
      ${rowsHtml}
    </table>`;
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "Guest";
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

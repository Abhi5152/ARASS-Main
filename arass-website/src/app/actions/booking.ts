"use server";

export interface BookingDetails {
  name: string;
  email: string;
  service: string;
  packageTier: string;
  date: string;
  details: string;
}

export async function submitBooking(data: BookingDetails) {
  try {
    // Basic server-side validation
    if (!data.name || !data.email || !data.service || !data.packageTier || !data.date || !data.details) {
      return { success: false, error: "Please fill out all required fields." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.NOTIFICATION_EMAIL;

    // Local development fallback if environment variables are not set yet
    if (!apiKey || !recipientEmail) {
      console.log("=== [DEVELOPMENT MODE: NEW BOOKING RECEIVED] ===");
      console.log("Details:", data);
      console.log("Note: To enable email delivery, please configure RESEND_API_KEY and NOTIFICATION_EMAIL in your .env.local file.");
      console.log("===============================================");
      
      // Simulate API network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { 
        success: true, 
        devMode: true,
        message: "Booking simulated successfully in development mode." 
      };
    }

    // Build the premium HTML email body
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Request</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121214; color: #EAEAEC; margin: 0; padding: 20px; -webkit-font-smoothing: antialiased; }
            .container { max-width: 600px; margin: 0 auto; background: #1E1E22; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #007BFF, #00C6FF); padding: 32px 24px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 500; }
            .content { padding: 40px 32px; }
            .grid { display: grid; grid-template-cols: 1fr; gap: 20px; margin-bottom: 32px; }
            @media (min-width: 480px) {
              .grid { grid-template-cols: 1fr 1fr; }
            }
            .info-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); padding: 16px; border-radius: 10px; }
            .info-label { font-size: 11px; text-transform: uppercase; color: #8E8E93; letter-spacing: 1px; font-weight: 700; margin-bottom: 4px; }
            .info-value { font-size: 15px; color: #ffffff; font-weight: 600; }
            .details-section { background: rgba(0,198,255,0.03); border: 1px dashed rgba(0,198,255,0.2); padding: 24px; border-radius: 12px; margin-top: 16px; }
            .details-title { font-size: 12px; text-transform: uppercase; color: #00C6FF; letter-spacing: 1px; font-weight: 700; margin-bottom: 8px; }
            .details-content { font-size: 14px; color: #EAEAEC; line-height: 1.6; white-space: pre-wrap; margin: 0; }
            .footer { text-align: center; padding: 24px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #8E8E93; }
            .reply-button { display: inline-block; background: #007BFF; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 24px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Project Booking</h1>
              <p>A potential lead has submitted a request</p>
            </div>
            
            <div class="content">
              <div class="grid">
                <div class="info-card">
                  <div class="info-label">Client Name</div>
                  <div class="info-value">${data.name}</div>
                </div>
                <div class="info-card">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${data.email}</div>
                </div>
                <div class="info-card">
                  <div class="info-label">Core Service</div>
                  <div class="info-value" style="color: #00C6FF;">${data.service}</div>
                </div>
                <div class="info-card">
                  <div class="info-label">Selected Tier</div>
                  <div class="info-value">${data.packageTier}</div>
                </div>
              </div>

              <div class="info-card" style="margin-bottom: 24px;">
                <div class="info-label">Target Date & Time</div>
                <div class="info-value">${new Date(data.date).toLocaleString()}</div>
              </div>

              <div class="details-section">
                <div class="details-title">Project Details & Specifics</div>
                <p class="details-content">${data.details}</p>
              </div>

              <div style="text-align: center;">
                <a href="mailto:${data.email}?subject=Re: Your Project Booking Request" class="reply-button">Reply to Client</a>
              </div>
            </div>
            
            <div class="footer">
              Sent automatically from ARASS Tech Website • ${new Date().toLocaleDateString()}
            </div>
          </div>
        </body>
      </html>
    `;

    // Make the secure fetch request to Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "ARASS Booking System <onboarding@resend.dev>",
        to: recipientEmail,
        subject: `[ARASS Booking] New Request - ${data.name} (${data.service})`,
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API Error details:", result);
      return { 
        success: false, 
        error: result.message || "Failed to send email notification through Resend API." 
      };
    }

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Booking Server Action Exception:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred while processing your booking request." 
    };
  }
}

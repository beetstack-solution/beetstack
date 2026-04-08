"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.AJ_MAIL_KEY);

interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  const { name, email, phone, subject, message } = data;
  const whatsappNumber = phone.replace(/\D/g, "");

  try {
    const { data: result, error } = await resend.emails.send({
      from: "Beetstack IT Solutions <contact@beetstack.in>",
      to: ["beetstack@gmail.com"],
      subject: `New Message: ${subject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Message From Beetstack</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #1a1a1a;">
            
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.05);">
              
              <div style="padding: 40px 20px; text-align: center;">
                <img src="https://beetstack.in/public/assets/img/logo.png" alt="Beetstack Logo" style="max-height: 60px; width: auto; display: block; margin: 0 auto 12px auto;">
                <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #a21c3c;">Project Inquiry</p>
              </div>

              <div style="padding: 24px; border-radius: 25px; border: 1px solid #eaeaea; border-left: 4px solid #a21c3c; margin: 0 0px 24px 0px;">
                <div style="margin-bottom: 16px;">
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Sender Name</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${name}</p>
                </div>
                
                <div style="margin-bottom: 16px;">
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Email Address</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600;"><a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a></p>
                </div>

                <div style="margin-bottom: 16px;">
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Phone Number</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${phone}</p>
                </div>
                
                <div>
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Subject</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${subject}</p>
                </div>
              </div>

              <div style="padding: 24px; border-radius: 25px; border: 1px solid #eaeaea; border-left: 4px solid #91a93e; margin: 0 0px 24px 0px;">
                <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #91a93e;">Message Content</p>
                <div style="font-size: 15px; color: #1a1a1a; line-height: 1.7; white-space: pre-wrap;">${message}</div>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td width="50%" style="padding-right: 5px;">
                      <a href="https://wa.me/${whatsappNumber}" style="display: block; background-color: #91a93e; color: white; padding: 14px 10px; border-radius: 50px; text-decoration: none; font-size: 16px; font-weight: 600; text-align: center; line-height: 20px;">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/whatsapp-white-icon.png" style="width: 18px; height: 18px; vertical-align: middle; margin-right: 6px; margin-top: -2px;" />
                        WhatsApp
                      </a>
                    </td>
                    <td width="50%" style="padding-left: 5px;">
                      <a href="tel:${whatsappNumber}" style="display: block; background-color: #a21c3c; color: white; padding: 14px 10px; border-radius: 50px; text-decoration: none; font-size: 16px; font-weight: 600; text-align: center; line-height: 20px;">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-call-white-icon.png" style="width: 18px; height: 18px; vertical-align: middle; margin-right: 6px; margin-top: -2px;" />
                        Call Now
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="padding: 30px; text-align: center; background-color: #ffffff;">
                <p style="margin: 0; font-size: 12px; font-weight: 500; color: #999999; line-height: 1.6;">
                  © 2026 Beetstack IT Solutions<br>
                  Kannur, Kerala, India
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: result?.id };
  } catch (err) {
    console.error("Email send exception:", err);
    return { success: false, error: "Internal Server Error" };
  }
}

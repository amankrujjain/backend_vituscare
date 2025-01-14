const nodeMailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const appointmentMail = async (req, res) => {
  const { name, email, phoneNumber, age, appointmentDate, service } = req.body;

  if (!name || !email || !phoneNumber || !age || !appointmentDate || !service) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!"
    });
  }
  const transporter = nodeMailer.createTransport({
    service: 'Outlook365',
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  const mailOptionsAmin = {
    from: process.env.OUTLOOK_EMAIL,
    to: process.env.OUTLOOK_EMAIL,
    subject: "New Appointment request",
    html: `
       <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="es-header">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p10t es-p10b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="es-m-p0r esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p20b" style="font-size:0px">
                                              <a target="_blank" href="https://vituscare.com">
                                                <img src="https://frqzvbx.stripocdn.email/content/guids/CABINET_6347c429927b59f849815918876d358d0c80c3ce2a73a81c4ac67592f7e43c3b/images/vituscare.png" alt="Logo" width="200" title="Logo" class="adapt-img" style="display: block; font-size: 12px">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <h1 class="es-m-txt-c" style="font-size: 46px; line-height: 100%; color: #cc0000">
                                                New Enquiry !
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                              <p style="text-align: left">
                                                ​<br>New appointment enquiry received.&nbsp;
                                              </p>
                                              <p style="text-align: left">
                                                Name: ${name}
                                              </p>
                                              <p style="text-align: left">
                                                email: ${email}
                                              </p>
                                              <p style="text-align: left">
                                                Phone Number: ${phoneNumber}<br>Service: ${service}
                                              </p>
                                              <p style="text-align: left">
                                                Age: ${age}
                                              </p>
                                              <p style="text-align: left">
                                                Appointment Date: ${appointmentDate}
                                              </p>
                                              <p style="text-align: left">
                                                ​
                                              </p>
                                              <p style="text-align: left">
                                                Please connect with the patient.
                                              </p>
                                              <p style="text-align: left">
                                                ​
                                              </p>
                                              <p style="text-align: left">
                                                Regards,
                                              </p>
                                              <p style="text-align: left">
                                                VitusCare Admin<br>​
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size:0px">
                                              <a target="_blank">
                                                <img src="https://frqzvbx.stripocdn.email/content/guids/CABINET_6347c429927b59f849815918876d358d0c80c3ce2a73a81c4ac67592f7e43c3b/images/vitusveer.jpg" alt="" width="560" class="adapt-img" style="display: block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table align="center" cellpadding="0" cellspacing="0" width="640" class="es-footer-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="600" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.facebook.com/share/nCWfq8zWxwQyiL9c/">
                                                        <img title="Facebook" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.instagram.com/vituscare/?next=%2F">
                                                        <img title="Instagram" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.youtube.com/@vituscaremedlifepvt.ltd.4270">
                                                        <img title="Youtube" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a target="_blank" href="https://www.linkedin.com/company/vituscare/">
                                                        <img title="LinkedIn" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In" width="32">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p35b">
                                              <p>
                                                VitusCare Medlife Pvt. Ltd. © 2025, Inc. All Rights Reserved.
                                              </p>
                                              <p>
                                                6th Floor, Awfis, Suncity Success Tower, Sector - 65, Gurugram, Haryana, India, 122018
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
        `,
  };

  const mailOptionsUser = {
    from: process.env.OUTLOOK_EMAIL,
    to: email,
    subject: "Appointment Confirmation",
    html: `
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="es-header">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p10t es-p10b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="es-m-p0r esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p20b" style="font-size:0px">
                                              <a target="_blank" href="https://vituscare.com">
                                                <img src="https://frqzvbx.stripocdn.email/content/guids/CABINET_162e63c0d08a839e84ce8161bec7638cfa02ff67df050868d080b2d66ad75682/images/vituscare.png" alt="Logo" width="200" title="Logo" class="adapt-img" style="display:block;font-size:12px">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <h1 class="es-m-txt-c" style="font-size:46px;line-height:100%;color:#6aa84f">
                                                Appointment Confirmed !
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-spacer es-p20" style="font-size: 0">
                                              <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer">
                                                <tbody>
                                                  <tr>
                                                    <td style="border-bottom: 1px solid #cccccc; background: none; height: 0px; width: 100%; margin: 0px 0px 0px 0px"></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                              <p>
                                                Hi, ${name}! We have received a request for appointment for Service: ${service}.&nbsp;
                                              </p>
                                              <p>
                                                ​
                                              </p>
                                              <p>
                                                Our team will contact you soon, Mean while take good care of your health !
                                              </p>
                                              <p>
                                                Best Regards,
                                              </p>
                                              <p>
                                                Vituscare Team
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table align="center" cellpadding="0" cellspacing="0" width="640" class="es-footer-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="600" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.facebook.com/share/nCWfq8zWxwQyiL9c/">
                                                        <img title="Facebook" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.instagram.com/vituscare/?next=%2F">
                                                        <img title="Instagram" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.youtube.com/@vituscaremedlifepvt.ltd.4270">
                                                        <img title="Youtube" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a target="_blank" href="https://www.linkedin.com/company/vituscare/">
                                                        <img width="32" title="LinkedIn" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p35b">
                                              <p>
                                                VitusCare Medlife Pvt. Ltd. © 2025, Inc. All Rights Reserved.
                                              </p>
                                              <p>
                                                6th Floor, Awfis, Suncity Success Tower, Sector - 65, Gurugram, Haryana, India, 122018
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
        `
  };

  try {
    await transporter.sendMail(mailOptionsAmin);
    await transporter.sendMail(mailOptionsUser);

    return res.status(200).json({
      success: true,
      message: "Appointment submitted successfully!"
    });
  } catch (error) {
    console.log('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit appointment",
      error: error.message
    })
  }
}

const greenField = async (req, res) => {
  const { name, email, phone, hospital, state, city, description } = req.body;

  if (!name || !email || !phone || !hospital || !city || !state || !description) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  };

  const transporter = nodeMailer.createTransport({
    service: "Outlook365",
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  const adminMailOption = {
    from: process.env.OUTLOOK_EMAIL,
    to: process.env.OUTLOOK_EMAIL,
    subject: 'New Enquiry For Green Field',
    html: `
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="es-header">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p10t es-p10b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="es-m-p0r esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p20b" style="font-size:0px">
                                              <a target="_blank" href="https://vituscare.com">
                                                <img src="https://frqzvbx.stripocdn.email/content/guids/CABINET_666eb48f1be7586f5a95ce61030f01733a4d4f952918948adc3506967b72f121/images/vituscare_cbr.png" alt="Logo" width="200" title="Logo" class="adapt-img" style="display:block;font-size:12px">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <h1 class="es-m-txt-c" style="font-size:46px;line-height:100%;color:#cc0000">
                                                New Enquiry !
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                              <p style="text-align:left">
                                                <br>New green field enquiry received.&nbsp;
                                              </p>
                                              <p style="text-align:left">
                                                Hospital Name: ${hospital}
                                              </p>
                                              <p style="text-align:left">
                                                Name: ${name}
                                              </p>
                                              <p style="text-align:left">
                                                email: ${email}
                                              </p>
                                              <p style="text-align:left">
                                                Phone Number: ${phone}
                                              </p>
                                              <p style="text-align:left">
                                                State: ${state}
                                              </p>
                                              <p style="text-align:left">
                                                City: ${city}
                                              </p>
                                              <p style="text-align:left">
                                                Description: ${description}<br>
                                              </p>
                                              <p style="text-align:left">
                                                <br>
                                              </p>
                                              <p style="text-align:left">
                                                Please contact thhe person soon. 📞
                                              </p>
                                              <p style="text-align:left">
                                                <br>
                                              </p>
                                              <p style="text-align:left">
                                                Regards,
                                              </p>
                                              <p style="text-align:left">
                                                VitusCare Admin
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size:0px">
                                              <a target="_blank">
                                                <img src="https://frqzvbx.stripocdn.email/content/guids/CABINET_666eb48f1be7586f5a95ce61030f01733a4d4f952918948adc3506967b72f121/images/vitusveer_bqV.jpg" alt="" width="560" class="adapt-img" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table align="center" cellpadding="0" cellspacing="0" width="640" class="es-footer-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="600" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.facebook.com/share/nCWfq8zWxwQyiL9c/">
                                                        <img title="Facebook" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.instagram.com/vituscare/?next=%2F">
                                                        <img title="Instagram" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.youtube.com/@vituscaremedlifepvt.ltd.4270">
                                                        <img title="Youtube" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a target="_blank" href="https://www.linkedin.com/company/vituscare/">
                                                        <img title="LinkedIn" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In" width="32">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p35b">
                                              <p>
                                                VitusCare Medlife Pvt. Ltd. © 2025, Inc. All Rights Reserved.
                                              </p>
                                              <p>
                                                6th Floor, Awfis, Suncity Success Tower, Sector - 65, Gurugram, Haryana, India, 122018
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
    `
  };
  const mailOptionsUser = {
    from: process.env.OUTLOOK_EMAIL,
    to: email,
    subject: "Details Submitted Successfully",
    html:`
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="es-header">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p10t es-p10b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="es-m-p0r esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p20b" style="font-size:0px">
                                              <a target="_blank" href="https://vituscare.com">
                                                <img src="https://frqzvbx.stripocdn.email/content/guids/CABINET_298a096b8510fc56f90dcbe32690732560ac933c0c80e873d70b18ed2ef209e0/images/vituscare_NVq.png" alt="Logo" width="200" title="Logo" class="adapt-img" style="display:block;font-size:12px">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <h1 class="es-m-txt-c" style="font-size:46px;line-height:100%;color:#6aa84f">
                                                Query Submitted !
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l">
                                              <p>
                                                Hi, ${name}! We have received your query.
                                              </p>
                                              <p>
                                                <br>
                                              </p>
                                              <p>
                                                Our team will contact you soon, Mean while take good care of your health !
                                              </p>
                                              <p>
                                                <br>
                                              </p>
                                              <p>
                                                Best Regards,
                                              </p>
                                              <p>
                                                VitusCare Team
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table align="center" cellpadding="0" cellspacing="0" width="640" class="es-footer-body" style="background-color:transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="600" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size:0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.facebook.com/share/nCWfq8zWxwQyiL9c/">
                                                        <img title="Facebook" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.instagram.com/vituscare/?next=%2F">
                                                        <img title="Instagram" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a target="_blank" href="https://www.youtube.com/@vituscaremedlifepvt.ltd.4270">
                                                        <img title="Youtube" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a target="_blank" href="https://www.linkedin.com/company/vituscare/">
                                                        <img width="32" title="LinkedIn" src="https://frqzvbx.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p35b">
                                              <p>
                                                VitusCare Medlife Pvt. Ltd. © 2025, Inc. All Rights Reserved.
                                              </p>
                                              <p>
                                                6th Floor, Awfis, Suncity Success Tower, Sector - 65, Gurugram, Haryana, India, 122018
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
    `
  };

  try {
    await transporter.sendMail(mailOptionsUser);
    await transporter.sendMail(adminMailOption);

    return res.status(200).json({
      succes: true,
      message:"Query Submittded Successfully"
    })
  } catch (error) {
    console.log("error occured while send greenfield mail", error);
    return res.status(500).json({
      success: false,
      message:"Failed to send greenfield mail",
      error: error.message
    })
  }
}

const feedback = async(req,res)=>{
  
  try {
    
  } catch (error) {
    
  }
}
module.exports = {
  appointmentMail,
  greenField,
}


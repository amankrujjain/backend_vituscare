const nodeMailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const appointmentMail = async (req, res) => {
    const { name, email, phoneNumber, age, appointmentDate, department } = req.body;

    if (!name || !email || !phoneNumber || !age || !appointmentDate || !department) {
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
            user: 'info@vituscare.com',
            password: 'VQnen540'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const mailOptionsAmin = {
        from: process.env.OUTLOOK_EMAIL,
        to: 'aman.ujjain@vituscare.com',
        subject: "New Appointment request",
        html: `
       <h3>New Appointment Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
            <p><strong>Department:</strong> ${department}</p>
        `,
    };

    const mailOptionsUser = {
        from: process.env.OUTLOOK_EMAIL,
        to: email,
        subject: "Appointment Confirmation",
        html: `
        <h3>Appointment Confirmation</h3>
            <p>Dear ${name},</p>
            <p>Thank you for booking an appointment with us. Here are your appointment details:</p>
            <ul>
                <li><strong>Date:</strong> ${appointmentDate}</li>
                <li><strong>Department:</strong> ${department}</li>
                <li><strong>Contact:</strong> ${phoneNumber}</li>
            </ul>
            <p>We will contact you soon to confirm further details. If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,</p>
            <p>VitusCare Team</p>
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

module.exports = {
    appointmentMail
}


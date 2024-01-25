
const nodemailer = require('nodemailer');



const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_ADRESS,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }})

    const emailOptions = {
        from: 'Sir Book Store <support@sirbookstore.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(emailOptions);

}

module.exports=sendMail;
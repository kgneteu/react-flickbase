const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
});

const contactEmail = async (contact) => {
    try {
        //const {email, firstname, lastname, message} = contact;


        console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);

        let mailGenerator = new Mailgen(
            {
                theme: 'default',
                product: {
                    name: 'Flickabase',
                    link: `${process.env.EMAIL_MAIN_URL}`
                }
            }
        )

        const email = {
            body: {
                intro: [
                    'Bla bla',
                    `Email: ${contact.email}`,
                    `Firstnam: ${contact.firstname}`,
                    `Email: ${contact.lastname}`,
                ],
                outro: [`${contact.message}`]
            }
        }

        let emailBody = mailGenerator.generate(email)

        let message = {
            from: process.env.EMAIL, // sender address
            to: process.env.EMAIL, // list of receivers
            subject: "Hello", // Subject line
            text: "Contact", // plain text body
            html: emailBody, // html body
        };


        let info = await transporter.sendMail(message);

        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return true
    } catch (e) {
        console.log(e)
        if (e) throw(e);
    }
}

const registerEmail = async (userEmail, userToken) => {
    try {

        let mailGenerator = new Mailgen(
            {
                theme: 'default',
                product: {
                    name: 'Flickbase',
                    link: `${process.env.EMAIL_MAIN_URL}`
                }
            }
        )

        const emailBody = mailGenerator.generate({
            body: {
                name: userEmail,
                intro: 'Welcome to Flickbase! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get validate your account, please click here!',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate Your Account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${userToken}`

                    }
                },
                outro: 'Need help, or have any questions ? Just reply to this email, we\'d love to help.',
            }
        })


        let message = {
            from: process.env.EMAIL, // sender address
            to: userEmail, // list of receivers
            subject: "Welcome to Flickbase - Validate Your Account", // Subject line
            text: "Contact", // plain text body
            html: emailBody, // html body
        };

        let info = await transporter.sendMail(message);
        return true
    } catch (e) {
        if (e) throw(e);
    }
}


module.exports = {contactEmail, registerEmail}


import appSettingsFromFile from "../../shared/config/appSettings.json"; 
import nodeMailer = require('nodemailer');
//const directTransport = require('nodemailer-direct-transport');
function authVerifiedSendEmail(emailAddress: string, verificationCode: string): void {
  const transport = nodeMailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, //ssl
    auth: {
        user:`${appSettingsFromFile.mailUser}`,
        pass:`${appSettingsFromFile.mailPassword}`
    }
  })
  transport.sendMail({
    from: `${appSettingsFromFile.mailUser}@zohomail.eu`,
    to: emailAddress,
    subject: 'HSB account verification',
    html: `
                   <h1>Hello</h1>
                   <div>To verify your account, follow the link and enter your email and verification code details.</div>
                   <strong>Email: ${emailAddress}</strong>
                   <strong>Verification code: ${verificationCode}</strong>                   
                   <div>This mail has been sent automatically. Shouldn't be answered</div>
                  `
  }, () => {    
  });
}

function returnPasswordSendEmail(emailAddress: string, verificationCode: string): void {
  const transport = nodeMailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, //ssl
    auth: {
        user:`${appSettingsFromFile.mailUser}`,
        pass:`${appSettingsFromFile.mailPassword}`
    }
  })
  transport.sendMail({
    from: `${appSettingsFromFile.mailUser}@zohomail.eu`,
    to: emailAddress,
    subject: 'HSB account return password',
    html: `
                   <h1>Hello</h1>
                   <div>To change your password, follow the link and enter your recovery information.</div>
                   <strong>Email: ${emailAddress}</strong>
                   <strong>Verification code: ${verificationCode}</strong>                   
                   <div>This mail has been sent automatically. Shouldn't be answered</div>
                  `
  }, () => {    
  });
}


//let sequelize:Sequelize

export { authVerifiedSendEmail, returnPasswordSendEmail }
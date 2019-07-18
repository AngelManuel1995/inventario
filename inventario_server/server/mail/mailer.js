const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport');
const templateCorreoEvento = require('../templates/lent')

let enviarCorreo = (registry,device) => {
    /*const transporter = nodemailer.createTransport({
        host: "10.0.0.30",
        port: 25,
        secure: false
    });*/
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth:{
            api_user:'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'
        }
    }))


    return transporter.sendMail({
        to:`${registry.receiver}`,
        from:'angel.goez@arus.com.co',
        subject:`NOTIFICACIÓN DE PRESTAMO DE UN EQUIPO`,
        html: templateCorreoEvento(registry, device)
    })
}

module.exports = enviarCorreo
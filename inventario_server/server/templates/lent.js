const getDaysLent = (registry) => {
    return (Math.abs(new Date(registry.startDate).getTime() - new Date(registry.endDate).getTime())) / (1000*3600*24)
}

const templateCorreoEvento = (registry, device) => {
    
    return template = `
    <div style="margin:0px; padding:0px; font-family: sans-serif; color: #FFFFFF;" >
        <div>
            <div style="background-color: rgba(226,109,30,1); margin:0px; padding:10px; width:60%; text-align:center;" >
                <h3>NOTIFICACIÓN DE INICIO DE PRESTAMO DE UN EQUIPO CON ${registry.ticket}</h3>
            </div>
            <div style=" height:10px">

            </div>
            <div style="background-color: rgba(226,109,30,0.9); margin:0px; padding:50px 10px; width:60%; font-size:1.5rem;">
                <span>El <strong>${device.type} ${device.brand} ${device.model}</strong> con serie: <strong>${device.serie}</strong> </span> <br> <br><span> Fue prestado a: <strong>angel.goez@arus.com.co</strong> </span> <br> <span> Por: <strong> <span>santiago.valencia@arus.com.co</span> </strong></span><br><br><span>
                Desde el día <strong>${registry.startDate.getDate()}/${registry.startDate.getMonth() + 1}/${registry.startDate.getFullYear()}</strong> </span> <br> <span>Hasta el día <strong>${registry.endDate.getDate()}/${registry.endDate.getMonth() + 1}/${registry.endDate.getFullYear()}</strong> </span> <br><span> Por un total de <strong>${getDaysLent(registry)}</strong> dias.
                </span>
                <br>
            </div>

            <div>
                <span><strong>Anotaciones del prestamo: </strong> ${registry.deliveryObservations} </span> <br />
                <span>
                    Cuando se acabe el tiempo de prestamo, por favor contactar al personal encargado de prestamos de los equipos, para la debida devolución
                </span>
                <br />
                <span>
                    Muchas gracias.
                </span>
            </div>
            <div>
                <img src="https://pati.arus.com.co/images/continental_gold_arus.JPG" alt="">
            </div>
        </div>
    </div>
    `
}

module.exports = templateCorreoEvento
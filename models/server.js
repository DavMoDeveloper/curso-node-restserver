const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares();
        //rutas de mi app
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Parseo y lectura del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use(express.static('public') );
    }

    routes(){
       this.app.use(this.usuariosPath, require('../routers/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Nuestro servidor corre en el puero', this.port);
        });
    }
}

module.exports = Server;
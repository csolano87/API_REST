const express = require('express');
const cors = require('cors');
const db = require('../db/connection');
//const { Sequelize } = require('sequelize');


class Server {

    constructor() {
        
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            //buscar:     '/api/buscar',
            categorias: '/api/ordenes',
            //productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }



     


        // Conectar a base de datos
        
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
      //  this.app.use( express.static('public') );

    }
    async dbConnection() {
        try {
            await db.authenticate();

            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }
    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categorias, require('../routes/categoria'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));

       /*  this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios')); */

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;

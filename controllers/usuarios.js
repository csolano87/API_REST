const { Request, Response } = require('express');



const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuarios');



const usuariosGet = async (req, res) => {
   
    
        const usuarios = await Usuario.findAll({ limit: 5 });
   

        res.json({ usuarios });
       

};

const usuariosGetID = async (req, res) => {
   
    
    const usuario = await Usuario.find();

    res.json({ usuarios });
   

};





    const usuariosPost = async (req, res) => {
   
    const {nombre, apellido,correo, password, rol}=req.body;


    const usuario= new Usuario({nombre, apellido,correo, password, rol});
   

    const existeUsuario = await Usuario.findOne({
        where: {
            correo: usuario.correo
        }
    });

  
    if (existeUsuario) {
        return res.status(400).json({
            msg:'Este usuario ya existe'
        });
     }
    
// encriptar 

  const salt =bcryptjs.genSaltSync();
  usuario.password=bcryptjs.hashSync(password, salt )



//try {

    //const usuario=new Usuario(body);
    await usuario.save();
    res.status(201).json({ 


       usuario
     }
       );
/* } catch (error) {
    console.log(error)
    res.status(500).json({ 


        msg: 'Error al guardar comuniquese con el Administrador..'
     } */
       

    
  
    };

    const usuariosUpdate = async (req, res) => {
        const {id} =req.params;
        //const usuario = await Usuario.findByPk(id);
     

        const {  password,  correo, ...resto } = req.body;

        if ( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
    
        const usuario = await Usuario.findCreateFind( id, resto );
    


        res.send('update guardada con exito..');
    
    };

    const usuariosDelete = async (req, res) => {
   
    const {id} =req.params;
  
    const usuario = await Usuario.findByPk(id);
   
    if(!usuario){
        return res.status(404).json({

            msg:`No existe un usuario con el id ${id}`
        })
    }
   // await usuario.destroy();
   await usuario.update({estado:false});
        res.status(200).json({
            msg:'El usuario a sido desactivado con exito...'});
    
    };

    module.exports={usuariosGet,
        usuariosGetID,
        usuariosPost,
        usuariosUpdate,
        usuariosDelete
    }
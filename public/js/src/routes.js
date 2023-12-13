import inicio from "../page/inicio.js";

import store from "../page/store.js";

import producto from "../page/producto.js";
import productoId from "../page/productoId.js";

import marca from "../page/marca.js";
import marcaId from "../page/marcaId.js";

import categoria from "../page/categoria.js";
import categoriaId from "../page/categoriaId.js";

import asistencia from "../page/asistencia.js";
import asistenciaAdd from "../page/asistenciaAdd.js";
import asistenciaId from "../page/asistenciaId.js";
import asistenciaIdUserUid from "../page/asistenciaIdUserUid.js";
import asistenciaUpdate from "../page/asistenciaUpdate.js";

import user from "../page/user.js";
import userId from "../page/userId.js";

import login from "../page/login.js";

import routePrivate from "./routePrivate.js";
import routePublic from "./routePublic.js";

export default ()=>{

    const Route = new Hash()
    const title = document.querySelector('title')

    Route.param('/', ()=> routePrivate( inicio ))
    Route.param('/store', ()=> routePrivate( store ))
    Route.param('/login', ()=> routePublic( login )) 
    Route.param('/register', ()=> routePublic( login )) 
    Route.param('/register', ()=> routePublic( login ))
    Route.param('/producto', ()=> routePrivate( producto ))
    Route.param('/producto/:id', ()=> routePrivate( productoId ))
    Route.param('/marca', ()=> routePrivate( marca ))
    Route.param('/marca/:id', ()=> routePrivate( marcaId ))
    Route.param('/marca/:id/productos', ()=> routePrivate( producto, { filter : true, from : 'marca' }))
    Route.param('/categoria', ()=> routePrivate( categoria ) )
    Route.param('/categoria/:id', ()=> routePrivate( categoriaId ))
    Route.param('/categoria/:id/productos', ()=> routePrivate( producto, { filter : true, from : 'categoria' } ))
    Route.param('/asistencia', ()=> routePrivate( asistencia ))
    Route.param('/asistencia/add', ()=> routePrivate( asistenciaAdd ))
    Route.param('/asistencia/edit/:id', ()=> routePrivate( asistenciaUpdate ))
    Route.param('/asistencia/:id', ()=> routePrivate( asistenciaId ))
    Route.param('/asistencia/:id/user/:uid_user', ()=> routePrivate( asistenciaIdUserUid ))
    Route.param('/user', ()=> routePrivate( user ))
    Route.param('/user/:id', ()=> routePrivate( userId ))
    Route.param('*', ()=>  console.log('page not found'))
 
    Route.dispatch(()=> {
        title.textContent = location.hash.split('/').slice(1)[0] || 'inicio'
    })
}

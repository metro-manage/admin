import modalConfirmation from "../components/modalConfirmation.js"
import elementNotFound from "../components/elementNotFound.js"

import formUsuario from "../components/formUsuario.js"
import formUsuarioPassword from "../components/formUsuarioPassword.js"

import options from "../components/options.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = ss('params').get(true)
    const Icon = new IconSVG()  

    const Gender = [
        { id : 1, name : 'MASCULINO' },
        { id : 2, name : 'FEMENINO' }
    ]

    const Position = [
        { id : 1, name : 'ADMINISTRADOR' },
        { id : 2, name : 'COLABORADOR' },
        { id : 3, name : 'USUARIO' }
    ]

    const Month = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const Title = {
        fullname : 'Nombre completo',
        lastname : 'Apellido',
        email : 'Correo',
        phone : 'Numero de celular',
        birthday : 'Fecha de nacimiento',
        data_gender : 'Genero',
        data_position : 'Cargo',
        status : 'Habilitado'
    }
    

    const ElementComponent = createElement(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/user" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Informacion de usuario</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button id="buttonOption" class="pointer"">${ Icon.get('fi fi-rr-menu-dots') }</button>
                </div>
            </header>
            <div id="elementItem" class="div_s1M11CY scroll-y">
                <div id="elementItemData" class="div_G7dV5EX"></div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const main  = document.getElementById('main')

    const { elementItem, elementItemData, buttonOption } = query.getAttribute('id')

    const modalAlert = new Alert(main)

    let elementForm = null
    let elementFormPassword = null

    const confirmDelete = modalConfirmation({ message : '¿Eliminar?' }, ()=> {
        
        const query = {
            token : ls('auth-token').get(),
            id    : params.id
        }

        datapi.delete(api(`/api/producto?${ paramQueries(query) }`))
            .then(res => {
                if(res) {
                    location.hash = '#/producto'
                }
                else modalAlert.show({ message : 'no se pudo eliminar' })
            })

    })

    let elementOption = null

    if( buttonOption ){
        buttonOption.addEventListener('click', ()=> {

            if( !elementOption ) {
                elementOption = options('usuario', ['*'], action => {
                    if( action == 'update' ) {

                        if( !elementForm ) elementForm = formUsuario( false )
                        main.append(elementForm)

                    }

                    else if( action == 'update_password' ) {

                        if( !elementFormPassword ) elementFormPassword = formUsuarioPassword( false )
                        main.append(elementFormPassword)

                    }
                    //formUsuarioPassword

                    else if( action == 'delete' ) {
                        main.append(confirmDelete)
                    }
                })
            }

            main.append( elementOption )
        })
    }
 
    const dataRender =( data )=>{
        if( !data ) {

            return appendElement( document.getElementById('main'), elementNotFound({
                href  : '#/marca',
                title : '',
                message : 'El elemento no existe'
            }))

        }

        data.data_gender = Gender.find( gender => gender.id == data.gender )
        data.data_position = Position.find( position => position.id == data.position )

        elementForm = formUsuario( false, data )
        elementFormPassword = formUsuarioPassword( false, data )

        const fragment = document.createDocumentFragment()

        if(typeof data.data_categoria == 'string') data.data_categoria = JSON.parse(data.data_categoria)
        if(typeof data.data_marca == 'string') data.data_marca = JSON.parse(data.data_marca)

        Object.keys(data).forEach(key => {

            let html = ''
            const title = (Title[key] ?? key).toLocaleUpperCase()

            if( ['gender', 'position'].includes(key) ) return

            if( key == 'avatar' ) {
                html =  `
                    <div class="div_vv95a8C">
                        <img src="${ api(`/storage/user/${ data[key] || 'avatar.png' }`) }" class="img_9Jhuu3K">
                    </div>
                `
            } 

            else if(['birthday'].includes(key)) {
                
                const date  = new Date(data[key])
                const value = data[key] ? `${ date.getDate() } ${ Month[ date.getMonth() ] } ${ date.getFullYear() }` : '-'
                html =  `
                    <div class="div_vv95a8C">
                        <h4>${ title }</h4>
                        <span>${ value }</span>
                    </div>
                `
    
            }

            else if( ['data_gender', 'data_position'].includes(key) )  {
                html =  `
                    <div class="div_vv95a8C">
                        <h4>${ title }</h4>
                        <span >${ data[key].name }</span>
                    </div>
                `
            }

            else if( ['status'].includes(key) )  {
                html =  `
                    <div class="div_vv95a8C" id="status">
                        <span class="a_86k6e4u">${ data[key] == '0' ? 'Deshabilitadob' : 'Habilitado' }</span>
                    </div>
                `
            }

            else {
                html = `
                    <div class="div_vv95a8C">
                        <h4>${ title }</h4>
                        <span>${ data[key] || '-' }</span>
                    </div>
                `
            }

            const element = createElement( html )

            if( key == 'avatar' ) {
                fragment.prepend( element )
            } else {
                fragment.append( element )
            }
            
        });

        const elementStatus = fragment.querySelector('#status')

        if( elementStatus )  {
            elementStatus.removeAttribute('id')
            fragment.append( elementStatus )
        }

        appendElement( elementItem, appendElement( elementItemData, fragment ) )

        
        
    }

    const dataLoad = async ()=>{
        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'
        
        const queries = {
            token : ls('auth-token').get(),
            query : true,
            uid    : params.id,
            limit : 'one',
        }


        const data = await datapi.get(api(`/api/user?${ paramQueries( queries ) }`))
        dataRender( data ) 
    }

    dataLoad()
    
    return ElementComponent
}
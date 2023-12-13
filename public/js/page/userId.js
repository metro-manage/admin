import modalConfirmation from "../components/modalConfirmation.js"
import elementNotFound from "../components/elementNotFound.js"

import formUsuario from "../components/formUsuario.js"
import formUsuarioPassword from "../components/formUsuarioPassword.js"

import options from "../components/options.js"

export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = window.dataLib.params
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

    const DATA = [
        { key : 'avatar',  title : '',  },
        { key : 'uid',  title : 'ID',  },
        { key : 'fullname', title : 'Nombre completo' },
        { key : 'lastname', title : 'Apellido' },
        { key : 'email', title : 'Correo' },
        { key : 'phone', title : 'Numero de celular' },
        { key : 'birthday', title : 'Fecha de nacimiento' },
        { key : 'data_gender', title : 'Genero' },
        { key : 'data_position', title : 'Cargo' },
        { key : 'status', title : '' },
    ]
    
    const ElementComponent = ele.create(`
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

    const main  = document.getElementById('main')

    const elements = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { elementItem, elementItemData, buttonOption } = elements

    const modalAlert = new Alert(main)

    let elementForm = null
    let elementFormPassword = null

    const confirmDelete = modalConfirmation({ message : '¿Eliminar?' }, ()=> {
        
        const query = {
            token : localStorage.getItem('auth-token'),
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

            return ele.append( document.getElementById('main'), elementNotFound({
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

        DATA.forEach(key => {

            let html = ''
            const title    = (key.title ?? '').toLocaleUpperCase()
            const unique   = key.key
            const value    = data[ key.key ]

            if( unique == 'avatar' ) {
                html =  `<img src="${ api(`/storage/user/${ value || 'avatar.png' }`) }" class="img_9Jhuu3K">`
            } 
            
            else if(['birthday'].includes(unique)) {
                const date  = new Date(value)
                const _value = value ? `${ date.getDate() } ${ Month[ date.getMonth() ] } ${ date.getFullYear() }` : '-'
                html =  `<span>${ _value }</span>`
            }

            else if( ['data_gender', 'data_position'].includes(unique) )  {
                html =  `<span >${ value.name }</span>`
            }

            else if( ['status'].includes(unique) )  {
                html =  `<span class="a_86k6e4u">${ value == '0' ? 'Deshabilitadob' : 'Habilitado' }</span>`
            }

            else {
                html = `<span>${ value || '-' }</span>`
            }

            const element = ele.create(`
                <div class="div_vv95a8C">
                    ${ title != '' ? `<h4>${ title }</h4>` : '' }
                    ${ html }
                </div>
            `) 
            fragment.append( element )
            
        }); 

        ele.append( elementItem, ele.append( elementItemData, fragment ) )
        
    }

    const dataLoad = async ()=>{
        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'
        
        const queries = {
            token : localStorage.getItem('auth-token'),
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
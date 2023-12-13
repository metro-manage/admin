import modalConfirmation from "../components/modalConfirmation.js"
import elementNotFound from "../components/elementNotFound.js"

import formMarca from "../components/formMarca.js"

import options from "../components/options.js"

export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = window.dataLib.params
    const Icon = new IconSVG()  

    const DATA = [
        { key : 'id',  title : 'id',  },
        { key : 'name', title : 'nombre' },
        { key : 'total_productos', title : '' }
    ]

    const ElementComponent = ele.create(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/marca" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Informacion de marca</h3>
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

    let elementFormMarca = null

    const confirmDelete = modalConfirmation({ message : '¿Eliminar?' }, ()=> {

        const query = {
            token : localStorage.getItem('auth-token'),
            id    : params.id
        }

        datapi.delete(api(`/api/marca?${ paramQueries( query ) }`))
            .then(res => {
                if(res) {
                    location.hash = '#/marca'
                }
                else modalAlert.show({ message : 'no se pudo eliminar' })
            })
    })

    let elementOption = null

    if( buttonOption ){
        buttonOption.addEventListener('click', ()=> {

            if( !elementOption ) {
                elementOption = options('marca', ['*'], action => {
                    if( action == 'update' ) {

                        if( !elementFormMarca ) elementFormMarca = formMarca( false )
                        main.append(elementFormMarca)

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
                title : 'Actualizar marca',
                message : 'El elemento no existe'
            }))

        }

        elementFormMarca = formMarca( false, data )

        const fragment = document.createDocumentFragment()

        DATA.forEach(key => {

            let html = ''
            const title    = (key.title ?? '').toLocaleUpperCase()
            const unique   = key.key
            const value    = data[ key.key ]

            if( unique == 'total_productos' ) {
                html =  `<a href="#/marca/${ data.id }/productos" class="a_86k6e4u">${ value } productos</a>`
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
            id    : params.id,
            limit : 'one',
        }

        const queries2 = {
            token : localStorage.getItem('auth-token'),
            query : true,
            count : true,
            id_marca : params.id,
            limit : 'one'
        }

        const data = {
            ...(await datapi.get(api(`/api/marca?${ paramQueries( queries ) }`))),
            ...(await datapi.get(api(`/api/producto?${ paramQueries( queries2 ) }`)))
        }

        dataRender( data ) 
    }

    dataLoad()
    
    return ElementComponent
}
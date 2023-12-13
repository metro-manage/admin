import modalConfirmation from "../components/modalConfirmation.js"
import elementNotFound from "../components/elementNotFound.js"

import formCategoria from "../components/formProducto.js"
import options from "../components/options.js"

import apiProducto from "../api/producto.js"

export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = window.dataLib.params
    const Icon = new IconSVG()  

    const DATA = [
        { key : 'img',  title : '',  },
        { key : 'sap', title : 'SAP' },
        { key : 'ean', title : 'EAN' },
        { key : 'description', title : 'Descripcion' },
        { key : 'datetime_expirate', title : 'Fecha de vencimiento' },
        { key : 'data_categoria', title : 'Genero' },
        { key : 'data_marca', title : 'Cargo' },
        { key : 'status', title : '' },
    ]

    const ElementComponent = ele.create(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/producto" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Informacion de producto</h3>
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

    let elementFormCategoria = null

    const confirmDelete = modalConfirmation({ message : '¿Eliminar?' }, ()=> {
        apiProducto().remove()
            .then(res => {
                if(res) location.hash = '#/producto'
                else modalAlert.show({ message : 'no se pudo eliminar' })
            })
    })

    let elementOption = null

    if( buttonOption ){
        buttonOption.addEventListener('click', ()=> {

            if( !elementOption ) {
                elementOption = options('producto', ['*'], action => {
                    if( action == 'update' ) {

                        if( !elementFormCategoria ) elementFormCategoria = formCategoria( false )
                        main.append(elementFormCategoria)

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

        elementFormCategoria = formCategoria( false, data )

        const fragment = document.createDocumentFragment()

        if(typeof data.data_categoria == 'string') data.data_categoria = JSON.parse(data.data_categoria)
        if(typeof data.data_marca == 'string') data.data_marca = JSON.parse(data.data_marca)

    
        DATA.forEach(key => {

            let html = ''
            const title    = (key.title ?? '').toLocaleUpperCase()
            const unique   = key.key
            const value    = data[ key.key ]

            if( unique == 'img' ) {
                html =  `<img src="${ api(`/storage/productos/${ value }`) }" class="img_9Jhuu3K">`
            } 
            
            else if(['datetime_expirate'].includes(unique)) {
                const date  = new Date(value)
                const _value = value ? `${ date.getDate() } ${ Month[ date.getMonth() ] } ${ date.getFullYear() }` : '-'
                html =  `<span>${ _value }</span>`
            }

            else if( ['data_categoria', 'data_marca'].includes(unique) )  {
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
        
        apiProducto().get()
            .then( dataRender )

    }

    dataLoad()
    
    return ElementComponent
}

import elementSearch2 from "../components/elementSearch.js"
import formProducto from "../components/formProducto.js"

export default ({ filter = false, from = null, hash = '/store' } = {})=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params    = window.dataLib.params
    const Icon      = new IconSVG()

    const limitAfter = 50
    let after   = 0
    
    const ElementComponent = ele.create(`
        <div class="div_HsRtEhf icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#${ hash }" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Producto</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button class="pointer" data-action="open_search">${ Icon.get('fi fi-rr-search') }</button>
                    <button id="buttonOpenFormAdd" class="pointer">${ Icon.get('fi fi-rr-plus') }</button>
                </div> 
            </header>
            <div id="elementSearch" class="div_Rv73PHH">
                <input id="elementSearchInput" type="text" placeholder="buscar">
                <button class="pointer" data-action="close_search">${ Icon.get('fi fi-rr-cross-small') }</button>
            </div> 
            <div id="elementItem" class="div_mF99tCO scroll-y">
                <div id="elementItemLoader" class="container-loader"><span class="loader"></span></div>
                <div id="elementItemData" class="div_zC9XuUa"></div>
            </div>
        </div>
    `)

    const main  = document.getElementById('main')

    const element = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { elementItem, elementItemData, elementSearch, elementSearchInput, elementItemLoader, buttonOpenFormAdd } = element
 
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };
      
    const handleIntersection =(entries, observer)=> {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                after+= limitAfter
                observer.unobserve(entry.target);
                dataLoad( after, false )
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, options);

    elementSearchInput.addEventListener('input', e => {
        const dataProducto = ss('data-temp').get(true)
        //dataRender(
            const test = dataProducto.filter(data => {

            const data_copy = JSON.parse(JSON.stringify(data))
            data_copy.nombre_categoria = data_copy.data_categoria.name
            data_copy.nombre_marca = data_copy.data_marca.name

            delete data_copy.id
            delete data_copy.data_categoria
            delete data_copy.data_marca
            delete data_copy.img
            delete data_copy.id_categoria
            delete data_copy.id_marca

            if((Object.values(data_copy).map( data => data ).join(' ').toLowerCase()).includes(e.target.value.toLowerCase().trim())) {
                return data
            }

            return null })
            console.log(test)
        //}).slice(0, 30))
    })

    // let getElementSearch = null
    // query.get('button[data-action=open_search]').addEventListener('click', () => { 
    //     if( !getElementSearch ) getElementSearch = elementSearch2('productos')
    //     main.append( getElementSearch )
    // })

    // query.get('button[data-action=close_search]').addEventListener('click', e => {
    //     elementSearch.classList.remove('active')
    // })

    const elementFormProducto = formProducto( true, {} )

    elementFormProducto.addEventListener('_submit', e => {
        if( e.detail.status ) dataLoad()
    })

    buttonOpenFormAdd.addEventListener('click', ()=> {
        main.append( elementFormProducto )
    })

    const dataRender =( Data = [], clean = true )=> {
        
        const isChildren = elementItemData.children.length

        if( !Data.length && !isChildren ) {
            return elementItem.innerHTML = `
                <div class="div_80euglIeYkNE39v">
                    ${ Icon.get('icon-light box-empty') }
                    <h3>Lista vacia</h3>
                </div>
            `
        }

        const fragment = document.createDocumentFragment()
        const DateLength = Data.length - 1

        Data.forEach((data, index) => {
            data.data_marca = JSON.parse( data.data_marca )
            data.data_categoria = JSON.parse( data.data_categoria )

            const element = ele.create(`
                <a href="#/producto/${ data.id }" class="a_OGTLhnw pointer" data-id="div-${ data.id }">
                    <img src="${ api(`/storage/productos/${ data.img }`) }" alt="img-producto">
                    <div class="div_226x4d7">
                        <div class="div_TDXPB0u">
                            <span><b>sap : ${ data.sap }</b></span>
                            <span>ean : ${ data.ean }</span>
                            <span>descripcion : ${ data.description }</span>
                            <span>marca : ${ data.data_marca.name }</span>
                            <span>categoria : ${ data.data_categoria.name  }</span>
                        </div>
                    </div>
                    ${ Icon.get('fi fi-rr-angle-small-right') }
                </a>
            `)

            if( DateLength == index ) {
                observer.observe(element);
            }
            fragment.append( element )
        });

        elementItemLoader.remove()
        
        if( !isChildren ) {
            elementItem.textContent = ''
            elementItem.append(elementItemData)
        }

        elementItemData.append( fragment )
    }

    const dataLoad = ( after = 0, first = true )=>{

        if( first ) {
            elementItem.textContent = ''
        }

        elementItem.append( elementItemLoader )

        const queries = {
            token : localStorage.getItem('auth-token'),
            query : true,
            limit : limitAfter ,
            after
        }

        if( filter ) {
            if( from == 'marca' ) queries.id_marca = params.id
            else if( from == 'categoria' ) queries.id_categoria = params.id
        }

        datapi.get(api(`/api/producto?${ paramQueries(queries) }`))
            .then( dataRender )
        
    }

    elementItemData.remove()
    dataLoad( after )

    return ElementComponent
}
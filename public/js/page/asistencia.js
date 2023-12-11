// import dataData from "../data/asistencia.js"
import navigate from "../components/navigate.js"
import formAsistencia from "../components/formAsistencia.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()

    const ElementComponent = createElement(`
        <div class="div_gR08LPW icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <button id="buttonOpenNavigate" class="button_8e752p0 pointer">${ Icon.get('fi fi-rr-menu-burger') }</button>
                    <h3>Asistencia</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button id="buttonOpenSearch" class="pointer" data-action="open_search">${ Icon.get('fi fi-rr-search') }</button>
                    <button id="buttonOpenFormAdd" class="pointer">${ Icon.get('fi fi-rr-plus') }</button>
                </div> 
            </header>
            <div id="elementSearch" class="div_Rv73PHH">
                <input type="text" id="elementSearchInput" placeholder="buscar">
                <button id="buttonCloseSearch" class="pointer" data-action="close_search">${ Icon.get('fi fi-rr-cross-small') }</button>
            </div>
            
            <div id="elementItem" class="div_D8Bka0d scroll-y">
                <div id="elementItemData" class="div_z0ukxj1"></div>
            </div>
        </div>
    `)

    const query = findElement(ElementComponent)
    const elementNavigate = navigate()

    const { elementItem, elementItemData, elementSearch, elementSearchInput, buttonOpenNavigate, buttonOpenSearch, buttonCloseSearch, buttonOpenFormAdd } = query.getAttribute('id')

    const elementFormAsistencia = formAsistencia( true, {} )

    buttonOpenFormAdd.addEventListener('click', ()=> {
        main.append( elementFormAsistencia )
    })

    const _openNavigate = new CustomEvent('_openNavigate')
    buttonOpenNavigate.addEventListener('click', ()=> dispatchEvent( _openNavigate ) )

    elementSearchInput.addEventListener('input', e => {
        const dataData = ss('data-temp').get(true) 
        dataRender(dataData.filter(data => (data.name.toLowerCase()).includes(e.target.value.toLowerCase().trim())))
    })

    buttonOpenSearch.addEventListener('click', e => {
        elementSearch.classList.add('active')
        elementSearchInput.focus()
    })

    buttonCloseSearch.addEventListener('click', e => {
        elementSearch.classList.remove('active')
    })
    
    const dataRender =( Data = [] )=> {

        if( !Data.length ) {
            return elementItem.innerHTML = `
                <div class="div_80euglIeYkNE39v">
                    ${ Icon.get('icon-light box-empty') }
                    <h3>Lista vacia</h3>
                </div>
            `
        }

        elementItemData.innerHTML = ArrayToString(Data, data => {
            return `
            <a href="#/asistencia/${ data.id }" class="a_item pointer">
                ${ data.name }
                ${ Icon.get('fi fi-rr-angle-small-right') }
            </a>
            `
        })

        appendElement( elementItem, elementItemData )
        
    }

    const dataLoad = ()=>{

        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'
        
        const query = {
            token : ls('auth-token').get(),
            query : true,
            limit : 'all'
        }

        datapi.get(api(`/api/asistencia?${ paramQueries(query) }`))
            .then(data => {
                ss('data-temp').data(data).set(true)
                dataRender(data)
            })
    }

    dataLoad()

    return ElementComponent
}
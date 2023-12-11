import formMarca from "../components/formMarca.js"

export default ()=>{
    
    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    
    const Icon = new IconSVG()
 
    const ElementComponent = createElement(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/store" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Marca</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button id="buttonOpenSearch" class="pointer">${ Icon.get('fi fi-rr-search') }</button>
                    <button id="buttonOpenFormAdd" class="pointer">${ Icon.get('fi fi-rr-plus') }</button>
                </div> 
            </header>
            <div id="elementSearch" class="div_Rv73PHH">
                <input type="text" id="elementSearchInput" placeholder="buscar">
                <button id="buttonCloseSearch" class="pointer">${ Icon.get('fi fi-rr-cross-small') }</button>
            </div>
            <div id="elementItem" class="div_D8Bka0d scroll-y"> 
                <div id="elementItemData" class="div_z0ukxj1"></div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const main  = document.getElementById('main')

    const { elementItem, elementItemData, elementSearch, elementSearchInput, buttonOpenSearch, buttonCloseSearch, buttonOpenFormAdd } = query.getAttribute('id')

    const elementFormMarca = formMarca( true, {} )

    elementFormMarca.addEventListener('_submit', e => {
        if( e.detail.status ) dataLoad()
    })


    buttonOpenFormAdd.addEventListener('click', ()=> {
        main.append( elementFormMarca )
    })

    elementSearchInput.addEventListener('input', e => {
        const dataMarca = ss('data-temp').get(true) 
        dataRender(dataMarca.filter(data => (data.name.toLowerCase()).includes(e.target.value.toLowerCase().trim())))
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
            <a href="#/marca/${ data.id }" class="a_item pointer">
                ${ data.name }
                ${ Icon.get('fi fi-rr-angle-small-right') }
            </a>
            `
        })

        appendElement(elementItem, elementItemData)
    }

    const dataLoad = ()=>{
        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'

        const queries = {
            token : ls('auth-token').get(),
            query : true,
            limit : '50',
        }
        
        datapi.get( api(`/api/marca?${ paramQueries( queries ) }`) )
            .then(data => {
                ss('data-temp').data(data).set(true)
                dataRender(data)
            })
        
    }

    dataLoad()
    
    return ElementComponent 

}
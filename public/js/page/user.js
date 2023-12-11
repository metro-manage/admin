import formUsuario from "../components/formUsuario.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()

    const ElementComponent = createElement(`
        <div class="div_gR08LPW icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <button class="button_8e752p0 pointer">${ Icon.get('fi fi-rr-menu-burger') }</button>
                    <h3>Usuarios</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button class="pointer" data-action="open_search">${ Icon.get('fi fi-rr-search') }</button>
                    <button id="buttonOpenFormAdd" class="pointer">${ Icon.get('fi fi-rr-plus') }</button>
                </div> 
            </header>
            <div id="elementSearch" class="div_Rv73PHH">
                <input type="text" id="elementSearchInput" placeholder="buscar">
                <button class="pointer" data-action="close_search">${ Icon.get('fi fi-rr-cross-small') }</button>
            </div>
            
            <div id="elementItem" class="div_D8Bka0d scroll-y">
                <div id="elementItemData" class="div_z0ukxj1"></div>
            </div>
        </div>
    `)

    const query = findElement(ElementComponent)

    const { elementItem, elementItemData, elementSearch, elementSearchInput, elementItemLoader, buttonOpenFormAdd } = query.getAttribute('id')
    
    const Position = [
        { id : 1, name : 'ADMINISTRADOR' },
        { id : 2, name : 'COLABORADOR' },
        { id : 3, name : 'USUARIO' }
    ]

    const _openNavigate = new CustomEvent('_openNavigate')
    query.get('.button_8e752p0').addEventListener('click', ()=> dispatchEvent( _openNavigate ) )

    const elementForm = formUsuario( true, {} )

    elementForm.addEventListener('_submit', e => {
        //if( e.detail.status ) dataLoad()
    })

    buttonOpenFormAdd.addEventListener('click', ()=> {
        main.append( elementForm )
    })

    elementSearchInput.addEventListener('input', e => {
        const dataUsers = ss('data-temp').get(true)
        dataRender(dataUsers.filter(data => (data.fullname.toLowerCase()).includes(e.target.value.toLowerCase().trim())))
    })

    query.get('button[data-action=open_search]').addEventListener('click', e => {
        elementSearch.classList.add('active')
        elementSearchInput.focus()
    })

    query.get('button[data-action=close_search]').addEventListener('click', e => {
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

        const fragment = document.createDocumentFragment()

        Data.forEach(data => {
            const element = createElement(`
                <a href="#/user/${ data.uid }" class="a_WXK0qy6 pointer">
                    <img src="${ api(`/storage/user/${ data.avatar || 'avatar.png' }`) }">
                    <div class="div_3P6bn2I">
                        <span>${ data.fullname }</span>
                        ${ (Position.find(position => position.id == data.position) ?? {}).name ?? '' }
                    </div>
                    ${ Icon.get('fi fi-rr-angle-small-right') }
                </a>
            `)

            fragment.append(element)
        });

        appendElement( elementItem, appendElement( elementItemData, fragment ) )
    }

    const dataLoad = ()=>{

        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'

        const query = {
            token : ls('auth-token').get(),
            query : true,
            limit : 50,
            after : 0
        }

        datapi.get(api(`/api/user?${ paramQueries(query) }`))
            .then(data => {
                ss('data-temp').data(data).set(true)
                dataRender(data)
            })
        
    }

    dataLoad()
    
    return ElementComponent
}
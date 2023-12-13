import formUsuario from "../components/formUsuario.js"

export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()

    const ElementComponent = ele.create(`
        <div class="div_gR08LPW icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <button id="btnOpenNavigate" class="button_8e752p0 pointer">${ Icon.get('fi fi-rr-menu-burger') }</button>
                    <h3>Usuarios</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button id="btnOpenSearch" class="pointer" data-action="open_search">${ Icon.get('fi fi-rr-search') }</button>
                    <button id="buttonOpenFormAdd" class="pointer">${ Icon.get('fi fi-rr-plus') }</button>
                </div> 
            </header>
            <div id="elementSearch" class="div_Rv73PHH" style="display:none">
                <input type="text" id="elementSearchInput" placeholder="buscar">
                <button class="pointer" >${ Icon.get('fi fi-rr-cross-small') }</button>
            </div>
            
            <div id="elementItem" class="div_D8Bka0d scroll-y">
                <div id="elementItemData" class="div_z0ukxj1"></div>
            </div>
        </div>
    `)

    const element = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { elementItem, elementItemData, buttonOpenFormAdd, btnOpenNavigate, btnOpenSearch } = element
 
    const Position = [
        { id : 1, name : 'ADMINISTRADOR' },
        { id : 2, name : 'COLABORADOR' },
        { id : 3, name : 'USUARIO' }
    ]

    const _openNavigate = new CustomEvent('_openNavigate')
    btnOpenNavigate.addEventListener('click', ()=> dispatchEvent( _openNavigate ) )

    const elementForm = formUsuario( true, {} )

    elementForm.addEventListener('_submit', e => {
        //if( e.detail.status ) dataLoad()
    })

    buttonOpenFormAdd.addEventListener('click', ()=> {
        main.append( elementForm )
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
            const element = ele.create(`
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

        ele.append( elementItem, ele.append( elementItemData, fragment ) )
    }

    const dataLoad = ()=>{

        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'

        const query = {
            token : localStorage.getItem('auth-token'),
            query : true,
            limit : 50,
            after : 0
        }

        datapi.get(api(`/api/user?${ paramQueries(query) }`))
            .then(data => {
                sessionStorage.setItem('data-temp', JSON.stringify( data ))
                dataRender(data)
            })
        
    }

    dataLoad()
    
    return ElementComponent
}
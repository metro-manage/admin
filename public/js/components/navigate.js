import style from "../setting/style.js"

export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')
    
    const Icon = new IconSVG()

    const ElementComponent = ele.create(`
        <div class="div_y6iL39I">
            <div id="closeElement" class="div_ksnt785"></div>
            <div class="div_RAPYu72 icon-svg">
                <div id="elementProfile" class="div_rMd76d0">
                    <img src="${ api('/storage/user/avatar.png') }">
                    <div>
                        <h3>nombre usuario</h3>
                        <span>-</span>
                    </div>
                    <label class="label_s5nPu">
                        <input type="checkbox" id="inputToogle" ${ localStorage.getItem('theme') == 'dark' ? 'checked' : ''}>
                        <span></span>
                    </label>
                </div>
                <nav class="nav_sVKUc89 scroll-y">
                    <div>
                        <a href="#/" class="button_av6D9xa pointer" data-page="">${ Icon.get('fi fi-rr-house-blank') }<span>Inicio</span></a>
                        <a href="#/store" class="button_av6D9xa pointer" data-page="store">${ Icon.get('fi fi-rr-box-circle-check') }<span>Inventario</span></a>
                        <a href="#/asistencia" class="button_av6D9xa pointer" data-page="asistencia">${ Icon.get('fi fi-rr-inventory-alt') }<span>Asistencia</span></a>
                        <a href="#/user" class="button_av6D9xa pointer" data-page="users">${ Icon.get('fi fi-rr-users') }<span>Usuario</span></a>
                    </div>
                </nav>
                <button id="buttonLogout" class="button_av6D9xa pointer">${ Icon.get('fi fi-rr-exit') }<span>Salir</span></button>
            </div>
        </div>
    `) 

    const elements = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { buttonLogout, elementProfile, inputToogle, closeElement } = elements
 
    const DataSelection = {
        position : [
            { id : 1, name : 'ADMINISTRADOR' },
            // { id : 2, name : 'COLABORADOR' },  
            { id : 3, name : 'USUARIO' }
        ]
    }
    
    closeElement.addEventListener('click', ()=> ElementComponent.remove() )

    inputToogle.addEventListener('change', ()=> {
        const theme = localStorage.getItem('theme') == 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', theme)
        style()
    })

    buttonLogout.addEventListener('click', ()=> {

        const query = {
            token   : localStorage.getItem('auth-token'),
            action  : 'logout'
        }

        datapi.post(api(`/api/auth?${ paramQueries( query ) }`))
            .then(res => { if( res ) {
                localStorage.removeItem('auth-token')
                location.hash = '#/login'
            }})
    })
  
    const defPutFocus =()=>{
        const page = location.hash.split('/')[1] ?? ''

        if(['', 'store', 'asistencia', 'user'].includes(page)) {
            const buttonFocus = ElementComponent.querySelector('a.focus')
            const buttonPage  = ElementComponent.querySelector(`a[ data-page = "${ page }"]`)
            if(buttonFocus) buttonFocus.classList.remove('focus') 
            if(buttonPage) buttonPage.classList.add('focus') 

            setTimeout(dataLoad)
        }

        ElementComponent.remove()
    }

    const dataRender =( data = {} )=>{

        elementProfile.querySelector('img').src = api(`/storage/user/${ data.avatar || 'avatar.png' }`)

        elementProfile.querySelector('div').innerHTML = `
            <h3>${ data.fullname ?? ''} ${ data.lastname ?? '' }</h3>
            <span>${ (DataSelection.position.find(position => position.id == data.position) ?? {}).name ?? '-' }</span>
        `

    }

    const dataLoad =()=>{
        dataRender( JSON.parse( localStorage.getItem('user-data') ) ) 
    }
 
    setTimeout(defPutFocus)
    addEventListener('hashchange', defPutFocus) 

    return ElementComponent
}
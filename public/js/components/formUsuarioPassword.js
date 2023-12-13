export default (add = true, data = {})=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = window.dataLib.params
    const Icon = new IconSVG()
  
    const ElementComponent = ele.create(`
        <div class="div_txGdK5a scroll-y icon-svg">
            <div id="closeElement" class="div_0jRV4oo"></div>
            <div class="div_5S0v3rr">
                <form id="form" class="form_Wjg689O" autocomplete="off">
                    <div class="div_6K15oiR">
                        <h2>Actualizar contraseña</h2>
                        <button type="button" id="buttonCloseElement" class="pointer">${ Icon.get('fi fi-rr-cross') }</button>
                    </div>
                    <div class="div_RRjPQLY">
                        <input type="password" name="password" placeholder="contraseña" autocomplete="off">
                    </div>
                    <div class="div_jmyxzzW">
                        <button type="submit" class="pointer">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    `)


    const elements = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { closeElement , form, buttonCloseElement } = elements

    const modalAlert = new Alert(document.getElementById('root'))

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    buttonCloseElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    form.addEventListener('submit', e => {
        e.preventDefault()

        ElementComponent.remove()

        const data = {
            password : form.password.value ?? ''
        }

        const queries = {
            token : localStorage.getItem('auth-token'),
            uid_user : params.id
        }

        datapi.patch(api(`/api/auth?${ paramQueries( queries ) }`), data)
                .then(res => {
                    if(res) modalAlert.show({ message : 'actualizado correctamente', name : 'success' })
                    else modalAlert.show({ message : 'no se pudo actualizar', name : 'warning' })
                }) 

    })

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    }) 

    return ElementComponent
}
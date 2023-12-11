export default (login = true)=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()

    const ElementComponent = createElement(`
        <div class="div_txGdK5a scroll-y icon-svg">
            <div id="closeElement" class="div_0jRV4oo"></div>
            <div class="div_5S0v3rr ${ login ? '' : 'register' }">
                <form id="form" class="form_Wjg689O" autocomplete="off">
                    <div class="div_6K15oiR">
                        <h2>${ login ? 'Inicio de sesion' : 'Registro' }</h2>
                        <button type="button" id="buttonCloseElement" class="pointer">${ Icon.get('fi fi-rr-cross') }</button>
                    </div>
                    ${ login ? '<input type="hidden" name="method" value="email">' : `
                        <div class="div_RRjPQLY">
                            <input type="password" name="code" placeholder="codigo de validacion" autocomplete="off">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="fullname" placeholder="nombre completo" autocomplete="off">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="lastname" placeholder="apellido" autocomplete="off">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="phone" placeholder="numero telefonico" autocomplete="off">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="gender" placeholder="Genero" autocomplete="off" readonly>
                        </div>  
                    ` }
                    <div class="div_RRjPQLY">
                        <input type="text" name="email" placeholder="correo" autocomplete="off">
                    </div>
                    <div class="div_RRjPQLY">
                        <input type="password" name="password" placeholder="contraseña" autocomplete="off">
                    </div>
                    <div class="div_jmyxzzW">
                        <button type="submit" class="pointer">${ login ? 'Ingresar' : 'Crear cuenta' }</button>
                    </div>
                </form>
            </div>
        </div>
    `)

    const query = findElement( ElementComponent )

    const { closeElement , form, buttonCloseElement} = query.getAttribute('id')

    const alert = new Alert(document.getElementById('root'))

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    buttonCloseElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    form.addEventListener('submit', e=> {
        e.preventDefault()

        if( login ) {
            const data = {
                method : form.method.value,
                value  : form.email.value,
                password : form.password.value
            }

            const query = {
                action : 'login',
                to : 'admin'
            }

            datapi.post(api(`/api/auth?${ paramQueries( query ) }`), data)
                .then(res => {
                    if(res.status) { 
                        ls('auth-token').data(res.token).set()
                        location.hash = '#/'
                    } else alert.show({ message : res.message ?? 'ocurrio un error' })

                })
        } else {
            const data = {
                auth  : {
                    password : form.password.value.trim()
                },
                user  : {
                    fullname: form.fullname.value.trim(),
                    lastname: form.lastname.value.trim(),
                    email   : form.email.value.trim(),
                    phone   : form.phone.value.trim(),
                    gender  : form.phone.value.trim(),
                }
    
            }

            const query = {
                action : 'register',
                code : form.code.value.trim()
            }
            
            datapi.post(api(`/api/auth?${ paramQueries( query ) }`), data)
                .then(res => {

                    if(res.status) { 
                        ls('auth-token').data(res.token).set()
                        location.hash = '#/'
                    } else alert.show({ message : res.message ?? 'ocurrio un error' })

                })
        } 
        
    })

    return ElementComponent
}
export default (add = true, data = {})=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = ss('params').get(true)
    const Icon = new IconSVG()
 
    const ElementComponent = createElement(`
        <div class="div_txGdK5a scroll-y icon-svg">
            <div id="closeElement" class="div_0jRV4oo"></div>
            <div class="div_5S0v3rr">
                <form id="form" class="form_Wjg689O" autocomplete="off">
                    <div class="div_6K15oiR">
                        <h2>${ add ? 'Agregar' : 'Actualizar' }</h2>
                        <button type="button" id="buttonCloseElement" class="pointer">${ Icon.get('fi fi-rr-cross') }</button>
                    </div>
                    <div class="div_RRjPQLY">
                        <input type="text" name="name" placeholder="nombre" autocomplete="off">
                    </div>
                    <div class="div_jmyxzzW">
                        <button type="submit" class="pointer">${ add ? 'Agregar' : 'Actualizar' }</button>
                    </div>
                </form>
            </div>
        </div>
    `)

    const query = findElement( ElementComponent )
 
    const { closeElement , form, buttonCloseElement } = query.getAttribute('id')

    const modalAlert = new Alert(document.getElementById('root'))

    form.querySelectorAll('input').forEach(input => {
        if( data[input.name] ) {
            input.value = data[input.name]
        }
    });

    buttonCloseElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })
   
    form.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            name : form.name.value,
            setting : JSON.stringify({}),
            status  : 1
        }

        if(add) {
            const queries = {
                token : ls('auth-token').get()
            }

            datapi.post(api(`/api/asistencia?${ paramQueries(queries) }`), data) 
                .then(res => {
                    if(res) modalAlert.show({ message : 'agregado correctamente' })
                    else modalAlert.show({ message : 'no se pudo agregar' }) 
                })
        } else {
            const queries = {
                token : ls('auth-token').get(),
                id    : params.id
            }
    
            datapi.patch( api(`/api/asistencia?${ paramQueries( queries ) }`), data )
                    .then(res => {
                        if(res) modalAlert.show({ message : 'actualizado correctamente' })
                        else modalAlert.show({ message : 'no se pudo actualizar' })
                    })
        }

    })

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    }) 

    return ElementComponent
}
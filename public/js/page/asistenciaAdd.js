export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()  

    const ElementComponent = createElement(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/asistencia" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Agregar Asistencia</h3>
                </div>
            </header>
            <div class="div_D8Bka0d scroll-y">
                <form id="form" class="form_9vrw747" autocomplete="off">
                    <div class="div_K61fxc9">
                        <label class="label_2VB5x53"><input type="text" name="name"><span>nombre</span></label>
                    </div>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const modalAlert = new Alert(document.getElementById('main'))

    const { form }  = query.getAttribute('id')

    form.addEventListener('input', e => {

        const target = e.target
        
        if( ['text', 'password'].includes(target.type) ) {
            target.classList[ target.value == '' ? 'remove' : 'add' ]('focus')
        }

    })

    form.addEventListener('submit', e => {
        e.preventDefault()


        const data = {
            name : form.name.value,
            setting : JSON.stringify({}),
            status  : 1
        }

        const query = {
            token : ls('auth-token').get()
        }

        datapi.post(api(`/api/asistencia?${ paramQueries(query) }`), data) 
            .then(res => {
                if(res) modalAlert.show({ message : 'agregado correctamente' })
                else modalAlert.show({ message : 'no se pudo agregar' }) 
            })

    })
    
    return ElementComponent

}
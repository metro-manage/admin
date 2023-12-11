import modalConfirmation from "../components/modalConfirmation.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = ss('params').get(true)
    const Icon = new IconSVG()  

    const ElementComponent = createElement(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/asistencia/${ params.id }" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Actualizar asistencia</h3>
                </div>
                <div class="div_ttL4BFL">
                    <button id="buttonDelete" class="pointer">${ Icon.get('fi fi-rr-trash') }</button>
                </div>
            </header>
            <div class="div_D8Bka0d scroll-y">
                <form id="form" class="form_9vrw747" autocomplete="off">
                    <div class="div_K61fxc9">
                        <label class="label_2VB5x53"><input type="text" name="name"><span>nombre</span></label>
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const main  = document.getElementById('main')
    const confirmDelete = modalConfirmation({ message : '¿Eliminar?' }, ()=> {
        
        const query = {
            token : ls('auth-token').get(),
            id : params.id
        }  

        datapi.delete(api(`/api/asistencia?${ paramQueries( query ) }`))
            .then(res => {
                if(res) {
                    location.hash = '#/asistencia   '
                }
                else modalAlert.show({ message : 'no se pudo eliminar' })
            })
    })

    const modalAlert = new Alert(document.getElementById('root'))

    const { form, buttonDelete } = query.getAttribute('id')

  
    if( buttonDelete ) {
        buttonDelete.addEventListener('click', ()=> {
            main.append(confirmDelete)
        })
    }

    form.addEventListener('input', e => {

        const target = e.target
        
        if( ['text', 'password'].includes(target.type) ) {
            target.classList[ target.value == '' ? 'remove' : 'add' ]('focus')
        }

    })

    form.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            name : form.name.value ?? ''
        }

        const query = {
            token : ls('auth-token').get(),
            id    : params.id
        }

        datapi.patch( api(`/api/asistencia?${ paramQueries( query ) }`), data )
                .then(res => {
                    if(res) modalAlert.show({ message : 'actualizado correctamente' })
                    else modalAlert.show({ message : 'no se pudo actualizar' })
                })

    })

    const dateRender =( data = {} )=>{

        form.querySelectorAll('input').forEach(input => {
            if( data[input.name] != undefined ) {
                 input.value = data[input.name]
                 input.classList.add('focus')
             }
        })

    }

    const dataLoad =()=>{
        const query = {
            token : ls('auth-token').get(),
            id : params.id
        }

        datapi.get(api(`/api/asistencia?${ paramQueries( query ) }`))
            .then( dateRender )
    }

    dataLoad()
    

    return ElementComponent
}
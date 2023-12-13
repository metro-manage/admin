export default ( option = null, actions = [], callback = null )=>{

    const Icon = new IconSVG()

    const Options = {
        marca  :  [
            { icon : 'fi fi-rr-pencil', action:'update', name : 'actualizar' },
            { icon : 'fi fi-rr-trash', action:'delete', name : 'eliminar' }
        ],
        categoria  :  [
            { icon : 'fi fi-rr-pencil', action:'update', name : 'actualizar' },
            { icon : 'fi fi-rr-trash', action:'delete', name : 'eliminar' }
        ],
        producto  :  [
            { icon : 'fi fi-rr-pencil', action:'update', name : 'actualizar' },
            { icon : 'fi fi-rr-trash', action:'delete', name : 'eliminar' }
        ],
        asistencia  :  [
            { icon : 'fi fi-rr-pencil', action:'update', name : 'actualizar' },
            { icon : 'fi fi-rr-trash', action:'delete', name : 'eliminar' }
        ],
        usuario    : [
            { icon : 'fi fi-rr-pencil', action:'update', name : 'actualizar' },
            { icon : 'fi fi-rr-key', action:'update_password', name : 'actualizar contraseña' },
            { icon : 'fi fi-rr-trash', action:'delete', name : 'eliminar' }
        ],
        asistencia_usuario : [
            { icon : 'fi fi-rr-user-slash', action:'remove', name : 'remover' },
            { icon : 'fi fi-rr-user-add', action:'add', name : 'integrar' },
            { icon : 'fi fi-rr-delete-user', action:'delete', name : 'quitar' }
        ]
    }

    const ElementComponent = ele.create(`
        <div class="div_txGdK5a icon-svg" style="position:absolute">
            <div id="elementCloseTap" class="div_0jRV4oo"></div>
            <div class="div_xBmwFGs scroll-y">
                <div id="ElementItem" class="div_TbbD222">
                    ${ (Options[ option ] || []).map( option => {
                        if( !actions.includes(option.action) && !actions.includes('*')) return ''
                        return `
                            <button class="pointer" data-action="${ option.action }">
                                ${ Icon.get(option.icon) }
                                <span>${ option.name }</span>
                            </button>
                        `
                    }).join('') }
                </div>
            </div>
        </div>
    `)

    const elements = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { elementCloseTap, ElementItem } = elements

    elementCloseTap.addEventListener('click', ()=> ElementComponent.remove())
    ElementItem.addEventListener('click', e => {
        const button = e.target.closest('button')

        if( button ) {  
            if( typeof callback == 'function' ) callback( button.dataset.action )
        }

        ElementComponent.remove()
    })

    return ElementComponent
}
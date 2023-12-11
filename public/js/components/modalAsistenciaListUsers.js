import modalConfirmation from "./modalConfirmation.js"

import options from "./options.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()
    const params = ss('params').get(true)

    const ElementComponent = createElement(`
        <div class="div_txGdK5a scroll-y icon-svg" style="padding:0">
            <div id="closeElement" class="div_0jRV4oo"></div>
            <div class="div_FS22BJ7">
                <div class="div_82XMPG6 scroll-x">
                    <div id="tabsElement" class="div_Sp09eL8">
                        <span class="pointer focus" data-type="agregados">${ Icon.get('fi fi-rr-users') }</span>
                        <span class="pointer" data-type="removidos">${ Icon.get('fi fi-rr-user-slash') }</span>
                        <span class="pointer" data-type="add">${ Icon.get('fi fi-rr-user-add') }</span>
                    </div>
                </div>
                <input type="text" class="input_qsHnP2S" placeholder="buscar">
                
                <div id="elementItem" class="div_yi13dGk scroll-y">
                    <div id="elementItemData" class="div_5d6X5X2"></div>
                </div>
            </div>
        </div>
    `)

    let typeList = 'agregados'
    const query = new findElement(ElementComponent)

    const { elementItem, elementItemData, closeElement, tabsElement } = query.getAttribute('id') 

     

    closeElement.addEventListener('click', () => ElementComponent.remove())
    tabsElement.addEventListener('click', e => {

        const span = e.target.closest('span')
        if( span ) {

            const spanFocus = e.currentTarget.querySelector('span.focus')

            if(spanFocus) spanFocus.classList.remove('focus')
            span.classList.add('focus')

            typeList = span.dataset.type
            dataLoad(); 
        }
    })

    elementItemData.addEventListener('click', e => {
        const button = e.target.closest('button')

        if( button ) {
            const item   = button.closest('.div_U4B3pwL')

            const itemData = JSON.parse(item.dataset.data) 

            if( typeList == 'add' ) {
                item.remove()
                const data = {
                    id_asistencia : params.id,
                    uid_user : itemData.data_user.uid,
                    setting  : JSON.stringify({}),
                    status   : 1
                }

                const queries = {
                    token : ls('auth-token').get()
                }

                datapi.post(api(`/api/asistencia-user?${ paramQueries( queries ) }`), data)
                    .then(console.log)

            } else {

                const actions = []
                if( typeList == 'agregados' ) actions.push(...['remove']) 
                else if( typeList == 'removidos' ) actions.push(...['add', 'delete']) 

                ElementComponent.querySelector('.div_FS22BJ7').append(options('asistencia_usuario', actions, option => {
                    if( option == 'remove' ) {
                        const queries = {
                            token   : ls('auth-token').get(),
                            id      : itemData.id
                        }

                        datapi.patch(api(`/api/asistencia-user?${ paramQueries( queries ) }`), { status : 2 })
                    }
                    else if( option == 'add' ) {
                        const queries = {
                            token   : ls('auth-token').get(),
                            id      : itemData.id
                        }

                        datapi.patch(api(`/api/asistencia-user?${ paramQueries( queries ) }`), { status : 1 })
                            .then( console.log )
                    }
                    else if( option == 'delete' ) {
                        ElementComponent.append(
                            modalConfirmation({ message : '¿ Eliminar ?' }, ()=> {
                                item.remove()

                                const queries = {
                                    token   : ls('auth-token').get(),
                                    id      : itemData.id,
                                    uid_user: itemData.uid_user
                                }

                                datapi.delete(api(`/api/asistencia-user?${ paramQueries( queries ) }`))
                                    .then( console.log )
                            })
                        )
                        return
                    }

                    item.remove()
                }))
            }
            
        }
    })

    const dataRender =( Data = [] )=>{
        if(!Data.length) {
            return elementItem.innerHTML = `
                <div class="div_80euglIeYkNE39v">
                    ${ Icon.get('icon-light box-empty') }
                    <h3>Lista vacia</h3>
                </div>
            `
        }

        const fragment = document.createDocumentFragment()  

        Data.forEach(data => {

            if( typeof data.data_asistencia == 'string' ) data.data_asistencia = JSON.parse( data.data_asistencia )
            if( typeof data.data_user == 'string' ) data.data_user = JSON.parse( data.data_user )

            const element = createElement(`
                <div class="div_U4B3pwL">
                    <img src="${ api(`/storage/user/${ data.data_user.avatar || 'avatar.png' }`) }">
                    <span class="text-ellipsis">${ data.data_user.fullname } ${ data.data_user.lastname }</span>
                    <button class="pointer">${ Icon.get( typeList == 'add' ? 'fi fi-rr-user-add' : 'fi fi-rr-menu-dots') }</button>
                </div>
            `)

            element.setAttribute('data-data', JSON.stringify( data ))
            fragment.append( element )
        });
      
        appendElement( elementItem, appendElement( elementItemData, fragment ) )
    }

    const dataLoad =()=>{
 
        elementItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'

        if( typeList == 'agregados' ) {
            const queries = {
                token : ls('auth-token').get(),
                query : true,
                id_asistencia : params.id,
                status : 1
            }

            datapi.get(api(`/api/asistencia-user?${ paramQueries( queries ) }`))
                .then(dataRender)
        }

        else if( typeList == 'removidos' ) {
            const queries = {
                token : ls('auth-token').get(),
                query : true,
                id_asistencia : params.id,
                status : 2
            }

            datapi.get(api(`/api/asistencia-user?${ paramQueries( queries ) }`))
                    .then(dataRender)
        }

        else if( typeList == 'add' ) {
            const queries = {
                token : ls('auth-token').get(),
                asistencia_add_user : true,
                id_asistencia : params.id
            }

            datapi.get(api(`/api/user?${ paramQueries( queries ) }`))
                .then( res => {
                    res.forEach((data, index) => {
                        res[ index ] = { data_user : data }
                    });
                    dataRender(res)
                })

        }

    }

    dataLoad()
    return ElementComponent
}
export default (add = true, data = {})=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = ss('params').get(true)
    const Icon = new IconSVG()

    const Month = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const ElementComponent = createElement(`
        <div class="div_txGdK5a scroll-y icon-svg">
            <div id="closeElement" class="div_0jRV4oo"></div>
            <div class="div_5S0v3rr">
                <form id="form" class="form_Wjg689O" autocomplete="off">
                    <div class="div_6K15oiR">
                        <h2>${ add ? 'Agregar' : 'Actualizar' }</h2>
                        <button type="button" id="buttonCloseElement" class="pointer">${ Icon.get('fi fi-rr-cross') }</button>
                    </div>
                    <div class="div_K61fxc9">
                        <div class="div_RRjPQLY">
                            <label class="label_z8DTJA7">
                                <input type="file" name="image" accept="image/*">
                                <span>subir imagen</span>
                            </label>
                            <div id="containerImageElement" class="div_Iaf1Qwz" style="display:none">
                                <img src="./public/img/icons/icon-image.png" id="imageElement" class="img_zEgR0X2" alt="img-producto">
                                <button type="button" id="buttonRemoveImageElement" class="button_C96kN0x" >${ Icon.get('fi fi-rr-trash') }</button>
                            </div>
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="sap" placeholder="sap">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="ean" placeholder="ean">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="description" placeholder="description">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="datetime_expirate" placeholder="fecha de vencimiento" readonly >
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="categoria" placeholder="categoria" readonly >
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="marca" data-value="" placeholder="marca" readonly >
                        </div>
                        <div class="div_RRjPQLY">
                            <div class="div_UA3v267">
                                <span class="span_Q60Cjey">Habilitar</span>
                                <label class="label_s5nPu">
                                    <input type="checkbox" name="status" id="inputToogle" checked>
                                    <span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="div_jmyxzzW">
                        <button type="submit" class="pointer">${ add ? 'Agregar' : 'Actualizar' }</button>
                    </div>
                </form>
            </div>
        </div>
    `)

    const query = findElement( ElementComponent )

    const { closeElement , form, buttonCloseElement, containerImageElement, imageElement, buttonRemoveImageElement } = query.getAttribute('id')

    const modalAlert = new Alert(document.getElementById('root'))
    let ElementCategoriaOption = ''
    let ElementMarcaOption = ''
    let ElementCalendarDatetimeExpirate = ''

    let formFile = null

    form.querySelectorAll('input').forEach(input => {

        if(['datetime_expirate'].includes(input.name)) { 

            if(input.value != '') {
                const date = new Date(data[input.name])
                input.value = `${ date.getDate() } ${ Month[ date.getMonth() ] } ${ date.getFullYear() }`
                input.dataset.value = data[input.name] 
            }

        }

        else if( ['status' ].includes(input.name)) {

            if( data[input.name] == 1 ) {
                input.checked = true
            }  else {
                input.checked = false
            }
        }

        else if(['marca', 'categoria'].includes(input.name)) {
            if( typeof data[`data_${ input.name }`] == 'string' ) data[`data_${ input.name }`] = JSON.parse(data[`data_${ input.name }`])
            if( (data[`data_${ input.name }`] ?? {}).id != undefined ) {
                input.value = data[`data_${ input.name }`].name ?? '' 
                input.dataset.value = data[`data_${ input.name }`].id ?? '' 
                //input.classList.add('focus')
            } 
        }

        else if( data[input.name] ) {
            input.value = data[input.name]
        }
    });

    buttonCloseElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    buttonRemoveImageElement.addEventListener('click', ()=> {
        formFile = null
        containerImageElement.style.display = 'none'
    })

    form.image.addEventListener('change', e => {
        const file = e.target.files[0]

        if(file) {
            formFile = file
            const fileLoad = new FileLoad(file)
            fileLoad.load(()=> {
                imageElement.classList.add('complete') 
                imageElement.setAttribute('src', URL.createObjectURL(file))
                containerImageElement.style.display = 'flex'
            })
            fileLoad.start()
        }
        
    })

    form.addEventListener('click', e => {
        const input = e.target

        if(input.readOnly) {
            if(input.name == 'datetime_expirate') main.append( ElementCalendarDatetimeExpirate )
            if(input.name == 'categoria') main.append( ElementCategoriaOption )
            if(input.name == 'marca') main.append( ElementMarcaOption )
        }

    })

    form.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            sap : form.sap.value ?? null,
            ean : form.ean.value ?? '',
            description : form.description.value ?? '',
            id_categoria : form.categoria.dataset.value ?? '',
            id_marca : form.marca.dataset.value ?? '',
            datetime_expirate : form.datetime_expirate.dataset.value,
            status   : form.status.checked ? 1 : 0
        }
        
        const dataAddUpdate =()=>{
            if(add) { 

                const query = {
                    token : ls('auth-token').get()
                }

                datapi.post(api(`/api/producto?${ paramQueries(query) }`), data)
                    .then(res => {
                        console.log(res);
                        if(res) modalAlert.show({ message : 'agregado correctamente' })
                        else modalAlert.show({ message : 'no se pudo agregar' }) 
                    })
                    
            } else {

                const query = {
                    token : ls('auth-token').get(),
                    id    : params.id
                }

                datapi.patch(api(`/api/producto?${ paramQueries(query) }`), data)
                    .then(res => {
                        if(res) modalAlert.show({ message : 'actualizado correctamente' })
                        else modalAlert.show({ message : 'no se pudo actualizar' })
                    })
            }
        }

        if( formFile ) {
            
            fetch(api('/api/files?to=product'), {
                method : 'POST',
                body   : objectFormData({
                    file : formFile
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if( res.status ) {
                        data.img = res.name
                        dataAddUpdate()
                    }
                })
        } else dataAddUpdate()
       
    })

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    }) 

    const queries = {
        token   : ls('auth-token').get(),
        query   : true,
        limit   : 'all'
    }

    datapi.get(api(`/api/categoria?=${ paramQueries(queries) }`))
        .then(Data => {
            const option = {
                Data : Data,
                name : 'name',
                value: (data.data_categoria ?? {}).name ?? null
            }
    
            ElementCategoriaOption = ElementOption( option )

            ElementCategoriaOption.addEventListener('_change', e => {
                const data = e.detail
                const target = form.categoria
                target.value = data.name 
                target.dataset.value = data.id  
                //target.classList.add('focus')
            }) 
        })
 
    datapi.get(api(`/api/marca?=${ paramQueries(queries) }`))
        .then(Data => {
            const option = {
                Data : Data,
                name : 'name',
                value: (data.data_marca ?? {}).name ?? null
            }

            ElementMarcaOption = ElementOption( option )

            ElementMarcaOption.addEventListener('_change', e => {
                const data = e.detail
                const target = form.marca
                target.value = data.name 
                target.dataset.value = data.id  
                //target.classList.add('focus')
            })
        })

    ElementCalendarDatetimeExpirate = ElementCalendar(data.datetime_expirate ?? null)

    ElementCalendarDatetimeExpirate.addEventListener('_change', e => {
        const target = form.datetime_expirate
        const date   = e.detail

        target.dataset.value = date.getTime()
        target.value = `${ date.getDate() } ${ Month[ date.getMonth() ] } ${ date.getFullYear() }`
        //target.classList[ target.value == '' ? 'remove' : 'add' ]('focus')
    })

    return ElementComponent
}
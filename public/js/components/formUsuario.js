export default (add = true, data = {})=>{
    
    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = window.dataLib.params
    const Icon = new IconSVG()

    const Month = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const Gender = [
        { id : 1, name : 'MASCULINO' },
        { id : 2, name : 'FEMENINO' }
    ]

    const Position = [ 
        { id : 1, name : 'ADMINISTRADOR' },
        { id : 2, name : 'COLABORADOR' },
        { id : 3, name : 'USUARIO' }
    ]

    data.data_gender = Gender.find( gender => gender.id == data.gender )
    data.data_position = Position.find( position => position.id == data.position )
 
    const ElementComponent = ele.create(`
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
                            <input type="text" name="fullname" placeholder="nombre completo">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="lastname" placeholder="apellido">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="email" placeholder="correo">
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="phone" placeholder="numero de celular">
                        </div>
                        ${ add ? `
                            <div class="div_RRjPQLY">
                                <input type="password" name="password" placeholder="contraseña">
                            </div>
                        ` : '' }
                        <div class="div_RRjPQLY">
                            <input type="text" name="birthday" placeholder="fecha de nacimiento" readonly >
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="gender" placeholder="genero" readonly >
                        </div>
                        <div class="div_RRjPQLY">
                            <input type="text" name="position" data-value="" placeholder="cargo" readonly >
                        </div>
                        <div class="div_RRjPQLY">
                            <div class="div_UA3v267">
                                <span class="span_Q60Cjey">Habilitar</span>
                                <label class="toggle">
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

    const element = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { closeElement , form, buttonCloseElement, containerImageElement, imageElement, buttonRemoveImageElement } = element

    const modalAlert = new Alert(document.getElementById('root'))
    let ElementGenderOption = ''
    let ElementPositionOption = ''
    let ElementCalendarBirthday = ''

    let formFile = null

    form.querySelectorAll('input').forEach(input => {
        
        if(['birthday'].includes(input.name)) { 
            if( data[input.name] ) {
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

        else if(['gender', 'position'].includes(input.name)) {

            if( typeof data[`data_${ input.name }`] == 'string' ) data[`data_${ input.name }`] = JSON.parse(data[`data_${ input.name }`])
            if( (data[`data_${ input.name }`] ?? {}).id != undefined ) {
                input.value = data[`data_${ input.name }`].name ?? '' 
                input.dataset.value = data[`data_${ input.name }`].id ?? '' 
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
            if(input.name == 'birthday') main.append( ElementCalendarBirthday )
            if(input.name == 'gender') main.append( ElementGenderOption )
            if(input.name == 'position') main.append( ElementPositionOption )
        }

    })

    form.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            user : {
                fullname : form.fullname.value ?? '',
                lastname : form.lastname.value ?? '',
                email : form.email.value ?? '',
                phone : form.phone.value ?? '',
                birthday : form.birthday.dataset.value ?? '',
                gender : form.gender.dataset.value ?? '',
                position : form.position.dataset.value ?? '',
                status   : form.status.checked ? 1 : 0
            }
        }

        const dataAddUpdate =()=>{ 

            if(add) {  

                data.auth =  {
                    password : form.password.value ?? ''
                }

                const querie = {
                    token : localStorage.getItem('auth-token')
                } 
                
                datapi.post(api(`/api/user?${ paramQueries(querie) }`), data)
                    .then(res => {
                        console.log(res);
                        if(res.status || res) {
                            formFile = null
                            modalAlert.show({ message : 'agregado correctamente', name : 'success' })
                        } 
                        else modalAlert.show({ message : res.message ?? 'no se pudo agregar', name : 'warning'  }) 
                    })
                    
            } else {
                const querie = {
                    token : localStorage.getItem('auth-token'),
                    uid    : params.id
                }

                datapi.patch(api(`/api/user?${ paramQueries(querie) }`), data.user)
                    .then(res => {
                        if(res.status || res) {
                            formFile = null
                            modalAlert.show({ message : 'actualizado correctamente', name : 'success' })
                        }
                        else modalAlert.show({ message : res.message ?? 'no se pudo actualizar', name : 'warning' })
                    }) 
            }
        }

        if( formFile ) {

            fetch(api('/api/files?to=user'), {
                method : 'POST',
                body   : objectFormData({
                    file : formFile
                })
            })
                .then(res => res.json())
                .then(res => {
                    if( res.status ) {
                        data.user.avatar = res.name
                        dataAddUpdate()
                    }
                })
        } else {
            dataAddUpdate()
        } 
    })

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    }) 

    const optionGender = {
        Data : Gender,
        name : 'name',
        value: data.gender ?? null
    }

    ElementGenderOption = ElementOption( optionGender )

    ElementGenderOption.addEventListener('_change', e => {
        const data = e.detail
        const target = form.gender
        target.value = data.name 
        target.dataset.value = data.id  
    }) 

    const optionPosition = {
        Data : Position,
        name : 'name',
        value: data.position ?? null
    } 

    ElementPositionOption = ElementOption( optionPosition )

    ElementPositionOption.addEventListener('_change', e => {
        const data = e.detail
        const target = form.position
        target.value = data.name 
        target.dataset.value = data.id  
        //target.classList.add('focus')
    })

    ElementCalendarBirthday = ElementCalendar(data.birthday ?? null)

    ElementCalendarBirthday.addEventListener('_change', e => {
        const target = form.birthday
        const date   = e.detail

        target.dataset.value = date.getTime()
        target.value = `${ date.getDate() } ${ Month[ date.getMonth() ] } ${ date.getFullYear() }`
        //target.classList[ target.value == '' ? 'remove' : 'add' ]('focus')
    })

    return ElementComponent
}
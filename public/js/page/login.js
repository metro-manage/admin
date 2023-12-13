import login from "../components/login.js"

export default ()=>{
    const ElementComponent = ele.create(`
        <div class="div_tS5ziRq">
            <div class="div_80UPXb0">
                <button id="openLogin" class="button_eoicgCS pointer focus">Inicio de sesion</button>
                <button id="openRegister" class="button_eoicgCS pointer">Registro</button>
            </div>
        </div>
    `)

    const main  = document.getElementById('main')

    const element = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { openLogin, openRegister } = element
 
    const elementLogin = login(true)
    const elementRegister = login(false)

    openLogin.addEventListener('click', ()=> {
        main.append( elementLogin )
    })

    openRegister.addEventListener('click', ()=> {
        main.append( elementRegister )
    })

    return ElementComponent
}
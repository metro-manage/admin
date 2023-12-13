export default (data = {}, callback = null)=>{
    const ElementComponent = ele.create(`
        <div class="div_txGdK5a">
            <div id="elementCloseTap" class="div_0jRV4oo"></div>
            <div class="div_1W9khLP">
                <h3>${ data.message ?? 'MENSAJE DE CONFIRMACION' }</h3>
                <div class="div_xm1lq85">
                    <button id="buttonCancel" class="pointer" data-action="cancelar">cancelar</button>
                    <button id="buttonConfirm" class="pointer dark" data-action="confirmar">confirmar</button>
                </div>
            </div>
        </div>
    `)   

    const elements = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { elementCloseTap, buttonCancel, buttonConfirm } = elements

    elementCloseTap.addEventListener('click', ()=> ElementComponent.remove())
    buttonCancel.addEventListener('click', ()=> ElementComponent.remove())
    buttonConfirm.addEventListener('click', ()=> {
        if(typeof callback == 'function') callback() 
        ElementComponent.remove()
    })
    
    return ElementComponent
}
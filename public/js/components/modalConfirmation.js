export default (data = {}, callback = null)=>{
    const ElementComponent = createElement(`
        <div class="div_txGdK5a">
            <div class="div_0jRV4oo"></div>
            <div class="div_1W9khLP">
                <h3>${ data.message ?? 'MENSAJE DE CONFIRMACION' }</h3>
                <div class="div_xm1lq85">
                    <button class="pointer" data-action="cancelar">cancelar</button>
                    <button class="pointer dark" data-action="confirmar">confirmar</button>
                </div>
            </div>
        </div>
    `)   

    const query = new findElement(ElementComponent)
    query.get('.div_0jRV4oo').addEventListener('click', ()=> ElementComponent.remove())
    query.get('button[data-action="cancelar"]').addEventListener('click', ()=> ElementComponent.remove())
    query.get('button[data-action="confirmar"]').addEventListener('click', ()=> {
        if(typeof callback == 'function') callback() 
        ElementComponent.remove()
    })
    
    return ElementComponent
}
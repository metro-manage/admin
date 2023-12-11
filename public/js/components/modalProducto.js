export default (data)=>{
    const ElementComponent = createElement(`
        <div class="div_coYHY1d">
            <div class="div_hs8YwzJ"></div>
            <div class="div_NlJ0D2C">
                <div class="div_04bAm9R"><span class="loader"></span></div>
                <div class="div_1s0Ru">
                    <div class="div_21EH6K7" >
                        <a class="a_Ale0G7A icon">
                            <div class="div_686E97q">
                                <img src="public/img/products/${ data.SAP }.webp">
                                <span style="display:none">${ data.COUNT ?? 0 }</span>
                            </div>
                            <div class="div_R77tzMq">
                                <p>${ data.DESCRIPCION }</p>
                                <div class="div_7sK416Q">
                                    <p>EAN : ${ data.EAN }</p>
                                    <p>HU : ${ data.SAP }</p>
                                </div>
                            </div>
                        </a>
                        <hr class="hr_3V8tZX0">
                        <div class="div_8zbeed9">
                            <span style="display:none">hace 18min</span>
                            <span class="color-red" style="display:none">quiebre</span>
                        </div>
                    </div>
                    <div class="div_cyKZQ"><img src=""></div>
                </div>
            </div>
        </div>
    `)


    const constainerLoader = ElementComponent.querySelector('.div_04bAm9R')
    // const constainerElementItem = ElementComponent.querySelector('.div_1s0Ru')
    const constainerElementBarcode = ElementComponent.querySelector('.div_cyKZQ')

    constainerLoader.remove()

    JsBarcode(constainerElementBarcode.querySelector('img'), data.EAN, {
        format: "CODE128",
        width: 2,
        height: 100,
    });
 
    
    const defRemoveElement = e =>{
        ElementComponent.remove() 
        e.target.removeEventListener(e.type, defRemoveElement)
    }

    const tapRemoveElement = ElementComponent.querySelector('.div_hs8YwzJ')

    tapRemoveElement.addEventListener('click', defRemoveElement)
    addEventListener('hashchange', defRemoveElement)

    return ElementComponent
}
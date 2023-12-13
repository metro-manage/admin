export default ()=>{

    const Icon = new IconSVG()

    const ElementComponent = ele.create(`
        <div class="div_f0Au33C scroll-y icon-svg">
            <div class="div_Tlv4V2w">
                <a href="#/producto" class="a_item pointer">
                    productos
                    ${ Icon.get('fi fi-rr-angle-small-right') }
                </a>
                <a href="#/categoria" class="a_item pointer">
                    categoria
                    ${ Icon.get('fi fi-rr-angle-small-right') }
                </a>
                <a href="#/marca" class="a_item pointer">
                    marcas
                    ${ Icon.get('fi fi-rr-angle-small-right') }
                </a>
            </div>
        </div>
    `)
    
    return ElementComponent
}
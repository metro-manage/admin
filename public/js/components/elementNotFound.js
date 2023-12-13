export default (data)=>{
    const Icon = new IconSVG()  
 
    const ElementComponent = ele.create(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="${ data.href }" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>${ data.title }</h3>
                </div>
            </header>
            <div class="div_D8Bka0d scroll-y">
                <div class="div_80euglIeYkNE39v">
                    ${ Icon.get('icon-light box-empty') }
                    <h3>${ data.message }</h3>
                </div>
            </div>
        </div>
    `)

    return ElementComponent
}
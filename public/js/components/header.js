import navigate from "./navigate.js"

export default ()=>{

    const Icon = new IconSVG()

    const ElementComponent = createElement(`
        <header class="header_2Nj88 icon-svg">
            <div class="div_i55ej"> 
                <button class="button_8e752p0 pointer">${ Icon.get('fi fi-rr-menu-burger') }</button>
                <h3 data-element="page-name">INICIO</h3>
            </div>
            <div class="div_ttL4BFL">
                <button class="pointer" data-action="open_search">${ Icon.get('fi fi-rr-search') }</button>
                <a href="#/asistencia/add" class="pointer">${ Icon.get('fi fi-rr-plus') }</a>
            </div> 
        </header>
    `) 

    const query = new findElement(ElementComponent)
    const root = document.getElementById('root')
    const elementNavigate = navigate()
    const elementPage = query.get('[data-element="page-name"]')
    const elementRight = query.get('.div_ttL4BFL')

    query.get('.button_8e752p0').addEventListener('click', ()=> root.append(elementNavigate) )
 
    const elementRender =()=>{
        const page = location.hash.split('/')[1] ?? ''
        if(['', 'configuracion', 'store'].includes(page)) {
            root.prepend(ElementComponent)
            elementPage.textContent = (page || 'inicio').toLocaleUpperCase()

            if( ['users', 'asistencia'].includes(page) ) {
                ElementComponent.append(elementRight)
            } else elementRight.remove()

        } else ElementComponent.remove()
        ElementComponent.removeAttribute('style')
    } 

    ElementComponent.setAttribute('style', 'display:none')
    setTimeout(()=> elementRender())
    addEventListener('hashchange', elementRender)
    addEventListener('_openNavigate', ()=> root.append(elementNavigate))

    return ElementComponent
}
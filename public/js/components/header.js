import navigate from "./navigate.js"

export default ()=>{

    const Icon = new IconSVG()

    const ElementComponent = ele.create(`
        <header class="header_2Nj88 icon-svg">
            <div class="div_i55ej"> 
                <button id="btnOpenNavigate" class="button_8e752p0 pointer">${ Icon.get('fi fi-rr-menu-burger') }</button>
                <h3 id="namePage"></h3>
            </div>
            <div id="elementRight" class="div_ttL4BFL">
                <button class="pointer" data-action="open_search">${ Icon.get('fi fi-rr-search') }</button>
                <a href="#/asistencia/add" class="pointer">${ Icon.get('fi fi-rr-plus') }</a>
            </div> 
        </header>
    `) 

    const root = document.getElementById('root')
    const elementNavigate = navigate()

    const element = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { btnOpenNavigate, namePage, elementRight } = element

    btnOpenNavigate.addEventListener('click', ()=> root.append(elementNavigate) )
 
    const elementRender =()=>{
        const page = location.hash.split('/')[1] ?? ''
        if(['', 'configuracion', 'store'].includes(page)) {
            root.prepend(ElementComponent)
            namePage.textContent = (page || 'inicio').slice(0,1).toLocaleUpperCase() + (page || 'inicio').slice(1, 1000).toLocaleLowerCase()

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

export default ( type = null )=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG()

    const ElementComponent = ele.create(`
        <div class="div_0n7sn4Q icon-svg">
            <div id="closeElement" class="div_0jRV4oo"></div>
            <div class="div_7V8mcg0">
                <div id="elementSearch" class="div_A07s4rS">
                    <button id="buttonCloseElement" class="pointer">
                        ${ Icon.get('fi fi-rr-arrow-small-left') }
                    </button>
                    <input type="text" id="inputSearch" placeholder="buscar...">
                    <div id="elementItemLoader" class="container-loader" style="--wh:25px"><span class="loader"></span></div>
                </div>
                <div id="elementItem" class="div_XkV5zx2 scroll-y">
                    
                    <div id="elementItemEmpty" class="div_6oGktJ6">No hay resultados</div>
                    <div class="div_7eE8YBg" id="elementItemData"></div>
                </div>
            </div>
        </div>
    `)

    const elements = ele.object( ElementComponent.querySelectorAll('[id]'), 'id', true )
    const { elementSearch, closeElement, buttonCloseElement, inputSearch, elementItem, elementItemLoader, elementItemEmpty, elementItemData } = elements

    let timeInputSearch = null
    inputSearch.addEventListener('input', e => {
        
        if( timeInputSearch != null ) {
            clearTimeout( timeInputSearch )
        }

        timeInputSearch = setTimeout(()=> {
            dataLoad( 'producto' )
        }, 100)
    })

    closeElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    buttonCloseElement.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    const dataRender =( Data = [] )=>{

        elementItemLoader.remove()

        if( !Data.length ) {
            // elementItem.textContent = ''
            ele.append( elementItem, elementItemEmpty )
            return
        }

        const fragment = document.createDocumentFragment()

        Data.forEach(data => {
            const element = ele.create(`
                <a href="#/producto/edit/${ data.id }" class="a_DLQBfD4 pointer">
                    <img src="${ api(`/storage/productos/${ data.img }`) }">
                    <div class="text-ellipsis">${ data.description }</div>
                    ${ Icon.get('fi fi-rr-angle-small-right') }
                </a>
            `)

            fragment.append( element )
        });

        ele.append( elementItem, ele.append( elementItemData, fragment ) )
    }

    const dataLoad =(search = null)=>{

        elementSearch.append(  elementItemLoader ) 

        if( search == 'producto' ) {
            const queries = {
                search: true,
                search_value: inputSearch.value,
                limit : 50
            }

            datapi.get(api(`/api/producto?${ paramQueries( queries ) }`))
                .then( dataRender )
        }

    }

    elementItem.textContent = ''
    dataLoad( 'producto' )


    return ElementComponent
}
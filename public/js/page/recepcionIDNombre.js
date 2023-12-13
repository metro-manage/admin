import modalProducto from "../components/modalProducto.js"

export default (params)=>{

    const ElementComponent = ele.create(`
        <div class="div_69J38wz scroll-y">
            <div class="div_04bAm9R"><span class="loader"></span></div>
            <div class="div_36Bj2x6"></div>
        </div>
    `)

    const containerItem = ElementComponent.querySelector('.div_36Bj2x6')

    containerItem.addEventListener('click', e => {
        const a = e.target.closest('.a_Ale0G7A')
        if(a){
            const item = JSON.parse(a.parentElement.dataset.data)
            console.log(item);
            document.getElementById('root').append(modalProducto(item))
        }
    })
    
    const elementHTML =(data = {})=>{
        
        const element = ele.create(`
            <div class="div_21EH6K7" id="a-${ data.SAP }">
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
                    <img class="img_2zD5C" src="public/img/icons/svg/icon-arrow-right.svg">
                </a>
                <hr class="hr_3V8tZX0" style="display:none">
                <div class="div_8zbeed9" style="display:none">
                    <span style="display:none">hace 18min</span>
                    <span class="color-red" style="display:none">quiebre</span>
                </div>
            </div>
        `)

        element.setAttribute('data-data', JSON.stringify(data))
        return element
    }

    const renderData =(Data = {})=>{
        const Producto = Data.producto.filter(producto => producto.ID_CATEGORIA == params.id_categoria).map( producto => {
            const marca     = Data.marca.find(marca => marca.ID == producto.ID_MARCA)
            const categoria    = Data.categoria.find(categoria => categoria.ID == producto.ID_CATEGORIA)
            return { ...producto, data_marca : marca, data_categoria : categoria }
        })

        if(Producto.length == 0) {
            ElementComponent.innerHTML = `
                <div class="div_el22VMQ">
                    <img src="public/img/icons/svg/icon-paper-list-xmark.svg">
                    <h3>~no hay productos por mostrar~</h3>
                </div>
            `
            return
        }

        if(containerItem.children.length == 0) {
            const elementTemp = document.createDocumentFragment()

            Producto.forEach(data => elementTemp.append(elementHTML(data)) )

            containerItem.append(elementTemp)
            ElementComponent.innerHTML = ''
            ElementComponent.append(containerItem)
        }
    }

    const loadData = async ()=>{
        const DataProductoCategoria    =  await fetch('./public/js/json/productoCategoria.json')
        const DataProductoMarca     =  await fetch('./public/js/json/productoMarca.json')
        const DataProductos         =  await fetch('./public/js/json/productos.json')

        const DataJSON = {
            categoria      : await DataProductoCategoria.json(),
            marca       : await DataProductoMarca.json(),
            producto    : await DataProductos.json()
        }

        renderData(DataJSON)
    }

    loadData()

    containerItem.remove()
    return ElementComponent
}
 
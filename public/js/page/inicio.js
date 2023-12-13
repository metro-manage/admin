export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const ElementComponent = ele.create(`
        <div class="div_f0Au33C scroll-y icon-svg">
            <div class="div_gZrdl0h">
                <div class="div_1fG5J8C">
                    <h4>Almacen</h4>
                    <div class="div_W8h9OQ7">
                        <div class="div_0EjqIvF">
                            <span data-render="total_productos">-</span>
                            productos
                        </div>
                        <div class="div_0EjqIvF">
                            <span data-render="total_marca">-</span>
                            marcas
                        </div>
                        <div class="div_0EjqIvF">
                            <span data-render="total_categoria">-</span>
                            categorias
                        </div>
                    </div>
                </div>
                <div class="div_1fG5J8C">
                    <h4>Usuario</h4>
                    <div class="div_W8h9OQ7">
                        <div class="div_0EjqIvF">
                            <span data-render="total_users">-</span>
                            usuario
                        </div>
                    </div>
                </div>
                <div class="div_1fG5J8C">
                    <h4>Asistencia</h4>
                    <div class="div_W8h9OQ7">
                        <div class="div_0EjqIvF">
                            <span data-render="total_asistencia">-</span>
                            asistencia
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const dataRender =( data = {} )=>{
        ElementComponent.querySelectorAll('[data-render]').forEach(element => {
            element.textContent = data[element.getAttribute('data-render')] ?? '-'
            element.removeAttribute('data-render')
        });
    }

    const dataLoad =()=>{

        const queries = {
            token : localStorage.getItem('auth-token')
        }

        datapi.get( api(`/api/info?${ paramQueries( queries ) }`) )
            .then( dataRender )
 
    }

    dataLoad()
    return ElementComponent
}
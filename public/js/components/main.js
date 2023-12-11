import routes from "../src/routes.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const ElementComponent = createElement(`
        <main id="main">
            <div class="container-loader">
                <span class="loader"></span>
            </div>
        </main>
    `)

    const query = {
        token : ls('auth-token').get()
    }

    // datapi.get(api(`/api/token?${ paramQueries( query ) }`))
    //     .then( res => { ls('auth-token').data(res).set(); routes() })

    setTimeout(routes)
    return ElementComponent
} 
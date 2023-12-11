export default ( page, ...params )=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&') 

    const query = {
        token : ls('auth-token').get()
    }

    datapi.get(api(`/api/token?${ paramQueries( query ) }`))
        .then( res => { 

            if( res ) {
                location.hash = '#/'
                return
            }

            localStorage.removeItem('user-data')
            localStorage.removeItem('auth-token')

            const main = document.getElementById( 'main' )
            main.textContent = ''
            main.append( page( ...params ) )
        })

} 
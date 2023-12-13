export default ( page, ...params )=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&') 

    const queries = {
        token : localStorage.getItem('auth-token')
    }

    fetch( api(`/api/token?${ paramQueries( queries ) }`) )
        .then( res => res.json() )
        .then( data => { 

            if( data ) {
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
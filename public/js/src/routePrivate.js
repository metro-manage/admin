export default ( page, ...params )=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&') 

    const queries = {
        token : localStorage.getItem('auth-token')
    }

    fetch( api(`/api/token?${ paramQueries( queries ) }`) )
        .then( res => res.json() )
        .then( data => {

            if( !data ) {
                localStorage.removeItem('user-data')
                localStorage.removeItem('auth-token')
                location.hash = '#/login'
                return
            }
            
            localStorage.setItem('user-data', JSON.stringify(data.user_data))
            localStorage.setItem('auth-token', data.token)

            const main = document.getElementById( 'main' )
            main.textContent = ''
            main.append( page( ...params ) )

        } )
 

} 
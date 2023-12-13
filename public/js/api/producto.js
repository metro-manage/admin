export default ()=>{

    const api =(uri = '')=> sessionStorage.getItem('api') + '/api/producto?' + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = window.dataLib.params
    const queries = {
        token : localStorage.getItem('auth-token'),
    }
   
    const get = async () => {
        queries.query = true
        queries.limit = 'one'
        queries.id = params.id
        
        return await datapi.get(api( paramQueries(queries) ))
    }

    const remove = async ()=>{
        queries.id = params.id

        return await datapi.delete(api( paramQueries(queries) )) 
    }

    const create = async ()=>{
        const res = await fetch(api(`/api/producto?${ paramQueries(queries) }`), {
            method : 'POST',
        })

        return await res.json()
    }


    return {
        get,
        remove
    }

}

 
 // datapi.get(api(`/api/producto?${ paramQueries(queries) }`))
        //     .then(data => {
        //         ss('data-temp').data(data).set(true)
        //         dataRender(data)
        //     })
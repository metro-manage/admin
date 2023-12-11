export default ( data, index )=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const Icon = new IconSVG() 
    const params = ss('params').get(true)

    data.data_user  = JSON.parse( data.data_user )
    data.detail     = JSON.parse( data.detail )

    const Month = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const Asistencia = [
        { id : 1, name : 'Ingreso' },
        { id : 2, name : 'Inicio de descanso' },
        { id : 3, name : 'Fin de descanso' },
        { id : 4, name : 'Salida' }
    ]

    const datetimeToDate =( datetime )=>{
        const Datetime = new Date( datetime )
        const time = Datetime.toLocaleTimeString().split(':')
        time[0] = Datetime.getHours() > 12 ? Datetime.getHours() - 12 : time[0]

        const data = {
            date : `${ Datetime.getDate() } ${ Month[ Datetime.getMonth() ] } ${ Datetime.getFullYear() }`,
            time : `${ time.join(':') } ${ Datetime.getHours() > 12 ? 'pm' : 'am' }`
        }

        return data
    }

    const element = createElement(`
        
        <div class="div_j7y60u8">
            ${ index == 0 ? `
                <div class="a_I0Rc01x">
                    <img src="${ api(`/storage/user/${ data.data_user.avatar || 'avatar.png' }`) }">
                    <h3>${ data.data_user.fullname } ${ data.data_user.lastname }</h3>
                </div> 
            ` : '' }
            <div class="div_K88O3d5">
                <span class="span_onDRjbo"></span>
                <div class="div_cqzAsem">
                    <h4>${ datetimeToDate(data.datetime).date }</h4>
                </div>
                <span class="span_6OdU70W"></span>
                <div class="div_j7y60u8">

                    ${ ArrayToString( data.detail, data => {
                         
                        return `
                            <div class="div_K88O3d5 line">
                                <span class="span_onDRjbo"></span>
                                <div class="div_cqzAsem">
                                    <h4>${ (Asistencia.find( asistencia => asistencia.id == data.id ) ?? {}).name ?? '-' }</h4>
                                    <span>${ datetimeToDate(data.datetime).time }</span>
                                </div>
                                <span class="span_6OdU70W"></span> 
                            </div>
                        `

                    })}
                    
                </div>
            </div>
        </div>
    `)

    return element 
}
import elementNotFound from "../components/elementNotFound.js"

import elementAsistenciaListUser from "../components/elementAsistenciaListUser.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = ss('params').get(true)

    const Icon = new IconSVG()  

    const MONTH = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const Asistencia = [
        { id : 1, name : 'Ingreso' },
        { id : 2, name : 'Inicio de descanso' },
        { id : 3, name : 'Fin de descanso' },
        { id : 4, name : 'Salida' }
    ]

    const ElementComponent = createElement(`
        <div class="div_pCQo0wh icon-svg">
            <header id="header" class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/asistencia/${ params.id }" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3 class="text-ellipsis" data-render="name">Asistencia por usuario</h3>
                </div> 
            </header>
            <div id="containerItem" class="div_hH1EA9y scroll-y">
                <div id="elementItem" class="div_G1Y7O2q">
                    <div class="div_j9i292n" >
                        <div id="elementItemList" class="div_cD9yhsy"></div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const main  = document.getElementById('main')

    const { containerItem, elementItem, elementItemList } = query.getAttribute('id')

    const datetimeToDate =( datetime )=>{
        const Datetime = new Date( datetime )
        const time = Datetime.toLocaleTimeString().split(':')
        time[0] = Datetime.getHours() > 12 ? Datetime.getHours() - 12 : time[0]

        const data = {
            date : `${ Datetime.getDate() } ${ MONTH[ Datetime.getMonth() ] } ${ Datetime.getFullYear() }`,
            time : `${ time.join(':') } ${ Datetime.getHours() > 12 ? 'pm' : 'am' }`
        }

        return data
    }
     
    addEventListener('eventChangeCalendar', e => {
        dataLoadList(e.detail.datetime)
    })

    const dataRender =( data = null )=>{

        if( !data ) {
            return appendElement( main, elementNotFound({
                href  : '#/asistencia',
                title : '',
                message : 'El elemento no existe'
            }) )
        }

        appendElement( containerItem, elementItem )

    }

    const dataRenderList =( Data = [] )=>{

        if( !Data.length ) {
            return elementItemList.innerHTML = `
                <div class="div_80euglIeYkNE39v" style="margin: 100px auto">
                    ${ Icon.get('icon-light box-empty') }
                    <h3>No hay asistencias en esta fecha</h3>
                </div>
            `
        }

        const fragment = document.createDocumentFragment()

        Data.forEach((data, index) => {

            data.data_user  = JSON.parse( data.data_user )
            data.detail     = JSON.parse( data.detail )

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

            fragment.append( element )
            //fragment.append( elementAsistenciaListUser( data, index ) )

        });

        appendElement( elementItemList, fragment )
    }

    const dataLoad =()=>{

        containerItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'

        const query = {
            token : ls('auth-token').get(),
            id    : params.id
        }

        datapi.get( api(`/api/asistencia?${ paramQueries( query ) }`) )
            .then( dataRender )

    }

    const dataLoadList =()=>{
        elementItemList.innerHTML = '<div class="container-loader" style="margin: 100px auto"><span class="loader"></span></div>'

        const query = {
            token : ls('auth-token').get(),
            id_asistencia    : params.id,
            uid_user : params.uid_user
        }

        datapi.get(api(`/api/asistencia-list?${ paramQueries( query ) }`))
            .then( dataRenderList )
    }

    dataLoad()
    dataLoadList(datetimeToday())

    return ElementComponent
}
 
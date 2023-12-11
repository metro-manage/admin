import modalAsistenciaListUsers from "../components/modalAsistenciaListUsers.js"
import elementNotFound from "../components/elementNotFound.js"

import formAsistencia from "../components/formAsistencia.js"
import options from "../components/options.js"

export default ()=>{

    const api =(uri = '')=> ss('api').get() + uri
    const paramQueries = (query = {}) => Object.keys(query).map(key => `${ key }=${ query[key] }`).join('&')

    const params = ss('params').get(true)
    const Icon = new IconSVG()  

    const DAY   = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
    const MONTH = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const ElementComponent = createElement(`
        <div class="div_pCQo0wh icon-svg">
            <header class="header_139jCpa">
                <div class="div_ttL4BFL">
                    <a href="#/asistencia" class="pointer">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3 class="text-ellipsis" data-render="name"></h3>
                </div>
                <div class="div_ttL4BFL">
                    <button id="buttonAdd" class="pointer" data-action="add">${ Icon.get('fi fi-rr-users') }</button>
                    <button id="buttonOption" class="pointer"">${ Icon.get('fi fi-rr-menu-dots') }</button>
                </div>
            </header>
            <div id="containerItem" class="div_hH1EA9y scroll-y">
                <div id="elementItem" class="div_P14PsV9">
                    <div id="elementItemCalendar" class="div_2SEIDlC">
                        <div class="div_4K32qzV">
                            <h3 id="textYearMonth">-</h3>
                            <button id="btnOpenCalendar">${ Icon.get('fi fi-rr-calendar-day') }</button>
                        </div>
                        <div class="div_zHqNN4D scroll-x">
                            <div id="elementItemCalendarData" class="div_jbr4I3x"></div>
                        </div>
                    </div>
                    <div id="elementItemList" class="div_j9i292n">
                        <div id="elementItemListData" class="div_cD9yhsy"></div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    // const main  = document.getElementById('main')

    const elementModalAsistenciaListUsers = modalAsistenciaListUsers()
    const elementAsistenciaCalendario     = ElementCalendar()

    const { containerItem, elementItem, elementItemCalendar, elementItemList, buttonAdd, elementItemCalendarData, elementItemListData, buttonOption, btnOpenCalendar, textYearMonth } = query.getAttribute('id')

    let elementOption = null
    let elementForm   = null

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
 
    const renderDataDate =(date = null)=>{

        const datetime = {}

        const Time = date ? new Date( date ) : new Date()

        datetime.focus  = Time.getDate() 

        Time.setDate(1)
        datetime.start  = Time.getDay() 
        
        Time.setMonth( Time.getMonth() +  1)
        Time.setDate(0)

        datetime.end    = Time.getDate()

        textYearMonth.textContent = `${ Time.getFullYear() } ${ MONTH[Time.getMonth()] }`

        elementItemCalendarData.innerHTML = ArrayToString( [...Array(datetime.end).keys() ], (day, index) => {
            if( DAY[datetime.start] == undefined ) {
                datetime.start = 0
            }

            return `
                <div class="${ datetime.focus == ++index ? 'focus' : '' }" data-datetime="${ Time.getFullYear() }/${ Time.getMonth() }/${ index }">${ DAY[datetime.start++].slice(0,3) }<span>${ index }</span></div>
            `
        })

        setTimeout(()=> {
            elementItemCalendarData.querySelector('div.focus').scrollIntoView(false);
        })
    } 
    
    //console.log(new Date().getDay())
    buttonAdd.addEventListener('click', ()=> {
        main.append(elementModalAsistenciaListUsers)
    })

    elementItemCalendarData.addEventListener('click', e => {
        const div = e.target.closest('div')

        if( div && ['', 'focus'].includes(div.className) ) {
            const elementFocus = elementItemCalendarData.querySelector('div.focus') || document.createElement('div')

            elementFocus.classList.remove('focus')
            div.classList.add('focus')

            const datetime = new Date(div.dataset.datetime);
            datetime.setMonth(datetime.getMonth() + 1)

            dataLoadList(datetime.getTime())
        }
    })

    if( buttonOption ){
        buttonOption.addEventListener('click', ()=> {

            if( !elementOption ) {
                elementOption = options('asistencia', ['*'], action => {
                    if( action == 'update' ) {

                        if( !elementForm ) elementForm = formAsistencia( false,  )
                        main.append(elementForm)

                    }
                    else if( action == 'delete' ) {
                        main.append(confirmDelete)
                    }
                })
            }

            main.append( elementOption )
        })
    }

    // addEventListener('eventChangeCalendar', e => {
    //     dataLoadList(e.detail.datetime)
    // })

    btnOpenCalendar.addEventListener('click', ()=> {
        main.append( elementAsistenciaCalendario )
    })

    elementAsistenciaCalendario.addEventListener('_change', e => {
        const date = e.detail
        renderDataDate( date.getTime() )
    })

    const dataRender =( data = null )=>{

        if( !data ) {
            return appendElement( main, elementNotFound({
                href  : '#/asistencia',
                title : '',
                message : 'El elemento no existe'
            }) )
        }

        elementForm = formAsistencia( false, data )

        query.getAll('[ data-render ]').forEach(element => {
            element.textContent = data[ element.getAttribute('data-render') ] ?? ''
            element.removeAttribute('data-render')
        });

        //elementItemCalendar.append( elementAsistenciaCalendario )
        renderDataDate()
        appendElement( containerItem, elementItem )

        dataLoadList(datetimeToday())
    }

    const dataRenderList =( Data = [] )=>{

        if( !Data.length ) {
            return elementItemList.innerHTML = `
                <div class="div_80euglIeYkNE39v">
                    ${ Icon.get('icon-light box-empty') }
                    <h3>No hay asistencias en esta fecha</h3>
                </div>
            `
        }

        const fragment = document.createDocumentFragment()

        Data.forEach(() => {
            const element = createElement(`
                <div class="div_j7y60u8">
                    <div class="div_K88O3d5">
                        <span class="span_onDRjbo"></span>
                        <div class="div_cqzAsem">
                            <h4>${ datetimeToDate(Data[0].datetime).date }</h4>
                        </div>
                        <span class="span_6OdU70W"></span>
                        <div class="div_ZXKXGQW">

                            ${ ArrayToString( Data, data => {
                                data.data_user  = JSON.parse( data.data_user )
                                data.detail     = JSON.parse( data.detail )

                                return `
                                    <a href="#/asistencia/${ params.id }/user/${ data.data_user.uid }" class="a_I0Rc01x pointer">
                                        <img src="${ api(`/storage/user/${ data.data_user.avatar || 'avatar.png' }`) }">
                                        <h3>${ data.data_user.fullname } ${ data.data_user.lastname }</h3>
                                        ${ Icon.get('fi fi-rr-angle-small-right') }
                                    </a>
                                `

                            })}
                            
                        </div>
                    </div>
                </div>
            `)
                            
            fragment.append( element )
        });

        elementItemListData.append( fragment )
        // appendElement( elementItemList, appendElement( elementItemListData, fragment ) )
        appendElement( elementItemList, elementItemListData )
    }

    const dataLoad =()=>{

        containerItem.innerHTML = '<div class="container-loader"><span class="loader"></span></div>'

        const queries = {
            token : ls('auth-token').get(),
            query : true,
            limit : 'one',
            id : params.id
        }

        datapi.get(api(`/api/asistencia?${ paramQueries( queries ) }`))
            .then( dataRender ) 
            
    }


   
    const dataLoadList =(datetime)=>{
        elementItemList.innerHTML = '<div class="container-loader" style="margin: 100px auto"><span class="loader"></span></div>'

        const query = {
            token : ls('auth-token').get(),
            query : true,
            id_asistencia : params.id,
            datetime
        }

        datapi.get(api(`/api/asistencia-list?${ paramQueries( query ) }`))
            .then( dataRenderList )
    }

    dataLoad()
    // 

    return ElementComponent
}
 
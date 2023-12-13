function addRemoveEventListener (element, event, callback){
    
    const def_callback =()=>{
        if(typeof callback === 'function') callback()
        element.removeEventListener(event, def_callback)
    }

    element.addEventListener(event, def_callback)
}

function addRemoveEventListenerHashchange (element, type, callback){
    if(typeof callback === 'function') {
        element.addEventListener(type, callback)
        addRemoveEventListener(window, 'hashchange', ()=> element.removeEventListener(type, callback))
    }
}
 
function rand(min, max = false){
    
    if(!max){
        max = min
        min = 0
    }

    return Math.floor(Math.random() * ((max + 1) - min) + min)

}

function genereteKey (include = {}){
    const permission = {
        upper   : include.upper ?? true,
        lower   : include.lower ?? true,
        number  : include.number ?? true,
        simbol  : include.simbol ?? false,
        length  : include.length ?? 10,
    }

    const contentKey = {}
    contentKey.upper    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    contentKey.lower    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLocaleLowerCase()
    contentKey.number   = '1234567890'
    contentKey.simbol   = '[{!¿$@#=~?¡}]'

    const contentUse = []
    if(permission.upper) contentUse.push(contentKey.upper)
    if(permission.lower) contentUse.push(contentKey.lower)
    if(permission.number) contentUse.push(contentKey.number)
    if(permission.simbol) contentUse.push(contentKey.simbol)

    return [...Array(permission.length)].map(  key => {
        const firstOption   = contentUse[rand(contentUse.length - 1)]
        const secondOption  = firstOption[rand(firstOption.length - 1)]
        return secondOption
    }).join('')
}

function getTimeBySecond(seconds) {
    return {
        hours   : Math.floor(seconds / 3600),
        minutes : Math.floor((seconds % 3600) / 60),
        seconds : seconds % 60
    }
}

const diffDateBirthday =(Date1, Date2 = Date.now())=>{

    const thisYear = new Date().getFullYear()

    const lastYear = new Date(Date1)
    lastYear.setFullYear(thisYear)
    
    const BirthdayThisYear = new Date(Date1)
    BirthdayThisYear.setFullYear(thisYear)

    if(Date2 > BirthdayThisYear.getTime()) BirthdayThisYear.setFullYear(thisYear + 1)
    else lastYear.setFullYear(thisYear - 1)

    const diffTotal         = BirthdayThisYear.getTime() - lastYear.getTime()
    const diffelapsed       = Date2 - lastYear.getTime() 
    const difdRemaining     = BirthdayThisYear.getTime() - Date2;

    const day = {
        total       : Math.floor(diffTotal / (1000 * 60 * 60 * 24)),
        elapsed     : Math.round(diffelapsed / (1000 * 60 * 60 * 24)),
        remaining   : Math.floor(difdRemaining / (1000 * 60 * 60 * 24))
    }

    const hour = {
        total       : Math.floor((diffTotal / (1000 * 60 * 60))),
        elapsed     : Math.round((diffelapsed / (1000 * 60 * 60))),
        remaining   : Math.floor((difdRemaining / (1000 * 60 * 60)) % 24)
    }

    const minute = {
        total       : Math.floor((diffTotal / 1000 / 60)),
        elapsed     : Math.round((diffelapsed / 1000 / 60) % 60),
        remaining   : Math.floor((difdRemaining / 1000 / 60) % 60)
    }

    const second = {
        total       : Math.floor((diffTotal / 1000)),
        elapsed     : Math.round((diffelapsed / 1000) % 60),
        remaining   : Math.floor((difdRemaining / 1000) % 60)
    }

    const age = (BirthdayThisYear.getFullYear() - 1) - new Date(Date1).getFullYear()

    const complete = {
        total       : 100,
        elapsed     : parseFloat(((day.elapsed / day.total) * 100).toFixed(2)),
        remaining   : parseFloat(((day.remaining / day.total) * 100).toFixed(2))
    } 

    return {
        day,
        hour,
        minute,
        second,
        age,
        complete
    }
}

const datapi = (()=> {
    const method = async (uri = '', method = 'POST', data = {}, options = {})=>{

        delete options.method
        delete options.body
        
        const option = {
            method,
            ...options
        }

        if( Object.keys(data).length ){
            option.body = JSON.stringify(data)
        }
        
        const res = await fetch(uri, option)
        return await res.json()
    }
        
    const get = async (...params)=>{
        return await method(params[0], 'GET', {}, params[1])
    }

    const post = async (...params)=>{
        return await method(params[0], 'POST', params[1], params[2])
    }

    const put = async (...params)=>{
        return await method(params[0], 'PUT', params[1], params[2])
    }

    const _delete = async (...params)=>{
        return await method(params[0], 'DELETE', params[1], params[2])
    }

    const patch = async (...params)=>{
        return await method(params[0], 'PATCH', params[1], params[2])
    }

    return { get, post, put, patch, delete : _delete }
})()

function copyToClipboard(text = '') {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('style', 'position: fixed; top: 0; transform: translateY(-100%);')
    textarea.value = text;

    document.body.append(textarea);

    textarea.select();
    textarea.setSelectionRange(0, text.length);

    document.execCommand('copy');

    textarea.remove()
}

class FileLoad {
    constructor(file = null){
        this.__file = file
        this.__progress
        this.__load
    }

    progress(callback){
        this.__progress = callback
    }

    load(callback) {
        this.__load = callback
    }

    start(){
        const reader = new FileReader()
        reader.addEventListener('progress', e => {
            if(typeof this.__progress == 'function') this.__progress(e)
        })
        reader.addEventListener('load', e => {
            if(typeof this.__load == 'function') this.__load(e)
        })
        reader.readAsDataURL(this.__file)
    }
}

class Alert {
    constructor(element) {
        this.__element = ele.create('<div class="div_1N2Xi0S4ana9y95"></div>')
        element.append(this.__element)

        this._color    = [
            { color : '#82C9AC', name : 'success' },
            { color : '#E79B9B', name : 'danger' },
            { color : '#AEC8E8', name : 'info' },
            { color : '#F7D08A', name : 'warning' },
            { color : '#343A40', name : 'dark' }
        ]
    }

    show(data = {}) {
        const element = ele.create(`<div class="div_3897A2mOM93uOdP" style="background:${ ( this._color.find( color => color.name == data.name ) ?? {} ).color ?? '#343A40' }">${ data.message ?? '' }</div>`)
        this.__element.prepend(element)

        if(this.__element.children.length > 3) {
            const [elementLast] =[...this.__element.children].slice(-1)
            if(elementLast) elementLast.remove()
        }

        setTimeout(()=> {
            element.remove()
        }, 1500)

    }
}


function setCookie(nombre, valor, diasParaExpirar, httpOnly = false, secure = false) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasParaExpirar * 24 * 60 * 60 * 1000));
    const expira = "expires=" + fechaExpiracion.toUTCString();
    
    const httpOnlyString = httpOnly ? "; HttpOnly" : "";
    
    // Agrega "; Secure" solo si secure es verdadero
    const secureString = secure ? "; Secure" : "";
    
    document.cookie = nombre + "=" + valor + "; " + expira + "; path=/" + httpOnlyString + secureString;
}

function getCookie(nombre) {
    const nombreC = nombre + "=";
    const cookies = document.cookie.split(';');
    
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nombreC) == 0) {
            return cookie.substring(nombreC.length, cookie.length);
        }
    }
    
    return "";
}

function objectFormData(data = {}) {
    const formData = new FormData()

    if( typeof data == 'object' ) {
        for (const key in data) {
            formData.append(key, data[key])
        }
    }

    return formData
}

function datetimeToday(datetime = null) {

    this.datetime = datetime ? new Date( datetime ) : new Date()
    this.datetime.setHours(0, 0, 0, 0);
    return this.datetime.getTime()

}

function ElementOption(options = {}) {

    const icon = new IconSVG().get('fi fi-rr-check-circle')

    const Element = ele.create(`
        <div class="div_S29zZQIk4KnXG7b">
            <div id="elementClose" class="div_oNdlAxIlu16kunk"></div>
            <div class="div_98TB53ZeB0rM2Dt">
                <input type="text" id="input_search" class="input_8Os3T35JGJiq100" placeholder="buscar">
                <div class="div_50Hjfm013Cr44p1">
                    <div id="elementItemData" class="div_Ds33g1Itdn546C0">
                        <div class="container-loader"><span class="loader"></span></div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const fragment = document.createDocumentFragment()

    const element = ele.object( Element.querySelectorAll('[id]'), 'id', true )
    const { input_search, elementItemData, elementClose } = element

    elementClose.addEventListener('click', ()=> {
        Element.remove()
    })

    input_search.addEventListener('input', e => {
        renderData(
            options.Data.filter( data => {
                if( Object.values(data).join(' ').toLowerCase().includes(e.target.value.toLowerCase().trim()) ) return data
                return false
            } )
        )
    })

    elementItemData.addEventListener('click', e => {
        const button = e.target.closest('button')
        if( button ) {
            const detail        = JSON.parse( button.getAttribute('data-data') )
            const buttonFocus   = elementItemData.querySelector('button.focus')

            if( buttonFocus ) buttonFocus.classList.remove('focus')
            button.classList.add('focus')

            Element.dispatchEvent(new CustomEvent('_change', { detail }))
            Element.remove()

            options.value = detail[ options.name ] 
        }
    })

    const renderData =(Data = [])=>{
        if( !Data.length ) {
            return elementItemData.innerHTML = '<div class="div_4MTYUT3Lf1m2G8s">~ No hay resultados ~</div>'
        }

        Data.forEach(data => {
            const select = (data[options.name] ?? '') == options.value
    
            const element = ele.create(`
                <button class="button_EzFBb84z5Q3GeX0${ select ? ' focus' : '' }"><span></span>${ icon }</button>
            `)
    
            element.querySelector('span').textContent = data[options.name] ?? '-'
            element.setAttribute('data-data', JSON.stringify(data))
    
            fragment.append( element ) 
        }) 

        elementItemData.innerHTML = ''
        elementItemData.append( fragment )
    }
    
    renderData( options.Data )

    return Element
}

function ElementCalendar(datetime = null) {

    const Month = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]

    const Element = ele.create(`
        <div class="div_Ed0WWt537MU926D">
            <div id="elementClose" class="div_xAeKmwifq7Ajpip"></div>
            <div class="div_zkdwut55cOC4757">
                <div class="div_Shm089Y0yC25009">
                    <div class="div_iJVaX1Vhq90V6K2">
                        <div id="dayText">-</div>
                        <div id="monthText">-</div>
                        <div id="yearText">-</div>
                    </div> 
                    <div id="containerDate" class="div_4qg39xR95L71RiS ">
                        <div id="elementDay" class="div_afO4579AKSm7b8q"></div>
                        <div id="containerYearMonth" class="div_Hd4V1BgCSOSCL5J scroll-y">
                            <div id="elementYear" class="div_w17wYdh13YdIUnI"></div>
                            <div id="elementMonth" class="div_w17wYdh13YdIUnI"></div>
                        </div>
                    </div>
                    <div class="div_m38HD12AtX186RH">
                        <button id="btnCancel">Cancelar</button>
                        <button id="btnSubmit" class="focus">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    `)

    const element = ele.object( Element.querySelectorAll('[id]'), 'id', true )
    const { elementClose, dayText, monthText, yearText, containerDate, containerYearMonth, elementYear, elementMonth, elementDay, btnCancel, btnSubmit } = element

    const date = datetime ? new Date(datetime) : new Date()

    const datetimeDinamic = {
        year    : date.getFullYear(),
        month   : date.getMonth(),
        day     : date.getDate(),
    }

    datetimeDinamic.dayLimit = new Date(datetimeDinamic.year, datetimeDinamic.month + 1, 0).getDate()

    dayText.addEventListener('click', ()=> {
        containerYearMonth.remove()
    })

    monthText.addEventListener('click', ()=> {
        containerYearMonth.textContent = ''
        containerYearMonth.append( elementMonth )
        containerDate.append( containerYearMonth )
    })

    yearText.addEventListener('click', ()=> {
        containerYearMonth.textContent = ''
        containerYearMonth.append( elementYear )
        containerDate.append( containerYearMonth )
    })
    
    elementDay.addEventListener('click', e => {
        const span = e.target.closest('span')

        if( span ) {

            const _date = parseInt(span.getAttribute('data-data'))
            const up    = _date > datetimeDinamic.day

            if( _date == datetimeDinamic.day ) return
            datetimeDinamic.day = _date

            const spanfocus =  elementDay.querySelector('span.focus')
            if( spanfocus ) spanfocus.classList.remove('focus')
            span.classList.add('focus')

            dayText.innerHTML = `<h3 class="${ up ? 'up' : 'down' }">${ span.textContent  }</h3>`
        }

    })

    elementMonth.addEventListener('click', e => {
        const span = e.target.closest('span')

        if( span ) {

            containerYearMonth.remove()
            const _date = parseInt(span.getAttribute('data-data'))
            const up    = _date > datetimeDinamic.month

            if( _date == datetimeDinamic.month ) return
            datetimeDinamic.month = _date

            const spanfocus =  elementMonth.querySelector('span.focus')
            if( spanfocus ) spanfocus.classList.remove('focus')
            span.classList.add('focus')

            monthText.innerHTML = `<h3 class="${ up ? 'up' : 'down' }">${ span.textContent  }</h3>` 

            datetimeDinamic.dayLimit = new Date(datetimeDinamic.year, datetimeDinamic.month + 1, 0).getDate()

            if( datetimeDinamic.dayLimit < datetimeDinamic.day ) {
                dayText.textContent = ('0' + datetimeDinamic.dayLimit).slice(-2)
                datetimeDinamic.day = datetimeDinamic.dayLimit
            }

            renderDatetime('day')
        }
    })

    elementYear.addEventListener('click', e => {
        const span = e.target.closest('span')

        if( span ) {

            containerYearMonth.remove()
            const _date = parseInt(span.getAttribute('data-data'))
            const up    = _date > datetimeDinamic.year

            if( _date == datetimeDinamic.year ) return
            datetimeDinamic.year = _date

            const spanfocus =  elementYear.querySelector('span.focus')
            if( spanfocus ) spanfocus.classList.remove('focus')
            span.classList.add('focus')

            yearText.innerHTML = `<h3 class="${ up ? 'up' : 'down' }">${ span.textContent  }</h3>` 

            datetimeDinamic.dayLimit = new Date(datetimeDinamic.year, datetimeDinamic.month + 1, 0).getDate()

            if( datetimeDinamic.dayLimit < datetimeDinamic.day ) {
                dayText.textContent = ('0' + datetimeDinamic.dayLimit).slice(-2)
                datetimeDinamic.day = datetimeDinamic.dayLimit
            }

            renderDatetime('day')
        }
    })

    btnSubmit.addEventListener('click', ()=> {
        const detail = new Date(datetimeDinamic.year, datetimeDinamic.month, datetimeDinamic.day, 0, 0, 0, 0)
        Element.dispatchEvent(new CustomEvent('_change', { detail }))
        Element.remove()
    })

    elementClose.addEventListener('click', ()=> {
        Element.remove()
    })

    btnCancel.addEventListener('click', ()=> {
        Element.remove()
    })

    const renderDatetime =(change = '*')=>{

        if( ['day', '*'].includes(change) ) {
            elementDay.innerHTML = [...Array( datetimeDinamic.dayLimit ).keys()].map(num => {
                ++num

                const numtext = num
                const focus   = datetimeDinamic.day == num
                if( focus ) dayText.innerHTML = `<h3>${ numtext }</h3>`   
                return `<span class="${ focus ? 'focus' : '' }" data-data="${ num }">${ numtext }</span>`
                
            }).join('')
        }

        if( ['month', '*'].includes(change) ) {
            elementMonth.innerHTML = [...Array(Month.length).keys()].map((num) => {

                const numtext = Month[ num ]
                const focus   = datetimeDinamic.month == num

                if( focus ) monthText.innerHTML = `<h3>${ numtext  }</h3>` 
                return `<span class="${ focus ? 'focus' : '' }" data-data="${ num }">${ numtext }</span>`

            }).join('')
        }

        if( ['year', '*'].includes(change) ) {
            elementYear.innerHTML = [...Array((new Date().getFullYear() + 15) - 1970).keys()].map(num => {
                const date = 1970 + num

                const focus   = datetimeDinamic.year == date


                if( focus ) yearText.innerHTML = `<h3>${ date  }</h3>`  
                return `<span class="${ focus ? 'focus' : '' }" data-data="${ date }">${ date }</span>`
            }).join('')
        }
    }

    containerYearMonth.remove()
    renderDatetime()

    return Element
}

this.ele = (()=> {

    const create =(element)=>{
        const data = {
            element : null
        }

        data.element = document.createElement('div')
        data.element.innerHTML = element
        return data.element = data.element.children[0]
    }

    const object =( child, attribute, remove = false )=>{
        
        const children  = child.length === undefined ? [ child ] : child
        const out       = {}

        children.forEach(element => {
            if( element.getAttribute(attribute) ) {
                out[ element.getAttribute(attribute) ] = element
                if( remove === true ) element.removeAttribute(attribute)
            }
        });
        
        return out
    }

    const append =( element, ...elements )=>{
        elements = elements.map(element => {
            return typeof element == 'function' ? element() : element
        })
    
        element.textContent = ''
        element.append(...elements)
    
        return element
    }

    return { create, object, append }
})()
 
this.ttrim = (()=> {

    const left =(text = '', symbol = '')=>{
        if(text != '', symbol != ''){
            while( text.startsWith(symbol) ) text = text.slice(1)
        }
        return text
    }

    const right =(text = '', symbol = '')=>{
        if(text != '', symbol != ''){
            while( text.endsWith(symbol) ) text = text.slice(0, -1)
        }
        return text
    }

    const both =(text = '', symbol = '')=>{
        if(text != '', symbol != ''){ 
            while( text.startsWith(symbol) ) text = text.slice(1)
            while( text.endsWith(symbol) ) text = text.slice(0, -1)
        }
        return text
    }

    return { left, right, both }

})()

class Hash {
    constructor(){
        this._params = []
        this._routes = []
        this._dispatch = true 
    }

    param(route = '', callback = false){
        
        const dinamic = route.includes('/:')
        route = ttrim.both(route, '/')
        this._routes.push({route, callback, dinamic }) 

    }

    dispatch(callback){ 

        if( this._dispatch ) {

            this._dispatch = false

            const hashchange =()=>{
                if (typeof callback === 'function') callback( this.__change() )
                else this.__change()
            }

            hashchange()
            window.addEventListener('hashchange', hashchange)
            
        }

    }

    __change(){

        const params = {}
        this._params = ttrim.both(location.hash.slice(1), '/')

        const findRoute = this._routes.find(route => {
            
            if(route.dinamic){

                const splitRoute = route.route.split('/')
                const splitParam = this._params.split('/')

                if(splitRoute.length == splitParam.length){
                    for (let i = 0; i < splitRoute.length; i++){
                        const textRoute = splitRoute[i].trim()
                        if(textRoute.startsWith(':')) params[ textRoute.slice(1) ] = splitParam[i]
                        else if(textRoute !== splitParam[i]) return false
                    }

                    return route
                }
 
            } else if(route.route == this._params) {
                return route
            } else if(route.route == '*'){
                return route
            }
            
            return false
        })

        if(findRoute){
            sessionStorage.setItem('params', JSON.stringify( params ))

            window.dataLib = {
                params : params
            }
            
            if (typeof findRoute.callback === 'function') {
                return findRoute.callback( params ) 
            }

            return findRoute.callback
        }

    }
}
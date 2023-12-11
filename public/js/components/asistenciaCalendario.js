export default ()=>{

    const Icon = new IconSVG()
   
    const ElementComponent = createElement(`
        <div class="div_nNRaM icon-svg">
            <div class="div_t6h4z"> 
                <div class="div_f8g8429">
                    <div class="div_lY6zbz8">
                        <span>---</span>
                        <h5 class="h5_07vav">---</h5>
                    </div>
                    <div class="div_40xd4v0">
                        <button class="pointer">${ Icon.get('fi fi-rr-angle-small-left') }</button>
                        <button class="pointer">${ Icon.get('fi fi-rr-angle-small-right') }</button>
                    </div>
                </div>
                <div class="div_4dFVH">
                    <span>DOM.</span>
                    <span>LUN.</span>
                    <span>MAR.</span>
                    <span>MIER.</span>
                    <span>JUE.</span>
                    <span>VIE.</span>
                    <span>SAB.</span>
                </div>
            </div>
            <div class="div_sxOR2"></div>
        </div>
    `)

    const query = findElement( ElementComponent )
    
    const Month = [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const elememtNav    = query.get('.div_f8g8429')
    const elementDay    = query.get('.div_sxOR2')

    const renderCalendar = (getTime) =>{

        const Time      = { date : new Date() }
        Time.monthDay   = `${ Time.date.getFullYear() }-${ Time.date.getMonth() }-${ Time.date.getDate() }` 

        const TimeGet = { date : getTime }
        TimeGet.year       = TimeGet.date.getFullYear()
        TimeGet.month      = TimeGet.date.getMonth()
        TimeGet.day        = TimeGet.date.getDate()
        TimeGet.startDay   = new Date(TimeGet.year, TimeGet.month, 1).getDay()
        TimeGet.firstDay   = new Date(TimeGet.year, TimeGet.month, 1)
        TimeGet.lastDay    = new Date(TimeGet.year, TimeGet.month + 1, 0).getDate()
        TimeGet.lastPrevious   = new Date(TimeGet.year, TimeGet.month , 0).getDate()

        const stringPreviousDate = new Date(TimeGet.year, TimeGet.month - 1, 1)
        const stringNextDate = new Date(TimeGet.year, TimeGet.month + 1, 1)

        elememtNav.innerHTML = `
            <div class="div_lY6zbz8">
                <span>${ TimeGet.year }</span>
                <h5 class="h5_07vav">${ Month[TimeGet.month].toLocaleUpperCase() }</h5>
            </div>
            <div class="div_40xd4v0">
                <button class="pointer" data-date="${ stringPreviousDate }">${ Icon.get('fi fi-rr-angle-small-left') }</button>
                <button class="pointer" data-date="${ stringNextDate }">${ Icon.get('fi fi-rr-angle-small-right') }</button>
            </div>
        `

        elementDay.innerHTML = [...Array(TimeGet.startDay).keys() ].map(day => {
            return `<span class="off">${ TimeGet.lastPrevious - (TimeGet.startDay - day - 1) }</span>`
        }).join('')

        elementDay.innerHTML += [...Array(TimeGet.lastDay).keys() ].map(day => {
            const LoopMonthDay = `${TimeGet.year}-${ TimeGet.month }-${ ++day }`
            const focus = LoopMonthDay == Time.monthDay ? 'focus' : ''
            return `
                <button class="button_38Juv" data-date="${ LoopMonthDay } 00:00:00">
                    <p style="display:none"></p>
                    <span class="${ focus }">${ day }</span>
                </button>
            `
        }).join('')

        elementDay.innerHTML += [...Array(42 - elementDay.querySelectorAll('span').length).keys() ].map(day => {
            return `<span class="off">${ ++day }</span>`
        }).join('')
    }

    elememtNav.addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button){
            const date = button.dataset.date 
            if(date){
                renderCalendar(new Date(date)) 
            }
        }
    })

    elementDay.addEventListener('click', e => {
        const button = e.target.closest('button')

        if( button ) {

            const spanFocus = elementDay.querySelector('span.choose')
            if( spanFocus ) spanFocus.classList.remove('choose')
            button.querySelector('span').classList.add('choose')

            const date = new Date( button.dataset.date )
            date.setMonth(date.getMonth() + 1);

            dispatchEvent(new CustomEvent('eventChangeCalendar', {
                detail: { datetime: date.getTime() }
            }));
        }
    })
    
    renderCalendar(new Date())

    return ElementComponent
}

/*


*/
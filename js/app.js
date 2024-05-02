'use strict';

var Font = [
  {
    name: "predeterminado",
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
    link: "",
  },
  {
    name: "Montserrat",
    font: "'Montserrat', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
  },
  {
    name: "Roboto",
    font: "'Roboto', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap",
  },
  {
    name: "Lato",
    font: "'Lato', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Lato&display=swap",
  },
  {
    name: "Open Sans",
    font: "'Open Sans', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
  },
  {
    name: "Poppins",
    font: "'Poppins', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
  },
  {
    name: "Playfair Display",
    font: "'Playfair Display', serif",
    link: "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap",
  },
  {
    name: "Raleway",
    font: "'Raleway', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
  },
];

var theme = ()=>{

    const metaThemeColor = document.getElementById('meta-theme-color');
    const styleApp = document.getElementById('style-app');

    addEventListener('_theme', ()=> {
        if( !localStorage.getItem('theme') )
            localStorage.setItem('theme', 'light');

        if( !localStorage.getItem('theme-chat') )
            localStorage.setItem('theme-chat', '#7C4DFF');
        
        if( !localStorage.getItem('font-family') )
            localStorage.setItem('font-family', Font[0].name);

        if( !localStorage.getItem('width-navigate') )
            localStorage.setItem('width-navigate', '80px');

        const font = Font.find( font => font.name == localStorage.getItem('font-family'));

        const themeLight = {
            'color-background-transparent'  : 'rgb(0 0 0 / 0.1)',
            'color-background'  : '#F7F7F7',
            'color-item'        : '#ffffff',
            'color-letter'      : '#1c1c1e',
            'filter-img'        : 'initial',
            'color-chat'        : localStorage.getItem('theme-chat'),
            'font-family'       : font.font,
            'width-navigate'    : localStorage.getItem('width-navigate')
        };
        
        const themeDark  = {
            'color-background-transparent'  : 'rgb(255 255 255 / 0.1)',
            'color-background'  : '#1c1c1e',   
            'color-item'        : '#2C2C2E',   
            'color-letter'      : '#F7F7F7',
            'filter-img'        :'invert(82%) sepia(99%) saturate(0%) hue-rotate(102deg) brightness(111%) contrast(100%)',
            'color-chat'        : localStorage.getItem('theme-chat'),
            'font-family'       : font.font,
            'width-navigate'    : localStorage.getItem('width-navigate')
        };

        const theme = localStorage.getItem('theme') == 'light' ? themeLight : themeDark;

        metaThemeColor.setAttribute('content', theme['color-background']);
        styleApp.innerHTML = `@import url("${ font.link }");\n:root {\n${ Object.keys(theme).map( key => `--${ key } : ${ theme[key] };\n` ).join('') }}`;
    });

    dispatchEvent( new CustomEvent('_theme') );

    return ''
};

var Position = [
    { id : 1, name : 'Administrador' },
    { id : 2, name : 'Colaborador' },
    { id : 3, name : 'Usuario' },
];

var eleConfirm = (data = {})=>{
     
    const $element = createNodeElement(`
        <div class="div_JPq256o153cnJou">
            <div id="closeElement" class="div_OB5OjfKM9h37trb"></div>
            <div class="div_MOTVHQnePjBi13b scroll-y">
                <div class="div_bjK30KXuRq196kA">
                    <h3>${ data.title ?? '' }</h3>
                    <button id="btnCloseElement"><i class="fi fi-rr-cross-small"></i></button>
                </div>
                <div class="div_jrf0YNBRjlfJtgq">
                    <p>${ data.message ?? '' }</p>
                </div>
                <div class="div_vM8uRjaCFHrm0g2">
                    <button id="buttonCancel" class="button_8m7It5KUpV1th9m pointer">Cancelar</button>
                    <button id="buttonConfirm" class="button_8m7It5KUpV1th9m pointer dark">Confirmar</button>
                </div>
            </div>
        </div>
    `);
 
    const { closeElement , btnCloseElement, buttonCancel, buttonConfirm } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );

    const elementDispatchFalse  = new CustomEvent('_click', { detail : { status : false } });
    const elementDispatchTrue   = new CustomEvent('_click', { detail : { status : true } });

    Array.from([ closeElement, btnCloseElement, buttonCancel ]).forEach( element => {
        element.addEventListener('click', ()=> {
            $element.remove();
            $element.dispatchEvent( elementDispatchFalse );
        });
    });

    buttonConfirm.addEventListener('click', ()=> {
        $element.remove();
        $element.dispatchEvent( elementDispatchTrue );
    });
 
    if( !document.getElementById('style-element-confirm') ) {
        document.head.append(createNodeElement(`
          <style id="style-element-confirm">
            .div_JPq256o153cnJou {
                background: var(--color-background-transparent);
                backdrop-filter: blur(2.5px);

                position: fixed;
                inset: 0;
            
                display: flex;
                padding: 10px;
                z-index: 999;
            }
            
            .div_OB5OjfKM9h37trb {
                position: inherit;
                inset: inherit;
            }
            
            .div_MOTVHQnePjBi13b {
                position: relative;
            
                margin: auto;
            
                background: var(--color-background);
                color: var(--color-letter);
            
                width: min(100%, 450px);
            
                display: grid;
                padding: 10px;
                gap: 10px;
            
                border-radius: 15px;
                animation: translateUp 0.3s ease;
            }
            
            .div_bjK30KXuRq196kA {
                display: grid;
                grid-template-columns: 1fr auto;
                align-items: center;
            
                padding: 10px;
            
                & button {
                background: none;
                outline: none;
                border: none;
            
                width: 40px;
                height: 40px;

                color:inherit;
                }
            }
            
            .div_jrf0YNBRjlfJtgq {
                font-size: 15px;
                padding: 10px;
            
                & p {
                word-break: break-word;
                }
            }
            
            .div_vM8uRjaCFHrm0g2 {
                display: flex;
            
                padding: 10px;
                gap: 10px;
            }
            
            .button_8m7It5KUpV1th9m {
                flex: 1;
            
                background: var(--color-item);
                color: var(--color-letter);
            
                border-radius: 15px;
            
                font-size: 15px;
                font-weight: bold;
            
                height: 50px;
            
                &.dark {
                background: var(--color-letter);
                color: var(--color-item);
                }
            }
          </style>
        `));
    }

    return $element

};

var navigate = ()=>{

    const link = window.dataApp.link;
    const def  = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_RXu40i4 children-hover" style="display:none">
            <div id="closeElement" style="position:inherit; inset:inherit;"></div>
            <div class="div_tc1dPbR">
                <div class="div_rM5169P">
                    <div class="div_Q2rBeY0">
                        <a id="itemProfile" href="#" class="a_6t449L8">
                            <img src="${ link.storage( '/metro/avatar/avatar.png' ) }">
                            <div class="div_OLdT225">
                                <span></span>
                                <p></p>
                            </div>
                        </a>
                        <button id="buttonTheme" class="button_WcVW8ha" ><i class="${ localStorage.getItem('theme') == 'light' ? 'fi fi-rr-moon' : 'fi fi-rr-sun' }"></i></button>
                    </div>
                    <button id="btnCloseElement" class="button_aaRjpm8" style="display:none"><i class="fi fi-rr-cross-small"></i></button>
                </div>
                
                <div class="div_Q1ldZ7Q">

                    <div id="itemPage" class="div_0K0P4b5">
                        <a href="#" class="div_e12Q5Yu" data-page-name="">
                            <i class="fi fi-rr-house-blank"></i>
                            <span>Inicio</span>
                        </a>
                        <a href="#/asistencia" class="div_e12Q5Yu" data-page-name="asistencia" data-page="1">
                            <i class="fi fi-rr-list-check"></i>
                            <span>Asistencia</span>
                        </a>
                        <a href="#/inventario" class="div_e12Q5Yu" data-page-name="inventario" data-page="2">
                            <i class="fi fi-rr-boxes"></i>
                            <span>Inventario</span>
                        </a>
                        <a href="#/usuario" class="div_e12Q5Yu" data-page-name="usuario" data-page="3">
                            <i class="fi fi-rr-users"></i>
                            <span>Usuario</span>
                        </a>
                    </div>
                
                </div>
                <div class="div_5R3eOsr">
                    <button id="btnLogout" class="button_1825Lbj">
                        <i class="fi fi-rr-exit"></i>
                        <span>salir</span>
                    </button>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    new RenderObjectElement( $elements );
 
    const CustomEventTheme  = new CustomEvent('_theme');

    const query$dataPage    = Array.from( $element.querySelectorAll('[data-page]') );
    const tNode$dataPage    = Array( query$dataPage.length ).fill(0).map(()=> document.createTextNode(""));

    const query$dataPageName    = Array.from( $element.querySelectorAll('[data-page-name]') );
    const text$element          = document.createTextNode("");

    const logoutConfirm         = eleConfirm({ title : 'Salir', message : '¿cerrar sesion?' });
    
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
    $elements.closeElement.addEventListener('click', ()=> {
        $element.setAttribute('style', 'display:none'); 
    });

    $elements.buttonTheme.addEventListener('click', ()=> {

        localStorage.setItem('theme', localStorage.getItem('theme') == 'light' ? 'dark' : 'light');
        $elements.buttonTheme.innerHTML =  `<i class="${ localStorage.getItem('theme') == 'light' ? 'fi fi-rr-moon' : 'fi fi-rr-sun' }"></i>`;
        
        dispatchEvent( CustomEventTheme );
    });

    $elements.btnLogout.addEventListener('click', ()=> {
        $element.append( logoutConfirm );
    });

    logoutConfirm.addEventListener('_click', e => {
        if( e.detail.status ) {
            const queries = {   
                token : window.dataApp.user.token
            };

            fetch( link.api(`/auth/logout?${ def.paramQueries( queries ) }`), { method : 'POST' } )
                .then( res => res.json() )
                .then( res => { if( res.status ) dispatchEvent( new CustomEvent('hashchange') ); });
        }
    });

    addEventListener('popstate', ()=> {

        const pageName = location.hash.slice(1).split('/')[1] ?? '';

        query$dataPageName.forEach( element => {

            if( pageName == element.getAttribute('data-page-name') )element.classList.add('focus');
            else element.classList.remove('focus');

        });

        if( localStorage.getItem('auth_x43ipYa') == null ) $element.replaceWith( text$element );
        else text$element.replaceWith( $element );

        if( mediaQuery.matches && pageName != '' ) $element.setAttribute('style', 'display:none' );
        else $element.setAttribute('style', '' );
    });

    addEventListener('_auth', ()=> {

        text$element.replaceWith( $element );

        const user          = window.dataApp.user;
        const Permission    = user.permission;

        
        const position      = Position.find( position => position.id == user.data.position ) ?? {};

        $elements.itemProfile.href    = `#/usuario/${ user.data.uid }`;
        
        $elements.itemProfile.innerHTML = `
            <img src="${ link.storage( `/metro/avatar/${ user.data.avatar || 'avatar.png' }` ) }">
            <div class="div_OLdT225">
                <span>${ user.data.fullname } ${ user.data.lastname }</span>
                <p>${ position.name ?? '' }</p>
            </div>
        `;


        query$dataPage.forEach(( element, index ) => {

            const page          = element.getAttribute('data-page');
            const permission    = Permission.find( permission => permission.id == page ) ?? {};
            const crud          = permission.crud ?? {};
            const read          = crud.read ?? false;
            
            if( read ) tNode$dataPage[ index ].replaceWith( element );
            else element.replaceWith( tNode$dataPage[ index ] );

        });

    });

    addEventListener('_navigate', ()=> {
        if( mediaQuery.matches ) {
            $element.setAttribute('style', $element.getAttribute('style') == '' ? 'display:none' : '' );
        } else {
            localStorage.setItem('width-navigate', localStorage.getItem('width-navigate') == '80px' ? '275px' : '80px');
            dispatchEvent( new CustomEvent('_theme') );

            if( localStorage.getItem('width-navigate') == '80px' ) {
                $element.classList.add('small');
            }
            else {
                $element.classList.remove('small');
            }
        }

    });

    mediaQuery.addEventListener('change', () => {
        $element.setAttribute('style', mediaQuery.matches ? 'display:none' : '' );
    });

    return $element
};

var header = ()=>{

    const $element = createNodeElement(`
        <header class="header_tvR3Va0" style="display:none">

            <button id="btnOpenNavigate" class="button_DmFLl8Y"><i class="fi fi-rr-bars-sort"></i></button>
            <a id="backPage" href="#" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
            <h3 id="title">Inicio</h3>
            

        </header>
    `);

    const $elements = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const text$element  = document.createTextNode("");
    
    $elements.btnOpenNavigate.addEventListener('click', ()=> {
        
        dispatchEvent( new CustomEvent('_navigate') );

    });

    addEventListener('popstate', ()=> {
        if( localStorage.getItem('auth_x43ipYa') == null ) $element.replaceWith( text$element );
        else text$element.replaceWith( $element );

        const hash = location.hash.slice(1).split('/')[1] ?? '';
        
        if( hash == '' ) {

            $element.append( $elements.btnOpenNavigate, $elements.title );
            $elements.backPage.remove();

        } else {

            const hashBack = location.hash.split('/').slice(0, -1).join('/') ?? '';

            $elements.backPage.setAttribute('href', hashBack);
            $element.append( $elements.backPage );

            $elements.btnOpenNavigate.remove();
            $elements.title.remove();
        }

        $element.setAttribute('style', '' );
    });

    setTimeout(()=> dispatchEvent( new CustomEvent('popstate') ));

    return $element
};


/*// const $element = createNodeElement(`
    //     <div class="div_Xu02Xjh children-hover">
    //         <header class="header_K0hs3I0">
    //             <div class="div_uNg74XS">

    //                 ${ hash == '' 
    //                     ? `<button id="btnOpenNavigate" class="button_DmFLl8Y"><i class="fi fi-rr-bars-sort"></i></button>`
    //                     : `<a href="${ hash }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>` }
                    
    //             </div>
    //         </header>
    //         <div class="div_guZ6yID" style="padding:10px"><div class="element-loader" style="--color:var(--color-letter)"></div></div>
    //     </div>
    // `)*/

var routesPublic = ( page = '' )=>{

    const auth = window.dataApp.auth;
    const link = window.dataApp.link;
    const def  = window.dataApp.def;
    
    const $element = createNodeElement('<div class="element-loader"></div>');

    const queries = {
        token : localStorage.getItem(auth)
    };

    fetch( link.api(`/token?${ def.paramQueries( queries ) }`) )
        .then( res => res.json() )
        .then( data => {

            window.dataApp.user = data;

            if( window.dataApp.user != null ) {
                localStorage.setItem(auth, window.dataApp.user.token);
                location.hash = '/';
            } else {
                localStorage.removeItem(auth);
                $element.replaceWith( page() );
            }
            
        });

    return $element

};

var routesPrivate = ( page = '' )=>{

    const link = window.dataApp.link;
    const def  = window.dataApp.def;

    const auth = window.dataApp.auth;

    const $element = createNodeElement(`<div class="element-loader" style="--color:var(--color-letter)"></div>`);

    const queries = {
        token : localStorage.getItem(auth) || ''
    };


    console.log(link.api(`/token?${ def.paramQueries( queries ) }`));

    fetch( link.api(`/token?${ def.paramQueries( queries ) }`) )
        .then( res => res.json() )
        .then( data => {
            window.dataApp.user = data;

            if( window.dataApp.user == null ) {
                localStorage.removeItem(auth);
                location.hash = '/login';
            } else {
                dispatchEvent( new CustomEvent('_auth') );

                localStorage.setItem(auth, window.dataApp.user.token);
                $element.replaceWith( page() );
            }
            
        });

    return $element

};

var login = ()=>{

    const link  = window.dataApp.link;

    const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover">
            <form id="form" class="div_SCqCUTo" autocomplete="off">
                <h2 style="padding: 0 20px;">Iniciar sesion</h2>
                <div class="div_Y85zRC0">
                    <label class="label_L3539wR">
                        <span>correo</span>
                        <input type="text" name="email">
                    </label>
                    <label class="label_L3539wR">
                        <span>contraseña</span>
                        <input type="password" name="password">
                    </label>
                </div>
                <a href="#/recover-password" class="a_c305F1l">recuperar contraseña</a>
                <button class="button_WU25psx" style="">
                    <span>Ingresar</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </button>
                <a href="#/register" class="a_8hzaMUg">
                    <span>Registro</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </a>
            </form>
        </div>   
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    // const render$elements   = new RenderObjectElement( $elements )

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        if ( e.submitter.getAttribute('style') != '' ) return

        const data = {
            email       : $elements.form.email.value.trim(),
            password    : $elements.form.password.value.trim()
        };

        if([data.email, data.password].includes('')) {
            dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Los campos estan vacios', name : 'warning', duration : 3000 }}));
            return
        }
        
        changeSubmitter( e.submitter, true );

        fetch(link.api(`/auth/login`), { method : 'POST', body : JSON.stringify( data ) })
            .then( res => res.json() )
            .then( res => {

                console.log(res);

                if( res.status ) {
                    localStorage.setItem('auth_x43ipYa', res.user.token);
                    location.hash = '/';
                    return
                }

                dispatchEvent(new CustomEvent('_notification', { detail : { message : res.message ?? 'Ocurrio un error', name : 'danger', duration : 3000 } }));
                changeSubmitter( e.submitter, false );

            })
            .catch( err => {
                changeSubmitter( e.submitter, false );
                console.log(err);
            });

    });

    const changeSubmitter =( submitter, load = true )=>{

        if( load ) {
            submitter.setAttribute('style', 'pointer-events:none');
            submitter.innerHTML = `
                <div class="element-loader" style="--color:var(--color-item); --pixel:20px"></div>
            `;
        } else {
            submitter.setAttribute('style', '');
            submitter.innerHTML = `
                <span>Ingresar</span>
                <i class="fi fi-rr-arrow-right"></i>
            `;
        }

    };

    return $element
};

var register = ()=>{

    const auth  = window.dataApp.auth;
    const link  = window.dataApp.link; 

    const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover scroll-y">
            <form id="form" class="div_SCqCUTo" autocomplete="off">
                <h2 style="padding: 0 20px;">Registro</h2>
                <div class="div_Y85zRC0">
                    <label class="label_L3539wR">
                        <input type="text" name="fullname">
                        <span>nombre</span>
                    </label>
                    <label class="label_L3539wR">
                        <input type="text" name="lastname">
                        <span>apellido</span>
                    </label>
                    <label class="label_L3539wR">
                        <input type="text" name="email">
                        <span>correo</span>
                    </label>
                    <label class="label_L3539wR">
                        <input type="password" name="password" autocomplete="off">
                        <span>contraseña</span>
                    </label>
                    <label class="label_L3539wR">
                        <input type="password" name="code" autocomplete="off">
                        <span>codigo de creacion</span>
                    </label>
                </div>
                <button class="button_WU25psx" style="">
                    <span>Crear cuenta</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </button>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </a>
            </form>
        </div>   
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    // const render$elements   = new RenderObjectElement( $elements )
    
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        if ( e.submitter.getAttribute('style') != '' ) return

        const data = {
            fullname    : $elements.form.fullname.value.trim(),
            lastname    : $elements.form.lastname.value.trim(),
            email       : $elements.form.email.value.trim(),
            password    : $elements.form.password.value.trim(),
            code        : $elements.form.code.value.trim()
        };

        if([data.email, data.password, data.fullname, data.code].includes('')) {
            dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Los campos estan vacios', name : 'warning', duration : 4000 } }));
            return
        }
        
        changeSubmitter( e.submitter, true );

        fetch(link.api(`/auth/register`), { method : 'POST', body : JSON.stringify( data ) })
            .then( res => res.json() )
            .then( res => {

                if( res.status ) {
                    localStorage.setItem(auth, res.user.token);
                    location.hash = '/';
                    return
                }

                dispatchEvent(new CustomEvent('_notification', { detail : { message : res.message ?? 'Ocurrio un error', name : 'danger', duration : 4000 } }));
                changeSubmitter( e.submitter, false );

            })
            .catch( err => {
                changeSubmitter( e.submitter, false );
                console.log(err);
            });

    });

    const changeSubmitter =( submitter, load = true )=>{

        if( load ) {
            submitter.setAttribute('style', 'pointer-events:none');
            submitter.innerHTML = `
                <div class="element-loader" style="--color:var(--color-item); --pixel:20px"></div>
            `;
        } else {
            submitter.setAttribute('style', '');
            submitter.innerHTML = `
                <span>Ingresar</span>
                <i class="fi fi-rr-arrow-right"></i>
            `;
        }

    };

    return $element
};

var recoverPassword = ()=>{

    const link  = window.dataApp.link; 

    const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover">
            <form id="form" class="div_SCqCUTo" autocomplete="off">
                <h2 style="padding: 0 20px;">Recuperar contraseña</h2>
                <div class="div_Y85zRC0">
                    <label class="label_L3539wR">
                        <input type="text" name="email" placeholder="">
                        <span>correo</span>
                    </label>
                </div>
                <button class="button_WU25psx">
                    <span>Enviar</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </button>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </a>
            </form>
        </div>   
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        if( e.submitter.children.length == 1 ) return

        const beforeInnerHTML = e.submitter.innerHTML; 
        e.submitter.innerHTML = `<div class="element-loader" style="--pixel: 30px; margin: auto; --color:var(--color-item)"></div>`;
        
        const body = {
            email : $elements.form.email.value.trim()
        };

        fetch(link.api(`/auth/recover-password`), { method : 'POST', body : JSON.stringify( body ) })
            .then( res => res.json() )
            .then( res => {
                e.submitter.innerHTML = beforeInnerHTML;

                if( res.status )
                    dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Revise su email para restablecer su contraseña', name : 'info', duration : 7000 } }));
                else 
                    dispatchEvent(new CustomEvent('_notification', { detail : { message : res.message ?? 'Ocurrio un error', name : 'warning' } }));

            })
            .catch( err => {
                console.log(err);
                e.submitter.innerHTML = beforeInnerHTML;
                dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Ocurrio un error', name : 'danger' } }));
            });
    });

    return $element
};

var updatePassword = ()=>{

    

    const params = window.dataLib.params;

    const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover scroll-y">
            <div id="itemNull" class="div_TwxBw4R">
                <div class="element-loader"></div>
            </div>
            <div id="itemFalse" class="div_TwxBw4R">
                <div class="div_70M5Jpt">
                    <div class="div_b14S3dH">
                        <i class="fi fi-rr-exclamation"></i>
                        <h3>El enlace ya no esta disponible</h3>
                    </div>
                </div>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </a>
            </div>
            <form id="form" class="div_SCqCUTo"  autocomplete="off">
                <h2 style="padding: 0 20px;">Cambiar contraseña</h2>
                <div class="div_Y85zRC0">
                    <label class="label_L3539wR">
                        <input type="password" name="password" placeholder="">
                        <span>contraseña</span>
                    </label>
                    <label class="label_L3539wR">
                        <input type="password" name="password2" placeholder="">
                        <span>repita la contraseña</span>
                    </label>
                </div>
                <button class="button_WU25psx" >
                    <span>Cambiar</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </button>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </a>
            </form>
            
        </div>   
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();
        
        const body = {
            password : $elements.form.password.value.trim(),
            password2 : $elements.form.password2.value.trim()
        };   

        const queries = {
            token : params.token
        };

        fetch(link.api(`/auth/update-password?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( body ) })
            .then( res => res.json() )
            .then( res => {

                dataLoad();

                if( res.status )
                    dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Contraseña actualizada con exito', name : 'success' } }));
                else 
                    dispatchEvent(new CustomEvent('_notification', { detail : { message : res.message ?? 'Ocurrio un error', name : 'danger' } })); 
                
            });
    });

    const dataRender =( data = null )=>{
        const render = {
            itemNull    : data === 0,
            itemFalse   : data === null,
            form        : data === true
        };
        
        render$elements.set( render );
    };

    const dataLoad =()=>{
        const queries = {
            token : params.token + '__'
        };

        fetch( link.api(`/token?${ def.paramQueries( queries ) }`) )
            .then( res => res.json() )
            .then( dataRender );
    };

    dataRender(0);
    dataLoad();

    return $element
};

var inicio = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const user          = window.dataApp.user;

    const $element = createNodeElement(`
        <div class="div_f0Au33C scroll-y" style="padding:15px">
            <div class="div_gZrdl0h">
                <div class="div_1fG5J8C">
                    <h4>Inventario</h4>
                    <div class="div_W8h9OQ7">
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                inventario
                                <span data-render-text="total_inventario">-</span>
                            </div>
                            <hr>
                            <a href="#/inventario" class="button_0530xdO pointer"><i class="fi fi-rr-angle-right"></i></a>
                        </div>
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                productos
                                <span data-render-text="total_producto">-</span>
                            </div>
                        </div>
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                            marcas
                                <span data-render-text="total_marca">-</span>
                            </div>
                        </div>
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                categorias
                                <span data-render-text="total_categoria">-</span>
                            </div>
                        </div>
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                seccion
                                <span data-render-text="total_seccion">-</span>
                            </div>
                        </div>
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                departamento
                                <span data-render-text="total_departamento">-</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div_1fG5J8C">
                    <h4>Usuario</h4>
                    <div class="div_W8h9OQ7">
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                usuario
                                <span data-render-text="total_usuario">-</span>
                            </div>
                            <hr>
                            <a href="#/usuario" class="button_0530xdO pointer"><i class="fi fi-rr-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <div class="div_1fG5J8C">
                    <h4>Asistencia</h4>
                    <div class="div_W8h9OQ7"> 
                        <div class="div_0EjqIvF">
                            <div class="div_gvk64p8">
                                asistencia
                                <span data-render-text="total_asistencia">-</span>
                            </div>
                            <hr>
                            <a href="#/asistencia" class="button_0530xdO pointer"><i class="fi fi-rr-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    new RenderObjectElement( $elements );

    const query$dataRenderText  = Array.from( $element.querySelectorAll('[data-render-text]') );
    
    const dataIsTrue =( data = {} )=>{

        query$dataRenderText.forEach(element => {
            element.textContent = data[ element.getAttribute( 'data-render-text' ) ];
        });

    };
    
    const dataRender =( data )=>{
        dataIsTrue( data );
    };
    
    const dataLoad =()=>{

        const queries = {
            token : user.token
        };

        fetch( link.api(`/total?${ def.paramQueries( queries ) }`) )
            .then( res => res.json() )
            .then( dataRender );
    };

    dataLoad();

    return $element
};

var formInventario = ( parameters = {} )=>{ 

    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <form id="form" class="div_pUg2Yb9" autocomplete="off">
                <div class="div_kB20ofu">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>nombre</span>
                            <input type="text" name="name" value="${ parameters.data.name ?? '' }">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button type="submit">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>
           </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
   
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            name : $elements.form.name.value.trim()
        };

        const queries = {
            token : user.token
        };

        if( parameters.from == 'add' ) {
            fetch(link.api(`/inventario?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        } else if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/inventario?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var inventario = ()=>{

    const link      = window.dataApp.link;
    const def       = window.dataApp.def;
    const user      = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header id="header" class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Inventario</h3>
                </div>

                <div class="div_x0cH0Hq" id="hiii">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>
                
                <div id="elementFetch" style="display:none"></div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_MNsAkom"></div>
                
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form        : '',
    };

    const intersectionObserver = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    const mutationObserver = new MutationObserver(( mutationsList, observer )=> {
        if( load.value == true ) return
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                render$elements.set({
                    itemFalse : !$elements.itemTrue.children.length,
                    itemTrue  : !!$elements.itemTrue.children.length
                });
            }
        }
    }); mutationObserver.observe($elements.itemTrue, { childList: true });

    const load = defineVal( true );
    const Data = defineVal( [] );

    load.observe(()=> {

        render$elements.set( {
            itemNull    : load.value,
            itemFalse   : false,
            itemTrue    : false
        });

    });

    Data.observe(()=> {

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.value.map( data => {
            return `
                <a href="#/inventario/${ data.id }" class="div_QEF6SG2">
                    <div class="div_3B0LBmP">
                        <span>${ data.name }</span>
                        <i class="fi fi-rr-angle-small-right"></i>
                    </div>
                    <div class="div_huWimxl">
                        <p>${ data.total_categoria } categorias</p>
                        <p>${ data.total_marca } marcas</p>
                        <p>${ data.total_seccion } secciones</p>
                        <p>${ data.total_departamento } departamentos asdf sadfsdf sadf</p>
                        <p>${ data.total_producto } productos</p>
                    </div>
                </a>
            `
        }).join('') + ' ');

        if( Data.length > 49 ) {
            intersectionObserver.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }

    });

    const dataLoad  =()=> {

        const textNode = document.createTextNode("");

        if( crud.read ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
                query_like : $elements.inputSeach.value.trim()
            };

            fetch(link.api(`/inventario?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( res => {

                    if( textNode.parentElement ) {

                        load.value = false;
                        Data.value = Array.isArray(res) ? res : [];

                    }

                });

        } else {
            load.value = false;
        }

        $elements.elementFetch.append(textNode); 
    }; dataLoad();

    $elements.btnOpenForm.addEventListener('click', ()=> {

        if( elements.form == '' ) {
            elements.form = formInventario({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;
                if( detail.status ) {
                    dataLoad();
                }
            });
        }

        $element.append( elements.form );
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        
        load.value = true;

        $elements.itemTrue.innerHTML        = '';
        $elements.elementFetch.innerHTML    = '';
        dataLoad();
    });
 
    return $element
};

var eleOption = ( parameters = {} )=>{
 
    parameters.includes = parameters.includes ?? [];

    const icon = window.dataApp.icon;
    
    const $element = createNodeElement(`
        <div class="div_wkrHC4T">
            <div id="closeElement" class="div_AbT09mv"></div>
            <div class="div_l19q36Q">
                <div id="itemData" class="div_612u8u1"></div>
            </div>
        </div>
    `);

    const { closeElement, itemData } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //<i class=""></i>
    const Option = [
        { from : ['asistencia_user', 'asistencia_user_id'], icon : 'fi fi-rr-user-add', name : 'Agregar', action : 'addUser' },
        { from : ['asistencia_user_id'], icon : 'fi fi-rr-remove-user', name : 'Eliminar', action : 'deleteUser' },
        { from : ['asistencia_user_id'], icon : 'fi fi-rr-user-slash', name : 'Remover', action : 'removeUser' },
        { from : ['usuario', 'categoria', 'producto', 'inventario', 'asistencia'], icon : 'fi fi-rr-pencil', name : 'Editar', action : 'edit' },
        { from : ['usuario', 'categoria', 'producto', 'inventario', 'asistencia'], icon : 'fi fi-rr-trash', name : 'Eliminar', action : 'delete' },
        { from : ['usuario'], icon : 'fi fi-rr-user-key', name : 'Permisos', action : 'permission' },
        { from : ['usuario'], icon : 'fi fi-rr-key', name : 'cambiar contraseña', action : 'edit_password' },
    ];
    
    itemData.innerHTML = Option.filter( option => {
        if( option.from.includes( parameters.from ) ) {
            if( parameters.includes.includes( '*' ) ) return true
            else if( parameters.includes.includes( option.action ) ) return true
        }
        return false
    }).map( option => {
        
        return `
            <button class="button_4M96y3v" data-action="${ option.action }">
                ${ icon.get(option.icon) }
                <span>${ option.name }</span>
            </button>
        `
    }).join('');

    itemData.addEventListener('click', e => {
        const button = e.target.closest('[ data-action ]');
        if( button ) {
            $element.dispatchEvent(
                new CustomEvent('_click', {
                    detail : { action : button.getAttribute('data-action') }
                })
            );

            $element.remove();
        }
    });

    closeElement.addEventListener('click', ()=> $element.remove());

    $element.prepend(createNodeElement(`
        <style>
            .div_wkrHC4T {
                backdrop-filter: blur(2.5px);
                background: var(--color-background-transparent);
                position: fixed;
                inset: 0;
            
                display: flex;
            
                padding: 10px;
            }
            
            .div_AbT09mv {
                position: inherit;
                inset: inherit;
            }
            
            .div_l19q36Q {
                margin: auto;
                overflow: hidden;
            
                position: relative;
                background: var(--color-background);
            
                width: min(100%, 400px);
                max-height: 100%;
                padding: 10px;
            
                border-radius: 15px;
            
                overflow-y: auto;
            }
            
            .div_612u8u1 {
                display: grid;
                overflow: hidden;
            
                border-radius: 15px;
            }
            
            .button_4M96y3v {
                background: var(--color-item);
                color: var(--color-letter);
            
                display: grid;
                grid-template-columns: 60px 1fr;
                align-items: center;
            
                height: 60px;
            
                border: none;
                outline: none;
            
                font-size: 15px;
                text-align: center;
            
                padding-right: 20px;
            
                & svg {
                margin: auto;
                }
            
                & span {
                text-align: left;
                }
            }
        </style>
    `));

    return $element
};

var inventarioId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def; 

    const user          = window.dataApp.user;
    const params        = window.dataLib.params;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};
 
    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Inventario no encontrado</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ">
                    <a href="#/inventario/${ params.id }/categoria" class="div_q97S60f">
                        <div class="div_RbqUyx3">
                            <span>Categoria</span>
                            <p>cantidad 30</p>
                        </div>
                        <i class="fi fi-rr-angle-small-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : ''
    };

    

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });

        $elements.titleText.textContent = '';
    };
    
    const dataIsTrue =( data )=>{
        render$elements.set({
            btnOpenOptions    : crud.read && ( crud.update || crud.delete )
        });

        $elements.titleText.textContent = data.name;

        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'inventario', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿eliminar este inventario?' });
            elements.confirm.addEventListener('_click', e => {
                if( e.detail.status ) {
                    const queries = {
                        token : user.token,
                        id : params.id
                    };
    
                    fetch(link.api(`/inventario?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
            });
        }

        if( elements.form == '' ) {
            elements.form = formInventario({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
        
        $elements.itemTrue.innerHTML = ['categoria', 'marca', 'seccion', 'departamento', 'producto'].map( name => {
            return `
                <a href="#/inventario/${ params.id }/${ name }" class="div_q97S60f">
                    <div class="div_RbqUyx3">
                        <span>${ name }</span>
                        <p>cantidad ${ data[`total_${ name }`] ?? 0 }</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join('');
    };
    
    const dataRender =( data = null )=>{
        const render = {
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        };
        
        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue  ) dataIsTrue( data );

        render$elements.set( render );
    };
    
    const dataLoad =()=>{
   
        if( crud.read ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : 'one',
                col_0 : params.id
            };

            fetch(link.api(`/inventario?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender(null);
        }
    };

    dataRender(0);
    dataLoad(); 


    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));

    return $element
};

var Gender = [
    { id : 1, name : 'Masculino' },
    { id : 2, name : 'Femenino' },
];

var eleCalendar = ( parameters = {} )=>{
 
    const Month = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
    const Day   = [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ];

    const $element = createNodeElement(`
        <div class="div_Ed0WWt537MU926D">
            <div id="elementClose" class="div_xAeKmwifq7Ajpip"></div>
            <div class="div_zkdwut55cOC4757 scroll-y">
                <div class="div_Shm089Y0yC25009">
                    <div class="div_42Ewc0LTho1Hok2">
                        <h3>${ parameters.title }</h3>
                    </div>
                    <div id="containerDate" class="div_4qg39xR95L71RiS ">
                        <div id="elementDay" class="div_afO4579AKSm7b8q"></div>
                        <div id="containerYearMonth" class="div_Hd4V1BgCSOSCL5J scroll-y">
                            <div id="elementYear" class="div_w17wYdh13YdIUnI year"></div>
                            <div id="elementMonth" class="div_w17wYdh13YdIUnI month"></div>
                        </div>
                    </div>
                    <div class="div_iJVaX1Vhq90V6K2">
                        <div id="dayText">-</div>
                        <div id="monthText" class="half">-</div>
                        <div id="yearText">-</div>
                    </div>
                    <div class="div_m38HD12AtX186RH">
                        <button id="btnCancel">Cancelar</button>
                        <button id="btnSubmit">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    `);

    const { elementClose, dayText, monthText, yearText, containerDate, containerYearMonth, elementYear, elementMonth, elementDay, btnCancel, btnSubmit } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );

    const date = parameters.value ? new Date(parameters.value) : new Date();

    const datetimeDinamic = {
        year    : date.getFullYear(),
        month   : date.getMonth(),
        day     : date.getDate(),
    };

    datetimeDinamic.dayLimit = new Date(datetimeDinamic.year, datetimeDinamic.month + 1, 0).getDate();

    dayText.addEventListener('click', ()=> {
        containerYearMonth.remove();
    });

    monthText.addEventListener('click', ()=> {
        containerYearMonth.textContent = '';
        containerYearMonth.append( elementMonth );
        containerDate.append( containerYearMonth );

        const focus = elementMonth.querySelector('.focus');
        if( focus ) focus.scrollIntoView({ block: "center", inline: "center" });
    });

    yearText.addEventListener('click', ()=> {
        containerYearMonth.textContent = '';
        containerYearMonth.append( elementYear );
        containerDate.append( containerYearMonth );

        const focus = elementYear.querySelector('.focus');
        if( focus ) focus.scrollIntoView({ block: "center", inline: "center" });
    });
    
    elementDay.addEventListener('click', e => {
        const span = e.target.closest('span');

        if( span ) {

            const _date = parseInt(span.getAttribute('data-data'));
            const up    = _date > datetimeDinamic.day;

            if( _date == datetimeDinamic.day ) return
            datetimeDinamic.day = _date;

            const spanfocus =  elementDay.querySelector('span.focus');
            if( spanfocus ) spanfocus.classList.remove('focus');
            span.classList.add('focus');

            dayText.innerHTML = `<h3 class="${ up ? 'up' : 'down' }">${ span.textContent  }</h3>`;
        }

    });

    elementMonth.addEventListener('click', e => {
        const span = e.target.closest('span');

        if( span ) {

            containerYearMonth.remove();
            const _date = parseInt(span.getAttribute('data-data'));
            const up    = _date > datetimeDinamic.month;

            if( _date == datetimeDinamic.month ) return
            datetimeDinamic.month = _date;

            const spanfocus =  elementMonth.querySelector('span.focus');
            if( spanfocus ) spanfocus.classList.remove('focus');
            span.classList.add('focus');

            monthText.innerHTML = `<h3 class="${ up ? 'up' : 'down' }">${ span.textContent  }</h3>`; 

            datetimeDinamic.dayLimit = new Date(datetimeDinamic.year, datetimeDinamic.month + 1, 0).getDate();

            if( datetimeDinamic.dayLimit < datetimeDinamic.day ) {
                dayText.textContent = ('0' + datetimeDinamic.dayLimit).slice(-2);
                datetimeDinamic.day = datetimeDinamic.dayLimit;
            }

            renderDatetime('day');
        }
    });

    elementYear.addEventListener('click', e => {
        const span = e.target.closest('span');

        if( span ) {

            containerYearMonth.remove();
            const _date = parseInt(span.getAttribute('data-data'));
            const up    = _date > datetimeDinamic.year;

            if( _date == datetimeDinamic.year ) return
            datetimeDinamic.year = _date;

            const spanfocus =  elementYear.querySelector('span.focus');
            if( spanfocus ) spanfocus.classList.remove('focus');
            span.classList.add('focus');

            yearText.innerHTML = `<h3 class="${ up ? 'up' : 'down' }">${ span.textContent  }</h3>`; 

            datetimeDinamic.dayLimit = new Date(datetimeDinamic.year, datetimeDinamic.month + 1, 0).getDate();

            if( datetimeDinamic.dayLimit < datetimeDinamic.day ) {
                dayText.textContent = ('0' + datetimeDinamic.dayLimit).slice(-2);
                datetimeDinamic.day = datetimeDinamic.dayLimit;
            }

            renderDatetime('day');
        }
    });

    btnSubmit.addEventListener('click', ()=> {
        const datetime = new Date(datetimeDinamic.year, datetimeDinamic.month, datetimeDinamic.day, 0, 0, 0, 0).getTime();
        $element.dispatchEvent(new CustomEvent('_change', { detail : { datetime } }));
        $element.remove();
    });

    elementClose.addEventListener('click', ()=> {
        $element.remove();
    });

    btnCancel.addEventListener('click', ()=> {
        $element.remove();
    });

    const renderDatetime =(change = '*')=>{

        if( ['year', '*'].includes(change) ) {
            elementYear.innerHTML = [...Array((new Date().getFullYear() + 15) - 1970).keys()].map(num => {
                const date = 1970 + num;

                const focus   = datetimeDinamic.year == date;


                if( focus ) yearText.innerHTML = `<h3>${ date  }</h3>`;  
                return `<span class="${ focus ? 'focus' : '' }" data-data="${ date }">${ date }</span>`
            }).join('');
        }

        if( ['month', '*'].includes(change) ) {
            elementMonth.innerHTML = [...Array(Month.length).keys()].map((num) => {

                const numtext = Month[ num ];
                const focus   = datetimeDinamic.month == num;

                if( focus ) monthText.innerHTML = `<h3>${ numtext  }</h3>`; 
                return `<span class="${ focus ? 'focus' : '' }" data-data="${ num }">${ numtext }</span>`

            }).join('');
        }

        if( ['day', '*'].includes(change) ) {

            const tempDate = new Date(datetimeDinamic.year, datetimeDinamic.month, 1, 0, 0, 0, 0);

            const textDay = Day.concat( Array( tempDate.getDay() ).fill(' ') ).map(num => {
                return `<span class="off">${ num[0] }</span>`
            }).join('');
 
            elementDay.innerHTML = textDay + [...Array( datetimeDinamic.dayLimit ).keys()].map(num => {
                ++num;

                const numtext = num;
                const focus   = datetimeDinamic.day == num;
                if( focus ) dayText.innerHTML = `<h3>${ numtext }</h3>`;   
                return `<span class="${ focus ? 'focus' : '' }" data-data="${ num }">${ numtext }</span>`
                
            }).join('');
        }
    };

    containerYearMonth.remove();
    renderDatetime();

    $element.append(createNodeElement(`
        <style >
            .div_Ed0WWt537MU926D {
                background: var(--color-background-transparent);
                backdrop-filter: blur(2.5px);

                position: fixed;
                z-index: 999;
                inset: 0;
            
                display: flex;
                padding: 10px;
            }
            
            .div_xAeKmwifq7Ajpip {
                position: inherit;
                inset: inherit;
            }
            
            .div_zkdwut55cOC4757 {
                background: var(--color-background);
                color: var(--color-letter);

                margin: auto;
                position: relative;
            
                width: min(100%, 400px);
                max-height: calc(100% - 60px);
            
                animation: translateUp 0.3s ease;
            
                border-radius: 15px;
            }
            
            .div_Shm089Y0yC25009 {
                width: 100%;
                border-radius: 8px;
            
                display: flex;
                flex-direction: column;
            
                padding: 10px;
                gap: 10px;
            
                overflow: hidden;
            }
            
            .div_42Ewc0LTho1Hok2 {
                display: grid;
                grid-template-columns: 1fr;
                align-items: center;
            
                text-align: center;
            
                height: 50px;
            
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            
                font-size: 20px;
            }
            
            .div_iJVaX1Vhq90V6K2 {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                height: 50px;
            
                background: var(--color-letter);
                color: var(--color-item);
            
                border-radius: 15px;
                overflow: hidden;
            
                & h3 {
                position: relative;
                font-size: 16px;
            
                &.up {
                    animation: translateDown 0.3s ease;
                }
                &.down {
                    animation: translateUp 0.3s ease;
                }
                }
            
                & div {
                display: flex;
                justify-content: center;
                align-items: center;
                }
            }
            
            .div_4qg39xR95L71RiS {
                color: var(--color-letter);
            
                display: flex;
                position: relative;
            
                border-radius: 15px;
                overflow: hidden;
            }
            
            .div_Hd4V1BgCSOSCL5J {
                background: var(--color-background);
                position: absolute;
                inset: 0;
            
                display: flex;
            }
            
            .div_w17wYdh13YdIUnI {
                display: grid;
                margin: auto;
                margin-bottom: initial;
            
                width: 100%;
            
                &.year {
                grid-template-columns: repeat(3, 1fr);
                }
            
                &.month {
                grid-template-columns: repeat(2, 1fr);
                }
            
                & span {
                height: 60px;
            
                display: flex;
                justify-content: center;
                align-items: center;
            
                font-size: 14px;
            
                &.focus {
                    font-weight: bolder;
                    font-size: 15px;
                }
                }
            }
            
            .div_afO4579AKSm7b8q {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(7, 1fr);
                width: 100%;
            
                & span {
                height: 40px;
            
                text-align: center;
                border-radius: 15px;
            
                display: flex;
                justify-content: center;
                align-items: center;
            
                font-size: 14px;
            
                &.focus {
                    background: var(--color-letter);
                    color: var(--color-item);
                }
            
                &.off {
                    pointer-events: none;
                    font-weight: bold;
                }
                }
            }
            
            .div_m38HD12AtX186RH {
                display: grid;
                grid-template-columns: 1fr 1fr;
                height: 50px;
            
                gap: 10px;
            
                border-radius: 15px;
                overflow: hidden;
            
                & button {
                background: var(--color-item);
                color: var(--color-letter);
                font-size: 15px;
            
                border-radius: 15px;
                }
            }
        </style>
    `)); 

    return $element

};

//div_iJVaX1Vhq90V6K2

var eleSelection = ( parameters = {} )=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const $element = createNodeElement(`
        <div class="div_f75GQd12BanP2X6 children-hover">
            <div id="closeElement" class="div_BF5zc8o39hDq6yV"></div>
            <div class="div_0obl68EV183c7gK">
                <div class="div_N1hNsm5myMuYi82">
                    <div class="div_pCjM7W480vX872y">
                        <button id="btnCleanSearch"><i class="fi fi-rr-search"></i></button>
                        <input id="inputSearch" type="search" placeholder="buscar">
                    </div>
                    <div class="scroll-y" style="display:flex; min-height: 300px; flex: 1; border-radius: 15px;">
                        <div id="itemNull" class="element-loader" style="--pixel:40px"></div>
                        <div id="itemFalse" class="div_b14S3dH">
                            <i class="fi fi-rr-search-alt"></i>
                            <h3>No hay resultados</h3>
                        </div>
                        <div id="itemTrue" class="div_AUndD0G2PK0SMxU scroll-y"></div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const objectElement         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const renderObjectElement   = new RenderObjectElement( objectElement );

    const { itemTrue, closeElement, btnCleanSearch, inputSearch } = objectElement;

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    closeElement.addEventListener('click', ()=> $element.remove());

    btnCleanSearch.addEventListener('click', ()=> {
        $element.remove();
    });

    inputSearch.addEventListener('input', () => {
        itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });

    itemTrue.setAttribute('data-value', parameters.focus);
    itemTrue.addEventListener('click', e => {
        const button = e.target.closest('button');
        if( button ) {

            itemTrue.setAttribute('data-value', button.getAttribute('data-value'));
            itemTrue.querySelectorAll('.focus').forEach( element => element.classList.remove('focus') );
            button.classList.add('focus');

            $element.dispatchEvent(
                new CustomEvent('_change', {
                    detail : { 
                        data : JSON.parse( button.getAttribute('data-data') ),
                        value: button.getAttribute('data-value')
                    }
                })
            );

            $element.remove();
        }
    });
    
    const dataIsTrue =(Data = [])=>{
        
        itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <button 
                    class="button_DVDM01LTdjL1bZi ${ data.id == itemTrue.getAttribute('data-value') ? 'focus' : '' }" 
                    data-id="${ data.id }" data-value="${ encodeText(data.name).input() }" 
                    data-data="${ encodeText(JSON.stringify( data )).input() }">

                    <span class="text-ellipsis">${ encodeText(data.name).textarea() }</span>
                    <i class="fi fi-rr-check-circle"></i>
                </button>
            `
        }).join(''));

        if( Data.length > 49 ) {
            observer.observe( itemTrue.children[ itemTrue.children.length - 1 ] );
        }

    };

    const dataRender =( Data = [] )=>{
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length && !itemTrue.children.length ,
            itemTrue    : (Array.isArray(Data) && Data.length) || (!Data.length && itemTrue.children.length)
        };

        if( render.itemNull ) ;
        else if( render.itemFalse ) ;
        else if( render.itemTrue ) dataIsTrue( Data );

        renderObjectElement.set( render );
    };

    const dataLoad =()=>{


        if( parameters.from == 'categoria' ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : [ itemTrue.children.length, 50 ].join(','),
                col_1 : params.id_inventario,
                query_like : inputSearch.value.trim()
            };

            fetch( link.api(`/categoria?${ def.paramQueries( queries ) }`) )
                .then( res => res.json() )
                .then( dataRender );
        }

        else if( parameters.from == 'marca' ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : [ itemTrue.children.length, 50 ].join(','),
                col_1 : params.id_inventario,
                query_like : inputSearch.value.trim()
            };

            fetch( link.api(`/marca?${ def.paramQueries( queries ) }`) )
                .then( res => res.json() )
                .then( dataRender );
        }

        else if( parameters.from == 'seccion' ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : [ itemTrue.children.length, 50 ].join(','),
                col_1 : params.id_inventario,
                query_like : inputSearch.value.trim()
            };

            fetch( link.api(`/seccion?${ def.paramQueries( queries ) }`) )
                .then( res => res.json() )
                .then( dataRender );
        }

        else if( parameters.from == 'departamento' ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : [ itemTrue.children.length, 50 ].join(','),
                col_1 : params.id_inventario,
                query_like : inputSearch.value.trim()
            };

            fetch( link.api(`/departamento?${ def.paramQueries( queries ) }`) )
                .then( res => res.json() )
                .then( dataRender );
        }

        else if( parameters.from == 'gender' ) {
            dataRender( Gender.filter( gender => (gender.name).toLowerCase().indexOf( inputSearch.value.toLowerCase().trim()) != -1 ) );
        }

        else if( parameters.from == 'position' ) {
            dataRender( Position.filter( position => (position.name).toLowerCase().indexOf( inputSearch.value.toLowerCase().trim()) != -1 ) );
        }

    };

    dataRender(0);
    dataLoad();

    $element.prepend(createNodeElement(`
        <style>
            .div_f75GQd12BanP2X6 {
                background: rgb(0 0 0 / 0.1);
                backdrop-filter: blur(2.5px);
            
                position: fixed;
                inset: 0;
            
                display: flex;
                padding: 10px;
            }
            
            .div_BF5zc8o39hDq6yV {
                position: inherit;
                inset: inherit;
            }
            
            .div_0obl68EV183c7gK {
                position: relative;
                background: var(--color-background);
                margin: auto;
            
                width: min(100%, 450px);
                max-height: min(100%, 750px);
            
                padding: 10px;
            
                border-radius: 15px;
            
                display: flex;
                overflow: hidden;
            }
            
            .div_N1hNsm5myMuYi82 {
                display: flex;
                flex-direction: column;
                gap: 10px;
            
                flex: 1;
            }
            
            .div_pCjM7W480vX872y {
                display: grid;
                grid-template-columns: 60px 1fr;
                height: 60px;
            
                background: var(--color-item);
                color: var(--color-letter);
            
                border-radius: 15px;
                overflow: hidden;
            
                & input {
                background: none;
                outline: none;
                border: none;
            
                color: inherit;
            
                padding-right: 20px;
                }
            
                & button {
                background: none;
                color: var(--color-letter);
            
                width: 40px;
                height: 40px;
            
                margin: auto;
                border-radius: 15px;
                }
            }
            
            .div_AUndD0G2PK0SMxU {
                margin:auto;
                margin-top:initial;
                background: var(--color-item);
                display: grid;
            
                border-radius: 15px;
            
                width: 100%;
            }
            
            .button_DVDM01LTdjL1bZi {
                background: none;
                color: var(--color-letter);
            
                width: 100%;
                height: 60px;
            
                display: grid;
                grid-template-columns: 1fr 60px;
                align-items: center;
            
                padding-left: 20px;
            
                &.focus {
                opacity: 0.7;
            
                & i {
                    opacity: 1;
                }
                }
            
                & span {
                text-align: left;
                }
            
                & i {
                opacity: 0;
                }
            }
        </style>
    `));

    return $element
};

var userForm = ( parameters = {} )=>{
    
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_Kc9Bc16">
            <form id="form" class="div_z7l4R5v" autocomplete="off">

                <input type="hidden" name="avatar" value="" data-input-file-image-text>

                <div class="div_sXC2jhS">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>

                <div class="div_sc7enus">
                    <div class="div_Mwjygq9">
                    
                        <div class="div_5d0tX5z">

                            <label class="label_5uI64v4">
                                <input type="file" name="fileAvatar" accept="image/*" data-input-file-image>
                                <i class="fi fi-rr-plus"></i>
                            </label>

                            <div id="containerImage" class="div_o26jdj1"></div>

                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>nombre</span>
                                <input type="text" name="fullname" data-input-text>
                            </label>

                            <label class="label_f5yYI3Y">
                                <span>apellido</span>
                                <input type="text" name="lastname" data-input-text>
                            </label>
                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>correo</span>
                                <input type="text" name="email" data-input-text>
                            </label>

                            <label class="label_f5yYI3Y">
                                <span>telefono</span>
                                <input type="text" name="phone" data-input-text>
                            </label>
                        </div>

                        ${ parameters.from == 'add' ? `
                            <div class="div_ekg8FP7">
                                <label class="label_f5yYI3Y">
                                    <span>contraseña</span>
                                    <input type="password" name="password" data-input-text>
                                </label>
                            </div>
                        ` : '' }
                        
                        <div class="div_ekg8FP7">

                            ${ parameters.data.uid != user.data.uid && user.data.position == 1 ? `
                                <label class="label_f5yYI3Y">
                                    <span>posicion</span>
                                    <input type="text" name="position" data-value="0"  data-input-option readonly>
                                </label>
                            ` : '' }
                            
                            <label class="label_f5yYI3Y">
                                <span>genero</span>
                                <input type="text" name="gender" data-value="0" data-input-option readonly>
                            </label>
                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>fecha de nacimiento</span>
                                <input type="text" name="birthdate" data-value="0" data-input-date readonly>
                            </label>
                        </div>

                        ${ parameters.data.uid != user.data.uid ? `
                            <label class="label_EyS0ZS4">
                                <span>habilitar</span>
                                <input type="checkbox" name="status" data-input-boolean>
                            </label>
                        ` : '' }
                    </div>
                </div>

                <div class="div_jxd97Sb">
                    <button id="btnCancel" type="button" class="button_LN16pU5 light">Cancelar</button>
                    <button type="submit" class="button_LN16pU5">
                        <span>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</span>
                        <i class="fi fi-rr-check"></i>
                    </button>
                </div>

            </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());

    const optionElement =  {
        position   : eleSelection({ from : 'position' }),
        gender     : eleSelection({ from : 'gender' }),
    };

    const optionArray  = {
        position    : Position,
        gender      : Gender
    };

    const dateElement   = {
        birthdate  : eleCalendar({ title : 'Fecha de nacimiento', value : null }),
    };

    const bodyInputData = {};
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', '');

    $element.querySelectorAll('[data-input-text]').forEach( element => {
        element.value = parameters.data[ element.name ] ?? '';
        element.removeAttribute('data-input-text');
        element.addEventListener('input', () => bodyInputData[ element.name ] = element.value.trim());
        element.dispatchEvent( new CustomEvent('input') ); 
    });

    $element.querySelectorAll('[data-input-option]').forEach( element => {
        element.removeAttribute('data-input-option'); 

        const $option   = optionElement[ element.getAttribute('name') ] ?? document.createTextNode();
        const option    = optionArray[ element.name ].find( option => option.id == parameters.data[ element.name ] ?? '' ) ?? {};

        $option.addEventListener('_change', e => {
            element.dispatchEvent( new CustomEvent('input', { detail : e.detail.data }) );
        });

        element.addEventListener('input', e => {
            if( e instanceof CustomEvent ) {
                const detail = e.detail;
                element.value = detail.name ?? '';
                bodyInputData[ element.name ] = detail.id ?? '';
            }
        });

        element.addEventListener('focus', () => $element.append( $option ));
        element.dispatchEvent( new CustomEvent('input', { detail : option }) );
    });

    $element.querySelectorAll('[data-input-date]').forEach( element => {
        element.removeAttribute('data-input-date'); 

        const $date   = dateElement[ element.getAttribute('name') ] ?? document.createTextNode();

        $date.addEventListener('_change', e => {
            element.dispatchEvent( new CustomEvent('input', { detail : e.detail.datetime }) );
        });

        element.addEventListener('input', e => {
            if( e instanceof CustomEvent ) {
                const detail                = new Date( e.detail );
                element.value               = detail.toLocaleDateString();
                bodyInputData[ element.name ]   = detail.getTime();
            }
        });

        element.addEventListener('focus', () => $element.append( $date ));
        element.dispatchEvent( new CustomEvent('input', { detail : parameters.data[ element.name ] }) );
    });

    $element.querySelectorAll('[data-input-boolean]').forEach( element => {
        element.removeAttribute('data-input-boolean');
        element.checked = !!parameters.data[ element.name ];
        element.addEventListener('input', ()=> bodyInputData[ element.name ] = element.checked ? 1 : 0);
        element.dispatchEvent( new CustomEvent('input') );
    });

    $element.querySelectorAll('[data-input-file-image-text]').forEach( element => {
        element.removeAttribute('data-input-file-image-text');
        element.setAttribute('data-file-image', link.storage(`/avatar/${ parameters.data[ element.name ] }`));
        
        element.addEventListener('input', e => {

            const image = e.detail.image;

            $elements.containerImage.innerHTML = '';
            $elements.containerImage.insertAdjacentHTML('beforeend', `
                <div class="div_x4CF3JB">
                    <img src="${ image }">
                    <button type="button"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            `);

        });

        bodyInputData[ element.name ] = parameters.data[ element.name ] || '';

        if( bodyInputData[ element.name ] != '' ) {
            element.dispatchEvent( new CustomEvent('input', { detail : { image : element.getAttribute('data-file-image') } }) );
        }
    });

    $elements.containerImage.addEventListener('click', e => {
        const button = e.target.closest('button');

        if( button ) {
            button.parentElement.remove();
            $elements.form.avatar.value       = bodyInputData.avatar = '';
            $elements.form.fileAvatar.value   = '';
            bodyFormData.set('avatar', '');
        }
    });

    $elements.form.fileAvatar.addEventListener('input', e => {
        const files = e.target.files;
        
        if( files.length ) {
            for (const file of files) {
                bodyFormData.set('avatar', file);
                $elements.form.avatar.dispatchEvent( new CustomEvent('input', { detail : { image : URL.createObjectURL(file) } }) );
            }
        }
        
    });

    $elements.form.addEventListener('submit', async ( e ) => {
        e.preventDefault();

        const beforeInnerHTML = e.submitter.innerHTML; 
        e.submitter.innerHTML = `<div class="element-loader" style="--pixel: 30px; margin: 0 40px"></div>`;

        const queries = {
            token : user.token
        };

        if(bodyFormData.get('avatar') != '') {

            const res = await fetch(link.storageApi(`/metro/avatar`), { method : 'POST', body : bodyFormData }).then( res => res.json() );

            const objName = res[0];

            if( objName.status ) bodyInputData.avatar = objName.name;

        }

        if( parameters.from == 'add' ) {

            fetch(link.api(`/usuario?${ def.paramQueries(queries) }`), { method : 'POST', body : JSON.stringify( bodyInputData ) })
                .then( res => res.json() )
                .then( res => {
                    e.submitter.innerHTML = beforeInnerHTML;
                    customEventElement('_submit', res);
                });
            
        }

        else if( parameters.from == 'edit' ) {
            queries.uid = params.id;
            fetch(link.api(`/usuario?${ def.paramQueries(queries) }`), { method : 'PATCH', body : JSON.stringify( bodyInputData ) })
                .then( res => res.json() )
                .then( res => {
                    e.submitter.innerHTML = beforeInnerHTML;
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var userFilter = ()=>{
    const $element = createNodeElement(`
        <div class="div_zKKi095">
            <div id="closeElement" class="div_N21q19I"></div>
            <form id="form" class="div_5a1Hnp2">
                <header class="header_fSv7i19">
                    <h3>Filtrar</h3>
                    <button id="btnCloseElement" type="button"><i class="fi fi-rr-cross"></i></button>
                </header>
                <div class="div_vBNJ8OL">
                    <div class="div_qPAIzJj">
                        <h4>Posicion</h4>
                        <div class="div_n3t50x6">
                            <label>
                                <input type="radio" name="categoria" value="" checked>
                                <span>Todos</span>
                            </label>
                            <label>
                                <input id="inputCategoria" type="radio" name="categoria" value="1">
                                <span id="textCategoria">Elegir</span>
                            </label>
                        </div>
                    </div>
                    <div class="div_qPAIzJj">
                        <h4>Genero</h4>
                        <div class="div_n3t50x6">
                            <label>
                                <input type="radio" name="marca" value="" checked>
                                <span>Todos</span>
                            </label>
                            <label>
                                <input id="inputMarca" type="radio" name="marca" value="1">
                                <span id="textMarca">Elegir</span>
                            </label>
                        </div>
                    </div>
                </div>
                <footer class="footer_5Fl2Cb4">
                    <button type="submit" class="focus"><span>Aceptar</span><i class="fi fi-rr-check"></i></button>
                </footer>
            </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    const elementCategoria = eleSelection({ from : 'position' });
    const elementMarca      = eleSelection({ from : 'gender' });

    elementCategoria.addEventListener('_change', e => {
        const data = e.detail.data;
        $elements.textCategoria.textContent = data.name;
        $elements.inputCategoria.value = data.id;
    });

    elementMarca.addEventListener('_change', e => {
        const data = e.detail.data;
        $elements.textMarca.textContent = data.name;
        $elements.inputMarca.value = data.id;
    });

    $elements.inputCategoria.addEventListener('click', ()=> {
        $element.append( elementCategoria );
    });

    $elements.inputMarca.addEventListener('click', ()=> {
        $element.append( elementMarca );
    });

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        $element.dispatchEvent(
            new CustomEvent('_submit', {
                detail : {
                    filter : {
                        col_7 : $elements.form.querySelector('input[name = marca]:checked').value,
                        col_8 : $elements.form.querySelector('input[name = categoria]:checked').value,
                    }
                }
            })
        );

        $element.remove();
    });

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
    
    return $element
};

var usuario = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 3 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Usuario</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnFilter" class="button_lvV6qZu"><i class="fi fi-rr-filter"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>

            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_P0XXYok"></div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form        : '',
        filter      : '',
    };

    let filter = {};

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });
     
    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form );
    });

    $elements.btnFilter.addEventListener('click', ()=> {
        $element.append( elements.filter );
    });
 
    const dataIsNull =()=>{
        render$elements.set({
            btnOpenForm    : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = userForm({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;
                if( detail.status ) {
                    dataRender(0);
                    dataLoad();
                }
            });
        }

        if( elements.filter == '' ) {
            elements.filter = userFilter();
            elements.filter.addEventListener('_submit', e => {
                filter = e.detail.filter;
                $elements.itemTrue.innerHTML = '';
                
                dataRender(0);
                dataLoad();
            });
        }
    };

    const dataIsFalse =()=>{

        render$elements.set({
            btnOpenForm    : crud.read && crud.create
        });

    }; 

    const dataIsTrue =( Data = [] )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            const position = Position.find( position => position.id == data.position ) ?? {}; 
            
            return `
                <a href="#/usuario/${ data.uid }" class="a_805ta40">
                    <img src="${ link.storage(`/metro/avatar/${ data.avatar || 'avatar.png' }`) }">
                    <div class="div_ng9b6oP">
                        <span>${ data.fullname } ${ data.lastname }</span>
                        <p>${ position.name ?? '' }</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));

        if( Data.length == 50 ) {
            observer.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }

    };

    const dataRender =( Data )=>{
        render$elements.set({
            itemNull    : Data === 0,
            itemFalse   : Array.isArray( Data ) && !Data.length,
            itemTrue    : Array.isArray( Data ) && Data.length
        });

        if( Data === 0 ) dataIsNull();
        else if( Array.isArray( Data ) && !Data.length ) dataIsFalse();
        else if( Array.isArray( Data ) && Data.length ) dataIsTrue( Data );
    };

    const dataLoad =()=>{

        const queries = {
            token : user.token,
            query : 1,
            query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
            ...filter,
            query_like : $elements.inputSeach.value.trim()
        };

        if( crud.read ) {
            fetch(link.api(`/usuario?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        } 
    };

    dataRender(0);
    dataLoad();

    return $element
};

var Permission = [
    { id : 1, name : 'Asistencia' },
    { id : 2, name : 'Inventario' },
    { id : 3, name : 'Usuario' }
];

var userPermission = ()=>{
 
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_j4U8Zyq">
            <form id="form" class="div_9ZnX3jJ">
                <input type="hidden" name="id" value="-1">
                <div class="div_BugEJN6">
                    <h3 id="title">Permisos</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div id="item" class="div_ZR9m39F">
                    <div id="itemNull" class="element-loader"></div>
                    <div id="itemFalse" class="div_b14S3dH">
                        <i class="fi fi-rr-exclamation"></i>
                        <h3>No hay permisos</h3>
                    </div>
                    <div id="itemTrue" class="div_aSwehqM"></div>
                </div>
                <div id="elementButton" class="div_B28Vf2f">
                    <button id="btnCancel" type="button" class="light">cancelar</button>
                    <button type="submit">
                        <span>Guardar</span>
                        <i class="fi fi-rr-check"></i>
                    </button>
                </div>
            </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const data = defineVal(0);
    data.observe( value => {

        const render = {
            itemNull    : value === 0,
            itemFalse   : value === null,
            itemTrue    : !!Object.keys( value ?? {} ).length
        };

        render$elements.set( render );

        $elements.form.id.value     = -1;

        if( render.itemTrue ) {
            $elements.form.id.value = value.id;
            Data.value              = JSON.parse( data.value.crud );
        } 
        
        else if( render.itemFalse  ) {      
            $elements.elementButton.remove();
        }

    });

    const Data = defineVal(0);
    Data.observe( value => {
        
        const render = {
            itemNull    : value === 0,
            itemFalse   : Array.isArray(value) && !value.length,
            itemTrue    : Array.isArray(value) && !!value.length
        };

        if( render.itemTrue ) {

            $elements.itemTrue.insertAdjacentHTML('beforeend', value.map( permision => {
                const name = Permission.find( permision2 => permision2.id == permision.id ).name;

                return `
                    <div class="div_686135l">
                        <h3>${ name }</h3>
                        <div class="div_EL5Q0Ic">
        
                            ${ Object.keys( permision.crud ).map( crud => {
                                return `
                                    <label class="label_sn6V0G6">
                                        <span>${ crud }</span>
                                        <input type="checkbox" data-name="${ name.toLocaleLowerCase() }" name="${ (`${ name }__${ crud }`).toLocaleLowerCase() }" ${ permision.crud[ crud ] ? 'checked' : '' }>
                                    </label>
                                `
                            } ).join('') }
        
                        </div>
                    </div>
                `
            }).join(''));

        }
    });

    const dataLoad =( from )=>{

        if( from === 0 ) {
            const queries = {
                token : user.token,
                query : 0,
                query_limit : 'one',
                col_1 : params.id
            };
    
            fetch( link.api(`/permission?${ def.paramQueries( queries ) }`) )
                .then( res => res.json() )
                .then( res => {
                    data.value = res;
                });
     
        }
        
    };

    dataLoad(0);

    $elements.btnCloseElement.addEventListener('click', ()=> {
        $element.remove();
    });

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        if( $elements.form.id.value == -1 ) {
            return
        }

        const Data = Array.from([ 'asistencia', 'inventario', 'usuario' ]).map( (name, index) => {

            const data = Array.from( $elements.form.querySelectorAll(`input[data-name=${name}]`) ).reduce( ( prev, curr ) => {

                prev[ curr.name.split('__')[1] ] = curr.checked; 
                return prev

            }, {});

            return { id : index + 1, crud : data }

        });

        const queries = {
            token : user.token,
            id : $elements.form.id.value
        };
        
        const data = {
            crud : Data
        };

        fetch( link.api(`/permission?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) } )
            .then( res => res.json() )
            .then( res => {

                if( res.status ) {
                    dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Guardado con exito', name : 'success' } }));
                    $element.remove();
                    return
                }

                dispatchEvent(new CustomEvent('_notification', { detail : { message : res.message ?? 'Ocurrio un error', name : 'danger' } }));  
                
            });

    });

    return $element
};

var userFormPassword = ()=>{
    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <div class="div_pUg2Yb9">
                <div class="div_kB20ofu">
                    <h3>Actualizar Contraseña</h3>
                    <button><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>contraseña</span>
                            <input type="password" value="123456">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button>Actualizar</button>
                </div>
           </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    new RenderObjectElement( $elements );


    $elements.closeElement.addEventListener('click', ()=> {
        $element.remove();
    });

    return $element
};

var usuarioId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 3 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/usuario" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="textTitle"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-exclamation"></i>
                    <h3>El usuario no existe</h3>
                </div>
                <div id="itemTrue" class="div_be7jj4e">
                    <div class="div_4Q78J05">
                        <div class="div_OeLSr4w">
                            <img data-render-img="avatar" class="img_9U2iiC0" src="">
                        </div>
                    </div>
                    <div class="div_XE6XvnP">
                        <h3>Informacion</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>nombre</span>
                                <p data-render-text="fullname">-</p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>apellido</span>
                                <p data-render-text="lastname">-</p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>posicion</span>
                                <p data-render-text-option="position"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>telefono</span>
                                <p data-render-text="phone"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>genero</span>
                                <p data-render-text-option="gender"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>fecha de nacimiento</span>
                                <p data-render-text="date_birthdate"></p>
                            </div>
                        </div>
                    </div>

                    <div class="div_XE6XvnP" style="display:none">
                        <h3>Otro</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>Asistencia</span>
                                <p>3 asistencia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options             : '',
        userPermission      : '',
        form            : '',
        formPassword    : '',
        confirm             : ''
    };

    const optionArray  = {
        position    : Position,
        gender      : Gender
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> {
        $element.append( elements.options );
    });

    const dataIsNull =()=>{

        render$elements.set({
            btnOpenOptions    : false
        });

    };

    const dataIsFalse =()=>{

        render$elements.set({
            btnOpenOptions    : false
        });
    };

    const dataIsTrue =( data = {} )=>{

        console.log();
        console.log();

        render$elements.set({
            btnOpenOptions    : (crud.read && ( crud.update || crud.delete ) && (invertSign(user.data.position) > invertSign(data.position)) || user.data.uid == data.uid)
        });

        const options = {
            edit            : crud.update || user.data.uid == data.uid,
            edit_password   : crud.update || user.data.uid == data.uid,
            permission      : user.data.position == 1 && user.data.uid != data.uid,
            delete          : crud.delete && user.data.uid != data.uid
        };
        
        $elements.textTitle.textContent = '759546002';

        if( elements.options == '' ) {
 
            elements.options = eleOption({ from : 'usuario', includes : Object.keys(options).filter( key => options[ key ] ) });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
        
                const Element = [
                    { element : elements.userPermission, action : 'permission' },
                    { element : elements.form, action : 'edit' },
                    { element : elements.formPassword, action : 'edit_password' },
                    { element : elements.confirm, action : 'delete' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.userPermission == '' ) {
            elements.userPermission = userPermission();
        }

        if( elements.form == '' && options.edit ) {
            elements.form = userForm({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;
                console.log(detail);
                if( detail.status ) {
                    dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Guardado con exito', name : 'success' } }));
                    dataLoad();
                } 
                else dispatchEvent(new CustomEvent('_notification', { detail : { message : detail.message ?? 'Ocurrio un error', name : 'danger' } })); 
            });
        }

        if( elements.formPassword == '' ) {
            elements.formPassword = userFormPassword();
        }

        if( elements.confirm == '' && options.delete ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : 'Estas seguro de eliminar' });
            elements.confirm.addEventListener('_click', e => {

                if( e.detail.status ) {
                    const queries = {
                        token : user.token,
                        id : params.id
                    };
                    
                    fetch(link.api(`/usuario?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ){ 
                                dispatchEvent(new CustomEvent('_notification', { detail : { message : 'Eliminado con exito', name : 'success' } }));
                                dataLoad();
                            } else {
                                dispatchEvent(new CustomEvent('_notification', { detail : { message : res.message ?? 'Ocurrio un error', name : 'danger' } })); 
                            }
                        });
                }
                
            });
        }

        $elements.itemTrue.querySelectorAll('[ data-render-text ]').forEach( element => {
            const name = element.getAttribute('data-render-text');
            element.textContent = data[ name ] || '-';
        });

        $elements.itemTrue.querySelectorAll('[ data-render-img ]').forEach( element => {
            const name  = element.getAttribute('data-render-img');
            element.src = link.storage(`/${ name }/${ data[ name ] || 'avatar.png' }`);
             
        });

        $elements.itemTrue.querySelectorAll('[ data-render-text-option ]').forEach( element => {
            const name          = element.getAttribute('data-render-text-option');
            const option        = optionArray[ name ].find( option => option.id == data[ name ] );
            element.textContent = option.name;
        });
        
    };

    const dataRender =( data = null )=>{

        render$elements.set({
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        });
        
        if( data === 0 ) dataIsNull();
        else if( data === null ) dataIsFalse();
        else if( Object.keys(data ?? {}).length ) dataIsTrue( data );
    
    };

    const dataLoad =()=>{

        if( crud.read ) {

            const queries = {
                token : user.token,
                query : 1,
                query_limit : 'one',
                col_0 : params.id
            };

            fetch(link.api(`/usuario?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );

        } else {
            dataRender(null);
        }
    };


    dataRender(0);
    dataLoad();
     
    return $element
};

var formAsistencia = ( parameters = {} )=>{ 
    
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <form id="form" class="div_pUg2Yb9" autocomplete="off">
                <div class="div_kB20ofu">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>nombre</span>
                            <input type="text" name="name" value="${ parameters.data.name ?? '' }">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button type="submit">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>
           </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
    
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            name : $elements.form.name.value.trim()
        };

        const queries = {
            token : user.token
        };

        if( parameters.from == 'add' ) {
            fetch(link.api(`/asistencia?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

        else if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/asistencia?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var asistencia = ()=>{

    const link      = window.dataApp.link;
    const def       = window.dataApp.def;
    const user      = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 1 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Asistencia</h3>
                </div>

                <div id="containerButton" class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ"></div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form : ''
    };

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form ); 
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });
    
    const dataIsNull =()=>{
        render$elements.set( {
            containerButton : crud.read,
            btnOpenForm     : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = formAsistencia({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;
                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataIsFalse =()=>{
        render$elements.set( {
            containerButton : crud.read,
            btnOpenForm    : crud.read && crud.create
        });
    };
    
    const dataIsTrue =( Data = [] )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <a href="#/asistencia/${ data.id }" class="div_q97S60f">
                    <div class="div_RbqUyx3">
                        <span>${ data.name }</span>
                        <p>${ rand(50) } miembros</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));

        if( Data.length > 49 ) {
            observer.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }
 
    };
    
    const dataRender =( Data = [] )=>{
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );
    };
    
    const dataLoad =()=>{

        const queries = {
            token : user.token,
            query : 0,
            query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
            query_like : $elements.inputSeach.value.trim()
        };
        
        if( crud.read ) {
            fetch(link.api(`/asistencia?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var Asistencia = [
    { id : 1, name : 'Ingreso' },
    { id : 2, name : 'Empezar descanso' },
    { id : 3, name : 'Terminar descanso' },
    { id : 4, name : 'Salida' },
];

var Month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

var Day = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
];

var asistenciaList = ( eleCalendar )=>{

    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_guZ6yID" style="padding:10px">
            <div id="itemNull" class="element-loader"></div>
            <div id="itemFalse" class="div_b14S3dH">
                <i class="fi fi-rr-search-alt"></i>
                <h3>Asistencias no registradas</h3>
            </div>
            <div id="itemTrue" class="div_s84kGk1"></div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    let datetime = Date.now();

    $elements.itemTrue.addEventListener('click', e => {
        const input = e.target.closest('input[type="checkbox"]');
        if( input ) {
            $elements.itemTrue.querySelectorAll(`[data-date = "${ input.dataset.value }"]`).forEach(element => {
                element.setAttribute( 'style', input.checked ? '' : 'display:none' );
            });
        }
    });

    eleCalendar.addEventListener('_change', e => {
        const Date_ = new Date( e.detail.datetime );
        Date_.setDate( Date_.getDate() + 1 );
        datetime = Date_.getTime();
        $elements.itemTrue.innerHTML = '';

        dataRender(0);
        dataLoad();
    });
    
    const dataIsTrue =( Data )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( (data, index) => {

            const Date_     = new Date( data.datetime );
            const Detail    = JSON.parse( data.detail );
            const data_user = JSON.parse( data.data_user );
            let datetimeText = true;

            if( index != 0 ) {
                datetimeText = Date_.toLocaleDateString() != new Date( Data[index - 1].datetime ).toLocaleDateString();
            }

            return `
                ${ datetimeText ? `
                    <div class="div_90p4604">
                        <div class="div_36WcfZ1">
                            <span>${ Date_.getDate() } ${ Day[Date_.getDay()] }</span>
                            <p>${Month[Date_.getMonth()]} ${ Date_.getFullYear() }</p>
                        </div>
                        <label class="label_cUVu24U">
                            <input type="checkbox" data-value="${ Date_.toLocaleDateString() }">
                            <i class="fi fi-rr-info"></i>
                        </label>
                    </div>
                ` : '' }
                <div class="div_BGg7MMk">
                    <a href="#/asistencia/${ params.id }/user/${ data_user.uid }" class="a_0RHoy9T">
                        <img src="${ link.storage(`/metro/avatar/${ data_user.avatar || 'avatar.png' }`) }">
                        <span>${ data_user.fullname } ${ data_user.lastname }</span>
                        <i class="fi fi-rr-angle-small-right"></i>
                    </a>
                    <div class="div_LSt8PG4" data-date="${ Date_.toLocaleDateString() }" style="display:none">
                        ${ Detail.map( detail => {

                            const Date_         = new Date( detail.datetime );
                            const asistencia    = Asistencia.find( asistencia => asistencia.id == detail.id ) ?? {};

                            return `
                                <div class="div_ZMoHz99">
                                    <div class="div_V05Yfgs">
                                        <span>${ asistencia.name ?? '' }</span>
                                        <p>${ Date_.toLocaleTimeString() }</p>
                                    </div>
                                </div>
                            `
                        }).join('') }
                    </div>
                </div>
            `

        }).join(''));

    };
    
    const dataRender =( Data = null )=>{

        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) ;
        else if( render.itemFalse ) ;
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );
    };
    
    const dataLoad =( load = 1 )=>{

        if( load == 1 ) {
            if( crud.read ) {
                
                const queries = {
                    token : user.token,
                    query : 1,
                    query_order : ['col_3', 1].join(','),
                    query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
                    col_1 : params.id,
                    col_3 : [ datetime, 2].join(','),
                };

                console.log(queries);

                fetch(link.api(`/asistencia/list?${ def.paramQueries( queries ) }`))
                    .then( res => res.json() )
                    .then( dataRender );
                
            } else {
                dataRender(null);
            }
        }

        
    };

    dataRender(0);
    dataLoad();

    return $element
};

var asistenciaId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/asistencia" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText" class="text-ellipsis"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenCalendar" class="button_lvV6qZu"><i class="fi fi-rr-calendar-day"></i></button>
                    <a id="btnGoUser" href="#/asistencia/${ params.id }/user" class="button_lvV6qZu"><i class="fi fi-rr-users"></i></a>
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>La asistencia no existe</h3>
                </div>
                <div id="itemTrue" class="div_s84kGk1"></div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : '',
        calendar: ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));
    $elements.btnOpenCalendar.addEventListener('click', ()=> $element.append( elements.calendar ));

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenCalendar : false,
            btnOpenOptions  : false,
            btnGoUser       : false
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenCalendar     : false,
            btnOpenOptions      : false,
            btnGoUser           : false
        });
    };
    
    const dataIsTrue =( data )=>{

        render$elements.set({
            btnOpenCalendar     : true,
            btnOpenOptions      : crud.read && ( crud.update || crud.delete ),
            btnGoUser           : true
        });
 
        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'asistencia', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿eliminar este inventario?' });
            elements.confirm.addEventListener('_click', e => {
                if( e.detail.status ) {
                    const queries = {
                        id : params.id
                    };
    
                    fetch(link.api(`/asistencia?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
            });
        }

        if( elements.calendar == '' ) {
            elements.calendar = eleCalendar({ title : 'Elegir fecha', value : null });
        }

        if( elements.form == '' ) {
            elements.form = formAsistencia({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }


        $elements.titleText.textContent = data.name;
        $elements.item.replaceWith( asistenciaList( elements.calendar ) );
    };
    
    const dataRender =( data = null )=>{
        console.log(data);
        const render = {
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        };
        
        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue  ) dataIsTrue( data );

        render$elements.set( render );
    };
    
    const dataLoad =( load = 1 )=>{

        if( load == 1 ) {
            if( crud.read ) {
                const queries = { 
                    token : user.token,
                    query : 0,
                    query_limit : 'one', 
                    col_0 : params.id 
                };
                fetch(link.api(`/asistencia?${ def.paramQueries( queries ) }`))
                    .then( res => res.json() ) 
                    .then( dataRender );
                
            } else {
                dataRender(null);
            }
        }
        
    };

    dataRender(0);
    dataLoad();
    
    return $element
};

var asistenciaAddRemoveUser = ( parameters = {} )=>{

    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;
 
    const $element = createNodeElement(`
        <div class="div_yE897km">
            <div id="closeElement" style="position:inherit;inset:inherit;"></div>
            <div class="div_60DTY7J">
                <header class="header_4N9Tavf">
                    <button class="button_PjPA89V"><i class="fi fi-rr-search"></i></button>
                    <input id="search" type="search" placeholder="buscar">
                </header>
                <div class="div_r523C8r scroll-y">
                    <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                    <div id="itemFalse" class="div_b14S3dH">
                        <i class="fi fi-rr-search-alt"></i>
                        <h3>Lista vacia</h3>
                    </div>
                    <div id="itemTrue" class="div_iyWPLy5"></div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    let elementItem = null;
    
    const customEventSubmit =  new CustomEvent('_submit');

    $element.addEventListener('_update', ()=> {
        dataLoad();
    });

    $elements.closeElement.addEventListener('click', ()=> {
        $element.remove();
    });
    
    $elements.itemTrue.addEventListener('click', e => {
        const item   = e.target.closest('.div_KuJlv3d');
        const button = e.target.closest('button');

        if( button ) {
            const action    = button.getAttribute('data-action');
            const itemData  = JSON.parse( item.getAttribute('data-data') );
            elementItem     = item;
            
            if( parameters.from == 'add' ) {
                if( action == 'add' ) {

                    const queries = {
                        token : user.token,
                    };

                    const body = {
                        id_asistencia : params.id_asistencia,
                        uid_user      : itemData.uid
                    };
                    
                    fetch( link.api(`/asistencia/user?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( body ) } )
                        .then( res => res.json() )
                        .then( res => {

                            if( res.status ) {
                                $element.dispatchEvent( customEventSubmit );
                                if( res.status ) elementItem.remove();
                                if(!$elements.itemTrue.children.length) {
                                    render$elements.set( {
                                        itemNull    : false,
                                        itemFalse   : true,
                                        itemTrue    : false
                                    } );
                                }
                            }

                        });
                }
            }

        }
    });

    $elements.search.addEventListener('input', ()=> {
        $elements.itemTrue.innerText = '';

        dataRender(0);
        dataLoad();
    });

    const dataIsTrue =( Data = [] )=>{
        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {

            const data_user = parameters.from == 'add' ? data : JSON.parse( data.data_user );

            return `
                <div class="div_KuJlv3d" data-id="${ parameters.from == 'add' ? '' : data.id }"  data-data="${ encodeText(JSON.stringify( data )).input() }">
                    <span>${ data_user.fullname } ${ data_user.lastname }</span>
                    <button data-action="add"><i class="fi fi-rr-user-add"></i></button>
                </div>
            `
        }).join(''));
    };

    const dataRender =( Data = [] )=>{
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length && !$elements.itemTrue.children.length,
            itemTrue    : Array.isArray(Data) && !!Data.length || !!$elements.itemTrue.children.length
        };

        if( render.itemNull ) ;
        else if( render.itemFalse ) ;
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );
    };

    const dataLoad =()=>{

        if( parameters.from == 'add' ) {
            const queries = {
                query : 2,
                query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
                search_name : $elements.search.value
            };

            fetch(link.api(`/asistencia/user?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        }

    };

    dataLoad();

    return $element

};

var asistenciaIdUser = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/asistencia/${ params.id_asistencia }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText" class="text-ellipsis"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnAdd" class="button_lvV6qZu"><i class="fi fi-rr-user-add"></i></button>
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div id="nav_list" class="div_DQISLNG">
                <button data-from="add" class="focus">Miembros</button>
                <button data-from="remove">Removidos</button>
            </div>
            <div id="item" class="div_guZ6yID" style="padding:10px;">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3 id="itemFalseText">La asistencia no existe</h3>
                </div>
                <div id="itemTrue" class="div_s84kGk1"></div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : '',
        calendar: '',
        add     : '',
        remove  : ''
    };

    let dataIndex = 1;
    let dataFrom  = 'add';
    let dataElement = null;

    const customEventUpdate =  new CustomEvent('_update');

    $elements.btnAdd.addEventListener('click', ()=> {
        if( elements.add != '' ) {
            elements.add.dispatchEvent( customEventUpdate );
            $element.append( elements.add );
        }
    });
    
    $elements.nav_list.addEventListener('click', e => {
        const button = e.target.closest('button');

        if( button ) {
            
            $elements.nav_list.querySelectorAll('.focus').forEach( element => element.classList.remove('focus'));
            button.classList.add('focus');

            dataFrom = button.getAttribute('data-from');
            $elements.itemTrue.innerHTML = '';

            dataRender(0);
            dataLoad(2);
        }
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.itemTrue.addEventListener('click', e => {
        const button = e.target.closest('button');

        if( button ) {
            const item   = e.target.closest('[data-item]');
            const action = button.getAttribute('data-action');
            
            const itemData = JSON.parse( item.getAttribute('data-data') );


            if( [ 'add', 'remove' ].includes( action ) ) {

                const queries = {
                    token : user.token,
                    id   : itemData.id
                };

                const body = {
                    status  : action == 'add' ? 1 : 0
                };
                
                fetch( link.api(`/asistencia/user?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( body ) } )
                    .then( res => res.json() )
                    .then( res => {
                        if( res.status ) {
                            item.remove();
                            if(!$elements.itemTrue.children.length) {
                                render$elements.set( {
                                    itemNull    : false,
                                    itemFalse   : true,
                                    itemTrue    : false
                                } );
                            }
                        }
                    });
            }

            else if( action == 'delete' ) {
                dataElement = item;
                $element.append( elements.confirm );
            }

        }
    });
    console.log($elements.inputSeach.value);
    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerText = '';

        dataRender();
        dataLoad(2);
    });

    const dataIsNull =()=>{
        render$elements.set({
            nav_list : false
        });
    };
    
    const dataIsFalse =()=>{
        if( dataIndex == 2 ) {
            render$elements.set({
                nav_list : true
            });
        }
    };
    
    const dataIsTrue =( data )=>{

        if( dataIndex == 2 ) {
            render$elements.set({
                nav_list : true
            });
        }
 
        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'asistencia_user', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿eliminar este miembro y todos sus registros?' });
            elements.confirm.addEventListener('_click', e => {
                if( e.detail.status ) {

                    const itemData = JSON.parse( dataElement.getAttribute('data-data') );
                    const queries = {
                        token   : user.token,
                        id      : itemData.id,
                        id_asistencia : itemData.id_asistencia,
                        uid_user : itemData.uid_user
                    };

                    fetch( link.api(`/asistencia/user?${ def.paramQueries( queries ) }`), { method : 'DELETE' } )
                        .then( res => res.json() )
                        .then( res => {

                            if( res.status ) dataElement.remove();
                            if(!$elements.itemTrue.children.length) {
                                render$elements.set( {
                                    itemNull    : false,
                                    itemFalse   : true,
                                    itemTrue    : false
                                } );
                            }
                        });

                }
            });
        }

        if( elements.form == '' ) {
            elements.form = formAsistencia({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad(2);
                }
            });
        }

        if( elements.add == '' ) {
            elements.add = asistenciaAddRemoveUser({ from : 'add' });
            elements.add.addEventListener('_submit', ()=> {
                if( dataFrom == 'add' ) dataLoad();
            });
        }

        if( dataIndex == 1 ) {
            $elements.titleText.textContent = data.name;
            dataLoad(2);
        }

        else if( dataIndex == 2 ) {
            $elements.itemTrue.insertAdjacentHTML('beforeend', data.map( data => {

                const data_user = JSON.parse( data.data_user );
                
                return `
                    <div class="div_eJaO7S4" data-data="${ encodeInput(JSON.stringify( data )) }" data-item 1>
                        <a href="#/asistencia/${ params.id_asistencia }/user/${ data_user.uid }" class="a_0RHoy9T">
                            <img src="${ link.storage(`/avatar/${ data_user.avatar || 'avatar.png' }`) }">
                            <span>${ data_user.fullname } ${ data_user.lastname }</span>
                            <i class="fi fi-rr-angle-small-right"></i>
                        </a>
                        <div class="div_otKLrye">
                            ${ dataFrom == 'add' ? '<button data-action="remove"><i class="fi fi-rr-user-slash"></i></button>' : '' }
                            ${ dataFrom == 'remove' ? `
                                <button data-action="delete"><i class="fi fi-rr-remove-user"></i></button>
                                <button data-action="add"><i class="fi fi-rr-user-add"></i></button>
                            ` : '' }
                        </div>
                    </div>
                `
    
            }).join(''));

        }

    };
    
    const dataRender =( data = null )=>{
        if( dataIndex == 1 ) {

            const render = {
                itemNull    : data === 0,
                itemFalse   : data === null,
                itemTrue    : Object.keys(data ?? {}).length
            };
            
            if( render.itemNull ) dataIsNull();
            else if( render.itemFalse ) dataIsFalse();
            else if( render.itemTrue  ) dataIsTrue( data );
            
            $elements.itemFalseText.textContent = 'La asistencia no existe';
            render$elements.set( render );

        }

        else if( dataIndex == 2 ) {

            const render = {
                itemNull    : data === 0,
                itemFalse   : Array.isArray(data) && !data.length,
                itemTrue    : Array.isArray(data) && data.length
            };

            if( render.itemNull ) dataIsNull();
            else if( render.itemFalse ) dataIsFalse();
            else if( render.itemTrue ) dataIsTrue( data );

            $elements.itemFalseText.textContent = 'No hay miembros';
            render$elements.set( render );

        }

    };
    
    const dataLoad =( load = 1 )=>{

        if( load == 1 ) {
            dataIndex = load;
            if( crud.read ) {
                const queries = { 
                    token : user.token,
                    query : 0,
                    query_limit : 'one',
                    col_0 : params.id_asistencia 
                };
                fetch(link.api(`/asistencia?${ def.paramQueries( queries ) }`))
                    .then( res => res.json() ) 
                    .then( dataRender );
                
            } else {
                dataRender(null);
            }
        }
        
        else if( load == 2 ) {
            dataIndex = load;
            if( crud.read ) {
                const queries = {
                    token : user.token,
                    query : 1,
                    query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
                    search_name : $elements.inputSeach.value,
                    col_1 : params.id_asistencia,
                    col_4 : null
                };

                queries.col_4 = dataFrom == 'add' ? 1 : queries.col_4;
                queries.col_4 = dataFrom == 'remove' ? 0 : queries.col_4;

                fetch(link.api(`/asistencia/user?${ def.paramQueries( queries ) }`))
                    .then( res => res.json() )
                    .then( dataRender );

            }

        }
    };

    dataRender(0);
    dataLoad();
    
    return $element
};

var asistenciaListUserId = ( eleCalendar )=>{

    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_guZ6yID" style="padding:10px">
            <div id="itemNull" class="element-loader"></div>
            <div id="itemFalse" class="div_b14S3dH">
                <i class="fi fi-rr-search-alt"></i>
                <h3>Asistencias no registradas</h3>
            </div>
            <div id="itemTrue" class="div_s84kGk1"></div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    let datetime = Date.now();

    $elements.itemTrue.addEventListener('click', e => {
        const input = e.target.closest('input[type="checkbox"]');
        if( input ) {
            $elements.itemTrue.querySelectorAll(`[data-date = "${ input.dataset.value }"]`).forEach(element => {
                element.setAttribute( 'style', input.checked ? '' : 'display:none' );
            });
        }
    });

    eleCalendar.addEventListener('_change', e => {
        const Date_ = new Date( e.detail.datetime );
        Date_.setDate( Date_.getDate() + 1 );
        datetime = Date_.getTime();
        $elements.itemTrue.innerHTML = '';

        dataRender(0);
        dataLoad();
    });
    
    const dataIsTrue =( Data )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( (data, index) => {
            
            const Date_         = new Date( data.datetime );
            const Detail        = JSON.parse( data.detail );
            const data_user     = JSON.parse( data.data_user );
            let datetimeText    = true;

            if( index != 0 ) {
                datetimeText = Date_.toLocaleDateString() != new Date( Data[index - 1].datetime ).toLocaleDateString();
            }

            return `
                ${ index == 0 ? `
                    <div class="div_q${ rand(60) }4r50">
                        <div class="div_28epYsq">
                            <img src="${ link.storage(`/metro/avatar/${ data_user.avatar || 'avatar.png' }`) }">
                            <span>${ data_user.fullname } ${ data_user.lastname }</span>
                        </div>
                    </div>
                ` : '' }
                ${ datetimeText ? `
                    <div class="div_90p4604">
                        <div class="div_36WcfZ1">
                            <span>${ Date_.getDate() } ${ Day[Date_.getDay()] }</span>
                            <p>${Month[Date_.getMonth()]} ${ Date_.getFullYear() }</p>
                        </div>
                    </div>
                ` : '' }
                <div class="div_LSt8PG4">
                    ${ Detail.map( detail => {
                        return `
                            <div class="div_ZMoHz99">
                                <div class="div_V05Yfgs">
                                    <span>Entrada</span>
                                    <p>12:${ rand(60) }pm</p>
                                </div>
                            </div>
                        `
                    } ).join('') }
                </div>
            `

        }).join(''));

    };
    
    const dataRender =( Data = null )=>{

        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) ;
        else if( render.itemFalse ) ;
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );
    };
    
    const dataLoad =( load = 1 )=>{

        if( load == 1 ) {
            if( crud.read ) {
                
                const queries = {
                    token : user.token,
                    query : 1,
                    query_order : ['col_3', 1].join(','),
                    query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
                    col_1 : params.id_asistencia,
                    col_2 : params.id,
                    col_3 : [ datetime, 2].join(','),
                };

                fetch(link.api(`/asistencia/list?${ def.paramQueries( queries ) }`))
                    .then( res => res.json() )
                    .then( dataRender );
                
            } else {
                dataRender(null);
            }
        }

    };

    dataRender(0);
    dataLoad();

    return $element
};

var asistenciaIdUserId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;
    
    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/asistencia/${ params.id_asistencia }/user" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText" class="text-ellipsis"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenCalendar" class="button_lvV6qZu"><i class="fi fi-rr-calendar-day"></i></button>
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Usuario no encontrado</h3>
                </div>
                <div id="itemTrue" class="div_s84kGk1"></div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : '',
        calendar: ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));
    $elements.btnOpenCalendar.addEventListener('click', ()=> $element.append( elements.calendar ));

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenCalendar : false,
            btnOpenOptions  : false,
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenCalendar : false,
            btnOpenOptions    : false,
        });
    };
    
    const dataIsTrue =( data )=>{

        render$elements.set({
            btnOpenCalendar     : true,
            btnOpenOptions      : true,
        });

        const data_asistencia = JSON.parse( data.data_asistencia );
 
        if( elements.options == '' ) {
            console.log(data.status);
            const options = {
                addUser : data.status == 0,
                deleteUser : data.status == 0,
                removeUser : data.status == 1
            };

            const includesOption = Object.keys( options ).filter( key => options[ key ] );

            elements.options = eleOption({ from : 'asistencia_user_id', includes : includesOption });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;

                const Element = [
                    { element : elements.confirm, action : 'deleteUser' },
                ];
        
                $element.append( (Element.find( element => element.action == action ) ?? {} ).element ?? '' );
                
                if( [ 'addUser', 'removeUser' ].includes( action ) ) {
                    const queries = {
                        token   : user.token,
                        id      : data.id
                    };

                    const body = {
                        status  : data.status == 0 ? 1 : 0
                    };
                   
                    fetch( link.api(`/asistencia/user?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( body ) } )
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) {
                                elements.options = '';
                                dataLoad();
                            }
                        });
                }

            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿eliminar este miembro y todos sus registros?' });
            elements.confirm.addEventListener('_click', e => {

                if( e.detail.status ) {
                    const queries = {
                        token   : user.token,
                        id      : data.id,
                        id_asistencia : data.id_asistencia,
                        uid_user : data.uid_user
                    };
                   
                    fetch( link.api(`/asistencia/user?${ def.paramQueries( queries ) }`), { method : 'DELETE' } )
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) {
                                dataLoad();
                            }
                        });
                }

            });
        }

        if( elements.calendar == '' ) {
            elements.calendar = eleCalendar({ title : 'Elegir fecha', value : null });
        }

        if( elements.form == '' ) {
            elements.form = formAsistencia({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
        
        $elements.titleText.textContent = data_asistencia.name;
        $elements.item.replaceWith( asistenciaListUserId( elements.calendar ) );
    };
    
    const dataRender =( data = null )=>{

        const render = {
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        };
        
        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue  ) dataIsTrue( data );

        render$elements.set( render );
    };
    
    const dataLoad =( load = 1 )=>{

        if( load == 1 ) {
            if( crud.read ) {
                const queries = { 
                    token : user.token,
                    query : 3,
                    query_limit : 'one', 
                    col_1 : params.id_asistencia, 
                    col_2 : params.id 
                };
                fetch(link.api(`/asistencia/user?${ def.paramQueries( queries ) }`))
                    .then( res => res.json() ) 
                    .then( dataRender );
                
            } else {
                dataRender(null);
            }
        }
        
    };

    dataRender(0);
    dataLoad();

    return $element
};

var productoForm = ( parameters = {} )=>{

    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_Kc9Bc16">
            <form id="form" class="div_z7l4R5v" autocomplete="off">

                <input type="hidden" name="image" data-input-file-image-text>

                <div class="div_sXC2jhS">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>

                <div class="div_sc7enus">
                    <div class="div_Mwjygq9">

                        <div class="div_5d0tX5z">

                            <label class="label_5uI64v4">
                                <input type="file" name="fileImage" accept="image/*" data-input-file-image>
                                <i class="fi fi-rr-plus"></i>
                            </label>

                            <div class="div_o26jdj1" id="containerImage"></div>

                        </div>

                        <label class="label_f5yYI3Y">
                            <span>url de imagen</span>
                            <input type="text" name="urlImage">
                       </label>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>sap</span>
                                <input type="text" name="sap" data-input-text>
                            </label>

                            <label class="label_f5yYI3Y">
                                <span>ean</span>
                                <input type="text" name="ean" data-input-text>
                            </label>
                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>categoria</span>
                                <input type="text" name="categoria" data-input-option readonly>
                            </label>

                            <label class="label_f5yYI3Y">
                                <span>marca</span>
                                <input type="text" name="marca" data-input-option readonly>
                            </label>
                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>seccion</span>
                                <input type="text" name="seccion" data-input-option readonly>
                            </label>

                            <label class="label_f5yYI3Y">
                                <span>departamento</span>
                                <input type="text" name="departamento" data-input-option readonly>
                            </label>
                        </div>

                        ${ ( params.id_inventario ?? '' ) == '' ? `
                            <div class="div_ekg8FP7">
                                <label class="label_f5yYI3Y">
                                    <span>inventario</span>
                                    <input type="text" name="inventario" data-input-option readonly>
                                </label>
                            </div>
                        ` : '' }

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>fecha de inicio</span>
                                <input type="text" name="datetime_start" data-input-date readonly>
                            </label>
                            <label class="label_f5yYI3Y">
                                <span>fecha de fin</span>
                                <input type="text" name="datetime_end" data-input-date readonly>
                            </label>
                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>precio</span>
                                <input type="text" name="price" data-input-text>
                            </label>
                            <label class="label_f5yYI3Y">
                                <span>stock</span>
                                <input type="text" name="stock" data-input-text>
                            </label>
                        </div>

                        <div class="div_ekg8FP7">
                            <label class="label_f5yYI3Y">
                                <span>descripcion</span>
                                <input type="text" name="description" data-input-text>
                            </label>
                        </div>

                       <label class="label_EyS0ZS4">
                            <span>habilitar</span>
                            <input type="checkbox" name="status" data-input-boolean>
                       </label>

                    </div>
                </div>

                <div class="div_jxd97Sb">
                    <button id="btnCancel" type="button" class="button_LN16pU5 light">Cancelar</button>
                    <button type="submit" class="button_LN16pU5">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>

            </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());

    const optionElement =  {
        categoria      : eleSelection({ from : 'categoria' }),
        marca          : eleSelection({ from : 'marca' }),
        seccion        : eleSelection({ from : 'seccion' }),
        departamento   : eleSelection({ from : 'departamento' }),
        inventario     : eleSelection({ from : 'inventario' }),
    };

    const dateElement   = {
        datetime_start      : eleCalendar({ title : 'Fecha de inicio', value : null }),
        datetime_end        : eleCalendar({ title : 'Fecha de fin', value : null }),
    };

    const bodyInputData = {
        id_inventario : params.id_inventario
    };

    const bodyFormData = new FormData();
    bodyFormData.append('image', '');

    $element.querySelectorAll('[data-input-text]').forEach( element => {
        element.value = parameters.data[ element.name ] ?? '';
        element.removeAttribute('data-input-text');
        element.addEventListener('input', () => bodyInputData[ element.name ] = element.value.trim());
        element.dispatchEvent( new CustomEvent('input') ); 
    });

    $element.querySelectorAll('[data-input-option]').forEach( element => {
        element.removeAttribute('data-input-option'); 
        const $option   = optionElement[ element.getAttribute('name') ] ?? document.createTextNode();

        $option.addEventListener('_change', e => {
            element.dispatchEvent( new CustomEvent('input', { detail : e.detail.data }) );
        });

        element.addEventListener('input', e => {
            if( e instanceof CustomEvent ) {
                const detail = e.detail ?? {};
                element.value = detail.name ?? '';
                bodyInputData[ 'id_' + element.name ] = detail.id ?? 0;
            }
        });

        element.addEventListener('focus', () => $element.append( $option ));
        element.dispatchEvent( new CustomEvent('input', { detail : parameters.data[ 'data_' + element.name ] }) );
    });

    $element.querySelectorAll('[data-input-date]').forEach( element => {
        element.removeAttribute('data-input-date'); 

        const $date   = dateElement[ element.getAttribute('name') ] ?? document.createTextNode();

        $date.addEventListener('_change', e => {
            element.dispatchEvent( new CustomEvent('input', { detail : e.detail.datetime }) );
        });

        element.addEventListener('input', e => {
            if( e instanceof CustomEvent ) {
                const detail                = new Date( e.detail );
                element.value               = detail.toLocaleDateString();
                bodyInputData[ element.name ]   = detail.getTime();
            }
        });

        element.addEventListener('focus', () => $element.append( $date ));
        element.dispatchEvent( new CustomEvent('input', { detail : parameters.data[ element.name ] }) );
    });
    
    $element.querySelectorAll('[data-input-boolean]').forEach( element => {
        element.removeAttribute('data-input-boolean');
        element.checked = !!parameters.data[ element.name ];
        element.addEventListener('input', ()=> bodyInputData[ element.name ] = element.checked ? 1 : 0);
        element.dispatchEvent( new CustomEvent('input') );
    });

    $element.querySelectorAll('[data-input-file-image-text]').forEach( element => {
        element.removeAttribute('data-input-file-image-text');
        element.setAttribute('data-file-image', link.storage(`/metro/producto/${ parameters.data[ element.name ] }`));
        
        element.addEventListener('input', e => {

            const image = e.detail.image;

            $elements.containerImage.innerHTML = '';
            $elements.containerImage.insertAdjacentHTML('beforeend', `
                <div class="div_x4CF3JB">
                    <img src="${ image }">
                    <button type="button"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            `);

        });

        bodyInputData[ element.name ] = parameters.data[ element.name ] || '';

        if( bodyInputData[ element.name ] != '' ) {
            element.dispatchEvent( new CustomEvent('input', { detail : { image : element.getAttribute('data-file-image') } }) );
        }
    });

    $elements.containerImage.addEventListener('click', e => {
        const button = e.target.closest('button');

        if( button ) {
            button.parentElement.remove();
            $elements.form.image.value      = bodyInputData.image = '';
            $elements.form.fileImage.value  = '';
            bodyFormData.set('image', '');
        }
    });

    $elements.form.fileImage.addEventListener('input', e => {
        const files = e.target.files;

        if( files.length ) {
            for (const file of files) {
                bodyFormData.set('image', file);
                $elements.form.image.dispatchEvent( new CustomEvent('input', { detail : { image : URL.createObjectURL(file) } }) );
            }
        }

    });
    
    $elements.form.urlImage.addEventListener('input', (e) => {
        if( URL.canParse ) {
            if( URL.canParse( $elements.form.urlImage.value ) ) {
                
                bodyFormData.set('image', '');

                fetch( $elements.form.urlImage.value )
                    .then( res => res.blob() )
                    .then( blob => {
                        if( blob.type.includes('image') ) {
                            bodyFormData.set('image', blob, `${ Date.now() }.${ blob.type.replace('image/', '') }`);
                            $elements.form.image.dispatchEvent( new CustomEvent('input', { detail : { image : $elements.form.urlImage.value } }) );
                        }
                    })
                    .catch( err => console.log(err) );
            }
        }
    });

    $elements.form.urlImage.addEventListener('paste', e => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image')) {
                const blob = item.getAsFile();
                bodyFormData.set('image', blob);
                $elements.form.image.dispatchEvent( new CustomEvent('input', { detail : { image : URL.createObjectURL(blob) } }) );
            }
        }
    });

    $elements.form.addEventListener('submit', async ( e ) => {
        e.preventDefault();

        const beforeInnerHTML = e.submitter.innerHTML; 
        e.submitter.innerHTML = `<div class="element-loader" style="--pixel: 30px; margin: 0 40px"></div>`;

        const queries = {
            token : user.token
        };

        if(bodyFormData.get('image') != '') {

            const res = await fetch(link.storageApi(`/metro/producto`), { method : 'POST', body : bodyFormData }).then( res => res.json() );
            
            const objName = res[0];

            if( objName.status ) bodyInputData.image = objName.name;

        }
         
        if( parameters.from == 'add' ) {

            fetch(link.api(`/producto?${ def.paramQueries(queries) }`), { method : 'POST', body : JSON.stringify( bodyInputData ) })
                .then( res => res.json() )
                .then( res => {
                    e.submitter.innerHTML = beforeInnerHTML;
                    customEventElement('_submit', res);
                });
            
        }

        else if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/producto?${ def.paramQueries(queries) }`), { method : 'PATCH', body : JSON.stringify( bodyInputData ) })
                .then( res => res.json() )
                .then( res => {
                    e.submitter.innerHTML = beforeInnerHTML;
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var productoFilter = ()=>{
    const $element = createNodeElement(`
        <div class="div_zKKi095">
            <div id="closeElement" class="div_N21q19I"></div>
            <form id="form" class="div_5a1Hnp2">
                <header class="header_fSv7i19">
                    <h3>Filtrar</h3>
                    <button id="btnCloseElement" type="button"><i class="fi fi-rr-cross"></i></button>
                </header>
                <div class="div_vBNJ8OL">
                    <div class="div_qPAIzJj">
                        <h4>Categoria</h4>
                        <div class="div_n3t50x6">
                            <label>
                                <input type="radio" name="categoria" value="" checked>
                                <span>Todos</span>
                            </label>
                            <label>
                                <input id="inputCategoria" type="radio" name="categoria" value="">
                                <span id="textCategoria">Elegir</span>
                            </label>
                        </div>
                    </div>
                    <div class="div_qPAIzJj">
                        <h4>Marca</h4>
                        <div class="div_n3t50x6">
                            <label>
                                <input type="radio" name="marca" value="" checked>
                                <span>Todos</span>
                            </label>
                            <label>
                                <input id="inputMarca" type="radio" name="marca" value="">
                                <span id="textMarca">Elegir</span>
                            </label>
                        </div>
                    </div>
                    <div class="div_qPAIzJj">
                        <h4>Seccion</h4>
                        <div class="div_n3t50x6">
                            <label>
                                <input type="radio" name="seccion" value="" checked>
                                <span>Todos</span>
                            </label>
                            <label>
                                <input id="inputSeccion" type="radio" name="seccion" value="">
                                <span id="textSeccion">Elegir</span>
                            </label>
                        </div>
                    </div>
                    <div class="div_qPAIzJj">
                        <h4>Departamento</h4>
                        <div class="div_n3t50x6">
                            <label>
                                <input type="radio" name="departamento" value="" checked>
                                <span>Todos</span>
                            </label>
                            <label>
                                <input id="inputDepartamento" type="radio" name="departamento" value="">
                                <span id="textDepartamento">Elegir</span>
                            </label>
                        </div>
                    </div>
                </div>
                <footer class="footer_5Fl2Cb4">
                    <button type="submit" class="focus"><span>Aceptar</span><i class="fi fi-rr-check"></i></button>
                </footer>
            </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    const elementCategoria      = eleSelection({ from : 'categoria' });
    const elementMarca          = eleSelection({ from : 'marca' });
    const elementSeccion        = eleSelection({ from : 'seccion' });
    const elementDepartamento   = eleSelection({ from : 'departamento' });

    elementCategoria.addEventListener('_change', e => {
        const data = e.detail.data;
        $elements.textCategoria.textContent = data.name;
        $elements.inputCategoria.value = data.id;
    });

    elementMarca.addEventListener('_change', e => {
        const data = e.detail.data;
        $elements.textMarca.textContent = data.name;
        $elements.inputMarca.value = data.id;
    });

    elementSeccion.addEventListener('_change', e => {
        const data  = e.detail.data;
        $elements.textSeccion.textContent = data.name;
        $elements.inputSeccion.value = data.id;
    });

    elementDepartamento.addEventListener('_change', e => {
        const data  = e.detail.data;
        $elements.textDepartamento.textContent = data.name;
        $elements.inputDepartamento.value = data.id;
    });

    $elements.inputCategoria.addEventListener('click', ()=> {
        $element.append( elementCategoria );
    });

    $elements.inputMarca.addEventListener('click', ()=> {
        $element.append( elementMarca );
    });

    $elements.inputSeccion.addEventListener('click', ()=> {
        $element.append( elementSeccion );
    });

    $elements.inputDepartamento.addEventListener('click', ()=> {
        $element.append( elementDepartamento );
    });

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        $element.dispatchEvent(
            new CustomEvent('_submit', {
                detail : {
                    filter : {
                        col_2 : $elements.form.querySelector('input[name = categoria]:checked').value,
                        col_3 : $elements.form.querySelector('input[name = marca]:checked').value,
                        col_4 : $elements.form.querySelector('input[name = seccion]:checked').value,
                        col_5 : $elements.form.querySelector('input[name = departamento]:checked').value,
                    }
                }
            })
        );

        $element.remove();
    });

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
    
    return $element
};

var producto = ()=>{

    const link          = window.dataApp.link;
    const def           = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const icon          = window.dataApp.icon;

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>productos</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnFilter" class="button_lvV6qZu"><i class="fi fi-rr-filter"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu">${ icon.get('fi fi-rr-angle-small-left') }</button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ"></div>

            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form    : '',
        filter  : ''
    };

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    let filter = {};

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form );
    });

    $elements.btnFilter.addEventListener('click', ()=> {
        $element.append( elements.filter );
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });

    const dataIsNull =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = productoForm({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }

        if( elements.filter == '' ) {
            elements.filter = productoFilter();
            elements.filter.addEventListener('_submit', e => {
                filter = e.detail.filter;
                $elements.itemTrue.innerHTML = '';
                
                dataRender(0);
                dataLoad();
            });
        }
    };
    
    const dataIsFalse =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });
    };
    
    const dataIsTrue =( Data = [] )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <a href="#/inventario/${ params.id_inventario }/producto/${ data.id }" class="div_q97S60f">
                    ${ data.image != '' ? `<img src="${ link.storage(`/metro/producto/${ data.image }`) }">` : '' }
                    <div class="div_RbqUyx3">
                        <span class="text-ellipsis">${ data.description }</span>
                        <p>${ data.stock ?? 0 } stock</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));

        const child = $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ];

        if( child && Data.length >= 50 ) {
            observer.observe(child);
        }

    };
    
    const dataRender =( Data = [] )=>{

        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length && !$elements.itemTrue.children.length ,
            itemTrue    : Array.isArray(Data) && Data.length || (!Data.length && $elements.itemTrue.children.length)
        };

        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );

    };
    
    const dataLoad =()=>{
        if( crud.read ) {
            const queries = {
                query : 1,
                query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
                col_1 : params.id_inventario,
                ...filter,
                query_like : $elements.inputSeach.value.trim()
            };

            fetch(link.api(`/producto?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var productoId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};
 
    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }/producto" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="textTitle"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-exclamation"></i>
                    <h3>El Producto no existe</h3>
                </div>
                <div id="itemTrue" class="div_be7jj4e">
                    <div id="containerImage" class="div_4Q78J05">
                        <div class="div_OeLSr4w">
                            <img data-render-img="image" class="img_9U2iiC0 producto" src="">
                        </div>
                    </div>
                    <div class="div_XE6XvnP">
                        <h3>Informacion</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>sap</span>
                                <p data-render-text="sap">-</p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>ean</span>
                                <p data-render-text="ean">-</p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>descripcion</span>
                                <p data-render-text="description">-</p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>precio</span>
                                <p data-render-text="price"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>stock</span>
                                <p data-render-text="stock"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>inventario</span>
                                <p data-render-text="data_inventario"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>categoria</span>
                                <p data-render-text="data_categoria"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>marca</span>
                                <p data-render-text="data_marca"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>seccion</span>
                                <p data-render-text="data_seccion"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>departamento</span>
                                <p data-render-text="data_departamento"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>fecha de inicio</span>
                                <p data-render-text="datetime_start"></p>
                            </div>
                            <div class="div_2BgrORg">
                                <span>fecha de fin</span>
                                <p data-render-text="datetime_end"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options     : '',
        form        : '',
        confirm     : ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> {
        $element.append( elements.options );
    });

    const dataIsNull =()=>{

        render$elements.set({
            btnOpenOptions    : false
        });

    };

    const dataIsFalse =()=>{

        render$elements.set({
            btnOpenOptions    : false
        });
    };

    const dataIsTrue =( data = {} )=>{
        
        render$elements.set({
            btnOpenOptions    : crud.read && ( crud.update || crud.delete )
        });

        data.data_inventario    = JSON.parse( data.data_inventario );
        data.data_categoria     = JSON.parse( data.data_categoria );
        data.data_marca         = JSON.parse( data.data_marca );
        data.data_seccion       = JSON.parse( data.data_seccion );
        data.data_departamento  = JSON.parse( data.data_departamento );
        
        $elements.textTitle.textContent   = data.sap;

        if( elements.options == '' ) {

            const options_includes = [];

            if( crud.update ) options_includes.push(...['edit']);
            if( crud.delete ) options_includes.push(...['delete']);

            elements.options = eleOption({ from : 'producto', includes : options_includes });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
        
                const Element = [
                    { element : elements.form, action : 'edit' },
                    { element : elements.confirm, action : 'delete' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.form == '' ) {
            elements.form = productoForm({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;
                if( detail.status ) dataLoad();
            });
        }
 
        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿Estas este Producto?' });
            elements.confirm.addEventListener('_click', e => {

                if( e.detail.status ) {
                    const queries = {
                        token   : user.token,
                        id      : params.id
                    };
    
                    fetch(link.api(`/producto?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
                
            });
        }
        $elements.itemTrue.querySelectorAll('[ data-render-text ]').forEach( element => {
            const name = element.getAttribute('data-render-text');

            if(['datetime_start', 'datetime_end'].includes( name )) {
                const date = new Date( data[ name ] );
                element.textContent = date.toLocaleDateString();
            }

            else if(['data_inventario', 'data_categoria', 'data_marca', 'data_seccion', 'data_departamento'].includes( name )) {
                element.textContent = data[ name ].name ?? '-';
            }

            else {
                element.textContent = data[ name ] ?? '-';
            }

        });

        $elements.itemTrue.querySelectorAll('[ data-render-img ]').forEach( element => {
            const name  = element.getAttribute('data-render-img');
            element.src = link.storage(`/metro/producto/${ data[ name ] || 'image.webp' }`);
            $elements.containerImage.setAttribute('style', data[ name ] == '' ? 'display:none' : '');
        });
        
    };

    const dataRender =( data = null )=>{
        const render = {
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        };
        
        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue  ) dataIsTrue( data );

        render$elements.set( render );
    };

    const dataLoad =()=>{

        if( crud.read ) {
            const queries = {
                query : 2,
                query_limit : 'one',
                col_0 : params.id,
            };

            fetch(link.api(`/producto?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender(null);
        }
    };


    dataRender(0);
    dataLoad();
     
    return $element
};

var formCategoria = ( parameters = {} )=>{ 
    
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;
  
    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <form id="form" class="div_pUg2Yb9" autocomplete="off">
                <div class="div_kB20ofu">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>nombre</span>
                            <input type="text" name="name" value="${ parameters.data.name ?? '' }">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button type="submit">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>
           </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
   

    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            id_inventario : params.id_inventario,
            name : $elements.form.name.value.trim()
        };

        const queries = {
            token : user.token
        };

        if( parameters.from == 'add' ) {
            fetch(link.api(`/categoria?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

        if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/categoria?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var categoria = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Categoria</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ"></div>

            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form : ''
    };

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form ); 
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });

    const dataIsNull =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = formCategoria({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    //$elements.itemTrue.innerHTML = ''
                    dataLoad();
                }
            });
        }
    };
    
    const dataIsFalse =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });
    };
    
    const dataIsTrue =( Data )=>{
        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <a href="#/inventario/${ params.id_inventario }/categoria/${ data.id }" class="div_q97S60f">
                    <div class="div_RbqUyx3">
                        <span>${ data.name }</span>
                        <p>${ data.total_producto ?? 0 } productos</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));

        if( Data.length > 49 ) {
            observer.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }

    };
    
    const dataRender =( Data = [] )=>{
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );

    };
    
    const dataLoad =()=>{

        const queries = {
            token : user.token,
            query : 1,
            query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
            col_1 : params.id_inventario,
            query_like : $elements.inputSeach.value.trim()
        };

        if( crud.read ) {
            fetch(link.api(`/categoria?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        }

    };

    dataRender(0);
    dataLoad();

    return $element
};

var categoriaId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;
 
    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }/categoria" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Categoria no encontrada</h3>
                </div>
                <div id="itemTrue" class="div_be7jj4e">
                    <div class="div_XE6XvnP">
                        <h3>Informacion</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>nombre</span>
                                <p id="nameText">Licores</p>
                            </div>
                        </div>
                    </div>

                    <div class="div_XE6XvnP">
                        <h3>Otro</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>productos</span>
                                <p id="totalProducto">30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });

        $elements.titleText.textContent =  '';
    };
    
    const dataIsTrue =( data )=>{
        render$elements.set({
            btnOpenOptions    : crud.read && ( crud.update || crud.delete )
        });

        $elements.nameText.textContent = $elements.titleText.textContent =  data.name;
        $elements.totalProducto.textContent = data.total_producto;

        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'categoria', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿Eliminar esta categoria?' });
            elements.confirm.addEventListener('_click', e => {

                if( e.detail.status ) {
                    const queries = {
                        token : user.token,
                        id : params.id
                    };
    
                    fetch(link.api(`/categoria?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
                
            });
        }

        if( elements.form == '' ) {
            elements.form = formCategoria({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataRender =( data = null )=>{
        render$elements.set({
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        });
        
        if( data === 0 ) dataIsNull();
        else if( data === null ) dataIsFalse();
        else if( Object.keys(data ?? {}).length ) dataIsTrue( data );
    };
    
    const dataLoad =()=>{

        const queries = {
            query : 1,
            query_limit : 'one',
            col_0 : params.id
        };

        if( crud.read ) {
            fetch(link.api(`/categoria?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender(null);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var formMarca = ( parameters = {} )=>{ 
     
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <form id="form" class="div_pUg2Yb9" autocomplete="off">
                <div class="div_kB20ofu">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>nombre</span>
                            <input type="text" name="name" value="${ parameters.data.name ?? '' }">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button type="submit">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>
           </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
   
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            id_inventario : params.id_inventario,
            name : $elements.form.name.value.trim()
        };

        const queries = {
            token : user.token
        };

        if( parameters.from == 'add' ) {
            fetch(link.api(`/marca?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

        if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/marca?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var marca = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params    = window.dataLib.params;
    const user      = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Marca</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ"></div>

            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form : ''
    };

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form ); 
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });

    const dataIsNull =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = formMarca({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataIsFalse =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });
    };
    
    const dataIsTrue =( Data )=>{
        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <a href="#/inventario/${ params.id_inventario }/marca/${ data.id }" class="div_q97S60f">
                    <div class="div_RbqUyx3">
                        <span>${ data.name }</span>
                        <p>${ data.total_producto ?? 0 } productos</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));
 
        if( Data.length > 49 ) {
            observer.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }

    };
    
    const dataRender =( Data = [] )=>{
        console.log(Data);
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );
        
    };
    
    const dataLoad =()=>{
        const queries = {
            token : user.token,
            query : 1,
            query_limit : [ $elements.itemTrue.children.length, 50 ].join(','),
            col_1 : params.id_inventario,
            query_like : $elements.inputSeach.value.trim()
        };

        console.log(queries);

        if( crud.read ) {
            fetch(link.api(`/marca?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var marcaId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }/marca" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Marca no encontrada</h3>
                </div>
                <div id="itemTrue" class="div_be7jj4e">
                    <div class="div_XE6XvnP">
                        <h3>Informacion</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>nombre</span>
                                <p id="nameText">Licores</p>
                            </div>
                        </div>
                    </div>

                    <div class="div_XE6XvnP">
                        <h3>Otro</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>productos</span>
                                <p id="totalProducto">30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });

        $elements.titleText.textContent =  '';
    };
    
    const dataIsTrue =( data )=>{

        render$elements.set({
            btnOpenOptions    : crud.read && ( crud.update || crud.delete )
        });

        $elements.nameText.textContent = $elements.titleText.textContent =  data.name;
        $elements.totalProducto.textContent = data.total_producto;
        
        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'categoria', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;

                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿eliminar esta categoria?' });
            elements.confirm.addEventListener('_click', e => {
                if( e.detail.status ) {
                    const queries = {
                        token : user.token,
                        id : params.id
                    };
    
                    fetch(link.api(`/marca?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
            });
        }

        if( elements.form == '' ) {
            elements.form = formMarca({ from : 'edit', data : data });
        }
    };
    
    const dataRender =( data = null )=>{
        render$elements.set({
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        });
        
        if( data === 0 ) dataIsNull();
        else if( data === null ) dataIsFalse();
        else if( Object.keys(data ?? {}).length ) dataIsTrue( data );
    };
    
    const dataLoad =()=>{

        const queries = {
            token : user.token,
            query : 1,
            query_limit : 'one',
            col_0 : params.id
        };

        if( crud.read ) {
            fetch(link.api(`/marca?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender(null);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var formSeccion = ( parameters = {} )=>{ 
 
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <form id="form" class="div_pUg2Yb9" autocomplete="off">
                <div class="div_kB20ofu">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>nombre</span>
                            <input type="text" name="name" value="${ parameters.data.name ?? '' }">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button type="submit">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>
           </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
    
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            id_inventario : params.id_inventario,
            name : $elements.form.name.value.trim()
        };

        const queries = {
            token : user.token
        };

        if( parameters.from == 'add' ) {
            fetch(link.api(`/seccion?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

        if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/seccion?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var seccion = ()=>{
    
    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Seccion</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ"></div>

            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form : ''
    };

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form ); 
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataLoad();
    });

    const dataIsNull =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = formSeccion({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataIsFalse =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });
    };
    
    const dataIsTrue =( Data )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <a href="#/inventario/${ params.id_inventario }/seccion/${ data.id }" class="div_q97S60f">
                    <div class="div_RbqUyx3">
                        <span>${ data.name }</span>
                        <p>${ data.total_producto ?? 0 } productos</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));

        if( Data.length > 49 ) {
            observer.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }
    };
    
    const dataRender =( Data = [] )=>{
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );

    };
    
    const dataLoad =()=>{

        const queries = {
            query : 1,
            query_limit : 'all',
            col_1 : params.id_inventario,
            query_like : $elements.inputSeach.value.trim()
        };

        if( crud.read ) {
            fetch(link.api(`/seccion?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        }

    };

    dataRender(0);
    dataLoad();

    return $element
};

var seccionId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;

    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }/seccion" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Seccion no encontrada</h3>
                </div>
                <div id="itemTrue" class="div_be7jj4e">
                    <div class="div_XE6XvnP">
                        <h3>Informacion</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>nombre</span>
                                <p id="nameText">Licores</p>
                            </div>
                        </div>
                    </div>

                    <div class="div_XE6XvnP">
                        <h3>Otro</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>productos</span>
                                <p id="totalProducto">30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });

        $elements.titleText.textContent =  '';
    };
    
    const dataIsTrue =( data )=>{
        render$elements.set({
            btnOpenOptions    : crud.read && ( crud.update || crud.delete )
        });

        $elements.nameText.textContent = $elements.titleText.textContent =  data.name;
        $elements.totalProducto.textContent = data.total_producto;

        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'categoria', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿Eliminar esta seccion?' });
            elements.confirm.addEventListener('_click', e => {

                if( e.detail.status ) {
                    const queries = {
                        id : params.id
                    };
    
                    fetch(link.api(`/seccion?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
                
            });
        }

        if( elements.form == '' ) {
            elements.form = formSeccion({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataRender =( data = null )=>{
        render$elements.set({
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        });
        
        if( data === 0 ) dataIsNull();
        else if( data === null ) dataIsFalse();
        else if( Object.keys(data ?? {}).length ) dataIsTrue( data );
    };
    
    const dataLoad =()=>{

        const queries = {
            query : 1,
            query_limit : 'one',
            col_0 : params.id
        };

        if( crud.read ) {
            fetch(link.api(`/seccion?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender(null);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var formDepartamento = ( parameters = {} )=>{ 
    
    const params    = window.dataLib.params;
    const user      = window.dataApp.user;
    const link      = window.dataApp.link;
    const def       = window.dataApp.def;

    const $element = createNodeElement(`
        <div class="div_EVs4DJ6">
           <div id="closeElement" class="div_v7jb1Bq"></div>
           <form id="form" class="div_pUg2Yb9" autocomplete="off">
                <div class="div_kB20ofu">
                    <h3>${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</h3>
                    <button type="button" id="btnCloseElement"><i class="fi fi-rr-cross"></i></button>
                </div>
                <div class="div_TqkD9hv">
                    <div class="div_qE1GtQ0">
                        <label class="label_QU7RI1w">
                            <span>nombre</span>
                            <input type="text" name="name" value="${ parameters.data.name ?? '' }">
                        </label>
                    </div>
                </div>
                <div class="div_uiURyl4">
                    <button type="submit">${ parameters.from == 'add' ? 'Agregar' : 'Actualizar' }</button>
                </div>
           </form>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    //const render$elements   = new RenderObjectElement( $elements )

    $elements.closeElement.addEventListener('click', ()=> $element.remove());
    $elements.btnCloseElement.addEventListener('click', ()=> $element.remove());
   
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            id_inventario : params.id_inventario,
            name : $elements.form.name.value.trim()
        };

        const queries = {
            token : user.token
        };

        if( parameters.from == 'add' ) {
            fetch(link.api(`/departamento?${ def.paramQueries( queries ) }`), { method : 'POST', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

        if( parameters.from == 'edit' ) {
            queries.id = params.id;
            fetch(link.api(`/departamento?${ def.paramQueries( queries ) }`), { method : 'PATCH', body : JSON.stringify( data ) })
                .then( res => res.json() )
                .then( res => {
                    customEventElement('_submit', res);
                });
        }

    });

    const customEventElement =( event, detail = {} )=>{
        $element.remove();
        $element.dispatchEvent(
            new CustomEvent( event, {
                detail
            })
        );
    };

    return $element
};

var departamento = ()=>{
    
    const link  = window.dataApp.link;
    const def   = window.dataApp.def;
 
    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3>Departamento</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnSearch" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <button id="btnOpenForm" class="button_lvV6qZu"><i class="fi fi-rr-plus"></i></button>
                </div>

                <div id="elementSearch" class="div_2Knxv43" style="display:none">
                    <button id="btnSearchClose" class="button_lvV6qZu"><i class="fi fi-rr-search"></i></button>
                    <input id="inputSeach" type="search" placeholder="buscar">
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_73RJBuZ"></div>

            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        form : ''
    };

    const observer = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0.5,  });

    $elements.btnOpenForm.addEventListener('click', ()=> {
        $element.append( elements.form ); 
    });

    $elements.btnSearch.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', '');
        $elements.inputSeach.focus();
    });

    $elements.btnSearchClose.addEventListener('click', ()=> {
        $elements.elementSearch.setAttribute('style', 'display:none');
    });

    $elements.inputSeach.addEventListener('input', ()=> {
        $elements.itemTrue.innerHTML = '';
        dataRender(0);
        dataLoad();
    });

    const dataIsNull =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });

        if( elements.form == '' ) {
            elements.form = formDepartamento({ from : 'add', data : {} });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataIsFalse =()=>{
        render$elements.set( {
            btnOpenForm    : crud.read && crud.create
        });
    };
    
    const dataIsTrue =( Data )=>{

        $elements.itemTrue.insertAdjacentHTML('beforeend', Data.map( data => {
            return `
                <a href="#/inventario/${ params.id_inventario }/departamento/${ data.id }" class="div_q97S60f">
                    <div class="div_RbqUyx3">
                        <span>${ data.name }</span>
                        <p>${ data.total_producto ?? 0 } productos</p>
                    </div>
                    <i class="fi fi-rr-angle-small-right"></i>
                </a>
            `
        }).join(''));

        if( Data.length > 49 ) {
            observer.observe( $elements.itemTrue.children[ $elements.itemTrue.children.length - 1 ] );
        }
 
    };
    
    const dataRender =( Data = [] )=>{
        const render = {
            itemNull    : Data === 0,
            itemFalse   : Array.isArray(Data) && !Data.length,
            itemTrue    : Array.isArray(Data) && Data.length
        };

        if( render.itemNull ) dataIsNull();
        else if( render.itemFalse ) dataIsFalse();
        else if( render.itemTrue ) dataIsTrue( Data );

        render$elements.set( render );

    };
    
    const dataLoad =()=>{

        const queries = {
            query : 1,
            query_limit : 'all',
            col_1 : params.id_inventario,
            query_like : $elements.inputSeach.value.trim()
        };

        if( crud.read ) {
            fetch(link.api(`/departamento?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender([]);
        }

    };

    dataRender(0);
    dataLoad();

    return $element
};

var departamentoId = ()=>{

    const link  = window.dataApp.link;
    const def   = window.dataApp.def;
 
    const params        = window.dataLib.params;
    const user          = window.dataApp.user;

    const permission    = user.permission.find( permission => permission.id == 2 ) ?? {};
    const crud          = permission.crud ?? {};

    const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/inventario/${ params.id_inventario }/departamento" class="button_lvV6qZu"><i class="fi fi-rr-angle-small-left"></i></a>
                    <h3 id="titleText"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="btnOpenOptions" class="button_lvV6qZu"><i class="fi fi-rr-menu-dots-vertical"></i></button>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    <i class="fi fi-rr-search-alt"></i>
                    <h3>Departamento no encontrado</h3>
                </div>
                <div id="itemTrue" class="div_be7jj4e">
                    <div class="div_XE6XvnP">
                        <h3>Informacion</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>nombre</span>
                                <p id="nameText">Licores</p>
                            </div>
                        </div>
                    </div>

                    <div class="div_XE6XvnP">
                        <h3>Otro</h3>
                        <div class="div_uRiOF5v">
                            <div class="div_2BgrORg">
                                <span>productos</span>
                                <p id="totalProducto">30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const render$elements   = new RenderObjectElement( $elements );

    const elements = {
        options : '',
        confirm : '',
        form    : ''
    };

    $elements.btnOpenOptions.addEventListener('click', ()=> $element.append( elements.options ));

    const dataIsNull =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });
    };
    
    const dataIsFalse =()=>{
        render$elements.set({
            btnOpenOptions    : false
        });

        $elements.titleText.textContent =  '';
    };
    
    const dataIsTrue =( data )=>{
        render$elements.set({
            btnOpenOptions    : crud.read && ( crud.update || crud.delete )
        });

        $elements.nameText.textContent = $elements.titleText.textContent =  data.name;
        $elements.totalProducto.textContent = data.total_producto;

        if( elements.options == '' ) {
            elements.options = eleOption({ from : 'categoria', includes : ['*'] });
            elements.options.addEventListener('_click', e => {
                const action = e.detail.action;
                const Element = [
                    { element : elements.confirm, action : 'delete' },
                    { element : elements.form, action : 'edit' }
                ];
        
                $element.append( Element.find( element => element.action == action ).element ?? '' );
            });
        }

        if( elements.confirm == '' ) {
            elements.confirm = eleConfirm({ title : 'Eliminar', message : '¿Eliminar este departamento?' });
            elements.confirm.addEventListener('_click', e => {

                if( e.detail.status ) {
                    const queries = {
                        id : params.id
                    };
    
                    fetch(link.api(`/departamento?${ def.paramQueries( queries ) }`), { method : 'DELETE' })
                        .then( res => res.json() )
                        .then( res => {
                            if( res.status ) dataLoad();
                        });
                }
                
            });
        }

        if( elements.form == '' ) {
            elements.form = formDepartamento({ from : 'edit', data : data });
            elements.form.addEventListener('_submit', e => {
                const detail = e.detail;

                if( detail.status ) {
                    dataLoad();
                }
            });
        }
    };
    
    const dataRender =( data = null )=>{
        render$elements.set({
            itemNull    : data === 0,
            itemFalse   : data === null,
            itemTrue    : Object.keys(data ?? {}).length
        });
        
        if( data === 0 ) dataIsNull();
        else if( data === null ) dataIsFalse();
        else if( Object.keys(data ?? {}).length ) dataIsTrue( data );
    };
    
    const dataLoad =()=>{

        const queries = {
            query : 1,
            query_limit : 'one',
            col_0 : params.id
        };

        if( crud.read ) {
            fetch(link.api(`/departamento?${ def.paramQueries( queries ) }`))
                .then( res => res.json() )
                .then( dataRender );
        } else {
            dataRender(null);
        }
    };

    dataRender(0);
    dataLoad();

    return $element
};

var routes = ()=>{
    
    const $element  = createNodeElement(`<div class="content-page"></div>`);
    const Route     = new RenderRouteHash();

    Route.param('/', () => routesPrivate(inicio));
    Route.param('/login', () => routesPublic(login));
    Route.param('/register', () => routesPublic(register));
    Route.param('/recover-password', () => routesPublic(recoverPassword));
    Route.param('/update-password/:token', () => routesPublic(updatePassword));
    Route.param('/inventario', () => routesPrivate( inventario ));
    Route.param('/inventario/:id', () => routesPrivate( inventarioId ));
    Route.param('/inventario/:id_inventario/producto', () => routesPrivate(producto));
    Route.param('/inventario/:id_inventario/producto/:id', () => routesPrivate(productoId));
    Route.param('/inventario/:id_inventario/categoria', () => routesPrivate(categoria));
    Route.param('/inventario/:id_inventario/categoria/:id', () => routesPrivate(categoriaId));
    Route.param('/inventario/:id_inventario/marca', () => routesPrivate(marca));
    Route.param('/inventario/:id_inventario/marca/:id', () => routesPrivate(marcaId));
    Route.param('/inventario/:id_inventario/seccion', () => routesPrivate(seccion));
    Route.param('/inventario/:id_inventario/seccion/:id', () => routesPrivate(seccionId));
    Route.param('/inventario/:id_inventario/departamento', () => routesPrivate(departamento));
    Route.param('/inventario/:id_inventario/departamento/:id', () => routesPrivate(departamentoId));
    Route.param('/usuario', () => routesPrivate( usuario ));
    Route.param('/usuario/:id', () => routesPrivate( usuarioId ));
    Route.param('/asistencia', () => routesPrivate(asistencia));
    Route.param('/asistencia/:id', () => routesPrivate(asistenciaId));
    Route.param('/asistencia/:id_asistencia/user', () => routesPrivate(asistenciaIdUser));
    Route.param('/asistencia/:id_asistencia/user/:id', () => routesPrivate(asistenciaIdUserId));

    addEventListener('hashchange', () => {
        $element.innerHTML = '';
        $element.append( Route.render() );
    });

    dispatchEvent(new CustomEvent('hashchange'));

    return $element

};

var eleAlert = ()=>{

    const $element = createNodeElement(`
        <div class="div_4To3WRE"></div>
    `);

    const Color = [
        { color : '#82C9AC', name : 'success' },
        { color : '#E79B9B', name : 'danger' },
        { color : '#AEC8E8', name : 'info' },
        { color : '#F7D08A', name : 'warning' },
        { color : '#343A40', name : 'dark' }
    ];

    addEventListener('_notification', e => {
        const detail    = e.detail;
        const color     = (Color.find( color => color.name == detail.name ) ?? {} ).color ?? '#343A40';
        const duration  = detail.duration ?? 2000;
        const remove    = detail.remove ?? true;

        $element.insertAdjacentHTML('afterbegin', `
            <div class="div_d3zFZTz" style="background: ${ color }; --time-bar:${ duration / 1000 }s" data-item>
                <div class="div_mUJ1ZKX8wrXPI7B">
                    <span>${ detail.message }</span>
                    <button><i class="fi fi-rr-cross-small"></i></button>
                </div>
                ${ remove ? '<hr>' : '' }
            </div>
        `);

        const element = $element.children[0];
        if( remove ) setTimeout(()=> element.remove(), duration);
    });

    $element.addEventListener('click', e => {
        if( e.target.closest('button') ) e.target.closest('[ data-item ]').remove();
    });

    $element.append(createNodeElement(`
        <style>
            .div_4To3WRE {
                position: fixed;
                inset: 0;
                bottom: initial;
                height: 0;
                z-index: 9999;
            
                padding: 10px;
                gap: 5px;
            
                display: grid;
                justify-items: center;
            
                pointer-events: none;
            }
            
            .div_d3zFZTz {
                --time-bar : 3s;
                position: relative;
            
                background: #82c9ac;
                color: #ffffff;
            
                width: min(100%, 425px);
                height: 60px;

                border-radius: 15px;
            
                display: grid;
                
                pointer-events: initial;
            
                animation: up_notification 0.3s ease-in-out;
                overflow: hidden;

                & hr {
                    background: rgb(0 0 0 / .3);
                    border:none;
                    animation: bar_notification var(--time-bar) linear;
                    border-radius: 3px;
                    width: 0;
                    height: 3px;

                    position: absolute;
                    left : 0;
                    bottom : 0;
                }
            }

            .div_mUJ1ZKX8wrXPI7B{
                display: grid;
                grid-template-columns: 1fr 60px;

                & span {
                    word-break: break-word;
                    margin : auto 20px;
                }

                & button {
                    background: none;
                    width: 60px;
                    height: 60px;
                    color: inherit;
                }
            }
            
            @keyframes up_notification {
                0% {
                    top: -500px;
                    height: 0;
                }
                100% {
                    height: 60px;
                    top: 0;
                }
            }

            @keyframes bar_notification {
                0% {
                    width: 100%;
                }
                100% {
                    width: 0;
                }
            }
        </style>
    `));

    return $element
};

var app = ()=>{

    window.dataApp = {
        auth     : 'auth_x43ipYa',
        link     : {
            api         : ( path = '' ) => 'https://api-metro.victor01sp.com/api' + path,
            storage     : ( path = '' ) => 'https://api-storage.victor01sp.com/storage' + path,
            storageApi  : ( path = '' ) => 'https://api-storage.victor01sp.com/api' + path
        },
        user    : {},
        icon    : new IconSVG(),
        def     : {
            paramQueries : ( query = {} ) => Object.keys( query ).map( key => `${ key }=${ query[key] }`).join('&')
        }
    };

    return replaceNodeChildren(
        createNodeElement(`
            <template>
                <br data-node-replace="navigate">
                <div class="container">
                    <br data-node-replace="header">
                    <br data-node-replace="routes">
                </div>
                <br data-node-replace="notification">
            </template>
        `)
        ,
        {   
            navigate        : navigate(),
            header          : header(),
            routes          : routes(),
            notification    : eleAlert()
        }
    )

};


// console.log("algo".split('').map(l => l.repeat(20)).join(''));

theme();

addEventListener('DOMContentLoaded', ()=> {
    
    document.getElementById('app').append(app());
});

addEventListener('contextmenu', e => {

    if( !e.target.closest('input, textarea') ) e.preventDefault();
    
});

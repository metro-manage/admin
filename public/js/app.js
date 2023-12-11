import style from "./setting/style.js"
import header from "./components/header.js"
import main from "./components/main.js"


const app =()=>{

    //http://192.168.1.9/servidor-4/licores-manage/
    //https://api-metro.victor01sp.com
    ss('api').data('https://api-metro.victor01sp.com').set()

    style()

    document.getElementById('root').append( header(), main())
    addEventListener('contextmenu', e => e.preventDefault()) 

    // console.log(___config___.api);
}


export default app
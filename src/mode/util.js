
import menu from '../../config/game';

const Util =
{
  
    setStorage(data){
      for(let item in data){
        localStorage[item] = data[item];
      }
    },
    
    getStorage(key){
      return localStorage[key] ? localStorage[key] : "";
    },
    checkHttp(url){
      return  url.indexOf('http') === 0 ;
    },
    
    loadComponents(path){
      // try {
        return () => import('@/components' + path);
      // }catch (e) {
      //   return  {template:'<div>错误的加载页面</div>' }
      // }
    },
    generateRouteComponents(){
      let addrs = [] ;
      for (let item of menu){
        for (let subAddr  of item.subMeun ){
          addrs.push(subAddr.addr);
        }
      }
      let result = [];
      for(let addr of addrs){
        result.push({path:addr,component:this.loadComponents('/route'+addr)})
      }
      return result;
    }
  
    
    
    
};
// console.log(Util.generateRoute());
export default Util;

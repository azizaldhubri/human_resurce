import Cookie from 'cookie-universal' ;
import { Outlet } from 'react-router-dom';

export default function RequirBack(){
      const cookie=Cookie()                      
    const token=cookie.get('h-resurce')
    return token ? window.history.back():<Outlet/>
 
}


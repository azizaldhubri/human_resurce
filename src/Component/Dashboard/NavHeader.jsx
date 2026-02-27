 import { Link } from 'react-router-dom';
 
import imgdata from './../../Assets/img/data-oic.png';
export default function NavHeader(props){
  return (
     
      <div className="w-100 bg-page   " >
        <div className='border d-flex align-items-center justify-content-start fs-5  pe-4 rounded mb-3'
        style={{height:'65px  ',background:'#d3d9db'}}>           
          <img  width='40px' src={imgdata}></img>
          <Link to='/dashboard' className='me-2 text-black' >الرئيسية </Link>
          {props.nav.map((item,index)=>
          <Link key={index} to={item.link } className='me-2 ' 
          style={{ pointerEvents: item.link ==='#' ? 'none' : 'auto', color: item.link ==='#' ? 'gray' : 'black' }}
          >  / {item.name}</Link>
          )}
          
          
        </div>             
    </div>
     
  );

};
 

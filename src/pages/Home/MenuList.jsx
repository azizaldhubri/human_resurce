import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo3 from '../../img/logo3.png';
export default function MenuList(props){

       const[open,setOpen]=useState(false) ;
           const[open2,setOpen2]=useState(false) ;

               const phoneNumber = '966538047805';  
     const message = 'مرحباً! كيف يمكنني مساعدتك؟';  
     const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return(       
         <div className="  d-flex  align-items-start  menulist  flex-column" style={{height:'60vh', }}>

            <div className='  d-flex  align-items-center justify-content-between   p-2  parent'
            style={{borderBottom:'2px solid black'}}>
             <button onClick={props.openMenue}>X</button>
            <img src={logo3} style={{width:'60px',height:'60px',borderRadius:'100%'}} alt='logo'></img>
            </div>
            <div className='w-100 p-2   fs-4 text-end mb-3'style={{borderBottom:'2px solid black'  }}>
                  {/* <Link to='#' className=' '>الصفحة الرئيسية</Link> */}
                    <button   onClick={props.onHeroSectionClick}>الصفحة الرئيسية </button>

            </div>
             
            <div className='w-100 '>
                <ul className=' m-0   p-0 pe-3   gap-2 fs-5  d-flex     flex-column gap-3'
                style={{listStyle:'none', cursor:'pointer'}}>                            
                     <li   
                     style={{position:'relative',zIndex:'1'}}                             
                              onClick={()=>setOpen2(true)}
                             onMouseLeave={()=>setOpen2(false)}>
                        <Link   to='#'  >معلومات عنا </Link> 
                        { open2===true &&                                     
                            <div style={{ position:'absolute' ,left:'1',right:'0',background:'rgb(200 221 212)' }}>
                                <ul className="ps-1 pt-2 pb-2  m-0 rounded d-flex align-items-start justify-content-between 
                                 flex-column  gap-3  " >
                                    <li  className=""
                                    
                                    ><Link  className=" link"  to='#'> معلومات عنا</Link> </li>
                                    <li className=""><Link className=" link"  to='#'> لماذا برنامج تسهيل</Link></li>
                                    <li className="" 
                                    onClick={props.ontestimonialsClick}
                                    // onClick={(e)=>props.refTo('screenshotsRef')}
                                    >
                                    {/* // <Link className=" link"  to='#'> اراء العملاء</Link> */}
                                    اراء العملاء
                                    </li>
                                </ul>                                                              
                            </div>                     
                            }                   
                      </li>
                      <li   
                       style={{position:'relative',zIndex:'0' }}                             
                              onClick={()=>setOpen(true)}
                               onMouseLeave={()=>setOpen(false)}>
                            <Link   to='#' className="    ">المزايا</Link> 
                            { open===true &&                                     
                                <div 
                                        style={{ position:'absolute' ,left:'1',right:'0',height:'fitcontent',background:'rgb(200 221 212)' }}>
                                               <ul className="ps-1 pt-2 pb-2  m-0 rounded d-flex align-items-start justify-content-between 
                                                flex-column  gap-3 " 
                                      style={{    whiteSpace: 'normal',
                                        
                                        // overflow:'auto'
                                       }}>
                                              <li > <Link  className=" link"  to='#'  > الحضور والانصراف</Link> </li>
                                              <li   onClick={props.onScreenshotsSectionClick}>الرواتب </li>                                            
                                              <li><Link  className=" link" to='#'>الاجازات</Link></li>
                                              <li><Link  className=" link" to='#'> ادارة المهام</Link></li> 
                                    </ul>                                                              
                                </div>                     
                              }                   
                          </li> 
                    <li>
                          <Link to={waLink} target="_blank" rel="noopener noreferrer">تواصل معنا</Link>  
                        </li>
                    <li 
                       onClick={(e)=>{   e.stopPropagation();  
                              props.setIsModalOpen(perv=>!perv)  
                   }}
                    >تسجيل الدخول</li>
                    <li></li>
                </ul>


            </div>
            <div></div> 
        </div>

        
    )
}
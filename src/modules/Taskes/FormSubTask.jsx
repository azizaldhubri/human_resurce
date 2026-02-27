import { useEffect, useState } from "react"; 
import {   faCalendarCheck, faClock, faReplyAll, } from "@fortawesome/free-solid-svg-icons" 
import { Dropdown, DropdownButton } from "react-bootstrap"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faPrint } from "@fortawesome/free-solid-svg-icons"; 
import './Modal.css'
import './StyleUl.css'
import SubTask from "./SubTask";  
import Comment from "./Comment";  

const FormSubTask = ({ item ,index ,alltask ,selectedTask_activ,updatedTask}) =>{  

    const [openSubTask, setOpenSubTask] = useState(false); 
    const[selectedTask_number,setSelectedTask_number]=useState(index);
    const [ taskUpdate, setTaskUpdate] = useState(0);  
   
 function handleValuetaskUpdate (value) {
        setTaskUpdate(value); 
        setOpenSubTask(false) ;
        updatedTask(value);        
    };
 

useEffect(()=>{setSelectedTask_number(index); selectedTask_activ(alltask[index].id)},[index])

function handleNext_task(e){  
    setSelectedTask_number(perv=>perv+1);
     selectedTask_activ(alltask[e+1].id)
   
}
function handlePrevious_task(e){ 
    setSelectedTask_number(perv=>perv-1);
     selectedTask_activ(alltask[e-1].id)
}
  
 const [hoveredItem, setHoveredItem] = useState(null)   
        
    return (

     <div className="   h-100 border postion-relative bg-white  m-1  w-100  " 
             style={{                
                left:'0',
                top:'70px',             
                height:'100vh',
                overflow:'scroll',                        
            }}
            onClick={(e)=>{   e.stopPropagation(); // منع الحدث من الوصول للأب
                   }}
            >
          
        {item && 
        <>   
         {alltask.map((items,ind)=>( 
        <div key={ind}   className="w-100    ">          
        { selectedTask_number === ind &&   (                
            <>             
                <div className="p-0  d-flex   align-items-center   justify-content-between flex-wrap " >   
                        <ul  className="m-0 p-0 d-flex  justify-content-end  "
                        // style={{listStyleType:'none',position:"relative",border:'2px solid black' ,borderRadius:'7px'}}   >
                        style={{
                            // listStyleType:'none',
                            // width:'100px' ,
                            // minWidth:'150px'        ,
                                        
                            }}     >
                            <li className="style_li hover-box m-0  p-1   "
                                onMouseEnter={()=> setHoveredItem('اعادة توجية')   }
                                onMouseLeave={()=>setHoveredItem(null) }
                                onClick={()=>setOpenSubTask((perv)=>!perv)}
                                style={{position:"relative", borderStartStartRadius:'8px',
                                borderEndStartRadius:'8px',}}>                                                                                
                                <FontAwesomeIcon icon={faReplyAll} />
                                {hoveredItem ==='اعادة توجية'&& 
                                    <p className="styleOverLi"
                                    //  style={{width:'70px'}}
                                        >{hoveredItem}</p> }
                                </li>
                            <li className="style_li hover-box p-1"                                                
                            onMouseEnter={()=> setHoveredItem('فتح او اغلاق الكل')   }
                            onMouseLeave={()=>setHoveredItem(null)    }
                            style={{position:"relative"}}
                            >
                            <FontAwesomeIcon icon={faReplyAll} />
                            {hoveredItem==='فتح او اغلاق الكل' &&
                            <p className=" styleOverLi" 
                            // style={{width:'115px'}}
                            >{hoveredItem}</p> }
                            </li>
                            
                            <li className="style_li hover-box p-1" 
                                onMouseEnter={()=> setHoveredItem('طباعة المهمة مع النماذج')   }
                                onMouseLeave={()=>setHoveredItem(null)    }
                                style={{position:"relative"}}>

                                <FontAwesomeIcon icon={faPrint} />
                                {hoveredItem ==='طباعة المهمة مع النماذج'&& 
                                <p className="styleOverLi" 
                                // style={{width:'145px'}}
                                >{hoveredItem}</p>    }
                                </li>
                            <li className="style_li hover-box p-1" 
                            onMouseEnter={()=> setHoveredItem('طباعة المهمة مع الردود') }
                            onMouseLeave={()=>setHoveredItem(null)    }
                            style={{position:"relative"}}
                            >
                            <FontAwesomeIcon icon={faPrint} />
                                {hoveredItem ==='طباعة المهمة مع الردود'&& 
                                <p className="styleOverLi"
                                //  style={{width:'150px'}}
                                    >{hoveredItem}</p>    }
                            </li>
                            <li className="style_li hover-box p-1"                                                 
                                onMouseEnter={()=> setHoveredItem('اقفال/فتح المهمة')   }
                                onMouseLeave={()=>setHoveredItem(null)    }
                                style={{position:"relative"}}>

                            <FontAwesomeIcon icon={faCalendarCheck} />                                              
                            {hoveredItem =='اقفال/فتح المهمة' &&
                            <p className="styleOverLi" 
                            // style={{width:'110px'}}
                            >{hoveredItem}</p>
                            } 
                            </li>
                            <li className="style_li hover-box  p-1 "
                                onMouseEnter={()=> setHoveredItem('تمديد الوقت')   }
                                onMouseLeave={()=>setHoveredItem(null)    }
                                style={{position:"relative" ,  
                                borderLeft:'1px solid gray',                                                 
                                borderEndEndRadius:'8px',
                                borderStartEndRadius:'8px',                                                    
                                }} >

                            <FontAwesomeIcon icon={faClock} />
                            {hoveredItem == 'تمديد الوقت' &&
                            <p className="styleOverLi" 
                            // style={{width:'85px'}}
                            >{hoveredItem}</p>} 
                            </li>
                        </ul>
                        <div className=" col-8 col-md-5 col-lg-5 col-sm-5 order-1  
                            bg-light d-flex align-items-center  justify-content-between ">
                                <ul className="d-flex rounded fs-6 m-0   p-0">
                            <li className="style_li hover-box"
                            onMouseEnter={()=> setHoveredItem('<')   }
                            onMouseLeave={()=>setHoveredItem(null) } 
                            style={{borderStartStartRadius:'8px',
                                borderEndStartRadius:'8px',
                                position:"relative",
                                pointerEvents: selectedTask_number+1===alltask.length ? "none" : "auto",
                                opacity: selectedTask_number+1===alltask.length  ? 0.5 : 1, 
                                }} 
                                
                                onClick={()=>{handleNext_task(ind)}}
                            //    onClick={()=> console.log(activeLink+1)}
                            >{`<`}
                            {hoveredItem ==='<'&&  
                            <p className="styleOverLi"
                            //  style={{width:'50px'}}
                                >التالي</p> }
                            </li>
                            
                            <li className="style_li hover-box" 
                                onMouseEnter={()=> setHoveredItem('>')   }
                                onMouseLeave={()=>setHoveredItem(null) }                                          
                                style={{position:"relative",
                                borderLeft:'1px solid gray',                                                 
                                borderEndEndRadius:'8px',
                                borderStartEndRadius:'8px',  
                                pointerEvents: item.id===0 ? "none" : "auto",
                                opacity: item.id===0 ? 0.5 : 1,   
                                
                                pointerEvents: selectedTask_number===0 ? "none" : "auto",
                                opacity: selectedTask_number===0  ? 0.5 : 1, 
                                }}
                                
                                onClick={()=>{handlePrevious_task(ind)}}
                                >{`>`}
                                {hoveredItem ==='>'&&  
                            <p className="styleOverLi" style={{width:'50px'}}>السابق</p> }
                            </li>
                                </ul>                          
                                <DropdownButton  className=" custom-dropdown-button border rounded m-0 p-0 me-1 " 
                                        // id='dropdown-basic-button '
                                        variant="#F778A1"
                                        align="start"                                                                                            
                                        title={'المزيد'+' ' }>
                            <Dropdown.Item  >الغاء مقروء</Dropdown.Item>
                            <Dropdown.Item  >تمييز كمهمة</Dropdown.Item>
                            <Dropdown.Item   onClick={()=>setOpenSubTask((perv)=>!perv)} >  اعادة توجية</Dropdown.Item>
                            
                            <Dropdown.Item  > اقفال المممة </Dropdown.Item>
                            <Dropdown.Item  > Save PDF </Dropdown.Item>                                  
                            
                                </DropdownButton>                                
                        
                        </div>        
                </div>
                <div className="w-100 d-flex gap-2 fs-5  text-center flex-column  mt-2 ">
                                <p className="m-0">  {items.id}   </p>                                 
                                <p className="m-0">  {items.description}   </p>
                </div>
                {openSubTask ==true && 
                    <div className="w-100 " >                                                 
                        {<SubTask 
                            id={items.id}
                            taskUpdate={taskUpdate}  
                            setUpdateTask={handleValuetaskUpdate} 
                        />}
                    </div>                            
                    } 
                <Comment   key={item.id} comment={items} type='Main' />   
                {items.chiledtask.map((it,n)=>                                           
                 <Comment key={n}  comment={it} /> )}
            </> 

        )}           
        </div>
        ))
           } 
              </> 
              
              } 
            </div>
            )
}

export default FormSubTask ;
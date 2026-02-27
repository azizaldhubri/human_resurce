import {  useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faPrint } from "@fortawesome/free-solid-svg-icons";
import AddTaskes from "./AddTask";
import './Modal.css'
import './StyleUl.css'  
import TaskTabs from "./TaskTabs";
import FormSubTask from "./FormSubTask";
import { useContext } from "react";
import { WindowSize } from "../../Component/Context/WindowContext";
import NavHeader from "../../Component/Dashboard/NavHeader";
 

export default function Taskes(){ 
    const size=useContext(WindowSize)
     const windowsize=size.windowSize ; 
  const[index,setIndex]=useState(''); 
  const[tasks,setTasks]=useState([])
  const[selectedTask_activ1,setSelectedTask_activ1]=useState('')
  

  const [selectedTask, setSelectedTask] = useState(null);  
    const [openForm, setOpenForm] = useState(false);    
    const [ taskUpdate, setTaskUpdate] = useState(0);  

 

function handelgetalltask(e){    
    setTasks(e)
}
    
    // --------- دالة لاغلاق model عند كتابة المهام الفرعيه
    function handleValuetaskUpdate (value) {
      console.log(value)
        setTaskUpdate(value);  
        setOpenForm(false)  ;// لاغلاق الفورم عندر ارسال رد على مهمه من model   
        setIsModalOpen(false) ;// لاغلاق الفورم عندر ارسال مهمه من model   
    };

    //---------------------------
    // const [selectedOption, setSelectedOption] = useState('');  
    // const handleSelectChange = (e) => {
    //   setSelectedOption(e.target.value);            
    // }      

       //-------------------------------------------------------------------modal------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دالة لفتح المودال
  const openModal = () => setIsModalOpen(true);

  // دالة لإغلاق المودال
  const closeModal = () => setIsModalOpen(false);

  function Modal({ onClose }) {
    return (
        <div className="modal-overlayut "          
            // style={{overflowY:'a',height:'100vh'}}           
            // style={{overflowY:'scroll',}}          
           >
            <div style={{overflowY:'auto', height:'100vh',width:'600px'}}>
                <div className="modal-content1 bg-page  "style={{}} 
                onClick={(e)=>{  e.stopPropagation();}}>
                <div  className='w-100 d-flex    flex-column gap-3 '   >
                
                    {/* {AddTaskes()} */}
                    <AddTaskes  
                    taskUpdate={taskUpdate}  
                    setUpdateTask={handleValuetaskUpdate}
                    addTask_from_model='true' />
                    {/* <button className='back_btn rounded'onClick={onClose}>رجوع</button>     */}

                </div>
                
                </div>
            </div>
        </div>
    );
}
//==================================task 
const[userId,setUserId]=useState('');  
        useEffect(()=>{
            Axios.get(`${USER}`)
            .then(res=>{
                setUserId(res.data.id);  })
        },[]) 
        
         const links=[
                    {name:'المهام',
                     link:'#'},    
                  ]
                   
          
return (
        <div className="w-100 bg-page px-3 py-2 h-100  " 
         onClick={()=>{ setOpenForm(false);  setIsModalOpen(false) }} 
         >
         <NavHeader nav={links}  />
            
            <div className="w-100 d-flex align-items-center justify-content-start gap-2 mb-3 flex-wrap"
            //    style={{position:'relative', zIndex:'3'}} 
               onClick={()=>setOpenForm(false)}>             
             
                <div className="col-lg-1  border  rounded "style={{borderRadius:'10px' }} >
                    <button 
                    // onClick={openModal}
                     onClick={(e)=>{  e.stopPropagation();openModal()}}
                     className="col-lg-6  border-0  text-white p-1"
                    style={{height:'40px',background:'#e53410'}}>+</button>
                    <button  className="col-lg-6 bg-light border-0   p-1"style={{height:'40px'}}>
                    <FontAwesomeIcon icon={faPrint} />
                    </button>
                    {isModalOpen && <Modal onClose={closeModal} />}
                </div>             
                          
            </div> 
          <div className="w-100 d-flex  justify-content-center flex-wrap gap-2   "
          style={{            
            display:'flex'}}>
             <div className="col-md-4 border border-primary mb-1  "
                 style={{overflow:'hidden',
                    maxHeight:openForm && windowsize<800 && '150px',
                    // width:(openForm && windowsize>1010 )?(isOpen ?'50%': '100%') :'100%'
                    width:(openForm && windowsize>800 )?'40%' :'100%'

                 }}
                 onClick={(e)=> { 
                    // updateTask();
                   e.stopPropagation(); // منع الحدث من الوصول للأب
                    //  handleClick();  
                       }}>
                    <TaskTabs 
                        userId={userId} 
                        alltask={handelgetalltask}
                        onSelectTask={setSelectedTask}
                        openForm={setOpenForm}                        
                        index1={setIndex}   
                        task_activ={selectedTask_activ1}  
                        refresh={taskUpdate}
                                       
                      />
             </div>        
              {openForm &&
               <div className="mb-3  "
                 style={{
                    // overflow:'hidden',
                    maxHeight:openForm && windowsize<800 && '300px',
                    // width:(openForm && windowsize>1010 )?(isOpen ?'50%': '100%') :'100%'
                    width:(openForm && windowsize>800 )?'50%' :'100%'

                 }}>
               <FormSubTask                  
                item={selectedTask}
                alltask={tasks}
                index={index}
                selectedTask_activ={setSelectedTask_activ1}
                updatedTask={setTaskUpdate}

                />
                 </div>   }

          </div>        
        </div>
    )
}
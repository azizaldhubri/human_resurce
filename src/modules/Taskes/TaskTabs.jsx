// src/components/TaskTabs.jsx
import { useEffect, useState } from 'react'; 
import TaskCard from './TaskCard'; 
import { Axios } from '../../Api/axios';
 
const TaskTabs = (props) => {

  const[tasks,setTasks]=useState([]);   


  const[incomingTasks,setIncomingTasks]=useState(true)  
  const [ taskShow, setTaskShow] = useState([]); 

  function handelincomeTask(task) {  
    if (!taskShow.includes(task)) {      
        setTaskShow((prev)=>[...prev,task]);        
      } 
    };  

  useEffect(()=>{
      async function gettask(){                
      try{  await  Axios.get('tasks')
          .then(e=>{                                                               
              setTasks(e.data.postArray);         
              setTaskShow([]);                                          
            })  
      }
      catch(err){console.log(err)};
  }         
  gettask();           
  },[incomingTasks ,props.refresh])      

   { tasks &&   tasks.sort((a, b) => {return  new Date(b.created_at)-new Date(a.created_at)  });  
        { (taskShow.length === 0   && tasks) &&    tasks.map((task,index)=>(
            <div className="   w-100   bg-light " key={index}
                style={{color:task.task_status==='Completed' ?'black':'red',boxShadow:'0 5px 5px rgba(0,0,0,0.3)',
                    borderRadius:'34px',
                    //  borderRight:activeLink===index ?'8px solid #14b7d7' :'' 
                     }} >           
                <>                
                    {
                     task.chiledtask.length===0 && // هذا الشرط لمقارنة المهمة الرئيسية للمستخدم 
                    (props.userId===(incomingTasks? +task.id_receiver: +task.sender_id)) && 
                    <div key={index} >
                       { handelincomeTask(task)}                       
                    </div>                      
                    }
                    {!incomingTasks &&   
                    task.chiledtask.map((item ,n)=>(        
                    // (item.task_id==task.id && item.id_receiver==userId && task.sender_id !=userId && iswrritten)&&
                    // task.chiledtask.length===n+1 هذا الشرط لعرض المهمة لاخر شخص ارسلت الية
                    (item.task_id===task.id && +item.id_sender ===props.userId && task.chiledtask.length===n+1 )&&
                    <div  key={n}  > 
                     { handelincomeTask(task)}                 
                       
                    </div>     ))        
                    } 
        
                   {incomingTasks &&   
                    task.chiledtask.map((item ,nm)=>(        
                    // (item.task_id==task.id && item.id_receiver==userId && task.sender_id !=userId && iswrritten)&&
                    (item.task_id===task.id && +item.id_receiver ===props.userId && task.chiledtask.length===nm+1 )&&
                    <div key={nm}  >
                        { handelincomeTask(task)}  
                        
                    </div>     ))        
                    }                
                </>
            </div>   )
        )} 
    }

 useEffect(() => {
  updateTask()
   }, [taskShow]);


  function  updateTask(){    
          props.alltask(taskShow)
        }
  
 
  return (
    <div className="container     h-100   " style={{overflowY:'auto'}} >
      <ul className="nav nav-tabs" id="taskTab">
        <li className={`nav-item nav-link ${incomingTasks ? 'active' : ''}`}        
           data-bs-toggle="tab" onClick={()=>{setIncomingTasks(true);   }}>📥 الواردة        
        </li>
        <li  className={`nav-item nav-link ${!incomingTasks ? 'active' : ''}`}        
             data-bs-toggle="tab" onClick={()=>{setIncomingTasks(false);  }}>📤 المرسلة          
        </li>
      </ul>                                                                
      <div className="tab-content  " style={{overflowY:'auto' }}>
        <div className="tab-pane fade show active   " id="received"  >
          {taskShow.map((task,index )=>
           <TaskCard 
              key={index} 
              task={task} 
              index={index}                          
              selectIndex={props.index1}
              onClick={props.onSelectTask}
              onClickForm={props.openForm}             
              task_activ={props.task_activ}
              
                />)}
        </div>       
      </div>
    </div>
  );
};

export default TaskTabs;

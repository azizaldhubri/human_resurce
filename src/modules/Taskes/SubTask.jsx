import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap"; 
import { Axios } from "../../Api/axios";
import { USER, USERS } from "../../Api/Api";  
import { typeFile } from "../../Helpers/Files"; 

export default function SubTask(props){
    // const {id}=useParams();
    const id=props.id;
    let test=props.taskUpdate ;      
    const[refresh,setrefresh]=useState(0)   
    const[title,setTitle]=useState('');
    const[id_senderTask,setId_senderTask]=useState('');
    const[id_receiver,setId_receiver]=useState('');
    const[users,setUsers]=useState([]);
    const[filesdata,setFilesdata]=useState([]);  
    const focus=useRef('');   
    const openImage=useRef(null);   
    const task_status=useRef('');   
    const senderTask=useRef('');   
    const username=useRef('');   
    const userId=useRef('');      //-----------------------------------

     useEffect(()=>{
        Axios.get(`${USERS}`)
        .then((e)=>setUsers(e.data.data.data))
     },[])

     useEffect(()=>{
        Axios.get(`${USER}`)
        .then((e)=>{           
          username.current=e.data.email;
          userId.current=e.data.id;               
        })
     },[])
 
     const selectUser=users.map((item,index)=>(            
      <option key={index} value={item.id}  >{item.name}</option>        
     ))
    
     let receiver_name='' ;
    {id_receiver &&(
      users.map((item,index)=>(                       
         item.id === +id_receiver &&
         (receiver_name=item.name)        
    ))
    ) }

   
    //-----------------
    useEffect(()=>{
      async function gettask(){
      try{    Axios.get(`tasks/${id}`)
          .then(e=>{            
            task_status.current=e.data.task_status ;
            setId_senderTask(e.data.sender_id)            
            senderTask.current=e.data.sender_name        
        
            })                             
      }
      catch(err){console.log(err)}
  }
  gettask();

  },[refresh])  

       //-----------------------------------------------------------------------------------
      async function handlesubmit(e){
        e.preventDefault();         
        const formData = new FormData();
        formData.append('task_id', id);
        formData.append('id_sender', userId.current);
        formData.append('name_sender', username.current);
        formData.append('id_receiver', id_receiver ?id_receiver:id_senderTask);
        formData.append('name_receiver', receiver_name?receiver_name:senderTask.current);      
        formData.append('title', title);  
    
        // إضافة الملفات إلى formData
        for (let i = 0; i < filesdata.length; i++) {
          formData.append('files[]', filesdata[i]);
        }      
        try{            
            await Axios.post('chiled_task/add',formData )            
            setrefresh(prev=>prev+1);  
            setTitle('');
            setId_receiver('')   ;             
            setFilesdata('') ;
            props.setUpdateTask(test+1) ; 
            if(task_status.current==='To Do') 
             {           
               task_status.current='In_progress'
               Axios.put(`tasks/status_update/${id}`,{ status: 'In_progress' }) ;               
              }
          }
          catch (error) {
            console.error('Error sending data:', error);
          }     
    }       
    
    function handlechangefile(e){    
      setFilesdata((prev)=>[...prev,...e.target.files]);
    }
          
 function HandleCansleFiles(id){
     setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
 }

    //handle open image
    function handleOpenImage(){
      openImage.current.click()      
    }
  
    return(     
  <div className="w-100  py-4 px-4 d-flex justify-content-center bg-white ">
    <div className="w-100  ">               
        <div className="  px-3 py-3   ">           
      <Form  onSubmit={handlesubmit}
      className="  gap-2  mt-0 pt-2" encType="multipart/form-data" > 
            <Form.Group  className=" d-flex mt-2 gap-2 fs-5 align-items-center justify-content-between">
                <Form.Label>خاص الى</Form.Label>
                <Form.Select style={{width:'80%'}}
                value={id_receiver}                          
                // name={id_receiver}                          
                onChange={(e)=>{
                  setId_receiver(e.target.value);                           
                }}
                >
                  <option  disabled value={''}>Select User</option>
                    {selectUser}
                </Form.Select>
                        {/* <button className="btn btn-primary  " disabled ={receiver_name && description ? false:true }>Add</button> */}
            </Form.Group>         
            <Form.Group 
                className=" d-flex mt-2 gap-2 fs-5 mt-3 align-items-center justify-content-between">
               <Form.Label>الوصف</Form.Label>
               <Form.Control  className="w-75" as="textarea" aria-label="With textarea"
                value={title}
                 onChange={e=>setTitle(e.target.value)}                
                >
                </Form.Control>
            </Form.Group>  
            <Form.Group className="  pt-2 ">                             
                <Form.Control 
                ref={openImage}
                hidden
                type="file"
                multiple
                onChange={handlechangefile}
                >
                </Form.Control>
            </Form.Group>                         
        </Form>
       
          <div ref={focus} className=" mt-5"
          style={{width:'100px'}}
            onClick={handleOpenImage}>
            <button 
              className=" cursor-pointer border-0 bg-white   fs-5 ">+ المرفقات</button> 
        </div>                 
      </div>      
        <div className=" mt-3 bg-white d-flex gap-2 ">
          {filesdata && filesdata.map((item,i)=>
            (
              <div key={i} className="border rounded  position-relative "> 
              <div key={i} className=" "style={{width:'100px'}}>                     
                  {  typeFile.map((typfile,ki)=>
                    <div key={ki}>
                        {typfile.src_type==item.type&&(
                        <div className="d-flex align-items-center justify-content-start flex-column">
                        <img  src={typfile.type =='img'? `${URL.createObjectURL(item)}`:` ${typfile.pathimg}`} width='30px'  alt="" ></img>
                        <p className="m-0"style={{fontSize:'12px'}}>{item.name}</p>
                    </div>
                    )}
                    </div>)
                  }         
              </div>
              <div style={{cursor:"pointer"}}
                  className="position-absolute  top-0 end-0 bg-danger rounded text-white">
                    <p className="py-1 px-2 m-0" onClick={()=>HandleCansleFiles(item)}>
                        x
                    </p>
              </div>                         
            </div> 
            ))                    
          }
       </div> 
       <div className="w-100 d-flex justify-content-center gap-3 mt-2 ">       
          <button  className="border-0 bg-white fs-4  " 
          disabled ={title ? false:true }
          style={{color:title ? '#E41B17':'	#FBBBB9' }}
          onClick={handlesubmit}>Save</button>      
          <button className="border-0 bg-white fs-4 "
            disabled ={title ? false:true }
            style={{color:title ? '#E41B17':'	#FBBBB9' }}
          onClick={()=>{setTitle('')}}>Cancle</button>   
        </div>                        
    </div>      
  </div>
      )
}



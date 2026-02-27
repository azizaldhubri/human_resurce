import { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import { Axios } from "../../Api/axios"
import {  USER, USERS } from "../../Api/Api" 
import { Link, useNavigate } from "react-router-dom";
import LoadingSubmit from "../../Component/Loading/Loading";
import { typeFile } from "../../Helpers/Files"; 
import DateMilady from "../../Helpers/DateMilady";
import Select from 'react-select'; 
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";
 
 
 
export default function AddTaskes(props){
    const navigate=useNavigate();     
    const today =DateMilady( new Date())  
    let Update_task=props.taskUpdate ;         
    const[users,setUsers]=useState([]);
    const[filesdata,setFilesdata]=useState([]);
    const [message, setMessage] = useState("");
    const[Loading,setLoading]=useState(false);

  // تحديث الرسالة عند الضغط على الزر
  const handleClick = () => {
    setMessage("عنوان المهمة او اسم المسستقبل غير موجود ");
  };

    const focus=useRef('');   
    const openImage=useRef(null);
    const[form,setForm]=useState({
        id_receiver:'Select User',
        description:null,
        task_type:'عام',
        sender_name:'',
        sender_id:''  ,
        // receiver_name:'',
        task_status:'To Do',
        start_task:today  ,
        end_task:today
        
     }) 
     const taskSending=useRef(false);
       // handle focus
    useEffect(()=>{     
     focus.current.focus();
    },[]);

    
    useEffect(()=>{
        try{
            Axios.get(`${USERS}`)
            .then(e=>{setUsers(e.data.data.data);})
        }
        catch(err){console.log(err)}
    },[])

    useEffect(()=>{
        try{
            Axios.get(`${USER}`)
            .then(e=>{
                setForm((prevData) => ({
                    ...prevData,
                    // sender_name: e.data.name,
                    sender_name: e.data.email,
                    sender_id: e.data.id,                    
                  })); 
                                      
                          })
        }
        catch(err){console.log(err)}
    },[])


  function handleChange (e){      
        setForm({...form,[e.target.name]: e.target.value});           
         }
    
// handlechange files
function handlechangefile(e){
    setFilesdata((prev)=>[...prev,...e.target.files]);
}
    
    // --------------handleSubmite---------------
    
    async function handlesubmit(e){
        e.preventDefault();   
   
        const formData = new FormData();
        formData.append('sender_id', form.sender_id);
        formData.append('sender_name', form.sender_name);
        formData.append('id_receiver', form.id_receiver);
        formData.append('receiver_name', receiver_name);
        formData.append('task_status',form.task_status );
        formData.append('task_type', form.task_type);
        formData.append('description',form.description.value);
        formData.append('start_task', form.start_task);           
        formData.append('end_task', form.start_task>form.end_task ?form.start_task:form.end_task );    
       
        // إضافة الملفات إلى formData
        for (let i = 0; i < filesdata.length; i++) {
            formData.append('files[]', filesdata[i]);
        }     
        try{            
              setLoading(true)                      
           await Axios.post('tasks/add',formData )  ;
           taskSending.current='true' ;
           navigate('/dashboard/Taskes1');
           props.setUpdateTask(Update_task+1) ;            
                 
          }
          catch (error) {
            console.error('Error sending data:', error);
            setLoading(false) 
          }           
    }

    const selectUser=users.map((item,index)=>(            
         <option key={index} value={item.id}  >{item.name}</option>        
        ))
   
        let receiver_name='' ;
    {form.id_receiver &&(
         users.map((item)=>(                       
            item.id === +form.id_receiver &&
            (receiver_name=item.name)                  
       ))
    ) }             
        function HandleCansleFiles(id){
            setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
        }

        function handleOpenImage(){
            openImage.current.click()      
          }
 
    // const option_general=[
    //     'مقارنة عروض اسعار','طلب اخلاء وحدة- بيانات الوجدة','تعميد بالمطالبة والتحصيل'
    // ]
    const option_general=[
        { value: 'مقارنة عروض اسعار',
            label: 'مقارنة عروض اسعار'},
        { value: 'طلب اخلاء وحدة- بيانات الوحدة',
            label: 'طلب اخلاء وحدة- بيانات الوحدة'},
        { value: 'تعميد بالمطالبة والتحصيل',
            label: 'تعميد بالمطالبة والتحصيل'},        
    ]

    const human_resources=[
        {value:'طلب سلفة',label:'طلب سلفة'},
        {value:'التمكين',label:'التمكين'},
        {value:'طلب إجازة',label:'طلب إجازة'},
    ]
    const Financial=[
        {value:'طلب صرف',label:'طلب صرف'},
        {value:'طلب دفعات',label:'طلب دفعات'},
        {value:'طلب عهدة',label:'طلب عهدة'},
    ]
    const quality=[
        {value:'إخطار مراجعة داخلية',label:'إخطار مراجعة داخلية'},
        {value:'طلب(إصدار- تعديل)وثيقة',label:'طلب(إصدار- تعديل)وثيقة'},
        {value:'عدم مطابقة',label:'عدم مطابقة'},
        {value:'إدارة المحاطر',label:'إدارة المخاطر'},    
    ]
    
    
    return(
        <div className=" w-100  py-1 px-4 bg-page "  >
            <h5 className="mt-2 d-flex py-3 px-3" >
               إضافة مهمة جديدة 
                </h5>
            
            <div className=" w-100  d-flex align-items-center justify-content-start mt-2" ref={focus} >
            {Loading  && < LoadingSubmit/>}
                {/* <Form onSubmit={handlesubmit}
                className=" d-flex ms-2 w-100 flex-column"
                encType="multipart/form-data"> */}
                <div className=" d-flex ms-2 w-100 flex-column"
                encType="multipart/form-data"  >
                  
                    <fieldset >
                    <Form.Group className="mt-3 d-flex  fs-5" 
                       >
                        <Form.Check
                         className="  me-3"
                        type="radio"
                        // label="عام"                        
                        name="task_type"                                                 
                        value="عام"
                        checked={form.task_type === 'عام'}                       
                        onChange={handleChange}                        
                        />
                        <Form.Label className="me-2">عام</Form.Label>                   
                        <Form.Check
                         className="  me-3"
                        type="radio"
                       name="task_type"                        
                        value='موارد بشرية'
                        checked={form.task_type === 'موارد بشرية'}   
                        onChange={handleChange}                        
                        />
                        <Form.Label className="me-2">موارد بشرية</Form.Label>  

                        <Form.Check
                         className="  me-3"
                        type="radio"                        
                        name="task_type"                        
                        value='مالية'
                        checked={form.task_type === 'مالية'}                        
                        onChange={handleChange}
                        />
                         <Form.Label className="me-2">مالية</Form.Label>  


                        <Form.Check
                         className="  me-3"
                        type="radio"                         
                        name="task_type"                                         
                        value='جودة'                       
                        checked={form.task_type === 'جودة'}                        
                        onChange={handleChange}                    
                        />
                        <Form.Label className="me-2">جودة</Form.Label>  
                    
                    </Form.Group>
                    </fieldset>                   
                   
                    {/* <Form.Group className="mt-3" >
                    <Form.Label className="mt-0 "htmlFor="basic-url">Description</Form.Label>
                    <Form.Control as="textarea" aria-label="With textarea"
                       name="description"
                       value={form.description}            
                    onChange={handleChange}
                       placeholder="Description"
                       >
                       </Form.Control>
                    </Form.Group> */}

                     
                    {form.task_type === 'عام'&&
                        <Form.Group className=" fs-5"  style={{textAlign:'start'}} > 
                            <Form.Label>نوع المهمة</Form.Label>                        
                            <Select className='w-100   '                  
                                                    
                              onChange={(e)=> setForm({...form, description:e })}
                                options={option_general}                                               
                                placeholder="اختر نوع المهمة  "
                                styles={customSelectStyles}
                            required
                            >                        
                            </Select> 
                      </Form.Group> 

                      }
                                   
                    {form.task_type === 'موارد بشرية'&&
                        <Form.Group className="fs-5  "   style={{textAlign:'start'}}> 
                        <Form.Label   style={{textAlign:'start'}}>نوع المهمة</Form.Label>                               
                      
                      <Select className='w-100   '
                        //    name='document_type'                      
                    onChange={(e)=> setForm({...form, description:e })}
                          options={human_resources}                                                            
                          placeholder="اختر نوع المهمة  "
                        styles={customSelectStyles}
                       required
                      >
                        
                      </Select> 

                      </Form.Group>   
                      }
                    {form.task_type === 'مالية'&&
                        <Form.Group className=" fs-5"  style={{textAlign:'start'}}  > 
                        <Form.Label>نوع المهمة</Form.Label>                          
                      
                      <Select className='w-100   '
                        onChange={(e)=> setForm({...form, description:e })}                         
                          options={Financial}                                                            
                          placeholder="اختر نوع المهمة  "
                        styles={customSelectStyles}
                       required
                      >
                        
                      </Select> 

                      </Form.Group>   
                      }   
                    {form.task_type === 'جودة'&&
                        <Form.Group className=" fs-5"  style={{textAlign:'start'}} > 
                        <Form.Label>نوع المهمة</Form.Label>                               
                      
                      <Select className='w-100   '
                    //    name='document_type'
                    onChange={(e)=> setForm({...form, description:e })}                                            
                          options={quality}                                                            
                          placeholder="اختر نوع المهمة  "
                        styles={customSelectStyles}
                       required
                      >                        
                      </Select> 
                      </Form.Group>   
                      }                 
               
                     {
                      form.description !=null &&
                      <>
                        <p className="m-2 fs-5 text-end">الى الموظف</p>
                      <Form.Group  className="d-flex  gap-2 me-3 w-100">
                              <Form.Select 
                              name="id_receiver"                             
                              value={form.id_receiver}                       
                              onChange={handleChange}                           
                              >
                                  <option  disabled >Select User</option>
                                  {selectUser}
                              </Form.Select>                        
                      </Form.Group>
                      </>
                     }
                   
                    <Form.Group className="w-100   mt-3  me-3  d-flex flex-wrap  gap-2">
                    <fieldset className=" d-flex align-items-center  ">   
                    <Form.Label>Start_task</Form.Label>
                        <Form.Control className="m-0  ms-2 w-75 "
                            type="date"
                            name="start_task"
                            value={form.start_task}   
                            onChange={handleChange}                          
                            min={today}
                            >
                        </Form.Control>            
                        </fieldset>                        
                        <fieldset className=" d-flex align-items-center">  
                      <Form.Label>End_task</Form.Label>
                        <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={form.start_task>form.end_task ?form.start_task:form.end_task}                           
                            onChange={handleChange}
                            min={form.start_task}
                             >
                        </Form.Control> 
                        </fieldset>                                                
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
                          
                {/* </Form> */}
                
                </div>
            </div> 
            <div className="w-25"
           onClick={handleOpenImage}>
            <button 
             className=" cursor-pointer border-0 bg-white  text-primary me-3 mt-2">+Add Files:</button> 
        </div>           
                <div className=" border mt-3 bg-white d-flex gap-2 ">
                    {filesdata && filesdata.map((item,i)=>(
              <div key={i} className="  position-relative mt-2">                                                                
                {  typeFile.map((typfile,ki)=>
                  <div key={ki}>
                  {typfile.src_type===item.type&&(
                    <div className="d-flex align-items-center justify-content-start flex-column">
                       <img  src={typfile.type ==='img'? `${URL.createObjectURL(item)}`:` ${typfile.pathimg}`} width='30px'  alt="" ></img>
                       <p className="m-0"style={{fontSize:'12px'}}>{item.name}</p>
                   </div>
                  )}
                </div>)}         
              
                         <div style={{cursor:"pointer"}}
                         className="position-absolute  top-0 end-0 bg-danger rounded text-white">
                             <p className="py-1 px-1 m-0" onClick={()=>HandleCansleFiles(item)}>
                                 x
                             </p>
                         </div>         
                       
                        </div>
                      
                    ))
                    }
                </div>

                <div className="w-100 d-flex -align-items-center justify-content-center fs-5 text-danger">
                
                {message && <p>{message}</p>}
             </div> 

                <div className="w-100 d-flex justify-content-center gap-3 mb-4 ">               
                  <button   className="border-0 bg-white fs-4 text-danger"                
                  onClick={(receiver_name && form.description) ?handlesubmit:handleClick}  
                  disabled={!taskSending } 
                //   style={{color:!taskSending.current ? '#E41B17':'	#FBBBB9' }}           
                  >Save</button> 
                  {props.addTask_from_model && 
   //  يظهر هذه المفتاح اذا فتحنا واجهة اضافة مهمة من الفورم  وستخدم هذا المفتاح لالغاء المهمه

                    <button 
                    className="border-0 bg-white fs-4 text-danger"

                    onClick={()=>props.setUpdateTask(Update_task+1)}
                    >Cancle</button> }
                  {!props.addTask_from_model && 
                    <Link to='/dashboard/Taskes1'
                    className="border-0 bg-white fs-4 text-dangeri">Cancle</Link> }
                
                                       
               </div>
                            
           
        </div>
    )
}
import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import HistoryDatew from "../../Component/Dashboard/History";
import { typeFile } from "../../Helpers/Files";
import { Link, useNavigate } from "react-router-dom";
 
import { useCallback, useContext, useEffect, useRef, useState } from "react";
// import TranFormDate from "../../Helpers/TranFormDate";
import { UserContext, } from "../../Component/Context/UserProvider";
import { USERS } from "../../Api/Api";
import { Axios } from "../../Api/axios";
// import TranFormDate from "../../Helpers/TranFormDate";
import { Menu } from "../../Component/Context/MenuContext";
 import Swal from "sweetalert2";
 import LoadingSubmit from "../../Component/Loading/Loading";
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";
 
export default function AddLeavesRequst(){
    const navigate=useNavigate()
     const user=useContext(UserContext);
       const menu=useContext(Menu)    
         let setIsupdated=menu.setIsupdateNotifaction ;
         
       
    //  const first_name=user.user.first_name ;
    //  const last_name=user.user.last_name ;
     const id=user.user.id ;
     const[users,setUsers]=useState([]);
     const[reasone,setReasone]=useState('');     
     const[type_leaves,setType_leaves]=useState([]);
     const[typeLeaves,setTypeLeaves]=useState('');
       const [loading, setLoading] = useState(false); 
    //  const today =TranFormDate( new Date()) 

      const [isToggled, setIsToggled] = useState(false);
     const[filesdata,setFilesdata]=useState([]); 

     function handelUpateNotifaction(){        
      setIsupdated((perv)=>!perv) ;  
}
     
        const handleToggle = () => {
           setIsToggled(!isToggled); // تغيير الحالة بين true و false
         };
     
          //  const focus=useRef('');   
           const openImage=useRef(null);

           useEffect(()=>{
             async  function Getusers(){
                        try{
                          const res=await Axios.get(`/${USERS}`)  ; 
                          setUsers(res.data.data) ;
                          // console.log(res.data.data)  
                        }
                        catch(err){
                            console.log(err);                           
                        }
                    }
                    Getusers();
            
           },[])
           useEffect(()=>{
             async  function Type_leaves(){
                        try{
                          const res=await Axios.get(`leavesType`)  ; 
                          setType_leaves(res.data) ;
                                                }
                        catch(err){
                            console.log(err)
                        }
                    }
                    Type_leaves();
            
           },[])
    
       
    
    const leaves =type_leaves && type_leaves.map(item => ({
      value: item.id,
      label: item.name
    }));

    // const handleChange = (selectedOption) => {
    //   setApproved_id(selectedOption); // يتم تمرير الكامل المحدد مباشرة
    // }; 
    const handleChangeTypeLeaves = (selectedOption) => {
      setTypeLeaves(selectedOption); // يتم تمرير الكامل المحدد مباشرة
    };
    
         //------------------------function Date-------------------------------------------------------
         ///date selectedDate
         const [startDate, setStartDate] = useState(new Date());    
         const [endDate, setEndDate] = useState(new Date());  
          

        
         const  timeDifference =new Date(endDate) - new Date(startDate)  ;
         
          const total_days = timeDifference / (1000 * 60 * 60 * 24);     
  
    
 
  const handleValueStartDate = useCallback((newValue) => {    
    setStartDate(newValue);   
}, []);
 
    const handleValueEndDate = useCallback((newValue) => {
      setEndDate(newValue);    
       
  }, []);
     
 

      function handlechangefile(e){
        setFilesdata((prev)=>[...prev,...e.target.files]);
       
      }
      
      function HandleCansleFiles(id){
        setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
      }
      
      function handleOpenImage(){
        openImage.current.click()      
      }

      async function handleSubmit(e){
        e.preventDefault();
         const formData = new FormData();   
         formData.append('employee_id', id);
         formData.append('leave_type_id', typeLeaves.value);
         formData.append('start_date', startDate);    
         formData.append('end_date', endDate);
         formData.append('total_days', total_days);
         formData.append('reason', reasone);
         formData.append('approved_by','');
         formData.append('status', 'pending');
         formData.append('admin', '1');
         formData.append('link_notification', '/dashboard/LeavesRequestsManegment');
         for (let i = 0; i < filesdata.length; i++) {
          formData.append('files[]', filesdata[i]);
      } 
         
            try{                   
                await Axios.post(`leaves/add`,formData )                                                
                navigate('/dashboard/Leaves/LeavesRequestsManegment' )  ;
                handelUpateNotifaction();   
            Swal.fire({
        icon: "success",         
        text: "تم تقديم طلب الإجازة بنجاح",
        confirmButtonText: "حسناً"
      });           
            }
            catch(err){
              // console.log(err)
              console.log(err.response.data.message);
              // {  err.response.data.message==='رصيد الإجازة غير كافٍ!'&&
      
              //   alert('رصيد الإجازة غير كافٍ')
              // }
                  Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.response?.data?.message || "رصيد الإجازة غير كافٍ'",
        confirmButtonText: "إغلاق"
      }); 
            }

      }
  
    return(
        <div className="w-100  border  border-primary   col-12 col-lg-12 col-md-12 col-sm-12 px-2 py-3   "
        style={{}}>
            {/* <div className="w-100 d-flex col-12 col-lg-12 col-md-12 col-sm-12 align-items-center justify-content-center  flex-column  "> */}
                <div className="d-flex    w-75   fs-3     text-center align-items-center justify-content-center gap-5 "
                  style={{height:'50px'}}>
                    <Link to='/dashboard' className="link m-0  ">رجوع</Link>
                    <Link to='#'className="link m-0  ">عرض كل الموظفين</Link>                    
                </div>
                
                <div className="w-100 d-flex col-12 col-lg-12 col-md-12 col-sm-12 align-items-center justify-content-center  flex-column    ">
                  <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                      
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                        <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-12"   >نوع الاجازة</Form.Label>
                        <Col lg={9} sm={8} xs={12} md={12} >
                          <Select className='w-100   '
                                name='document_type'                    
                                onChange={handleChangeTypeLeaves}
                                options={leaves}                                                           
                                placeholder="اختر نوع الإجازة "
                                styles={customSelectStyles}
                                required   >
                  
                          </Select> 
                        </Col>
                    </Form.Group> 
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                                  <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > سبب الإجازة </Form.Label>
                                  <Col lg={9} sm={8} xs={12} md={12} >
                                  <Form.Control as="textarea" aria-label="With textarea"
                              name="reason"
                              value={reasone}
                              onChange={(e)=>setReasone(e.target.value)}            
                              // onChange={handleChange}
                              placeholder="Description"
                              >
                              </Form.Control>    
                                  </Col>
                          </Form.Group> 
  
                  </div>
                    <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                                              
                        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                                <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > بداية الإجازة</Form.Label>
                                <Col lg={9} sm={8} xs={12} md={12} >
                                          <HistoryDatew  
                                          minDate={new Date()} 
                                          date={startDate} 
                                          setSelectDate={handleValueStartDate}                                   
                                                                            
                                              />   
                            
                                </Col>
                           
                        </Form.Group>                   
                        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                                <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > نهاية الإجازة</Form.Label>
                                <Col lg={9} sm={8} xs={12} md={12} >
                                          <HistoryDatew   
                                           minDate={startDate}                                                                                     
                                              // date={endDate }                                                                                          
                                              date={startDate>endDate ?endDate:startDate}                                                                                          
                                              setSelectDate={handleValueEndDate}                                          
                                              />      
                                </Col>
                        </Form.Group>                   
                                    
                  
                    </div>
            
                    <div className="    w-100 mt-3   fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                                              
                                          
                          <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                                  {/* <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >  تحميل مستندات   </Form.Label> */}
                                  <Col lg={9} sm={8} xs={12} md={12} >
                                        <Form.Control 
                                          ref={openImage}
                                          hidden
                                          type="file"
                                          multiple
                                          onChange={handlechangefile}
                                          >
                                        </Form.Control>  
                                  </Col>
                          </Form.Group>                   
                                          
                                    
                  
                    </div>
                  
                

                {/* <div className="w-100   text-center gap-4">
                  <button className="btn btn-primary m-3">حفظ</button>
                  <button className="btn btn-primary">إلغاء</button>
                </div> */}

                  <div className="w-100   mt-2 ">
                    <div className="   me-2   pe-5   d-flex   gap-lg-4 align-items-start justify-content-start  flex-wrap  "
                    onClick={handleOpenImage} style={{width:'100px' , }}>
                            <button  className=" cursor-pointer border-0   fs-4   "> +المرفقات</button> 
                    </div>

                  </div>
                                  
                    <div className="   mt-3 bg-white d-flex gap-2 w-75  rounded pe-3 ps-3  bg-dark ">
                                {filesdata && filesdata.map((item,i)=>(
                          <div key={i} className="  position-relative mt-2   ">                                                                
                            {  typeFile.map((typeFile,ki)=>
                              <div key={ki}>
                              {typeFile.src_type==item.type&&(
                                <div className="d-flex align-items-center justify-content-start flex-column ">
                                  <img  src={typeFile.type =='img'? `${URL.createObjectURL(item)}`:` ${typeFile.pathimg}`} width='30px'  alt="" ></img>
                                  
                              </div>
                              )}
                            </div>)}         
                          
                          
                                    <div style={{cursor:"pointer" ,}}
                                    className="position-absolute  top-0 end-0 bg-danger rounded text-white "
                                    >
                                        <p className="  m-0" onClick={()=>HandleCansleFiles(item)}>
                                            x
                                        </p>
                                    </div> 
                                    <p className="m-0"style={{fontSize:'10px'}}>{item.name}</p>        
                                  
                                    </div>
                                  
                                ))
                                }
                      </div>
                      <div className=" d-flex  m-2 gap-2 pt-4 "   style={{borderTop:'2px solid black',width:'80%'}}>
                            <div className="d-flex align-items-center border    "
                            style={{width:'50px',height:'20px'
                              ,borderRadius:'10px',
                              background:isToggled ?'#C9BE62 ':'gray'}}>

                              <button onClick={handleToggle} 
                              style={{marginRight:isToggled?'50%':'0',
                                padding: '12px',borderRadius:'100%', fontSize: '16px',
                                background:isToggled ?'#EAC117':'white',
                                border:'0'}}>                  

                                </button>  

                            </div>

                            <h5   >أقر بأن الطلب تم بمعرفتي ومسؤوليتي</h5>
                      </div>   
                    <div className="w-100 d-flex justify-content-center gap-3 p-3 "
                   
                  >                   
                        <button
                        className="p-1 ps-2 pe-2 rounded text-black "
                        style={{background:'		#893BFF',
                          
                        }}
                        // disabled={!isToggled}
                        onClick={handleSubmit}
                        >حفظ</button> 
                        <Link to='/dashboard/documents'
                        className="p-1 ps-2 pe-2 rounded text-black"
                        style={{background:'yellow',}}>رجوع
                        </Link>         
                          
                    </div>

                </div>

                 
           

            {/* </div> */}
        </div>
        
    )
}
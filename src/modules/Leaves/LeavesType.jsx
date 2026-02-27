import { useEffect, useState } from "react";
import Table_documents from "../../Component/Dashboard/Table_document";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
 import Swal from "sweetalert2";
 import LoadingSubmit from "../../Component/Loading/Loading";
import ExportExcel from "../../Component/Dashboard/ExportExcel";
 import ExportPdf from "../../Component/Dashboard/ExportPdf";
export default function LeavesType(){

    const[type_leaves,setType_leaves]=useState([]);
        const[page,setPage]=useState(1)
        const[limit,setLimit]=useState(3)
         const [loading, setLoading] = useState(false);     
        // const[total,setTotal]=useState(0);
        // const[role,setRole]=useState('');
        const[isOpen,setIsOpen]=useState(false);

        const[form,setForm]=useState({
            name:'',
            max_days:'',
            carry_forward:'0',
        });

     function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
     }
    useEffect(()=>{
        async  function Type_leaves(){
                try{
                    const res=await Axios.get(`leavesType`)  ; 
                    setType_leaves(res.data) ; 
                    // setType_leaves(...type_leaves,...form)
                    // setIsOpen(false)                    
                }
                catch(err){
                    console.log(err)
                }
            }
            Type_leaves();
    
    },[])
 
    const header=[
          
        {
            key:'name',
            name:'اسم نوع الإجازة'
        },
        {
            key:'max_days',
            name:'الحد الأقصى للأيام'
        },
        {
            key:'carry_forward',
            name:'السماح بترحيل الرصيد'
        },
         
        {
            key:'action',
            name:'العمليات'
        },
     ]

     async function handleSubmit(e){
        e.preventDefault();    
        setLoading(true)   
          try{                         
             await Axios.post(`addLeavesType`,form )  ;
        Swal.fire({
        icon: "success",
        // title: "تم بنجاح",
        text: "تم إضافة نوع الإجازة بنجاح",
        confirmButtonText: "حسناً"
      });
             setType_leaves((prev)=>[...prev,form]); 
             setIsOpen(false)   
        //    window.location.pathname='/dashboard/users'
             
          }
          catch(err){
            // console.log(err)
            console.log(err.response);  
              Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.response?.data?.message || "حدث خطأ غير متوقع",
        confirmButtonText: "إغلاق"
      });          
          }finally{
             setLoading(false) 
          }
      }
       async function handleDelet(id){
              try{                 
               await Axios.delete(`deleteLeavesType/${id}`);
               setType_leaves((prev)=>prev.filter((item)=>item.id!==id)) ;
                                    
               }
              catch(err){
                          console.log(err)
                     }         
             }
    return(
     <>
     {loading ?     
        <LoadingSubmit />
        :<div className="w-100 px-2 py-2 border">
            <div className="w-100   me-4 pt-3 d-flex gap-3">
                 <Link to='/dashboard'className="fs-4">رجوع</Link>
                 <button className="btn btn-primary"onClick={()=>setIsOpen(true)}>إضافة نوع إجازة</button>
            </div>
            {isOpen ===true &&
                <div>
                    <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                        
                        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                                <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   >إضافة نوع إجازة</Form.Label>
                                <Col lg={9} sm={8} xs={12} md={12} >
                                <Form.Control
                                type="text"
                                name="name"                                                 
                                value={form.name}
                                onChange={handleChange}                            
                                ></Form.Control>                                               
                                
                                </Col>
                        </Form.Group>                    
                        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" 
                        >
                                <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   > عدد الإيام   </Form.Label>
                                <Col lg={9} sm={8} xs={12} md={12} 
                                    >
                                <Form.Control
                                type="number"
                                name="max_days"
                                value={form.max_days}
                                onChange={handleChange}                                                                       
                                ></Form.Control>
                        
                                </Col>
                        </Form.Group>                    
                        
                    </div>
                    <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > هل يُسمح بترحيل الرصيد؟</Form.Label>
                            <Col lg={9} sm={8} xs={7} md={12} >
                        <fieldset>
                            <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>                                               
                                <Form.Check                        
                                type="radio"                       
                                name="carry_forward"                        
                                value='0'
                                checked={form.carry_forward === '0'}                        
                                onChange={handleChange}
                                />
                                <Form.Label > false </Form.Label>    
                                <Form.Check                        
                                type="radio"                       
                                name="carry_forward"                        
                                value='1'
                                checked={form.carry_forward === '1'}                        
                                onChange={handleChange}
                                />
                                <Form.Label > true </Form.Label>    
                            
                            </Form.Group>
                            </fieldset>
                                
                        
                            </Col>
                        </Form.Group>   
                    </div>
                    <div className="w-100 border text-center gap-4">
                        <button className="btn btn-primary m-3" onClick={handleSubmit}>حفظ</button>
                        <button className="btn btn-primary"onClick={()=>setIsOpen(false)}>إلغاء</button>
                   </div>
                </div>
             }

            <div className="mt-3   p-2 "style={{ }}>
                              
                              <Table_documents
                                   limit={limit}
                              setLimit={setLimit}
                              page={page}
                               header={header}
                               data={type_leaves}
                              // currentUser={currentUser}
                                delete ={handleDelet}
                                setPage={setPage}
                                loading= 'false'                               
                                edit='Leaves'
                                total=''
                                search='name'
                              //   Linksearch={USER}
                              //   createTask={createTask}
                                   role=''
                                />
                      
                                  </div>
         <div className='d-flex gap-3 w-25 align-items-center mt-3 '>
                   <ExportPdf 
                     data={type_leaves}
                    header={header} 
                  />
                <ExportExcel
              data={type_leaves}
                header={header}                
                                   />
         </div> 

        </div>
       }
    </>
    )
}
import './Auth.css'   
import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import axios from "axios";
import HistoryDate from '../../Component/Dashboard/History';
import { useState } from "react"; 
import 'moment/locale/ar';
import { baseUrl, REGISTER } from "../../Api/Api";
 
 import Cookie from 'cookie-universal' ;
 import LoadingSubmit from "../../Component/Loading/Loading";
import customSelectStyles from '../../Component/Dashboard/customStylesSelect';
    
   
   export default function Register(props){  

        const cookie=Cookie();     
         const[loading,setLoading]=useState(false);   
     const[confirmPassword,setConfirmPassword]=useState('');
     const[message,setMessage]=useState('');
    
     // const[department_id,setDepartment_Id]=useState('');

 
     const[form,setForm]=useState({
       name:'',  
       email:'',
       salary:'',
       phone_number:'',
       national_id:'',       
       job_title:'',
       gender:'ذكر', 
       nationality:'',           
       employment_type:'دوام كامل',
       password:'',
       status:'نشط'
             
   });
   
     
   //----------------
   
   
     function handleChange (e){      
       setForm({...form,[e.target.name]:e.target.value})
       }
   
   
   
       
     
     const Country=[ 'اليمن','المملكة العربية السعودية','عمان','قطر','السودان','مصر',
       'المغرب','لبنان','فلسطين','الامارات','سورياء','الاردن','ليبيا','الصومال','الجزائر','العراق','البحرين',]
   
     const options =Country && Country.map(item => ({
       value: item,
       label: item
     }));
   
     // const employment_type=['']
       
   
   
   
        //------------------------function Date-------------------------------------------------------
        ///date selectedDate
       
        const [birth_date, setbirth_date] = useState(new Date()); 
           function handleValuebirth_date (value) {    
             setbirth_date(value);   };
   
       const [hire_date, setHire_date] = useState(new Date());      
           function handleValueHire_date(value) {
           setHire_date(value);      
           };
      
     
   
   async function handleSubmit(e){
     e.preventDefault();
      setLoading(true)
    
     const formData = new FormData();     
       formData.append('name', form.name);  
       formData.append('email', form.email);
       formData.append('salary', '1000');
       formData.append('password', form.password);
       formData.append('phone_number', form.phone_number);
       formData.append('national_id', form.national_id);
       formData.append('birth_date', birth_date); 
       formData.append('hire_date',hire_date);  
       formData.append('job_title', form.job_title);
       formData.append('gender', form.gender);
       formData.append('nationality', form.nationality.value);    
       formData.append('department_id','3');    
       formData.append('role',  'user' );
       formData.append('role_id', '2');   
       formData.append('employment_type', form.employment_type );
       formData.append('status', form.status ); 
       formData.append('admin', '1'); // اضافة تنبية  للمدير بوجود موظف جديد  

         try{               
             const res= await axios.post(`${baseUrl}/${REGISTER}`,formData);          
               const token=res.data.token;      
                cookie.set('h-resurce',token)   ;         
                window.location.pathname=`/dashboard`;
                setLoading(false) ;  
    
            }
            catch(err){                   
         // console.log(err);
              console.log(err.response.data.message);
              setMessage(err.response.data.message)  ;
               setLoading(false) ;             
                // if(err.response.status===422){
                //     setErr('Email is already been taken')
                // }else{setErr('Internal Server Error')}
            }
    
   }
   
 
    
    
       return(

        <>
         {loading && <LoadingSubmit/>} 
           <div className="col-12 col-lg-12 col-md-12 col-sm-12  d-flex  justify-content-center "
             style={{height:'82vh',zIndex:23, position:'relative'}}>               

              <div className="p-2  w-100     text-white
                   fs-5   " style={{position:'absolute' ,zIndex:22,
                    background:'rgb(3, 35, 77)' 
                   }}>
   
                   <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >الاسم</Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} >
                                 <Form.Control  className="w-100 p-2"                                         
                                     type="text" 
                                     name="name"
                                     value={form.name}
                                     onChange={handleChange}
                                     >                        
                                 </Form.Control>
                               </Col>
                       </Form.Group> 
                          <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center
                           justify-content-center " >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > الجنسية </Form.Label>
                        <Col lg={9} sm={8} xs={12} md={12} >
                             <Select className='w-100  text-black '
                                 name='nationality'
                                  onChange={(e)=> setForm({...form,nationality:e })}
                                 options={options}                                                           
                                 placeholder="اختر البلد "
                               styles={customSelectStyles}
                               required
                             >                    
                          </Select> 
                          {(message.length> 0 && form.nationality==='')&&
                               <p className="text-danger m-0" style={{fontSize:'13px'}}>Required</p>                            
                               }
                        </Col>
                       </Form.Group>                    
                                        
             
    
                   </div>
                   <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center"
                       >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > البريد الالكتروني</Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} >
                                 <Form.Control  className="p-2"                                         
                                     type="email" 
                                     name="email"
                                     value={form.email}
                                     onChange={handleChange}>                        
                                 </Form.Control>
                               </Col>
                               {message.includes('The email has already been taken.')&&
                               <p className="text-danger m-0" style={{fontSize:'13px'}}>الايميل هذا مسجل من قبل</p>                            
                               }
                       </Form.Group>                   
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >رقم الهاتف</Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} >
                                 <Form.Control  className="p-2"                                          
                                     type="number"
                                     name="phone_number"
                                     value={form.phone_number}
                                     onChange={handleChange}>                        
                                 </Form.Control>
                               </Col>
                       </Form.Group>                   
                     
    
                   </div>
                   <div className="    w-100       fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                        
                         <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                                 <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8  "   >رقم الهوية الوطنية </Form.Label>
                                 <Col lg={9} sm={8} xs={12} md={12} >
                                   <Form.Control  className="p-2"                                         
                                       type="number" 
                                       name="national_id"
                                       value={form.national_id}
                                       onChange={handleChange}>                        
                                   </Form.Control>
                                   {(message.length> 0 && form.national_id==='')&&
                               <p className="text-danger m-0" style={{fontSize:'13px'}}> ادخل الرقم الوطني</p>                            
                               }
                     
                                 </Col>
                         </Form.Group>                   
                         <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                                 <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >المسمى الوظيفي</Form.Label>
                                 <Col lg={9} sm={8} xs={12} md={12} >
                                   <Form.Control   
                                    className="w-100 p-2"                                          
                                       type="text"
                                       name="job_title"
                                       value={form.job_title}
                                       onChange={handleChange} >                        
                                   </Form.Control>
                                   {(message.length> 0 && form.job_title==='')&&
                               <p className="text-danger m-0" style={{fontSize:'13px'}}>Required</p>                            
                               }
                                 </Col>
                         </Form.Group>                   
                     
    
                   </div>
                   
                   <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center 
                   gap-lg-4 align-items-center justify-content-center  flex-wrap text-danger">                                     
                                                
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center " >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > تاريخ الميلاد</Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} >
                                         <HistoryDate 
                                         name="birth_date"
                                         value={birth_date}
                                         date={birth_date}
                                         // onChange={handleChange}
                                         onChange={(e)=>setHire_date(e.target.value)}
                                     setSelectDate={handleValuebirth_date} 
   
                                             />      
                               </Col>
                       </Form.Group>                   
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > تاريخ التوظيف</Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} >
                                         <HistoryDate
                                         date={hire_date} 
                                     setSelectDate={handleValueHire_date}     
                                             />      
                               </Col>
                       </Form.Group>                   
             
    
                   </div>
                   
   
   
                   <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > الجنس </Form.Label>
                   <Col lg={9} sm={8} xs={7} md={12} >
                     <fieldset>
                       <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>                   
                           <Form.Check
                           type="radio"                                            
                           name="gender"                                                 
                           value="ذكر"
                           checked={form.gender === 'ذكر'}                       
                           onChange={handleChange}            
                                     
                           />
                               <Form.Label > ذكر </Form.Label>
                           
                           
                           <Form.Check
                           
                           type="radio"                       
                           name="gender"                        
                           value='انثى'
                           checked={form.gender === 'انثى'}                        
                           onChange={handleChange}
                           />
                             <Form.Label > انثى </Form.Label>
                     
                       
                       </Form.Group>
                       </fieldset>
                             
                   
                       </Col>
                       </Form.Group>                   
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > نوع العمل </Form.Label>
                   <Col lg={9} sm={8} xs={7} md={12} >
                     <fieldset>
                       <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>                   
                           <Form.Check
                           type="radio"                                            
                           name="employment_type"                                                 
                           value="دوام كامل"
                           checked={form.employment_type === 'دوام كامل'}                       
                           onChange={handleChange}
                                                             
                           />
                            <Form.Label > كامل </Form.Label>    
                           
                           <Form.Check                        
                           type="radio"                       
                           name="employment_type"                        
                           value='دوام جزئي'
                           checked={form.employment_type === 'دوام جزئي'}                        
                           onChange={handleChange}
                           />
                             <Form.Label > جزئي </Form.Label>    
                           <Form.Check                        
                           type="radio"                       
                           name="employment_type"                        
                           value='تعاقد'
                           checked={form.employment_type === 'تعاقد'}                        
                           onChange={handleChange}
                           />
                             <Form.Label > تعاقد </Form.Label>    
                       
                       </Form.Group>
                       </fieldset>
                             
                   
                       </Col>
                       </Form.Group>                   
                                         
    
                   </div>               
                   <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                          
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   > كلمة المرور </Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} >
                               <Form.Control
                               type="password"
                               name="password"
                                 placeholder="At least 6 charecter"
                               value={form.password}
                               onChange={handleChange}                            
                               ></Form.Control>
                               {message.includes('The password field is required.')&&
                               <p className="text-danger m-0" style={{fontSize:'13px'}}>يرجى ادخال كلمة مرور من 6 ارقام فاكثر</p>                            
                               }
                              
                               </Col>
                       </Form.Group>                    
                       <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" 
                       >
                               <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   >تأكيد كلمة المرور </Form.Label>
                               <Col lg={9} sm={8} xs={12} md={12} 
                                 style={{
                                   borderBottom:confirmPassword.length===0 ?'':
                                   (form.password===confirmPassword && confirmPassword.length >=6) ?'4px solid green': '4px solid red'
                                 }} >
                               <Form.Control
                               type="password"
                               name="confirmPassword"
                                value={confirmPassword}
                                placeholder="At least 6 charecter"
                               onChange={(e)=>setConfirmPassword(e.target.value)}
                                                        
                               ></Form.Control>
                     
                               </Col>
                       </Form.Group>                    
    
                   </div>              
   
                 <div className="w-100 border text-center gap-4 ">
                   <button className="btn btn-primary m-3" onClick={handleSubmit}>حفظ</button>
                       <button className=" btn btn-primary m-3 "                        
                              onClick={props.login}> رجوع                               
                                </button>
                   
                   {/* <button className="btn btn-primary">إلغاء</button> */}
                 </div>
                    
              
   
               </div>
           </div>
        </>
        
       )
   }
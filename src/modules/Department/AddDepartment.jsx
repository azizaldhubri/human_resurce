 import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import HistoryDate from "../../Component/Dashboard/History";
import { useEffect,  useState } from "react"; 
import 'moment/locale/ar';
import { Link } from "react-router-dom"; 
 
import { Axios } from "../../Api/axios";
import { Departments, USERS } from "../../Api/Api";
import TranFormDate from "../../Helpers/TranFormDate";
import NavHeader from "../../Component/Dashboard/NavHeader";
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";
 

export default function AddDepartment(){  
  const[users,setUsers]=useState([]); 
 
  const[message,setMessage]=useState('');
   
  const[form,setForm]=useState({
    department_name:'',
    responsible_manager:'',
     Status :'نشط', 
     location :'', 
     description :'',                  
});
 

  useEffect(()=>{
    async function getUser(){
      try{ await Axios.get(`${USERS}`)
        .then(res =>{setUsers(res.data.data.data);
          // console.log(res.data.data.data)
        })
       }
      catch(err){
        console.log(err)
      }
    }
    getUser();

  },[]) 
    

  function handleChange (e){      
    setForm({...form,[e.target.name]:e.target.value})
    }



  const managers =users && users.map(item => ({      
      value: item.id,
      label: item.name,
  }));

     //------------------------function Date-------------------------------------------------------
     ///date selectedDate
 

     const [date, setDate] = useState(new Date()); 
    
      
     const creation_date =TranFormDate( date) 
    //  const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);

 
   

   function HandleCreation_date (value) {    
    setDate(value);       
    
  };
  

async function handleSubmit(e){
  e.preventDefault();
 
  const formData = new FormData();   
    formData.append('department_name', form.department_name);
    formData.append('responsible_manager', form.responsible_manager.label);
    formData.append('description', form.description);    
    formData.append('location', form.location);
    formData.append('creation_date',date);      
    formData.append('Status', form.Status);
 
    try{       
        // console.log(...formData)
       await Axios.post(`${Departments}/add`,formData )  ;      
     window.location.pathname='/dashboard/departments'      
       
    }
    catch(err){
      // console.log(err)
      console.log(err.response.data.message);
      setMessage(err.response.data.message)
    }
}

 const links=[
                {name:' كل الاقسام',
                 link:'/dashboard/departments'
                },                
              ]
 
    return(
        <div className="w-100  border  border-primary   col-12 col-lg-12 col-md-12 col-sm-12  "
        style={{}}>
            <div className="w-100 d-flex  col-12 col-lg-12 col-md-12 col-sm-12   flex-column  ">               
                  <NavHeader nav={links}  />   
                                     
                <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > اسم القسم</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                         
                                  type="text" 
                                  name="department_name"
                                  value={form.department_name}
                                  onChange={handleChange}
                                  >                        
                              </Form.Control>
                            </Col>
                    </Form.Group>                   
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >المدير المسؤول</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                            <Select className='w-100   '
                    name='responsible_manager'
                    onChange={(e)=> setForm({...form,responsible_manager:e })}             
                      options={managers}                                                           
                      placeholder="اختر مسؤول القسم "
                    styles={customSelectStyles}
                    required
                  >                            
                  </Select> 
                  {(message.length> 0 && form.responsible_manager==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>Required</p>                            
                            }
                            </Col>
                    </Form.Group>                   
          
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center"
                    >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > الوصف</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >                             
                              <Form.Control as="textarea" aria-label="With textarea"
                              name="description"
                              value={form.description}
                              onChange={handleChange}
                              ></Form.Control>
                            </Col>
                            {message.includes('The email has already been taken.')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>الايميل هذا مسجل من قبل</p>                            
                            }
                    </Form.Group>                   
                                    
                  
 
                </div>
                <div className="    w-100       fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                      <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                              <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8  "   >الموقع</Form.Label>
                              <Col lg={9} sm={8} xs={12} md={12} >
                                <Form.Control  className="p-2"                                         
                                    type="text" 
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}>                        
                                </Form.Control>
                                {(message.length> 0 && form.location==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}> ادخل الرقم الوطني</p>                            
                            }
                  
                              </Col>
                      </Form.Group>                   
                      <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                              <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >تاريخ المنشئ</Form.Label>
                              <Col lg={9} sm={8} xs={12} md={12} >
                                      <HistoryDate 
                                      date={date}
                                     setSelectDate={HandleCreation_date}     
                                          />      
                            </Col>
                      </Form.Group>                   
                  
 
                </div>
                
                 
               


                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > الحالة </Form.Label>
                <Col lg={9} sm={8} xs={7} md={12} >
                  <fieldset>
                    <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>                   
                        <Form.Check
                        type="radio"                                            
                        name="Status"                                                 
                        value="نشط"
                        checked={form.Status  === 'نشط'}                       
                        onChange={handleChange}            
                                  
                        />
                            <Form.Label > نشط </Form.Label>
                        
                        
                        <Form.Check                        
                        type="radio"                       
                        name="Status"                        
                        value='غير نشط'
                        checked={form.Status  === 'غير نشط'}                        
                        onChange={handleChange}
                        />
                          <Form.Label > غير نشط </Form.Label>                  
                    
                    </Form.Group>
                    </fieldset>                    
                
                    </Col>
                    </Form.Group>                   
                                     
                                      
 
                </div>
                
                

              <div className="w-100 border text-center gap-4">
                <button className="btn btn-primary m-3" onClick={handleSubmit}>حفظ</button>
                <button className="btn btn-primary">
                  <Link to='/dashboard'>إلغاء</Link>
                </button>
              </div>
                 
           

            </div>
        </div>
    )
}
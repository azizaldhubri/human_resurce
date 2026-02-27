import { useEffect, useState } from "react"; 
import { Axios } from "../../Api/axios";
import { Link, useParams } from "react-router-dom";
import { Col, Form } from "react-bootstrap";

export default function LeavesTypeUpdate(){
    const{id}=useParams();  
    const[form,setForm]=useState({
            name:'',
            max_days:'',
            carry_forward:'',
        });

    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})     }

    useEffect(()=>{
        async  function Type_leaves(){
                try{
                     await Axios.get(`leavesType/${id}`)
                    .then(res=>                
                            setForm({
                                name:res.data.name||'',
                                max_days:res.data.max_days||'',
                               carry_forward:`${res.data.carry_forward}`||''  })                    
                         )  ;                                   
                }
                catch(err){  console.log(err) }
            }
            Type_leaves();
    
    },[])

    

     async function handleSubmit(e){
        e.preventDefault();       
          try{                         
             await Axios.post(`leavesType/${id}`,form )  ;                
            window.location.pathname='/dashboard/LeavesType'
             
          }
          catch(err){            
            console.log(err.response);            
          }
      }
  
    return(
        <div className="w-100 px-2 py-2 border">
            <div className="w-100   me-4 pt-3 d-flex gap-3">
                 <Link to='/dashboard/Leaves/LeavesType'>رجوع</Link>
                 
            </div>
            
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
                        
                   </div>
                </div>
             
        </div>
    )
}
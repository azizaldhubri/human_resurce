import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios"; 
import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import HistoryDate from "../../Component/Dashboard/History";
import '../../Css/components/select.css' ;
import NavHeader from "../../Component/Dashboard/NavHeader";
 import Swal from 'sweetalert2';
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";
export default function AddAllowances(){   
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState(null);
    const [allowanceType, setallowanceType] = useState("");
    const [allowanceAmount, setAllowanceAmount] = useState("");  
    
    useEffect(() => {       
        fetchEmployees();
    }, []);

    const [allowanceDate, setAllowanceDate] = useState(new Date());      
        function handleValueHire_date(value) {
            setAllowanceDate(value);      
        };

    const fetchEmployees = async () => {
        try{ 
        const response = await Axios.get("users");
        setEmployees(response.data.data.data);
        }
        catch(err){console.log(err)}
    };

    const handleAddAllowances = async () => {
        const formData=new FormData(); 
        formData.append('employee_id', employeeId);
        formData.append(' effective_date', allowanceDate );
        formData.append(' allowance_type', allowanceType );
        formData.append(' amount', allowanceAmount );
     try{         
           await Axios.post("allowances", formData );          
        // alert(res.data.message) ;
             Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم إضافة الحافز بنجاح",
        confirmButtonText: "حسناً"
      });
        setEmployeeId(null);
         setallowanceType('');
         setAllowanceAmount('');
        //  handleChange();

       }
        catch(err){
          console.log(err)
         Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.response?.data?.message || "حدث خطأ غير متوقع",
        confirmButtonText: "إغلاق"
      });
        
        }
        };    
    
      const options =employees && employees.map(item => ({
        value: item.id,
        label: item.name
      }));
 
      const handleChange = (selected) => {
        setEmployeeId(selected.value); // تحديث الحالة بالقيمة المحددة
      };
  
       const links=[
            {name:'إضافة حافز',
             link:'#'},    
          ]
          
          return (
            <div className=" ">
              <NavHeader nav={links}  />
            {/* <h2>إدارة المرتبات</h2>        */}
        
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > اختر موظف </Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >

                          <Select 
                        //   className='custom-select   list menuList'
                              options={options}                             
                              value={employeeId !=null ? employeeId.label  :'اختر موظف '}
                              name="employeeId"                            
                            onChange={handleChange}
                              placeholder="اختر موظف "
                            styles={customSelectStyles}                             
                            // classNamePrefix="custom-select"

                            required
                          >                    
                       </Select>                        
                     </Col>
            </Form.Group> 
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > تاريخ الميلاد</Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                                <HistoryDate
                                name="allowanceDate"
                                value={allowanceDate}
                                date={allowanceDate}                               
                                onChange={(e)=>setAllowanceDate(e.target.value)}
                            setSelectDate={handleValueHire_date}
                                    />      
                    </Col>
             </Form.Group> 
             </div>
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > نوع الحافز</Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >
                          <Form.Control className='w-100   '
                          type="text"
                          placeholder="نوع الحافز" 
                          value={allowanceType}
                          onChange={(e) => setallowanceType(e.target.value)}                             
                          >                    
                       </Form.Control>                        
                     </Col>
            </Form.Group> 
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > المبلغ المضاف</Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                    <Form.Control className='w-100   '
                     type="number"
                      placeholder="المبلغ المضاف"
                      value={allowanceAmount}
                      onChange={(e) => setAllowanceAmount(e.target.value)}                              
                             > 
                  </Form.Control>   
                    </Col>
             </Form.Group> 
             </div>  
             <div className="w-100  d-flex align-items-center justify-content-center">
                <button className="mt-3 btn btn-primary "
                
                onClick={handleAddAllowances}>إضافة حافز</button>
                </div>         
        </div>
    );
}
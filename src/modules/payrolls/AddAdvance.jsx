 import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios"; 
import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import HistoryDate from "../../Component/Dashboard/History";
import '../../Css/components/select.css' ;
import NavHeader from "../../Component/Dashboard/NavHeader";
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";
 
export default function AddAdvance(){   
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState(null);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState(""); 
   
 
    
    useEffect(() => {       
        fetchEmployees();
    }, []);

    // console.log(form)

    const [advanceDate, setAdvanceDate] = useState(new Date());      
        function handleValueHire_date(value) {
          setAdvanceDate(value);          
        };

    const fetchEmployees = async () => {
        try{ 
        const response = await Axios.get("users");
        setEmployees(response.data.data.data);
        }
        catch(err){console.log(err)}
    };

    const handleChange = (selected) => {
      setEmployeeId(selected.value); // تحديث الحالة بالقيمة المحددة
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData() ;
    formData.append('employee_id',employeeId)
    formData.append('type','deduction')
    formData.append('amount',amount)
    formData.append('note',note)
    formData.append('date',advanceDate)
    try {
    
      await Axios.post("advances", formData);          
    setEmployeeId(null);  setAmount('') ;setNote('');
    } catch (err) {
      console.error(err);
      // setMessage("حدث خطأ أثناء الإضافة");
    }
  };

    
    
      const options =employees && employees.map(item => ({
        value: item.id,
        label: item.name
      }));
  
    
  
       const links=[
            {name:'إضافة سلفة',
             link:'#'},    
          ]
          
          
          return (
            <div className=" ">
              <NavHeader nav={links}  />
            {/* <h2>إدارة المرتبات</h2>        */}
        
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > اختر موظف </Form.Label>
                     
                     <Col lg={9} sm={8} xs={6} md={9} >
                      <Select className='w-100   '
                        name='employeeId'
                        value={employeeId !=null ? employeeId.label  :'اختر موظف '}
                        onChange={handleChange}             
                          options={options}                                                           
                          placeholder="user"
                        styles={customSelectStyles}
                        required
                      >                            
                      </Select> 
                    </Col>
            </Form.Group> 
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > تاريخ الميلاد</Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                                <HistoryDate
                                name="advanceDate"
                                value={advanceDate}
                                date={advanceDate}                                                               
                                  onChange={(e)=>setAdvanceDate(e.target.value)}
                                  setSelectDate={handleValueHire_date}                             
                                    />      
                    </Col>
             </Form.Group> 
             </div>
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > المبلغ</Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                    <Form.Control className='w-100   '
                     type="number"
                     name="amount"
                      placeholder="المبلغ  "
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}                                               
                             > 
                  </Form.Control>   
                    </Col>
             </Form.Group>
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > ملاحظات</Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >
                     <textarea name="note" value={note} onChange={(e) => setNote(e.target.value)}  ></textarea>

                         
                     </Col>
            </Form.Group> 
            
             </div>  
             <div className="w-100  d-flex align-items-center justify-content-center">
                <button className="mt-3 btn btn-primary "
                
                onClick={handleSubmit}>إضافة السلفة</button>
                </div>         
        </div>
    );
}

import React, { useEffect, useState } from 'react'; 
import {Form  } from "react-bootstrap"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Axios } from '../../Api/axios';
import PaginatedItems from '../../Component/Pagination/Pagination';
 

const EmployeeChart = () => { 
  const [salaryData, setSalaryData] = useState([]);  
  const[page,setPage]=useState(1)  
  const[limit,setLimit]=useState(2)
  const[total,setTotal]=useState(1);

  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // يضيف صفر بادئ إذا كان أقل من 10
  const year = date.getFullYear(); 

  const currentDate = `${month}-${year}`;
  


  useEffect(() => {
        // getAllPayrolls();
        getAllPayrolls2();
  }, [limit,page]);

//   const getAllPayrolls = async () => {
         
//     try{ await Axios.post("employee-stats")        
//         .then(res => {             
//             const formatted = res.data.map(item => ({
//               name: item.name || `موظف ${item.employee_id}`,
//               basic_salary: parseFloat(item.basic_salary),
//               total_allowances: item.total_allowances,
//               total_deductions: item.total_deductions,
//               net_salary: item.net_salary,
//             }));
//             setSalaryData(formatted);             
//           });
//     }
//     catch(err){console.log(err)}
   
// };
  const getAllPayrolls2 = async () => {         
    try{ await Axios.post(`employee_pignate?limit=${limit}& page=${page}`)        
        .then(res => {                        
            const formatted = res.data.data.map(item => ({              
              name: item.name || `موظف ${item.employee_id}`,
              basic_salary: parseFloat(item.basic_salary),
              total_allowances: item.total_allowances,
              total_deductions: item.total_deductions,
              net_salary: item.net_salary,
            }));
            setSalaryData(formatted); 
            setTotal(res.data.pagination.total) ; 
            // console.log(new Date())   
           
          });
    }
    catch(err){console.log(err)}
   
};

function selectPage(n){ 
  setPage(n)
}

  return (   
    <div  className='border mt-2 ' style={{ width: '100%',height:'100%'  }}>
    <h2 style={{ textAlign: 'center' }}>رواتب الموظفين شهر {currentDate}</h2>
    <ResponsiveContainer>
      <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend  className='mt-2 mb-2'/>
        <Bar dataKey="basic_salary" fill="#3498db" name="الراتب الأساسي" />
        <Bar dataKey="total_allowances" fill="#2ecc71" name="الحوافز" />
        <Bar dataKey="total_deductions" fill="#e74c3c" name="الخصومات" />
        <Bar dataKey="net_salary" fill="#9b59b6" name="صافي الراتب" />
      </BarChart>
    </ResponsiveContainer>

    <div className='  w-100 d-flex align-items-center justify-content-center gap-4 border'>
    
      <div className="    border  pt-1">           
          <PaginatedItems 
          // setPage={page} 
          setPage={selectPage} 
          itemsPerPage={limit} 
          // data={salaryData}
          total={total}/>
          
      </div>           
      <div className="col-2 ">
          <Form.Select           
          className="col-2  ps-3   "
          onChange={(e)=>setLimit(e.target.value)} aria-label="Default select example"
          style={{ width: '70px',paddingLeft:'30px' ,fontSize:'15px' }}>       
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='5'>5</option>
              <option value='10'>10</option>
                </Form.Select>
      
      </div>

     </div>
    
  </div>
);
};

export default EmployeeChart;

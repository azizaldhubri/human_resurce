 import { Axios } from "../../Api/axios";
import { useEffect, useState } from "react";   
import NavHeader from "../../Component/Dashboard/NavHeader";
 import ExportPdf from "../../Component/Dashboard/ExportPdf";
import Table_documents from "../../Component/Dashboard/Table_document";
import ExportExcel from "../../Component/Dashboard/ExportExcel";
 
 
export default function EmployeesOnLeave(){  
 
    const [employees, setEmployees] = useState([]);     
        const[limit,setLimit]=useState(3)
        const[page,setPage]=useState(1)         
        const[total,setTotal]=useState(0);
  
    useEffect(() => {     
      Axios.get("/employees-on-leave")
        .then(response => {setEmployees(response.data)  })
        .catch(error => console.error("Error fetching employees on leave:", error));
    }, []);

  
    const header=[           
      {key:'employee.name',name:'الموظف'},     
      {key:'leave_type.name',name:'نوع الإجازة'},
      {key:'start_date',name:'تاريخ البداية'} ,
      {key:'end_date',name:'تاريخ النهاية'}    
      ] 
  
 
  const links=[
      {name:'الإجازات',
       link:'#'},   ]
   
    return (
      <div className="w-100 px-3 py-3">         
        <NavHeader nav={links}  />        

           <Table_documents
              limit={limit}
              setLimit={setLimit}
               page={page}
              header={header}
              data={employees}              
              setPage={setPage}
              loading='loading'
              edit='users'
              total={total}
              search='name'                          
                  role='admin'
              />
            <div className=' d-flex gap-3 w-50 align-items-center mt-3 '>
              <ExportPdf 
                header={header}
                data={employees}  
                    />
              <ExportExcel
                data={employees}
                header={header}                
                />

            </div>
      </div>
    );
  };
  
 

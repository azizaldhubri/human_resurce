import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";  
import Table_documents from "../../Component/Dashboard/Table_document";
import ExportExcel from "../../Component/Dashboard/ExportExcel";
 import ExportPdf from "../../Component/Dashboard/ExportPdf";

export default function LeaveBalancesTable() {
    const [leaveBalances, setLeaveBalances] = useState([]);
    const[limit,setLimit]=useState(3)
        const[page,setPage]=useState(1)         
        const[total,setTotal]=useState(0);

    useEffect(() => {
        async function fetchLeaveBalances(){
        try{           
               const res=await Axios.get(`leave-balances?limit=${limit}&page=${page}`)              
                            setLeaveBalances(res.data.data.data) ;
                            setTotal(res.data.pagination.total) 
            }
        catch(err){console.log(err);   }
            };
        fetchLeaveBalances();
    }, [limit,page]);
     
 
  const header=[           
      {key:'employee.name',name:'الموظف'},        
      {key:'leave_type.name',name:'نوع الإجازة'}, 
      {key:'used_days',name:'المستَخدم'} ,   
      {key:'total_days',name:'عدد الأيام الكلي'} ,
      {key:'remaining_days',name:'المتبقي'}    
      ] 

    //   console.log(leaveBalances)
    return (
        <div className="container px-2 py-3 ">
            <h3 className="m-2 ">أرصدة الإجازات</h3> 

             <Table_documents
                limit={limit}
                setLimit={setLimit}
                page={page}
                header={header}
                data={leaveBalances}              
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
                    data={leaveBalances}  
                        />
                    <ExportExcel
                    data={leaveBalances}
                    header={header}                
                    />
    
                </div>


        </div>
    );
};



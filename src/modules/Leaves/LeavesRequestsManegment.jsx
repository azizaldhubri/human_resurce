 
import { useContext, useEffect,  useState } from "react"; 
import { Axios } from "../../Api/axios";
 
import TableShow from "../../Component/Dashboard/Table";
 
import NavHeader from "../../Component/Dashboard/NavHeader";
import { Menu } from "../../Component/Context/MenuContext";

 export default function LeavesRequestsManegment(){
  const [leave_requests, setLeave_requests] = useState([]); 
  const[page,setPage]=useState(1)
  const[limit,setLimit]=useState(3)
  const[loading,setLoading]=useState(false)
 

    const menu=useContext(Menu)    
    let setIsupdated=menu.setIsupdateNotifaction ;

    function handelUpateNotifaction(){        
        setIsupdated((perv)=>!perv) ;  
  }

     


      useEffect(()=>{         
              leaves_Requests();          
      },[limit])
      

    async  function leaves_Requests(){
        try{                     
            await Axios.get(`leave-requests? limit=${limit}&page=${page}`)
            .then(res=>{setLeave_requests(res.data.data)
                // ;console.log(res.data.data)
                     }
            )  ;  
            // .then(res=>{console.log(res.data);})  ;  
            
        }
        catch(err){ console.log(err); }
    }

   
async function handleStatusUpdate(id, status){
    try{         
        await Axios.post(`leave-requests/${id}/status`,{
            status:status ,
             comments: status === "approved" ? "تمت الموافقة" : "تم الرفض",
             link_notification:status === "approved" ? '/dashboard/LeaveBalancesTable':'/dashboard/LeavesRequestsManegment',
        })
        .then(res=>console.log(res.data))
        leaves_Requests();
        handelUpateNotifaction();         
    }
    catch(err){console.log(err.response.data.message) ;
      {  err.response.data.message==='رصيد الإجازة غير كافٍ!' &&
        alert('رصيد الإجازة غير كافٍ!')}
        leaves_Requests(); 
    }
 }

 async function fetchNotifications () {
    // const token = localStorage.getItem("token");
    const response = await Axios.get('notifications');   
};
useEffect(() => {
    fetchNotifications();
}, []);


      
  const header1=[          
    {
        key:'employee_id',
        name:'رقم الموظف'       
    },
    {
        key:'employee_name',
        name:'اسم الموظف'      
    },
    {  
        key:'leave_type',
        name:'نوع الإجازة'      
    }
    ,
    {     key:'start_date',
        name:'بداية الإجازة  '      
    } ,
    {
         key:'end_date',
        name:'تاريخ انتهاء الاجازه'       
    }
     ,
    {
         key:'total_days',
        name:'عدد الإيام'       
    }
     ,
    {
        key:'reason',
        name:'السبب'       
    }
     ,
    {
        key:'status',
        name:'الحالة'       
    }
    
     ,
    {
        key:'approver',
        name:'	الموافِقة'    }
     ,
    {
        key:'file_paths',
        name:'	المرفقات'    }
     ,
    {
        key:'opration',
        name:'العمليات'    }
] 
const links=[
    {name:'طلبات الاجازة',
     link:'#'},    
  ]
    
    return(
        <div className="w-100  border  border-primary   col-12 col-lg-12 col-md-12 col-sm-12  px-1 py-1   " >
           <NavHeader nav={links}  />  
                <div className="mt-0   p-2 pt-0 "style={{ }}>                
                          <TableShow
                          limit={limit}
                          setLimit={setLimit}
                          page={page}
                          header={header1}
                          data={leave_requests}
                          // currentUser={currentUser}
                          // delete ={handleDelet}
                          setPage={setPage}
                          loading={loading}
                          edit=''
                          total={0}
                          search='name'
                            Linksearch={leave_requests}
                            handleStatusUpdate={handleStatusUpdate}
                          //   createTask={createTask}
                              role= ''>
          
                          </TableShow>
                          
                  
                       </div> 

             {/* <div className='d-flex gap-3 w-25 align-items-center mt-3 '>
             
                <ExportExcel
                  data={leave_requests}
                  header={header1} />
                             
                  <PdfExportComponent
                  data={leave_requests}
                  header={header1} 
                  />
            </div>    */}


        </div>        
    )
}
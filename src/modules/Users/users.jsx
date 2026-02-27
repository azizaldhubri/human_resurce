 import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api"; 
import Table_documents from "../../Component/Dashboard/Table_document";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import ExportExcel from "../../Component/Dashboard/ExportExcel";  
import NavHeader from "../../Component/Dashboard/NavHeader"; 
import ExportPdf from "../../Component/Dashboard/ExportPdf";
 
 

export default function Users(){
    const[users,setUsers]=useState([]);     
    const[limit,setLimit]=useState(3)
    const[page,setPage]=useState(1)
    // const[loading,setLoading]=useState(false)
    const[total,setTotal]=useState(0);
    // const[role,setRole]=useState('');

 

    useEffect(()=>{
     async  function Getusers(){
            try{
            //   const res=await Axios.get(`/${USERS}`)  ;              
            //   =await Axios.get(`/${USERS}`)  ;
              const res=await Axios.get(`${USERS}?limit=${limit}&page=${page}`)              
              setUsers(res.data.data.data) ;
              setTotal(res.data.pagination.total)             
            }
            catch(err){
                console.log(err)
            }
        }
        Getusers();
    },[limit,page])

 
    const header=[
          
        {
            key:'name',
            name:'الاسم'
        },        
      
        {
            key:'email',
            name:'الايميل'
        },
        {
            key:'gender',
            name:'الجنس'
        },
        {
             
            key: 'department.department_name', name: 'القسم' 
             
        },
        {
            key:'salary',
            name:'المرتب '
        },
        {
            key:'nationality',
            name:'الجنسية'
        },
        {
            key:'phone_number',
            name:'رقم الهاتف'
        },
        {
            key:'job_title',
            name:'المسمى الوظيفي'
        },
    
        {
            key:'role',
            name:'الصلاحية'
        },
        {
            key:'action',
            name:'العمليات'
        },
     ] 

     
    //  console.log(users)
     async function handleDelet(id){
        try{
         await Axios.delete(`${USER}/${id}`);
         setUsers((prev)=>prev.filter((item)=>item.id!==id)) ;
                              
         }
        catch(err){
                    console.log(err)
               }         
       }
 
    
       
    const links=[
        {name:'المستخدمين',
         link:'#'
        },        
      ]   
    return(
        <div className="  w-100  px-1 py-1    "
        style={{}}>
               <NavHeader nav={links}  /> 
            
            <div className="w-25 d-flex justify-content-between fs-4  me-3">                 
                <Link to='add' className="text-danger">إضافة موظف +</Link>
            </div>             
            <div className="mt-0   p-2 "style={{ }}>
                  
                  <Table_documents
                       limit={limit}
                  setLimit={setLimit}
                  page={page}
                   header={header}
                   data={users}
                  // currentUser={currentUser}
                    delete ={handleDelet}
                    setPage={setPage}
                    loading='loading'
                    edit='users'
                    total={total}
                    search='name'
                  //   Linksearch={USER}
                  //   createTask={createTask}
                       role='admin'
                    />
          
                      </div>
                      
             <div className=' d-flex gap-3 w-50 align-items-center mt-3 '>
             
               <ExportExcel
               data={users}
               header={header}                
               />              
    
              <ExportPdf 
                header={header}
                data={users}
                
                   />
              
               </div> 

         
        </div>
    )
}
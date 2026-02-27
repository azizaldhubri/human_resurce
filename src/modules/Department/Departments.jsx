import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { Departments } from "../../Api/Api";
import Table_documents from "../../Component/Dashboard/Table_document";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function Department(){

    const[departments,setDepartments]=useState([]);
    const[limit,setLimit]=useState(3);
      const[page,setPage]=useState(1)
    // const[loading,setLoading]=useState(false)
    const[total,setTotal]=useState(0);
    // const[role,setRole]=useState('');

    useEffect(()=>{
        async function handleGetDepartments(){    
            try{                        
              const res= await Axios.get(`departmentsPignate?limit=${limit}&page=${page}`)
                setDepartments(res.data.data.data);
                    // console.log(res.data.data)
                    setTotal(res.data.pagination.total) ; 
               
                }
            catch(err){
                console.log(err)
            }    
        }
        handleGetDepartments();
    },[limit,page])
   
    const header=[
          
        {  
            key:'department_name',
            name:'اسم القسم',
           
        },     
        {
            key:'description',
            name:'الوصف',
           
        },
        {
            key:'responsible_manager',
            name:'المدير المسؤول',           
        },
        {
            key:'location',
            name:'الموقع',
           
        },
        {
            key:'creation_date',
            name:'التاريخ المُنشأ',
            
        },
        {
            key:'Status',
            name:'الحالة',
            
        },     
        {
            key:'action',
            name:'العمليات'
        },
     ]
      async function handleDelet(id){
             try{
              await Axios.delete(`${Departments}/${id}`);
              setDepartments((prev)=>prev.filter((item)=>item.id!==id)) ;
                                   
              }
             catch(err){
                         console.log(err)
                    }         
            }

            const links=[
                {name:'الاقسام',
                 link:'#'
                },                
              ]

    return(
        <div className="w-100">
                <NavHeader nav={links}  />                         
                <div className=" fs-4  me-3">                 
                    <Link to='add' className="text-danger">إضافة قسم +</Link>
                </div>              
                <div className="   p-2 "style={{ }}>                              
                        <Table_documents
                            limit={limit}
                           setLimit={setLimit}
                           page={page}
                           header={header}
                            data={departments}
                            // currentUser={currentUser}
                            delete ={handleDelet}
                            edit='departments'
                            setPage={setPage}
                            loading='false'
                            total={total}
                            search='name'
                        //   Linksearch={USER}
                        //   createTask={createTask}
                            role='admin'
                        />
                
                </div>
                     
                     
        </div>
        
    )
}
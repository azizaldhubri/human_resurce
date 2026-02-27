import {  faPenToSquare,   faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Form  } from "react-bootstrap"
import { Link } from "react-router-dom"
import {  useEffect, useState } from "react";
// import PaginatedItems from "../../Pages/Dashboard/Pagination/Pagination";
// import PaginatedItems from "../../pages/Pagination/Pagination";
import { Axios } from "../../Api/axios";
import TranFormDate from "../../Helpers/TranFormDate";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { typeFile } from "../../Helpers/Files";
import File_Name from "../../Helpers/File_Name";
import File_Path from "../../Helpers/File_path";
import StringSlice from "../../Helpers/StringSlice";

 export default function TableShow(props){ 
  
    // const p_user=window.location.pathname.slice(-5);

    const currentUser=props.currentUser || { name:''  } ;
    const Isadmin=props.role || { name:''  } ;
          
    const[search,setSearch]=useState('')
    const[date,setDate]=useState('')
    const[filteredData,setFilteredData]=useState([])
    const[loadingSearch,setLoadingSearch]=useState(false)
    
 
        
        const filterdDatabyDate=props.data.filter(
            (item)=>TranFormDate(item.created_at)===date)

        const filterdSearchbyDate=filteredData.filter(
            (item)=>TranFormDate(item.created_at)===date)            
           
     const showwitchData=
            date.length !==0 ?            
            search.length>0 ? 
            filterdSearchbyDate
            : filterdDatabyDate
            :search.length>0 ?filteredData:props.data
              
        useEffect(()=>{
            const debounce= setTimeout(()=>{
                search.length>0 ? getSearchData():setLoadingSearch(false);
            },500);
           
            return ()=>clearTimeout(debounce);
        },[search])
        
        async function getSearchData(){
            
            try{
                const res=await Axios.post(`/${props.Linksearch}/search?title=${search}`)            
                // console.log(res.data)
                setFilteredData(res.data)
            }
            catch(err){console.log(err)}
            finally{setLoadingSearch(false)}
        }
        
        // Table header Show
        
        //    const start=(props.page-1)*props.limit ;
        //    const end=start + (+props.limit) ;
        //    const final=props.data.slice(start,end);
        
        //---------------------------------table------------------        

        const style_Cell=
        {  maxWidth:100,
          fontSize: '15px',  // تغيير حجم الخط
          fontWeight: 'bold', // جعل الخط عريضًا
          borderRight: '2px solid black', // إضافة border للخلايا
          backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
          borderColor:'#c2c5c5',
          borderBottom:'3px solid gray',
          textAlign: 'center'}

          const body_Cell={
            maxWidth:100,
            fontSize: '15px',          
            borderRight: '2px solid black',              
            borderColor:'#c2c5c5',
            borderBottom:'3px solid gray',
            textAlign: 'center'
          }
 
     const headerShow=props.header.map((item,index)=> 
        <TableCell 
        key={index}
        sx={style_Cell}
                // sx={{ 
        //     maxWidth:100,
        //     fontSize: '15px',  // تغيير حجم الخط
        //     fontWeight: 'bold', // جعل الخط عريضًا
        //     borderRight: '2px solid black', // إضافة border للخلايا
        //     backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
        //     borderColor:'#c2c5c5',
        //     borderBottom:'3px solid gray',
        //     textAlign: 'center'
        //   }}
        >{item.name}</TableCell> 
    );

 
  
     const datashow=showwitchData.map((item,index)=>(        
     <TableRow key={index} >         
        <TableCell sx={body_Cell} >{item.id}</TableCell>
        {props.header.map((item2,index2)=>(
            
            <TableCell  key={index2} sx={body_Cell} >
            
                {item2.key==='image'?(
                    <img width='50px' src={item[item2.key]} alt="" />
                    ):item2.key==="images"? (
                    <div className="d-flix align-items-center justify-content-between  gap-2 ">
                        {  item[item2.key].map((img,nm )=>(
                            <img key={nm} width='50px' src={img.image} alt=""/>
                            ) )}

                    </div>
                   
                    ) 
                        :item2.key==="role"?
                        ( item[item2.key] )
                        :(item2.key==="employee_name"  )  ?( (item.employee.name))
                        :(item2.key==="employee_id"  )  ?( (item.employee_id))
                        :(item2.key==="leave_type"  )  ?( (item.leave_type.name))
                        :(item2.key==="file_paths"  )  ?(  
                           <div className="  d-flex align-items-center justify-content-center">
                                {/* <p className="p-3 pb-0">{item2.title} </p>                         */}
                                {  item.file_paths.length>0 ?
                                    <div className=" d-flex gap-3   py-3 px-3  flex-wrap   ">                                       
                                        {  item.file_paths && item.file_paths.map((file,i)=>                    
                                        
                                        <div key={i} className=" "style={{width:'100px'}}>                     
                                        {  typeFile.map((typfile,k)=>
                                        <div key={k}>
                                        {typfile.name.includes(file.split('.').pop())&&(
                                            <div>
                                            <img  src={typfile.type =='img'? ` ${typfile.pathimg}/${file}`:` ${typfile.pathimg}`} 
                                                width='30px' height='30px' alt="img"></img>                   
                                            <p className="m-0">{StringSlice((File_Name(file,i)),10)}</p>   
                                            <a className="fs-5 text-danger"  href={typfile.type =='img'?`${typfile.pathDownload}/${File_Path(file,i)}`
                                            :`${typfile.pathDownload}/${File_Path(file,i)}`} >Download</a>
                
                                            </div>
                                        )}
                                        </div>)}         
                                    </div>
                
                                        ) }
                                    </div>
                                    : <p className="m-0  ">لا توجد مرفقات</p>
                                }
                            </div>
                        )                       
                        :(item2.key==="status"  )  ?( item.status === "pending" ? "قيد الانتظار" : item.status === "approved" ? "موافق عليه" : "مرفوض")
                        :(item2.key==="approver"  )  ?(  item.status === "pending"? "لم يتم الموافقة بعد":(item.approver?.name ))
                        :(item2.key==="opration"  )  ?(item.status === "pending" ? (
                            <>
                                <button onClick={() => props.handleStatusUpdate(item.id, "approved")} className="approve-btn">موافقة ✅</button>
                                <button onClick={() => props.handleStatusUpdate(item.id, "rejected")} className="reject-btn">رفض ❌</button>
                                
                            </>
                        ) : (
                            item.status === "approved" ? "موافَق عليه" : "مرفوض"
                        ))
                        
                        :item[item2.key]==='employee_name'?(
                            <p style={{color:'red', margin:'0'}}>{item[item2.key]} (you)</p>
                        )
                        :(item2.key==="month" )  ?( (item.month+'/ '+ item.year))
                        :(item2.key==="created_at" || item2.key==="updated_at")  ?(TranFormDate(item[item2.key]))
                        :(item[item2.key]
                        )}
                      
                    
                    
            </TableCell>
                   
            
            
        ))}
         {Isadmin==='admin' &&
        <TableCell sx={body_Cell} >    
            
            <div className="d-flex align-items-center  justify-content-center gap-3">
            <Link to={`${item.id}`}>                  
            <FontAwesomeIcon  fontSize={'19px'} icon={faPenToSquare} />
            </Link> 
            {currentUser.name !==item.name &&
            <>
            <FontAwesomeIcon 
            onClick={()=>props.delete(item.id)}
                fontSize={'19px'} 
            color="red"
            cursor={'pointer'}
            icon={faTrash} />
            {/* {User_adimn && */}
                   
            {/* } */}
                           
            </>
                }                              
        </div>
                
            
        </TableCell>
        }

    </TableRow>)
    )
   
return(         
 <>
 {/* {props.loading && <LoadingSubmit/>} */}
   {/* <div className="col-3">
       <Form.Control
            className="my-2"
            type="search"
            aria-label="Disabled input example"
            placeholder="Search "
            value={search}   
            onChange={(e)=>{setSearch(e.target.value);
                setLoadingSearch(true)
            }}>    
        </Form.Control>
   </div> */}

   {/* <div className="col-3">
   <Form.Control
   className="my-2"
   type="date"
   aria-label="Disabled input example"
      value={date}   
   onChange={(e)=>{setDate(e.target.value)
   
       }}
    >
    
   </Form.Control>
 </div> */}

 <TableContainer component={Paper}
        sx={{ 
            // maxHeight: 200,  // تحديد الحد الأقصى للارتفاع
            // overflow: 'auto',
            // minWidth:1500  // تمكين التمرير عند الحاجة
            width:'100%'
          }}
       >
      <Table aria-label="simple table"
      sx={{
        marginTop:0 ,
         width:'100%'
      }}>
        
    <TableHead className="border primary ">
        <TableRow >
        <TableCell  sx={style_Cell}>م</TableCell>
            {headerShow}
            {Isadmin==='admin' &&          
          <TableCell  sx={style_Cell}>Action</TableCell>
         }           
        </TableRow>
    </TableHead>
    <TableBody  > 
        {props.loading?( 
        <TableRow className="text-center ">
            <td colSpan={12}>Loading...</td>
        </TableRow>):loadingSearch ?( 
        <TableRow className="text-center">
            <td colSpan={12}>Searching...</td>
        </TableRow>):(datashow )}
         
    </TableBody>

    </Table>
    </TableContainer> 
   <div className="d-flex align-items-center justify-content-center flex-wrap mt-2      w-100 mb-2  "
   >
   {(!search && !date)  && 
   ( <div className="col-2 ">
   <Form.Select    
   className="col-2  ps-3   "
   onChange={(e)=>props.setLimit(e.target.value)} aria-label="Default select example"
   style={{ width: '70px',paddingLeft:'30px' ,fontSize:'15px' }}>       
       <option value='3'>3</option>
       <option value='5'>5</option>
       <option value='10'>10</option>
       <option value='15'>15</option>
          </Form.Select>

</div>)}  
 

        {/* <div className="mt-3 w-100 mb-2 border bg-primary p-3">
            {(!search && !date) && (
                <PaginatedItems setPage={props.setPage} 
                itemsPerPage={props.limit} 
                data={props.data}
                total={props.total}/>
            )}
        </div> */}

   </div> 
 </>

)
}
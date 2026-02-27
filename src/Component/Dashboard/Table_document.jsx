import {  faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import {  Link } from "react-router-dom"
import {Form  } from "react-bootstrap"
import TranFormDate from "../../Helpers/TranFormDate";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import PaginatedItems from "../Pagination/Pagination";
 
 

export default function Table_documents(props){
 
  const style_Cell=
  {  maxWidth:100,
    fontSize: '15px',  // تغيير حجم الخط
    fontWeight: 'bold', // جعل الخط عريضًا
    borderRight: '2px solid black', // إضافة border للخلايا 
    borderColor:'#c2c5c5',
    borderBottom:'3px solid gray',
    textAlign: 'center',
    backgroundColor:'gray',
    color:'white',}

    const body_Cell={
      // maxWidth:100,
      fontSize: '15px',          
      borderRight: '2px solid black',              
      borderColor:'#c2c5c5',
      borderBottom:'3px solid gray',
      textAlign: 'center'
    }
 
   
   
    const header=props.header.map((item,index)=>     
      <TableCell 
      key={index}
      sx={style_Cell}
      >{item.name}</TableCell>       
)
//------------------------------------------------------------------------------------------------------
const getCellValue = (row, key) => {
  return key.split('.').reduce((obj, i) => obj?.[i], row) ?? '';
};
 
    const datashow = props.data?.map((item, index) => (
  <TableRow key={item.id}>
     <TableCell sx={body_Cell} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5", }}>{item.id}</TableCell>
    {props.header.map((column, colIndex) => (
      <TableCell
        key={colIndex}
        sx={body_Cell}
        style={{
          backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
        }}
      >
        {column.key === "action" ? (

          <div className="d-flex flex-wrap gap-2 w-100 m-0">
            <Link
              to={`/dashboard/${props.edit}/${item.id}`}
              className="fs-5 rounded d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>

            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              fontSize="19px"
              color="red"
              cursor="pointer"
              icon={faTrash}
            />
          </div>

        ) : column.key === "month_year" ? (

          `${item.month} / ${item.year}`

        ) : ["created_at", "updated_at"].includes(column.key) ? (

          TranFormDate(item[column.key])

        ) : (

          getCellValue(item, column.key)

        )}
      </TableCell>
    ))}
  </TableRow>
));

       //------------------- 
    
     
    return(
        // <div className="w-100  fs-4 border border-4 bg-danger" style={{ backgroundColor: '#d3d9db',overflow:'auto',maxWidth:1250}}>             
        <div className="w-100  fs-4 border p-1" style={{ backgroundColor: '#d3d9db',overflow:'auto',display:'block' }}>             
         
       <TableContainer  component={Paper}
        sx={{ 
            maxHeight: 500,  // تحديد الحد الأقصى للارتفاع
            overflow: 'auto',
            // minWidth:1500  // تمكين التمرير عند الحاجة
            // width:'100%',
            display:'block'
          }}
       >
      <Table aria-label="simple table"
      sx={{
        // overflow: 'auto',
        marginTop:0 ,
         width:'100%'
      }}>
        <TableHead >
          <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px', 
             
                
          }}> 
            <TableCell  sx={style_Cell}>م</TableCell>
            {header}
             
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TableRow>
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>Otto</TableCell>
            <TableCell>@mdo</TableCell>
          </TableRow> */}
          {datashow}
         
        </TableBody>
      </Table>
    </TableContainer> 
  

    <div className='  w-100 d-flex align-items-center justify-content-center gap-4 border'>
        
          <div className="    border  pt-1">           
              <PaginatedItems 
              // setPage={page} 
              itemsPerPage={props.limit} 
              setPage={props.setPage} 
              data={props.data}
              total={props.total}/>
              
          </div>           
          <div className="col-2 ">
              <Form.Select           
              className="col-2  ps-3   "
              onChange={(e)=>{props.setLimit(e.target.value);props.setPage(1)}} aria-label="Default select example"
              style={{ width: '70px',paddingLeft:'30px' ,fontSize:'15px' }}>       
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                    </Form.Select>
          
          </div>
    
         </div>
 
                  
  

               
        </div>
    )
}
 import {useState } from "react"; 
import TransformTime from "../../Helpers/TransformTime"
 
import './Modal.css'
import './StyleUl.css'
 
import StringSlice from "../../Helpers/StringSlice";
import File_Name from "../../Helpers/File_Name";
import File_Path from "../../Helpers/File_path";
// import { typeFile } from "../..Helpers/Files";
import { typeFile } from "../../Helpers/Files";

const Comment = ({ comment ,type}) => {
    const [isOpen, setIsOpen] = useState(true); // حالة فتح الردود الخاصة بهذا التعليق
    const [isHovered, setIsHovered] = useState(false);     
    const handleMouseEnter = () => setIsHovered(true);   
    const handleMouseLeave = () => setIsHovered(false);
  
    const toggleReplies = () => {
      setIsOpen(!isOpen); // تغيير حالة الفتح/الإغلاق عند الضغط
    };
  
    return (
     
       <div   className="w-100 pe-1 ps-1  fs-6 "   >
            <div className=" w-100 d-flex  border   align-items-center border justify-content-between flex-wrap " 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} 
                    onClick={toggleReplies}
                    style={{
                        cursor:"pointer" ,
                        backgroundColor: isHovered ? "#e4e5e6" : "white"
                    }}>
              
                <div className="  d-flex align-items-center   flex-wrap  ">
                    <div className="m-0 p-2 
                    text-center "style={{ 
                        borderRadius:'100%',
                        width: '40px',
                        background:'#14b7d7',color:'white'

                    }}>{type== 'Main'?comment.sender_name.charAt(0):comment.name_sender.charAt(0)
                        }</div>
                    <div className="m-0 me-3    d-flex flex-wrap">{type=== 'Main'?comment.sender_name:comment.name_sender} الى </div>
                    {/* <p className="m-0 me-3">{type== 'Main'?comment.receiver_name :comment.name_receiver}</p> */}
                    <div className="m-0 me-3">{type=== 'Main'?comment.receiver_name :comment.name_receiver}</div>

                </div>
                <div className="m-0 d-flex      "
                    style={{fontSize:'12px'}}>
                    {TransformTime(comment.created_at)}
                </div>                                                
            </div> 
            { (isOpen ) &&
            <div>
                <p className="p-3 pb-0">{comment.title} </p>
                
                {  comment.file_paths.length>0 &&
                    <div className=" d-flex gap-3   py-3 px-3  flex-wrap   ">
                        <p className="m-0 mb-1 w-100 ">Files:</p>
                        {  comment.file_paths && comment.file_paths.map((item,i)=>                    
                        
                        <div key={i} className=" "style={{width:'100px'}}>                     
                        {  typeFile.map((typfile,k)=>
                        <div key={k}>
                        {typfile.name.includes(item.split('.').pop())&&(
                            <div>
                            <img  src={typfile.type ==='img'? ` ${typfile.pathimg}/${item}`:` ${typfile.pathimg}`} 
                                width='40px' height='40px' alt="img"></img>                   
                            <p className="m-0">{StringSlice((File_Name(item,i)),10)}</p>   
                            <a className="fs-6"  href={typfile.type ==='img'?`${typfile.pathDownload}/${File_Path(item,i)}`
                            :`${typfile.pathDownload}/${File_Path(item,i)}`} >Download</a>

                            </div>
                        )}
                        </div>)}         
                    </div>

                        ) }
                    </div>}
           </div>
            }                                           
        </div>
    );
  };

  export default Comment;

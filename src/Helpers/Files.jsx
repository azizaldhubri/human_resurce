import docImg from '../Assets/files/doc.png';
import pdfImg from '../Assets/files/pdf.png';
import rarImg from '../Assets/files/rar.jpg';
import excelImg from '../Assets/files/excel.jpg';
export const typeFile=[
    {
        name:'jpg',
        type:'img',
        src_type:'image/jpeg',        
        pathimg:'http://127.0.0.1:8000/storage',        
        // pathimg:'http://127.0.0.1:8000/storage/app/public/assets',
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',
        
        
    },
    {
        name:'docx',
        type:'file',
        src_type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pathimg: docImg,
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',
       
        
    },
    {
        name:'pdf',
        type:'file',
        src_type:'application/pdf',
        // pathimg:require('../../../Assets/files/pdf.png'),
       pathimg: pdfImg,
        // pathDownload:'http://127.0.0.1:8000/api/download',
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',        
        
    },
    {
        name:'zip',
        type:'file',
        src_type:'application/x-zip-compressed',
         pathimg: rarImg,
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',        
        
    },
    {
        name:'xlsx',
        type:'file',
        src_type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // pathimg:require('../../../Assets/files/excel.jpg'),
        // pathimg:'http://127.0.0.1:8000/storage',
         pathimg: excelImg,
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',
        
        
    },
    {
        name:'jfif',
        type:'img',
        src_type:'application/pdf',
        pathimg:'http://127.0.0.1:8000/storage',
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',
        
        
    },
    {
        name:'JPG',
        type:'img',
        src_type:'image/jpg',
        pathimg:'http://127.0.0.1:8000/storage',
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',
 
        
    },
    {
        name:'png',
        type:'img',
        src_type:'image/png',
        pathimg:'http://127.0.0.1:8000/storage',
        // pathimg:'http://127.0.0.1:8000/storage/app/public/assets',
        pathDownload:'http://127.0.0.1:8000/api/download',
        width:'40px' ,
        height:'40px',
        
    },
]
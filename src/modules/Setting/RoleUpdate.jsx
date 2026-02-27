import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, } from '@mui/material'; 
import { Axios } from '../../Api/axios';
import NavHeader from '../../Component/Dashboard/NavHeader';
 

export default function RoleUpdate()  {
    const {id}=useParams();
    
    const [pages, setPages] = useState([]);    
    const [newPage, setNewPage] = useState('');
    const [permissions, setPermissions] = useState({});      
    const [typeRole, setTypeRole] = useState(''); 
    const [selectAll,setSelectAll]=useState(true)
    const [select_edit_All,setSelect_edit_All]=useState(true)   
 

    useEffect(() => {
        // جلب قائمة الصفحات
        const fetchPages = async () => {
            const response = await Axios.get('pages');
            setPages(response.data);              
        };
        
        const TypeRolesname = async () => {
            const response = await Axios.get(`rolesName/${id}`);
            setTypeRole(response.data.name);                     
       
        };

        // جلب الصلاحيات للدور المحدد
        const fetchPermissions = async () => {
            const response = await Axios.get(`roles/${id}`);                       
            const permissionsData = {};

            response.data.forEach(permission => {
                permissionsData[permission.page_id] = permission;
            });
            setPermissions(permissionsData);
        };
   

        fetchPages();        
        TypeRolesname();
        fetchPermissions();      
    }, [newPage]);

   

    // دالة لتحديث حالة الـcheckbox
    // const handleCheckboxChange = (pageId, field) => {       
    //     setPermissions(prevPermissions => ({
    //         ...prevPermissions,
    //         [pageId]: {
    //             ...prevPermissions[pageId]|| {},// تأكد من أن الصفحة موجودة
    //             [field]: !prevPermissions[pageId]?.[field]?? true // افتراض `true` عند عدم وجود الحقل
    //         }
    //     }));
    // };

    const handleCheckboxChange = (pageId, field) => {
  setPermissions(prev => {
    // ننسخ البيانات القديمة
    const updated = { ...prev };

    // إذا الصفحة مش موجودة، ننشئها
    if (!updated[pageId]) {
      updated[pageId] = {};
    }

    // نقلب قيمة الحقل (true/false)
    updated[pageId][field] = !updated[pageId][field];
    return updated;
  });
};


    const handleCanViewChangeAll = (value, field) => {
  setPermissions(prev => {
    const updated = {};

    // نمر على جميع الصفحات مرة واحدة فقط
    pages.forEach(item => {
      updated[item.id] = {
        ...prev[item.id],   // احتفظ بالحقول الأخرى
        [field]: value ? 1 : 0 // اضبط القيمة على 1 أو 0
      };
    });

    return updated;
  });
};

  
    
  //----- --------------------------------------------------------
    // دالة لحفظ الصلاحيات
    const savePermissions = async () => {
        try {
            await Axios.post('roles/update-permissions', {
                role_id: id,
                permissions: permissions
            });
            alert("Permissions updated successfully");
            window.location.pathname=`dashboard/Role/RoleUpdate/${id}`
        } catch (error) {
            console.error("Error updating permissions:", error);
        }
    };
    //====================================================================
    const style_cell={
        fontSize: '18px',  // تغيير حجم الخط
        fontWeight: 'bold', // جعل الخط عريضًا
        borderRight: '2px solid black', // إضافة border للخلايا
        backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray',
        textAlign: 'center'                
    }
    const style_budy={
        fontSize: '19px',                   
        borderRight: '2px solid black',             
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray',
        textAlign: 'center' ,
        padding: '8px',
    //   color:'red'
    }

    async function handleAddpage(e){
        e.preventDefault();                
        const form = new FormData();
        form.append('name',newPage)               
     try{                                             
        await Axios.post(`addPage`,form)
        setNewPage('')                 
     }
     catch(err){console.log(err)}
    }

 
    //-------------------------------------------------------------------------
    const links=[
        {name:'الصلاحيات',
         link:'/dashboard/Role'
        },
        {name:'تعديل الصلاحيه',
         link:'#'
        },
      ]
    return (
        <div className="w-100 px-3 py-0 bg-page">
              <NavHeader
             nav={links}
                         
            />
            {typeRole   ?   <h5 className='me-2 '>تعديل صلاحية : {typeRole}</h5>:''}
            <div className="w-100  d-flex align-items-center justify-content-start gap-4 fs-4  pt-4 mb-5 me-5 flex-wrap ">   
                    
                <div className=" d-flex align-items-center justify-content-start gap-2 flex-wrap    ">                   
                <input 
                 
                 type="text"
                            value={newPage}
                            onChange={(e)=>setNewPage(e.target.value)}
                        style={{padding:'5px',
                            width: '250px',
                            borderLeft:'7px solid red',
                            borderRight:'7px solid red',
                        borderRadius:'10px' }}>
                </input>
                <button className="back_btn rounded " onClick={handleAddpage}>add page</button>
                </div>       
                
            </div>
 
            <TableContainer component={Paper}
                    sx={{maxHeight: 1000, 
                        width:'95%'            
                    }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow  sx={{ backgroundColor: '#d3d9db',fontSize:'20px', }}>
                            < TableCell style={style_cell} >اسم الصفحة</TableCell>            
                            <TableCell  style={style_cell}>
                                 عرض                                  
                                 <input
                                    type="checkbox"                                    
                                    onChange={() =>{setSelectAll(!selectAll);handleCanViewChangeAll(selectAll , 'can_view')}}
                                    style={{transform:" scale(1.5)",cursor:"pointer",marginRight:'10px'}}
                                />
                            </TableCell>
                            <TableCell style={style_cell} >تعديل
                            <input
                                    type="checkbox"                                  
                                    //  checked={selecteAll}                                     
                                    onChange={() =>{setSelect_edit_All(!select_edit_All);handleCanViewChangeAll(select_edit_All ,'can_edit')}}
                                    style={{transform:" scale(1.5)",cursor:"pointer",marginRight:'10px'}}
                                />
                            </TableCell>
                        </TableRow >
                    </TableHead>
                    <TableBody >
                        {pages.map(page => (
                            <TableRow  key={page.id}>
                                <TableCell style={style_budy} >{page.name}</TableCell >
                                <TableCell style={style_budy} >
                                    <input
                                        type="checkbox"
                                        checked={permissions[page.id]?.can_view || false}
                                        onChange={() => handleCheckboxChange(page.id, 'can_view')}
                                        style={{transform:" scale(1.5)",cursor:"pointer"}}
                                    />
                                </TableCell >
                                <TableCell  style={style_budy}>
                                    <input
                                        type="checkbox"
                                        checked={permissions[page.id]?.can_edit || false}
                                        onChange={() => handleCheckboxChange(page.id, 'can_edit')}
                                        style={{transform:" scale(1.5)",cursor:"pointer"}}
                                    />
                                </TableCell >
                            </TableRow >
                        ))}
                    </TableBody >
                </Table>
            </TableContainer>

                <button className=' btn btn-danger m-3  ' onClick={savePermissions}>Save Changes</button>
        </div>
);
};
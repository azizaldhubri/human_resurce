import { faBuilding, faCalendarAlt,
     faClipboardCheck, faCog, faFileAlt,  faFileInvoiceDollar,  faPlus, faUsers,  } from '@fortawesome/free-solid-svg-icons'
 

 

export const taplink=[
   {maintitle:'إدارة الموارد البشرية',link:'#',
    permission:'موارد بشرية',
     img:'Mask Group 75.png', 
     icon:faUsers,  
    subtitle:[
        {link:'users',title:'الموظفين'}                          
        , {link:'users/add',title:'اضافة موظف'},                       
        , {link:'users/material',title:'Usersbymaterial '},               
                // {link:'Salaries',title:'المرتبات'},
        //   {link:'#',title:'نقل الموظفين'}
        ]         
     
   },   

   {maintitle:'إدارة الإجازات',link:'#', permission:'مهام الإدارات',img:'Mask Group 78.png' , 
    //  icon:faPlane,   
     icon:faCalendarAlt,   
    subtitle:[ 
        {link:'Leaves',title:'الإجازات'},
        {link:'Leaves/LeavesType',title:'انواع الإجازة' },
        {link:'Leaves/AddLeavesRequst',title:'طلب إجازة جديد' },  
        {link:'Leaves/LeavesRequestsManegment',title:'إدارة طلبات الاجازة'},        
        {link:'Leaves/LeaveBalancesTable',title:'عرض أرصدة الاجازات'},              
   ]},

   {maintitle:'إدارة المرتبات',permission:'إدارة المرتبات', img:'Mask Group 73.png',  
     icon:faFileInvoiceDollar ,  
    //  icon:faMoneyBill ,  
    subtitle:[      
        {link:'payrolls',title:"المرتبات"},          
        {link:'payrolls/AddAllowances',title:"إضافة حافز"},
        {link:'payrolls/AddAdvance',title:"إضافة سلفة"},
        {link:'payrolls/ViewDeduction',title:"عرض الخصومات لموظف"},
        {link:'payrolls/ViewAllowances',title:"عرض الحوافز لموظف"},         
        {link:'payrolls/AddDeductions',title:"إضافة خصم او غياب"},
         
       
        
             
   ]},
   {maintitle:'إدارة المهام',link:'#', permission:'مهام الإدارات',img:'Mask Group 78.png' ,
     icon:faClipboardCheck ,  
    subtitle:[
      , {link:'Taskes',title:'الوارد'},
      {link:'Taskes/add',title:'جديد'},              
   ]},
      
    
   {maintitle:'المستندات',permission:'المستندات',img:'Mask Group 73.png',  
     icon:faFileAlt,   
    subtitle:[      
        {link:'documents',title:"استعراض"},
        {link:'AddDocument',title:"اضافة مستند"},
            
   ]},


   {maintitle:'إدارة الاقسام',permission:'إدارةالاقسام', img:'Mask Group 73.png', 
     icon:faBuilding,   
    subtitle:[      
        {link:'departments',title:"الاقسام"},
        {link:'departments/add',title:"إضافة قسم"},       
             
   ]},

   {maintitle:'الدردشة',permission:'إدارةالاقسام', img:'Mask Group 73.png', 
     icon:faBuilding,   
    subtitle:[      
        {link:'Chatbot',title:"دردشة"},                     
                            
   ]},
  
   {maintitle:'الإعدادات',permission:'الصلاحيات',  img:'Mask Group 83.png', 
     icon:faCog ,
    subtitle:[  
        {link:'Role' ,title: "الصلاحيات"},
      
            
   ]},

 

 



]
 

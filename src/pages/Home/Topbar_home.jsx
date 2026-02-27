import { faBars,  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"; 
import { useContext, useEffect, useRef, useState } from "react";
import { WindowSize } from "../../Component/Context/WindowContext";
 import logo3 from '../../img/logo3.png';
 
import {   Typography, Menu, MenuItem, Box, Button } from "@mui/material";
// import MenuList from "./MenuList";
import './menulist.css';
import './home.css' ;

export default function Topbar_home(props){ 
  const size=useContext(WindowSize) ;
  const windowSize=size.windowSize ;   
     
     
     const phoneNumber = '966538047805';  
     const message = 'مرحباً! كيف يمكنني مساعدتك؟';  
     const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        const [anchorEl, setAnchorEl] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

     const scrollYRef = useRef(0);
  const topbarRef = useRef(null);
 
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;

      if (topbarRef.current) {
        if (scrollYRef.current > 100) {   
            // topbarRef.current.style.background = 'linear-gradient(to right, #0d47a1, #00acc1)';
          // topbarRef.current.style.backgroundColor = '#0288d1'; // لون عند التمرير
          // topbarRef.current.style.backgroundColor = '#0288d1'; // لون عند التمرير
          topbarRef.current.style.backgroundColor = 'rgb(36, 158, 214)'; // لون عند التمرير
          
          topbarRef.current.style.color = 'black';
        } else {         
             topbarRef.current.style.backgroundColor = 'rgb(235, 237, 240)';          
             topbarRef.current.style.color = 'black';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
     
    // Menu items data
  const menuItems = [
    { label: 'الصفحة الرئيسية', onClick: props.onHeroSectionClick },
    {
      label: 'معلومات عنا',
      submenu: [
        { label: 'اراء العملاء', onClick: props.ontestimonialsClick },
        { label: 'لماذا برنامج تسهيل', to: '#' },
        { label: 'عملائنا', to: '#' },
      ]
    },
    {
      label: 'المزايا',
      submenu: [
        { label: 'إدارة المرتبات', to: '#' },
        { label: 'الإجازات', to: '#' },
        { label: 'إدارة المهام', to: '#' },
      ]
    },
    { label: 'تواصل معنا', href: waLink }
  ];

    // Handlers
  const handleOpenSubmenu = (event, label) => {
    setAnchorEl(event.currentTarget);
    setActiveSubmenu(label);
  };

  const handleCloseSubmenu = () => {
    setAnchorEl(null);
    setActiveSubmenu(null);
  };
    return(      
   <div className="w-100   "
       style={{        
        position:'relative',        
          //  overflow:'scroll'            
           overflow:'auto'            
           }} > 

         
          
        <div    ref={topbarRef} className="w-100     d-flex align-items-center justify-content-center rounded    "
           style={{
            height:'90px' , 
            position:'fixed',
            opacity:'1',
            zIndex:'4'  ,
              transition: 'background 0.5s ease, color 1.9s ease',         
           }}> 
         <div className="  col-lg-12 col-md-12  col-sm-12 col-12    
               d-flex align-items-center justify-content-between ps-4 pe-4 mb-1" 
                 style={{height:'100%',border:'4px solid rgb(13, 44, 85)' }}>
             
         
             {/* Logo & Brand */}
        <Box className="d-flex align-items-center gap-2">
          <img src={logo3} alt="logo" style={{ width: '60px', borderRadius: '50%' }} />
          {windowSize > 950 && <Typography variant="h6">مرحبا في انظمة</Typography>}
        </Box>

            <div className="order-lg-2    col-lg-6 col-md-4 col-sm-2 col-3     h-100  fs-5 ">
                    {windowSize >1000 ? 
                     (  <Box
                      //  className="d-flex align-items-center gap-3"
                       className=" m-0 ps-2 pe-2 border d-flex   align-items-center justify-content-between   "
                      style={{height:'100%' ,listStyle:'none',}}>
            {menuItems.map((item) => (
              <Box key={item.label} className="position-relative fs-4">
           {item.submenu ? (
  <>
    <Button
     
      onClick={(e) => handleOpenSubmenu(e, item.label)}
      sx={{ color: 'black' ,fontSize:'20px' }}
    >
      {item.label}
    </Button>

    <Menu 
      anchorEl={anchorEl}
      open={activeSubmenu === item.label}
      onClose={handleCloseSubmenu}
      // MenuListProps={{ onMouseLeave: handleCloseSubmenu }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
       disableScrollLock 
    >
      {item.submenu.map((sub) => (
        <MenuItem          
          key={sub.label}
          component={sub.to ? Link : 'button'}
          to={sub.to || undefined}
          onClick={() => {
            if (sub.onClick) sub.onClick();
            handleCloseSubmenu(); // يغلق القائمة بعد الضغط
          }}
        >
          {sub.label}
        </MenuItem>
      ))}
    </Menu>
  </>
) : (
  <Button
  className="fs-5"
    component={item.href ? 'a' : 'button'}
    href={item.href || undefined}
    onClick={item.onClick}
    target={item.href ? "_blank" : undefined}
    sx={{ color: item.href ? 'brown' : 'black' }}
  >
    {item.label}
  </Button>
)}
              </Box>
            ))}
          </Box>)
        
                       

                       : (
          
 
                    <div className="d-flex align-items-center    justify-content-center h-100 "   style={{textAlign:'left' }} >
                       <FontAwesomeIcon  icon={faBars} 
                       style={{cursor:'pointer',      
                        }} 
                        // onClick={props.setOpenMenu(perv=>!perv)}
                        onClick={props.setOpenMenu}  
                        /> 
                    </div> )}
                   
                      
            </div>
            
               <div className=" col-lg-3 col-md-3 col-sm-2 col-3  text-center order-lg-3  fs-5  ">
              {/* <p>yyyyyyyyyyy</p> */}
                
                <p   className="m-0 cursor"
                 style={{background:'none',cursor:'pointer'}}
                 onClick={()=>{ 
                              
                  props.setIsModalOpen(perv=>!perv)  
                   }} >تسجيل الدخول</p>
              
            
           </div> 

            </div>

        </div>              
     
       </div>
    )
}

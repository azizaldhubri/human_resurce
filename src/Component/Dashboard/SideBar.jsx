import './style _TopAndSidBar.css';
import { useContext, useState, memo } from 'react';
import { Menu } from '../Context/MenuContext';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import { taplink } from './NaveLink';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { WindowSize } from '../Context/WindowContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img_hr from '../../img/hr7.png';

const SubMenuItem = memo(({ mainIndex, item2, index2, openSub, handleSubClick }) => (
  <div key={index2} style={{ fontWeight: 'bold', textDecoration: 'none' }}>
    <ListItem
      onClick={() => handleSubClick(mainIndex, index2)}
      sx={{
        textAlign: 'right',
        margin: '-6px',
        padding: '7px',
        paddingRight: '8px',
        borderRadius: '4px',
        width: '230px',
        cursor: 'pointer',
        marginRight: '10px',
        marginBottom: '8px',
        backgroundColor: openSub[mainIndex] === index2 ? '#9eafc09d' : 'transparent',
        '& .MuiListItemText-primary': {
          color: openSub[mainIndex] === index2 && ' black ',
          fontSize: '18px'
        }
      }}
    >
      <Link to={`/dashboard/${item2.link}`} >
      {/* <Link to={`${item2.link}`} > */}
        <ListItemText
          primary={item2.title}
          sx={{
            paddingRight: '8px',
            color: 'rgb(64, 61, 221)',
            '&:hover': {
              color: 'blue',
            },
          }}
        />
      </Link>
      {item2.details && (openSub[mainIndex] === index2 ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore />)}
    </ListItem>
  </div>
));

const MainMenuItem = memo(({ item, index, openMain, openSub, handleMainClick, handleSubClick }) => (
  <>
    <ListItem
      onClick={() => handleMainClick(index)}
      sx={{
        textAlign: 'right',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '8px',
        fontFamily: 'Cairo, sans-serif',
        backgroundColor: openMain === index ? '#6d95bd9d' : 'transparent',
        '&:hover': { backgroundColor: '#6d95bd9d', color: '#FFFFFF' },
        '& .MuiListItemText-primary': {
          color: openMain === index && 'blue',
          fontWeight: 'bold',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '0px' }}>
        <FontAwesomeIcon icon={item.icon} className='text-primary' />
      </ListItemIcon>
      <ListItemText
        primary={item.maintitle}
        primaryTypographyProps={{ fontSize: '18px' }}
        sx={{ paddingRight: '8px' }}
      />
      {item.subtitle && (openMain === index ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore />)}
    </ListItem>

    <Collapse in={openMain === index} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {item.subtitle && item.subtitle.map((item2, index2) => (
          <SubMenuItem
            key={index2}
            mainIndex={index}
            item2={item2}
            index2={index2}
            openSub={openSub}
            handleSubClick={handleSubClick}
          />
        ))}
      </List>
    </Collapse>
  </>
));

const SideBar = () => {
  const { isOpen } = useContext(Menu);
  const { windowSize } = useContext(WindowSize);
  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState({});

  const handleMainClick = (itemId) => {
    setOpenMain(openMain === itemId ? null : itemId);
  };

  const handleSubClick = (mainItemId, subItemId) => {
    setOpenSub((prevState) => ({
      ...prevState,
      [mainItemId]: prevState[mainItemId] === subItemId ? null : subItemId,
    }));
  };

  return (
    <>
      <div
        className='w-100 ms-2 me-2'
        style={{
          position: 'fixed',
          top: '55',
          left: '0',
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0 ,0 ,0 ,0.2)',
          display: windowSize < 600 && isOpen ? 'block' : 'none',
          zIndex: '5'
        }}
      ></div>

      <div
        className={`sidbar fade-div ${isOpen ? "visible" : "hidden"}`}
        style={{
          minWidth: isOpen ? '265px' : '0',
          width: '250px',
          height: '92vh',
          position: windowSize < 600 ? 'fixed' : (isOpen ? 'sticky' : 'fixed'),
          top: 55
        }}
      >
        <div
          className='w-00 border p-2 fs-1 flex-center gap-5 d-flex align-items-center border mt-2'
          style={{ color: 'black', background: '#0a6f9e' }}
        >
          <Link to='/dashboard'  style={{ color: 'black', textDecoration: 'none' }}>الرئيسية</Link>
          <img src={img_hr} alt='' style={{ borderRadius: '100%', margin: '3px' }} height={75} width={75} />
        </div>

        <Box
          className='side-bar m-0'
          sx={{
            width: '265px',
            height: '67vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': { width: '0px' },
            '&:hover::-webkit-scrollbar': { width: '9px' },
            '&::-webkit-scrollbar-track': { backgroundColor: '#f0f0f0' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '20px',
              cursor: 'pointer'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          <List className='p-0'>
            {taplink && taplink.map((item, index) => (
              <div key={index}>
                <MainMenuItem
                  item={item}
                  index={index}
                  openMain={openMain}
                  openSub={openSub}
                  handleMainClick={handleMainClick}
                  handleSubClick={handleSubClick}
                />
              </div>
            ))}
          </List>
        </Box>
      </div>
    </>
  );
};

export default memo(SideBar);

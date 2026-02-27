import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style _TopAndSidBar.css';
import { faBars, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../Context/MenuContext';
import { UserContext } from '../Context/UserProvider';
import { Axios } from '../../Api/axios';
import { LOGOUT } from '../../Api/Api';
import Cookie from 'cookie-universal';
import { typeFile } from '../../Helpers/Files';
import '../../Css/Modal.css';
import { Link } from 'react-router-dom';
import { WindowSize } from '../Context/WindowContext';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import img_hr from '../../img/hr7.png' ;
import defaultUser from '../../Assets/images/user.png';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: '30px',
    top: 2,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    fontSize: '17px',
    width: '27px',
    height: '27px',
    borderRadius: '100%',
    background: '#e91e63',
  },
}));

export default function Topbar() {
  // const windowSize = useContext(WindowSize).windowSize;
  // const windowSize = useContext(WindowSize);
  const windowContext = useContext(WindowSize);
const windowSize = windowContext.windowSize;
  const cookie = Cookie();
  const menu = useContext(Menu);
  const user = useContext(UserContext);
  const user_data = user.user;
  const [notifications, setNotfication] = useState([]);
  const [count_notifications, setCountNotfication] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setisOpen = menu.setisOpen;
  const isUpdated = menu.isupdateNotifaction;

  let imageProfile = null;
  if (user_data?.file_paths) {
    try {
      const filePaths = JSON.parse(user_data.file_paths);
      if (Array.isArray(filePaths) && filePaths.length > 0) {
        imageProfile = `${filePaths[0]}`;
      }
    } catch (error) {
      console.error("خطأ في JSON.parse:", error);
    }
  }

  function handelchangeMenue() {
    setisOpen(prev => !prev);
  }

  async function handleLogout() {
    try {
      await Axios.get(`/${LOGOUT}`);
      window.location.pathname = '/';
      cookie.remove('h-resurce');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getNotification();
  }, [isUpdated]);

  async function getNotification() {
    try {
      const res = await Axios.get(`notifications`);
      setNotfication(res.data);
      if (res.data) {
        setCountNotfication(0);
        res.data.map(item =>
          setCountNotfication(prev => (item.is_read === 0 ? prev + 1 : prev))
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function Notification_isread(id) {
    try {
      await Axios.post(`Notification_isread/${id}`);
      getNotification();
    } catch (err) {
      console.log(err);
    }
  }
 
  
    // دالة لإغلاق المودال
  // Close the modal when clicking outside of it
  const closeModal = (e) => {
    if (e && e.target.classList && e.target.classList.contains('modal-notification-overlay')) {
      setIsModalOpen(false);
    }
    // Can also be called manually without event, so the following ensures close for other triggers:
    if (!e) setIsModalOpen(false);
  };
  function Modal({ onClose }) {
    return (
      // <div className='w-100  home-notification bg-danger'>
        <div className=" modal-notification border border-4  border-primary rounded small-scrollbar bg-danger"
      //    onMouseLeave={onClose} 
          style={{ 
            overflowY: 'auto',
            maxHeight: '75vh', }}>
          <div className='w-100  pb-2 mb-2   '>
            <div className="modal-content1 m-0" onClick={(e) => e.stopPropagation()}>
              <div className='gap-3 align-items-start rounded'>
                {notifications &&
                  notifications.map((item, i) => (
                    <div
                      key={i}
                      className='border-bottom  d-flex align-items-center justify-content-center'
                      onClick={() => Notification_isread(item.id)}
                      style={{
                        background: item.is_read === 0 ? 'rgba(230, 236, 238, 0.8)' : 'white',
                        height: '70px',
                      }}
                    >
                      <Link to={item.link_notification} className='fs-5 m-0 rounded text-dark'>
                        {item.message}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        {/* </div> */}

      </div>
    );
  }

  return (
    <div className="px-3 py-2 w-100 top d-flex align-items-center justify-content-center ms-2">
      <div className='d-flex align-items-center justify-content-between ps-4 pe-4' style={{ width: '90%' }}>
        <div className='d-flex align-items-center justify-content-center gap-3' style={{ width: windowSize < 400 && '100%' }}>
          <FontAwesomeIcon icon={faBars} style={{ cursor: 'pointer' }} onClick={handelchangeMenue} />

          <div className='d-flex fs-5 text-white align-items-center justify-content-between' style={{ width: '100%' }}>
            <div style={{ cursor: 'pointer' }}>
              {imageProfile !== null ? (
                <div key={0}>
                  {typeFile.map((typfile, k) => (
                    <div key={k}>
                      {typfile.name.includes(imageProfile.split('.').pop()) && (
                        <img
                          src={typfile.type === 'img' ? `${typfile.pathimg}/${imageProfile}` : `${typfile.pathimg}`}
                          style={{ borderRadius: '100%' }}
                          height={40}
                          width={40}
                          alt=''
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <img
                 src={defaultUser}                   
                  style={{ borderRadius: '100%' }}
                  height={40}
                  width={40}
                  alt=''
                />
              )}
            </div>

            <div className='d-flex align-items-center justify-content-center border me-2 '
              onClick={() => setIsModalOpen(prev => !prev)}
              style={{
                position: 'relative',
                width: '45px',
                height: '45px',
                borderRadius: '100%',
                background: 'rgb(231, 238, 238)'
              }}>
              {isModalOpen && <Modal onClose={closeModal} />}
              <IconButton aria-label="cart" className='p-2'>
                <StyledBadge badgeContent={count_notifications} color="secondary">
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>
            </div>

            <div className='d-flex align-items-center justify-content-center border me-2 custom-hover'
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '100%',
                minWidth: '44px',
                maxWidth: '44px',
              }}>
              <FontAwesomeIcon icon={faSignOut} style={{ cursor: 'pointer', color: 'black' }} onClick={handleLogout} />
            </div>
          </div>
        </div>

        {windowSize > 400 && (
          <img src={img_hr} style={{ borderRadius: '100%' }} width={50} alt='' />
        )}
      </div>
    </div>
  );
}

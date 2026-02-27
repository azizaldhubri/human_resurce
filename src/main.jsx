import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
 
import App from './App.jsx'
import WindowContext from './Component/Context/WindowContext.jsx'
import MenuContext from './Component/Context/MenuContext.jsx'
import { UserProvider } from './Component/Context/UserProvider.jsx'
import '../src/pages/Home/home.css'
import './index.css';
import './Css/components/select.css';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <WindowContext>
      <MenuContext>
        <UserProvider>
          <App /> 
        </UserProvider>
      </MenuContext>
    </WindowContext>
)

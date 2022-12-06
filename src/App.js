import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Userdashboard from './pages/User-routes/Userdashboard';
import PrivateRoute from './Components/PrivateRoute';

import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Profile_Info from './pages/User-routes/Profile_Info';
import UserProvider from './Context/UserProvider';
import PostPage from './pages/PostPage';
import UpdateBlog from './pages/UpdateBlog';

function App() {
  return (

      <UserProvider>
      <BrowserRouter>
      <ToastContainer position='bottom-center'/>
        <Routes>

                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path="/post/:postid" element={<PostPage/>}/>

                  <Route path='/user' element={<PrivateRoute/>}>

                      <Route path='dashboard' element={<Userdashboard/>}/>
                      <Route path='profile-info/:userId' element={<Profile_Info/>}/>
                      <Route path="update-blog/:blogId" element={<UpdateBlog/>}/>
                      
                     

                  </Route>

                    
                



        </Routes>
      </BrowserRouter>
      </UserProvider>


   
  );
}

export default App;

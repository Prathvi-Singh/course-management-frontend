import logo from './logo.svg';
import './App.css';
import {React,useState,useContext} from 'react'

import Navbar from './Components/Navbar/Navbar.js'
import Login from './Components/Auth/login.js'
import Signup from './Components/Auth/signup.js'
import Dashboard from './Components/Dashboard/Dashboard.js';
import {BrowserRouter , Routes ,Route,Outlet,Navigate } from 'react-router-dom'
import Details from './Components/Details/Details.js'
import UpdateCourse from './Components/update/update';
import DataProvider from './context/DataProvider';
import { DataContext } from './context/DataProvider';
import Grade from './Components/Faculty/grade.js'
import StudentGrade from './Components/student/studentgrade';
import Profile from './Components/Auth/profile';
import AllFaculty from './Components/Faculty/AllFaculty';
import StudentByBranch from './Components/student/studentByBranch';
import Footer from './Components/Footer/footer'

const PrivateRoute = ({ isAuthenticate, ...props }) => {
  console.log("isAuthenticate : ", isAuthenticate)
  var a=sessionStorage.getItem('accessToken');
 
  return isAuthenticate || a!=null ?
    <>
   
      <Navbar ></Navbar>
      <Outlet />
      
    </>
    : <Navigate replace to='/login' />
}
// export const getAccessToken = ()=>{
//   //  console.log(sessionStorage.getItem('accessToken'));
//     return sessionStorage.getItem('accessToken')
// }


function App() {
  //const {account}=useContext(DataContext);
 const [isAuthenticate,isUserAuthenticate]=useState(false);
//  cosst [naam,setName]=useState("IIITDM");

 const changeAuth=(index)=>{
      console.log(index);
      isUserAuthenticate(index);
      // setName(index2);
 }

  return (
    <div className="App">
  
    {/* <Dashboard></Dashboard>
    <Login></Login> */}
     <DataProvider>
    <BrowserRouter>
    {/* <AdminDashboard/> */}
       {/* <Navbar> </Navbar> */}
       <Routes>
       {/* <Route path="/dashboard" element={<Dashboard/>}></Route> */}
       <Route path="/login" element={<Login  isUserAuthenticate={changeAuth}/>}></Route>
        <Route path='/' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


        <Route path='/' element={<Dashboard/>} />
        </Route>
        <Route path='/dashboard' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


        <Route path='/dashboard' element={<Dashboard/>} />
        </Route>

        <Route path='/details/:id' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


        <Route path='/details/:id' element={<Details/>} />
        </Route> 

        <Route path='/update/:id' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


        <Route path='/update/:id' element={<UpdateCourse/>} />
        </Route> 

        <Route path='/grade/:branch' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


        <Route path='/grade/:branch' element={<Grade/>} />
        </Route> 

        <Route path='/allgrades/:email' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


        <Route path='/allgrades/:email' element={<StudentGrade/>} />
         </Route> 
         <Route path='/profile' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


<Route path='/profile' element={<Profile/>} />
 </Route> 

 <Route path='/allfaculty' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


<Route path='/allfaculty' element={<AllFaculty/>} />
 </Route> 

 <Route path='/allstudents/:branch' element={<PrivateRoute isAuthenticate={isAuthenticate}></PrivateRoute>}>


<Route path='/allstudents/:branch' element={<StudentByBranch/>} />
 </Route> 

       

     
        {/* <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/update/:id" element={<UpdateCourse/>}></Route> */}

        {/* <Route path="/admindashboard" element={<AdminDashboard/>}></Route> */}
        
       </Routes>
    
    </BrowserRouter>
    </DataProvider>

    </div>
  );
}

export default App;

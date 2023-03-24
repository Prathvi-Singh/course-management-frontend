import {React,useState,useContext} from 'react';
import {useNavigate} from "react-router-dom"
import API from '../../services/api'
import  {DataContext} from '../../context/DataProvider.js'
import loginimg from '../../images/login.JPG'


const style1={
    width:"70%",
    
}

const Login=(props)=>{
    const Navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:"",
        
    });
   
 

   const changeUser =(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
      console.log(user);
   }
   const {setAccount}= useContext(DataContext)
   const loginUser=async()=>{
      const response=await API.userLogin(user);
      if(response.isSuccess){
        const data=response.data;
        console.log("..|..",data);
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
        
        sessionStorage.setItem('email',`${data.email}`)
        sessionStorage.setItem('designation',`${data.designation}`)
        sessionStorage.setItem('branch',`${data.branch}`)
        sessionStorage.setItem('contact',`${data.contact}`)
        sessionStorage.setItem('name',`${data.name}`)
        sessionStorage.setItem('id',`${data._id}`)
        setAccount({email:data.email , designation:data.designation , branch:data.branch,name:data.name,contact:data.contact})
        props.isUserAuthenticate(true);
        Navigate('/dashboard');
      }
      else{
        console.log("there is some error");
      }
      
   }
   

    return (
      
        <>
        <div className="container mt-5 text-center" style={style1}>
        <h1><img src={loginimg} class="img-fluid" title="INDIAN INSTITUTE OF INFORMATION TECHNOLOGY DESIGN AND MANUFACTURING KURNOOL" alt="INDIAN INSTITUTE OF INFORMATION TECHNOLOGY DESIGN AND MANUFACTURING KURNOOL"/></h1>
        <div >
            <div className="form-group">

                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                placeholder="Email address"
                name="email"
                onChange={changeUser}
               />

            </div>
            <div className="form-group">

                <input type="password" className="form-control" id="exampleInputPassword1"
                 placeholder="Password"
                 name="password"
                 onChange={changeUser}
                 />
            </div>

            <button type="submit" className="btn btn-outline-success btn-lg mt-5"  onClick={loginUser}>login </button>
            <br></br>
            {/* <button type="submit" className="btn btn-outline-primary btn-lg mt-4">Create Account</button> */}

        </div>
    </div>
    </>
    )
}

export default Login;
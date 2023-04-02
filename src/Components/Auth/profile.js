import {React,useContext} from 'react' 
import { DataContext } from '../../context/DataProvider';


const Profile =()=>{
    const {account} =useContext(DataContext);
   return (
 <>
 
 <h1> Hi, I am {account.name}</h1>
 <div className="container mt-5">
    
    <div className="row d-flex justify-content-center">
        
        <div className="col-md-10">
            
            <div className="card p-3 py-4">
                
                <div className="text-center">
                    <img src="https://i.imgur.com/bDLhJiP.jpg" width="150" className="rounded-circle"/>
                </div>
                
                <div className="text-center mt-3">
                    <span className="bg-secondary p-1 px-4 rounded text-white">✍</span>
                    <h3 className="mt-2 mb-0">{account.name}</h3>
                    <span>{account.designation}</span>

                    <div className="d-flex flex-row justify-content-between" >
                    <h7 className="text-right text-dark" >Phone : { account.contact}</h7>
                    <h7 className="text-right text-dark" >{ account.branch}</h7>
                    </div>    

                    <div className="px-4 mt-1">
                        <p className="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    
                    </div>
                    
                     {/* <ul className="social-list">
                        <li><i className="fa fa-facebook"></i></li>
                        <li><i className="fa fa-dribbble"></i></li>
                        <li><i className="fa fa-instagram"></i></li>
                        <li><i className="fa fa-linkedin"></i></li>
                        <li><i className="fa fa-google"></i></li>
                    </ul> */}
                    
                    <div className="buttons">
                        
                        <button className="btn btn-outline-primary px-4">Message</button>
                        <button className="btn btn-primary px-4 ms-3">Contact</button>
                    </div>
                    
                    
                </div>
                
               
                
                
            </div>
            
        </div>
        
    </div>
    
</div>
 {/* <h1> {account.name}</h1>
 <h1> {account.email}</h1>
 <h1> {account.contact}</h1> */}
 {/* <h1> {
    account.name==="student" ? account.branch : <h1></h1>
    
    }</h1> */}
  {/* <h1>{account.designation}</h1>  
 <h1> hello , this your profile</h1> */}
 
 
 </> 

   )
}

export default Profile;
import {React,useState} from 'react'
import { Navigate } from 'react-router-dom';
import API from '../../services/api'

const style1 = {
  width: "100%",
  wordWrap: "break-word",
  overFlow: " hidden"
}
const Add=()=>{

    const [data, setData] = useState({
        name: "",
        rollno:"",
        email: "",
        designation:"",
        contact:"",
        branch: "",
        password:"",
      });

    const dataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
      }

      function checkPassword(password) {
   
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;
      
        
        if (uppercaseRegex.test(password) &&
            lowercaseRegex.test(password) &&
            digitRegex.test(password)) {
          return true;
        } else {
          return false;
        }
      }

     const userAdd=async(e)=>{
      e.preventDefault();
        
        if(data.name.length ===0 || data.email.length ===0 || data.designation.length ===0 || data.contact.length ===0 || data.password.length===0){
          alert("Please fill all given fields");
          return;
        }
        else if(data.contact.length<10){
          alert("Contact number must be 10 digits");
        }
        else if(data.password.length<8 ){
          alert("password length must be at least 8 characters");
          return;
        }
        else if(!checkPassword(data.password)){
          alert("password must at least one Uppercase ,Lowercase and special character");
          return;
        }

        const add=await API.adduser(data);
        if(Response.isSuccess){
          setData({});
            Navigate('/admindashboard');
        }
        
     } 

return (
 <div>

            <button type="button" className="btn btn-outline-info btn-lg container" data-toggle="modal" data-target="#myModal" style={style1}>Adduser</button>


            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">

                <div className="modal-content">
                  <div className="modal-header">
                
                    <h4 className="modal-title text-center mb">Add User</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="container-fluid" >
                   
                    <form >
                      <div className="form-group" >
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          name="name"
                          onChange={dataChange}
                          value={data.name}
                          placeholder="Name" />
                      </div>
                      
                      <div className="form-group" >
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          name="rollno"
                          onChange={dataChange}
                          value={data.rollno}
                          placeholder="rollno" />
                      </div>


                      <div className="form-group" >

                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          name="email"
                          onChange={dataChange}
                          value={data.email}
                          placeholder="Email address" />

                      </div>
                      <div className="form-group">

                        <input type="text" className="form-control"
                          name="designation"
                          onChange={dataChange}
                          value={data.designation}
                          placeholder="designation" />
                      </div>
                      <div className="form-group">

                      <input type="String" className="form-control"
                          name="contact"
                          onChange={dataChange}
                          value={data.contact}
                          placeholder="Contact" />
                      </div>
                      <div className="form-group">

                        <input type="text" className="form-control"
                          name="branch"
                          onChange={dataChange}
                          value={data.branch}
                          placeholder="Branch" />
                      </div>

                      <div className="form-group">

                        <input type="password" className="form-control"
                          name="password"
                          value={data.password}
                          onChange={dataChange}
                          placeholder="password" />
                      </div>

                      <button data-dismiss="modal" type="submit" className="btn btn-primary mb-3" onClick={userAdd}>Add User</button>
                    </form>
                  </div>

                  </div>

                  
                </div>

              </div>
            </div> 


)
}

export default Add;
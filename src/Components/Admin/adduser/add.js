import {React,useState} from 'react'
import { Navigate } from 'react-router-dom';
import API from '../../../services/api'
const style1 = {
  width: "100%",
  // textDecoration:"none",
  wordWrap: "break-word",
  overFlow: " hidden"
}
const Add=()=>{
    const [data, setData] = useState({
        name: "",
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

     const userAdd=async(e)=>{
      e.preventDefault();
        const add=await API.adduser(data);
        if(Response.isSuccess){
          setData({});
            Navigate('/admindashboard');
        }
        
     } 

return (
 <div>

            <button type="button" className="btn btn-info btn-lg container" data-toggle="modal" data-target="#myModal" style={style1}>Adduser</button>


            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">

                <div className="modal-content">
                  <div className="modal-header">
                
                    <h4 className="modal-title text-center mb">Add User</h4>
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

                      <input type="Number" className="form-control"
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
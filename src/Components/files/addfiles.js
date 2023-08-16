import axios from 'axios';
import { React, useEffect, useState, useContext } from 'react'
import { Navigate, Link } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import API from '../../services/api'
import del from '../../images/del.svg'

const style1 = {
  width: "100%",
  wordWrap: "break-word",
  overFlow: " hidden"
}



const Addfile = (props) => {
  const { account } = useContext(DataContext);
  const [data, setData] = useState({

    email: "",
    branch: "",
    description: "",
    filename: "",
    course: "",
    image_name: "",
    title: "",
    id:"",

  });
  const [allfiles, setAllFiles] = useState([])

  const [file, setFile] = useState('')


  const fileChange = (e) => {
    setFile(e.target.files[0])
  }

  var res;
  const dataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  useEffect(() => {


    const getImage = async () => {
      const URL = "https://course-management-backend.onrender.com/file/upload";
      const data1 = new FormData()
      data1.append("file", file);
      data1.append("name", file.name);
      data.image_name = file.name;

      try {
        let response = await axios.post(URL, data1)
        if (response.status == 200) {
          res = response.data;

          setData({ ...data, filename: response.data, email: account.email, branch: props.index, course: props.course });
          
          // if(account.designation==="student") {
          //   console.log("you are student",props._id);
          //   data.id=props._id;
          // }
          //  data.filename=response.data
          //  data.email=account.email
          //  data.branch=props.index
          //  data.course=props.course
          console.log("--", data.filename, data.description)
        }
      }
      catch (error) {
        console.log('error in adding file');
      }
    }

    getImage();



  }, [file])


  useEffect(() => {


    const getAllfiles = async (req, res) => {
      const response = await API.getallfiles(props.course);
      if (response.isSuccess) {
        console.log(response.data);
        setAllFiles(response.data);
      }
    }
    getAllfiles();

  }, []);

  var ok = false;
  const fileAdd = async (e) => {
    e.preventDefault();
    console.log(data);

    // setData({ ...data, filename : res ,email:account.email ,branch : props.index });
    console.log("---->", data);
   
    const response = await API.files(data);
    if (response.isSuccess) {
      console.log(response.data);

      res = response.data;
    }

  }

  return (

    <>
      <div>

        {
          account.designation === "faculty" || "student" ?
            <div>
              {
 account.designation === "faculty" ?
              <button type="button" className="btn btn-info btn-lg container" data-toggle="modal" data-target="#myModal3" style={style1}>Add files in course</button>
            :
            <h1></h1>
            }

              <div id="myModal3" className="modal fade" role="dialog">
                <div className="modal-dialog">

                  <div className="modal-content">
                    <div className="modal-header">

                      <h4 className="modal-title text-center mb">Add files</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="container-fluid" >

                    <div className="form-group">

<input type="text" className="form-control"
  name="title"
  onChange={dataChange}
  value={data.title}
  placeholder="title" row="3" />
</div>

                      <form >


                        <div className="form-group">

                          <input type="file" className="form-control-file" id="exampleFormControlFile1 " onChange={fileChange} />
                        </div>

                        <div>
                          {

                            account.designation === "student" ?
                              <div>

                                {/* <div className="form-group">

                                  <input type="text" className="form-control"
                        
                                    placeholder="Title" />
                                </div>



                                <div className="form-group">

                                  <input type="text" className="form-control"
                               
                                    placeholder="Name" />
                                </div> */}

                                {/* <div className="form-group">

                                  <input type="text" className="form-control"
                               
                                    placeholder="Roll_no" row="3" />
                                </div> */}
                              </div>
                              : <h1></h1>
                          }
                        </div>


                        <div className="form-group">

                          <textarea type="text" className="form-control"
                            name="description"
                            onChange={dataChange}
                            value={data.description}
                            placeholder="description" row="3" />
                        </div>
                        <button data-dismiss="modal" type="submit" className="btn btn-primary mb-3" onClick={fileAdd}>Add files </button>
                      </form>
                    </div>

                  </div>


                </div>

              </div>
            </div>
            :
            <h1></h1>
        }

        {
          account.designation != "admin" ?
            <div className="container  mt-5">
              <h1>Learning Materials</h1>
              {

                allfiles.map(file => {
                  return (
                    <div>
                      <div className="card continer point" style={{ width: "100%" }}>
                        <h5 className="card-header">{file.title} </h5>
                        <div className="card-body">
                          {
                            account.designation === "faculty" ? <li class="text-right" type="submit" onClick={async () => {
                              const response = await API.deleteFile(file._id);
                            }}><img src={del}></img></li> : <h1></h1>
                          }

                          <h5 className="card-title">{file.description}</h5>
                          <Link to={file.filename} download={file.filename} style={{ textDecoration: "none", color: 'inherit' }}>
                            <li type="button" className="btn btn-outline-success container" style={{ textOverflow: "ellipsis", width: "60%" }} >{file.image_name}  </li>
                          </Link>
                          {/* <p className="card-text">{file.description}</p> */}
                          {
                          
                          account.designation === "student" ? <button type="button" className="btn btn-primary btn-lg container" data-toggle="modal" data-target="#myModal3" style={{ width: "40%", overflow: "auto" }} onClick={()=>{
                           console.log("hello i am in add file")
                            data.id=file._id;
                           
                          }}>Add files in course</button> : <h1></h1>
                           
                    
                          }
                          
                          {
                               account.designation === "faculty" ?    <Link to={`/submission/${file._id}`} download={file.filename} style={{ textDecoration: "none", color: 'inherit' }}>
                               <li type="button" className="btn btn-outline-success container" style={{ textOverflow: "ellipsis", width: "60%" }} >Submission  </li>
                             </Link> :<h1></h1>

                          }

                        </div>
                      </div>
                      <br></br>
                    </div>
                  )
                })

              }
            </div>
            : <h1></h1>
        }
      </div>
    </>
  )
}

export default Addfile;
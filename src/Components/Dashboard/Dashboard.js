import { React, useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom'
import API from '../../services/api';
import { branches } from '../Data/branch.js'
import Course from '../getALLCourses/course.js'
import AddCourse from '../getALLCourses/addCourse'
import { DataContext } from '../../context/DataProvider';
import Add from '../adduser/add'
import StudentGrade from '../Grades/studentgrade';
import axios from 'axios';
import AllStudent from '../student/allstudent';
import Banner from '../getALLCourses/banner.js'
import '../css/detail.css'
import './dashboard.css'
import learn from '../../images/learn2.jpg'

const img1 = "https://images.pexels.com/photos/2792043/pexels-photo-2792043.jpeg?cs=srgb&dl=pexels-steshka-willems-2792043.jpg&fm=jpg"
const style1 = {
  width: "100%",
  // textDecoration:"none",
  wordWrap: "break-word",
  overFlow: " hidden"
}



const AdminDashboard = () => {

  const { account } = useContext(DataContext);

  console.log(":::", account);

  const [searchParams] = useSearchParams();
  const branch = searchParams.get("branch")


  const Navigate = useNavigate();
  const [data, setData] = useState({
    facultyname: "",
    facultyemail: "",
    coursename: "",
    branch: "",
    image: img1
  });

  const dataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }
  const [allCourse, setCourse] = useState([]);
  const [torender, setRender] = useState("")

  const courseAdd = async (e) => {
    e.preventDefault();
    console.log(data)

    // if (data.facultyemail.length === 0 || data.facultyname.length === 0 || data.coursename.length === 0 || data.branch.length === 0) {
    //   alert("Please fill all the fields");
    //   return;
    // }
    const response = await API.addCourse(data);
    console.log("-----",response)
    if (response.isSuccess) {

      console.log(response.data)

      setCourse(response.data);
      setData({})
      console.log('successfully added');

    }
    // else if(response.code===401){
    //   console.log("---bahut error ");
    //   alert(" faculty email is not valid ");
    // }
    // else if(response.code===403){
    //   alert("please fill all the fields");
    // }
    // else{
    //   alert("faculty email is not valid or please fill all the fields ")
    // }
  }



  useEffect(() => {

    const getData = async () => {
      console.log("GET ALL COURSES")
      const response = await API.getCourses({ branch: branch || "" });

      if (response.isSuccess) {
        console.log("Yes", "we get course from database-->", response.data);
        setCourse(response.data);

      }
    }

    getData();
  }, [branch])



  const [file, setFile] = useState('')

  const fileChange = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {


    const getImage = async () => {
      const URL = "https://course-management-backend.onrender.com/file/upload";
      // const URL = "http://localhost:8080/file/upload";
      const data1 = new FormData()
      data1.append("file", file);
      data1.append("name", file.name);

      try {
        let response = await axios.post(URL, data1)
        if (response.status == 200) {
          //  res=response.data;
          setData({ ...data, image: response.data });
          console.log("----upload>", data);
          data.image = response.data
          // console.log("--",data.filename,data.description)

        }
      }
      catch (error) {
        console.log('error..');
      }
    }

    getImage();



  }, [file])



  return (
    <>
      {/* <Banner></Banner> */}
      <div class="card">
        <nav class="container navbar navbar-expand-lg navbar-light bg-light mt-5 ">
          <img src={learn} style={{ width: "200px", height: "50px" }}></img>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li>
                <Link to="/profile">
                  <button type="button" className="btn btn-outline-info btn-lg container " style={style1}>Profile</button>
                </Link>
              </li>
              <li class="nav-item active">
                <AllStudent></AllStudent>
              </li>
              <li class="nav-item">
                <Link to={`/allgrades/${account.email}`}>

                  {
                    account.designation === "student" ?
                      <button type="button" className="btn btn-outline-info btn-lg container" style={style1}>Grades</button>

                      :
                      <h1></h1>
                  }



                </Link>

              </li>
              <li class="nav-item">
                {
                  account.designation != "student" ?
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle btn btn-outline-info btn-lg container" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Course
                      </button>
                      <button className="dropdown-menu  container" aria-labelledby="dropdownMenuButton" style={{ width: "100%" }}>
                        <div class="column">
                          {

                            branches.map(b => {
                              return (
                                //  <Link to={`/dashboard/?branch=${b.branch}`} style={{ textDecoration: "none", color: 'inherit' }}>
                                <div>
                                  {
                                    account.designation != "student" ?

                                      <Link to={`/dashboard/?branch=${b.branch}`} type="button" className="btn btn-outline-success container" style={style1}>  {b.branch} </Link>

                                      : <h1></h1>

                                  }
                                  {/* </Link> */}
                                </div>
                              )
                            })
                          }

                        </div>

                      </button>

                    </div>
                    : <h1></h1>
                }

              </li>

              <li>
                {

                  account.designation == "admin" ? <div style={style1}>
                    <Add style={style1}></Add>
                  </div>

                    :
                    <h1></h1>
                }


              </li>
              <li> {

                account.designation == "admin" ? <div style={style1}>

                  <button type="button" className="btn btn-outline-info btn-lg container " data-toggle="modal" data-target="#myModal1" style={style1}>AddCourse</button>


                  <div id="myModal1" className="modal fade " role="dialog">
                    <div className="modal-dialog">

                      <div className="modal-content">
                        <div className="modal-header">
                          {/* <button type="button" ></button> */}

                          <h4 className="modal-title text-center mb">Add Course</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="container-fluid" >

                          <form >
                            <div className="form-group" >
                              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                name="facultyname"
                                onChange={dataChange}
                                value={data.facultyname}
                                placeholder="Name" />
                            </div>


                            <div className="form-group" >

                              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                name="facultyemail"
                                onChange={dataChange}
                                value={data.facultyemail}
                                placeholder="Email address" />

                            </div>
                            <div className="form-group">

                              <input type="text" className="form-control"
                                name="coursename"
                                onChange={dataChange}
                                value={data.coursename}
                                placeholder="Course" />
                            </div>
                            <div className="form-group">

                              <input type="text" className="form-control"
                                name="branch"
                                onChange={dataChange}
                                value={data.branch}
                                placeholder="Branch" />
                            </div>

                            <div className="form-group">

                              <input type="file" className="form-control-file" id="exampleFormControlFile1 " onChange={fileChange} />
                            </div>

                            <button data-dismiss="modal" type="submit" className="btn btn-primary mb-3" onClick={courseAdd}>Add course</button>
                          </form>
                        </div>

                      </div>


                    </div>

                  </div>


                </div>

                  :
                  <h1></h1>
              }</li>
              <li class="nav-item dropdown">
                <Link to="/allfaculty">
                  <button type="button" className="btn btn-outline-info btn-lg container" style={style1}> ALL Faculty</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>


        <div className="container mb-5 card">
          <div className="container row   text-center d-flex justify-content-start ">


            {
              allCourse.map(course => {

                return (
                  <Link to={`/details/${course._id}`} style={{ textDecoration: "none", color: 'inherit' }}>
                    {
                      account.designation === "admin" ? <Course name={course.facultyname} email={course.facultyemail} course={course.coursename} branch={course.branch} image={course.image}>
                      </Course>

                        : account.designation === "faculty" && account.email === course.facultyemail ? <Course name={course.facultyname} email={course.facultyemail} course={course.coursename} branch={course.branch} image={course.image}>
                        </Course>
                          : account.designation === "student" && account.branch === course.branch ? <Course name={course.facultyname} email={course.facultyemail} course={course.coursename} branch={course.branch} image={course.image}> </Course>
                            : <h1></h1>

                    }

                  </Link>
                )

              })

            }

          </div>




        </div>

      </div>
    </>
  )

}

export default AdminDashboard;
import { React, useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom'
import API from '../../services/api';
import { branches } from '../Data/branch.js'
import Course from '../Admin/getALLCourses/course.js'
import AddCourse from '../Admin/getALLCourses/addCourse'
import { DataContext } from '../../context/DataProvider';
import Add from '../Admin/adduser/add'
import StudentGrade from '../student/studentgrade';

import AllStudent from '../student/allstudent';
import Banner from '../Admin/getALLCourses/banner.js'
import '../css/detail.css'

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
  //  console.log("....",branch);

  //  const location=useLocation();
  //  const a=location.search?.split("=")[1] || "ALL";
  //  console.log(a);

  const Navigate = useNavigate();
  const [data, setData] = useState({
    facultyname: "",
    facultyemail: "",
    coursename: "",
    branch: ""
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
    const response = await API.addCourse(data);
    if (response.isSuccess) {
      // count=;
      console.log(response.data)
      // setRender(torender + 1);
      // console.log(torender);
      setCourse(response.data);
      setData({})
      console.log('successfully added');
      // Navigate('/admindashboard')
    }
  }

  //  const {branch} =useParams();
  // console.log("...",branch);

  useEffect(() => {

    const getData = async () => {
      console.log("GET ALL COURSES")
      const response = await API.getCourses({ branch: branch || "" });
      // console.log(response.data);
      if (response.isSuccess) {
        console.log("Yes", "we get course from database-->",response.data);
        setCourse(response.data);
        
      }
    }

    getData();
  }, [branch])


  return (
    <>
    <Banner></Banner>
   

      <div classNameName="container-fluid">
        <div className="row border border-primary">

          <div className=" col-12 col-sm-12 col-lg-2 ">

            


            <Link to="/profile">
              <button type="button" className="btn btn-info btn-lg container" style={style1}>Profile</button>
            </Link>
            {

              account.designation == "admin" ? <div style={style1}>
                <Add style={style1}></Add>
                <button type="button" className="btn btn-info btn-lg container " data-toggle="modal" data-target="#myModal1" style={style1}>AddCourse</button>


                <div id="myModal1" className="modal fade " role="dialog">
                  <div className="modal-dialog">

                    <div className="modal-content">
                      <div className="modal-header">
                        {/* <button type="button" ></button> */}
                        <h4 className="modal-title text-center mb">Add Course</h4>
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

                          <button data-dismiss="modal" type="submit" className="btn btn-primary mb-3" onClick={courseAdd}>Add course</button>
                        </form>
                      </div>

                    </div>


                  </div>

                </div>
           

              </div>

                :
                <h1></h1>
              // account.designation == "faculty" ?

              // <div>
              //   <li type="button" className="btn btn-outline-success container">Grade</li>
              // </div>

              // :

              // account.designation == "student" ?

              // <div>
              //    <li type="button" className="btn btn-outline-success container">Grade</li>
              // </div>

              // :
              // <h1></h1>


            }

<Link to="/allfaculty">
                <button type="button" className="btn btn-info btn-lg container" style={style1}> ALL Faculty</button>
                </Link>
                <AllStudent></AllStudent>

            <Link to={`/allgrades/${account.email}`}>

              {
                account.designation === "student" ?
                  <button type="button" className="btn btn-info btn-lg container" style={style1}>Grades</button>
                   
                  :
                  <h1></h1>
              }



            </Link>

            

          







            {/* {
              account.designation==="student" ? <StudentGrade></StudentGrade> : <h1></h1>

            } */}
            <ol className="text-left  container">

              {

                branches.map(b => {

                  return (

                    <Link to={`/dashboard/?branch=${b.branch}`} style={{ textDecoration: "none", color: 'inherit' }}>

                      {
                        account.designation != "student" ?

                          <li type="button" className="btn btn-outline-success container" style={style1}>  {b.branch}</li>

                          : <h1></h1>

                      }
                    </Link>
                  )
                })

              }


            </ol>

          </div>

          <div className="col-12 col-sm-12 col-lg-10 border border-primary text-center ">

            <div className="row  ml-3 mt-4" >
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



      </div>
      

    </>
  )

}

export default AdminDashboard;
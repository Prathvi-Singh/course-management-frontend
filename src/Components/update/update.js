import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import API from '../../services/api';
import { branches } from '../Data/branch.js'
import Course from '../Admin/getALLCourses/course.js'
import AddCourse from '../Admin/getALLCourses/addCourse'

const style1 = {
  width: "100%",
  // textDecoration:"none",
  wordWrap: "break-word",
  overFlow: " hidden"
}

const UpdateCourse = () => {

 const {id}=useParams();
 console.log("....",id);

  const Navigate = useNavigate();
  const [data, setData] = useState({
    facultyname: "",
    facultyemail: "",
    coursename: "",
    branch: "",
    image:"",
  });



  const dataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  useEffect(()=>{
    
    const CourseInDetail=async()=>{
        const response =await API.DetailData(id);

        if(response.isSuccess){
         
          setData(response.data);
          console.log("-|-|-",data);
        }


    }

    CourseInDetail();


},[])


  const updateCourse = async(e) => {
    e.preventDefault();
   // console.log(data)
    const response = await API.update(data);
    if (response.isSuccess) {
     
      console.log(response.data)
     
      console.log('successfully added');
       Navigate(`/details/${id}`)
    }
  }

  const [file,setFile]=useState('')

  const fileChange=(e)=>{
    setFile(e.target.files[0])
  }

  useEffect(()=>{

        
    const getImage=async()=>{
     const URL = "https://course-management-backend.onrender.com/file/upload";
     const data1 =new FormData() 
     data1.append("file",file);
     data1.append("name", file.name);
     
     try{
         let response= await axios.post(URL,data1)
         if(response.status == 200){
        //  res=response.data;
         setData({ ...data, image : response.data  });
         console.log("----update-->",data);
        data.image=response.data
         // console.log("--",data.filename,data.description)
          
         }
        }
        catch(error){
         console.log('error..');
        }
    } 

    getImage();


    
 },[file]) 




  return (
    <>
      <h1>
        hello , this is admin Dashboard
      </h1>


      <div className="container-fluid">
        <div className="row border border-primary">

          <div className=" col-12 col-sm-12 col-lg-2 ">

            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">UpdateCourse</button>
           


            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">

                <div className="modal-content">
                  <div className="modal-header">
                    {/* <button type="button" ></button> */}
                    <h4 className="modal-title text-center mb">Update Course</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="container-fluid" >
                    <form >
                      <div className="form-group" >
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          name="facultyname"
                          onChange={dataChange}
                          value={data. facultyname}
                          placeholder="Name" />
                      </div>


                      <div className="form-group" >

                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          name="facultyemail"
                          onChange={dataChange}
                          value={data. facultyemail}
                          placeholder="Email address" />

                      </div>
                      <div className="form-group">

                        <input type="text" className="form-control"
                          name="coursename"
                          onChange={dataChange}
                          value={data. coursename}
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
                           
                           <input type="file" className="form-control-file" id="exampleFormControlFile1 " onChange={fileChange}/>
                            </div>

                      <button data-dismiss="modal" type="submit" className="btn btn-primary mb-3" onClick={updateCourse}>Update course</button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          
          </div>
        </div>



      </div>
    </>
  )

}

export default UpdateCourse;
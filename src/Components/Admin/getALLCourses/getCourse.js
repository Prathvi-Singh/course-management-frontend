// import {React ,useState,useEffect}  from 'react' 
// import API from '../../../services/api'
// import Course from './course.js'

// const Courses=(props)=>{
//   const [allCourse,setCourse]=useState([]);
//   const [data,setData]=useState("");

//  useEffect(()=>{
 
//     const getData =async()=>{
//         console.log("GET ALL COURSES")
//       const response=await API.getCourses();
//       console.log(response.data);
//       if(response.isSuccess){
//         console.log("Yes" ,"we get course from database");
//         setCourse(response.data);
//       } 
//     }

//     getData();
//  },[])

//   return (
//     <>
//   {
//    allCourse.map(course=>{
//     return <Course name={course.facultyname} email={course.facultyemail} course={course.coursename} branch={course.branch} ></Course>
  
//    })

//   }
  
//     </>


//   )

// }

// export default Courses;
import {React,useEffect,useState,useContext} from 'react'
import {useParams} from 'react-router-dom' 
import API from '../../services/api'

const StudentByBranch=()=>{
    const {branch}=useParams();
    const [students,setStudents]=useState([]);
    
    useEffect(()=>{

      const student=async()=>{
       const response=await API.getallstudents(branch);
       if(response.isSuccess){
        setStudents(response.data);
       }
      
      }

      student();

    },[])

    return(
         <>
       <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
      
    </tr>
  </thead>
  <tbody>
   



    
     {   students.map(student=>{
            return(
          
           <tr>
           <th scope="row">{student.name}</th>
           <td>{student.email}</td>
           <td>{student.contact}</td>
         
         </tr>
            )
        })
        }
   
      
  </tbody>
</table>
        
         </>
    )
}

export default StudentByBranch;
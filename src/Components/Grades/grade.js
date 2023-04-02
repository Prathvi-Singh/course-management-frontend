import {React,useState,useContext,useEffect} from 'react'
import {useParams} from 'react-router-dom'

import API from '../../services/api'
import '../css/grade.css'

const Grade=()=>{
    const {branch} = useParams();
    console.log(branch);
    var b=branch.split("Y");
    var branch1=b[0];
    var course=b[1]; 
  
    console.log(branch1,"=====",course);
    const [data,setData]=useState([]);
    const [grades,setGrades]=useState([]);
    const [grade,setGrade]=useState({});
   
    useEffect(()=>{
      

       const allstudents=async()=>{
           const response = await API.getallstudents(branch1);
           if(response.isSuccess){
            const students=response.data;
            setData(students);
            

            console.log(data.length);
            console.log("yes,we get all students");
           }
       }
        
       allstudents();

    },[]);
    // const changegrade=(e,)=>{
        
    // }

    const saveGrade =()=>{
       setGrades((grades)=>{
        return [...grades,grade];
       })
       console.log(grades);
      
    }

    const submitScore=async()=>{
        const response=await API.submitGrades(grades);
        if(response.isSuccess){
            console.log("submitted successfully");
        } 
    }
    
    return (
      <>

<table className="table container">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Enter Grade</th>
      <th scope="col">SAVE </th>
    </tr>
  </thead>
  <tbody>
   
   {/* <button type="button" className="btn btn-info btn-lg container" data-toggle="modal" data-target="#myModal3" onClick={allstudents} >Add grades in course</button> */}
     
     
     
      {
     
    
      data.map(value=>{
        return (
            



            // <div className="row">
        

    <tr>
      <th scope="row">{value.name}</th>
      {/* <td>{value.name}</td> */}
      <td>{value.email}</td>
      <td>  <input type="text" placeholder="addgrades" onChange={(e)=>{
            setGrade({name:value.name , email:value.email ,grade:e.target.value,branch:branch1,course:course});
            console.log(grade);
        }}></input>
        </td>
        <td> <button type="submit" onClick={saveGrade}>SAVE</button></td>
    </tr>

   
 

 



      

        )
      })
     

      }
       </tbody>

</table>
      <button type="submit" onClick={submitScore}>ADD GRADE</button>    
      
      </>

    )
}

export default Grade;
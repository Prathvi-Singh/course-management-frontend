import {React,useEffect,useContext,useState} from 'react';
import API from '../../services/api'

const AllFaculty=()=>{
   const [data,setData]=useState([]);
    useEffect(()=>{
  
     const Faculty=async()=>{
        const response=await API.allfaculty();
        if(response.isSuccess){
           setData(response.data);
        }
     }

     Faculty();

    },[]);


    return (
      
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
   



    
     {   data.map(faculty=>{
            return(
          
           <tr>
           <th scope="row">{faculty.name}</th>
           <td>{faculty.email}</td>
           <td>{faculty.contact}</td>
         
         </tr>
            )
        })
        }
   
      
  </tbody>
</table>
</>
    )

}

export default AllFaculty;
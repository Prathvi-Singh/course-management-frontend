import {React,useState,useEffect} from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api'

var count=0;

const Submission = ()=>{
   const [data,setData]=useState([]);
    const {id}=useParams();

    useEffect(()=>{
        console.log("hello I am all submission");
         const getAllSubmissions=async()=>{
            
            const response =await API.submission(id);
            console.log(response.data);
              if(response.isSuccess){
                console.log("HELLOOOO")
                
                setData(response.data);
              }
        } 
     
        getAllSubmissions();

    },[]);
   
    return (
       <>
       
       <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Sr No</th>
     
      <th scope="col">Email</th>
      <th scope="col">title</th>
      <th scope="col">FileName</th>
    </tr>
  </thead>
  <tbody>

     {
         data.map(sub=>{
            return(
                <tr>
                <th scope="row">{count+1}</th>
                <td>{sub.email}</td>
                <td>{sub.title}</td>
               <td> <Link to={sub.filename}>{sub.image_name}</Link></td> 
              </tr>

            )
         })

     }

   
   
  
  </tbody>
</table>


       
       </>


    )
}

export default Submission;  
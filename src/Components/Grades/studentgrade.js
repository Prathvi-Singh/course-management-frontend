import {React,useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import API from '../../services/api'


const StudentGrade=()=>{
    
    const [allgrades,setAllGrade]=useState([]);
    const {email} =useParams();
    const allgrade=async()=>{
          
        const response = await API.allGrades(email);
        if(response.isSuccess){
            console.log(response.data);
            setAllGrade(response.data);
        }


     }  

    // useEffect(()=>{
       
   
     
    //  allgrades();

    // },[]);


    return (
      
        <>
        
     
     

     <button type="button" className="btn btn-info btn-lg container" data-toggle="modal" data-target="#myModal4" onClick={allgrade}> ALL grades</button>
     { 
     allgrades.length===0 ? <h1></h1>   
     :
  <table className="table">
  <thead>
    <tr>
      <th scope="col">CourseName</th>
      <th scope="col">Grade</th>

    </tr>
  </thead>
  <tbody>





        {
          
          allgrades.map(g=>{
           
            return (
                 
                <tr>
                <th scope="row"> {g.course}</th>
                <td> {g.grade}</td>
                
              </tr>

                // <div className="row container d-flex flex-row justify-content-between" index={g._id}>
                //     <div>

                   
                //       {g.course}
                     
                //     </div>
                //     <div>
                //         {g.grade}
                      
                //     </div>

                // </div>    
            )

          })

            
        }
          </tbody>
</table>


        }
        </>
    )

}

export default StudentGrade;
import{ React ,useState,useEffect,useContext} from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import AddFiles from '../files/addfiles.js'
import Grade from '../Grades/grade.js'
import StudentGrade from '../Grades/studentgrade';
import '../css/detail.css'
import edit from '../../images/edit.svg'
import del   from '../../images/del.svg'

const img1="https://images.pexels.com/photos/2792043/pexels-photo-2792043.jpeg?cs=srgb&dl=pexels-steshka-willems-2792043.jpg&fm=jpg"

const Details=()=>{
    const Navigate =useNavigate();
    const [detail,setDetails]=useState();   
    const {id}=useParams();
    console.log(detail);
    const {account}=useContext(DataContext);

    useEffect(()=>{
    
        const CourseInDetail=async()=>{
            const response =await API.DetailData(id);

            if(response.isSuccess){
              console.log(response.data);
              setDetails(response.data);
              if( detail.image===undefined ){
                detail.image=img1;
              } 
            }


        }
        CourseInDetail();
    },[])

 

    const deleteCourse=async()=>{
    const response=await API.deletecourse(id);
       if(response.isSuccess){
        console.log("deleted....");
           Navigate('/dashboard');
       }
    } 


    return (
        <>
       
<div class="contianer border border-dark" style={{height:"100%"}} >
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

   
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
      <img className="card-img-top" src={img1} alt="Card image cap" style={{height:"250px"}}/>
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Edit</button>
      </div>
    </div>

  </div>
</div>
      
        {
            detail===undefined ? <h1> </h1> 
            : 
            <div >
               <div className="contaner-fluid bg-dark ">
               <h1 className="text-center text-light"> {detail.branch}</h1>
               <div className="d-flex flex-row justify-content-between" style={{height:"100%"}}>
              
               <h1 className="text-left text-light" >{ detail.coursename}</h1>
               <div className="column">
               <h1 className="text-left text-light">{ detail.facultyname}</h1>
               <h7 className="text-right text-light" >{ detail.facultyemail}</h7>
               </div>
               </div>
                
                </div> 
                
              
      
       
       
       



       {
        
        account.designation==="admin" ? 
        <div>
        <Link to={`/update/${detail._id}`}><img src={edit} style={{width:"25px"}}></img></Link>
        <span type="submit" onClick={deleteCourse}><img src={del} style={{width:"25px"}}></img> </span>
       </div>

       :

       <h1></h1>

       }        
         </div>
        }
       

       <div className="container mt-5">
        <div className="row ">

          <div className=" col-12 col-sm-12 col-lg-2 ">
          
          {
          detail===undefined ? <h1></h1>
          :
          <Link to={`/grade/${`${detail.branch}Y${detail.coursename}`}`}>

        {
           account.designation==="faculty" ?
           <div>
           <button type="button" className="btn btn-info btn-lg container" data-toggle="modal" data-target="#myModal3" >Add Grade</button>
           
           </div>
           :
           <h1></h1>

        }

    
  
    </Link>
    
}
{/* <button type="button" class="btn btn-info btn-lg " data-toggle="modal" data-target="#myModal">Open Modal</button> */}



          </div>

          <div className="col-12 col-sm-12 col-lg-10  text-center card">
          {
          detail===undefined  ? <h1>loading</h1>
          :
         
          account.designation==="faculty" || "student" ?  <AddFiles index={detail.branch} course={detail.coursename} _id={detail._id} email={ detail.facultyemail}></AddFiles>
         
          :
          <h1></h1>

       }  
          </div>
        </div>



      </div>





{
    //       detail===undefined ? <h1></h1>
    //       :
    //       <Link to={  `/allgrades/${account.email}`}>

    //     {
    //        account.designation==="student" ?
    //        <StudentGrade></StudentGrade>
       
    //        :
    //        <h1></h1>
    //     }

    
  
    // </Link>




  

       }

       
</div>
     
     
        </>
    )
}

export default Details;
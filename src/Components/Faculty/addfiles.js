import axios from 'axios';
import {React,useEffect,useState,useContext} from 'react'
import { Navigate ,Link} from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import API from '../../services/api'
import del from '../../images/del.svg'



const style1 = {
  width: "100%",
  // textDecoration:"none",
  wordWrap: "break-word",
  overFlow: " hidden"
}



const Addfile=(props)=>{
  const {account}=useContext(DataContext);
    const [data, setData] = useState({
      
        email: "",
        branch: "",
        description:"",
        filename:"",
        course:"",
        image_name:"",
        title:"title"
       
      });
     const [allfiles,setAllFiles]=useState([])

      const [file,setFile]=useState('')
      // const [filename,setFilename]=useState('');
    
      const fileChange=(e)=>{
        setFile(e.target.files[0])
      }

    var res;
    const dataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
      }

      useEffect(()=>{

        
        const getImage=async()=>{
         const URL = "https://course-management-backend.onrender.com/file/upload";
         const data =new FormData() 
         data.append("file",file);
         data.append("name", file.name);
         data.image_name=file.name;
         
         try{
             let response= await axios.post(URL,data)
             if(response.status == 200){
              res=response.data;
            
              setData({ ...data, filename : response.data ,email:account.email ,branch : props.index,course:props.course });
            //  data.filename=response.data
            //  data.email=account.email
            //  data.branch=props.index
            //  data.course=props.course
              console.log("--",data.filename,data.description)
              
             }
            }
            catch(error){
             console.log('error..');
            }
        } 
 
        getImage();


        
     },[file]) 


useEffect(()=>{

 
  const getAllfiles =async(req,res) =>{
    const response = await API.getallfiles(props.course);
    if(response.isSuccess){
     console.log(response.data);
     setAllFiles(response.data);
    }
 }
 getAllfiles();

},[]);
 
var ok=false;
 const fileAdd=async(e)=>{
      e.preventDefault();
      console.log(data);
      
     // setData({ ...data, filename : res ,email:account.email ,branch : props.index });
     console.log("---->",data);
     const response =await API.files(data);
      if(response.isSuccess){
          console.log(response.data);
    
          res=response.data;
      }
        
} 

return (



      
      <div>
          <button type="button" className="btn btn-info btn-lg container" data-toggle="modal" data-target="#myModal3" style={style1}>Add files in course</button>


          <div id="myModal3" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
              
                  <h4 className="modal-title text-center mb">Add files</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="container-fluid" >
                  
                  <form >
 
                    
                  <div className="form-group">
                
                <input type="file" className="form-control-file" id="exampleFormControlFile1 " onChange={fileChange}/>
                    </div>
            

      {

      account.designation==="student" ?
<div>

<div className="form-group">

<input type="text" className="form-control"
// name="description"
// onChange={dataChange}
// value={data.description}
placeholder="Title" />
</div>      



<div className="form-group">

<input type="text" className="form-control"
// name="description"
// onChange={dataChange}
// value={data.description}
placeholder="Name" />
</div>

<div className="form-group">

<input type="text" className="form-control"
// name="description"
// onChange={dataChange}
// value={data.description}
placeholder="Roll_no" row="3"/>
</div>





</div>
:<h1></h1>

    

      }
                         
   {/* <div className="form-group">

<input type="text" className="form-control"
  name="title"
  onChange={dataChange}
  value={data.title}
   placeholder="title" row="3"/>
</div> 
                 */}
                    <div className="form-group">

                      <textarea type="text" className="form-control"
                        name="description"
                        onChange={dataChange}
                        value={data.description}
                        placeholder="description" row="3"/>
                    </div>
                   
                   

         
                    {/* <div className="form-group">
  <label for="exampleFormControlTextarea1">Example textarea</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div> */}
                    
                    
                    <button data-dismiss="modal" type="submit" className="btn btn-primary mb-3" onClick={fileAdd}>Add files </button>
                  </form>
                </div>

                </div>

                
              </div>

            </div>

             <div className="container  mt-5">
              <h1>Learning Materials</h1>
        {
        
        allfiles.map(file => { 
          return (
            <div>
         
         {/* // <li type="button" className="btn btn-outline-success container"> */}
          
           <div className="card continer point" style={{width:"100%"}}>
  <h5 className="card-header">Assignment </h5>
  <div className="card-body">
    {
       account.designation==="faculty" ?  <li class="text-right" type="submit" onClick={async()=>{
        const response =await API.deleteFile(file._id);
      }}><img src={del}></img></li> : <h1></h1>
    }
 
    <h5 className="card-title">{file.description}</h5>
    <Link to={file.filename} download={file.filename} style={{textDecoration:"none" ,color:'inherit'}}>
    <li type="button" className="btn btn-outline-success container" style={{textOverflow: "ellipsis",width:"60%"}} >{file.image_name}  </li>
    </Link>
    <p className="card-text">{file.description}</p>
    {
       account.designation==="student" ?   <button type="button" className="btn btn-primary btn-lg container" data-toggle="modal" data-target="#myModal3" style={{width:"40%",overflow: "auto"}}>Add files in course</button> : <h1></h1>
    }
   
  </div>
</div>
          



           {/* // </li>  */}
            
          <br></br>
          </div>
          )
        })

        }
</div>
     </div> 
   )
}

export default Addfile;
import axios from 'axios';
import {React,useEffect,useState} from 'react';
import API from '../../services/api'

var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];


const Dashboard = (req,res)=>{
    const [file,setFile]=useState('')
    const [filename,setFilename]=useState('');

    const Change=(e)=>{
      setFile(e.target.files[0])
    }
    console.log(file);

    useEffect(()=>{

        
       const getImage=async()=>{
        const URL = "http://localhost:8080/file/upload";
        const data =new FormData() 
        data.append("file",file);
        data.append("name", file.name);
        
        try{
            let response= await axios.post(URL,data)
            if(response.status == 200){
             // Navigate('/');
             console.log(response)
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
        <form>
        <div className="form-group">
          <label for="exampleFormControlFile1">Example file input</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1 " onChange={Change}/>
        </div>
      </form>


     
</>

    )
    
}

export default Dashboard;

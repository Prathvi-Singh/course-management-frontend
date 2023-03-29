import React from 'react'
import {Link} from 'react-router-dom'
import {branches } from '../Data/branch.js'

const AllStudent=()=>{
  
    return (

        <>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle btn btn-outline-info btn-lg container" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   All Student
  </button>
  <button className="dropdown-menu btn btn-info btn-lg container" aria-labelledby="dropdownMenuButton" style={{width:"100%"}}>

    {

branches.map(b=>{
            return(
                <Link className="dropdown-item" to={`/allstudents/${b.branch}`}>{b.branch}</Link> 
            )
        })
    }
   
   
  
  </button>
</div>


        
        
        </>
    )

}

export default AllStudent;
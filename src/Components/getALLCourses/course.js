import React from 'react';

//const img1="https://images.pexels.com/photos/2792043/pexels-photo-2792043.jpeg?cs=srgb&dl=pexels-steshka-willems-2792043.jpg&fm=jpg"
const Course=(props)=>{
console.log("image",props.image);
    return(
         <>
         
         <div>



<div className="card mx-3 my-4 point" style={{width:"19rem"}} >
  <img className="card-img-top" src={props.image} alt={props.image} style={{height:"230px"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.course}</h5>
    <h2 className="card-text">{props.name}</h2>
    {/* <h2 className="card-text">{props.email}</h2> */}

     <h2 className="card-text">{props.branch}</h2>
     <a href="#" className="btn btn-primary">want to view</a>
  </div>

</div>

    </div>
         
         
         
         
         </>


    )


} 

export default Course;
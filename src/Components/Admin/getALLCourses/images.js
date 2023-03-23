import React from 'react';

const style1 = {
    width: "100%",
    // textDecoration:"none",
    wordWrap: "break-word",
    overFlow: " hidden"
  }
  const img1="https://images.pexels.com/photos/2792043/pexels-photo-2792043.jpeg?cs=srgb&dl=pexels-steshka-willems-2792043.jpg&fm=jpg"

const Image=()=>{
  return (
    <>
    <li type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal4"><img className="card-img-top" src={img1} alt="Card image cap" style={{height:"250px"}}/></li>


<div id="myModal4" class="modal fade" role="dialog">
  <div class="modal-dialog">


    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

    
    </>
  )
}

export default Image;
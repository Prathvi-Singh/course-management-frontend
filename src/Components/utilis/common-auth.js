export const getType=(value,body)=>{
    console.log("hello");
     if(value.params){
      console.log("hello1");
        return {params: body}
     }
     else if(value.query){
    
          if(typeof body === 'object'){
            return {query:body._id}
          }
          else{
            return {query:body}
          }
     }
     console.log("hello2");
     return {};
  }
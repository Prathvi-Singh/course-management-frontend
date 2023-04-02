
export const API_NOTIFICATION_MESSAGES = {
  
    loading:{
        title:'Loading ...',
        message:'data is loading ,Please wait...😃'
    }
    ,
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
      title:"Error",
      message:"an errer occured while fectching response from the server , Please try again"
    },
    requestFailure:{
        title:"Error",
        message:"an errer occured while parsing request data, Please try again"
    }, 
    networkError:{
         title:"Error",
         message:"unable to connect with the server ,please internet connectivity"
    }

}

export const SERVICE_URLS={
    userSignup: {url: '/signup',method:'POST'},
    userLogin: {url: '/login',method:'POST'},
    addCourse: {url: '/addcourse',method:'POST'},
    getCourses: {url: 'getcourses',method:'GET',params:true},
    DetailData: {url: 'details',method:'GET',query:true},
    update : {url: 'update',method:'PUT',query:true},
    deletecourse : {url:'deletecourse',method:'DELETE',query:true},
    adduser : {url:'adduser',method:'POST'},
    uploadFile : {url:'/upload',method:'POST'},
    files:{url:'/files',method:'POST'},
    getallfiles:{url:'allfiles',method:'GET',query:true},
    getallstudents:{url:'allstudents',method:'GET',query:true},
    submitGrades:{url:'/submitgrades',method:'POST',query:true},
    allGrades:{url:'allgrades',method:'GET',query:true},
    allfaculty:{url:'allfaculty',method:'GET'},
    deleteFile:{url:'fileDelete',method:'DELETE',query:true},
    submission:{url:'submission',method:'GET',query:true},
   // allstudents:{url:'allstudents',method:'GET',query:true}
    


    // getCourseByBranch : {url:'/course',method:'GET',query:'true'}
}
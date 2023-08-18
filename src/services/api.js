import axios from 'axios';
import { API_NOTIFICATION_MESSAGES ,SERVICE_URLS } from '../constants/config';
import { getType } from '../Components/utilis/common-auth.js';

// const APL_URL = "http://localhost:8080";


const APL_URL = "https://course-management-backend.onrender.com";

const axiosInstance =axios.create({
    baseURL: APL_URL,
    timeout:100000,
    headers:{
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
      
        if(config.TYPE.params){
            config.params =config.TYPE.params
        }
        else if(config.TYPE.query){
            config.url=config.url + '' + config.TYPE.query
            console.log(config.url);
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
   
    function (response){
        
        return processResponse(response);
    },
    function(error){
     
        return Promise.reject(processError(error));
    }
)

const processResponse=(response)=>{
   if(response.status===200){
    return {isSuccess:true,data:response.data}
   }
   else{
    return {
        isFailure:true,
        staus:response?.status,
        msg:response?.msg,
        code:response?.code,
    }
   }
}

const processError=(error)=>{
   if(error.response){
     console.log("error in response:",error.toJSON())
     return{
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.responseFailure,
        code:error.response.status
     }
   }
   else if(error.request){
    console.log("error in request:",error.toJSON())
     return{
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.requestFailure,
        code:""
    }
   }
   else{
    console.log("error in network:",error.toJSON())
    return{
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.networkError,
        code:""
    }
   }
}

const API ={};

for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data: value.method==='DELETE' ? {} : body,
            responseType:value.responseType,
            // headers:{
            //     authorization : getAccessToken()
            // },
            TYPE : getType(value,body),
            onUploadProgress: function(progressEvent){
              if(showUploadProgress){
                let percentageCompleted = Math.round((progressEvent.loaded *100)/progressEvent.total)
                showUploadProgress(percentageCompleted)
              }
            },
            onDownloadProgress: function(progressEvent){
              if(showDownloadProgress){
                let percentageCompleted = Math.round((progressEvent.loaded *100)/progressEvent.total)
                showDownloadProgress(percentageCompleted)
              }
            }
        })
    }

export default API;

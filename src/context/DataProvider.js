import { createContext ,useState } from "react";

export const DataContext = createContext(null)

const DataProvider = ({children}) =>{
    var email=sessionStorage.getItem('email');
    var designation=sessionStorage.getItem('designation');
    var branch=sessionStorage.getItem('branch');
    var contact=sessionStorage.getItem('contact');
    var name=sessionStorage.getItem('name');
    var id=sessionStorage.getItem('id');
    const [account,setAccount]=useState({id:id,email:email ,designation:designation,branch:branch,contact:contact,name:name});
    console.log(account);
    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
           {children}
        </DataContext.Provider>
    )
}

export default  DataProvider;
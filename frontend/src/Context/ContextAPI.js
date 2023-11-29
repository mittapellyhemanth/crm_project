import {  useState } from "react";
import DetailsContext from "./CreateContext";


export default function ContextAPI({ children }) {
  const [flag,setFlag] = useState(false)
  const [projectStatusData,setProjectStatusData] = useState({})
  const [result, setResult] = useState({})
  const [error,setError] = useState('')
  let [personLogin, setPersonLogin] = useState("");
 
  const[designation,setDesignation]=useState('')  
  let [personName,setPersonName] = useState("")
  
  const[getOneData,setGetOneData] = useState([])
  // const [input,setInput] = useState('')  /////project view
  const [empyId , setEmpyId] = useState('')
  const [designationType , setDesignationType ] = useState('')
const[ProjectData,setProjectData] = useState([])
const[projectView,setProjectView] = useState({})
const[currentItems,setCurrentIteams] = useState([])



  const contextValue = {
    currentItems,setCurrentIteams, projectStatusData,setProjectStatusData,projectView,setProjectView,
   ProjectData,setProjectData, flag,setFlag,error,setError,designationType , setDesignationType,empyId , setEmpyId,designation,setDesignation,getOneData,setGetOneData,
    result,
    setResult,
    personLogin,
    setPersonLogin,
    personName,
    setPersonName
    
  };

  return <DetailsContext.Provider value={contextValue}>{children}</DetailsContext.Provider>;
}
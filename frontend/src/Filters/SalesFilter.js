import { useState } from "react";
import FilterForm from "./FilterForm";


export default function SalesFilter({searchGet,comesFrom}) {
  
  // const history = useHistory();
  // const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    Date: "",
   
    clientName: "",
    ProjectTitle: "",
    Name: ""
  });
// const [result,setResult] = useState([])
  const inputs = [
      {
        type: "date",
        placeholder: "DATE",
        name: "Date",
        required: false,
      },
      
      {
        type: "text",
        placeholder: "CLIENT WISE",
        name: "clientName",
        required: false,
      },
      {
        type: "text",
        placeholder: "PROJECT NAME",
        name: "ProjectTitle",
        required: false,
      },
      {
        type: "text",
        placeholder: "EMPLOYEE NAME",
        name: "Name",
        required: false,
      },
    ];

  

const onSubmit = async(formData)=>{
 
  //:Date?/:Type?/:clientName?/:ProjectTitle?/:Name?
  if (!formData.Date &&  !formData.clientName && !formData.ProjectTitle && !formData.Name) {
    setError("At least one parameter is required for search");
    return;
  }
 
          setFormData('')
 
          searchGet(formData)
          

      
      const queryParams = new URLSearchParams(formData).toString();
     
     let newUrl = ``;
     if(comesFrom){
      newUrl = `/v2/das/sales-your-search-route?${queryParams}`;
    }else{
       newUrl = `/v2/sales/your-search-route?${queryParams}`;

     }
      window.history.pushState({ path: newUrl }, '', newUrl);
    
  
}

return (
    <div>
      { error && <p  className="error">{error}</p>}
      <FilterForm inputs={inputs} onSubmit={onSubmit} formData={formData} setFormData={setFormData} />
    
     
    </div>
  );
}

import { useState } from "react";
import FilterForm from "./FilterForm";

export default function SeoFilter({searchGet,comesFrom}) {
 
  // const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    Date: "",
    Type: "",
    Status:"",
    clientName: "",
    ProjectTitle: "",
    Name: ""
  });

  const inputs = [
      {
        type: "date",
        placeholder: "DATE",
        name: "Date",
        required: false,
      },
      {
        type: "select",
  
        name: "Type",
        required: false,
        options: [
            { value: "ARTICLE SUBMISSION", name: "Type" },
            { value: "BLOG SUBMISSION", name: "Type" },
            { value: "IMAGE SUBMISSION", name: "Type" },
            { value: "PDF SUBMISSION", name: "Type" },
            { value: "PPT SUBMISSION", name: "Type" },
            { value: "INFOGRAPHIC SUBMISSION", name: "Type" },
            { value: "QUESTIONS & ANSWER SUBMISSION", name: "Type" },
            { value: "QUORA SUBMISSION", name: "Type" },
            { value: "PODCAST SUBMISSION", name: "Type" },
            { value: "VIDEO SUBMISSION", name: "Type" },
            { value: "CLASSIFIED ADS", name: "Type" },
            { value: "SOCIAL BOOKMARKEING", name: "Type" },
            { value: "GMB POSTING", name: "Type" },
            { value: "GUEST POSTING", name: "Type" },
            { value: "PROFILE CREATION", name: "Type" },
            { value: "BLOG COMMENTING", name: "Type" },
            { value: "PRESS RELEASE", name: "Type" },
            { value: "BUSINESS LISTING", name: "Type" },
        ],
      },
      {
        type: "select",
  
        name: "Status",
        required: false,
        options: [
            { value: "ACTIVE", name: "Status" },
            { value: "PENDING", name: "Status" },
            { value: "LOST", name: "Status" },
          ],
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
  if (!formData.Date && !formData.Type && !formData.clientName && !formData.ProjectTitle && !formData.Name&&!formData.Status) {
    setError("At least one parameter is required for search");
    return;
  }
  
 
          setFormData('')
   
          searchGet(formData)
          
       
      
      const queryParams = new URLSearchParams(formData).toString();
     
      let newUrl=``;
      if(comesFrom){
        newUrl = `/v2/das/seo-your-search-route?${queryParams}`;

      }
      else{
        newUrl = `/v2/em/your-search-route?${queryParams}`;
      }
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
 

return (
    <div>
      {error && <p className="error">{error}</p>}
      <FilterForm inputs={inputs} onSubmit={onSubmit} formData={formData} setFormData={setFormData} />
    
     
    </div>
  );
}

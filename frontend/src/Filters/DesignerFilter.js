import { useState } from "react";
import FilterForm from "./FilterForm";

export default function DesignerFilter({ searchGet, comesFrom }) {
  // const history = useHistory();
  // const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    Date: "",
    Type: "",
    clientName: "",
    ProjectTitle: "",
    Name: "",
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
      type: "select",

      name: "Type",
      required: false,
      options: [
        { value: "BROCHURE DESIGN", name: "Type" },
        { value: "LOGO DESIGN", name: "Type" },
        { value: "POSTER DESIGN", name: "Type" },
        { value: "BUSINESS CARD DESIGN", name: "Type" },
        { value: "SOCIAL MEDIA POST", name: "Type" },
        { value: "INFOGRAPHIC", name: "Type" },
        { value: "LABEL DESIGN", name: "Type" },
        { value: "PACKAGING DESIGN", name: "Type" },
        { value: "MOTION POSTER", name: "Type" },
        { value: "T SHIRT DESIGN", name: "Type" },
        { value: "POST CARD DESIGN", name: "Type" },
        { value: "CAR WRAP DESIGN", name: "Type" },
        { value: "VIDEO EDITING", name: "Type" },
        { value: "REELS", name: "Type" },
        { value: "ALBUM DESIGN", name: "Type" },
        { value: "UI/UX DESIGN", name: "Type" },
        { value: "BANNER DESIGN", name: "Type" },
        { value: "FLYER DESIGN", name: "Type" },
        { value: "DANGLER DESIGN", name: "Type" },
        { value: "BOOK COVER DESIGN", name: "Type" },
        { value: "VECTOR ART", name: "Type" },
        { value: "GREETING CARD", name: "Type" },
        { value: "ILLUSTRATIONS", name: "Type" },
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

  const onSubmit = async (formData) => {
   
    //:Date?/:Type?/:clientName?/:ProjectTitle?/:Name?
    if (
      !formData.Date &&
      !formData.Type &&
      !formData.clientName &&
      !formData.ProjectTitle &&
      !formData.Name &&
      !formData.Status
    ) {
      setError("At least one parameter is required for search");
    }

    setFormData("");

    searchGet(formData);

    const queryParams = new URLSearchParams(formData).toString();
    let newUrl = ``;
    if (comesFrom) {
      newUrl = `/v2/das/designer-your-search-route?${queryParams}`;
    } else {
      newUrl = `/v2/design/your-search-route?${queryParams}`;
    }
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <FilterForm
        inputs={inputs}
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

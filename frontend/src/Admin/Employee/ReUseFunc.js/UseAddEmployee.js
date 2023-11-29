import { useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailsContext from "../../../Context/CreateContext";
import ReUseForm from "../../../Forms/ReUseForm";

import "./addEmpy.css";

export default function UseAddEmployee({ url }) {
  const { err, setError } = useContext(DetailsContext);
  const inputs = [
    {
      type: "text",
      placeholder: "EMPLOYEE NAME",
      name: "Name",
      required: true,
    },
    {
      type: "date",
      placeholder: "START DATE",
      name: "StartDate",
      required: true,
    },
    {
      type: "number",
      placeholder: "PHONE NUMBER ",
      name: "phoneNumber",
      required: true,
    },
    {
      type: "email",
      placeholder: "EMAIL ADDRESS",
      name: "email",
      required: true,
    },
    {
      type: "password",
      placeholder: "PASSWORD",
      name: "password",
      required: true,
    },
    {
      type: "text",
      placeholder: "AADHAAR",
      name: "aadhaar",
      required: true,
    },
  ];
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const onSubmit = async ({ ...formData }) => {
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key,
    };
    // console.log({...formData},{headers},url.Url);
    try {
      await axios.post(url.Url, { ...formData }, { headers }).then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          return navigate(url.Navlink);
        }
        
      });
    } catch (error) {
      // console.log(error,'error');
    }
  };

  return (
    <>
      <div className="form-addpro">
        <div className="form-addpro-box">
          <div>{err && <h6 className="error">{err}</h6>}</div>
          <ReUseForm
            Method="POST"
            inputs={inputs}
            onSubmit={onSubmit}
            btnText="Submit"
          />
        </div>
      </div>
    </>
  );
}

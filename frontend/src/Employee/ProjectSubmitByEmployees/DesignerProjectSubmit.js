import React, { useState } from "react";
import axios from "axios";

export default function DesignerProjectSubmit() {
  const [sucess, setSucess] = useState("");
  const [err, setErr] = useState("");
  // setSucess("")
  // setErr('')
  const [formData, setFormData] = useState({
    ImgTitle: "",
    PostImage: null,
    Type: "",
    description: "",
  });

  const { ImgTitle, PostImage, Type, description } = formData;
  const handle = (e) => {
    const { name, value, files } = e.target;
    if (name === "PostImage") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const options = [
    "BROCHURE DESIGN",
    "LOGO DESIGN",
    "POSTER DESIGN",
    "BUSINESS CARD DESIGN",
    "SOCIAL MEDIA POST",
    "INFOGRAPHIC",
    "LABEL DESIGN",
    "PACKAGING DESIGN",
    "MOTION POSTER",
    "T SHIRT DESIGN",
    "POST CARD DESIGN",
    "CAR WRAP DESIGN",
    "VIDEO EDITING",
    "REELS",
    "ALBUM DESIGN",
    "UI/UX DESIGN",
    "BANNER DESIGN",
    "FLYER DESIGN",
    "DANGLER DESIGN",
    "BOOK COVER DESIGN",
    "VECTOR ART",
    "GREETING CARD",
    "ILLUSTRATIONS",
  ];

  // const navigate = useNavigate();
  const date = localStorage.getItem("date");
  async function submit(e) {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("ImgTitle", ImgTitle);
      formDataToSend.append("PostImage", PostImage);
      formDataToSend.append("Type", Type);
      formDataToSend.append("description", description);
      formDataToSend.append("Date", date);
      
      const EmplyId = localStorage.getItem("unique_id");
      const projectName = localStorage.getItem("ProjectName");
      const Name = localStorage.getItem("userName");
      const client = localStorage.getItem("Client");
      const res = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/designer/proj/submit/${EmplyId}/${projectName}/${Name}/${client}`,
        formDataToSend
      );

      if (res.status === 201) {
        setErr("");
        setSucess("Posted Sucessfully");

        // navigate("/post/view");
      }
    } catch (err) {
      setSucess("");
      setErr("Upload fail");
    }
  }
  return (
    <>
      <div className="form-addpro">
        <div className="form-addpro-box">
        {sucess && <div className="sucess-admin slide-in sucess-admin">{sucess}</div>}

          {err ? <div className="err">{err}</div> : ""}

          <div className="form-container">
            {/*  encType="multipart/form-data" */}
            <form
              method="POST"
              action="/uploads"
              encType="multipart/form-data"
              onSubmit={submit}
              className="designer-input"
            >
              <span className="file">
                <input
                  type="file"
                  placeholder="No file has been chosen"
                  name="PostImage"
                  onChange={handle}
                  required
                />
              </span>

              <input
                type="text"
                placeholder="IMAGE TITLE"
                name="ImgTitle"
                value={ImgTitle}
                onChange={handle}
                required
              />

              <select
                 className="select-box"
                name="Type"
                value={Type}
                onChange={handle}
              >
                <option value="">Type</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <input
                className="pd-x"
                type="text"
                placeholder="DESCRIPTION"
                name="description"
                value={description}
                onChange={handle}
                required
              />

              <button type="submit" className="submit-btn">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

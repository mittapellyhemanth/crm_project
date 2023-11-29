import GetEmply from "../ReUseFunc.js/GetEmp";

export default function GetWriter() {
  const AdminId = localStorage.getItem("unique_id");
  let URL = `${process.env.REACT_APP_PROXY_URL}/admin/getWriter/${AdminId}`;

  // let getOneUrl = "http://localhost:8080/admin/getOneWriter"
  let Navlink = "/v2/writer/project/status";
  return (
    <>
      <GetEmply url={URL} NavigateUrl={Navlink} type="WRITER" />
    </>
  );
}

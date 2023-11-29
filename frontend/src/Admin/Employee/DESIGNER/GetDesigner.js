import GetEmply from "../ReUseFunc.js/GetEmp";

export default function GetDesigner() {
  const AdminId = localStorage.getItem("unique_id");
  let URL = `${process.env.REACT_APP_PROXY_URL}/admin/getDesigner/${AdminId}`;
  const navUrl = "/v2/design/project/status";
  return (
    <>
      <GetEmply url={URL} NavigateUrl={navUrl} type="DESIGNER" />
    </>
  );
}

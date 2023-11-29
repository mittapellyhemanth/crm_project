import GetEmply from "../ReUseFunc.js/GetEmp";

export default function AttendanceDesigner() {
  const emplyId = localStorage.getItem("unique_id");

  let URL = `${process.env.REACT_APP_PROXY_URL}/admin/getDesigner/${emplyId}`;
  const NavUrl = "/v2/design/attendance/designer/status";

  return (
    <>
      <GetEmply url={URL} NavigateUrl={NavUrl} />
    </>
  );
}

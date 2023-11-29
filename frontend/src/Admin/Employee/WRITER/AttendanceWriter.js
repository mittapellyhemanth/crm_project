import GetEmply from "../ReUseFunc.js/GetEmp";

export default function AttendanceWriter() {
  const emplyId = localStorage.getItem("unique_id");

  let URL = `${process.env.REACT_APP_PROXY_URL}/admin/getWriter/${emplyId}`;
  const NavUrl = "/v2/writer/attend/status";

  return (
    <>
      <GetEmply url={URL} NavigateUrl={NavUrl} />
    </>
  );
}

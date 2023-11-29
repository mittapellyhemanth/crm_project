import GetEmply from "../ReUseFunc.js/GetEmp";

export default function SalesAttendance() {
  const emplyId = localStorage.getItem("unique_id");

  let URL = `${process.env.REACT_APP_PROXY_URL}/admin/getSales/${emplyId}`;
  const NavUrl = "/v2/sales/attendance/sales/status";

  return (
    <>
      <GetEmply url={URL} NavigateUrl={NavUrl} />
    </>
  );
}

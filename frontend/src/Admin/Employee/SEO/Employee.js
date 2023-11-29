import GetEmply from "../ReUseFunc.js/GetEmp";

export default function Employee() {
  const AdminId = localStorage.getItem("unique_id");

  const URL = `${process.env.REACT_APP_PROXY_URL}/admin/getSeo/${AdminId}`;
  const navigateUrl = "/v2/em/project/status";

  return (
    <>
      <GetEmply url={URL} NavigateUrl={navigateUrl} type="SEO" />
    </>
  );
}

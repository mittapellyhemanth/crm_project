import UseAddEmployee from "../ReUseFunc.js/UseAddEmployee";

export default function AddSEO() {
  //send url,naviga,seo
  const AdminId = localStorage.getItem("unique_id");
  const data = {
    Url: `${process.env.REACT_APP_PROXY_URL}/admin/addSeo/${AdminId}`,
    Navlink: "/v2/em/empy",
  };

  return (
    <>
      <UseAddEmployee url={data} />
    </>
  );
}

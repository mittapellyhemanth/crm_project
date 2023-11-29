import UseAddEmployee from "../ReUseFunc.js/UseAddEmployee";

export default function AddDesigner() {
  //send url,naviga,seo
  const AdminId = localStorage.getItem("unique_id");
  const data = {
    Url: `${process.env.REACT_APP_PROXY_URL}/admin/addDesigner/${AdminId}`,
    Navlink: "/v2/design/de/empy",
  };

  return (
    <>
      <UseAddEmployee url={data} />
    </>
  );
}

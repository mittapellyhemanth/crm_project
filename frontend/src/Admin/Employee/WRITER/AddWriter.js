import UseAddEmployee from "../ReUseFunc.js/UseAddEmployee";

export default function AddWriter() {
  //send url,naviga,seo
  const AdminId = localStorage.getItem("unique_id");
  const data = {
    Url: `${process.env.REACT_APP_PROXY_URL}/admin/addWriter/${AdminId}`,
    Navlink: "/v2/writer/wr/empy",
  };

  return (
    <>
      <UseAddEmployee url={data} />
    </>
  );
}

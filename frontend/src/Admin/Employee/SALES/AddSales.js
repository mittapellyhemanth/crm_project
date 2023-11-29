import UseAddEmployee from "../ReUseFunc.js/UseAddEmployee";

export default function AddSales() {
  //send url,naviga,seo
  const AdminId = localStorage.getItem("unique_id");
  const data = {
    Url: `${process.env.REACT_APP_PROXY_URL}/admin/addSales/${AdminId}`,
    Navlink: "/v2/sales/sa/addempy",
  };

  return (
    <>
      <UseAddEmployee url={data} />
    </>
  );
}

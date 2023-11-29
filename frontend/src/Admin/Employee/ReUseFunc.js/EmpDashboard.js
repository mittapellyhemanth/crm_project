import { useContext } from "react";
import UserName from "../../../Functions/UserName";
import NavbarScroll from "../../../components/Navbar/NavbarScroll";
import Sidebar from "../../../components/Sidebar/Sidebar";

import DetailsContext from "../../../Context/CreateContext";

export default function EmpDashboard() {
  UserName();

  const { designationType } = useContext(DetailsContext);
  let sidebarData = [];
  if (designationType === "seo") {
    sidebarData = [
      { label: "EMPLOYEE", to: "/v2/em/empy" },
      { label: "ADD EMPLOYEE", to: "/v2/em/addempy" },
      { label: "ATTENDANCE", to: "/v2/em/attendance/status" },
      { label: "LEAVE TRACKER", to: "/v2/em/leave/track" },
    ];
  }
  if (designationType === "designer") {
    sidebarData = [
      { label: "EMPLOYEE", to: "/v2/design/de/empy" },
      { label: "ADD EMPLOYEE", to: "/v2/design/de/addempy" },
      { label: "ATTENDANCE", to: "/v2/design/de/attend" },
      { label: "LEAVE TRACKER", to: "/v2/design/leave/track" },
    ];
  }
  if (designationType === "writer") {
    sidebarData = [
      { label: "EMPLOYEE", to: "/v2/writer/wr/empy" },
      { label: "ADD EMPLOYEE", to: "/v2/writer/wr/addempy" },
      { label: "ATTENDANCE", to: "/v2/writer/wr/attend" },
      { label: "LEAVE TRACKER", to: "/v2/writer/leave/track" },
    ];
  }
  if (designationType === "sales") {
    sidebarData = [
      { label: "EMPLOYEE", to: "/v2/sales/sa/empy" },
      { label: "ADD EMPLOYEE", to: "/v2/sales/sa/addempy" },
      { label: "ATTENDANCE", to: "/v2/sales/sa/attend" },
      { label: "LEAVE TRACKER", to: "/v2/sales/leave/track" },
    ];
  }

  return (
    <>
      <div className="grid-container">
        <div className="grid-child-container">
          <div className="Nav">
            <NavbarScroll />
          </div>
          <div className="sidebar">
            <Sidebar children={sidebarData} />
          </div>
        </div>
      </div>
    </>
  );
}

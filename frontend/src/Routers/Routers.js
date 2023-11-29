import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLogin from "../Admin/AdminLogin";
import EmployeeLogin from "../Employee/EmployeeLogin";
import SuperAdminHome from "../SuperAdmin/SuperHome";
import Admins from "../SuperAdmin/Admins";
import AddAdmin from "../SuperAdmin/AddAdmin";
import SuperLogin from "../SuperAdmin/SuperLogin";
import AddProjects from "../Admin/Projects/AddProjects";
import Projects from "../Admin/Projects/Projects";

import ProjectsDashboard from "../Admin/Projects/ProjectsDashboard";
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import EmployeeDashboard from "../Admin/Employee/Dashboard/EmployeeDashboard";
import SEO from "../Admin/Employee/SEO/SEO";
import Employee from "../Admin/Employee/SEO/Employee";

import Sales from "../Admin/Employee/SALES/Sales";

import Logout from "../components/Login_SignUp/Logout";
import EMProjects from "../Employee/EMProjects";
import Application from "../Employee/ApplicationForLeave";
import BreakTime from "../Employee/BreakTime";
import Details from "../Employee/YourDetails";
import AddSEO from "../Admin/Employee/SEO/AddSEO";
import DesignerDash from "../Admin/Employee/DESIGNER/DesignerDash";

import AttendanceDesigner from "../Admin/Employee/DESIGNER/AttendanceDesigner";
import SeoAttendance from "../Admin/Employee/SEO/Attendance";
import GetDesigner from "../Admin/Employee/DESIGNER/GetDesigner";
import AddDesigner from "../Admin/Employee/DESIGNER/AddDesigner";
import WriterDashboard from "../Admin/Employee/WRITER/WriterDashboard";
import AddWriter from "../Admin/Employee/WRITER/AddWriter";
import GetWriter from "../Admin/Employee/WRITER/GetWriter";
import AttendanceWriter from "../Admin/Employee/WRITER/AttendanceWriter";
import EmpysDashboard from "../Employee/Dashboard/EmpysDashboard";
import AdminView from "../SuperAdmin/AdminView";
import EditAdmin from "../SuperAdmin/EditAdmin";

import SeoEmployeeProject from "../Admin/Employee/SEO/SeoEmployeeProjects";
import SeoProjectSubmit from "../Employee/ProjectSubmitByEmployees/SeoProjectSubmit";
import WriterProjectSubmit from "../Employee/ProjectSubmitByEmployees/WriterProjectSubmit";

import DesignerProjectSubmit from "../Employee/ProjectSubmitByEmployees/DesignerProjectSubmit";
import AttendanceStatus from "../Admin/Employee/SEO/AttendanceStatus";
import DesignerAttendanceStatus from "../Admin/Employee/DESIGNER/DesignerAttendanceStatus";
import WriterAttendStatus from "../Admin/Employee/WRITER/WriterAttendStatus";

import AddSales from "../Admin/Employee/SALES/AddSales";
import GetSales from "../Admin/Employee/SALES/GetSales";
import SalesAttendance from "../Admin/Employee/SALES/Attendance";
import SalesProjectSubmit from "../Employee/ProjectSubmitByEmployees/SalesProjectSubmit";

// import ViewFullProjStatus from "../Admin/Employee/SEO/ViewFullProjStatus";

import SalesAttendanceStatus from "../Admin/Employee/SALES/AttendanceStatus";
// import ViewSalesProjStatus from "../Admin/Employee/SALES/ViewFullProjStatus";
import ProjectSeoStatus from "../Admin/Projects/ProjectViewEmpy/ProjectSeoStatus";
import ProjectSalesStatus from "../Admin/Projects/ProjectViewEmpy/ProjectSalesStatus";
import ProjectWriterStatus from "../Admin/Projects/ProjectViewEmpy/ProjectWriterStatus";
import ProjectDesignerStatus from "../Admin/Projects/ProjectViewEmpy/ProjectDesignerStatus";
import WriterProjectStatus from "../Admin/Employee/WRITER/WriterProjectStatus";
import DesignerProjectStatus from "../Admin/Employee/DESIGNER/DesignerProjectStatus";
import SalesProjectStatus from "../Admin/Employee/SALES/SalesProjectStatus";
import WriterProjectStatusView from "../Admin/FullProjectStatusView/WriterProjectStatusView";
import SeoProjectStatusView from "../Admin/FullProjectStatusView/SeoProjectStatusView";
import SalesProjectStatusView from "../Admin/FullProjectStatusView/SalesProjectStatusView";

import WriterSearchView from "../Admin/Employee/WRITER/WriterSearchView";
import SeoSearchView from "../Admin/Employee/SEO/SeoSearchView";
import DesignerSearchView from "../Admin/Employee/DESIGNER/DesignerSearchView";
import SalesSearchView from "../Admin/Employee/SALES/SalesSearchView";
import DesignerProjectStatusView from "../Admin/FullProjectStatusView/DesignerProjectStatusView";
import ProSEOSearchView from "../Admin/Projects/ProjectEmpySerachView.js/ProjSEOSearchView";
import ProjWriterSearchView from "../Admin/Projects/ProjectEmpySerachView.js/ProjWriterSearchView";
import ProjSalesSearchView from "../Admin/Projects/ProjectEmpySerachView.js/ProjSalesSearchView";
import ProjDesignerSearchView from "../Admin/Projects/ProjectEmpySerachView.js/ProjDesignerSearchView";
import ClientDetails from "../Admin/Projects/ClientDetails/ClientDetails";
import ClientOneView from "../Admin/Projects/ClientDetails/ClientOneView";
import SeoLeaveTracker from "../Admin/Employee/SEO/SeoLeaveTracker";
import SeoViewLeave from "../Admin/Employee/SEO/SeoViewLeave";
import SalesLeaveTracker from "../Admin/Employee/SALES/SalesLeaveTracker";
import SalesViewLeave from "../Admin/Employee/SALES/SalesViewLeave";
import DesignerLeaveTracker from "../Admin/Employee/DESIGNER/DesignerLeaveTracker";
import DesignerViewLeave from "../Admin/Employee/DESIGNER/DesignerViewLeave";
import WriterLeaveTracker from "../Admin/Employee/WRITER/WriterLeaveTracker";
import WriterViewLeave from "../Admin/Employee/WRITER/WriterViewLeave";



export default function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Deatils />} /> */}
      <Route path="/" element={<SuperLogin />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/Admin" element={<AdminLogin />} />
      <Route path="/Employee" element={<EmployeeLogin />} />
        
        
      {/* ...............................Super Admin Routers ......................*/}
      <Route path="/v1/" element={<SuperAdminHome />}>
        <Route index element={<Admins />} /> {/* by default we get this route*/}
        <Route path="admins" element={<Admins />} />
        <Route path="addAdmin" element={<AddAdmin />} />
        <Route path="admin/view" element={<AdminView />} />
        <Route path="admin/Edit" element={<EditAdmin />} />
      </Route>
      {/*........................ Admin Routers............................. */}
      <Route path="ad/dashboard" element={<AdminDashboard />} />
      {/*........................ Admin employee Routers............................. */}
      <Route path="em/dashboard" element={<EmployeeDashboard />} />

      {/*........................ Admin PROJECT Routers............................. */}
      <Route path="/v2/das/" element={<ProjectsDashboard />}>
        <Route index element={<Projects />} />
        <Route path="proj" element={<Projects />} />

        <Route path="seo/pro/view" element={<ProjectSeoStatus />} />
        <Route path="seo/one/view" element={<SeoProjectStatusView />} />
        <Route path="seo/search/results" element={  <ProSEOSearchView />}/>
        <Route path="seo-your-search-route" element={  <ProSEOSearchView />}/>

        <Route path="sales/pro/view" element={<ProjectSalesStatus />} />
        <Route path="Sales/one/view" element={<SalesProjectStatusView />} />
        <Route path="Sales/search/results" element={  <ProjSalesSearchView />}/>
        <Route path="Sales-your-search-route" element={  <ProjSalesSearchView />}/>



        <Route path="writer/pro/view" element={<ProjectWriterStatus />} />
        <Route path="writer/one/view" element={<WriterProjectStatusView />} />
        <Route path="writer/search/results" element={  <ProjWriterSearchView />}/>
        <Route path="writer-your-search-route" element={  <ProjWriterSearchView />}/>


        
        <Route path="designer/pro/view" element={<ProjectDesignerStatus />} />
        <Route path="designer/one/view" element={<DesignerProjectStatusView />} />
        <Route path="designer/search/results" element={  <ProjDesignerSearchView />}/>
        <Route path="designer-your-search-route" element={  <ProjDesignerSearchView />}/>


        <Route path="addProj" element={<AddProjects />} />

        <Route path="client/details" element={<ClientDetails />} />
        <Route path="client/one/view" element={<ClientOneView />} />
       
      </Route>
      {/*........................  SEO Routers............................. */}
      <Route path="/v2/em/" element={<SEO />}>
        <Route index element={<Employee />} />{" "}
        <Route index path="empy" element={<Employee />} />
        <Route path="project/status" element={<SeoEmployeeProject/>} />
        <Route path="addempy" element={<AddSEO />} />
        <Route path="attendance/status" element={<SeoAttendance />} /> 
        <Route path="leave/track" element={<SeoLeaveTracker />} /> 
        <Route path="view/leave" element={<SeoViewLeave />} /> 

        <Route path="attendance/seo/status" element={<AttendanceStatus />} />
        <Route path="view/project/status" element={<SeoProjectStatusView />} />
        <Route path="your-search-route" element={  <SeoSearchView />}/>
      <Route path="search/results" element={  <SeoSearchView />}/>
      </Route>
      {/*........................  WRITER Routers............................. */}
      <Route path="/v2/writer" element={<WriterDashboard />} />
      <Route path="/v2/writer/" element={<WriterDashboard />}>
        <Route index element={<GetWriter />} />{" "}
        <Route path="wr/empy" element={<GetWriter />} />
        <Route path="wr/attend" element={<AttendanceWriter />} />
        <Route path="attend/status" element={<WriterAttendStatus />} />
        <Route path="project/status" element={<WriterProjectStatus/>} />
        <Route path="view/project/status" element={<WriterProjectStatusView />} />
        <Route path="leave/track" element={<WriterLeaveTracker />} /> 
        <Route path="view/leave" element={<WriterViewLeave />} /> 


        <Route path="wr/addempy" element={<AddWriter />} />
      <Route path="your-search-route" element={  <WriterSearchView />}/>
      <Route path="search/results" element={  <WriterSearchView />}/>
      </Route>

      {/*........................  DESIGNER Routers............................. */}
      <Route path="/v2/design/" element={<DesignerDash />}>
        <Route index element={<GetDesigner />} />{" "}
        <Route index path="de/empy" element={<GetDesigner />} />
        <Route path="project/status" element={<DesignerProjectStatus/>} />
        <Route path="view/project/status" element={<DesignerProjectStatusView/>} />
        <Route path="de/addempy" element={<AddDesigner />} />
        <Route path="de/attend" element={<AttendanceDesigner />} />
 <Route path="attendance/designer/status" element={<DesignerAttendanceStatus />} />

 <Route path="leave/track" element={<DesignerLeaveTracker />} /> 
        <Route path="view/leave" element={<DesignerViewLeave />} /> 

        <Route path="your-search-route" element={  <DesignerSearchView />}/>
      <Route path="search/results" element={  <DesignerSearchView />}/>
      </Route>

      {/*........................  SALES Routers............................. */}
      <Route path="/v2/sales/" element={<Sales />} >
      <Route index element={<GetSales />} />{" "}
        <Route index path="sa/empy" element={<GetSales />} />
        <Route path="sa/addempy" element={<AddSales />} />
         <Route path="sa/attend" element={<SalesAttendance />} />
        <Route path="project/status" element={<SalesProjectStatus/>} />
        <Route path="attendance/sales/status" element={<SalesAttendanceStatus />} />
        <Route path="leave/track" element={<SalesLeaveTracker />} /> 
        <Route path="view/leave" element={<SalesViewLeave />} /> 


        <Route path="view/project/status" element={<SalesProjectStatusView />} />  
        <Route path="your-search-route" element={<SalesSearchView />}/>
      <Route path="search/results" element={<SalesSearchView />}/>
      </Route>
      

      {/*........................ EMPLOYEE  Routers............................. */}
      <Route path="/v3/empy/" element={<EmpysDashboard />}>
        <Route index element={<EMProjects />} />
        <Route path="project" element={<EMProjects />} />
        <Route path="project/post" element={<SeoProjectSubmit/>} />
        <Route path="writer/project/post" element={<WriterProjectSubmit/>} />
        <Route  path="designer/project/post" element={<DesignerProjectSubmit />} />
        <Route  path="sales/project/post" element={<SalesProjectSubmit />} />
        <Route path="leave" element={<Application />} />
        <Route path="details" element={<Details />} />
        <Route path="break" element={<BreakTime />} />
      </Route>
    </Routes>
  );
}

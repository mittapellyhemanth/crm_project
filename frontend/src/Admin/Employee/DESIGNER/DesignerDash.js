import { useContext, useEffect } from "react";

import DetailsContext from "../../../Context/CreateContext";
import EmpDashboard from "../ReUseFunc.js/EmpDashboard";

export default function DesignerDash() {
  const { setDesignationType } = useContext(DetailsContext);

  useEffect(() => {
    setDesignationType("designer");
  }, [setDesignationType]);

  return (
    <>
      <EmpDashboard />
    </>
  );
}

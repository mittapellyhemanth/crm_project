import { useContext, useEffect } from "react";

import EmpDashboard from "../ReUseFunc.js/EmpDashboard";
import DetailsContext from "../../../Context/CreateContext";


export default function Sales() {
  const { setDesignationType } = useContext(DetailsContext);

  useEffect(() => {
    setDesignationType("sales");
  }, [setDesignationType]);

  return (
    <>
      <EmpDashboard />
    </>
  );
}

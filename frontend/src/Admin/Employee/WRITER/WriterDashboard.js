import { useContext, useEffect } from "react";
import EmpDashboard from "../ReUseFunc.js/EmpDashboard";

import DetailsContext from "../../../Context/CreateContext";

export default function WriterDashboard() {
  const { setDesignationType } = useContext(DetailsContext);

  useEffect(() => {
    setDesignationType("writer");
  }, [setDesignationType]);

  return (
    <>
      <EmpDashboard />
    </>
  );
}

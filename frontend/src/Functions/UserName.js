import { useContext, useEffect } from "react";
import DetailsContext from "../Context/CreateContext";


function UserName(){

    const { setFlag, setPersonName } = useContext(DetailsContext);
    const name = localStorage.getItem("userName");
    useEffect(() => {
      setFlag(true);
      setPersonName(name);
    }, [setFlag, setPersonName,name]);
}

export default UserName;
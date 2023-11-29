
import CryptoJS from "crypto-js";

import ViewLeaves from "../ReUseFunc.js/ViewLeaves";

export default function WriterViewLeave() {
  // const[status,setStatus] = useState('')
  const encryptedProjectData = localStorage.getItem("getLeave");
  const decryptedProjectDatay = CryptoJS.AES.decrypt(
    encryptedProjectData,
    "leaveKey"
  ).toString(CryptoJS.enc.Utf8);
  const LeavesData = JSON.parse(decryptedProjectDatay);

  return (
    <>
      <ViewLeaves data={LeavesData} />
    </>
  );
}

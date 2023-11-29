import axios from "axios";

const Logout = async () => {
  try {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const LogoutTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

    const breakTaken = localStorage.getItem("breakTaken");
    const employID = localStorage.getItem("unique_id");
    const login = localStorage.getItem("LogTime");
    const date = localStorage.getItem("date");

    function parseTimeToSeconds(timeString) {
      const [time, period] = timeString.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;

      if (period === "PM") {
        totalSeconds += 12 * 3600;
      }

      return totalSeconds;
    }

    function secondsToTimeFormat(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const loginSeconds = parseTimeToSeconds(login);
    const logoutSeconds = parseTimeToSeconds(LogoutTime);
    let breakTime;
    let totalWorkSeconds;
    let totalWork;
    if (breakTaken !== null) {
      breakTime = parseTimeToSeconds(breakTaken);
      totalWorkSeconds = logoutSeconds - loginSeconds - breakTime;
      totalWork = secondsToTimeFormat(totalWorkSeconds);
    } else {
      totalWorkSeconds = logoutSeconds - loginSeconds;
      totalWork = secondsToTimeFormat(totalWorkSeconds);
    }

    const data = {
      Date: date,
      LoginTime: login,
      LogoutTime: LogoutTime,
      TotalBreak: breakTaken,
      TotalWorkTime: totalWork,
    };

    const DeleteBreakTime = `${process.env.REACT_APP_PROXY_URL}/employee/previousbreakTime/taken/${employID}/${date}`;
    await axios.delete(DeleteBreakTime);
    await axios.post(`${process.env.REACT_APP_PROXY_URL}/admin/trackAttendance/${employID}`, data);

    localStorage.clear(); // Clear local storage

    return true; // Indicate successful logout
  } catch (error) {
    // console.error("Error during logout:", error);
    return false; // Indicate unsuccessful logout
  }
};

export default Logout;

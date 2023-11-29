import React, { useState, useEffect } from "react";
import "./Break.css";
import axios from "axios";

export default function BreakTime() {
  
  const [breakStart, setBreakStart] = useState(() => {
    // Retrieve break start time from localStorage, if available
    return parseInt(localStorage.getItem("breakStart")) || null;
  });
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    let timer;

    if (timerRunning) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - breakStart);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    // Save break start time to localStorage whenever it changes

    localStorage.setItem("breakEnd", breakStart);

    return () => clearInterval(timer);
  }, [timerRunning, breakStart]);

  const [prevBreak, setPrevBreak] = useState([]);

  const employID = localStorage.getItem("unique_id");
  const date = localStorage.getItem("date");
  //handleBreakStart
  const handleBreakStart = async () => {
    setBreakStart(Date.now() - elapsedTime);
    const URL = `${process.env.REACT_APP_PROXY_URL}/employee/previousbreakTime/${employID}/${date}`; //get
    await axios.get(URL).then((res) => {
      // console.log(res.data);
      setPrevBreak(res.data);
      // console.log(prevBreak.length);
    });

    setTimerRunning(true);
  };
  // formating time
  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  // Example usage

  // handleBreakEnd
  const handleBreakEnd = async () => {
    setTimerRunning(false);

    const URL = `${process.env.REACT_APP_PROXY_URL}/employee/breakTime/${employID}`; //post
   

    // convert second to time format

    function parseTimeToSeconds(timeString) {
      const [time, period] = timeString.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;

      if (period === "PM") {
        totalSeconds += 12 * 3600; // Add 12 hours in seconds for PM times
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
    if (prevBreak.length !== 0) {
      const previousBreak = prevBreak[0].BreakTaken;
      const newBreak = formatTime(elapsedTime);

      const loginSeconds = parseTimeToSeconds(previousBreak);
      const logoutSeconds = parseTimeToSeconds(newBreak);

      const totalWorkSeconds = (await logoutSeconds) + loginSeconds;
      const totalBreak = await secondsToTimeFormat(totalWorkSeconds);

     

      const prevDeleteURL = `${process.env.REACT_APP_PROXY_URL}/employee/previousbreakTime/taken/${employID}/${date}`; // delete
      await axios.delete(prevDeleteURL);
      const data = {
        Date: date,
        BreakTaken: totalBreak,
      };
     
      await axios.post(URL, data).then((res) => {
        // console.log(res.data);
        localStorage.setItem("breakTaken", res.data.BreakTaken);
      });
    } else {
      const newBreak = formatTime(elapsedTime);
      const data = {
        Date: date,
        BreakTaken: newBreak,
      };
      await axios.post(URL, data).then((res) => {
        // console.log(res,'post');
        localStorage.setItem("breakTaken", res.data.BreakTaken);
      });
    }
    setElapsedTime(0);
  };

  return (
    <>
    <div className="beak-container">

      <div className="timer">
        <p>Break Start: {formatTime(elapsedTime)}</p>

        <div className="break">
          <div className="break-container">
            <div className="break-start" onClick={handleBreakStart}>
              BREAK START
            </div>
            <div className="break-end" onClick={handleBreakEnd}>
              BREAK END
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

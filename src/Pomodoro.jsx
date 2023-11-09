import tomatoLogo from "/tomato.svg";
import React, { useState, useEffect } from "react";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [statusText, setStatusText] = useState("Let's work 💪");

  useEffect(() => {
    let interval;

    if (isActive && minutes === 0 && seconds === 0) {
      if (sessionCount === 6) {
        setMinutes(20);
        setSessionCount(0);
        setSessionCount(7);
        setStatusText("Long Break 😴");
        new Audio(
          "https://s3.amazonaws.com/appforest_uf/f1636662880924x185843565884855640/sound_notification.mp3"
        ).play();
      } else if (sessionCount % 2 === 0) {
        setMinutes(5);
        setSessionCount(sessionCount + 1);
        setStatusText("Short Break ☕️");
        new Audio(
          "https://s3.amazonaws.com/appforest_uf/f1636662880924x185843565884855640/sound_notification.mp3"
        ).play();
      } else {
        setMinutes(25);
        if (sessionCount === 7) {
          setSessionCount(0);
        } else {
          setSessionCount(sessionCount + 1);
        }

        setStatusText("Let's work 💪");
        new Audio(
          "https://s3.amazonaws.com/appforest_uf/f1636662880924x185843565884855640/sound_notification.mp3"
        ).play();
      }
    }

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds, sessionCount]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    new Audio(
      "https://s3.amazonaws.com/appforest_uf/f1636671930092x436418304812831400/start_stop_pomodoro.wav"
    ).play();
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setSessionCount(0);
    new Audio(
      "https://s3.amazonaws.com/appforest_uf/f1636671930092x436418304812831400/start_stop_pomodoro.wav"
    ).play();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-600">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 gap-6 text-center max-w-sm mx-4">
        <span className="inline-flex items-center justify-center">
          <img src={tomatoLogo} alt="Tomato" className="h-5 mr-2" />
          <h1 className="font-bold text-2xl text-red-600">Pomodoro</h1>
        </span>
        <p className="text-md">
          This free tool launches sequential timers for you to stay
          laser-focused on your tasks.
        </p>
        <div className="text-4xl font-bold">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="text-xl font-medium">
          {isActive ? statusText : "Ready? 🏁"}
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <button onClick={toggleTimer} className="btn-primary">
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={resetTimer} className="btn-secondary">
            Reset
          </button>
          <a
            rel="nofollow"
            href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
            target="_blank"
            className="text-red-600 text-sm font-medium hover:underline"
          >
            Learn more about the Pomodoro technique.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;

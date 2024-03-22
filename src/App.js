import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [timerWorking, setTimerWorking] = useState(false);
  const [error, setError] = useState('');
  const [timeOver, setTimeOver] = useState(false);
  const [timeExceedsLimit, setTimeExceedsLimit] = useState(false);
  const [timeOverMessageDisplayed, setTimeOverMessageDisplayed] = useState(false);

  const handleInputChange = (event) => {
    setTargetDate(event.target.value);
    setError('');
    setTimeOver(false);
    setTimeExceedsLimit(false);
    setTimeOverMessageDisplayed(false);
  };

  const calculateCountdown = () => {
    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
      setTimerWorking(true);
      setTimeOver(false);
      setTimeExceedsLimit(days > 99);
      setTimeOverMessageDisplayed(false);
    } else {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimerWorking(false);
      setTimeOver(true);
      setTimeExceedsLimit(false);
      if (!timeOverMessageDisplayed) {
        setTimeOverMessageDisplayed(true);
      }
    }
  };

  const handleTimerSubmit = () => {
    calculateCountdown();
  };

  const handleTimerCancel = () => {
    setTimerWorking(false);
    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setTimeOver(false);
    setTimeExceedsLimit(false);
    setTimeOverMessageDisplayed(false);
  };

  useEffect(() => {
    let intervalId;
    if (timerWorking) {
      intervalId = setInterval(() => {
        calculateCountdown();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [targetDate, timerWorking]);

  useEffect(() => {
    calculateCountdown();
  }, []);

  return (
    <div className='App'>
      <h1>Countdown <span>Timer</span></h1>
      <div>
        <input type="datetime-local" value={targetDate} onChange={handleInputChange} />
        {timerWorking ? (
          <button onClick={handleTimerCancel}>Cancel Timer</button>
        ) : (
          <button onClick={handleTimerSubmit}>Submit Timer</button>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      {timeExceedsLimit && !timeOver && (
        <div className="message">The selected time is more than 100 days in the future.</div>
      )}
      <div className='justgrid' style={{ display: timeExceedsLimit || timeOver ? 'none' : 'flex' }}>
        <div className='justgrid1'>{countdown.days} <span>Days</span></div>
        <div className='justgrid1'>{countdown.hours} <span>Hours</span></div>
        <div className='justgrid1'>{countdown.minutes} <span>Minutes</span></div>
        <div className='justgrid1'>{countdown.seconds}<span>Seconds</span></div>
      </div>
      {timeOver && !timeOverMessageDisplayed && (
        <div className="message">Time is over!</div>
      )}
    </div>
  );
};

export default App;


import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Coffee, BookOpen } from 'lucide-react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4
  });

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const modes = {
    work: { duration: settings.workTime * 60, label: 'Focus Time', icon: BookOpen, color: 'red' },
    shortBreak: { duration: settings.shortBreak * 60, label: 'Short Break', icon: Coffee, color: 'green' },
    longBreak: { duration: settings.longBreak * 60, label: 'Long Break', icon: Coffee, color: 'blue' }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(modes[mode].duration);
  }, [mode, settings]);

  const handleTimerComplete = () => {
    setIsActive(false);
    playNotificationSound();
    
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      if (newSessions % settings.sessionsUntilLongBreak === 0) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
    } else {
      setMode('work');
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].duration);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
    resetTimer();
  };

  const currentMode = modes[mode];
  const Icon = currentMode.icon;

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-header">
        <h1>Pomodoro Timer</h1>
        <p>Stay focused and productive with the Pomodoro Technique</p>
      </div>

      <div className={`pomodoro-timer ${currentMode.color}`}>
        <div className="timer-modes">
          {Object.entries(modes).map(([key, modeData]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`mode-btn ${mode === key ? 'active' : ''} ${modeData.color}`}
            >
              {modeData.label}
            </button>
          ))}
        </div>

        <div className="timer-circle">
          <svg className="progress-ring" width="300" height="300">
            <circle
              className="progress-ring-bg"
              cx="150"
              cy="150"
              r="140"
            />
            <circle
              className={`progress-ring-fill ${currentMode.color}`}
              cx="150"
              cy="150"
              r="140"
              style={{
                strokeDasharray: `${2 * Math.PI * 140}`,
                strokeDashoffset: `${2 * Math.PI * 140 * (1 - getProgress() / 100)}`
              }}
            />
          </svg>
          
          <div className="timer-content">
            <Icon className="timer-icon" size={48} />
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <div className="timer-label">{currentMode.label}</div>
          </div>
        </div>

        <div className="timer-controls">
          <button onClick={toggleTimer} className={`control-btn primary ${currentMode.color}`}>
            {isActive ? <Pause size={24} /> : <Play size={24} />}
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} className="control-btn secondary">
            <RotateCcw size={20} />
            Reset
          </button>
          <button onClick={() => setShowSettings(true)} className="control-btn secondary">
            <Settings size={20} />
            Settings
          </button>
        </div>

        <div className="session-counter">
          <div className="session-info">
            <span className="session-label">Sessions Completed</span>
            <span className="session-count">{sessions}</span>
          </div>
          <div className="session-progress">
            {Array.from({ length: settings.sessionsUntilLongBreak }, (_, i) => (
              <div
                key={i}
                className={`session-dot ${i < sessions % settings.sessionsUntilLongBreak ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <h3>Timer Settings</h3>
            <div className="settings-form">
              <div className="setting-group">
                <label>Work Time (minutes)</label>
                <input
                  type="number"
                  value={settings.workTime}
                  onChange={(e) => setSettings({...settings, workTime: parseInt(e.target.value)})}
                  min="1"
                  max="60"
                />
              </div>
              <div className="setting-group">
                <label>Short Break (minutes)</label>
                <input
                  type="number"
                  value={settings.shortBreak}
                  onChange={(e) => setSettings({...settings, shortBreak: parseInt(e.target.value)})}
                  min="1"
                  max="30"
                />
              </div>
              <div className="setting-group">
                <label>Long Break (minutes)</label>
                <input
                  type="number"
                  value={settings.longBreak}
                  onChange={(e) => setSettings({...settings, longBreak: parseInt(e.target.value)})}
                  min="1"
                  max="60"
                />
              </div>
              <div className="setting-group">
                <label>Sessions until Long Break</label>
                <input
                  type="number"
                  value={settings.sessionsUntilLongBreak}
                  onChange={(e) => setSettings({...settings, sessionsUntilLongBreak: parseInt(e.target.value)})}
                  min="2"
                  max="10"
                />
              </div>
            </div>
            <div className="settings-actions">
              <button onClick={() => updateSettings(settings)} className="btn-primary">
                Save Settings
              </button>
              <button onClick={() => setShowSettings(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
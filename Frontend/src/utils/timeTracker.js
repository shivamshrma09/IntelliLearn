class TimeTracker {
  constructor() {
    this.startTime = null;
    this.totalTime = 0;
    this.isTracking = false;
    this.sessionData = this.loadSessionData();
  }

  loadSessionData() {
    const saved = localStorage.getItem('studySession');
    if (saved) {
      const data = JSON.parse(saved);
      // Reset if it's a new day
      const today = new Date().toDateString();
      if (data.date !== today) {
        return {
          date: today,
          totalTime: 0,
          sessions: []
        };
      }
      return data;
    }
    return {
      date: new Date().toDateString(),
      totalTime: 0,
      sessions: []
    };
  }

  saveSessionData() {
    localStorage.setItem('studySession', JSON.stringify(this.sessionData));
  }

  startTracking() {
    if (!this.isTracking) {
      this.startTime = Date.now();
      this.isTracking = true;
    }
  }

  stopTracking() {
    if (this.isTracking && this.startTime) {
      const sessionTime = Date.now() - this.startTime;
      this.totalTime += sessionTime;
      this.sessionData.totalTime += sessionTime;
      this.sessionData.sessions.push({
        start: this.startTime,
        end: Date.now(),
        duration: sessionTime
      });
      this.saveSessionData();
      this.isTracking = false;
      this.startTime = null;
    }
  }

  getCurrentSessionTime() {
    if (this.isTracking && this.startTime) {
      return Date.now() - this.startTime;
    }
    return 0;
  }

  getTotalTimeToday() {
    return this.sessionData.totalTime + this.getCurrentSessionTime();
  }

  getFormattedTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  getWeeklyStats() {
    const weekData = localStorage.getItem('weeklyStudyData');
    if (weekData) {
      return JSON.parse(weekData);
    }
    return [];
  }

  updateWeeklyStats() {
    const today = new Date().toDateString();
    let weekData = this.getWeeklyStats();
    
    const todayIndex = weekData.findIndex(day => day.date === today);
    if (todayIndex >= 0) {
      weekData[todayIndex].time = this.sessionData.totalTime;
    } else {
      weekData.push({
        date: today,
        time: this.sessionData.totalTime
      });
    }
    
    // Keep only last 7 days
    weekData = weekData.slice(-7);
    localStorage.setItem('weeklyStudyData', JSON.stringify(weekData));
  }

  // Update streak based on daily activity
  updateStreak() {
    const streakData = localStorage.getItem('studyStreak');
    const today = new Date().toDateString();
    
    let streak = streakData ? JSON.parse(streakData) : { count: 0, lastDate: null };
    
    // If studied today and it's a new day
    if (this.sessionData.totalTime > 0 && streak.lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (streak.lastDate === yesterday.toDateString()) {
        streak.count += 1;
      } else if (streak.lastDate !== today) {
        streak.count = 1; // Reset streak if gap
      }
      
      streak.lastDate = today;
      localStorage.setItem('studyStreak', JSON.stringify(streak));
    }
    
    return streak.count;
  }
}

export default new TimeTracker();
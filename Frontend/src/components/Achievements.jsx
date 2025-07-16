import React from 'react';
import { Trophy, Star, Award, Target, Zap, BookOpen, Clock, Medal } from 'lucide-react';
import './Achievements.css';

export const Achievements = () => {
   const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first chapter',
      icon: BookOpen,
      progress: 100,
      unlocked: true,
      unlockedDate: '2024-01-10',
      points: 50,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Quiz Master',
      description: 'Score 90% or higher in 5 quizzes',
      icon: Trophy,
      progress: 100,
      unlocked: true,
      unlockedDate: '2024-01-12',
      points: 200,
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Streak Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: Zap,
      progress: 100,
      unlocked: true,
      unlockedDate: '2024-01-15',
      points: 150,
      rarity: 'uncommon'
    },
    {
      id: 4,
      title: 'Chapter Champion',
      description: 'Complete 10 chapters',
      icon: Star,
      progress: 80,
      unlocked: false,
      unlockedDate: null,
      points: 300,
      rarity: 'rare'
    },
    {
      id: 5,
      title: 'Speed Demon',
      description: 'Complete a quiz in under 5 minutes',
      icon: Clock,
      progress: 100,
      unlocked: true,
      unlockedDate: '2024-01-14',
      points: 100,
      rarity: 'uncommon'
    },
    {
      id: 6,
      title: 'Perfect Score',
      description: 'Score 100% in a test',
      icon: Target,
      progress: 60,
      unlocked: false,
      unlockedDate: null,
      points: 500,
      rarity: 'legendary'
    },
    {
      id: 7,
      title: 'Dedication',
      description: 'Study for 30 consecutive days',
      icon: Award,
      progress: 23,
      unlocked: false,
      unlockedDate: null,
      points: 750,
      rarity: 'legendary'
    },
    {
      id: 8,
      title: 'Subject Expert',
      description: 'Master all chapters in a subject',
      icon: Medal,
      progress: 45,
      unlocked: false,
      unlockedDate: null,
      points: 400,
      rarity: 'epic'
    }
  ];


  const streakData = {
    current: 7,
    longest: 12,
    total: 45
  };

  const pointsData = {
    total: 3250,
    thisWeek: 420,
    thisMonth: 1680
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'achieve-rarity-common';
      case 'uncommon': return 'achieve-rarity-uncommon';
      case 'rare': return 'achieve-rarity-rare';
      case 'epic': return 'achieve-rarity-epic';
      case 'legendary': return 'achieve-rarity-legendary';
      default: return 'achieve-rarity-common';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'achieve-border-common';
      case 'uncommon': return 'achieve-border-uncommon';
      case 'rare': return 'achieve-border-rare';
      case 'epic': return 'achieve-border-epic';
      case 'legendary': return 'achieve-border-legendary';
      default: return 'achieve-border-common';
    }
  };

  return (
    <div className="achieve-root">
      {/* Header */}
      <div className="achieve-header">
        <div>
          <h1 className="achieve-title">Achievements</h1>
          <p className="achieve-desc">Track your progress and unlock rewards</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="achieve-stats-grid">
        <div className="achieve-stat-card">
          <div className="achieve-stat-card-row">
            <div>
              <p className="achieve-stat-label">Total Points</p>
              <p className="achieve-stat-value">{pointsData.total.toLocaleString()}</p>
              <p className="achieve-stat-caption achieve-stat-caption-green">+{pointsData.thisWeek} this week</p>
            </div>
            <div className="achieve-stat-icon achieve-stat-icon-blue">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="achieve-stat-card">
          <div className="achieve-stat-card-row">
            <div>
              <p className="achieve-stat-label">Current Streak</p>
              <p className="achieve-stat-value">{streakData.current} days</p>
              <p className="achieve-stat-caption achieve-stat-caption-blue">Longest: {streakData.longest} days</p>
            </div>
            <div className="achieve-stat-icon achieve-stat-icon-orange">
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="achieve-stat-card">
          <div className="achieve-stat-card-row">
            <div>
              <p className="achieve-stat-label">Unlocked Achievements</p>
              <p className="achieve-stat-value">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
              <p className="achieve-stat-caption achieve-stat-caption-purple">
                {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}% completed
              </p>
            </div>
            <div className="achieve-stat-icon achieve-stat-icon-purple">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="achieve-grid">
        {achievements.map(achievement => {
          const Icon = achievement.icon;
          return (
            <div 
              key={achievement.id} 
              className={`achieve-card ${achievement.unlocked ? `${getRarityBorder(achievement.rarity)} achieve-card-unlocked` : 'achieve-border-common achieve-card-locked'}`}
            >
              <div className="achieve-card-inner">
                <div className="achieve-card-top">
                  <div className={`achieve-card-icon-bg ${achievement.unlocked ? 'achieve-card-icon-bg-unlocked' : 'achieve-card-icon-bg-locked'}`}>
                    <Icon className={`achieve-card-icon ${achievement.unlocked ? 'achieve-card-icon-unlocked' : 'achieve-card-icon-locked'}`} />
                  </div>
                  <div className="achieve-card-rarity-points">
                    <span className={`achieve-card-rarity ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                    <span className="achieve-card-points">
                      {achievement.points} pts
                    </span>
                  </div>
                </div>
                <h3 className="achieve-card-title">{achievement.title}</h3>
                <p className="achieve-card-desc">{achievement.description}</p>
                {achievement.unlocked ? (
                  <div className="achieve-card-unlocked-row">
                    <span className="achieve-card-unlocked-label">Unlocked!</span>
                    <span className="achieve-card-unlocked-date">{achievement.unlockedDate}</span>
                  </div>
                ) : (
                  <div>
                    <div className="achieve-card-progress-row">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="achieve-card-progress-bar-bg">
                      <div 
                        className="achieve-card-progress-bar-fill"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Achievements */}
      <div className="achieve-section-card">
        <div className="achieve-section-header">
          <h2>Recent Achievements</h2>
        </div>
        <div className="achieve-section-body">
          <div className="achieve-recent-list">
            {achievements
              .filter(a => a.unlocked)
              .sort((a, b) => new Date(b.unlockedDate).getTime() - new Date(a.unlockedDate).getTime())
              .slice(0, 5)
              .map(achievement => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className="achieve-recent-row">
                    <div className="achieve-recent-icon-bg">
                      <Icon className="achieve-recent-icon" />
                    </div>
                    <div className="achieve-recent-content">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                    <div className="achieve-recent-points">
                      <span>+{achievement.points} pts</span>
                      <p>{achievement.unlockedDate}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="achieve-section-card">
        <div className="achieve-section-header">
          <h2>Leaderboard</h2>
        </div>
        <div className="achieve-section-body">
          <div className="achieve-leaderboard-list">
            {[
              { rank: 1, name: 'Priya Sharma', points: 4250, avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=50' },
              { rank: 2, name: 'Rahul Patel', points: 3890, avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50' },
              { rank: 3, name: 'You', points: 3250, avatar: 'https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg?auto=compress&cs=tinysrgb&w=50' },
              { rank: 4, name: 'Sneha Gupta', points: 3120, avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=50' },
              { rank: 5, name: 'Amit Kumar', points: 2980, avatar: 'https://images.pexels.com/photos/2770600/pexels-photo-2770600.jpeg?auto=compress&cs=tinysrgb&w=50' }
            ].map(user => (
              <div key={user.rank} className={`achieve-leaderboard-row ${user.name === 'You' ? 'achieve-leaderboard-row-active' : ''}`}>
                <div className="achieve-leaderboard-rank-avatar">
                  <span className={`achieve-leaderboard-rank ${
                    user.rank === 1 ? 'achieve-leaderboard-rank-gold' :
                    user.rank === 2 ? 'achieve-leaderboard-rank-silver' :
                    user.rank === 3 ? 'achieve-leaderboard-rank-bronze' :
                    ''
                  }`}>{user.rank}</span>
                  <img src={user.avatar} alt={user.name} className="achieve-leaderboard-avatar" />
                </div>
                <div className="achieve-leaderboard-user">
                  <h3>{user.name}</h3>
                </div>
                <div className="achieve-leaderboard-points">
                  <span>{user.points.toLocaleString()} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
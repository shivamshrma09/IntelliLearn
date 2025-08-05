import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, Chip, CircularProgress } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  TrendingUp, Clock, Target, Award, Play, Trophy, Calendar, Users, ArrowRight, Zap, BookOpen,
  CheckSquare, Code, Star, Flame, Brain, Rocket, ChevronRight, Activity, BarChart3
} from 'lucide-react';
import timeTracker from '../utils/timeTracker';
import { cn } from "@/lib/utils";

const DashboardTailwind = ({ onNavigate }) => {
  const [user, setUser] = useState({
    name: "User",
    streak: 0,
    totalPoints: 0,
    numberOfBatchesCompleted: 0
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [realTimeStats, setRealTimeStats] = useState({
    studyTime: 0,
    streak: 0,
    todayPoints: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch('http://localhost:1000/students/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized or other error');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    }

    timeTracker.startTracking();

    const interval = setInterval(() => {
      const totalTime = timeTracker.getTotalTimeToday();
      const streak = timeTracker.updateStreak();
      setCurrentTime(totalTime);
      setRealTimeStats({
        studyTime: totalTime,
        streak: streak,
        todayPoints: Math.floor(totalTime / 60000) * 10
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      timeTracker.stopTracking();
      timeTracker.updateWeeklyStats();
    };
  }, []);

  const stats = [
    {
      label: 'Total Points',
      value: user.totalPoints + realTimeStats.todayPoints,
      icon: Star,
      color: 'warning',
      change: `+${realTimeStats.todayPoints} today`,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      label: 'Study Streak',
      value: `${Math.max(user.streak, realTimeStats.streak)}`,
      icon: Flame,
      color: 'danger',
      change: realTimeStats.streak > user.streak ? 'Updated!' : 'Keep going!',
      gradient: 'from-red-400 to-pink-500'
    },
    {
      label: 'Study Time',
      value: timeTracker.getFormattedTime(currentTime),
      icon: Clock,
      color: 'primary',
      change: 'Live tracking',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      label: 'Completed',
      value: user.numberOfBatchesCompleted,
      icon: Trophy,
      color: 'success',
      change: '+3 this week',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const quickActions = [
    {
      title: 'DSA Practice',
      description: 'Solve coding problems',
      icon: Code,
      color: 'bg-purple-500',
      action: () => onNavigate('striver-sheet')
    },
    {
      title: 'Study Timer',
      description: 'Focus with Pomodoro',
      icon: Clock,
      color: 'bg-blue-500',
      action: () => onNavigate('timer')
    },
    {
      title: 'My Library',
      description: 'Access resources',
      icon: BookOpen,
      color: 'bg-green-500',
      action: () => onNavigate('library')
    },
    {
      title: 'Take Test',
      description: 'Practice quizzes',
      icon: BarChart3,
      color: 'bg-orange-500',
      action: () => onNavigate('tests')
    }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first lesson', icon: '🎯', unlocked: true },
    { id: 2, title: 'Streak Master', description: '7-day study streak', icon: '🔥', unlocked: realTimeStats.streak >= 7 },
    { id: 3, title: 'Point Collector', description: 'Earned 1000 points', icon: '⭐', unlocked: (user.totalPoints + realTimeStats.todayPoints) >= 1000 },
    { id: 4, title: 'DSA Warrior', description: 'Solved 25 DSA problems', icon: '⚔️', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 🚀</h1>
                <p className="text-xl opacity-90 mb-4">
                  You're crushing it with a {Math.max(user.streak, realTimeStats.streak)}-day streak!
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4" />
                    {user.totalPoints + realTimeStats.todayPoints} Points
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <Flame className="w-4 h-4" />
                    {Math.max(user.streak, realTimeStats.streak)} Days
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-6xl animate-bounce">🎯</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-gradient-to-r text-white",
                      stat.gradient
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Jump into your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/20"
                        onClick={action.action}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg text-white", action.color)}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{action.title}</h3>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Continue Learning
                  </CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </div>
                <Button variant="ghost" onClick={() => onNavigate('my-batch')}>
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Data Structures & Algorithms</h3>
                        <p className="text-sm text-gray-600">Arrays & Strings</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">65%</div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                    </div>
                    <Progress value={65} className="mb-3" />
                    <Button size="sm" className="w-full" onClick={() => onNavigate('my-batch')}>
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Achievements & Activity */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all",
                      achievement.unlocked 
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" 
                        : "bg-gray-50 opacity-60"
                    )}
                  >
                    <div className="text-2xl">
                      {achievement.unlocked ? achievement.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="secondary">
                        <Award className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Studied for {timeTracker.getFormattedTime(currentTime)} today</p>
                    <p className="text-xs text-gray-600">Live</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Earned {realTimeStats.todayPoints} points today</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardTailwind;
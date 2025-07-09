import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, Camera, Mail, Phone, MapPin, Save } from 'lucide-react';
import './Settings.css';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    examTarget: 'JEE Main 2024',
    bio: 'Aspiring engineer preparing for JEE Main 2024. Passionate about physics and mathematics.',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    studyReminders: true,
    testReminders: true,
    achievementNotifications: true,
    weeklyProgress: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    dataSharing: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'help', name: 'Help', icon: HelpCircle }
  ];

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="settings-root">
      {/* Header */}
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-desc">Manage your account and preferences</p>
        </div>
      </div>

      <div className="settings-layout">
        {/* Sidebar */}
        <aside className="settings-sidebar">
          <nav className="settings-tabs">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`settings-tab-btn${activeTab === tab.id ? ' active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
          <div className="settings-signout-wrap">
            <button className="settings-signout-btn">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="settings-main">
          <div className="settings-main-card">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="settings-section-title">Profile Information</h2>
                {/* Avatar Section */}
                <div className="settings-profile-avatar-row">
                  <div className="settings-avatar-wrap">
                    <img 
                      src={profileData.avatar} 
                      alt="Profile"
                      className="settings-avatar-img"
                    />
                    <button className="settings-avatar-btn">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="settings-profile-name">{profileData.firstName} {profileData.lastName}</h3>
                    <p className="settings-profile-exam">{profileData.examTarget}</p>
                  </div>
                </div>
                {/* Profile Form */}
                <div className="settings-profile-form">
                  <div>
                    <label className="settings-label">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                      className="settings-input"
                    />
                  </div>
                  <div>
                    <label className="settings-label">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                      className="settings-input"
                    />
                  </div>
                  <div>
                    <label className="settings-label">Email</label>
                    <div className="settings-input-icon-wrap">
                      <Mail size={20} className="settings-input-icon" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="settings-input settings-input-iconed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="settings-label">Phone</label>
                    <div className="settings-input-icon-wrap">
                      <Phone size={20} className="settings-input-icon" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className="settings-input settings-input-iconed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="settings-label">Location</label>
                    <div className="settings-input-icon-wrap">
                      <MapPin size={20} className="settings-input-icon" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        className="settings-input settings-input-iconed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="settings-label">Exam Target</label>
                    <select
                      value={profileData.examTarget}
                      onChange={(e) => handleProfileChange('examTarget', e.target.value)}
                      className="settings-input"
                    >
                      <option value="JEE Main 2024">JEE Main 2024</option>
                      <option value="NEET 2024">NEET 2024</option>
                      <option value="UPSC CSE 2024">UPSC CSE 2024</option>
                      <option value="CAT 2024">CAT 2024</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="settings-profile-bio-wrap">
                  <label className="settings-label">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={4}
                    className="settings-input settings-textarea"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="settings-save-row">
                  <button className="settings-save-btn">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="settings-section-title">Notification Preferences</h2>
                <div className="settings-notification-section">
                  <h3>Delivery Methods</h3>
                  <div className="settings-switch-group">
                    <label className="settings-switch-row">
                      <div>
                        <span>Email Notifications</span>
                        <p>Receive notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                      />
                    </label>
                    <label className="settings-switch-row">
                      <div>
                        <span>Push Notifications</span>
                        <p>Receive push notifications on your device</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                      />
                    </label>
                    <label className="settings-switch-row">
                      <div>
                        <span>SMS Notifications</span>
                        <p>Receive notifications via SMS</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                      />
                    </label>
                  </div>
                </div>
                <div className="settings-notification-section">
                  <h3>What to Notify</h3>
                  <div className="settings-switch-group">
                    <label className="settings-switch-row">
                      <div>
                        <span>Study Reminders</span>
                        <p>Daily study reminders and motivation</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.studyReminders}
                        onChange={(e) => handleNotificationChange('studyReminders', e.target.checked)}
                      />
                    </label>
                    <label className="settings-switch-row">
                      <div>
                        <span>Test Reminders</span>
                        <p>Upcoming test and quiz reminders</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.testReminders}
                        onChange={(e) => handleNotificationChange('testReminders', e.target.checked)}
                      />
                    </label>
                    <label className="settings-switch-row">
                      <div>
                        <span>Achievement Notifications</span>
                        <p>Celebrate your achievements and milestones</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.achievementNotifications}
                        onChange={(e) => handleNotificationChange('achievementNotifications', e.target.checked)}
                      />
                    </label>
                    <label className="settings-switch-row">
                      <div>
                        <span>Weekly Progress Report</span>
                        <p>Weekly summary of your learning progress</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyProgress}
                        onChange={(e) => handleNotificationChange('weeklyProgress', e.target.checked)}
                      />
                    </label>
                  </div>
                </div>
                <div className="settings-save-row">
                  <button className="settings-save-btn">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="settings-section-title">Privacy Settings</h2>
                <div className="settings-privacy-section">
                  <label className="settings-label">Profile Visibility</label>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="settings-input"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="settings-switch-group">
                  <label className="settings-switch-row">
                    <div>
                      <span>Show Progress</span>
                      <p>Allow others to see your learning progress</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.showProgress}
                      onChange={(e) => handlePrivacyChange('showProgress', e.target.checked)}
                    />
                  </label>
                  <label className="settings-switch-row">
                    <div>
                      <span>Show Achievements</span>
                      <p>Display your achievements publicly</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.showAchievements}
                      onChange={(e) => handlePrivacyChange('showAchievements', e.target.checked)}
                    />
                  </label>
                  <label className="settings-switch-row">
                    <div>
                      <span>Allow Messages</span>
                      <p>Allow other users to send you messages</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.allowMessages}
                      onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                    />
                  </label>
                  <label className="settings-switch-row">
                    <div>
                      <span>Data Sharing</span>
                      <p>Share anonymized data for research purposes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacySettings.dataSharing}
                      onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                    />
                  </label>
                </div>
                <div className="settings-save-row">
                  <button className="settings-save-btn">
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="settings-section-title">Appearance</h2>
                <p className="settings-comingsoon">Theme and display preferences coming soon...</p>
              </div>
            )}

            {/* Language Tab */}
            {activeTab === 'language' && (
              <div>
                <h2 className="settings-section-title">Language & Region</h2>
                <p className="settings-comingsoon">Language settings coming soon...</p>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === 'help' && (
              <div>
                <h2 className="settings-section-title">Help & Support</h2>
                <p className="settings-comingsoon">Help center and support options coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

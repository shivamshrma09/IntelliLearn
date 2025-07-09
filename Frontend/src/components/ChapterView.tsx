import React, { useState } from 'react';
import { 
  ArrowLeft, BookOpen, FileText, MessageCircle, Download, Share2, Star, Clock, Target, 
  Bookmark, CheckCircle, HelpCircle, Edit3, Save, Plus, Lightbulb
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const ChapterView = ({ chapter, onBack }) => {
  const { user, addPoints } = useUser();
  const [activeTab, setActiveTab] = useState('read');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [notes, setNotes] = useState('');
  const [doubts, setDoubts] = useState([
    {
      id: 1,
      question: "Can you explain the concept of interference in more detail?",
      answer: "Interference occurs when two or more waves overlap and combine to form a new wave pattern...",
      timestamp: "2 hours ago",
      resolved: true
    },
    {
      id: 2,
      question: "What's the difference between constructive and destructive interference?",
      answer: "",
      timestamp: "1 hour ago",
      resolved: false
    }
  ]);
  const [newDoubt, setNewDoubt] = useState('');

  // Mock chapter content
  const chapterContent = {
    title: chapter.title || 'Physics Chapter 1: Mechanics',
    subject: 'Physics',
    batch: 'JEE Main 2024 Physics',
    duration: '45 minutes',
    content: `
      <h1>Introduction to Mechanics</h1>
      <p>Mechanics is the branch of physics that deals with the motion of objects and the forces that cause this motion. It is one of the fundamental areas of physics and forms the basis for understanding many other physical phenomena.</p>
      <h2>Key Concepts</h2>
      <h3>1. Motion</h3>
      <p>Motion is the change in position of an object with respect to time. There are different types of motion:</p>
      <ul>
        <li><strong>Linear Motion:</strong> Motion along a straight line</li>
        <li><strong>Circular Motion:</strong> Motion along a circular path</li>
        <li><strong>Oscillatory Motion:</strong> Repetitive motion back and forth</li>
      </ul>
      <h3>2. Newton's Laws of Motion</h3>
      <p>Newton's three laws form the foundation of classical mechanics:</p>
      <h4>First Law (Law of Inertia)</h4>
      <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
      <h4>Second Law</h4>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      <p><strong>Formula:</strong> F = ma</p>
      <h4>Third Law</h4>
      <p>For every action, there is an equal and opposite reaction.</p>
      <h3>3. Force and Energy</h3>
      <p>Force is a push or pull that can change the motion of an object. Energy is the capacity to do work.</p>
      <h4>Types of Forces:</h4>
      <ul>
        <li>Gravitational force</li>
        <li>Normal force</li>
        <li>Friction force</li>
        <li>Applied force</li>
      </ul>
      <h4>Types of Energy:</h4>
      <ul>
        <li><strong>Kinetic Energy:</strong> Energy due to motion (KE = ½mv²)</li>
        <li><strong>Potential Energy:</strong> Stored energy (PE = mgh for gravitational)</li>
      </ul>
      <h2>Important Formulas</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Velocity:</strong> v = u + at</p>
        <p><strong>Displacement:</strong> s = ut + ½at²</p>
        <p><strong>Velocity-Displacement:</strong> v² = u² + 2as</p>
        <p><strong>Force:</strong> F = ma</p>
        <p><strong>Work:</strong> W = F × s × cos(θ)</p>
        <p><strong>Power:</strong> P = W/t</p>
      </div>
      <h2>Applications</h2>
      <p>Mechanics has numerous practical applications:</p>
      <ul>
        <li>Automotive engineering</li>
        <li>Aerospace engineering</li>
        <li>Sports science</li>
        <li>Architecture and construction</li>
        <li>Robotics</li>
      </ul>
      <h2>Summary</h2>
      <p>Understanding mechanics is crucial for solving problems in physics and engineering. The principles of motion, force, and energy form the foundation for more advanced topics in physics.</p>
    `,
    resources: [
      {
        title: "Interactive Physics Simulations",
        type: "simulation",
        url: "#",
        description: "Explore physics concepts through interactive simulations"
      },
      {
        title: "Mechanics Problem Set",
        type: "pdf",
        url: "#",
        description: "Practice problems with detailed solutions"
      },
      {
        title: "Video Lectures on Classical Mechanics",
        type: "video",
        url: "#",
        description: "Comprehensive video series on mechanics"
      },
      {
        title: "Physics Formula Sheet",
        type: "reference",
        url: "#",
        description: "Quick reference for important formulas"
      }
    ],
    quiz: [
      {
        question: "What is Newton's first law of motion?",
        options: [
          "F = ma",
          "For every action, there is an equal and opposite reaction",
          "An object at rest stays at rest unless acted upon by a force",
          "Energy cannot be created or destroyed"
        ],
        correct: 2
      },
      {
        question: "What is the formula for kinetic energy?",
        options: [
          "KE = mgh",
          "KE = ½mv²",
          "KE = Ft",
          "KE = ma"
        ],
        correct: 1
      },
      {
        question: "Which type of motion occurs along a circular path?",
        options: [
          "Linear motion",
          "Oscillatory motion",
          "Circular motion",
          "Random motion"
        ],
        correct: 2
      }
    ]
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const submitQuiz = () => {
    let correct = 0;
    chapterContent.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });
    const score = (correct / chapterContent.quiz.length) * 100;
    addPoints(Math.round(score));
    alert(`Quiz completed! You scored ${Math.round(score)}% and earned ${Math.round(score)} points.`);
  };

  const shareChapter = () => {
    const message = `📚 Just completed studying "${chapterContent.title}" on IntelliLearn! 🎓✨`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      addPoints(10);
    }
  };

  const saveNotes = () => {
    addPoints(5);
    alert('Notes saved successfully! You earned 5 points.');
  };

  const submitDoubt = () => {
    if (newDoubt.trim()) {
      const doubt = {
        id: doubts.length + 1,
        question: newDoubt,
        answer: "",
        timestamp: "Just now",
        resolved: false
      };
      setDoubts([doubt, ...doubts]);
      setNewDoubt('');
      addPoints(2);
      alert('Doubt submitted! You earned 2 points. Our AI will respond shortly.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleBookmark}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isBookmarked 
                ? 'bg-yellow-100 text-yellow-600 shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={shareChapter}
            className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-300 shadow-md hover:shadow-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Chapter Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{chapterContent.title}</h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <span className="font-medium">{chapterContent.subject}</span>
              <span>•</span>
              <span>{chapterContent.batch}</span>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{chapterContent.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <span className="text-xl font-medium">4.8</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('read')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'read'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Read</span>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'resources'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Lightbulb className="w-5 h-5" />
            <span>Resources</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'notes'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Notes</span>
          </button>
          <button
            onClick={() => setActiveTab('doubts')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
              activeTab === 'doubts'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Doubts</span>
            {doubts.filter(d => !d.resolved).length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {doubts.filter(d => !d.resolved).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
              showQuiz
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Quiz</span>
          </button>
        </div>
      </div>
      {/* Content Area */}
      {activeTab === 'read' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: chapterContent.content }}
          />
        </div>
      )}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapterContent.resources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Access Resource →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
            <button
              onClick={saveNotes}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Notes</span>
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>
      )}
      {activeTab === 'doubts' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask Your Doubts</h2>
          <div className="mb-8">
            <div className="flex space-x-4">
              <textarea
                value={newDoubt}
                onChange={(e) => setNewDoubt(e.target.value)}
                placeholder="Ask your doubt here..."
                className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows={3}
              />
              <button
                onClick={submitDoubt}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Ask</span>
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {doubts.map((doubt) => (
              <div key={doubt.id} className={`border rounded-xl p-6 ${
                doubt.resolved ? 'border-green-200 bg-green-50' : 'border-orange-200 bg

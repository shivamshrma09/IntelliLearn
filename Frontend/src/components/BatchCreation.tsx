import React, { useState } from 'react';
import {
  Upload, FileText, Link, ArrowRight, ArrowLeft, CheckCircle, Edit3, Save, X, Plus, Trash2, BookOpen, Target, Clock, Users
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './BatchCreation.css';

const BatchCreation = ({ onBack }) => {
  const { user, addPoints } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    batchName: '',
    subject: '',
    targetLevel: '',
    language: 'English',
    goal: '',
    syllabusType: 'upload',
    syllabusFile: null,
    syllabusText: '',
    syllabusUrl: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('syllabusFile', file);
    }
  };

  const processDataAndGenerateOutline = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const mockOutline = {
      batchName: formData.batchName,
      subject: formData.subject,
      estimatedDuration: '120 hours',
      totalChapters: 12,
      units: [
        {
          id: 1,
          title: 'Unit 1: Foundation',
          chapters: [
            { id: 1, title: 'Introduction to Physics', topics: ['Basic Concepts', 'Units and Measurements', 'Dimensional Analysis'], duration: '8 hours' },
            { id: 2, title: 'Mechanics', topics: ['Kinematics', "Newton's Laws", 'Work and Energy'], duration: '12 hours' },
            { id: 3, title: 'Gravitation', topics: ['Universal Gravitation', 'Planetary Motion', 'Satellites'], duration: '10 hours' }
          ]
        },
        {
          id: 2,
          title: 'Unit 2: Intermediate',
          chapters: [
            { id: 4, title: 'Thermodynamics', topics: ['Heat and Temperature', 'Laws of Thermodynamics', 'Kinetic Theory'], duration: '14 hours' },
            { id: 5, title: 'Waves and Oscillations', topics: ['Simple Harmonic Motion', 'Wave Properties', 'Sound Waves'], duration: '12 hours' },
            { id: 6, title: 'Optics', topics: ['Reflection', 'Refraction', 'Interference'], duration: '16 hours' }
          ]
        },
        {
          id: 3,
          title: 'Unit 3: Advanced',
          chapters: [
            { id: 7, title: 'Electricity', topics: ['Electric Field', 'Electric Potential', 'Capacitance'], duration: '18 hours' },
            { id: 8, title: 'Magnetism', topics: ['Magnetic Field', 'Electromagnetic Induction', 'AC Circuits'], duration: '16 hours' },
            { id: 9, title: 'Modern Physics', topics: ['Quantum Mechanics', 'Nuclear Physics', 'Relativity'], duration: '20 hours' }
          ]
        }
      ]
    };
    setGeneratedOutline(mockOutline);
    setIsProcessing(false);
    setStep(3);
  };

  const handleCreateBatch = () => {
    addPoints(100);
    alert('🎉 Batch created successfully! You earned 100 points.');
    onBack();
  };

  const editChapter = (chapter) => {
    setEditingChapter({ ...chapter });
  };

  const saveChapterEdit = () => {
    if (generatedOutline && editingChapter) {
      const updatedOutline = { ...generatedOutline };
      updatedOutline.units.forEach(unit => {
        unit.chapters.forEach(chapter => {
          if (chapter.id === editingChapter.id) {
            Object.assign(chapter, editingChapter);
          }
        });
      });
      setGeneratedOutline(updatedOutline);
      setEditingChapter(null);
    }
  };

  const addNewTopic = () => {
    if (editingChapter) {
      setEditingChapter({
        ...editingChapter,
        topics: [...editingChapter.topics, 'New Topic']
      });
    }
  };

  const removeTopic = (index) => {
    if (editingChapter) {
      setEditingChapter({
        ...editingChapter,
        topics: editingChapter.topics.filter((_, i) => i !== index)
      });
    }
  };

  const updateTopic = (index, value) => {
    if (editingChapter) {
      const updatedTopics = [...editingChapter.topics];
      updatedTopics[index] = value;
      setEditingChapter({
        ...editingChapter,
        topics: updatedTopics
      });
    }
  };

  return (
    <div className="batchcreation-root">
      {/* Header */}
      <div className="batchcreation-header">
        <button
          onClick={onBack}
          className="batchcreation-backbtn"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to My Batches</span>
        </button>
        <h1 className="batchcreation-title">Create Custom Batch</h1>
        <p className="batchcreation-desc">
          Upload your syllabus and let AI create a personalized learning path
        </p>
      </div>

      {/* Progress Steps */}
      <div className="batchcreation-steps">
        <div className="batchcreation-steps-row">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`batchcreation-step-circle${step >= stepNumber ? ' active' : ''}`}>
                {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`batchcreation-step-bar${step > stepNumber ? ' completed' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="batchcreation-step-labels">
          <span>Define Goals</span>
          <span>Upload Syllabus</span>
          <span>Review & Create</span>
        </div>
      </div>

      {/* Step 1: Define Goals */}
      {step === 1 && (
        <div className="batchcreation-card">
          <h2 className="batchcreation-label" style={{ fontSize: '1.2rem', marginBottom: 24 }}>Define Your Learning Goals</h2>
          <div className="batchcreation-form-row">
            <div style={{ flex: 1 }}>
              <label className="batchcreation-label">Batch Name *</label>
              <input
                type="text"
                value={formData.batchName}
                onChange={(e) => handleInputChange('batchName', e.target.value)}
                placeholder="e.g., My JEE Physics Preparation"
                className="batchcreation-input"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="batchcreation-label">Subject *</label>
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="batchcreation-select"
              >
                <option value="">Select Subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="English">English</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label className="batchcreation-label">Target Level/Exam *</label>
              <select
                value={formData.targetLevel}
                onChange={(e) => handleInputChange('targetLevel', e.target.value)}
                className="batchcreation-select"
              >
                <option value="">Select Target</option>
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
                <option value="NEET">NEET</option>
                <option value="UPSC">UPSC</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="University">University</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label className="batchcreation-label">Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="batchcreation-select"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <label className="batchcreation-label">Learning Goal (Optional)</label>
            <textarea
              value={formData.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              placeholder="Describe your specific learning objectives..."
              rows={3}
              className="batchcreation-textarea"
            />
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.batchName || !formData.subject || !formData.targetLevel}
              className="batchcreation-btn-primary"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload Syllabus */}
      {step === 2 && (
        <div className="batchcreation-card">
          <h2 className="batchcreation-label" style={{ fontSize: '1.2rem', marginBottom: 24 }}>Upload Your Syllabus</h2>
          <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
            {[
              { id: 'upload', label: 'Upload PDF', icon: Upload },
              { id: 'text', label: 'Paste Text', icon: FileText },
              { id: 'url', label: 'Enter URL', icon: Link }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handleInputChange('syllabusType', method.id)}
                  className={`batchcreation-btn-secondary${formData.syllabusType === method.id ? ' batchcreation-btn-primary' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{method.label}</span>
                </button>
              );
            })}
          </div>
          {/* Upload Method Content */}
          {formData.syllabusType === 'upload' && (
            <div className="batchcreation-upload-box">
              <Upload className="w-12 h-12" style={{ color: '#9ca3af', marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', marginBottom: 8 }}>Upload Syllabus PDF</h3>
              <p style={{ color: '#6b7280', marginBottom: 16 }}>
                Upload your curriculum PDF, syllabus document, or course outline
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="batchcreation-upload-btn"
                style={{ cursor: 'pointer' }}
              >
                Choose File
              </label>
              {formData.syllabusFile && (
                <p style={{ marginTop: 8, color: '#22c55e', fontSize: '0.97rem' }}>
                  ✓ {formData.syllabusFile.name}
                </p>
              )}
            </div>
          )}
          {formData.syllabusType === 'text' && (
            <div>
              <label className="batchcreation-label">Paste Syllabus Text</label>
              <textarea
                value={formData.syllabusText}
                onChange={(e) => handleInputChange('syllabusText', e.target.value)}
                placeholder="Paste your syllabus content here..."
                rows={12}
                className="batchcreation-textarea"
              />
            </div>
          )}
          {formData.syllabusType === 'url' && (
            <div>
              <label className="batchcreation-label">Syllabus URL</label>
              <input
                type="url"
                value={formData.syllabusUrl}
                onChange={(e) => handleInputChange('syllabusUrl', e.target.value)}
                placeholder="https://example.com/syllabus"
                className="batchcreation-input"
              />
            </div>
          )}
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => setStep(1)}
              className="batchcreation-btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={processDataAndGenerateOutline}
              disabled={!formData.syllabusFile && !formData.syllabusText && !formData.syllabusUrl}
              className="batchcreation-btn-primary"
            >
              <span>Generate Outline</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Processing Screen */}
      {isProcessing && (
        <div className="batchcreation-card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{
            width: 64, height: 64, margin: '0 auto 24px',
            border: '6px solid #3b82f6', borderTopColor: 'transparent',
            borderRadius: '50%', animation: 'spin 1s linear infinite'
          }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: 16 }}>Analyzing Your Syllabus</h2>
          <p style={{ color: '#6b7280', marginBottom: 24 }}>
            Our AI is processing your syllabus and creating a personalized learning path...
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span>Extracting key topics...</span>
            <span>Structuring chapters...</span>
            <span>Optimizing learning path...</span>
          </div>
        </div>
      )}

      {/* Step 3: Review & Create */}
      {step === 3 && generatedOutline && (
        <div className="batchcreation-card">
          <h2 className="batchcreation-label" style={{ fontSize: '1.2rem', marginBottom: 24 }}>Review Your Custom Batch</h2>
          {/* Batch Overview */}
          <div className="batchcreation-outline-banner">
            <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: 16 }}>{generatedOutline.batchName}</h3>
            <div className="batchcreation-outline-grid">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen className="w-5 h-5" style={{ color: '#2563eb' }} />
                <div>
                  <p style={{ fontSize: '0.97rem', color: '#6b7280' }}>Subject</p>
                  <p style={{ fontWeight: 500 }}>{generatedOutline.subject}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Target className="w-5 h-5" style={{ color: '#22c55e' }} />
                <div>
                  <p style={{ fontSize: '0.97rem', color: '#6b7280' }}>Chapters</p>
                  <p style={{ fontWeight: 500 }}>{generatedOutline.totalChapters}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock className="w-5 h-5" style={{ color: '#a21caf' }} />
                <div>
                  <p style={{ fontSize: '0.97rem', color: '#6b7280' }}>Duration</p>
                  <p style={{ fontWeight: 500 }}>{generatedOutline.estimatedDuration}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users className="w-5 h-5" style={{ color: '#ea580c' }} />
                <div>
                  <p style={{ fontSize: '0.97rem', color: '#6b7280' }}>Level</p>
                  <p style={{ fontWeight: 500 }}>{formData.targetLevel}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Course Outline */}
          <div>
            {generatedOutline.units.map((unit) => (
              <div key={unit.id} className="batchcreation-outline-card">
                <h4 style={{ fontWeight: 600, color: '#111827', marginBottom: 12 }}>{unit.title}</h4>
                {unit.chapters.map((chapter) => (
                  <div key={chapter.id} className="batchcreation-chapter-card">
                    <div className="batchcreation-chapter-title-row">
                      <span className="batchcreation-chapter-title">{chapter.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="batchcreation-chapter-duration">{chapter.duration}</span>
                        <button
                          onClick={() => editChapter(chapter)}
                          className="batchcreation-chapter-edit-btn"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="batchcreation-chapter-topics">
                      {chapter.topics.map((topic, idx) => (
                        <span key={idx} className="batchcreation-chapter-topic">{topic}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => setStep(2)}
              className="batchcreation-btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleCreateBatch}
              className="batchcreation-btn-primary"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Create Batch</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Chapter Modal */}
      {editingChapter && (
        <div className="batchcreation-modal-bg">
          <div className="batchcreation-modal">
            <div className="batchcreation-modal-header">
              <h3 className="batchcreation-modal-title">Edit Chapter</h3>
              <button
                onClick={() => setEditingChapter(null)}
                className="batchcreation-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="batchcreation-modal-form">
              <div>
                <label className="batchcreation-label">Chapter Title</label>
                <input
                  type="text"
                  value={editingChapter.title}
                  onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                  className="batchcreation-input"
                />
              </div>
              <div>
                <label className="batchcreation-label">Duration</label>
                <input
                  type="text"
                  value={editingChapter.duration}
                  onChange={(e) => setEditingChapter({ ...editingChapter, duration: e.target.value })}
                  className="batchcreation-input"
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label className="batchcreation-label" style={{ marginBottom: 0 }}>Topics</label>
                  <button
                    onClick={addNewTopic}
                    className="batchcreation-btn-secondary"
                    style={{ color: '#2563eb', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Topic</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {editingChapter.topics.map((topic, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => updateTopic(index, e.target.value)}
                        className="batchcreation-input"
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={() => removeTopic(index)}
                        className="batchcreation-modal-close"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="batchcreation-modal-actions">
              <button
                onClick={() => setEditingChapter(null)}
                className="batchcreation-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={saveChapterEdit}
                className="batchcreation-modal-btn"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchCreation;

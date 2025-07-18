import React, { useState, useEffect } from "react";
import {
  BookOpen, Filter, Search, Zap, Users, ArrowLeft,
  ChevronDown, ChevronUp, Calendar, Share2, Download
} from "lucide-react";
import "./MyBatch.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = "AIzaSyAfwcB3iGjVSL0PgdoHtr0B5J4N14e3_6I"; // <-- अपना Gemini API Key यहाँ डालें

const getGeminiModel = (modelName = "gemini-1.5-flash") => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  return genAI.getGenerativeModel({ model: modelName });
};

const MyBatch = () => {
  // केवल बैकएंड से डेटा मैनेज
  const [batches, setBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("my-batches");

  // बैच बनाना
  const [showBatchCreation, setShowBatchCreation] = useState(false);
  const [loading, setLoading] = useState(false);

  // डिटेल्स
  const [showBatchDetails, setShowBatchDetails] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [activeDetailsTab, setActiveDetailsTab] = useState("description");
  const [openChapterIndex, setOpenChapterIndex] = useState(null);

  // फॉर्म
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("Beginner");
  const [newLanguage, setNewLanguage] = useState("English");
  const [newDuration, setNewDuration] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [syllabusInputType, setSyllabusInputType] = useState("text");
  const [newSyllabusText, setNewSyllabusText] = useState("");

  // ------- Backend fetch ---------
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch('/api/batches');
        if (!res.ok) throw new Error("Failed to load batches");
        const data = await res.json();
        setBatches(data);
      } catch (err) {
        alert("Batch fetch error: " + err.message);
      }
    };
    fetchBatches();
  }, []);
  // -------------------------------

  const resetForm = () => {
    setNewTitle("");
    setNewSubject("");
    setNewDifficulty("Beginner");
    setNewLanguage("English");
    setNewDuration("");
    setNewInstructor("");
    setNewImage("");
    setNewDescription("");
    setSyllabusInputType("text");
    setNewSyllabusText("");
  };

  // CREATE BATCH VIA GEMINI + POST TO BACKEND
  const handleBatchFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const prompt = `
You are an expert engineering educator. Create a highly detailed, accurate, and comprehensive learning plan for:
Subject: ${newSubject}
Language: ${newLanguage}
Difficulty: ${newDifficulty}
Time: ${newDuration}
Syllabus/Detail: ${newSyllabusText || newDescription}
Answer in JSON like:
{ "batchName": "string", "description": "string", "chapters": [ { "title": "string", "topics": [ { "title": "string", "explanation": "string" } ] } ] }
Only return strict JSON, no text outside JSON.
`;
    try {
      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response && result.response.text ? await result.response.text() : '';
      if (!rawText.trim()) throw new Error("Gemini API returned nothing!");

      let generatedPlan;
      try {
        const jsonStart = rawText.indexOf("{");
        const jsonEnd = rawText.lastIndexOf("}");
        const jsonText = rawText.slice(jsonStart, jsonEnd + 1);
        generatedPlan = JSON.parse(jsonText);
      } catch {
        generatedPlan = {
          batchName: newTitle || "Untitled",
          description: "Could not parse Gemini output.",
          chapters: [],
          rawText,
        };
      }
      const chapters = Array.isArray(generatedPlan.chapters) ? generatedPlan.chapters : [];
      const newBatch = {
        id: Date.now(),
        title: generatedPlan.batchName || newTitle || "Untitled",
        subject: newSubject,
        difficulty: newDifficulty,
        language: newLanguage,
        estimatedTime: newDuration ? `${newDuration} hours` : "",
        instructor: newInstructor,
        image: newImage ||
          "https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
        progress: 0,
        totalChapters: chapters.length,
        completedChapters: 0,
        enrolledStudents: 1,
        type: "custom",
        aiLearningPlan: {
          batchName: generatedPlan.batchName,
          description: generatedPlan.description,
          chapters,
        },
        completionStatus: chapters.map(ch => ({
          completed: false,
          topics: Array.isArray(ch.topics) ? ch.topics.map(() => ({ completed: false })) : [],
          testAttempted: false,
        }))
      };
      // -- Send to backend --
      const response = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBatch)
      });
      if (!response.ok) throw new Error("Failed to save batch to backend.");
      const saved = await response.json();
      setBatches(prev => [saved.batch, ...prev]);
      resetForm();
      setShowBatchCreation(false);
    } catch (err) {
      alert("AI या Backend त्रुटि: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------- खोज व फिल्टर ----------
  const getCurrentBatches = () => {
    if (activeTab === "my-batches") {
      return batches.filter((batch) => {
        const termLower = searchTerm.toLowerCase();
        const matchesSearch =
          (batch.title?.toLowerCase().includes(termLower) || "") ||
          (batch.subject?.toLowerCase().includes(termLower) || "");
        const matchesFilter =
          filterType === "all" ||
          (filterType === "custom" && batch.type === "custom") ||
          (filterType === "active" && batch.progress > 0 && batch.progress < 100) ||
          (filterType === "completed" && batch.progress === 100);
        return matchesSearch && matchesFilter;
      });
    } else {
      return [];
    }
  };
  // ----------------------------------

  const handleImageError = (e) => {
    e.target.src =
      "https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=300&h=200";
  };

  // और सब UI जस का तस (short demo version, आप अपना पोस्ट, नोट्स, टॉपिक्स वग़ैरह चाहें तो डाल सकते हैं)
  return (
    <div className="mybatch-root">
      {/* -- Batch Creation Modal -- */}
      {showBatchCreation && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content">
            <h2>Create a New Batch</h2>
            <form onSubmit={handleBatchFormSubmit} className="pw-batch-form">
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Batch Title *" required />
              <input value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="Subject *" required />
              <select value={newDifficulty} onChange={e => setNewDifficulty(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <input value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Language *" required />
              <input value={newDuration} onChange={e => setNewDuration(e.target.value)} type="number" min="1" placeholder="Duration (hrs)" />
              <input value={newInstructor} onChange={e => setNewInstructor(e.target.value)} placeholder="Instructor Name" />
              <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Description (optional)"></textarea>
              <textarea value={newSyllabusText} onChange={e => setNewSyllabusText(e.target.value)} placeholder="Enter syllabus topics"></textarea>
              <input value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="Image URL (optional)" />
              <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Batch"}</button>
              <button type="button" onClick={() => setShowBatchCreation(false)} disabled={loading}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* -- Header -- */}
      <div className="mybatch-header">
        <h1>Learning Batches</h1>
        <button onClick={() => setShowBatchCreation(true)} className="mybatch-btn">
          <Zap /> Create AI Batch
        </button>
      </div>
      {/* -- Filter -- */}
      <div>
        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      {/* -- Batch List -- */}
      <div className="mybatch-list">
        {getCurrentBatches().length > 0 ? (
          getCurrentBatches().map((batch) => (
            <div key={batch.id} className="mybatch-card" onClick={() => { setSelectedBatch(batch); setShowBatchDetails(true); }}>
              <img src={batch.image} alt={batch.title} onError={handleImageError} />
              <h3>{batch.title}</h3>
              <p>{batch.subject}</p>
              <div>
                <span><Users size={16} /> {batch.enrolledStudents}</span>
                <span><BookOpen size={16} /> {batch.totalChapters} Chapters</span>
              </div>
              <div className="mybatch-progress-container">
                <div className="mybatch-progress-bar" style={{ width: `${batch.progress}%` }}></div>
                <span className="mybatch-progress-text">{batch.progress}% Complete</span>
              </div>
            </div>
          ))
        ) : (
          <div>No batches found.</div>
        )}
      </div>
      {/* -- Batch Details View (Demo) -- */}
      {showBatchDetails && selectedBatch && (
        <div className="mybatch-details">
          <button onClick={() => { setShowBatchDetails(false); setSelectedBatch(null); }}>
            <ArrowLeft /> Back
          </button>
          <h2>{selectedBatch.title}</h2>
          <span>Subject: {selectedBatch.subject}</span> <br />
          <span>Instructor: {selectedBatch.instructor}</span> <br />
          <span>Chapters: {selectedBatch.totalChapters}</span>
          <div>{selectedBatch.aiLearningPlan && selectedBatch.aiLearningPlan.description}</div>
          {/* Add more details, chapters, topic list etc. here as per need */}
        </div>
      )}
    </div>
  );
};

export default MyBatch;

import React, { useState, useEffect } from "react";
import {
  BookOpen, Search, Zap, Users, ArrowLeft, Award, Star,
  ChevronDown, ChevronUp, FileText, CheckCircle, Edit3, Lock,
  Download, Calendar, Clock, Sparkles, GraduationCap, Trophy,
  Book, Youtube, ExternalLink, AlertTriangle, BarChart2, PieChart,
  Image, Code, CircuitBoard, FlaskConical, Lightbulb, Layers,
  FileDown, BookMarked, HelpCircle, MessageSquare
} from "lucide-react";
import "./MyBatch.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

// API key directly used in component for Gemini integration
const GOOGLE_API_KEY = "AIzaSyC5wCrEK1HSLGpnbOZ0vVqsBl83QuR-VJI";

const getGeminiModel = (modelName = "gemini-1.5-flash") => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  return genAI.getGenerativeModel({ model: modelName });
};

// Generate flashcards directly in component
const generateFlashcards = async (subject, topic, count = 5) => {
  try {
    const model = getGeminiModel();
    const prompt = `Generate ${count} educational flashcards for the subject "${subject}" and topic "${topic}". 
    For each flashcard, provide a title and content in this format: 
    TITLE: [title], 
    CONTENT: [content]. 
    Each flashcard should be separated by ---`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    
    // Parse the generated flashcards
    return generatedText.split('---').map(card => {
      const titleMatch = card.match(/TITLE:\s*(.+)/i);
      const contentMatch = card.match(/CONTENT:\s*([\s\S]+)/i);
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        title: titleMatch ? titleMatch[1].trim() : 'Generated Flashcard',
        content: contentMatch ? contentMatch[1].trim() : card.trim(),
        subject,
        topic,
        likes: 0,
        generated: true
      };
    }).filter(card => card.title && card.content);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return [];
  }
};

// Generate test questions directly in component
const generateTestQuestions = async (subject, topic, count = 5) => {
  try {
    const model = getGeminiModel();
    const prompt = `Generate ${count} multiple-choice questions for the subject "${subject}" and topic "${topic}". 
    For each question, provide the question, 4 options, the correct option index (0-3), and a brief explanation.
    Format each question as:
    QUESTION: [question text]
    OPTIONS: [option1], [option2], [option3], [option4]
    CORRECT: [index]
    EXPLANATION: [explanation]
    ---`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    
    // Parse the generated questions
    return generatedText.split('---').map(item => {
      const questionMatch = item.match(/QUESTION:\s*(.+)/i);
      const optionsMatch = item.match(/OPTIONS:\s*(.+)/i);
      const correctMatch = item.match(/CORRECT:\s*(.+)/i);
      const explanationMatch = item.match(/EXPLANATION:\s*([\s\S]+)/i);
      
      if (!questionMatch || !optionsMatch || !correctMatch) return null;
      
      const options = optionsMatch[1].split(',').map(opt => opt.trim());
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        question: questionMatch[1].trim(),
        options: options.length >= 4 ? options.slice(0, 4) : ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: parseInt(correctMatch[1].trim()) || 0,
        explanation: explanationMatch ? explanationMatch[1].trim() : 'No explanation provided',
        subject,
        topic
      };
    }).filter(q => q !== null);
  } catch (error) {
    console.error('Error generating test questions:', error);
    return [];
  }
};

// Generate learning resources directly in component
const generateResources = async (subject, topic) => {
  try {
    const model = getGeminiModel();
    const prompt = `Generate a list of 5 learning resources for the subject "${subject}" and topic "${topic}".
    Include a mix of articles, videos, and interactive resources.
    For each resource, provide a title, type (article, video, interactive), and a brief description.
    Format as:
    TITLE: [title]
    TYPE: [type]
    DESCRIPTION: [description]
    URL: [placeholder_url]
    ---`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    
    // Parse the generated resources
    return generatedText.split('---').map(item => {
      const titleMatch = item.match(/TITLE:\s*(.+)/i);
      const typeMatch = item.match(/TYPE:\s*(.+)/i);
      const descriptionMatch = item.match(/DESCRIPTION:\s*([\s\S]+?)(?=URL:|$)/i);
      
      if (!titleMatch) return null;
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        title: titleMatch[1].trim(),
        type: typeMatch ? typeMatch[1].trim().toLowerCase() : 'article',
        description: descriptionMatch ? descriptionMatch[1].trim() : 'No description provided',
        url: '#',
        subject,
        topic
      };
    }).filter(r => r !== null);
  } catch (error) {
    console.error('Error generating resources:', error);
    return [];
  }
};

const MyBatch = ({ initialTab = 'my-batches', currentUser = {} }) => {
  const [batches, setBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState(initialTab);

  const [showBatchCreation, setShowBatchCreation] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showBatchDetails, setShowBatchDetails] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [activeDetailsTab, setActiveDetailsTab] = useState("description");
  const [openChapterIndex, setOpenChapterIndex] = useState(null);
  
  // New state variables for enhanced features
  const [showTestModal, setShowTestModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showTestResultsModal, setShowTestResultsModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showFlashcardsModal, setShowFlashcardsModal] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [testQuestions, setTestQuestions] = useState([]);
  const [testLoading, setTestLoading] = useState(false);
  const [testAnswers, setTestAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [assignmentPrompt, setAssignmentPrompt] = useState("");
  const [resources, setResources] = useState({});
  const [adaptiveChapter, setAdaptiveChapter] = useState(null);
  const [flashcards, setFlashcards] = useState({});
  const [detailedTopics, setDetailedTopics] = useState({});
  const [activeDetailTab, setActiveDetailTab] = useState("content");
  const [importantQuestions, setImportantQuestions] = useState({});
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);
  const [loadingResources, setLoadingResources] = useState(false);

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

  // Load flashcards from local storage
  const loadFlashcardsFromStorage = (batchId) => {
    try {
      const storedFlashcards = localStorage.getItem(`flashcards_${batchId}`);
      if (storedFlashcards) {
        setFlashcards(JSON.parse(storedFlashcards));
      }
    } catch (error) {
      console.error('Error loading flashcards from storage:', error);
    }
  };

  // Save flashcards to local storage
  const saveFlashcardsToStorage = (batchId, flashcardsData) => {
    try {
      localStorage.setItem(`flashcards_${batchId}`, JSON.stringify(flashcardsData));
    } catch (error) {
      console.error('Error saving flashcards to storage:', error);
    }
  };

  // Handler for opening flashcards modal with generated content
  const handleOpenFlashcards = async (chapter, topic) => {
    setCurrentChapter(chapter);
    setShowFlashcardsModal(true);
    
    // Check if we already have flashcards for this chapter
    const key = `${chapter.title}-${topic?.title || 'general'}`;
    if (!flashcards[key]) {
      setLoadingFlashcards(true);
      try {
        // Generate flashcards directly in component
        const generatedFlashcards = await generateFlashcards(
          selectedBatch?.subject || 'General',
          topic?.title || chapter.title,
          5
        );
        
        const updatedFlashcards = {
          ...flashcards,
          [key]: generatedFlashcards
        };
        
        setFlashcards(updatedFlashcards);
        
        // Save to local storage
        if (selectedBatch) {
          saveFlashcardsToStorage(selectedBatch.id, updatedFlashcards);
        }
      } catch (error) {
        console.error('Error generating flashcards:', error);
      } finally {
        setLoadingFlashcards(false);
      }
    }
  };

  // Handler for opening test modal with generated questions
  const handleOpenTest = async (chapter) => {
    setCurrentChapter(chapter);
    setShowTestModal(true);
    setTestLoading(true);
    setTestAnswers({});
    setTestResults(null);
    
    try {
      // Generate test questions directly in component
      const questions = await generateTestQuestions(
        selectedBatch?.subject || 'General',
        chapter.title,
        5
      );
      
      setTestQuestions(questions);
    } catch (error) {
      console.error('Error generating test questions:', error);
      setTestQuestions([]);
    } finally {
      setTestLoading(false);
    }
  };

  // Load resources from local storage
  const loadResourcesFromStorage = (batchId) => {
    try {
      const storedResources = localStorage.getItem(`resources_${batchId}`);
      if (storedResources) {
        setResources(JSON.parse(storedResources));
      }
    } catch (error) {
      console.error('Error loading resources from storage:', error);
    }
  };

  // Save resources to local storage
  const saveResourcesToStorage = (batchId, resourcesData) => {
    try {
      localStorage.setItem(`resources_${batchId}`, JSON.stringify(resourcesData));
    } catch (error) {
      console.error('Error saving resources to storage:', error);
    }
  };









  // Handler for opening resources modal with generated content
  const handleOpenResources = async (chapter, topic) => {
    setCurrentChapter(chapter);
    setShowResourcesModal(true);
    
    // Check if we already have resources for this chapter
    const key = `${chapter.title}-${topic?.title || 'general'}`;
    if (!resources[key]) {
      setLoadingResources(true);
      try {
        // Generate resources directly in component
        const generatedResources = await generateResources(
          selectedBatch?.subject || 'General',
          topic?.title || chapter.title
        );
        
        const updatedResources = {
          ...resources,
          [key]: generatedResources
        };
        
        setResources(updatedResources);
        
        // Save to local storage
        if (selectedBatch) {
          saveResourcesToStorage(selectedBatch.id, updatedResources);
        }
      } catch (error) {
        console.error('Error generating resources:', error);
      } finally {
        setLoadingResources(false);
      }
    }
  };

  // Handler for submitting test answers
  const handleSubmitTest = () => {
    // Calculate results
    let correctCount = 0;
    const questionResults = {};
    
    testQuestions.forEach(question => {
      const userAnswer = testAnswers[question.id];
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) correctCount++;
      
      questionResults[question.id] = {
        userAnswer,
        isCorrect,
        correctAnswer: question.correct,
        explanation: question.explanation
      };
    });
    
    const score = Math.round((correctCount / testQuestions.length) * 100);
    
    setTestResults({
      score,
      correctCount,
      totalQuestions: testQuestions.length,
      questionResults,
      strengths: score > 70 ? ['Good understanding of concepts', 'Quick response time'] : ['Effort to attempt all questions'],
      weaknesses: score < 70 ? ['Need to review core concepts', 'Practice more examples'] : ['Minor details need attention'],
      recommendations: [
        'Review the explanations for incorrect answers',
        'Practice with more examples',
        'Focus on understanding the concepts rather than memorizing'
      ]
    });
  };

  // Function to load progress from database
  const loadProgressFromDatabase = async (batchId) => {
    try {
      const response = await fetch(`/api/progress/${batchId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    return null;
  };

  // Function to load batch content from local storage
  const loadBatchContentFromStorage = (batchId) => {
    try {
      const storedData = localStorage.getItem(`batch_${batchId}`);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Error loading batch content from storage:', error);
    }
    return null;
  };

  useEffect(() => {
    const fetchBatches = async () => {
      // Always load batches from local storage first
      const allStoredBatches = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('batch_')) {
          const storedData = loadBatchContentFromStorage(key.replace('batch_', ''));
          if (storedData) allStoredBatches.push(storedData);
        }
      }
      
      if (allStoredBatches.length > 0) {
        setBatches(allStoredBatches);
      } else {
        try {
          // Only try API if no local batches found
          const res = await fetch('/api/batches', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (res.ok) {
            const data = await res.json();
            setBatches(data);
          } else {
            throw new Error("Failed to load batches");
          }
        } catch (err) {
          console.error("Batch fetch error:", err.message);
          // Use sample data for demo
          const sampleBatches = [
          {
            id: 1,
            title: "Web Development Fundamentals",
            subject: "Computer Science",
            difficulty: "Beginner",
            language: "English",
            estimatedTime: "40 hours",
            instructor: "John Smith",
            image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
            progress: 35,
            totalChapters: 4,
            completedChapters: 1,
            enrolledStudents: 24,
            type: "standard",
            aiLearningPlan: {
              description: "A comprehensive introduction to web development covering HTML, CSS, JavaScript and responsive design principles.",
              chapters: [
                {
                  title: "Introduction to HTML",
                  topics: [
                    { title: "Basic HTML Structure", explanation: "Learn about HTML document structure, tags, and elements." },
                    { title: "HTML Forms", explanation: "Create interactive forms with various input types." }
                  ]
                },
                {
                  title: "CSS Fundamentals",
                  topics: [
                    { title: "CSS Selectors", explanation: "Master different types of CSS selectors and their specificity." },
                    { title: "Box Model", explanation: "Understand the CSS box model including margin, border, padding and content." }
                  ]
                },
                {
                  title: "JavaScript Basics",
                  topics: [
                    { title: "Variables and Data Types", explanation: "Learn about JavaScript variables, data types and operators." },
                    { title: "Functions", explanation: "Create and use functions in JavaScript." }
                  ]
                },
                {
                  title: "Responsive Design",
                  topics: [
                    { title: "Media Queries", explanation: "Create responsive layouts using CSS media queries." },
                    { title: "Flexbox", explanation: "Use flexbox for advanced layout techniques." }
                  ]
                }
              ]
            },
            completionStatus: [
              {
                completed: true,
                topics: [{ completed: true }, { completed: true }],
                testAttempted: true,
                testScore: 90,
                assignmentCompleted: true
              },
              {
                completed: false,
                topics: [{ completed: true }, { completed: false }],
                testAttempted: false
              },
              {
                completed: false,
                topics: [{ completed: false }, { completed: false }],
                testAttempted: false
              },
              {
                completed: false,
                topics: [{ completed: false }, { completed: false }],
                testAttempted: false
              }
            ]
          },
          {
            id: 2,
            title: "Machine Learning Basics",
            subject: "Data Science",
            difficulty: "Intermediate",
            language: "English",
            estimatedTime: "60 hours",
            instructor: "Sarah Johnson",
            image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
            progress: 15,
            totalChapters: 3,
            completedChapters: 0,
            enrolledStudents: 18,
            type: "custom",
            aiLearningPlan: {
              description: "An introduction to machine learning concepts and techniques.",
              chapters: [
                {
                  title: "Introduction to Machine Learning",
                  topics: [
                    { title: "What is Machine Learning?", explanation: "Overview of machine learning concepts and applications." },
                    { title: "Types of Machine Learning", explanation: "Supervised, unsupervised, and reinforcement learning." }
                  ]
                },
                {
                  title: "Data Preprocessing",
                  topics: [
                    { title: "Data Cleaning", explanation: "Techniques for handling missing data and outliers." },
                    { title: "Feature Engineering", explanation: "Creating and selecting features for machine learning models." }
                  ]
                },
                {
                  title: "Supervised Learning Algorithms",
                  topics: [
                    { title: "Linear Regression", explanation: "Understanding and implementing linear regression models." },
                    { title: "Classification Algorithms", explanation: "Decision trees, random forests, and support vector machines." }
                  ]
                }
              ]
            },
            completionStatus: [
              {
                completed: false,
                topics: [{ completed: true }, { completed: false }],
                testAttempted: false
              },
              {
                completed: false,
                topics: [{ completed: false }, { completed: false }],
                testAttempted: false
              },
              {
                completed: false,
                topics: [{ completed: false }, { completed: false }],
                testAttempted: false
              }
            ]
          }
        ];
        
          setBatches(sampleBatches);
        }
      }
      
      // Load saved notes from localStorage
      const savedNotes = localStorage.getItem('batchNotes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    };
    fetchBatches();
  }, []);

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
      const batchId = Date.now().toString();
      
      // Basic batch info for database (no detailed content)
      const batchForDatabase = {
        id: batchId,
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
        description: generatedPlan.description
      };
      
      // Full batch data for local storage
      const batchForStorage = {
        id: batchId,
        title: generatedPlan.batchName || newTitle || "Untitled",
        aiLearningPlan: {
          batchName: generatedPlan.batchName,
          description: generatedPlan.description,
          chapters,
        }
      };
      
      // Completion status for database
      const completionStatus = chapters.map(ch => ({
        completed: false,
        topics: Array.isArray(ch.topics) ? ch.topics.map(() => ({ completed: false })) : [],
        testAttempted: false,
      }));
      
      const newBatch = batchForStorage;



      
      // Save to student's batches array in database
      try {
        const studentResponse = await fetch("http://localhost:1000/students/add-batch", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id: batchId,
            title: generatedPlan.batchName || newTitle || "Untitled",
            description: generatedPlan.description,
            chapters: chapters.map(ch => ({ title: ch.title }))
          })
        });
        
        if (studentResponse.ok) {
          const result = await studentResponse.json();
          console.log('Batch saved to student database:', result.message);
        } else {
          const errorData = await studentResponse.json();
          console.error('Failed to save batch to student database:', errorData.message);
          // Continue with local storage even if database save fails
        }
      } catch (studentErr) {
        console.error('Error saving to student database:', studentErr.message);
        // Continue with local storage even if database save fails
      }
      




      // Save complete batch data to local storage
      localStorage.setItem(`batch_${batchId}`, JSON.stringify(batchForStorage));
      
      setBatches(prev => [batchForStorage, ...prev]);
      
      resetForm();
      setShowBatchCreation(false);
    } catch (err) {
      console.error("Batch creation error:", err);
      alert("Error creating batch: " + (err.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

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

  const handleImageError = (e) => {
    e.target.src =
      "https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=300&h=200";
  };
  
  // Handle batch card click to show details
  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
    setShowBatchDetails(true);
    
    // Load batch content from local storage
    const storedContent = loadBatchContentFromStorage(batch.id);
    if (storedContent && storedContent.aiLearningPlan) {
      // Update batch with stored content
      setSelectedBatch({
        ...batch,
        aiLearningPlan: storedContent.aiLearningPlan
      });
    }
    
    // Load resources and flashcards from local storage
    loadResourcesFromStorage(batch.id);
    loadFlashcardsFromStorage(batch.id);
    
    // Load any saved notes for this batch
    const noteKey = `${batch.id}-${0}`; // Default to first chapter
    if (notes[noteKey]) {
      setCurrentNote(notes[noteKey]);
    } else {
      setCurrentNote("");
    }
  };
  
  // Generate detailed topic explanations
  const generateDetailedTopicExplanation = async (chapterIndex, topicIndex) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    const topic = chapter.topics[topicIndex];
    const topicKey = `${selectedBatch.id}-${chapterIndex}-${topicIndex}`;
    
    // Check if we already have detailed explanation
    if (detailedTopics[topicKey]) return;
    
    try {
      const prompt = `
Explain the following topic in great detail for a beginner to understand:
Topic: ${topic.title}
Basic explanation: ${topic.explanation}
Chapter context: ${chapter.title}

Provide a comprehensive explanation that includes:
1. Simple introduction to the concept
2. Detailed explanation with examples
3. Visual representations described in text (diagrams, flowcharts)
4. Step-by-step breakdown if applicable
5. Common misconceptions
6. Practical applications

If this is a programming topic, include code examples.
If this is an engineering topic, include relevant formulas or circuit diagrams described in text.
If this is a scientific topic, include relevant processes or experiments.

Return the explanation in JSON format like this:
{
  "detailedExplanation": "Full detailed explanation here...",
  "examples": ["Example 1", "Example 2"],
  "codeSnippets": ["Code snippet 1 (if applicable)", "Code snippet 2 (if applicable)"],
  "diagrams": ["Text description of diagram 1 (if applicable)", "Text description of diagram 2 (if applicable)"],
  "commonMisconceptions": ["Misconception 1", "Misconception 2"],
  "practicalApplications": ["Application 1", "Application 2"]
}
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate detailed explanation");
      
      try {
        const jsonStart = rawText.indexOf("{");
        const jsonEnd = rawText.lastIndexOf("}") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const detailedExplanation = JSON.parse(jsonText);
        
        setDetailedTopics(prev => ({
          ...prev,
          [topicKey]: detailedExplanation
        }));
      } catch (err) {
        console.error("Error parsing detailed explanation:", err);
      }
    } catch (err) {
      console.error("Error generating detailed explanation:", err);
    }
  };
  
  // Generate flashcards for a chapter
  const generateFlashcards = async (chapterIndex) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    const flashcardKey = `${selectedBatch.id}-${chapterIndex}`;
    
    // Check if we already have flashcards
    if (flashcards[flashcardKey]) return;
    
    try {
      const prompt = `
Create a set of 10 flashcards for studying the following chapter:
Chapter Title: ${chapter.title}
Topics: ${chapter.topics.map(t => t.title).join(", ")}
Content: ${chapter.topics.map(t => t.explanation).join(" ")}

Each flashcard should have a question on one side and the answer on the other side.
Make sure the flashcards cover key concepts, definitions, and applications from the chapter.

Return the flashcards in JSON format like this:
[
  {
    "question": "Question text here?",
    "answer": "Answer text here",
    "topic": "The specific topic this relates to"
  }
]
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate flashcards");
      
      try {
        const jsonStart = rawText.indexOf("[");
        const jsonEnd = rawText.lastIndexOf("]") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const flashcardsData = JSON.parse(jsonText);
        
        setFlashcards(prev => ({
          ...prev,
          [flashcardKey]: flashcardsData
        }));
      } catch (err) {
        console.error("Error parsing flashcards:", err);
      }
    } catch (err) {
      console.error("Error generating flashcards:", err);
    }
  };
  
  // Generate important questions for a chapter
  const generateImportantQuestions = async (chapterIndex) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    const questionsKey = `${selectedBatch.id}-${chapterIndex}`;
    
    // Check if we already have important questions
    if (importantQuestions[questionsKey]) return;
    
    try {
      const prompt = `
Create a set of 5 important questions with detailed answers for the following chapter:
Chapter Title: ${chapter.title}
Topics: ${chapter.topics.map(t => t.title).join(", ")}
Content: ${chapter.topics.map(t => t.explanation).join(" ")}

These should be conceptual questions that test deep understanding, not simple recall.
Include detailed explanations in the answers.

Return the questions in JSON format like this:
[
  {
    "question": "Question text here?",
    "answer": "Detailed answer with explanation",
    "topic": "The specific topic this relates to",
    "difficulty": "easy|medium|hard"
  }
]
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate important questions");
      
      try {
        const jsonStart = rawText.indexOf("[");
        const jsonEnd = rawText.lastIndexOf("]") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const questionsData = JSON.parse(jsonText);
        
        setImportantQuestions(prev => ({
          ...prev,
          [questionsKey]: questionsData
        }));
      } catch (err) {
        console.error("Error parsing important questions:", err);
      }
    } catch (err) {
      console.error("Error generating important questions:", err);
    }
  };
  
  // Generate resources for a chapter without requiring test completion
  const generateChapterResources = async (chapterIndex) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    const resourceKey = `${selectedBatch.id}-${chapterIndex}`;
    
    // Check if we already have resources
    if (resources[resourceKey]) return;
    
    try {
      const prompt = `
Provide learning resources for a student studying "${chapter.title}":
Topics: ${chapter.topics.map(t => t.title).join(", ")}

Return the resources in JSON format like this:
{
  "books": [
    { "title": "Book Title", "author": "Author Name", "description": "Brief description", "link": "amazon.com/book-url" }
  ],
  "videos": [
    { "title": "Video Title", "platform": "YouTube/Coursera/etc", "description": "Brief description", "link": "youtube.com/video-url" }
  ],
  "websites": [
    { "title": "Website Title", "url": "example.com", "description": "Brief description" }
  ],
  "articles": [
    { "title": "Article Title", "source": "Source Name", "description": "Brief description", "link": "website.com/article-url" }
  ]
}
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate resources");
      
      try {
        const jsonStart = rawText.indexOf("{");
        const jsonEnd = rawText.lastIndexOf("}") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const resourcesData = JSON.parse(jsonText);
        
        setResources(prev => ({
          ...prev,
          [resourceKey]: resourcesData
        }));
      } catch (err) {
        console.error("Error parsing resources:", err);
      }
    } catch (err) {
      console.error("Error generating resources:", err);
    }
  };
  
  // Generate test questions using AI
  const generateTestQuestions = async (chapterIndex) => {
    if (!selectedBatch) return;
    
    setTestLoading(true);
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    
    try {
      const prompt = `
Create 10 multiple-choice questions for a test on the following chapter:
Chapter Title: ${chapter.title}
Topics: ${chapter.topics.map(t => t.title).join(", ")}
Content: ${chapter.topics.map(t => t.explanation).join(" ")}

Make sure the questions cover all important concepts in the chapter and vary in difficulty.
Include detailed explanations for each answer that explain why the correct answer is right and why the other options are wrong.

Return the questions in JSON format like this:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Explanation of the correct answer",
    "difficulty": "easy|medium|hard",
    "conceptTested": "The main concept being tested"
  }
]
where correctAnswer is the index of the correct option (0-based).
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate test questions");
      
      try {
        const jsonStart = rawText.indexOf("[");
        const jsonEnd = rawText.lastIndexOf("]") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const questions = JSON.parse(jsonText);
        
        setTestQuestions(questions);
        setTestAnswers({});
      } catch (err) {
        console.error("Error parsing test questions:", err);
        // Fallback to default questions
        setTestQuestions([
          {
            question: `What is the main focus of ${chapter.title}?`,
            options: ["Understanding core concepts", "Advanced techniques", "Historical background", "Future trends"],
            correctAnswer: 0,
            explanation: "The chapter primarily focuses on understanding the core concepts."
          },
          {
            question: `Which of the following is covered in this chapter?`,
            options: [chapter.topics[0]?.title || "Topic 1", "Unrelated topic", "Advanced concept not covered", "None of the above"],
            correctAnswer: 0,
            explanation: `${chapter.topics[0]?.title || "Topic 1"} is explicitly covered in this chapter.`
          }
        ]);
      }
    } catch (err) {
      console.error("Error generating test questions:", err);
      // Set default questions
      setTestQuestions([
        {
          question: `What is the main focus of ${chapter.title}?`,
          options: ["Understanding core concepts", "Advanced techniques", "Historical background", "Future trends"],
          correctAnswer: 0,
          explanation: "The chapter primarily focuses on understanding the core concepts."
        },
        {
          question: `Which of the following is covered in this chapter?`,
          options: [chapter.topics[0]?.title || "Topic 1", "Unrelated topic", "Advanced concept not covered", "None of the above"],
          correctAnswer: 0,
          explanation: `${chapter.topics[0]?.title || "Topic 1"} is explicitly covered in this chapter.`
        }
      ]);
    } finally {
      setTestLoading(false);
    }
  };
  
  // Generate assignment prompt using AI
  const generateAssignmentPrompt = async (chapterIndex) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    
    try {
      const prompt = `
Create a practical assignment for students who have completed the following chapter:
Chapter Title: ${chapter.title}
Topics: ${chapter.topics.map(t => t.title).join(", ")}
Content: ${chapter.topics.map(t => t.explanation).join(" ")}

The assignment should:
1. Be practical and hands-on
2. Allow students to demonstrate their understanding of the chapter concepts
3. Include clear instructions and deliverables
4. Be challenging but achievable

Provide the assignment in a concise paragraph format.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const assignmentText = result.response?.text ? await result.response.text() : '';
      
      if (assignmentText.trim()) {
        setAssignmentPrompt(assignmentText);
      } else {
        // Fallback assignment
        setAssignmentPrompt(`Create a project that demonstrates your understanding of ${chapter.title}. Include all key concepts covered in the chapter and submit your work with a brief explanation of how you applied these concepts.`);
      }
    } catch (err) {
      console.error("Error generating assignment prompt:", err);
      // Fallback assignment
      setAssignmentPrompt(`Create a project that demonstrates your understanding of ${chapter.title}. Include all key concepts covered in the chapter and submit your work with a brief explanation of how you applied these concepts.`);
    }
  };
  
  // Calculate test score based on answers
  const calculateTestScore = () => {
    if (!testQuestions.length) return 0;
    
    let correctCount = 0;
    testQuestions.forEach((q, index) => {
      if (testAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / testQuestions.length) * 100);
  };
  
  // Function to check if a chapter is unlocked (available for study)
  const isChapterUnlocked = (batch, chapterIndex) => {
    if (chapterIndex === 0) return true; // First chapter is always unlocked
    if (!batch.completionStatus || !batch.completionStatus[chapterIndex - 1]) return true;
    
    // Check if previous chapter has a test
    const prevChapterStatus = batch.completionStatus[chapterIndex - 1];
    const isTestChapter = prevChapterStatus && prevChapterStatus.isTest;
    
    // If previous chapter is a test chapter, check if it's attempted
    if (isTestChapter) {
      return prevChapterStatus && prevChapterStatus.testAttempted;
    }
    
    // For regular chapters, no need to complete them to proceed
    return true;
  };
  


  // Function to mark a topic as completed
  const markTopicCompleted = (chapterIndex, topicIndex) => {
    if (!selectedBatch || !selectedBatch.completionStatus || !selectedBatch.completionStatus[chapterIndex]) return;
    
    const updatedBatches = batches.map(batch => {
      if (batch.id === selectedBatch.id) {
        const updatedCompletionStatus = [...(batch.completionStatus || [])];
        if (!updatedCompletionStatus[chapterIndex]) {
          updatedCompletionStatus[chapterIndex] = { completed: false, topics: [], testAttempted: false };
        }
        if (!updatedCompletionStatus[chapterIndex].topics[topicIndex]) {
          updatedCompletionStatus[chapterIndex].topics[topicIndex] = { completed: false };
        }
        updatedCompletionStatus[chapterIndex].topics[topicIndex].completed = true;
        
        // Check if all topics in the chapter are completed
        const allTopicsCompleted = updatedCompletionStatus[chapterIndex].topics.every(topic => topic && topic.completed);
        
        // Update chapter completion status
        if (allTopicsCompleted) {
          updatedCompletionStatus[chapterIndex].completed = true;
        }
        
        // Calculate overall progress
        const totalTopics = batch.aiLearningPlan?.chapters?.reduce(
          (sum, chapter) => sum + (chapter.topics?.length || 0), 0
        ) || 0;
        const completedTopics = updatedCompletionStatus.reduce(
          (sum, chapter) => sum + (chapter.topics?.filter(topic => topic && topic.completed).length || 0), 0
        );
        const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
        
        // Count completed chapters
        const completedChapters = updatedCompletionStatus.filter(chapter => chapter.completed).length;
        
        // Save complete batch data to local storage
        const updatedBatch = {
          ...batch,
          completionStatus: updatedCompletionStatus,
          progress,
          completedChapters
        };
        localStorage.setItem(`batch_${batch.id}`, JSON.stringify(updatedBatch));
        
        return {
          ...batch,
          completionStatus: updatedCompletionStatus,
          progress,
          completedChapters
        };
      }
      return batch;
    });
    
    setBatches(updatedBatches);
    setSelectedBatch(updatedBatches.find(batch => batch.id === selectedBatch.id));
  };
  
  // Function to handle test completion
  const handleTestCompletion = (chapterIndex, score) => {
    if (!selectedBatch) return;
    
    // Analyze test results
    const results = {
      score,
      totalQuestions: testQuestions.length,
      correctAnswers: 0,
      incorrectAnswers: [],
      conceptsToReview: [],
      difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
      answeredQuestions: []
    };
    
    testQuestions.forEach((question, index) => {
      const userAnswer = testAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        results.correctAnswers++;
      } else {
        results.incorrectAnswers.push({
          question: question.question,
          userAnswer: question.options[userAnswer],
          correctAnswer: question.options[question.correctAnswer],
          explanation: question.explanation,
          conceptTested: question.conceptTested || 'General concept'
        });
        
        // Add concept to review if not already included
        const concept = question.conceptTested || 'General concept';
        if (!results.conceptsToReview.includes(concept)) {
          results.conceptsToReview.push(concept);
        }
      }
      
      // Track difficulty breakdown
      if (question.difficulty) {
        results.difficultyBreakdown[question.difficulty]++;
      }
      
      results.answeredQuestions.push({
        question: question.question,
        userAnswer: userAnswer !== undefined ? question.options[userAnswer] : 'Not answered',
        correctAnswer: question.options[question.correctAnswer],
        isCorrect,
        explanation: question.explanation
      });
    });
    
    setTestResults(results);
    
    // Generate adaptive chapter if score is below 70%
    if (score < 70 && results.conceptsToReview.length > 0) {
      generateAdaptiveChapter(chapterIndex, results.conceptsToReview);
    }
    
    // Generate learning resources
    generateResources(chapterIndex, results.conceptsToReview);
    
    const updatedBatches = batches.map(batch => {
      if (batch.id === selectedBatch.id) {
        const updatedCompletionStatus = [...batch.completionStatus];
        updatedCompletionStatus[chapterIndex].testAttempted = true;
        updatedCompletionStatus[chapterIndex].testScore = score;
        updatedCompletionStatus[chapterIndex].testResults = results;
        
        // Save complete batch data to local storage
        const updatedBatch = {
          ...batch,
          completionStatus: updatedCompletionStatus
        };
        localStorage.setItem(`batch_${batch.id}`, JSON.stringify(updatedBatch));
        
        return {
          ...batch,
          completionStatus: updatedCompletionStatus
        };
      }
      return batch;
    });
    
    setBatches(updatedBatches);
    setSelectedBatch(updatedBatches.find(batch => batch.id === selectedBatch.id));
    setShowTestModal(false);
    setShowTestResultsModal(true);
  };
  
  // Function to handle assignment completion
  const handleAssignmentCompletion = (chapterIndex) => {
    if (!selectedBatch) return;
    
    const updatedBatches = batches.map(batch => {
      if (batch.id === selectedBatch.id) {
        const updatedCompletionStatus = [...batch.completionStatus];
        updatedCompletionStatus[chapterIndex].assignmentCompleted = true;
        
        return {
          ...batch,
          completionStatus: updatedCompletionStatus
        };
      }
      return batch;
    });
    
    setBatches(updatedBatches);
    setSelectedBatch(updatedBatches.find(batch => batch.id === selectedBatch.id));
    setShowAssignmentModal(false);
  };
  
  // Function to save notes
  const saveNote = (chapterIndex) => {
    if (!selectedBatch || !currentNote.trim()) return;
    
    const noteKey = `${selectedBatch.id}-${chapterIndex}`;
    const updatedNotes = {
      ...notes,
      [noteKey]: currentNote
    };
    
    setNotes(updatedNotes);
    setCurrentNote("");
    
    // Save notes to localStorage only (not database)
    localStorage.setItem('batchNotes', JSON.stringify(updatedNotes));
  };
  
  // Generate learning resources for concepts
  const generateResources = async (chapterIndex, conceptsToReview) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    
    try {
      const prompt = `
Provide learning resources for a student studying "${chapter.title}" who needs help with these concepts:
${conceptsToReview.length > 0 ? conceptsToReview.join(', ') : 'All concepts in the chapter'}

Return the resources in JSON format like this:
{
  "books": [
    { "title": "Book Title", "author": "Author Name", "description": "Brief description" }
  ],
  "videos": [
    { "title": "Video Title", "platform": "YouTube/Coursera/etc", "description": "Brief description" }
  ],
  "websites": [
    { "title": "Website Title", "url": "example.com", "description": "Brief description" }
  ],
  "articles": [
    { "title": "Article Title", "source": "Source Name", "description": "Brief description" }
  ]
}
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate resources");
      
      try {
        const jsonStart = rawText.indexOf("{");
        const jsonEnd = rawText.lastIndexOf("}") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const resourcesData = JSON.parse(jsonText);
        
        // Store resources for this chapter
        setResources(prev => ({
          ...prev,
          [`${selectedBatch.id}-${chapterIndex}`]: resourcesData
        }));
        
        // Show resources modal if there are concepts to review
        if (conceptsToReview.length > 0) {
          setShowResourcesModal(true);
        }
      } catch (err) {
        console.error("Error parsing resources:", err);
      }
    } catch (err) {
      console.error("Error generating resources:", err);
    }
  };
  
  // Function to check if a batch is eligible for certificate
  const isEligibleForCertificate = (batch) => {
    if (!batch || !batch.completionStatus) return false;
    
    // Check if all chapters are completed with tests and assignments
    // Skip adaptive chapters for certificate eligibility
    return batch.completionStatus
      .filter(chapter => !chapter.isAdaptive)
      .every(chapter => 
        chapter.completed && chapter.testAttempted && 
        (chapter.testScore >= 70) && // Passing score
        (chapter.assignmentCompleted || !chapter.hasOwnProperty('assignmentCompleted'))
      );
  };
  
  // Generate adaptive chapter based on test results
  const generateAdaptiveChapter = async (chapterIndex, conceptsToReview) => {
    if (!selectedBatch) return;
    
    const chapter = selectedBatch.aiLearningPlan.chapters[chapterIndex];
    
    try {
      const prompt = `
Create a focused learning chapter to help a student who is struggling with the following concepts:
${conceptsToReview.join(', ')}

These concepts are from the chapter "${chapter.title}" which covers:
${chapter.topics.map(t => t.title).join(', ')}

Create a remedial chapter that explains these concepts in a different way, with more examples and practice exercises.
Return the chapter in JSON format like this:
{
  "title": "Reinforcement: [Original Chapter Title]",
  "topics": [
    {
      "title": "Topic title focusing on a concept",
      "explanation": "Detailed explanation with examples",
      "examples": ["Example 1", "Example 2"],
      "practice": ["Practice question 1", "Practice question 2"]
    }
  ]
}
Only return valid JSON, no other text.
`;

      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response?.text ? await result.response.text() : '';
      
      if (!rawText.trim()) throw new Error("Failed to generate adaptive chapter");
      
      try {
        const jsonStart = rawText.indexOf("{");
        const jsonEnd = rawText.lastIndexOf("}") + 1;
        const jsonText = rawText.slice(jsonStart, jsonEnd);
        const adaptiveChapterData = JSON.parse(jsonText);
        
        // Add the adaptive chapter to the batch
        const updatedBatches = batches.map(batch => {
          if (batch.id === selectedBatch.id) {
            // Create a new chapter in the learning plan
            const updatedChapters = [...batch.aiLearningPlan.chapters];
            updatedChapters.push(adaptiveChapterData);
            
            // Add completion status for the new chapter
            const updatedCompletionStatus = [...batch.completionStatus];
            updatedCompletionStatus.push({
              completed: false,
              topics: adaptiveChapterData.topics.map(() => ({ completed: false })),
              testAttempted: false,
              isAdaptive: true,
              parentChapterIndex: chapterIndex
            });
            
            return {
              ...batch,
              aiLearningPlan: {
                ...batch.aiLearningPlan,
                chapters: updatedChapters
              },
              completionStatus: updatedCompletionStatus,
              totalChapters: updatedChapters.length
            };
          }
          return batch;
        });
        
        setBatches(updatedBatches);
        setSelectedBatch(updatedBatches.find(batch => batch.id === selectedBatch.id));
        setAdaptiveChapter(adaptiveChapterData);
      } catch (err) {
        console.error("Error parsing adaptive chapter:", err);
      }
    } catch (err) {
      console.error("Error generating adaptive chapter:", err);
    }
  };

  return (
    <div className="mybatch-root">
      {/* Batch Creation Modal */}
      {showBatchCreation && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content">
            <h2>Create a New Batch</h2>
            <form onSubmit={handleBatchFormSubmit} className="pw-batch-form">
              <div className="pw-form-group">
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Batch Title *" required />
              </div>
              <div className="pw-form-row">
                <input value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="Subject *" required />
                <select value={newDifficulty} onChange={e => setNewDifficulty(e.target.value)}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="pw-form-row">
                <input value={newLanguage} onChange={e => setNewLanguage(e.target.value)} placeholder="Language *" required />
                <input value={newDuration} onChange={e => setNewDuration(e.target.value)} type="number" min="1" placeholder="Duration (hrs)" />
              </div>
              <div className="pw-form-group">
                <input value={newInstructor} onChange={e => setNewInstructor(e.target.value)} placeholder="Instructor Name" />
              </div>
              <div className="pw-form-group">
                <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Description (optional)"></textarea>
              </div>
              <div className="pw-form-group">
                <textarea value={newSyllabusText} onChange={e => setNewSyllabusText(e.target.value)} placeholder="Enter syllabus topics"></textarea>
              </div>
              <div className="pw-form-group">
                <input value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="Image URL (optional)" />
              </div>
              <div className="pw-form-actions">
                <button type="button" onClick={() => setShowBatchCreation(false)} disabled={loading} className="pw-btn">Cancel</button>
                <button type="submit" disabled={loading} className="pw-btn pw-btn-primary">{loading ? "Creating..." : "Create Batch"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mybatch-header">
        <div>
          <h1 className="mybatch-title">Learning Batches</h1>
          <p className="mybatch-subtitle">Manage your learning journey</p>
        </div>
        <button onClick={() => setShowBatchCreation(true)} className="mybatch-btn mybatch-btn-create">
          <Zap size={18} /> Create AI Batch
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="mybatch-searchfilter">
        <div className="mybatch-searchbox">
          <Search className="mybatch-searchicon" size={18} />
          <input 
            className="mybatch-input" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Search batches..." 
          />
        </div>
        <div className="mybatch-filterbox">
          <select 
            className="mybatch-select" 
            value={filterType} 
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="all">All Batches</option>
            <option value="active">In Progress</option>
            <option value="completed">Completed</option>
            <option value="custom">Custom AI Batches</option>
          </select>
        </div>
      </div>
      
      {/* Batch List */}
      <div className="mybatch-list">
        {getCurrentBatches().length > 0 ? (
          getCurrentBatches().map((batch) => (
            <div key={batch.id} className="mybatch-card" onClick={() => handleBatchClick(batch)}>
              <div className="mybatch-card-badge">
                {batch.type === "custom" ? "AI Generated" : "Standard"}
              </div>
              <div className="mybatch-card-image-container">
                <img 
                  className="mybatch-card-image" 
                  src={batch.image} 
                  alt={batch.title} 
                  onError={handleImageError} 
                />
                {batch.progress === 100 && (
                  <div className="mybatch-card-completed">
                    <Trophy size={24} />
                    <span>Completed</span>
                  </div>
                )}
              </div>
              <div className="mybatch-card-content">
                <h3 className="mybatch-card-title">{batch.title}</h3>
                <div className="mybatch-card-instructor">
                  <GraduationCap size={16} />
                  <span>{batch.instructor}</span>
                </div>
                <p className="mybatch-card-subtitle">{batch.subject}</p>
                <div className="mybatch-card-meta">
                  <span><Users size={16} /> {batch.enrolledStudents} Students</span>
                  <span><BookOpen size={16} /> {batch.totalChapters} Chapters</span>
                  <span><Clock size={16} /> {batch.estimatedTime}</span>
                </div>
                <div className="mybatch-card-stats">
                  <div className="mybatch-card-stat">
                    <div className="mybatch-card-stat-label">Difficulty</div>
                    <div className="mybatch-card-stat-value">{batch.difficulty}</div>
                  </div>
                  <div className="mybatch-card-stat">
                    <div className="mybatch-card-stat-label">Language</div>
                    <div className="mybatch-card-stat-value">{batch.language}</div>
                  </div>
                  <div className="mybatch-card-stat">
                    <div className="mybatch-card-stat-label">Progress</div>
                    <div className="mybatch-card-stat-value">{batch.progress}%</div>
                  </div>
                </div>
                <div className="mybatch-progress-container">
                  <div className="mybatch-progress-bar" style={{ width: `${batch.progress}%` }}></div>
                </div>
                <div className="mybatch-card-footer">
                  <span className="mybatch-progress-text">{batch.completedChapters} of {batch.totalChapters} chapters completed</span>
                  <button className="mybatch-card-btn">Continue Learning</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mybatch-no-batches">No batches found. Create a new batch to get started!</div>
        )}
      </div>
      
      {/* Batch Details View */}
      {showBatchDetails && selectedBatch && (
        <div className="mybatch-details">
          <div className="mybatch-details-header">
            <button 
              onClick={() => { setShowBatchDetails(false); setSelectedBatch(null); }}
              className="mybatch-btn mybatch-btn-back"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h2>{selectedBatch.title}</h2>
            
            {isEligibleForCertificate(selectedBatch) && (
              <button 
                onClick={() => setShowCertificateModal(true)}
                className="mybatch-btn mybatch-btn-certificate"
              >
                <Award size={18} /> Get Certificate
              </button>
            )}
          </div>
          
          <div className="mybatch-details-meta">
            <span><strong>Subject:</strong> {selectedBatch.subject}</span>
            <span><strong>Instructor:</strong> {selectedBatch.instructor}</span>
            <span><strong>Difficulty:</strong> {selectedBatch.difficulty}</span>
            <span><strong>Language:</strong> {selectedBatch.language}</span>
            <span><strong>Chapters:</strong> {selectedBatch.totalChapters}</span>
            <span><strong>Estimated Time:</strong> {selectedBatch.estimatedTime}</span>
            <span><strong>Progress:</strong> {selectedBatch.progress}%</span>
          </div>
          
          <div className="mybatch-details-tabs">
            <button 
              className={`mybatch-tab ${activeDetailTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveDetailTab('content')}
            >
              <BookOpen size={16} /> Content
            </button>
            <button 
              className={`mybatch-tab ${activeDetailTab === 'syllabus' ? 'active' : ''}`}
              onClick={() => setActiveDetailTab('syllabus')}
            >
              <Layers size={16} /> Syllabus
            </button>
            <button 
              className={`mybatch-tab ${activeDetailTab === 'resources' ? 'active' : ''}`}
              onClick={() => {
                setActiveDetailTab('resources');
                if (selectedBatch && currentChapter !== null) {
                  generateChapterResources(currentChapter);
                }
              }}
            >
              <Book size={16} /> Resources
            </button>
            <button 
              className={`mybatch-tab ${activeDetailTab === 'flashcards' ? 'active' : ''}`}
              onClick={() => {
                setActiveDetailTab('flashcards');
                if (selectedBatch && currentChapter !== null) {
                  generateFlashcards(currentChapter);
                }
              }}
            >
              <BookMarked size={16} /> Flashcards
            </button>
            <button 
              className={`mybatch-tab ${activeDetailTab === 'questions' ? 'active' : ''}`}
              onClick={() => {
                setActiveDetailTab('questions');
                if (selectedBatch && currentChapter !== null) {
                  generateImportantQuestions(currentChapter);
                }
              }}
            >
              <HelpCircle size={16} /> Important Questions
            </button>
            <button 
              className={`mybatch-tab ${activeDetailTab === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveDetailTab('tests')}
            >
              <FileText size={16} /> Tests & Assignments
            </button>
          </div>
          
          <div className="mybatch-details-content">
            {/* Content Tab */}
            {activeDetailTab === 'content' && (
              <div className="mybatch-description-section">
                <h3>Description</h3>
                <p>{selectedBatch.aiLearningPlan?.description || "No description available."}</p>
                
                {currentChapter !== null && selectedBatch.aiLearningPlan?.chapters[currentChapter] && (
                  <div className="mybatch-current-chapter">
                    <h3>Current Chapter: {selectedBatch.aiLearningPlan.chapters[currentChapter].title}</h3>
                    <p>{selectedBatch.aiLearningPlan.chapters[currentChapter].topics.map(t => t.explanation).join(" ")}</p>
                    
                    <div className="mybatch-chapter-progress">
                      <h4>Chapter Progress</h4>
                      <div className="mybatch-progress-container">
                        <div 
                          className="mybatch-progress-bar" 
                          style={{ 
                            width: `${selectedBatch.completionStatus[currentChapter]?.topics.filter(t => t.completed).length / 
                              selectedBatch.completionStatus[currentChapter]?.topics.length * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mybatch-chapter-actions">
                      <button 
                        className="mybatch-btn mybatch-btn-resources"
                        onClick={() => {
                          generateChapterResources(currentChapter);
                          setActiveDetailTab('resources');
                        }}
                      >
                        <Book size={16} /> View Resources
                      </button>
                      <button 
                        className="mybatch-btn mybatch-btn-flashcards"
                        onClick={() => {
                          generateFlashcards(currentChapter);
                          setActiveDetailTab('flashcards');
                        }}
                      >
                        <BookMarked size={16} /> Study Flashcards
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Syllabus Tab */}
            {activeDetailTab === 'syllabus' && selectedBatch.aiLearningPlan?.chapters && selectedBatch.aiLearningPlan.chapters.length > 0 && (
              <div className="mybatch-syllabus-section">
                <h3>Syllabus</h3>
                {selectedBatch.aiLearningPlan.chapters.map((chapter, index) => {
                  const isUnlocked = isChapterUnlocked(selectedBatch, index);
                  const chapterStatus = selectedBatch.completionStatus?.[index] || { completed: false, topics: [], testAttempted: false };
                  const isCompleted = chapterStatus.completed;
                  const testAttempted = chapterStatus.testAttempted;
                  const assignmentCompleted = chapterStatus.assignmentCompleted;
                  const noteKey = `${selectedBatch.id}-${index}`;
                  const chapterNote = notes[noteKey] || "";
                  
                  return (
                    <div 
                      className={`mybatch-chapter-accordion ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`} 
                      key={index}
                    >
                      <button 
                        className="mybatch-chapter-header"
                        onClick={() => isUnlocked && setOpenChapterIndex(openChapterIndex === index ? null : index)}
                        disabled={!isUnlocked}
                      >
                        <div className="chapter-header-content">
                          <h4>
                            {isCompleted && <CheckCircle size={18} className="chapter-complete-icon" />}
                            {!isUnlocked && <Lock size={18} className="chapter-lock-icon" />}
                            Chapter {index + 1}: {chapter.title}
                          </h4>
                          {testAttempted && (
                            <span className="chapter-test-score">Test: {chapterStatus.testScore}%</span>
                          )}
                        </div>
                        {openChapterIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      
                      {openChapterIndex === index && isUnlocked && (
                        <div className="mybatch-chapter-content">
                          {/* Topics */}
                          {chapter.topics && chapter.topics.map((topic, topicIndex) => {
                            const isTopicCompleted = chapterStatus && 
                              chapterStatus.topics[topicIndex] && 
                              chapterStatus.topics[topicIndex].completed;
                            const topicKey = `${selectedBatch.id}-${index}-${topicIndex}`;
                            const hasDetailedExplanation = detailedTopics[topicKey];
                              
                            return (
                              <div className="mybatch-topic-item" key={topicIndex}>
                                <div className="mybatch-topic-header">
                                  <input 
                                    type="checkbox" 
                                    id={`topic-${index}-${topicIndex}`}
                                    checked={isTopicCompleted || false}
                                    onChange={() => markTopicCompleted(index, topicIndex)}
                                  />
                                  <h5>{topic.title}</h5>
                                </div>
                                <div className="mybatch-topic-details">
                                  {!hasDetailedExplanation ? (
                                    <div className="mybatch-topic-section">
                                      <p>{topic.explanation}</p>
                                      <button 
                                        className="mybatch-btn mybatch-btn-detail"
                                        onClick={() => generateDetailedTopicExplanation(index, topicIndex)}
                                      >
                                        Show Detailed Explanation
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="mybatch-topic-detailed">
                                      <div className="mybatch-topic-explanation">
                                        <h6>Detailed Explanation</h6>
                                        <p>{detailedTopics[topicKey].detailedExplanation}</p>
                                      </div>
                                      
                                      {detailedTopics[topicKey].examples?.length > 0 && (
                                        <div className="mybatch-topic-examples">
                                          <h6>Examples</h6>
                                          <ul>
                                            {detailedTopics[topicKey].examples.map((example, i) => (
                                              <li key={i}>{example}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      
                                      {detailedTopics[topicKey].codeSnippets?.length > 0 && (
                                        <div className="mybatch-topic-code">
                                          <h6>Code Examples</h6>
                                          {detailedTopics[topicKey].codeSnippets.map((code, i) => (
                                            <pre key={i} className="mybatch-code-snippet">
                                              <code>{code}</code>
                                            </pre>
                                          ))}
                                        </div>
                                      )}
                                      
                                      {detailedTopics[topicKey].diagrams?.length > 0 && (
                                        <div className="mybatch-topic-diagrams">
                                          <h6>Diagrams & Visualizations</h6>
                                          {detailedTopics[topicKey].diagrams.map((diagram, i) => (
                                            <div key={i} className="mybatch-diagram-description">
                                              <p>{diagram}</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      
                                      {detailedTopics[topicKey].commonMisconceptions?.length > 0 && (
                                        <div className="mybatch-topic-misconceptions">
                                          <h6>Common Misconceptions</h6>
                                          <ul>
                                            {detailedTopics[topicKey].commonMisconceptions.map((misconception, i) => (
                                              <li key={i}>{misconception}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      
                                      {detailedTopics[topicKey].practicalApplications?.length > 0 && (
                                        <div className="mybatch-topic-applications">
                                          <h6>Practical Applications</h6>
                                          <ul>
                                            {detailedTopics[topicKey].practicalApplications.map((application, i) => (
                                              <li key={i}>{application}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* Notes Section */}
                          <div className="mybatch-notes-section">
                            <h5><Edit3 size={16} /> Chapter Notes</h5>
                            <textarea 
                              className="mybatch-notes-textarea"
                              value={currentNote}
                              onChange={(e) => setCurrentNote(e.target.value)}
                              placeholder="Write your notes here..."
                            ></textarea>
                            <button 
                              className="mybatch-btn mybatch-btn-save-note"
                              onClick={() => saveNote(index)}
                            >
                              Save Note
                            </button>
                            
                            {chapterNote && (
                              <div className="mybatch-saved-note">
                                <h6>Saved Notes:</h6>
                                <p>{chapterNote}</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Chapter Actions */}
                          <div className="mybatch-chapter-actions">
                            <button 
                              className="mybatch-btn mybatch-btn-resources"
                              onClick={() => {
                                setCurrentChapter(index);
                                generateChapterResources(index);
                                setActiveDetailTab('resources');
                              }}
                            >
                              <Book size={16} /> View Resources
                            </button>
                            
                            <button 
                              className="mybatch-btn mybatch-btn-flashcards"
                              onClick={() => {
                                setCurrentChapter(index);
                                generateFlashcards(index);
                                setActiveDetailTab('flashcards');
                              }}
                            >
                              <BookMarked size={16} /> Study Flashcards
                            </button>
                            
                            <button 
                              className="mybatch-btn mybatch-btn-test"
                              onClick={() => {
                                setCurrentChapter(index);
                                generateTestQuestions(index);
                                setShowTestModal(true);
                              }}
                            >
                              {testAttempted ? 'Retake Test' : 'Take Chapter Test'}
                            </button>
                            
                            <button 
                              className="mybatch-btn mybatch-btn-download"
                              onClick={() => alert('Download functionality would be implemented here')}
                            >
                              <FileDown size={16} /> Download Notes
                            </button>
                            
                            {testAttempted && (
                              <button 
                                className="mybatch-btn mybatch-btn-assignment"
                                onClick={() => {
                                  setCurrentChapter(index);
                                  generateAssignmentPrompt(index);
                                  setShowAssignmentModal(true);
                                }}
                                disabled={assignmentCompleted}
                              >
                                {assignmentCompleted ? 'Assignment Completed' : 'Complete Assignment'}
                              </button>
                            )}
                            
                            {isCompleted && (
                              <button 
                                className="mybatch-btn mybatch-btn-certificate"
                                onClick={() => setShowCertificateModal(true)}
                              >
                                <Award size={16} /> Get Certificate
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Resources Tab */}
            {activeDetailTab === 'resources' && (
              <div className="mybatch-resources-section">
                <h3>Learning Resources</h3>
                {currentChapter !== null ? (
                  resources[`${selectedBatch.id}-${currentChapter}`] ? (
                    <div className="mybatch-resources-lists">
                      {resources[`${selectedBatch.id}-${currentChapter}`].books?.length > 0 && (
                        <div className="mybatch-resource-section">
                          <h4><Book size={16} /> Recommended Books</h4>
                          <ul className="mybatch-resources-list">
                            {resources[`${selectedBatch.id}-${currentChapter}`].books.map((book, index) => (
                              <li key={index} className="mybatch-resource-item">
                                <div className="mybatch-resource-title">{book.title}</div>
                                <div className="mybatch-resource-author">by {book.author}</div>
                                <div className="mybatch-resource-description">{book.description}</div>
                                {book.link && (
                                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="mybatch-resource-link">
                                    <ExternalLink size={14} /> View Book
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {resources[`${selectedBatch.id}-${currentChapter}`].videos?.length > 0 && (
                        <div className="mybatch-resource-section">
                          <h4><Youtube size={16} /> Video Tutorials</h4>
                          <ul className="mybatch-resources-list">
                            {resources[`${selectedBatch.id}-${currentChapter}`].videos.map((video, index) => (
                              <li key={index} className="mybatch-resource-item">
                                <div className="mybatch-resource-title">{video.title}</div>
                                <div className="mybatch-resource-platform">{video.platform}</div>
                                <div className="mybatch-resource-description">{video.description}</div>
                                {video.link && (
                                  <a href={video.link} target="_blank" rel="noopener noreferrer" className="mybatch-resource-link">
                                    <ExternalLink size={14} /> Watch Video
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {resources[`${selectedBatch.id}-${currentChapter}`].websites?.length > 0 && (
                        <div className="mybatch-resource-section">
                          <h4><ExternalLink size={16} /> Useful Websites</h4>
                          <ul className="mybatch-resources-list">
                            {resources[`${selectedBatch.id}-${currentChapter}`].websites.map((website, index) => (
                              <li key={index} className="mybatch-resource-item">
                                <div className="mybatch-resource-title">{website.title}</div>
                                <div className="mybatch-resource-url">{website.url}</div>
                                <div className="mybatch-resource-description">{website.description}</div>
                                <a href={website.url} target="_blank" rel="noopener noreferrer" className="mybatch-resource-link">
                                  <ExternalLink size={14} /> Visit Website
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {resources[`${selectedBatch.id}-${currentChapter}`].articles?.length > 0 && (
                        <div className="mybatch-resource-section">
                          <h4><FileText size={16} /> Articles & Papers</h4>
                          <ul className="mybatch-resources-list">
                            {resources[`${selectedBatch.id}-${currentChapter}`].articles.map((article, index) => (
                              <li key={index} className="mybatch-resource-item">
                                <div className="mybatch-resource-title">{article.title}</div>
                                <div className="mybatch-resource-source">{article.source}</div>
                                <div className="mybatch-resource-description">{article.description}</div>
                                {article.link && (
                                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="mybatch-resource-link">
                                    <ExternalLink size={14} /> Read Article
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mybatch-resources-loading">
                      <div className="mybatch-spinner"></div>
                      <p>Generating resources...</p>
                    </div>
                  )
                ) : (
                  <p>Select a chapter to view resources</p>
                )}
              </div>
            )}
            
            {/* Flashcards Tab */}
            {activeDetailTab === 'flashcards' && (
              <div className="mybatch-flashcards-section">
                <h3>Study Flashcards</h3>
                {currentChapter !== null ? (
                  flashcards[`${selectedBatch.id}-${currentChapter}`] ? (
                    <div className="mybatch-flashcards-container">
                      {flashcards[`${selectedBatch.id}-${currentChapter}`].map((card, index) => (
                        <div className="mybatch-flashcard" key={index}>
                          <div className="mybatch-flashcard-inner">
                            <div className="mybatch-flashcard-front">
                              <h4>{card.question}</h4>
                              <span className="mybatch-flashcard-topic">{card.topic}</span>
                            </div>
                            <div className="mybatch-flashcard-back">
                              <p>{card.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mybatch-flashcards-actions">
                        <button className="mybatch-btn mybatch-btn-download" onClick={() => alert('Download functionality would be implemented here')}>
                          <FileDown size={16} /> Download Flashcards
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mybatch-flashcards-loading">
                      <div className="mybatch-spinner"></div>
                      <p>Generating flashcards...</p>
                    </div>
                  )
                ) : (
                  <p>Select a chapter to view flashcards</p>
                )}
              </div>
            )}
            
            {/* Important Questions Tab */}
            {activeDetailTab === 'questions' && (
              <div className="mybatch-questions-section">
                <h3>Important Questions</h3>
                {currentChapter !== null ? (
                  importantQuestions[`${selectedBatch.id}-${currentChapter}`] ? (
                    <div className="mybatch-questions-container">
                      {importantQuestions[`${selectedBatch.id}-${currentChapter}`].map((q, index) => (
                        <div className="mybatch-question-item" key={index}>
                          <div className="mybatch-question-header">
                            <h4>{index + 1}. {q.question}</h4>
                            <span className={`mybatch-question-difficulty mybatch-difficulty-${q.difficulty}`}>
                              {q.difficulty}
                            </span>
                          </div>
                          <div className="mybatch-question-topic">{q.topic}</div>
                          <div className="mybatch-question-answer">
                            <h5>Answer:</h5>
                            <p>{q.answer}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mybatch-questions-actions">
                        <button className="mybatch-btn mybatch-btn-download" onClick={() => alert('Download functionality would be implemented here')}>
                          <FileDown size={16} /> Download Questions
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mybatch-questions-loading">
                      <div className="mybatch-spinner"></div>
                      <p>Generating important questions...</p>
                    </div>
                  )
                ) : (
                  <p>Select a chapter to view important questions</p>
                )}
              </div>
            )}
            
            {/* Tests & Assignments Tab */}
            {activeDetailTab === 'tests' && (
              <div className="mybatch-tests-section">
                <h3>Tests & Assignments</h3>
                {selectedBatch.completionStatus.map((status, index) => {
                  if (!status.isTest && !status.testAttempted) return null;
                  
                  const chapter = selectedBatch.aiLearningPlan.chapters[index];
                  return (
                    <div className="mybatch-test-item" key={index}>
                      <div className="mybatch-test-header">
                        <h4>Chapter {index + 1}: {chapter.title}</h4>
                        {status.testAttempted && (
                          <span className={`mybatch-test-score ${status.testScore >= 70 ? 'passed' : 'failed'}`}>
                            Score: {status.testScore}%
                          </span>
                        )}
                      </div>
                      
                      <div className="mybatch-test-actions">
                        <button 
                          className="mybatch-btn mybatch-btn-test"
                          onClick={() => {
                            setCurrentChapter(index);
                            generateTestQuestions(index);
                            setShowTestModal(true);
                          }}
                        >
                          {status.testAttempted ? 'Retake Test' : 'Take Test'}
                        </button>
                        
                        {status.testAttempted && (
                          <button 
                            className="mybatch-btn mybatch-btn-results"
                            onClick={() => {
                              setCurrentChapter(index);
                              setTestResults(status.testResults);
                              setShowTestResultsModal(true);
                            }}
                          >
                            View Results
                          </button>
                        )}
                        
                        {status.testAttempted && (
                          <button 
                            className="mybatch-btn mybatch-btn-assignment"
                            onClick={() => {
                              setCurrentChapter(index);
                              generateAssignmentPrompt(index);
                              setShowAssignmentModal(true);
                            }}
                            disabled={status.assignmentCompleted}
                          >
                            {status.assignmentCompleted ? 'Assignment Completed' : 'Complete Assignment'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {selectedBatch.completionStatus.every(status => !status.isTest && !status.testAttempted) && (
                  <p>No tests have been attempted yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Test Modal */}
      {showTestModal && selectedBatch && currentChapter !== null && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content pw-test-modal">
            <h2>Chapter {currentChapter + 1} Test</h2>
            <div className="pw-test-content">
              {testLoading ? (
                <div className="pw-test-loading">
                  <div className="pw-spinner"></div>
                  <p>Generating test questions...</p>
                </div>
              ) : (
                <>
                  <p>Answer the following questions to complete the chapter test.</p>
                  
                  {testQuestions.map((question, qIndex) => (
                    <div className="pw-test-question" key={qIndex}>
                      <p>{qIndex + 1}. {question.question}</p>
                      <div className="pw-options-grid">
                        {question.options.map((option, oIndex) => (
                          <label 
                            className={`pw-option-label ${testAnswers[qIndex] === oIndex ? 'selected' : ''}`}
                            key={oIndex}
                          >
                            <input 
                              type="radio" 
                              name={`q${qIndex}`} 
                              value={oIndex} 
                              checked={testAnswers[qIndex] === oIndex}
                              onChange={() => setTestAnswers({...testAnswers, [qIndex]: oIndex})}
                            /> 
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pw-form-actions">
                    <button 
                      className="pw-btn" 
                      onClick={() => setShowTestModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="pw-btn pw-btn-primary" 
                      onClick={() => handleTestCompletion(currentChapter, calculateTestScore())}
                      disabled={Object.keys(testAnswers).length < testQuestions.length}
                    >
                      Submit Test
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Assignment Modal */}
      {showAssignmentModal && selectedBatch && currentChapter !== null && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content">
            <h2>Chapter {currentChapter + 1} Assignment</h2>
            <div className="pw-assignment-content">
              <p>Complete the following assignment to demonstrate your understanding of the chapter.</p>
              
              <div className="pw-assignment-task">
                <h4>Assignment Task:</h4>
                <div className="pw-assignment-description">
                  {assignmentPrompt ? (
                    <p>{assignmentPrompt}</p>
                  ) : (
                    <div className="pw-assignment-loading">
                      <div className="pw-spinner"></div>
                      <p>Generating assignment...</p>
                    </div>
                  )}
                </div>
                
                <textarea 
                  className="pw-assignment-textarea"
                  placeholder="Describe your approach and solution here..."
                ></textarea>
                
                <div className="pw-form-group">
                  <label>Upload File or Provide Link:</label>
                  <input type="text" placeholder="https://github.com/yourusername/project" />
                </div>
              </div>
              
              <div className="pw-form-actions">
                <button 
                  className="pw-btn" 
                  onClick={() => setShowAssignmentModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="pw-btn pw-btn-primary" 
                  onClick={() => handleAssignmentCompletion(currentChapter)}
                  disabled={!assignmentPrompt}
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Test Results Modal */}
      {showTestResultsModal && testResults && selectedBatch && currentChapter !== null && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content pw-test-results-modal">
            <h2>Test Results</h2>
            <div className="pw-test-results-content">
              <div className="pw-test-results-summary">
                <div className="pw-test-score-display">
                  <div className="pw-test-score-circle">
                    <span className="pw-test-score-value">{testResults.score}%</span>
                  </div>
                  <p className="pw-test-score-label">
                    {testResults.score >= 70 ? 'Passed!' : 'Needs Improvement'}
                  </p>
                </div>
                
                <div className="pw-test-stats">
                  <div className="pw-test-stat">
                    <span className="pw-test-stat-label">Questions</span>
                    <span className="pw-test-stat-value">{testResults.totalQuestions}</span>
                  </div>
                  <div className="pw-test-stat">
                    <span className="pw-test-stat-label">Correct</span>
                    <span className="pw-test-stat-value">{testResults.correctAnswers}</span>
                  </div>
                  <div className="pw-test-stat">
                    <span className="pw-test-stat-label">Incorrect</span>
                    <span className="pw-test-stat-value">{testResults.incorrectAnswers.length}</span>
                  </div>
                </div>
                
                <div className="pw-test-chart">
                  <h4><BarChart2 size={16} /> Difficulty Breakdown</h4>
                  <div className="pw-difficulty-bars">
                    <div className="pw-difficulty-bar">
                      <div className="pw-difficulty-label">Easy</div>
                      <div className="pw-difficulty-track">
                        <div 
                          className="pw-difficulty-fill pw-easy" 
                          style={{ width: `${(testResults.difficultyBreakdown.easy / testResults.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                      <div className="pw-difficulty-value">{testResults.difficultyBreakdown.easy}</div>
                    </div>
                    <div className="pw-difficulty-bar">
                      <div className="pw-difficulty-label">Medium</div>
                      <div className="pw-difficulty-track">
                        <div 
                          className="pw-difficulty-fill pw-medium" 
                          style={{ width: `${(testResults.difficultyBreakdown.medium / testResults.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                      <div className="pw-difficulty-value">{testResults.difficultyBreakdown.medium}</div>
                    </div>
                    <div className="pw-difficulty-bar">
                      <div className="pw-difficulty-label">Hard</div>
                      <div className="pw-difficulty-track">
                        <div 
                          className="pw-difficulty-fill pw-hard" 
                          style={{ width: `${(testResults.difficultyBreakdown.hard / testResults.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                      <div className="pw-difficulty-value">{testResults.difficultyBreakdown.hard}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {testResults.incorrectAnswers.length > 0 && (
                <div className="pw-incorrect-answers">
                  <h4><AlertTriangle size={16} /> Concepts to Review</h4>
                  <ul className="pw-concepts-list">
                    {testResults.conceptsToReview.map((concept, index) => (
                      <li key={index}>{concept}</li>
                    ))}
                  </ul>
                  
                  <h4>Incorrect Answers</h4>
                  {testResults.incorrectAnswers.map((item, index) => (
                    <div className="pw-incorrect-item" key={index}>
                      <p className="pw-incorrect-question">{item.question}</p>
                      <div className="pw-incorrect-details">
                        <p><strong>Your answer:</strong> <span className="pw-wrong-answer">{item.userAnswer}</span></p>
                        <p><strong>Correct answer:</strong> <span className="pw-right-answer">{item.correctAnswer}</span></p>
                        <p><strong>Explanation:</strong> {item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="pw-form-actions">
                <button 
                  className="pw-btn" 
                  onClick={() => setShowTestResultsModal(false)}
                >
                  Close
                </button>
                <button 
                  className="pw-btn pw-btn-primary" 
                  onClick={() => {
                    setShowTestResultsModal(false);
                    setShowResourcesModal(true);
                  }}
                >
                  View Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources Modal */}
      {showResourcesModal && selectedBatch && currentChapter !== null && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content pw-resources-modal">
            <h2>Learning Resources</h2>
            <div className="pw-resources-content">
              <p>Here are some resources to help you master the concepts in this chapter:</p>
              
              {resources[`${selectedBatch.id}-${currentChapter}`] ? (
                <div className="pw-resources-lists">
                  {resources[`${selectedBatch.id}-${currentChapter}`].books?.length > 0 && (
                    <div className="pw-resource-section">
                      <h4><Book size={16} /> Recommended Books</h4>
                      <ul className="pw-resources-list">
                        {resources[`${selectedBatch.id}-${currentChapter}`].books.map((book, index) => (
                          <li key={index} className="pw-resource-item">
                            <div className="pw-resource-title">{book.title}</div>
                            <div className="pw-resource-author">by {book.author}</div>
                            <div className="pw-resource-description">{book.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {resources[`${selectedBatch.id}-${currentChapter}`].videos?.length > 0 && (
                    <div className="pw-resource-section">
                      <h4><Youtube size={16} /> Video Tutorials</h4>
                      <ul className="pw-resources-list">
                        {resources[`${selectedBatch.id}-${currentChapter}`].videos.map((video, index) => (
                          <li key={index} className="pw-resource-item">
                            <div className="pw-resource-title">{video.title}</div>
                            <div className="pw-resource-platform">{video.platform}</div>
                            <div className="pw-resource-description">{video.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {resources[`${selectedBatch.id}-${currentChapter}`].websites?.length > 0 && (
                    <div className="pw-resource-section">
                      <h4><ExternalLink size={16} /> Useful Websites</h4>
                      <ul className="pw-resources-list">
                        {resources[`${selectedBatch.id}-${currentChapter}`].websites.map((website, index) => (
                          <li key={index} className="pw-resource-item">
                            <div className="pw-resource-title">{website.title}</div>
                            <div className="pw-resource-url">{website.url}</div>
                            <div className="pw-resource-description">{website.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {resources[`${selectedBatch.id}-${currentChapter}`].articles?.length > 0 && (
                    <div className="pw-resource-section">
                      <h4><FileText size={16} /> Articles & Papers</h4>
                      <ul className="pw-resources-list">
                        {resources[`${selectedBatch.id}-${currentChapter}`].articles.map((article, index) => (
                          <li key={index} className="pw-resource-item">
                            <div className="pw-resource-title">{article.title}</div>
                            <div className="pw-resource-source">{article.source}</div>
                            <div className="pw-resource-description">{article.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pw-resources-loading">
                  <div className="pw-spinner"></div>
                  <p>Generating resources...</p>
                </div>
              )}
              
              <div className="pw-form-actions">
                <button 
                  className="pw-btn" 
                  onClick={() => setShowResourcesModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Certificate Modal */}
      {showCertificateModal && selectedBatch && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content pw-certificate-modal">
            <h2>Course Certificate</h2>
            <div className="pw-certificate">
              <div className="pw-certificate-border"></div>
              <div className="pw-certificate-header">
                <div className="pw-certificate-logo">
                  <Sparkles size={20} />
                  <span>IntelliLearn</span>
                </div>
                <Award size={60} className="pw-certificate-icon" />
                <h3>Certificate of Completion</h3>
              </div>
              
              <div className="pw-certificate-body">
                <p>This is to certify that</p>
                <h4>Student Name</h4>
                <p>has successfully completed the course</p>
                <h3>{selectedBatch.title}</h3>
                <div className="pw-certificate-score">
                  <p>with a final score of</p>
                  <div className="pw-certificate-score-value">
                    {Math.round(selectedBatch.completionStatus.reduce((sum, chapter) => 
                      sum + (chapter.testScore || 0), 0) / selectedBatch.completionStatus.length)}%
                  </div>
                </div>
                <p className="pw-certificate-date">Date: {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="pw-certificate-footer">
                <div className="pw-certificate-signature">
                  <div className="pw-certificate-signature-line"></div>
                  <p>Instructor: {selectedBatch.instructor}</p>
                </div>
                <div className="pw-certificate-seal">
                  <div className="pw-certificate-seal-inner">
                    <Star size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pw-form-actions">
              <button 
                className="pw-btn" 
                onClick={() => setShowCertificateModal(false)}
              >
                Close
              </button>
              <button className="pw-btn pw-btn-primary">
                <Download size={18} /> Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBatch;
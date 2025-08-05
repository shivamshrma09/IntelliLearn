const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const BatchProgressSchema = new mongoose.Schema({
  id: String,
  title: String,
  subject: String,
  progress: { type: Number, default: 0 },
  totalChapters: Number,
  completedChapters: { type: Number, default: 0 },
  completionStatus: Array,
  testResults: [{
    chapterId: String,
    score: Number,
    totalQuestions: Number,
    answers: Array,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now }
});


const CertificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  batchId: { type: String, required: true },
  batchName: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  percentage: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now },
  certificateUrl: { type: String },
  certificateId: { type: String, required: true, unique: true }
});




const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true },
  explanation: { type: String },
  topic: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  category: { type: String }
});

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String },
  duration: { type: Number }, // minutes
  totalQuestions: { type: Number },
  difficulty: { type: String },
  description: { type: String },
  questions: [QuestionSchema],
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});




const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  type: { type: String },
  deadline: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  tags: [{ type: String }],
  url: { type: String },
  postedDate: { type: String },
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});





const AnswerSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  selectedOption: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  timeTaken: { type: Number } // seconds
});

const TestAttemptSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number }, // total time in seconds
  answers: [AnswerSchema],
  completed: { type: Boolean, default: false },
  analysis: {
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    accuracy: { type: Number },
    speed: { type: Number },
    recommendations: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now }
});


const libraryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: String,
  tags: [String],
  readingTime: String,
  rating: Number,
  views: Number,

  type: { type: String, required: true },     // जरूरी है
  subject: { type: String, required: true },  // जरूरी है
  content: { type: String, required: true },  // जरूरी है
  course: { type: String, required: true },   // जरूरी है

  createdAt: { type: Date, default: Date.now }
});


const FlashcardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  batchId: { type: String, required: true },
  topicId: { type: String },
  subject: { type: String, default: 'Study Material' },
  batchName: { type: String, default: 'General' },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});


const StudySessionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  totalTime: { type: Number, default: 0 }, // in milliseconds
  sessions: [{
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    duration: { type: Number, required: true } // in milliseconds
  }],
  pointsEarned: { type: Number, default: 0 }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  course: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  numberOfBatchesCompleted: { type: Number, default: 0 },
  batches: [BatchProgressSchema],
  certificates: [CertificateSchema],
  tests: [TestSchema],
  createdAt: { type: Date, default: Date.now },
  opportunities: [OpportunitySchema],
  testAttempts: [TestAttemptSchema],
  enrolledInBatch: { type: String },
  enrolledInTest: { type: String },
  enrolledInOpportunity: { type: String },
  enrolledInCourse: { type: String },
  libraryItems: [libraryItemSchema],
  studySessions: [StudySessionSchema],
  lastActiveDate: { type: Date, default: Date.now }
});

// Static method to hash password
studentSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

studentSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);

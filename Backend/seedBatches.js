const mongoose = require('mongoose');
const Batch = require('./models/batch.models');
require('dotenv').config();

const sampleBatches = [
  {
    id: 'batch-1',
    title: 'JavaScript Fundamentals',
    subject: 'Programming',
    difficulty: 'Beginner',
    language: 'English',
    estimatedTime: '4 weeks',
    instructor: 'AI Tutor',
    image: '/images/javascript.jpg',
    progress: 65,
    totalChapters: 10,
    completedChapters: 6,
    enrolledStudents: 1250,
    type: 'course',
    chapters: [
      { title: 'Introduction to JavaScript', completed: true },
      { title: 'Variables and Data Types', completed: true },
      { title: 'Functions and Scope', completed: false }
    ]
  },
  {
    id: 'batch-2',
    title: 'React Development',
    subject: 'Frontend',
    difficulty: 'Intermediate',
    language: 'English',
    estimatedTime: '6 weeks',
    instructor: 'AI Tutor',
    image: '/images/react.jpg',
    progress: 30,
    totalChapters: 12,
    completedChapters: 3,
    enrolledStudents: 890,
    type: 'course',
    chapters: [
      { title: 'React Basics', completed: true },
      { title: 'Components and Props', completed: false }
    ]
  }
];

async function seedBatches() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing batches
    await Batch.deleteMany({});
    console.log('Cleared existing batches');
    
    // Insert sample batches
    await Batch.insertMany(sampleBatches);
    console.log('Sample batches inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding batches:', error);
    process.exit(1);
  }
}

seedBatches();
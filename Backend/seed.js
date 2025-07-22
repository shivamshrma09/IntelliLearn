require('dotenv').config();
const mongoose = require('mongoose');
const Flashcard = require('./models/flashcard.models');
const connectToDatabase = require('./db/db');

// Connect to database
connectToDatabase();

// Sample flashcards
const sampleFlashcards = [
  {
    title: 'Newton\'s First Law',
    content: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.',
    batchId: 'physics101',
    topicId: 'mechanics',
    subject: 'Physics',
    batchName: 'Physics 101',
    tags: ['Physics', 'Mechanics', 'Newton\'s Laws'],
    likes: 15,
    likedBy: []
  },
  {
    title: 'Ohm\'s Law',
    content: 'The current through a conductor between two points is directly proportional to the voltage across the two points. I = V/R',
    batchId: 'physics101',
    topicId: 'electricity',
    subject: 'Physics',
    batchName: 'Physics 101',
    tags: ['Physics', 'Electricity', 'Circuits'],
    likes: 12,
    likedBy: []
  },
  {
    title: 'Periodic Table',
    content: 'The periodic table is a tabular arrangement of chemical elements, organized by atomic number, electron configuration, and recurring chemical properties.',
    batchId: 'chemistry101',
    topicId: 'basics',
    subject: 'Chemistry',
    batchName: 'Chemistry 101',
    tags: ['Chemistry', 'Periodic Table', 'Elements'],
    likes: 8,
    likedBy: []
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing flashcards
    await Flashcard.deleteMany({});
    console.log('Cleared existing flashcards');
    
    // Insert sample flashcards
    const createdFlashcards = await Flashcard.insertMany(sampleFlashcards);
    console.log(`Created ${createdFlashcards.length} flashcards`);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
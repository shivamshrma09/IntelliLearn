require('dotenv').config();
const axios = require('axios');

// Base URL for API
const API_URL = 'http://localhost:3000';
let token = '';

// Test user credentials
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  cource: 'Physics'
};

// Register a test user
const registerUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/students/register`, testUser);
    console.log('User registered:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    // If user already exists, try to login
    return loginUser();
  }
};

// Login with test user
const loginUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/students/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('User logged in:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    return null;
  }
};

// Test flashcard endpoints
const testFlashcards = async () => {
  try {
    // Create a flashcard
    const flashcard = {
      title: 'Test Flashcard',
      content: 'This is a test flashcard content',
      batchId: 'test-batch',
      topicId: 'test-topic',
      subject: 'Test Subject',
      batchName: 'Test Batch'
    };
    
    const createResponse = await axios.post(`${API_URL}/api/flashcards`, flashcard, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Flashcard created:', createResponse.data);
    
    const flashcardId = createResponse.data.flashcard._id;
    
    // Get flashcard by ID
    const getResponse = await axios.get(`${API_URL}/api/flashcards/${flashcardId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Flashcard retrieved:', getResponse.data);
    
    // Like flashcard
    const likeResponse = await axios.post(`${API_URL}/api/flashcards/like/${flashcardId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Flashcard liked:', likeResponse.data);
    
    return true;
  } catch (error) {
    console.error('Error testing flashcards:', error.response?.data || error.message);
    return false;
  }
};

// Test library endpoints
const testLibrary = async () => {
  try {
    // Get library items
    const getResponse = await axios.get(`${API_URL}/api/library/items`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Library items retrieved:', getResponse.data);
    
    if (getResponse.data.items.length > 0) {
      const itemId = getResponse.data.items[0].id;
      
      // Like library item
      const likeResponse = await axios.post(`${API_URL}/api/library/items/${itemId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Library item liked:', likeResponse.data);
    }
    
    return true;
  } catch (error) {
    console.error('Error testing library:', error.response?.data || error.message);
    return false;
  }
};

// Main test function
const runTests = async () => {
  try {
    // Get token
    token = await registerUser();
    if (!token) {
      console.error('Failed to get authentication token');
      return;
    }
    
    // Run tests
    console.log('\n--- Testing Flashcard Endpoints ---');
    await testFlashcards();
    
    console.log('\n--- Testing Library Endpoints ---');
    await testLibrary();
    
    console.log('\n--- All tests completed ---');
  } catch (error) {
    console.error('Error running tests:', error);
  }
};

// Run the tests
runTests();
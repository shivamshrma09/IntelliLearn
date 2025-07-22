const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import models
const Test = require('./models/Test.models.js');
const TestAttempt = require('./models/testAttempt.models.js');
const Student = require('./models/student.models.js');
const LibraryItem = require('./models/libraryItem.models.js');
const Opportunity = require('./models/opportunity.models.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/intellilearn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Check models
  console.log('Test model:', !!Test);
  console.log('TestAttempt model:', !!TestAttempt);
  console.log('Student model:', !!Student);
  console.log('LibraryItem model:', !!LibraryItem);
  console.log('Opportunity model:', !!Opportunity);
  
  // Check collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  
  // Close connection
  mongoose.connection.close();
  console.log('Connection closed');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});
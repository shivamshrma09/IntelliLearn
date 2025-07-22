# IntelliLearn Frontend

This is the frontend for the IntelliLearn platform, an AI-powered learning platform with flashcards, certificates, and interactive learning materials.

## Recent Changes

- Removed separate Library, Tests, and Opportunities components
- Integrated these features directly into the MyBatch component
- Added direct Gemini AI integration in the components for generating:
  - Flashcards
  - Test questions
  - Learning resources
- Updated the App and Sidebar components to reflect these changes

## How It Works Now

- All AI-generated content is now created directly in the components using Gemini
- No separate backend routes are needed for library, tests, or opportunities
- The MyBatch component now handles all these features based on the initialTab prop

## Features

- **User Authentication**: Register and login system with course selection
- **AI-Generated Content**: Dynamic generation of learning materials using Gemini
- **Flashcards**: Create and interact with AI-generated flashcards
- **Tests**: Take AI-generated tests with real-time analysis
- **Resources**: Access AI-generated learning resources
- **Certificates**: Generate certificates upon batch completion

## Tech Stack

- **Frontend**: React.js with Vite
- **AI Integration**: Google Gemini API for content generation
- **Styling**: CSS with custom components
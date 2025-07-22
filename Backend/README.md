# IntelliLearn Backend

This is the backend for the IntelliLearn platform, an AI-powered learning platform with flashcards, certificates, and interactive learning materials.

## Recent Changes

- Removed library, tests, and opportunities routes from the application
- Added Gemini AI integration for generating flashcard content
- Created a utility file for Gemini AI integration that can be reused across the application
- Updated the flashcard controller to use Gemini for generating content

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/intellilearn
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /students/register`: Register a new user
- `POST /students/login`: Login a user

### Batches
- `POST /api/batches`: Create a new batch
- `GET /api/batches`: Get all batches for a user
- `GET /api/batches/:batchId`: Get a specific batch
- `PUT /api/batches/:batchId/progress`: Update batch progress

### Flashcards
- `POST /api/flashcards`: Create a new flashcard (with Gemini-generated content if not provided)
- `GET /api/flashcards/batch/:batchId`: Get flashcards for a batch (with Gemini-generated fallbacks)
- `POST /api/flashcards/like/:flashcardId`: Like/unlike a flashcard
- `GET /api/flashcards/:flashcardId`: Get a specific flashcard

### Certificates
- `POST /api/certificates`: Generate a certificate
- `GET /api/certificates`: Get all certificates for a user
- `GET /api/certificates/:certificateId`: Get a specific certificate
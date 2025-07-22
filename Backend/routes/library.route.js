const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/student.middleware");
const LibraryItem = require("../models/libraryItem.models");
const Student = require("../models/student.models");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const GOOGLE_API_KEY = "AIzaSyB2G1eKOy_4iwK8oiBVzsvkS9kjT20L0-U";
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Get all library items
router.get("/items", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    const course = student.course || "General";
    
    // Check if we already have library items for this course
    let libraryItems = await LibraryItem.find({ course });
    
    // Always generate some new items on each visit, but keep old ones too
    // Extract topics from student's batches
    const topics = student.batches
      .flatMap(batch => batch.chapters?.map(chapter => chapter.title) || [])
      .join(', ');
    
    // Generate new library items using Gemini (fewer items if we already have some)
    const itemsToGenerate = libraryItems.length > 0 ? 10 : 50;
    const newItems = await generateLibraryItems(course, topics, itemsToGenerate);
    
    // Save new items to database
    if (newItems && newItems.length > 0) {
      await LibraryItem.insertMany(newItems);
      
      // Fetch all items again, including both old and new
      libraryItems = await LibraryItem.find({ course });
    }
    
    res.status(200).json({
      success: true,
      items: libraryItems
    });
  } catch (error) {
    console.error('Error fetching library items:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Generate library items using Gemini API
async function generateLibraryItems(course, topics, count = 50) {
  try {
    const prompt = `
I am a student studying ${course}. Based on my course and the following topics: ${topics},
please generate a list of ${count} high-quality, free online learning resources in JSON format.

Each resource should follow this structure:
{
  "title": "Resource Title",
  "type": "chapter/notes/video/audio/image",
  "subject": "Subject Name",
  "batch": "Batch Name",
  "content": "Brief description of the resource content",
  "readTime": "45 min",
  "lastAccessed": "2 days ago",
  "bookmarked": false,
  "tags": ["Tag1", "Tag2", "Tag3"],
  "rating": 4.8,
  "views": 1247,
  "likes": 42,
  "url": "https://link.to/resource"
}

All resources must be:
- Free to access
- Educational and published by trusted sources
- In diverse formats (articles, PDFs, videos, tutorials)
- Publicly available online with real, working URLs
- Related to ${course} and the topics I mentioned

Return ONLY a valid JSON array of resources.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Parse JSON from response
    let jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      const jsonText = jsonMatch[0];
      const items = JSON.parse(jsonText);
      
      // Add course to each item
      return items.map(item => ({
        ...item,
        course,
        likedBy: []
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating library items:', error);
    return [];
  }
}

// Generate more library items
router.post("/items/generate", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    const { count = 10 } = req.body;
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    const course = student.course || "General";
    
    // Extract topics from student's batches
    const topics = student.batches
      .flatMap(batch => batch.chapters?.map(chapter => chapter.title) || [])
      .join(', ');
    
    // Generate new library items
    const newItems = await generateLibraryItems(course, topics, count);
    
    // Save new items to database
    if (newItems && newItems.length > 0) {
      await LibraryItem.insertMany(newItems);
      
      // Return the new items
      res.status(200).json({
        success: true,
        message: `Generated ${newItems.length} new library items`,
        items: newItems
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to generate new library items"
      });
    }
  } catch (error) {
    console.error('Error generating library items:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Like/unlike a library item
router.post("/items/:itemId/like", authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const studentId = req.student.id;
    
    // Find the library item
    const libraryItem = await LibraryItem.findById(itemId);
    
    if (!libraryItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }
    
    // Check if student already liked this item
    const alreadyLiked = libraryItem.likedBy.includes(studentId);
    
    if (alreadyLiked) {
      // Unlike
      libraryItem.likes = Math.max(0, libraryItem.likes - 1);
      libraryItem.likedBy = libraryItem.likedBy.filter(id => id.toString() !== studentId);
    } else {
      // Like
      libraryItem.likes = (libraryItem.likes || 0) + 1;
      libraryItem.likedBy.push(studentId);
    }
    
    await libraryItem.save();
    
    res.status(200).json({
      success: true,
      likes: libraryItem.likes,
      likedBy: libraryItem.likedBy
    });
  } catch (error) {
    console.error('Error liking item:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
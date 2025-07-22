const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/student.middleware");

// Real educational resources based on subject
const resourcesDatabase = {
  "Electrical Engineering": [
    {
      id: "ee-1",
      title: "Circuit Analysis Fundamentals",
      type: "chapter",
      subject: "Electrical Engineering",
      batch: "EE Fundamentals",
      content: "Comprehensive guide to circuit analysis including Kirchhoff's laws, Ohm's law, and circuit theorems.",
      readTime: "45 min",
      lastAccessed: "2 days ago",
      bookmarked: false,
      tags: ["Circuits", "Electrical", "Analysis"],
      rating: 4.8,
      views: 1247,
      likes: 42,
      likedBy: [],
      url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-002-circuits-and-electronics-spring-2007/"
    },
    {
      id: "ee-2",
      title: "Power Systems Engineering",
      type: "notes",
      subject: "Electrical Engineering",
      batch: "Power Systems",
      content: "Detailed notes on power generation, transmission, and distribution systems.",
      readTime: "30 min",
      lastAccessed: "1 day ago",
      bookmarked: false,
      tags: ["Power", "Electrical", "Systems"],
      rating: 4.6,
      views: 892,
      likes: 28,
      likedBy: [],
      url: "https://nptel.ac.in/courses/108/105/108105067/"
    },
    {
      id: "ee-3",
      title: "Digital Electronics Video Series",
      type: "video",
      subject: "Electrical Engineering",
      batch: "Digital Systems",
      content: "Video lectures covering digital logic, flip-flops, and sequential circuits.",
      readTime: "60 min",
      lastAccessed: "3 days ago",
      bookmarked: false,
      tags: ["Digital", "Electronics", "Logic"],
      rating: 4.7,
      views: 1634,
      likes: 89,
      likedBy: [],
      url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm"
    },
    {
      id: "ee-4",
      title: "Electromagnetic Theory",
      type: "chapter",
      subject: "Electrical Engineering",
      batch: "EM Fields",
      content: "Comprehensive material on electromagnetic fields, Maxwell's equations, and wave propagation.",
      readTime: "50 min",
      lastAccessed: "5 days ago",
      bookmarked: false,
      tags: ["EM", "Fields", "Waves"],
      rating: 4.5,
      views: 723,
      likes: 31,
      likedBy: [],
      url: "https://ocw.mit.edu/courses/physics/8-02-physics-ii-electricity-and-magnetism-spring-2007/"
    }
  ],
  "Computer Science": [
    {
      id: "cs-1",
      title: "Data Structures and Algorithms",
      type: "chapter",
      subject: "Computer Science",
      batch: "CS Fundamentals",
      content: "Comprehensive guide to data structures and algorithms with implementation examples.",
      readTime: "55 min",
      lastAccessed: "1 day ago",
      bookmarked: false,
      tags: ["DSA", "Algorithms", "Programming"],
      rating: 4.9,
      views: 2247,
      likes: 142,
      likedBy: [],
      url: "https://www.geeksforgeeks.org/data-structures/"
    },
    {
      id: "cs-2",
      title: "Web Development Bootcamp",
      type: "video",
      subject: "Computer Science",
      batch: "Web Development",
      content: "Complete video course on modern web development with HTML, CSS, JavaScript, and React.",
      readTime: "120 min",
      lastAccessed: "3 days ago",
      bookmarked: false,
      tags: ["Web", "JavaScript", "React"],
      rating: 4.8,
      views: 3456,
      likes: 278,
      likedBy: [],
      url: "https://www.freecodecamp.org/learn/responsive-web-design/"
    }
  ],
  "Physics": [
    {
      id: "phy-1",
      title: "Mechanics Fundamentals",
      type: "chapter",
      subject: "Physics",
      batch: "Classical Mechanics",
      content: "Comprehensive study of classical mechanics including Newton's laws, motion, and forces.",
      readTime: "45 min",
      lastAccessed: "2 days ago",
      bookmarked: false,
      tags: ["Mechanics", "Physics", "Forces"],
      rating: 4.7,
      views: 1845,
      likes: 97,
      likedBy: [],
      url: "https://openstax.org/books/university-physics-volume-1/pages/4-1-force"
    },
    {
      id: "phy-2",
      title: "Thermodynamics Lecture Series",
      type: "video",
      subject: "Physics",
      batch: "Thermodynamics",
      content: "Video lectures on thermodynamics principles, laws, and applications.",
      readTime: "60 min",
      lastAccessed: "4 days ago",
      bookmarked: false,
      tags: ["Thermodynamics", "Physics", "Energy"],
      rating: 4.6,
      views: 1532,
      likes: 86,
      likedBy: [],
      url: "https://www.youtube.com/playlist?list=PL4xAk5aclnUgRs-YejX1hfSbFpEgEJzBJ"
    }
  ],
  "Mathematics": [
    {
      id: "math-1",
      title: "Calculus Made Easy",
      type: "notes",
      subject: "Mathematics",
      batch: "Calculus",
      content: "Comprehensive notes on differential and integral calculus with examples and applications.",
      readTime: "40 min",
      lastAccessed: "1 day ago",
      bookmarked: false,
      tags: ["Calculus", "Mathematics", "Differentiation"],
      rating: 4.8,
      views: 2134,
      likes: 156,
      likedBy: [],
      url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/"
    },
    {
      id: "math-2",
      title: "Linear Algebra Visualized",
      type: "video",
      subject: "Mathematics",
      batch: "Linear Algebra",
      content: "Visual approach to understanding linear algebra concepts with interactive examples.",
      readTime: "50 min",
      lastAccessed: "3 days ago",
      bookmarked: false,
      tags: ["Linear Algebra", "Mathematics", "Vectors"],
      rating: 4.9,
      views: 1876,
      likes: 143,
      likedBy: [],
      url: "https://www.3blue1brown.com/topics/linear-algebra"
    }
  ]
};

// Get resources based on course and topics
router.get("/library", authenticateToken, async (req, res) => {
  try {
    const { course, topics } = req.query;
    const studentId = req.student.id;
    
    // Get base resources for the course
    let resources = [];
    
    // Add course-specific resources
    if (course && resourcesDatabase[course]) {
      resources = [...resourcesDatabase[course]];
    }
    
    // If no course-specific resources, add some general ones
    if (resources.length === 0) {
      // Combine resources from all subjects
      Object.values(resourcesDatabase).forEach(subjectResources => {
        resources = [...resources, ...subjectResources];
      });
    }
    
    // Filter by topics if provided
    if (topics && topics.length > 0) {
      const topicsList = topics.split(',').map(t => t.trim().toLowerCase());
      resources = resources.filter(resource => 
        resource.tags.some(tag => topicsList.includes(tag.toLowerCase())) ||
        resource.title.toLowerCase().includes(topicsList.some(topic => resource.title.toLowerCase().includes(topic))) ||
        resource.content.toLowerCase().includes(topicsList.some(topic => resource.content.toLowerCase().includes(topic)))
      );
    }
    
    // Randomize and limit to 20 resources
    resources = resources
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
    
    res.status(200).json({
      success: true,
      resources
    });
  } catch (error) {
    console.error('Error fetching library resources:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Like/unlike a resource
router.post("/library/:resourceId/like", authenticateToken, async (req, res) => {
  try {
    const { resourceId } = req.params;
    const studentId = req.student.id;
    
    // Find the resource (in a real app, this would be a database query)
    let resource = null;
    
    // Search through all resources
    for (const subject in resourcesDatabase) {
      const foundResource = resourcesDatabase[subject].find(r => r.id === resourceId);
      if (foundResource) {
        resource = foundResource;
        break;
      }
    }
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found"
      });
    }
    
    // Check if student already liked this resource
    const alreadyLiked = resource.likedBy.includes(studentId);
    
    if (alreadyLiked) {
      // Unlike
      resource.likes = Math.max(0, resource.likes - 1);
      resource.likedBy = resource.likedBy.filter(id => id !== studentId);
    } else {
      // Like
      resource.likes += 1;
      resource.likedBy.push(studentId);
    }
    
    res.status(200).json({
      success: true,
      likes: resource.likes,
      likedBy: resource.likedBy
    });
  } catch (error) {
    console.error('Error liking resource:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
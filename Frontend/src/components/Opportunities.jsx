import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Code,
  Search,
  Bell,
  ExternalLink,
  Star,
  AlertCircle,
} from "lucide-react";
import "./Opportunities.css";

const Opportunities = () => {
  const [activeTab, setActiveTab] = useState("internship");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all"); // This filter might not work directly with AI output
  const [user, setUser] = useState({
    name: "User",
    course: "Computer Science", // Set a default course for initial fetch
  });
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user data (course)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Using default user course.");
        return; // Exit if no token
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/students/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          // If user fetch fails, log and continue with default or empty course
          console.error(
            "Failed to fetch user data:",
            res.status,
            await res.text()
          );
          setUser((prev) => ({ ...prev, course: "Computer Science" })); // Fallback
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser((prev) => ({ ...prev, course: "Computer Science" })); // Fallback
      }
    };
    fetchUser();
  }, []);

  // Fetch opportunities when activeTab or user.course changes
  useEffect(() => {
    // Only fetch if user.course is loaded or has a default
    if (!user?.course) {
      console.log("User course not set yet, skipping opportunity fetch.");
      return;
    }

    const fetchOpportunities = async (tab, course) => {
      setLoading(true);
      setError("");
      try {
        // --- IMPORTANT: Correct the endpoint to /ai/generate ---
        const res = await fetch(
`${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/ai/generate?type=${tab}&course=${course}`
        );
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Failed to fetch opportunities: ${res.status} - ${errorText}`
          );
        }
        const data = await res.text();
        const cleanedResponse = data.replace(/```json\n?|\n?```/g, "").trim();
        const parsedResources = JSON.parse(cleanedResponse);

        setOpportunities(parsedResources);
      } catch (err) {
        console.error("Fetch opportunities error:", err);
        setError(
          err.message || "Error fetching opportunities. Check server logs."
        );
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities(activeTab, user.course);
  }, [activeTab, user.course]); // Depend on activeTab and user.course

  const availableTabs = [
    { id: "internship", label: "internship", icon: Briefcase },
    { id: "hackathon", label: "hackathon", icon: Code },
  ];

  // Filter and prepare data
  const filteredData = opportunities
    .filter((item) => {
      // Use 'name' from AI response instead of 'title'
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Note: The AI doesn't directly provide 'category'.
      // This filter will likely not work as expected unless you
      // modify the AI prompt to include 'category' or derive it here.
      const matchesCategory =
        filterCategory === "all" ||
        (item.category &&
          item.category.toLowerCase() === filterCategory.toLowerCase());

      // Basic validation: ensure item has name, description, and link
      const isValid = item && item.name && item.description && item.link;

      return isValid && matchesSearch && matchesCategory;
    })
    // Add a unique ID for React's key prop if the AI doesn't provide one
    .map((item, index) => ({ ...item, id: item.link + index })); // Simple ID generation

  // Helper for badge colors - these won't be dynamic with AI generated data unless prompted
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (item) => {
    const deadlineField =
      activeTab === "internship"
        ? item.applicationDeadline
        : item.registrationDeadline;
    const eventDatesField = item.eventDates;

    if (!deadlineField && !eventDatesField) return "text-gray-600 bg-gray-100"; // Default if no dates

    const now = new Date();

    if (activeTab === "internship" && deadlineField) {
      const deadlineDate = new Date(deadlineField);
      if (deadlineDate < now) return "text-red-600 bg-red-100"; // Closed
      const diffDays = Math.ceil(
        (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 14) return "text-yellow-600 bg-yellow-100"; // Nearing deadline (2 weeks)
      return "text-green-600 bg-green-100"; // Open
    }

    if (activeTab === "hackathon" && eventDatesField) {
      // This parsing is simplistic. You might need a more robust date parser for varied AI outputs.
      const [startDateStr, endDateStr] = eventDatesField.includes(" - ")
        ? eventDatesField.split(" - ")
        : [eventDatesField, eventDatesField];
      const startDate = new Date(startDateStr.trim());
      const endDate = new Date(
        endDateStr ? endDateStr.trim() : startDateStr.trim()
      );

      if (now > endDate) return "text-red-600 bg-red-100"; // Closed
      if (now >= startDate && now <= endDate)
        return "text-blue-600 bg-blue-100"; // Ongoing
      if (now < startDate) return "text-green-600 bg-green-100"; // Upcoming
    }

    return "text-gray-600 bg-gray-100"; // Default
  };

  const getStatusText = (item) => {
    const deadlineField =
      activeTab === "internship"
        ? item.applicationDeadline
        : item.registrationDeadline;
    const eventDatesField = item.eventDates;
    const now = new Date();

    if (activeTab === "internship" && deadlineField) {
      const deadlineDate = new Date(deadlineField);
      if (isNaN(deadlineDate.getTime())) return "Unknown"; // Invalid date
      if (deadlineDate < now) return "Closed";
      const diffDays = Math.ceil(
        (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 14 && diffDays > 0)
        return `Deadline: ${diffDays} days left`;
      if (diffDays <= 0) return "Closed"; // If current date is deadline date or past it
      return "Open";
    }

    if (activeTab === "hackathon" && eventDatesField) {
      const [startDateStr, endDateStr] = eventDatesField.includes(" - ")
        ? eventDatesField.split(" - ")
        : [eventDatesField, eventDatesField];
      const startDate = new Date(startDateStr.trim());
      const endDate = new Date(
        endDateStr ? endDateStr.trim() : startDateStr.trim()
      );

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
        return "Unknown"; // Invalid date

      if (now > endDate) return "Closed";
      if (now >= startDate && now <= endDate) return "Ongoing";
      if (now < startDate) return "Upcoming";
    }
    return "N/A";
  };

  const isDeadlineNear = (item) => {
    const deadlineField =
      activeTab === "internship"
        ? item.applicationDeadline
        : item.registrationDeadline;
    if (!deadlineField) return false;
    const deadlineDate = new Date(deadlineField);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0; // Deadline is within 7 days and not already passed
  };

  return (
    <div className="opportunities-container">
      <div className="opportunities-header">
        <h1 className="opportunities-title">Opportunities Hub</h1>
        <p className="opportunities-subtitle">
          Discover internship and hackathon to advance your career in{" "}
          {user.course || "your field"}.
        </p>
      </div>

      <div className="opportunities-tabs">
        {availableTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`opportunities-tab ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              <Icon className="opportunities-tab-icon" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="opportunities-search-section">
        <div className="opportunities-search-container">
          <div className="opportunities-search-wrapper">
            <Search className="opportunities-search-icon" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="opportunities-search-input"
            />
          </div>

          {/* This filterCategory select might not be effective as AI doesn't return 'category' */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="opportunities-filter-select"
          >
            <option value="all">All Categories</option>
            {/* These options assume categories that AI might infer or you explicitly define */}
            <option value="science">Science</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="mathematics">Mathematics</option>
            <option value="technology">Technology</option>
            <option value="innovation">Innovation</option>
            <option value="research">Research</option>
            <option value="social">Social Impact</option>
          </select>

          <button className="opportunities-alert-btn">
            <Bell className="opportunities-alert-icon" />
            <span>Set Alerts</span>
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading opportunities...
        </p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
          <AlertCircle
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          />
          {error}
        </p>
      ) : filteredData.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}>
          No {activeTab} found matching your search or filters. Try a different
          query.
        </p>
      ) : (
        <div className="opportunities-grid">
          {filteredData.map((item) => (
            <div key={item.id} className="opportunity-card">
              <div className="opportunity-image-container">
                {/* Placeholder image as AI doesn't generate images directly */}
                <img
                  src={
                    activeTab === "hackathon"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWJqdS26LGmXI_3QKGrZFQulZNCRiNLKDasg&s"
                      : "https://bpb-us-w2.wpmucdn.com/sites.wustl.edu/dist/8/1036/files/2018/07/interns_blog-t0ehju.png"
                  }
                  alt={item.name}
                  className="opportunity-image"
                />

                <div className="opportunity-badges">
                  {/* Status based on dates */}
                  <span
                    className={`opportunity-status-badge ${getStatusColor(
                      item
                    )}`}
                  >
                    {getStatusText(item)}
                  </span>
                  {/* Difficulty will not be available from AI unless explicitly prompted */}
                  {item.difficulty && (
                    <span
                      className={`opportunity-difficulty-badge ${getDifficultyColor(
                        item.difficulty
                      )}`}
                    >
                      {item.difficulty}
                    </span>
                  )}
                </div>
                {(activeTab === "internship" || activeTab === "hackathon") &&
                  isDeadlineNear(item) && (
                    <div className="opportunity-deadline-warning">
                      <AlertCircle className="opportunity-warning-icon" />
                      <span>Deadline Near</span>
                    </div>
                  )}
              </div>

              <div className="opportunity-content">
                <h3 className="opportunity-title">{item.name}</h3>{" "}
                {/* Use item.name */}
                <p className="opportunity-description">{item.description}</p>
                <div className="opportunity-details">
                  <div className="opportunity-detail-row">
                    <span className="opportunity-detail-label">
                      {activeTab === "internship" ? "Company" : "Organizer"}:
                    </span>
                    <span className="opportunity-detail-value">
                      {item.organization} {/* Use item.organization */}
                    </span>
                  </div>

                  {/* Display prizePool for hackathon */}
                  {activeTab === "hackathon" && item.prizePool && (
                    <div className="opportunity-detail-row">
                      <span className="opportunity-detail-label">Prize:</span>
                      <span className="opportunity-detail-value green">
                        {item.prizePool}
                      </span>
                    </div>
                  )}
                  {/* Display generic 'stipend' for internship if AI generates it */}
                  {activeTab === "internship" &&
                    item.stipend && ( // You need to add 'stipend' to AI prompt
                      <div className="opportunity-detail-row">
                        <span className="opportunity-detail-label">
                          Stipend:
                        </span>
                        <span className="opportunity-detail-value green">
                          {item.stipend}
                        </span>
                      </div>
                    )}

                  <div className="opportunity-detail-row">
                    <span className="opportunity-detail-label">
                      {activeTab === "internship" ? "Deadline" : "Dates"}:
                    </span>
                    <span className="opportunity-detail-value">
                      {activeTab === "internship"
                        ? item.applicationDeadline
                        : item.eventDates}{" "}
                      {/* Use correct fields */}
                    </span>
                  </div>

                  {/* Location from AI */}
                  {item.location && (
                    <div className="opportunity-detail-row">
                      <span className="opportunity-detail-label">
                        Location:
                      </span>
                      <span className="opportunity-detail-value">
                        {item.location}
                      </span>
                    </div>
                  )}

                  {/* Source Platform from AI */}
                  {item.sourcePlatform && (
                    <div className="opportunity-detail-row">
                      <span className="opportunity-detail-label">Source:</span>
                      <span className="opportunity-detail-value">
                        {item.sourcePlatform}
                      </span>
                    </div>
                  )}

                  {/* Eligibility from AI */}
                  {item.eligibility && (
                    <div className="opportunity-detail-row">
                      <span className="opportunity-detail-label">
                        Eligibility:
                      </span>
                      <span className="opportunity-detail-value">
                        {item.eligibility}
                      </span>
                    </div>
                  )}

                  {/* Applicants/Participants are not generated by AI, so remove or keep as placeholder */}
                  {/*
                  <div className="opportunity-detail-row">
                    <span className="opportunity-detail-label">
                      {activeTab === 'internship' ? 'Applicants' : 'Participants'}:
                    </span>
                    <span className="opportunity-detail-value blue">
                      {activeTab === 'internship' ? item.applicants : item.participants}
                    </span>
                  </div>
                  */}
                </div>
                {activeTab === "internship" &&
                  item.skills &&
                  item.skills.length > 0 && ( // Check if skills exist
                    <div className="opportunity-eligibility">
                      <p className="opportunity-eligibility-label">
                        Skills Required:
                      </p>
                      <p className="opportunity-eligibility-text">
                        {item.skills.join(", ")}
                      </p>
                    </div>
                  )}
                {activeTab === "hackathon" &&
                  item.themes &&
                  item.themes.length > 0 && ( // Check if themes exist
                    <div className="opportunity-requirements">
                      <p className="opportunity-requirements-label">Themes:</p>
                      <div className="opportunity-tags">
                        {item.themes.slice(0, 3).map((theme, index) => (
                          <span key={index} className="opportunity-tag">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                <div className="opportunity-actions">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opportunity-apply-btn"
                  >
                    <ExternalLink className="opportunity-apply-icon" />
                    <span>
                      {activeTab === "internship" ? "Apply" : "Register"}
                    </span>
                  </a>

                  <button className="opportunity-bookmark-btn">
                    <Star className="opportunity-bookmark-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;

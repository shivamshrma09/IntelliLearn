import React, { useState, useEffect } from "react";

function SaveYourResource() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [activeTab, setActiveTab] = useState("pdfs");
  const [savedResources, setSavedResources] = useState([]);

  // Load resources from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resources");
    if (saved) {
      setSavedResources(JSON.parse(saved));
    }
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => setPdfData(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
      setPdfData(null);
    }
  };

  // Save resource (heading + desc + PDF) to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    if (!heading || !description || !pdfData) {
      alert("Please fill heading, description and select a PDF.");
      return;
    }

    // Create a new resource object
    const newResource = {
      id: Date.now(),
      heading,
      description,
      pdfData,
      date: new Date().toLocaleString()
    };

    const updatedResources = [...savedResources, newResource];
    setSavedResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));

    // Reset inputs
    setHeading("");
    setDescription("");
    setPdfData(null);
    alert("Resource saved!");
  };

  // Render saved PDFs list
  const renderPDFs = () => {
    if (!savedResources.length) return <p>No saved PDFs.</p>;
    return savedResources.map((res) => (
      <div key={res.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <h3>{res.heading}</h3>
        <p>{res.description}</p>
        <small>Saved on: {res.date}</small>
        <br />
        <a href={res.pdfData} download={`${res.heading}.pdf`}>
          Download PDF
        </a>
      </div>
    ));
  };

  // Placeholder functions to render notes and images tabs
  // Aap yahan similar stored data ko display kar sakte hain
  const renderNotes = () => <p>Notes tab - content to be implemented.</p>;
  const renderImages = () => <p>Images tab - content to be implemented.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Save Your Resource</h1>

      {/* Form card */}
      <div style={{ border: "2px solid #3b82f6 ", padding: 20, borderRadius: 8, marginBottom: 20 }}>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Heading: <br />
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                style={{ width: "100%", padding: 8 , border: "2px solid black", borderRadius: 4  }}
                required
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Description: <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ width: "100%", padding: 8 , border: "2px solid black", borderRadius: 4 }}
                required
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Upload PDF: <br />
              <input type="file" accept="application/pdf" onChange={handleFileChange} required />
            </label>
          </div>

          <button type="submit" style={{ backgroundColor: "#3b82f6 ", color: "white", padding: "10px 15px", border: "none", borderRadius: 4 }}>
            Save PDF
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div>
        <div style={{ display: "flex", cursor: "pointer", marginBottom: 10 }}>
          <div
            onClick={() => setActiveTab("pdfs")}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: activeTab === "pdfs" ? "purple" : "#eee",
              color: activeTab === "pdfs" ? "white" : "black",
              textAlign: "center",
              borderRadius: "8px 0 0 8px",
            }}
          >
            PDFs
          </div>
          <div
            onClick={() => setActiveTab("notes")}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: activeTab === "notes" ? "purple" : "#eee",
              color: activeTab === "notes" ? "white" : "black",
              textAlign: "center",
            }}
          >
            Notes
          </div>
          <div
            onClick={() => setActiveTab("images")}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: activeTab === "images" ? "purple" : "#eee",
              color: activeTab === "images" ? "white" : "black",
              textAlign: "center",
              borderRadius: "0 8px 8px 0",
            }}
          >
            Images
          </div>
        </div>

        <div style={{ border: "1px solid #3b82f6 ", padding: 20, borderRadius: 8, minHeight: 150 }}>
          {activeTab === "pdfs" && renderPDFs()}
          {activeTab === "notes" && renderNotes()}
          {activeTab === "images" && renderImages()}
        </div>
      </div>
    </div>
  );
}

export default SaveYourResource;

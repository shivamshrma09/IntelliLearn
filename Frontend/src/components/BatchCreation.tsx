import React, { useState } from 'react';

const BatchCreation = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [language, setLanguage] = useState('English');
  const [instructor, setInstructor] = useState('');
  const [logo, setLogo] = useState('');
  const [chapters, setChapters] = useState([{ 
    id: 1, 
    title: '', 
    duration: '',
    topics: [{ id: 1, title: '', description: '', duration: '', order: 1 }]
  }]);

  // Add a new chapter
  const addChapter = () => {
    setChapters([...chapters, { 
      id: chapters.length + 1, 
      title: '', 
      duration: '',
      topics: [{ id: 1, title: '', description: '', duration: '', order: 1 }]
    }]);
  };

  // Update chapter field
  const updateChapter = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  // Add a new topic to a chapter
  const addTopic = (chapterIndex) => {
    const newChapters = [...chapters];
    const topicsLength = newChapters[chapterIndex].topics.length;
    newChapters[chapterIndex].topics.push({ 
      id: topicsLength + 1, 
      title: '', 
      description: '', 
      duration: '',
      order: topicsLength + 1
    });
    setChapters(newChapters);
  };

  // Update topic field
  const updateTopic = (chapterIndex, topicIndex, field, value) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].topics[topicIndex][field] = value;
    setChapters(newChapters);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !instructor) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate that all chapters have at least one topic with description
    const invalidChapters = chapters.filter(chapter => 
      !chapter.title || 
      !chapter.duration || 
      chapter.topics.some(topic => !topic.title || !topic.description || !topic.duration)
    );

    if (invalidChapters.length > 0) {
      alert('Please fill in all chapter and topic details.');
      return;
    }

    try {
      const newBatch = {
        id: Date.now().toString(),
        title,
        subject,
        instructor,
        language,
        logo,
        chapters,
        progress: 0,
        completedChapters: 0,
        totalChapters: chapters.length,
        type: 'custom',
        enrolledStudents: 1,
        difficulty: 'Custom',
        estimatedTime: chapters.reduce((sum, c) => sum + (parseInt(c.duration) || 0), 0) + ' hours',
        image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
        isCompleted: false
      };
      
      // Save batch to backend
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newBatch)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create batch');
      }
      
      const data = await response.json();
      
      // Generate resources based on the batch
      await fetch(`/api/batches/${newBatch.id}/generate-resources`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      onCreate(data.batch || newBatch);
      onClose();
    } catch (error) {
      console.error('Error creating batch:', error);
      alert('Failed to create batch. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-content" style={modalStyle}>
        <h2>Create New Batch</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title <br />
            <input required value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <br />
          <label>
            Subject <br />
            <input required value={subject} onChange={e => setSubject(e.target.value)} />
          </label>
          <br />
          <label>
            Language <br />
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </label>
          <br />
          <label>
            Instructor <br />
            <input required value={instructor} onChange={e => setInstructor(e.target.value)} />
          </label>
          <br />
          <label>
            Logo URL (for certificate) <br />
            <input value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://example.com/logo.png" />
          </label>
          <br />
          <fieldset>
            <legend>Chapters & Topics</legend>
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} style={{ marginBottom: 20, border: '1px solid #e5e7eb', padding: 10, borderRadius: 5 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <input 
                    placeholder="Chapter Title"
                    value={chapter.title}
                    onChange={e => updateChapter(chapterIndex, 'title', e.target.value)}
                    required
                    style={{ flex: 2 }}
                  />
                  <input 
                    placeholder="Duration (hours)"
                    value={chapter.duration}
                    onChange={e => updateChapter(chapterIndex, 'duration', e.target.value)}
                    style={{ width: 100 }}
                    required
                    type="number"
                    min="1"
                  />
                </div>
                
                <div style={{ marginLeft: 20 }}>
                  <h4>Topics</h4>
                  {chapter.topics.map((topic, topicIndex) => (
                    <div key={topic.id} style={{ marginBottom: 15, padding: 10, backgroundColor: '#f9fafb', borderRadius: 5 }}>
                      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                        <input 
                          placeholder="Topic Title"
                          value={topic.title}
                          onChange={e => updateTopic(chapterIndex, topicIndex, 'title', e.target.value)}
                          required
                          style={{ flex: 2 }}
                        />
                        <input 
                          placeholder="Duration (min)"
                          value={topic.duration}
                          onChange={e => updateTopic(chapterIndex, topicIndex, 'duration', e.target.value)}
                          style={{ width: 100 }}
                          required
                          type="number"
                          min="1"
                        />
                      </div>
                      <textarea
                        placeholder="Detailed topic description and explanation"
                        value={topic.description}
                        onChange={e => updateTopic(chapterIndex, topicIndex, 'description', e.target.value)}
                        required
                        style={{ width: '100%', minHeight: 100, marginBottom: 10 }}
                      />
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addTopic(chapterIndex)}
                    style={{ backgroundColor: '#e5e7eb', padding: '5px 10px', borderRadius: 5, border: 'none' }}
                  >
                    Add Topic
                  </button>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addChapter}
              style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 15px', borderRadius: 5, border: 'none', marginTop: 10 }}
            >
              Add Chapter
            </button>
          </fieldset>
          <br />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ padding: '8px 15px', borderRadius: 5, border: '1px solid #d1d5db' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 15px', borderRadius: 5, border: 'none' }}
            >
              Create Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed', top: 0, left:0, right:0, bottom:0,
  backgroundColor: 'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center'
};

const modalStyle = {
  backgroundColor: 'white', padding: 20, borderRadius: 8, width: '90%', maxWidth: 500,
  maxHeight: '90%', overflowY: 'auto'
};

export default BatchCreation;

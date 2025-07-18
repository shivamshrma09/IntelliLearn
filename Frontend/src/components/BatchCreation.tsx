import React, { useState } from 'react';

const BatchCreation = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [language, setLanguage] = useState('English');
  const [instructor, setInstructor] = useState('');
  const [chapters, setChapters] = useState([{ id: 1, title: '', duration: '' }]);

  // एक नया chapter जोड़ने का फंक्शन
  const addChapter = () => {
    setChapters([...chapters, { id: chapters.length + 1, title: '', duration: '' }]);
  };

  // किसी chapter का field अपडेट करना
  const updateChapter = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  // फॉर्म सबमिट
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject || !instructor) {
      alert('Please fill in all required fields.');
      return;
    }

    const newBatch = {
      id: Date.now(),
      title,
      subject,
      instructor,
      language,
      chapters,
      progress: 0,
      completedChapters: 0,
      totalChapters: chapters.length,
      type: 'custom',
      enrolledStudents: 1,
      difficulty: 'Custom',
      estimatedTime: chapters.reduce((sum, c) => sum + (parseInt(c.duration) || 0), 0) + ' hours',
      image: '',  // आप चाहें तो default या upload कराएं
    };

    onCreate(newBatch);
    onClose();
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
              {/* जरूरत अनुसार और भाषा डालें */}
            </select>
          </label>
          <br />
          <label>
            Instructor <br />
            <input required value={instructor} onChange={e => setInstructor(e.target.value)} />
          </label>
          <br />
          <fieldset>
            <legend>Chapters</legend>
            {chapters.map((chapter, i) => (
              <div key={chapter.id} style={{ marginBottom: 10 }}>
                <input 
                  placeholder="Chapter Title"
                  value={chapter.title}
                  onChange={e => updateChapter(i, 'title', e.target.value)}
                  required
                />
                <input 
                  placeholder="Duration (hours)"
                  value={chapter.duration}
                  onChange={e => updateChapter(i, 'duration', e.target.value)}
                  style={{ width: 100, marginLeft: 10 }}
                  required
                  type="number"
                  min="1"
                />
              </div>
            ))}
            <button type="button" onClick={addChapter}>Add Chapter</button>
          </fieldset>
          <br />
          <button type="submit">Create Batch</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
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

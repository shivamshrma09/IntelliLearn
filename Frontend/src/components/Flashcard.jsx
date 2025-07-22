import React, { useState, useEffect } from 'react';
import { ThumbsUp, Download, Share2, Bookmark, RotateCcw } from 'lucide-react';
import './Flashcard.css';

const Flashcard = ({ flashcard, currentUser, onLike }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(flashcard?.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if user has liked this flashcard
    if (flashcard?.likedBy && currentUser?._id) {
      setIsLiked(flashcard.likedBy.includes(currentUser._id));
    }
    
    // Set like count from props
    setLikeCount(flashcard?.likes || 0);
  }, [flashcard, currentUser]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLike = async () => {
    try {
      // Toggle like state optimistically
      const newLikeState = !isLiked;
      setIsLiked(newLikeState);
      setLikeCount(prevCount => newLikeState ? prevCount + 1 : prevCount - 1);
      
      // Call API to update like status
      if (onLike) {
        await onLike(flashcard._id);
      }
    } catch (error) {
      // Revert on error
      console.error('Error liking flashcard:', error);
      setIsLiked(!isLiked);
      setLikeCount(flashcard?.likes || 0);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add API call to save bookmark status
  };

  const handleDownload = () => {
    // Create a text representation of the flashcard
    const content = `
# ${flashcard.title}

## Content
${flashcard.content}

---
From: ${flashcard.batchName || 'Study Material'}
Created: ${new Date(flashcard.createdAt).toLocaleDateString()}
    `;
    
    // Create a blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flashcard-${flashcard.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: flashcard.title,
        text: `Check out this flashcard: ${flashcard.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${flashcard.title}: ${flashcard.content}`);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}>
      <div className="flashcard-inner">
        {/* Front of card */}
        <div className="flashcard-front">
          <div className="flashcard-header">
            <h3>{flashcard.title}</h3>
            <button className="flashcard-flip-btn" onClick={handleFlip}>
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="flashcard-content">
            {flashcard.content}
          </div>
          <div className="flashcard-footer">
            <div className="flashcard-actions">
              <button 
                className={`flashcard-action-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
              >
                <ThumbsUp size={16} />
                <span>{likeCount}</span>
              </button>
              <button 
                className="flashcard-action-btn"
                onClick={handleDownload}
              >
                <Download size={16} />
              </button>
              <button 
                className="flashcard-action-btn"
                onClick={handleShare}
              >
                <Share2 size={16} />
              </button>
              <button 
                className={`flashcard-action-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="flashcard-back">
          <div className="flashcard-header">
            <h3>{flashcard.title}</h3>
            <button className="flashcard-flip-btn" onClick={handleFlip}>
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="flashcard-content">
            {/* Additional content or explanation could go here */}
            <p>Additional notes or explanations for this topic.</p>
          </div>
          <div className="flashcard-footer">
            <div className="flashcard-actions">
              <button 
                className={`flashcard-action-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
              >
                <ThumbsUp size={16} />
                <span>{likeCount}</span>
              </button>
              <button 
                className="flashcard-action-btn"
                onClick={handleDownload}
              >
                <Download size={16} />
              </button>
              <button 
                className="flashcard-action-btn"
                onClick={handleShare}
              >
                <Share2 size={16} />
              </button>
              <button 
                className={`flashcard-action-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
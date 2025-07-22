import React, { useRef } from 'react';
import { Download, Share2, Award, Calendar, User, BookOpen, CheckCircle } from 'lucide-react';
import './Certificate.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ certificate, currentUser }) => {
  const certificateRef = useRef(null);
  
  const handleDownload = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${certificate.batchName}-Certificate.pdf`);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.batchName} Certificate`,
        text: `I completed ${certificate.batchName} with a score of ${certificate.percentage}%!`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`I completed ${certificate.batchName} with a score of ${certificate.percentage}%!`);
      alert('Certificate link copied to clipboard!');
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="certificate-wrapper">
      <div className="certificate-actions">
        <button className="certificate-action-btn" onClick={handleDownload}>
          <Download size={16} />
          <span>Download</span>
        </button>
        <button className="certificate-action-btn" onClick={handleShare}>
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
      
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-inner">
          <div className="certificate-header">
            {certificate.logo && (
              <img 
                src={certificate.logo} 
                alt="Organization Logo" 
                className="certificate-logo"
              />
            )}
            <h1 className="certificate-title">Certificate of Completion</h1>
          </div>
          
          <div className="certificate-content">
            <div className="certificate-award-icon">
              <Award size={64} />
            </div>
            
            <p className="certificate-text">This is to certify that</p>
            <h2 className="certificate-name">{currentUser?.name || 'Student'}</h2>
            <p className="certificate-text">has successfully completed</p>
            <h3 className="certificate-course">{certificate.batchName}</h3>
            
            <div className="certificate-score">
              <div className="certificate-score-item">
                <span className="certificate-score-value">{certificate.percentage}%</span>
                <span className="certificate-score-label">Final Score</span>
              </div>
              <div className="certificate-score-item">
                <span className="certificate-score-value">{certificate.correctAnswers}/{certificate.totalQuestions}</span>
                <span className="certificate-score-label">Questions</span>
              </div>
            </div>
            
            <div className="certificate-meta">
              <div className="certificate-meta-item">
                <Calendar size={16} />
                <span>Issued on: {formatDate(certificate.issueDate)}</span>
              </div>
              <div className="certificate-meta-item">
                <User size={16} />
                <span>Instructor: {certificate.instructor || 'Course Instructor'}</span>
              </div>
              <div className="certificate-meta-item">
                <BookOpen size={16} />
                <span>Subject: {certificate.subject || 'Course Subject'}</span>
              </div>
              <div className="certificate-meta-item">
                <CheckCircle size={16} />
                <span>Certificate ID: {certificate.certificateId}</span>
              </div>
            </div>
          </div>
          
          <div className="certificate-footer">
            <p>IntelliLearn - Empowering Education</p>
            <p className="certificate-verify">Verify this certificate at: intellilearn.com/verify/{certificate.certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
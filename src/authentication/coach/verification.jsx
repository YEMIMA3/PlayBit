import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DocumentVerification = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    certificate: null,
    governmentId: null
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (fileType, file) => {
    setDocuments(prev => ({ ...prev, [fileType]: file }));
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({ ...prev, [fileType]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!documents.certificate) {
      alert('Please upload your coaching certificate to continue.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Documents submitted:', documents);
      
      // Simulate API call for document submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Verification submitted successfully!');
      
      // Show success message or redirect
      alert('✅ Your documents have been submitted for verification! You will receive an email once approved.');
      
      // Redirect to coach dashboard or verification pending page
      navigate('/coach/dashboard');
      
    } catch (error) {
      console.error('Submission failed:', error);
      alert('❌ Failed to submit documents. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-bg">
        <div className="verification-shape shape-1"></div>
        <div className="verification-shape shape-2"></div>
      </div>

      <motion.div
        className="verification-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress Indicator */}
        <div className="verification-progress">
          <div className="progress-steps">
            <div className="step completed">
              <div className="step-number">1</div>
              <span>Account Info</span>
            </div>
            <div className="step active">
              <div className="step-number">2</div>
              <span>Document Upload</span>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <span>Verification</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <motion.div 
          className="verification-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Verify Your Coaching Credentials</h1>
          <p>Upload required documents to start your coaching journey</p>
        </motion.div>

        {/* Document Upload Form */}
        <div className="verification-form glass-card">
          <form onSubmit={handleSubmit}>
            {/* Certificate Upload */}
            <motion.div 
              className="upload-section"
              whileHover={{ scale: 1.02 }}
            >
              <label className="upload-label">
                <div className="upload-icon">📄</div>
                <h3>Coaching Certificate *</h3>
                <p>Upload your official coaching certification (PDF, JPG, PNG)</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('certificate', e.target.files[0])}
                  required
                  disabled={isSubmitting}
                />
                <div className="upload-area">
                  {documents.certificate ? (
                    <motion.div 
                      className="file-preview"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✅ {documents.certificate.name}
                    </motion.div>
                  ) : (
                    'Click to upload certificate'
                  )}
                </div>
              </label>
              
              {/* Progress Bar */}
              {uploadProgress.certificate > 0 && uploadProgress.certificate < 100 && (
                <motion.div 
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress.certificate}%` }}
                />
              )}
            </motion.div>

            {/* Government ID Upload (Optional) */}
            <motion.div 
              className="upload-section"
              whileHover={{ scale: 1.02 }}
            >
              <label className="upload-label">
                <div className="upload-icon">🆔</div>
                <h3>Government ID (Optional)</h3>
                <p>Verify your identity with a government-issued ID</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('governmentId', e.target.files[0])}
                  disabled={isSubmitting}
                />
                <div className="upload-area">
                  {documents.governmentId ? (
                    <motion.div 
                      className="file-preview"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✅ {documents.governmentId.name}
                    </motion.div>
                  ) : (
                    'Click to upload ID (Optional)'
                  )}
                </div>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="submit-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                type="submit"
                className="submit-btn"
                disabled={!documents.certificate || isSubmitting}
                whileHover={(!isSubmitting && documents.certificate) ? { scale: 1.05 } : {}}
                whileTap={(!isSubmitting && documents.certificate) ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    Submitting for Verification...
                  </div>
                ) : (
                  'Send for Verification'
                )}
              </motion.button>
              
              <p className="verification-note">
                ⏳ Verification typically takes 24-48 hours. You'll receive an email once approved.
              </p>
            </motion.div>
          </form>
        </div>

        {/* Additional Info */}
        <motion.div 
          className="verification-info"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="info-card">
            <h3>📋 Why Verification Matters</h3>
            <ul>
              <li>Build trust with athletes and parents</li>
              <li>Access premium coaching features</li>
              <li>Get featured in coach recommendations</li>
              <li>Receive verified coach badge</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DocumentVerification;
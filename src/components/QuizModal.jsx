import { useState } from 'react';
import questions from '../data/quiz-questions.json';

const QuizModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const passed = finished && score >= 4;

  const handleOptionClick = (optionIndex) => {
    if (finished) return;

    if (optionIndex === current.answerIndex) {
      setScore((s) => s + 1);
    }

    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '600px',
          maxWidth: '90vw',
          backgroundColor: '#020617',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #facc15',
          color: '#e5e7eb'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!finished ? (
          <>
            <h2 style={{ fontSize: '20px', marginBottom: '8px', color: '#facc15' }}>
              Final Quiz – Question {index + 1} / {questions.length}
            </h2>
            <p style={{ marginBottom: '16px' }}>{current.question}</p>
            <div style={{ display: 'grid', gap: '8px' }}>
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(i)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    backgroundColor: '#020617',
                    color: '#e5e7eb',
                    cursor: 'pointer'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                fontSize: '22px',
                marginBottom: '8px',
                color: passed ? '#22c55e' : '#f97316'
              }}
            >
              {passed ? 'You Passed the Interview!' : 'Almost There – Try Again'}
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Score: {score} / {questions.length} (need 4/5 to pass)
            </p>

            {passed && (
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '6px', color: '#facc15' }}>
                  Hire Me
                </h3>
                <p>
                  Email:{' '}
                  <a href="mailto:krishna@iitb.ac.in" style={{ color: '#22c55e' }}>
                    krishna@iitb.ac.in
                  </a>
                </p>
                <p>
                  GitHub:{' '}
                  <a
                    href="https://github.com/Krishna-IITB"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#22c55e' }}
                  >
                    Krishna-IITB
                  </a>
                </p>
                <p>
                  LinkedIn:{' '}
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#22c55e' }}
                  >
                    LinkedIn Profile
                  </a>
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              {!passed && (
                <button
                  onClick={handleRetry}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#f97316',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
              )}
              <button
                onClick={onClose}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#4b5563',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizModal;

import { useState } from 'react';
import { getProblem, type Problem } from './getProblem';
import { NumericKeypad } from './NumericKeypad';
import { correct, wrong } from './messages';
import './App.css';

type FeedbackState = 'none' | 'correct' | 'incorrect';

const getRandomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

function App() {
  const [problem, setProblem] = useState<Problem>(getProblem());
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  const isOperatorMissing = problem.missingPart === 'operator';
  const allowOperators = isOperatorMissing;

  const handleKeyPress = (value: string) => {
    if (feedback !== 'none') return;

    if (isOperatorMissing) {
      setUserAnswer(value);
      checkAnswer(value);
    } else {
      const newAnswer = userAnswer + value;
      if (newAnswer.length <= 2) {
        setUserAnswer(newAnswer);
      }
    }
  };

  const handleDelete = () => {
    if (feedback !== 'none') return;
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (feedback !== 'none' || userAnswer === '' || isOperatorMissing) return;
    checkAnswer(userAnswer);
  };

  const checkAnswer = (answer: string) => {
    let isCorrect = false;

    switch (problem.missingPart) {
      case 'operand1':
        isCorrect = parseInt(answer) === problem.operand1;
        break;
      case 'operator':
        isCorrect = answer === problem.operator;
        break;
      case 'operand2':
        isCorrect = parseInt(answer) === problem.operand2;
        break;
      case 'result':
        isCorrect = parseInt(answer) === problem.result;
        break;
    }

    const newFeedback = isCorrect ? 'correct' : 'incorrect';
    const message = isCorrect ? getRandomMessage(correct) : getRandomMessage(wrong);

    setFeedback(newFeedback);
    setFeedbackMessage(message);
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      // Správná odpověď - po 1s nový příklad
      setTimeout(() => {
        setProblem(getProblem());
        setUserAnswer('');
        setFeedback('none');
      }, 1000);
    } else {
      // Špatná odpověď - jen resetovat input, příklad zůstane stejný
      setTimeout(() => {
        setUserAnswer('');
        setFeedback('none');
      }, 800);
    }
  };

  const renderProblemPart = (part: 'operand1' | 'operator' | 'operand2' | 'result') => {
    if (problem.missingPart === part) {
      return (
        <span className={`answer-box ${feedback}`}>
          {userAnswer || '?'}
        </span>
      );
    }

    switch (part) {
      case 'operand1':
        return <span className="number">{problem.operand1}</span>;
      case 'operator':
        return <span className="operator">{problem.operator}</span>;
      case 'operand2':
        return <span className="number">{problem.operand2}</span>;
      case 'result':
        return <span className="number">{problem.result}</span>;
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Matematika pro Thea</h1>
        <div className="score">
          Správně: <strong>{score}</strong> / {totalAttempts}
          {totalAttempts > 0 && (
            <span className="percentage">
              {' '}({Math.round((score / totalAttempts) * 100)}%)
            </span>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="problem-section">
          <div className="problem-display">
            <div className="equation">
              {renderProblemPart('operand1')}
              {renderProblemPart('operator')}
              {renderProblemPart('operand2')}
              <span className="equals">=</span>
              {renderProblemPart('result')}
            </div>

            {feedback !== 'none' && (
              <div className={`feedback-message ${feedback}`}>
                {feedbackMessage}
              </div>
            )}
          </div>
        </div>

        <div className="keypad-section">
          <NumericKeypad
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onEnter={handleEnter}
            allowOperators={allowOperators}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

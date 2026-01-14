import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Clock, CheckCircle, XCircle, AlertCircle, 
  ChevronLeft, ChevronRight, Flag, Loader,
  BookOpen, Target, Award, TrendingUp, Home
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function AptitudeExam({ theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, topic } = location.state || {};

  // State
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  // Fetch questions
  useEffect(() => {
    fetchExamQuestions();
  }, []);

  const fetchExamQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const params = {};
      if (category) params.category = category;
      if (topic) params.topic = topic;
      
      const response = await axios.get(`${API_URL}/aptitude/public/exam`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (response.data.success) {
        setQuestions(response.data.questions);
        // Set time: 1 minute per question
        setTimeRemaining(response.data.questions.length * 60);
      }
    } catch (err) {
      console.error("Error fetching exam questions:", err);
      setError("Failed to load exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Timer effect
  useEffect(() => {
    if (!examStarted || examCompleted || timeRemaining === null) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examCompleted, timeRemaining]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (option) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  };

  // Handle flag question
  const handleFlagQuestion = () => {
    setFlagged(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(currentQuestionIndex)) {
        newFlagged.delete(currentQuestionIndex);
      } else {
        newFlagged.add(currentQuestionIndex);
      }
      return newFlagged;
    });
  };

  // Navigation
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Submit exam
  const handleSubmitExam = () => {
    setExamCompleted(true);
    setShowResults(true);
  };

  // Calculate results
  const results = useMemo(() => {
    if (!examCompleted) return null;

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (!userAnswer) {
        unanswered++;
      } else if (userAnswer === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const totalAttempted = correct + incorrect;
    const accuracy = totalAttempted > 0 ? ((correct / totalAttempted) * 100).toFixed(1) : 0;
    const score = ((correct / questions.length) * 100).toFixed(1);

    return {
      correct,
      incorrect,
      unanswered,
      totalAttempted,
      accuracy,
      score,
      timeTaken: questions.length * 60 - timeRemaining
    };
  }, [examCompleted, answers, questions, timeRemaining]);


  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="text-center">
          <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading exam...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="text-center">
          <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={() => navigate('/aptitude')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90"
          >
            Back to Aptitude
          </button>
        </div>
      </div>
    );
  }

  // No questions
  if (questions.length === 0) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="text-center">
          <BookOpen className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            No questions available for this exam.
          </p>
          <button
            onClick={() => navigate('/aptitude')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90"
          >
            Back to Aptitude
          </button>
        </div>
      </div>
    );
  }

  // Start screen
  if (!examStarted) {
    return (
      <div className={`min-h-screen pt-16 ${
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className={`rounded-xl border p-8 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {category ? `${category} Exam` : topic ? `${topic} Exam` : 'Aptitude Exam'}
            </h1>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <BookOpen className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Total Questions: <strong>{questions.length}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Time Limit: <strong>{questions.length} minutes</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Target className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Passing Score: <strong>60%</strong>
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-lg mb-8 ${
              theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
            }`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-900'}`}>
                Instructions:
              </h3>
              <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Each question has 4 options, select the correct answer</li>
                <li>• You can flag questions for review</li>
                <li>• Navigate between questions using the navigation buttons</li>
                <li>• Submit the exam before time runs out</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/aptitude')}
                className={`flex-1 py-3 rounded-lg border font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setExamStarted(true)}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Results screen
  if (showResults) {
    const getScoreColor = (score) => {
      if (score >= 80) return theme === 'dark' ? 'text-green-400' : 'text-green-600';
      if (score >= 60) return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
      return theme === 'dark' ? 'text-red-400' : 'text-red-600';
    };

    return (
      <div className={`min-h-screen pt-16 ${
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className={`rounded-xl border p-8 mb-6 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <Award className={`w-16 h-16 mx-auto mb-4 ${getScoreColor(results.score)}`} />
              <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Exam Completed!
              </h1>
              <p className={`text-lg ${getScoreColor(results.score)}`}>
                Your Score: {results.score}%
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
              }`}>
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  {results.correct}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Correct</div>
              </div>

              <div className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
              }`}>
                <XCircle className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  {results.incorrect}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Incorrect</div>
              </div>

              <div className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
              }`}>
                <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {results.unanswered}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Unanswered</div>
              </div>

              <div className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
              }`}>
                <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {results.accuracy}%
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</div>
              </div>
            </div>

            <div className={`p-4 rounded-lg mb-6 ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Time Taken:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatTime(results.timeTaken)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Total Questions:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {questions.length}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/aptitude')}
                className="flex-1 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Aptitude
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                }}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Exam screen
  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = answers[currentQuestionIndex];
  const isAnswered = userAnswer !== undefined;
  const isFlagged = flagged.has(currentQuestionIndex);

  return (
    <div className={`min-h-screen pt-16 ${
      theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className={`rounded-xl border p-4 mb-6 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {category || topic || 'Aptitude'} Exam
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
              }`}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 60 
                  ? theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                  : theme === 'dark' ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
              </div>

              <button
                onClick={handleFlagQuestion}
                className={`p-2 rounded-lg transition-colors ${
                  isFlagged
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Flag className="w-5 h-5" fill={isFlagged ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className={`rounded-xl border p-6 mb-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }`}>
              {/* Question */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-lg font-semibold ${
                    theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Q{currentQuestionIndex + 1}
                  </span>
                  <div className="flex-1">
                    <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {currentQuestion.question}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {currentQuestion.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        currentQuestion.difficulty === 'Easy' 
                          ? 'bg-green-500/20 text-green-400'
                          : currentQuestion.difficulty === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((option) => {
                  const isSelected = userAnswer === option;
                  const isCorrect = examCompleted && option === currentQuestion.correctAnswer;
                  const isWrong = examCompleted && isSelected && option !== currentQuestion.correctAnswer;

                  return (
                    <button
                      key={option}
                      onClick={() => !examCompleted && handleAnswerSelect(option)}
                      disabled={examCompleted}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        examCompleted
                          ? isCorrect
                            ? 'border-green-500 bg-green-500/10'
                            : isWrong
                            ? 'border-red-500 bg-red-500/10'
                            : theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500/10'
                          : theme === 'dark'
                          ? 'border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/50'
                          : 'border-gray-200 hover:border-blue-500/50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          examCompleted
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : isWrong
                              ? 'bg-red-500 text-white'
                              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            : isSelected
                            ? 'bg-blue-500 text-white'
                            : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {option}
                        </span>
                        <span className={`flex-1 ${
                          examCompleted
                            ? isCorrect
                              ? 'text-green-600 font-semibold'
                              : isWrong
                              ? 'text-red-600'
                              : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            : theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {currentQuestion.options[option]}
                        </span>
                        {examCompleted && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {examCompleted && isWrong && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Solution (shown after completion) */}
              {examCompleted && currentQuestion.solution && (
                <div className={`mt-6 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-900'}`}>
                    Solution:
                  </h4>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {currentQuestion.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={goToPrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentQuestionIndex === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {!examCompleted && (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Submit Exam
                </button>
              )}

              <button
                onClick={goToNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentQuestionIndex === questions.length - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl border p-4 sticky top-20 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Question Navigator
              </h3>
              
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((_, index) => {
                  const answered = answers[index] !== undefined;
                  const flaggedQ = flagged.has(index);
                  const current = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                        current
                          ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                          : answered
                          ? theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                          : flaggedQ
                          ? theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                          : theme === 'dark' ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500"></div>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}></div>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}></div>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`}></div>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Not Answered</span>
                </div>
              </div>

              <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Answered:</span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {Object.keys(answers).length}/{questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Flagged:</span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {flagged.size}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AptitudeExam;

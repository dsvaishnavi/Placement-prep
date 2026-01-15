import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search, Filter, ChevronDown, ChevronUp,
  BarChart3, BookOpen, Target,
  Hash, Calculator, Shapes,
  Brain, SortAsc, SortDesc, X, Play, Zap,
  AlertCircle, CheckCircle, Loader
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Define all possible topics that should always be displayed
const ALL_TOPICS = [
  // Quantitative
  { name: "Arithmetic", category: "Quantitative", difficulty: "Easy", description: "Basic arithmetic operations, fractions, decimals, and percentages" },
  { name: "Algebra", category: "Quantitative", difficulty: "Medium", description: "Equations, inequalities, polynomials, and algebraic expressions" },
  { name: "Geometry", category: "Quantitative", difficulty: "Medium", description: "Plane geometry, coordinate geometry, and mensuration" },
  { name: "Trigonometry", category: "Quantitative", difficulty: "Hard", description: "Trigonometric functions, identities, and equations" },
  { name: "Number System", category: "Quantitative", difficulty: "Easy", description: "Number properties, divisibility, and number theory" },
  { name: "Probability", category: "Quantitative", difficulty: "Medium", description: "Basic probability, permutations, and combinations" },
  { name: "Permutations & Combinations", category: "Quantitative", difficulty: "Hard", description: "Counting principles and arrangement problems" },
  { name: "Data Interpretation", category: "Quantitative", difficulty: "Medium", description: "Charts, graphs, tables, and data analysis" },
  { name: "Percentages", category: "Quantitative", difficulty: "Easy", description: "Percentage calculations and applications" },
  { name: "Profit & Loss", category: "Quantitative", difficulty: "Easy", description: "Business mathematics and financial calculations" },
  { name: "Simple & Compound Interest", category: "Quantitative", difficulty: "Medium", description: "Interest calculations and time value of money" },
  { name: "Time, Speed & Distance", category: "Quantitative", difficulty: "Medium", description: "Motion problems and relative speed" },
  
  // Logical Reasoning
  { name: "Number Series", category: "Logical Reasoning", difficulty: "Easy", description: "Identifying patterns in number sequences" },
  { name: "Letter Series", category: "Logical Reasoning", difficulty: "Easy", description: "Pattern recognition in alphabet sequences" },
  { name: "Analogies", category: "Logical Reasoning", difficulty: "Medium", description: "Word relationships and comparisons" },
  { name: "Blood Relations", category: "Logical Reasoning", difficulty: "Medium", description: "Family tree and relationship puzzles" },
  { name: "Direction Sense", category: "Logical Reasoning", difficulty: "Easy", description: "Direction and distance problems" },
  { name: "Seating Arrangement", category: "Logical Reasoning", difficulty: "Hard", description: "Linear and circular arrangement puzzles" },
  { name: "Puzzles", category: "Logical Reasoning", difficulty: "Hard", description: "Logical puzzles and brain teasers" },
  { name: "Syllogism", category: "Logical Reasoning", difficulty: "Medium", description: "Logical deductions from given statements" },
  { name: "Logical Deduction", category: "Logical Reasoning", difficulty: "Hard", description: "Complex logical reasoning problems" },
  { name: "Data Sufficiency", category: "Logical Reasoning", difficulty: "Medium", description: "Determining if given data is sufficient" },
  
  // Verbal
  { name: "Spotting Errors", category: "Verbal", difficulty: "Easy", description: "Identifying grammatical errors in sentences" },
  { name: "Synonyms", category: "Verbal", difficulty: "Easy", description: "Words with similar meanings" },
  { name: "Antonyms", category: "Verbal", difficulty: "Easy", description: "Words with opposite meanings" },
  { name: "Reading Comprehension", category: "Verbal", difficulty: "Medium", description: "Understanding and analyzing passages" },
  { name: "Sentence Correction", category: "Verbal", difficulty: "Medium", description: "Correcting grammatical errors in sentences" },
  { name: "Para Jumbles", category: "Verbal", difficulty: "Hard", description: "Rearranging sentences into coherent paragraphs" },
  { name: "Cloze Test", category: "Verbal", difficulty: "Medium", description: "Filling blanks in passages with appropriate words" },
  { name: "Idioms and Phrases", category: "Verbal", difficulty: "Easy", description: "Common idioms and their meanings" }
];

function Aptitude({ theme }) {
  const navigate = useNavigate();
  
  // State for data
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [sortBy, setSortBy] = useState("default");
  const [expandedSubtopic, setExpandedSubtopic] = useState(null);

  // Fetch questions from API
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_URL}/aptitude/public/questions`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (response.data.success) {
        setQuestions(response.data.questions);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  // Get unique categories from ALL_TOPICS
  const categories = useMemo(() => {
    return ["All", ...new Set(ALL_TOPICS.map(t => t.category))];
  }, []);

  // Get all topics from ALL_TOPICS
  const allTopicNames = useMemo(() => {
    return ["All Topics", ...ALL_TOPICS.map(t => t.name)];
  }, []);

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Create topic data with question counts
  const topicsWithData = useMemo(() => {
    return ALL_TOPICS.map(topic => {
      const topicQuestions = questions.filter(q => q.topic === topic.name);
      return {
        ...topic,
        questionCount: topicQuestions.length,
        questions: topicQuestions,
        hasData: topicQuestions.length > 0
      };
    });
  }, [questions]);

  // Group questions by category for overview cards
  const categoryStats = useMemo(() => {
    const stats = {};
    topicsWithData.forEach(topic => {
      if (!stats[topic.category]) {
        stats[topic.category] = {
          total: 0,
          topics: new Set(),
          byDifficulty: { Easy: 0, Medium: 0, Hard: 0 }
        };
      }
      stats[topic.category].total += topic.questionCount;
      if (topic.hasData) {
        stats[topic.category].topics.add(topic.name);
      }
      topic.questions.forEach(q => {
        stats[topic.category].byDifficulty[q.difficulty]++;
      });
    });
    return stats;
  }, [topicsWithData]);

  // Overview cards data
  const overviewCards = useMemo(() => {
    const categoryIcons = {
      'Quantitative': { 
        icon: Calculator, 
        gradient: "from-blue-500 to-indigo-600", 
        color: "blue",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20" : "bg-gradient-to-br from-blue-100 to-indigo-100",
        text: theme === 'dark' ? "text-blue-400" : "text-blue-600"
      },
      'Logical Reasoning': { 
        icon: Brain, 
        gradient: "from-purple-500 to-indigo-600", 
        color: "purple",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20" : "bg-gradient-to-br from-purple-100 to-indigo-100",
        text: theme === 'dark' ? "text-purple-400" : "text-purple-600"
      },
      'Verbal': { 
        icon: BookOpen, 
        gradient: "from-green-500 to-emerald-600", 
        color: "green",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20" : "bg-gradient-to-br from-green-100 to-emerald-100",
        text: theme === 'dark' ? "text-green-400" : "text-green-600"
      },
      'Non-verbal': { 
        icon: Shapes, 
        gradient: "from-amber-500 to-orange-600", 
        color: "amber",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20" : "bg-gradient-to-br from-amber-100 to-orange-100",
        text: theme === 'dark' ? "text-amber-400" : "text-amber-600"
      }
    };

    const descriptions = {
      'Quantitative': "Algebra, arithmetic, data interpretation, and geometry",
      'Logical Reasoning': "Pattern recognition, puzzles, and analytical reasoning",
      'Verbal': "Reading comprehension, grammar, and vocabulary",
      'Non-verbal': "Visual reasoning and pattern analysis"
    };

    const cards = [];
    
    Object.entries(categoryStats).forEach(([category, stats]) => {
      const config = categoryIcons[category] || { 
        icon: BookOpen, 
        gradient: "from-gray-500 to-gray-600", 
        color: "gray",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-gray-500/20 to-gray-500/20" : "bg-gradient-to-br from-gray-100 to-gray-100",
        text: theme === 'dark' ? "text-gray-400" : "text-gray-600"
      };
      
      const totalQuestions = stats.total;
      const progress = totalQuestions > 0 
        ? Math.round((stats.byDifficulty.Easy / totalQuestions) * 100 * 0.4 + 
                     (stats.byDifficulty.Medium / totalQuestions) * 100 * 0.3 + 
                     (stats.byDifficulty.Hard / totalQuestions) * 100 * 0.3)
        : 0;

      // Count total topics in this category (not just those with data)
      const totalTopicsInCategory = ALL_TOPICS.filter(t => t.category === category).length;

      cards.push({
        title: category,
        icon: config.icon,
        description: descriptions[category] || "Comprehensive practice problems",
        gradient: config.gradient,
        color: config.color,
        iconBg: config.iconBg,
        text: config.text,
        total: stats.total,
        topics: totalTopicsInCategory,
        topicsWithData: stats.topics.size,
        byDifficulty: stats.byDifficulty,
        progress: progress,
        stats: [
          { label: "Topics", value: totalTopicsInCategory },
          { label: "Problems", value: stats.total },
          { label: "Available", value: stats.topics.size }
        ]
      });
    });

    return cards;
  }, [categoryStats, theme]);


  // Filter topics (always show all topics, just filter for display)
  const filteredTopics = useMemo(() => {
    let result = [...topicsWithData];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(topic =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(topic => topic.category === selectedCategory);
    }

    // Apply topic filter
    if (selectedTopic !== "All Topics") {
      result = result.filter(topic => topic.name === selectedTopic);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "All") {
      result = result.filter(topic => topic.difficulty === selectedDifficulty);
    }

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "difficulty":
        const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
        result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        // Default: keep original order
        break;
    }

    return result;
  }, [topicsWithData, searchQuery, selectedCategory, selectedTopic, selectedDifficulty, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = questions.length;
    const byDifficulty = {
      Easy: questions.filter(q => q.difficulty === 'Easy').length,
      Medium: questions.filter(q => q.difficulty === 'Medium').length,
      Hard: questions.filter(q => q.difficulty === 'Hard').length
    };
    const uniqueTopics = new Set(questions.map(q => q.topic)).size;
    const totalTopics = ALL_TOPICS.length;
    
    const totalQuestions = total || 1;
    const avgProgress = Math.round(
      (byDifficulty.Easy / totalQuestions) * 100 * 0.4 +
      (byDifficulty.Medium / totalQuestions) * 100 * 0.3 +
      (byDifficulty.Hard / totalQuestions) * 100 * 0.3
    );

    return { 
      total, 
      byDifficulty, 
      uniqueTopics,
      totalTopics,
      avgProgress,
      completed: Math.floor(total * 0.65)
    };
  }, [questions]);

  // Handle start exam for a category
  const handleStartExam = (category) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    if (categoryQuestions.length === 0) {
      navigate('/no-data-available', { state: { category } });
    } else {
      navigate('/aptitude-exam', { state: { category } });
    }
  };

  // Handle start exam for a specific topic
  const handleStartTopicExam = (topic) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    if (topicQuestions.length === 0) {
      navigate('/no-data-available', { state: { topic } });
    } else {
      navigate('/aptitude-exam', { state: { topic } });
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": 
        return theme === 'dark' 
          ? "bg-green-500/20 text-green-400 border-green-500/30" 
          : "bg-green-100 text-green-800 border-green-200";
      case "Medium": 
        return theme === 'dark' 
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" 
          : "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": 
        return theme === 'dark' 
          ? "bg-red-500/20 text-red-400 border-red-500/30" 
          : "bg-red-100 text-red-800 border-red-200";
      default: 
        return theme === 'dark' 
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30" 
          : "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress >= 70) return theme === 'dark' ? "bg-green-400" : "bg-green-500";
    if (progress >= 40) return theme === 'dark' ? "bg-yellow-400" : "bg-yellow-500";
    return theme === 'dark' ? "bg-red-400" : "bg-red-500";
  };

  // Get progress text color
  const getProgressTextColor = (progress) => {
    if (progress >= 70) return theme === 'dark' ? "text-green-400" : "text-green-600";
    if (progress >= 40) return theme === 'dark' ? "text-yellow-400" : "text-yellow-600";
    return theme === 'dark' ? "text-red-400" : "text-red-600";
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="text-center">
          <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
        <div className="text-center">
          <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={fetchQuestions}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className={`min-h-screen pt-16 ${theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Aptitude Mastery Platform
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive preparation for quantitative, logical reasoning, and verbal ability
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {overviewCards.map((card, index) => {
            const Icon = card.icon;
            const progressColor = getProgressTextColor(card.progress);

            return (
              <div
                key={index}
                className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                      <Icon className={`w-6 h-6 ${card.text}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{card.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    theme === 'dark' ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-50'
                  }`}>
                    {card.progress}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Overall Progress</span>
                    <span className={`font-semibold ${progressColor}`}>{card.progress}%</span>
                  </div>
                  <div className={`w-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div
                      className={`h-full ${getProgressColor(card.progress)} rounded-full transition-all duration-500`}
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between mb-6">
                  {card.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleStartExam(card.title)}
                  className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white bg-gradient-to-r ${card.gradient} hover:opacity-90 active:scale-[0.98] transition-all duration-200`}
                >
                  <Play className="w-4 h-4" />
                  Take Full Assessment
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20' : 'bg-gradient-to-br from-blue-100 to-green-100'
              }`}>
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.totalTopics}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Topics</div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' : 'bg-gradient-to-br from-green-100 to-emerald-100'
              }`}>
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.uniqueTopics}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Available</div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-100 to-pink-100'
              }`}>
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.avgProgress}%</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Progress</div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' : 'bg-gradient-to-br from-amber-100 to-orange-100'
              }`}>
                <Hash className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.total}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Problems</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Explorer Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Problem Explorer</h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Browse and practice all aptitude topics</p>
          </div>
          <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{stats.uniqueTopics} available</span>
            <span className="mx-2">•</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>{stats.totalTopics - stats.uniqueTopics} coming soon</span>
          </div>
        </div>


        {/* Control Bar */}
        <div className={`rounded-xl border p-6 mb-8 ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics, categories, or keywords..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${
                  theme === 'dark' ? 'bg-gray-800/50 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${
                    theme === 'dark' ? 'bg-gray-800/50 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
                  }`}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Topic Filter */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${
                    theme === 'dark' ? 'bg-gray-800/50 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
                  }`}
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  {allTopicNames.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${
                    theme === 'dark' ? 'bg-gray-800/50 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
                  }`}
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${
                    theme === 'dark' ? 'bg-gray-800/50 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
                  }`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="name-asc">Sort: A-Z</option>
                  <option value="name-desc">Sort: Z-A</option>
                  <option value="difficulty">Sort: Difficulty</option>
                  <option value="category">Sort: Category</option>
                </select>
                {sortBy.includes("desc") ? (
                  <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                ) : (
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                )}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "All" || selectedDifficulty !== "All" || selectedTopic !== "All Topics" || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== "All" && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedTopic !== "All Topics" && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
                }`}>
                  Topic: {selectedTopic}
                  <button onClick={() => setSelectedTopic("All Topics")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDifficulty !== "All" && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>
                  Difficulty: {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                  setSelectedTopic("All Topics");
                  setSearchQuery("");
                }}
                className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>


        {/* Topics Table/Grid - Always show all topics */}
        <div className={`rounded-xl border overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-blue-100'
        }`}>
          {/* Table Header */}
          <div className={`hidden lg:grid grid-cols-12 gap-4 p-6 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800/50 text-gray-300' : 'border-gray-100 bg-gray-50 text-gray-600'
          } text-sm font-semibold`}>
            <div className="col-span-4">Topic</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-1 text-center">Problems</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Topics List */}
          <div className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => {
                const isExpanded = expandedSubtopic === topic.name;
                const categoryIcons = {
                  'Quantitative': Calculator,
                  'Logical Reasoning': Brain,
                  'Verbal': BookOpen,
                  'Non-verbal': Shapes
                };
                const Icon = categoryIcons[topic.category] || BookOpen;

                return (
                  <div key={topic.name} className={`p-6 transition-all duration-300 ${
                    theme === 'dark' ? 'hover:bg-white/5 hover:backdrop-blur-md hover:shadow-lg hover:shadow-blue-500/10' : 'hover:bg-blue-50/30 hover:backdrop-blur-sm hover:shadow-md'
                  }`}>
                    {/* Desktop View */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                          }`}>
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{topic.name}</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {topic.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {topic.category}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {topic.questionCount}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>problems</div>
                      </div>
                      <div className="col-span-2 text-center">
                        {topic.hasData ? (
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'
                          }`}>
                            Available
                          </span>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => handleStartTopicExam(topic.name)}
                          className={`px-4 py-2 rounded-lg font-medium transition-opacity ${
                            topic.hasData
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90'
                              : theme === 'dark'
                              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {topic.hasData ? 'Practice' : 'View'}
                        </button>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                          }`}>
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{topic.name}</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{topic.category}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedSubtopic(isExpanded ? null : topic.name)}
                          className="p-2"
                        >
                          {isExpanded ? (
                            <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                          ) : (
                            <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {topic.questionCount} problems
                        </span>
                        {topic.hasData ? (
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'
                          }`}>
                            Available
                          </span>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Coming Soon
                          </span>
                        )}
                      </div>

                      {isExpanded && (
                        <div className={`mt-4 p-4 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                        }`}>
                          <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {topic.description}
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => handleStartTopicExam(topic.name)}
                        className={`w-full mt-4 py-3 rounded-lg font-medium transition-opacity ${
                          topic.hasData
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90'
                            : theme === 'dark'
                            ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {topic.hasData ? 'Practice Now' : 'View Details'}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <Search className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No topics found</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSelectedTopic("All Topics");
                    setSearchQuery("");
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className={`mt-8 p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-white/10' : 'bg-white'
              }`}>
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-900'}`}>Pro Tips for Success</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Practice daily, track progress, and focus on weak areas to improve faster.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                theme === 'dark' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
              }`}>
                Download Study Plan
              </button>
              <button
                onClick={() => navigate('/aptitude-exam')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Take Mock Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aptitude;

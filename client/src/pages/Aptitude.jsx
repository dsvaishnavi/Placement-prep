// aptitude.jsx
import { useState, useMemo } from "react";
import {
  Search, Filter, ChevronDown, ChevronUp,
  BarChart3, Clock, BookOpen, Target,
  Hash, Percent, Calculator, Shapes,
  Brain, Puzzle, GitBranch, TrendingUp,
  MessageSquare, Book, SpellCheck, Eye,
  SortAsc, SortDesc, X, Play, Zap,
  TrendingUp as TrendingUpIcon, AlertCircle,
  CheckCircle, Bookmark
} from "lucide-react";

function Aptitude({ theme }) {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [sortBy, setSortBy] = useState("default");
  const [expandedSubtopic, setExpandedSubtopic] = useState(null);
  const [expandedProblem, setExpandedProblem] = useState(null);

  // Overview cards data
  const overviewCards = [
    {
      id: 1,
      title: "Quantitative",
      description: "Algebra, arithmetic, data interpretation, and geometry",
      icon: Calculator,
      progress: 35,
      totalTopics: 12,
      totalProblems: 475,
      avgTime: "60 min",
      colorScheme: {
        bg: theme === 'dark' ? "bg-gradient-to-br from-blue-500/10 to-indigo-500/10" : "bg-gradient-to-br from-blue-50 to-indigo-50",
        border: theme === 'dark' ? "border-blue-500/20" : "border-blue-200",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20" : "bg-gradient-to-br from-blue-100 to-indigo-100",
        iconColor: "text-blue-500",
        gradient: "from-blue-500 to-indigo-600",
        text: theme === 'dark' ? "text-blue-400" : "text-blue-600"
      },
      stats: [
        { label: "Topics", value: "12" },
        { label: "Problems", value: "475" },
        { label: "Avg Time", value: "60 min" }
      ]
    },
    {
      id: 2,
      title: "Logical Reasoning",
      description: "Pattern recognition, puzzles, and analytical reasoning",
      icon: Brain,
      progress: 65,
      totalTopics: 10,
      totalProblems: 415,
      avgTime: "45 min",
      colorScheme: {
        bg: theme === 'dark' ? "bg-gradient-to-br from-purple-500/10 to-indigo-500/10" : "bg-gradient-to-br from-purple-50 to-indigo-50",
        border: theme === 'dark' ? "border-purple-500/20" : "border-purple-200",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-purple-500/20 to-indigo-500/20" : "bg-gradient-to-br from-purple-100 to-indigo-100",
        iconColor: "text-purple-500",
        gradient: "from-purple-500 to-indigo-600",
        text: theme === 'dark' ? "text-purple-400" : "text-purple-600"
      },
      stats: [
        { label: "Topics", value: "10" },
        { label: "Problems", value: "415" },
        { label: "Avg Time", value: "45 min" }
      ]
    },
    {
      id: 3,
      title: "Verbal Ability",
      description: "Reading comprehension, grammar, and vocabulary",
      icon: BookOpen,
      progress: 85,
      totalTopics: 8,
      totalProblems: 420,
      avgTime: "75 min",
      colorScheme: {
        bg: theme === 'dark' ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10" : "bg-gradient-to-br from-green-50 to-emerald-50",
        border: theme === 'dark' ? "border-green-500/20" : "border-green-200",
        iconBg: theme === 'dark' ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20" : "bg-gradient-to-br from-green-100 to-emerald-100",
        iconColor: "text-green-500",
        gradient: "from-green-500 to-emerald-600",
        text: theme === 'dark' ? "text-green-400" : "text-green-600"
      },
      stats: [
        { label: "Topics", value: "8" },
        { label: "Problems", value: "420" },
        { label: "Avg Time", value: "75 min" }
      ]
    }
  ];
  // All aptitude subtopics with additional metadata
  const allSubtopics = [
    // Quantitative Category
    {
      id: 1,
      name: "Arithmetic",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Easy",
      marks: 20,
      problems: 45,
      progress: 35,
      icon: Calculator,
      description: "Basic arithmetic operations, fractions, decimals, and percentages"
    },
    {
      id: 2,
      name: "Algebra",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Medium",
      marks: 20,
      problems: 52,
      progress: 28,
      icon: TrendingUp,
      description: "Equations, inequalities, polynomials, and algebraic expressions"
    },
    {
      id: 3,
      name: "Geometry",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Medium",
      marks: 20,
      problems: 38,
      progress: 42,
      icon: Shapes,
      description: "Plane geometry, coordinate geometry, and mensuration"
    },
    {
      id: 4,
      name: "Trigonometry",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Hard",
      marks: 20,
      problems: 30,
      progress: 15,
      icon: Target,
      description: "Trigonometric functions, identities, and equations"
    },
    {
      id: 5,
      name: "Number System",
      category: "Quantitative",
      type: "Concepts",
      difficulty: "Easy",
      marks: 20,
      problems: 40,
      progress: 65,
      icon: Hash,
      description: "Number properties, divisibility, and number theory"
    },
    {
      id: 6,
      name: "Probability",
      category: "Quantitative",
      type: "Concepts",
      difficulty: "Medium",
      marks: 20,
      problems: 35,
      progress: 38,
      icon: Percent,
      description: "Basic probability, permutations, and combinations"
    },
    {
      id: 7,
      name: "Permutations & Combinations",
      category: "Quantitative",
      type: "Concepts",
      difficulty: "Hard",
      marks: 20,
      problems: 28,
      progress: 22,
      icon: GitBranch,
      description: "Counting principles and arrangement problems"
    },
    {
      id: 8,
      name: "Data Interpretation",
      category: "Quantitative",
      type: "Concepts",
      difficulty: "Medium",
      marks: 20,
      problems: 48,
      progress: 55,
      icon: BarChart3,
      description: "Charts, graphs, tables, and data analysis"
    },
    {
      id: 9,
      name: "Percentages",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Easy",
      marks: 20,
      problems: 42,
      progress: 72,
      icon: Percent,
      description: "Percentage calculations and applications"
    },
    {
      id: 10,
      name: "Profit & Loss",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Easy",
      marks: 20,
      problems: 36,
      progress: 68,
      icon: TrendingUp,
      description: "Business mathematics and financial calculations"
    },
    {
      id: 11,
      name: "Simple & Compound Interest",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Medium",
      marks: 20,
      problems: 32,
      progress: 45,
      icon: TrendingUp,
      description: "Interest calculations and time value of money"
    },
    {
      id: 12,
      name: "Time, Speed & Distance",
      category: "Quantitative",
      type: "Formulas",
      difficulty: "Medium",
      marks: 20,
      problems: 44,
      progress: 50,
      icon: Clock,
      description: "Motion problems and relative speed"
    },

    // Logical Reasoning Category
    {
      id: 13,
      name: "Number Series",
      category: "Logical Reasoning",
      type: "Patterns",
      difficulty: "Easy",
      marks: 20,
      problems: 50,
      progress: 75,
      icon: Hash,
      description: "Identifying patterns in number sequences"
    },
    {
      id: 14,
      name: "Letter Series",
      category: "Logical Reasoning",
      type: "Patterns",
      difficulty: "Easy",
      marks: 20,
      problems: 45,
      progress: 70,
      icon: MessageSquare,
      description: "Pattern recognition in alphabet sequences"
    },
    {
      id: 15,
      name: "Analogies",
      category: "Logical Reasoning",
      type: "Relationships",
      difficulty: "Medium",
      marks: 20,
      problems: 40,
      progress: 58,
      icon: Brain,
      description: "Word relationships and comparisons"
    },
    {
      id: 16,
      name: "Blood Relations",
      category: "Logical Reasoning",
      type: "Relationships",
      difficulty: "Medium",
      marks: 20,
      problems: 35,
      progress: 62,
      icon: GitBranch,
      description: "Family tree and relationship puzzles"
    },
    {
      id: 17,
      name: "Direction Sense",
      category: "Logical Reasoning",
      type: "Spatial",
      difficulty: "Easy",
      marks: 20,
      problems: 38,
      progress: 80,
      icon: Target,
      description: "Direction and distance problems"
    },
    {
      id: 18,
      name: "Seating Arrangement",
      category: "Logical Reasoning",
      type: "Puzzles",
      difficulty: "Hard",
      marks: 20,
      problems: 42,
      progress: 40,
      icon: Puzzle,
      description: "Linear and circular arrangement puzzles"
    },
    {
      id: 19,
      name: "Puzzles",
      category: "Logical Reasoning",
      type: "Puzzles",
      difficulty: "Hard",
      marks: 20,
      problems: 55,
      progress: 35,
      icon: Puzzle,
      description: "Logical puzzles and brain teasers"
    },
    {
      id: 20,
      name: "Syllogism",
      category: "Logical Reasoning",
      type: "Deduction",
      difficulty: "Medium",
      marks: 20,
      problems: 32,
      progress: 55,
      icon: Brain,
      description: "Logical deductions from given statements"
    },
    {
      id: 21,
      name: "Logical Deduction",
      category: "Logical Reasoning",
      type: "Deduction",
      difficulty: "Hard",
      marks: 20,
      problems: 28,
      progress: 30,
      icon: Brain,
      description: "Complex logical reasoning problems"
    },
    {
      id: 22,
      name: "Data Sufficiency",
      category: "Logical Reasoning",
      type: "Analysis",
      difficulty: "Medium",
      marks: 20,
      problems: 48,
      progress: 65,
      icon: BarChart3,
      description: "Determining if given data is sufficient"
    },

    // Verbal Ability Category
    {
      id: 23,
      name: "Spotting Errors",
      category: "Verbal Ability",
      type: "Grammar",
      difficulty: "Easy",
      marks: 20,
      problems: 60,
      progress: 85,
      icon: SpellCheck,
      description: "Identifying grammatical errors in sentences"
    },
    {
      id: 24,
      name: "Synonyms",
      category: "Verbal Ability",
      type: "Vocabulary",
      difficulty: "Easy",
      marks: 20,
      problems: 55,
      progress: 90,
      icon: Book,
      description: "Words with similar meanings"
    },
    {
      id: 25,
      name: "Antonyms",
      category: "Verbal Ability",
      type: "Vocabulary",
      difficulty: "Easy",
      marks: 20,
      problems: 55,
      progress: 88,
      icon: Book,
      description: "Words with opposite meanings"
    },
    {
      id: 26,
      name: "Reading Comprehension",
      category: "Verbal Ability",
      type: "Comprehension",
      difficulty: "Medium",
      marks: 20,
      problems: 65,
      progress: 70,
      icon: Eye,
      description: "Understanding and analyzing passages"
    },
    {
      id: 27,
      name: "Sentence Correction",
      category: "Verbal Ability",
      type: "Grammar",
      difficulty: "Medium",
      marks: 20,
      problems: 52,
      progress: 75,
      icon: SpellCheck,
      description: "Correcting grammatical errors in sentences"
    },
    {
      id: 28,
      name: "Para Jumbles",
      category: "Verbal Ability",
      type: "Comprehension",
      difficulty: "Hard",
      marks: 20,
      problems: 45,
      progress: 60,
      icon: BookOpen,
      description: "Rearranging sentences into coherent paragraphs"
    },
    {
      id: 29,
      name: "Cloze Test",
      category: "Verbal Ability",
      type: "Vocabulary",
      difficulty: "Medium",
      marks: 20,
      problems: 48,
      progress: 72,
      icon: Book,
      description: "Filling blanks in passages with appropriate words"
    },
    {
      id: 30,
      name: "Idioms and Phrases",
      category: "Verbal Ability",
      type: "Vocabulary",
      difficulty: "Easy",
      marks: 20,
      problems: 40,
      progress: 82,
      icon: MessageSquare,
      description: "Common idioms and their meanings"
    },
  ];

  // Get unique categories for filter
  const categories = ["All", ...new Set(allSubtopics.map(t => t.category))];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Filter and sort subtopics
  const filteredSubtopics = useMemo(() => {
    let result = [...allSubtopics];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(subtopic =>
        subtopic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subtopic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subtopic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(subtopic => subtopic.category === selectedCategory);
    }

    // Apply topic filter
    if (selectedTopic !== "All Topics") {
      result = result.filter(subtopic => subtopic.name === selectedTopic);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "All") {
      result = result.filter(subtopic => subtopic.difficulty === selectedDifficulty);
    }

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "progress-desc":
        result.sort((a, b) => b.progress - a.progress);
        break;
      case "progress-asc":
        result.sort((a, b) => a.progress - b.progress);
        break;
      case "problems-desc":
        result.sort((a, b) => b.problems - a.problems);
        break;
      case "difficulty":
        const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
        result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      default:
        // Default: category then name
        result.sort((a, b) => {
          if (a.category === b.category) {
            return a.name.localeCompare(b.name);
          }
          return a.category.localeCompare(b.category);
        });
    }

    return result;
  }, [searchQuery, selectedCategory, selectedTopic, selectedDifficulty, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = allSubtopics.length;
    const completed = allSubtopics.filter(t => t.progress >= 100).length;
    const avgProgress = allSubtopics.reduce((sum, t) => sum + t.progress, 0) / total;
    const totalProblems = allSubtopics.reduce((sum, t) => sum + t.problems, 0);

    return { total, completed, avgProgress: Math.round(avgProgress), totalProblems };
  }, []);

  // Create filtered problems from subtopics
  const filteredProblems = useMemo(() => {
    return filteredSubtopics.map((subtopic, index) => ({
      id: subtopic.id,
      number: index + 1,
      name: subtopic.name,
      category: subtopic.category,
      topic: subtopic.name,
      difficulty: subtopic.difficulty,
      description: subtopic.description,
      icon: subtopic.icon,
      problems: subtopic.problems,
      progress: subtopic.progress
    }));
  }, [filteredSubtopics]);

  // Handle assessment start for overview cards
  const handleStartAssessment = (category) => {
    console.log(`Starting full assessment for: ${category}`);
    // Add your assessment logic here
  };

  // Handle subtopic click for practice
  const handlePractice = (subtopic) => {
    console.log(`Starting practice for: ${subtopic.name}`);
    // Add your practice logic here
  };

  // Handle view solution
  const handleViewSolution = (problem) => {
    console.log(`Viewing solution for: ${problem.name}`);
    // Add your solution view logic here
  };

  // Handle bookmark
  const handleBookmark = (problem) => {
    console.log(`Bookmarking: ${problem.name}`);
    // Add your bookmark logic here
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

  // Get overview card progress color
  const getCardProgressColor = (progress) => {
    if (progress >= 70) {
      return theme === 'dark' 
        ? "text-green-400 bg-green-500/20" 
        : "text-green-600 bg-green-100";
    }
    if (progress >= 40) {
      return theme === 'dark' 
        ? "text-yellow-400 bg-yellow-500/20" 
        : "text-yellow-600 bg-yellow-100";
    }
    return theme === 'dark' 
      ? "text-red-400 bg-red-500/20" 
      : "text-red-600 bg-red-100";
  };

 return (
    <div className={`min-h-screen pt-16 ${theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Aptitude Mastery Platform</h1>
          <p className={`text-muted ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Comprehensive preparation for quantitative, logical reasoning, and verbal ability</p>
        </div>

        {/* Overview Cards - Non-interactive summaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            const progressColor = getCardProgressColor(card.progress);

            return (
              <div
                key={card.id}
                className={`
                  rounded-xl p-6 border
                  shadow-sm hover:shadow-md transition-shadow duration-200
                  ${theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/70 border-gray-200/60'
                  }
                `}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.colorScheme.iconBg}`}>
                      <Icon className={`w-6 h-6 ${card.colorScheme.iconColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{card.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${theme === 'dark' ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-50'}`}>
                    {card.progress}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Overall Progress</span>
                    <span className={`font-semibold ${getProgressTextColor(card.progress)}`}>{card.progress}%</span>
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
                  {card.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleStartAssessment(card.title)}
                  className={`
                    w-full flex items-center justify-center gap-2
                    rounded-lg py-3 font-semibold text-white
                    bg-gradient-to-r ${card.colorScheme.gradient}
                    hover:opacity-90 active:scale-[0.98]
                    transition-all duration-200
                  `}
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
          <div className={`rounded-xl border p-6 ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20'
                : 'bg-gradient-to-br from-blue-100 to-green-100'
                }`}>
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.total}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Questions</div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-6 ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark'
                ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
                : 'bg-gradient-to-br from-green-100 to-emerald-100'
                }`}>
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.completed}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Completed</div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-6 ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark'
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                : 'bg-gradient-to-br from-purple-100 to-pink-100'
                }`}>
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.avgProgress}%</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy Rate</div>
              </div>
            </div>
          </div>
          <div className={`rounded-xl border p-6 ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark'
                ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
                : 'bg-gradient-to-br from-amber-100 to-orange-100'
                }`}>
                <Hash className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.totalProblems}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Topics Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Explorer Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Problems Explorer</h2>
            <p className={`text-muted ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Browse and practice aptitude questions by category and topic</p>
          </div>
          <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{stats.completed} solved</span>
            <span className="mx-2">•</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>{stats.total - stats.completed} unsolved</span>
          </div>
        </div>

        {/* Control Bar */}
        <div className={`rounded-xl border p-6 mb-8 ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, topics, or keywords..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Category Filter - Updated */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}`}
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

              {/* Topic Filter - Added */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}`}
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option value="All Topics">All Topics</option>
                  <option value="Algebra">Algebra</option>
                  <option value="Geometry">Geometry</option>
                  <option value="Arithmetic">Arithmetic</option>
                  <option value="Number Series">Number Series</option>
                  <option value="Data Interpretation">Data Interpretation</option>
                  <option value="Logical Puzzles">Logical Puzzles</option>
                  <option value="Verbal Reasoning">Verbal Reasoning</option>
                  <option value="Quantitative Comparison">Quantitative Comparison</option>
                  <option value="Percentages">Percentages</option>
                  <option value="Ratios & Proportions">Ratios & Proportions</option>
                  <option value="Time & Work">Time & Work</option>
                  <option value="Probability">Probability</option>
                  <option value="Permutations">Permutations</option>
                  <option value="Profit & Loss">Profit & Loss</option>
                </select>
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}`}
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

              {/* Sort By - Updated */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="question-asc">Sort: Question # (Asc)</option>
                  <option value="question-desc">Sort: Question # (Desc)</option>
                  <option value="name-asc">Sort: A-Z</option>
                  <option value="name-desc">Sort: Z-A</option>
                  <option value="difficulty">Sort: Difficulty</option>
                  <option value="category">Sort: Category</option>
                  <option value="topic">Sort: Topic</option>
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
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedTopic !== "All Topics" && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'}`}>
                  Topic: {selectedTopic}
                  <button onClick={() => setSelectedTopic("All Topics")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDifficulty !== "All" && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                  Difficulty: {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
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

        {/* Problems Table */}
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'}`}>
          {/* Table Header - Updated */}
          <div className={`hidden lg:grid grid-cols-12 gap-4 p-6 border-b ${theme === 'dark' ? 'border-white/10 bg-white/5 text-gray-300' : 'border-gray-100 bg-gray-50 text-gray-600'} text-sm font-semibold`}>
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Question</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Topic</div>
            <div className="col-span-1 text-center">Difficulty</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Problems List - Updated */}
          <div className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-100'}`}>
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => {
                const Icon = problem.icon || BookOpen;
                const isExpanded = expandedProblem === problem.id;

                return (
                  <div key={problem.id} className={`p-6 transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10 hover:backdrop-blur-md hover:shadow-lg hover:shadow-blue-500/10' : 'hover:bg-blue-50/30 hover:backdrop-blur-sm hover:shadow-md'}`}>
                    {/* Desktop View - Updated */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      {/* Question Number */}
                      <div className="col-span-1 text-center">
                        <div className={`font-bold text-lg ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>
                          {problem.number}
                        </div>
                      </div>
                      
                      {/* Question */}
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>
                              {problem.title}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-muted'}`}>
                              {problem.description.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Category */}
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                          {problem.category}
                        </span>
                      </div>
                      
                      {/* Topic */}
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full border text-sm ${theme === 'dark' ? 'border-green-500/30 bg-green-500/10 text-green-300' : 'border-green-200 bg-green-100 text-green-800'}`}>
                          {problem.topic}
                        </span>
                      </div>
                      
                      {/* Difficulty */}
                      <div className="col-span-1 text-center">
                        <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="col-span-2">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleSolveProblem(problem)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity text-sm"
                          >
                            Solve
                          </button>
                          <button
                            onClick={() => handleViewSolution(problem)}
                            className={`px-3 py-2 rounded-lg border ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} text-sm`}
                          >
                            Solution
                          </button>
                          <button
                            onClick={() => handleBookmark(problem)}
                            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'}`}
                          >
                            <Bookmark className={`w-4 h-4 ${problem.bookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile View - Updated */}
                    <div className="lg:hidden">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                            <div className={`font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>
                              #{problem.number}
                            </div>
                          </div>
                          <div>
                            <div className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>
                              {problem.title}
                            </div>
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-muted'}`}>
                              {problem.category} • {problem.topic}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleBookmark(problem)}
                          className="p-2"
                        >
                          <Bookmark className={`w-5 h-5 ${problem.bookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                          {problem.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'}`}>
                          {problem.topic}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {problem.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedProblem(isExpanded ? null : problem.id)}
                        className={`w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {isExpanded ? 'Show Less' : 'Show More'}
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className={`mt-4 p-4 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg`}>
                          <div className="flex justify-between items-center mb-3">
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              Problem Details
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              ID: {problem.id}
                            </div>
                          </div>
                          <div className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <strong>Type:</strong> {problem.type || 'Standard'} • 
                            <strong> Marks:</strong> {problem.marks || '1'} • 
                            <strong> Status:</strong> <span className={`font-medium ${problem.solved ? 'text-green-600' : 'text-amber-600'}`}>
                              {problem.solved ? 'Solved' : 'Unsolved'}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleSolveProblem(problem)}
                          className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
                        >
                          Solve Now
                        </button>
                        <button
                          onClick={() => handleViewSolution(problem)}
                          className="flex-1 py-3 rounded-lg border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                        >
                          View Solution
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <Search className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>No problems found</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSelectedTopic("All Topics");
                    setSearchQuery("");
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pagination - Added */}
        <div className="mt-6 flex items-center justify-between">
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {Math.min(filteredProblems.length, 1)}-{filteredProblems.length} of {filteredProblems.length} problems
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:bg-gray-700/50' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium">
              1
            </button>
            <button className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:bg-gray-700/50' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              2
            </button>
            <button className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:bg-gray-700/50' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              3
            </button>
            <button className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:bg-gray-700/50' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              Next
            </button>
          </div>
        </div>

        {/* Info Footer */}
        <div className={`mt-8 p-6 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-white'}`}>
                <Zap className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>Pro Tips for Success</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-muted'}`}>Practice daily, track progress, and focus on weak areas to improve faster.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className={`px-6 py-3 rounded-lg border font-medium transition-colors ${theme === 'dark' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-50'}`}>
                Export Questions
              </button>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity">
                Take Random Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aptitude;
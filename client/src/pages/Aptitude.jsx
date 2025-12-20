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
  CheckCircle
} from "lucide-react";

function Aptitude({ theme }) {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [expandedSubtopic, setExpandedSubtopic] = useState(null);

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
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = allSubtopics.length;
    const completed = allSubtopics.filter(t => t.progress >= 100).length;
    const avgProgress = allSubtopics.reduce((sum, t) => sum + t.progress, 0) / total;
    const totalProblems = allSubtopics.reduce((sum, t) => sum + t.problems, 0);

    return { total, completed, avgProgress: Math.round(avgProgress), totalProblems };
  }, []);

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

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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
    if (progress >= 70) return "text-green-600 bg-green-100";
    if (progress >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
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
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Topics</div>
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
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Progress</div>
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
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Problems</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Explorer Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Problem Explorer</h2>
            <p className={`text-muted ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Browse and practice all aptitude topics</p>
          </div>
          <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{stats.completed} completed</span>
            <span className="mx-2">•</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>{stats.total - stats.completed} remaining</span>
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
                placeholder="Search topics, categories, or keywords..."
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
              {/* Category Filter */}
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

              {/* Sort By */}
              <div className="relative">
                <select
                  className={`appearance-none pl-10 pr-8 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="name-asc">Sort: A-Z</option>
                  <option value="name-desc">Sort: Z-A</option>
                  <option value="progress-desc">Sort: Progress (High to Low)</option>
                  <option value="progress-asc">Sort: Progress (Low to High)</option>
                  <option value="problems-desc">Sort: Problems (High to Low)</option>
                  <option value="difficulty">Sort: Difficulty</option>
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
          {(selectedCategory !== "All" || selectedDifficulty !== "All" || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== "All" && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
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
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
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
                  setSearchQuery("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Topics Table/Grid */}
        <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-blue-100'}`}>
          {/* Table Header */}
          <div className={`hidden lg:grid grid-cols-12 gap-4 p-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50 text-gray-300' : 'border-gray-100 bg-gray-50 text-gray-600'} text-sm font-semibold`}>
            <div className="col-span-4">Topic</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-1 text-center">Problems</div>
            <div className="col-span-2 text-center">Progress</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Topics List */}
          <div className="divide-y divide-gray-100">
            {filteredSubtopics.length > 0 ? (
              filteredSubtopics.map((subtopic) => {
                const Icon = subtopic.icon;
                const isExpanded = expandedSubtopic === subtopic.id;

                return (
                  <div key={subtopic.id} className={`p-6 transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/5 hover:backdrop-blur-md hover:shadow-lg hover:shadow-blue-500/10' : 'hover:bg-blue-50/30 hover:backdrop-blur-sm hover:shadow-md'}`}>
                    {/* Desktop View */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-primary">{subtopic.name}</div>
                            <div className="text-sm text-muted">{subtopic.description}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                          {subtopic.category}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(subtopic.difficulty)}`}>
                          {subtopic.difficulty}
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <div className="font-semibold text-primary">{subtopic.problems}</div>
                        <div className="text-xs text-muted">problems</div>
                      </div>
                      <div className="col-span-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className={`font-semibold ${getProgressTextColor(subtopic.progress)}`}>
                              {subtopic.progress}%
                            </span>
                          </div>
                          <div className={`w-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                            <div
                              className={`h-full ${getProgressColor(subtopic.progress)} rounded-full transition-all duration-500`}
                              style={{ width: `${subtopic.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => handlePractice(subtopic)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
                        >
                          Practice
                        </button>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-primary">{subtopic.name}</div>
                            <div className="text-sm text-muted">{subtopic.category}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedSubtopic(isExpanded ? null : subtopic.id)}
                          className="p-2"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(subtopic.difficulty)}`}>
                          {subtopic.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                          {subtopic.type}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
                          {subtopic.problems} problems
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Progress</span>
                          <span className={`font-semibold ${getProgressTextColor(subtopic.progress)}`}>
                            {subtopic.progress}%
                          </span>
                        </div>
                        <div className={`w-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div
                            className={`h-full ${getProgressColor(subtopic.progress)} rounded-full transition-all duration-500`}
                            style={{ width: `${subtopic.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className={`mt-4 p-4 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg`}>
                          <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{subtopic.description}</p>
                          <div className="flex justify-between items-center">
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              {subtopic.marks} marks • {subtopic.type}
                            </div>
                            <button
                              onClick={() => handlePractice(subtopic)}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
                            >
                              Start Practice
                            </button>
                          </div>
                        </div>
                      )}

                      {!isExpanded && (
                        <button
                          onClick={() => handlePractice(subtopic)}
                          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
                        >
                          Practice Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No topics found</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className={`mt-8 p-6 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-white/10' : 'bg-white'}`}>
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">Pro Tips for Success</h4>
                <p className="text-sm text-muted">Practice daily, track progress, and focus on weak areas to improve faster.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className={`px-6 py-3 rounded-lg border font-medium transition-colors ${theme === 'dark' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-50'}`}>
                Download Study Plan
              </button>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity">
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
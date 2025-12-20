import { useState } from "react";
import { Play, Clock, ChevronDown } from "lucide-react";
import SubtopicCard from "../components/SubtopicCard";

function Aptitude() {
  const [expandedCard, setExpandedCard] = useState(null);

  const topics = [
    {
      title: "Quantitative",
      description: "Algebra, arithmetic, data interpretation, and geometry problems.",
      icon: "🧮",
      progress: 35, // Less than 40% - red
      subtopics: [
        { name: "Arithmetic", type: "Formulas", marks: "20 Marks" },
        { name: "Algebra", type: "Formulas", marks: "20 Marks" },
        { name: "Geometry", type: "Formulas", marks: "20 Marks" },
        { name: "Trigonometry", type: "Formulas", marks: "20 Marks" },
        { name: "Number System", type: "Concepts", marks: "20 Marks" },
        { name: "Probability", type: "Concepts", marks: "20 Marks" },
        { name: "Permutations & Combinations", type: "Concepts", marks: "20 Marks" },
        { name: "Data Interpretation", type: "Concepts", marks: "20 Marks" },
        { name: "Percentages", type: "Formulas", marks: "20 Marks" },
        { name: "Profit & Loss", type: "Formulas", marks: "20 Marks" },
        { name: "Simple & Compound Interest", type: "Formulas", marks: "20 Marks" },
        { name: "Time, Speed & Distance", type: "Formulas", marks: "20 Marks" },
      ],
    },
    {
      title: "Logical Reasoning",
      description: "Pattern recognition, puzzles, and analytical reasoning.",
      icon: "🧩",
      progress: 65, // 40-70% - orange
      subtopics: [
        { name: "Number Series", type: "Concepts", marks: "20 Marks" },
        { name: "Letter Series", type: "Concepts", marks: "20 Marks" },
        { name: "Analogies", type: "Concepts", marks: "20 Marks" },
        { name: "Blood Relations", type: "Concepts", marks: "20 Marks" },
        { name: "Direction Sense", type: "Concepts", marks: "20 Marks" },
        { name: "Seating Arrangement", type: "Concepts", marks: "20 Marks" },
        { name: "Puzzles", type: "Concepts", marks: "20 Marks" },
        { name: "Syllogism", type: "Concepts", marks: "20 Marks" },
        { name: "Logical Deduction", type: "Concepts", marks: "20 Marks" },
        { name: "Data Sufficiency", type: "Concepts", marks: "20 Marks" },
        { name: "Statement & Assumptions", type: "Concepts", marks: "20 Marks" },
        { name: "Statement & Conclusions", type: "Concepts", marks: "20 Marks" },
      ],
    },
    {
      title: "Verbal Ability",
      description: "Reading comprehension, grammar, vocabulary and communication skills.",
      icon: "📚",
      progress: 85, // More than 70% - green
      subtopics: [
        { name: "Spotting Errors", type: "Concepts", marks: "20 Marks" },
        { name: "Synonyms", type: "Concepts", marks: "20 Marks" },
        { name: "Antonyms", type: "Concepts", marks: "20 Marks" },
        { name: "Selecting Words", type: "Concepts", marks: "20 Marks" },
        { name: "Spellings", type: "Concepts", marks: "20 Marks" },
        { name: "Sentence Formation", type: "Concepts", marks: "20 Marks" },
        { name: "Ordering of Words", type: "Concepts", marks: "20 Marks" },
        { name: "Sentence Correction", type: "Concepts", marks: "20 Marks" },
        { name: "Sentence Improvement", type: "Concepts", marks: "20 Marks" },
        { name: "Completing Statements", type: "Concepts", marks: "20 Marks" },
        { name: "Ordering of Sentences", type: "Concepts", marks: "20 Marks" },
        { name: "Paragraph Formation", type: "Concepts", marks: "20 Marks" },
        { name: "Cloze Test", type: "Concepts", marks: "20 Marks" },
        { name: "Comprehension", type: "Concepts", marks: "20 Marks" },
        { name: "One Word Substitutes", type: "Concepts", marks: "20 Marks" },
        { name: "Idioms and Phrases", type: "Concepts", marks: "20 Marks" },
        { name: "Change of Voice", type: "Concepts", marks: "20 Marks" },
        { name: "Change of Speech", type: "Concepts", marks: "20 Marks" },
        { name: "Verbal Analogies", type: "Concepts", marks: "20 Marks" },
      ],
    },
  ];

  // Function to get progress bar color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage < 40) {
      return {
        bar: "bg-red-500",
        text: "text-red-600",
        bg: "bg-red-100"
      };
    } else if (percentage >= 40 && percentage <= 70) {
      return {
        bar: "bg-amber-500",
        text: "text-amber-600",
        bg: "bg-amber-100"
      };
    } else {
      return {
        bar: "bg-green-500",
        text: "text-green-600",
        bg: "bg-green-100"
      };
    }
  };

  // All cards use blue color scheme
  const blueStyles = {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-200",
    hover: "hover:border-blue-300",
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-100/80",
  };

  const handleCardClick = (index, event) => {
    // Don't expand if clicking on button
    if (event.target.closest('button')) return;
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleTakeAssessment = (topicTitle, subtopicName) => {
    console.log(`Starting assessment: ${topicTitle} - ${subtopicName}`);
    // Add your assessment logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Cards Container */}
        <div className="space-y-8">
          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 min-h-[420px] flex flex-col md:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const isExpanded = expandedCard === index;
              const progressColor = getProgressColor(topic.progress);

              return (
                <div
                  key={index}
                  onClick={(e) => handleCardClick(index, e)}
                  className={`
                    relative rounded-xl p-6
                    flex flex-col
                    ${blueStyles.bg}
                    border-2 ${blueStyles.border}
                    shadow-sm
                    transition-all duration-200 ease-out
                    hover:shadow-md ${blueStyles.hover}
                    cursor-pointer
                    ${isExpanded ? 'shadow-lg border-blue-300' : ''}
                  `}
                >
                  {/* Card Content */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Header with icon */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`
                          w-12 h-12 rounded-lg ${blueStyles.iconBg}
                          flex items-center justify-center text-xl
                        `}>
                          {topic.icon}
                        </div>
                        <div>
                          <h3 className="text-xl mt-100 font-bold text-primary">
                            {topic.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted text-sm mb-4">
                        {topic.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-6 p-3 rounded-lg bg-white/60 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted" />
                          <span className="text-sm font-medium text-primary">
                            {topic.title === "Verbal Ability" ? "75 min" :
                              topic.title === "Quantitative" ? "60 min" : "45 min"}
                          </span>
                        </div>
                        <div className="text-sm text-muted">
                          {topic.subtopics.length} Topics
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-lg
                      bg-white/80 transition-all duration-200
                      ${isExpanded ? 'rotate-180' : ''}
                    `}>
                      <ChevronDown className="w-5 h-5 text-muted" />
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-6 space-y-4">
                    {/* Progress Bar with Conditional Coloring */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className={`font-medium ${progressColor.text}`}>
                          Progress
                        </span>
                        <span className={`font-semibold ${progressColor.text}`}>
                          {topic.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${progressColor.bar} rounded-full transition-all duration-500`}
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      {/* Progress Label */}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Beginner</span>
                        <span className="text-xs text-gray-500">Intermediate</span>
                        <span className="text-xs text-gray-500">Advanced</span>
                      </div>
                    </div>

                    {/* What you'll learn */}
                    <ul className="list-disc ml-4 text-sm text-muted space-y-1">
                      <li>Improve calculation speed</li>
                      <li>Understand shortcuts & tricks</li>
                      <li>Boost exam confidence</li>
                    </ul>
                  </div>

                  {/* Button - Only show if not expanded */}
                  {!isExpanded && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTakeAssessment(topic.title, 'Full Assessment');
                      }}
                      className={`
                        mt-6 w-full flex items-center justify-center gap-2
                        rounded-lg py-3 font-semibold text-white
                        bg-gradient-to-r ${blueStyles.gradient}
                        hover:opacity-90 active:scale-[0.98]
                        transition-all duration-200
                      `}
                    >
                      <Play className="w-4 h-4" />
                      Start Assessment
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expanded Subtopics Section - Full Width Below Cards */}
          {expandedCard !== null && (
            <div className="
              overflow-hidden
              animate-slideDown
              bg-white rounded-xl border border-blue-100 shadow-lg p-6
            ">
              {/* Section Header */}
              <div className="mb-6 pb-4 border-b border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`
                    w-10 h-10 rounded-lg ${blueStyles.iconBg}
                    flex items-center justify-center text-lg
                  `}>
                    {topics[expandedCard].icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary">
                      {topics[expandedCard].title} Subtopics
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted ml-[52px]">
                  Practice {topics[expandedCard].subtopics.length} topics with focused assessments
                </p>
              </div>

              {/* Subtopics Grid */}
              <div className="
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                gap-4
              ">
                {topics[expandedCard].subtopics.map((subtopic, subIndex) => (
                  <SubtopicCard
                    key={subIndex}
                    name={subtopic.name}
                    type={subtopic.type}
                    marks={subtopic.marks}
                    onTakeAssessment={() => handleTakeAssessment(topics[expandedCard].title, subtopic.name)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Aptitude;
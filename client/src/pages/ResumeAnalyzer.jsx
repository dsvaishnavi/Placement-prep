// components/ResumeAnalyzer.jsx
import React, { useState, useCallback, useMemo } from 'react';

/**
 * ResumeAnalyzer Component
 * 
 * A professional resume analysis tool with ATS simulation, scoring, and improvement suggestions.
 * Features:
 * - Drag & drop file upload
 * - ATS scoring with visual indicators
 * - Detailed issues analysis
 * - Resume templates gallery
 * - Skill matching and missing sections detection
 * - Placement readiness tips
 * 
 * Note: Currently uses static dummy data. Structured for easy backend integration.
 */

// Subcomponent: File Upload Area
const ResumeUploadArea = ({ onFileUpload, isDragging, setIsDragging }) => {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload, setIsDragging]);

  const handleFileInput = useCallback((e) => {
    if (e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  }, [onFileUpload]);

  return (
    <section aria-labelledby="upload-heading" className="mb-10">
      <h2 id="upload-heading" className="text-2xl font-bold text-gray-800 mb-4">
        Upload Your Resume
      </h2>
      <div
        className={`border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} rounded-2xl p-8 text-center transition-all duration-300 hover:border-blue-400`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Drag & drop your resume here
          </h3>
          <p className="text-gray-500 mb-6">Supports PDF, DOCX, and DOC files (Max 5MB)</p>
          <div className="relative">
            <input
              type="file"
              id="resume-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              aria-label="Upload resume file"
            />
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Browse Files
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            By uploading, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </section>
  );
};

// Subcomponent: Resume Score Display
const ResumeScoreDisplay = ({ score = 0 }) => {
  const scoreColor = useMemo(() => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }, [score]);

  const scoreRingColor = useMemo(() => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-yellow-500';
    return 'stroke-red-500';
  }, [score]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">ATS Score</h3>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Score circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeLinecap="round"
              className={scoreRingColor}
              strokeWidth="8"
              strokeDasharray={`${score * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${scoreColor}`}>
              {score}
            </span>
            <span className="text-gray-500">out of 100</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-600">
          {score >= 80 ? 'Excellent! Your resume is ATS-friendly' :
           score >= 60 ? 'Good, but needs improvements' :
           'Needs significant improvements'}
        </p>
      </div>
    </div>
  );
};

// Subcomponent: Analysis Categories
const AnalysisCategory = ({ title, score, issues, suggestions }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        score >= 80 ? 'bg-green-100 text-green-800' :
        score >= 60 ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {score}/100
      </span>
    </div>
    {issues.length > 0 && (
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Issues Found:</h5>
        <ul className="space-y-1">
          {issues.map((issue, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-600">
              <span className="text-red-500 mr-2 mt-0.5">•</span>
              {issue}
            </li>
          ))}
        </ul>
      </div>
    )}
    {suggestions.length > 0 && (
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-2">Suggestions:</h5>
        <ul className="space-y-1">
          {suggestions.map((suggestion, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-600">
              <span className="text-green-500 mr-2 mt-0.5">✓</span>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

// Subcomponent: Resume Template Card
const TemplateCard = ({ template, isSelected, onSelect }) => (
  <div
    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => onSelect(template.id)}
    role="button"
    tabIndex={0}
    aria-label={`Select ${template.name} template`}
    onKeyPress={(e) => e.key === 'Enter' && onSelect(template.id)}
  >
    <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        {/* Template preview placeholder */}
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded"></div>
          <span className="text-sm">Template Preview</span>
        </div>
      </div>
    </div>
    <h4 className="font-semibold text-gray-800 mb-1">{template.name}</h4>
    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-blue-600">{template.category}</span>
      <span className="text-xs px-2 py-1 bg-gray-100 rounded">{template.pages} page</span>
    </div>
  </div>
);

// Subcomponent: Skill Match Indicator
const SkillMatchIndicator = ({ skill, matchPercentage, isRequired }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center">
      <span className="font-medium text-gray-800 mr-3">{skill}</span>
      {isRequired && (
        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Required</span>
      )}
    </div>
    <div className="flex items-center">
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
        <div
          className={`h-full rounded-full ${
            matchPercentage >= 80 ? 'bg-green-500' :
            matchPercentage >= 50 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${matchPercentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 w-10 text-right">
        {matchPercentage}%
      </span>
    </div>
  </div>
);

// Main Component
const ResumeAnalyzer = () => {
  // State Management
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [analysisResults] = useState({
    overallScore: 72,
    categories: [
      {
        id: 'keywords',
        title: 'Keywords Optimization',
        score: 65,
        issues: ['Missing industry-specific keywords', 'Limited action verbs'],
        suggestions: ['Add keywords: "Agile", "React", "Node.js"', 'Use stronger action verbs']
      },
      {
        id: 'formatting',
        title: 'Formatting & Structure',
        score: 85,
        issues: ['Inconsistent bullet point formatting'],
        suggestions: ['Use consistent bullet styles', 'Improve section spacing']
      },
      {
        id: 'sections',
        title: 'Required Sections',
        score: 70,
        issues: ['Missing summary section', 'No projects section'],
        suggestions: ['Add professional summary', 'Include 2-3 relevant projects']
      },
      {
        id: 'tailoring',
        title: 'Job Tailoring',
        score: 68,
        issues: ['Not customized for target role'],
        suggestions: ['Customize for Frontend Developer role', 'Highlight relevant experience']
      }
    ],
    skillMatches: [
      { skill: 'React.js', matchPercentage: 85, isRequired: true },
      { skill: 'JavaScript', matchPercentage: 90, isRequired: true },
      { skill: 'TypeScript', matchPercentage: 60, isRequired: false },
      { skill: 'Tailwind CSS', matchPercentage: 75, isRequired: false },
      { skill: 'Node.js', matchPercentage: 45, isRequired: false }
    ],
    missingSections: ['Professional Summary', 'Projects', 'Certifications', 'Volunteer Experience'],
    placementTips: [
      'Quantify achievements with metrics (e.g., "Improved performance by 30%")',
      'Keep resume to 1-2 pages maximum',
      'Use industry-specific keywords from job description',
      'Include 3-4 bullet points per position',
      'Add links to GitHub/Live projects'
    ]
  });

  // Dummy data for templates
  const templates = [
    { id: 'modern', name: 'Modern Professional', description: 'Clean, contemporary design for tech roles', category: 'Popular', pages: 1 },
    { id: 'executive', name: 'Executive', description: 'Formal layout for senior positions', category: 'Professional', pages: 2 },
    { id: 'creative', name: 'Creative', description: 'For design and creative roles', category: 'Creative', pages: 1 },
    { id: 'minimal', name: 'Minimalist', description: 'Simple and elegant', category: 'Minimal', pages: 1 }
  ];

  // Event Handlers
  const handleFileUpload = useCallback((file) => {
    console.log('File uploaded:', file.name);
    setUploadedFile(file);
    // In production: Here you would make API call to backend for analysis
  }, []);

  const handleTemplateSelect = useCallback((templateId) => {
    setSelectedTemplate(templateId);
    console.log('Template selected:', templateId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Resume Analyzer & ATS Checker
          </h1>
          <p className="text-gray-600 mt-2">
            Get your resume ATS-ready with AI-powered analysis and improvement suggestions
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Upload Section */}
        <ResumeUploadArea
          onFileUpload={handleFileUpload}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />

        {uploadedFile && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-blue-800">
                Uploaded: {uploadedFile.name}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Score & Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Score & Quick Stats */}
            <section aria-labelledby="score-heading">
              <h2 id="score-heading" className="text-2xl font-bold text-gray-800 mb-6">
                Analysis Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ResumeScoreDisplay score={analysisResults.overallScore} />
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">ATS Compatibility</span>
                        <span className="text-sm font-medium text-gray-700">
                          {analysisResults.overallScore >= 70 ? 'Good' : 'Needs Work'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${analysisResults.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-100">
                      <span className="text-gray-700">Issues Found</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                        {analysisResults.categories.reduce((acc, cat) => acc + cat.issues.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-100">
                      <span className="text-gray-700">Suggestions</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                        {analysisResults.categories.reduce((acc, cat) => acc + cat.suggestions.length, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Analysis Categories */}
            <section aria-labelledby="detailed-analysis-heading">
              <div className="flex justify-between items-center mb-6">
                <h2 id="detailed-analysis-heading" className="text-2xl font-bold text-gray-800">
                  Detailed Analysis
                </h2>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                  View Full Report →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysisResults.categories.map((category) => (
                  <AnalysisCategory key={category.id} {...category} />
                ))}
              </div>
            </section>

            {/* Skill Matching Section */}
            <section aria-labelledby="skill-matching-heading" className="bg-white rounded-xl shadow-md p-6">
              <h2 id="skill-matching-heading" className="text-2xl font-bold text-gray-800 mb-6">
                Skill Matching
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Target Role: Frontend Developer</span>
                  <span>Match Score: 71%</span>
                </div>
                <div className="space-y-1">
                  {analysisResults.skillMatches.map((skill, index) => (
                    <SkillMatchIndicator key={index} {...skill} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Templates & Tips */}
          <div className="space-y-8">
            {/* Resume Templates */}
            <section aria-labelledby="templates-heading" className="bg-white rounded-xl shadow-md p-6">
              <h2 id="templates-heading" className="text-2xl font-bold text-gray-800 mb-6">
                Resume Templates
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate === template.id}
                    onSelect={handleTemplateSelect}
                  />
                ))}
              </div>
              <button className="w-full mt-6 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                View All Templates
              </button>
            </section>

            {/* Missing Sections */}
            <section aria-labelledby="missing-sections-heading" className="bg-white rounded-xl shadow-md p-6">
              <h2 id="missing-sections-heading" className="text-2xl font-bold text-gray-800 mb-6">
                Missing Sections
              </h2>
              <div className="space-y-3">
                {analysisResults.missingSections.map((section, index) => (
                  <div key={index} className="flex items-center p-3 bg-red-50 border border-red-100 rounded-lg">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="font-medium text-gray-800">{section}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Placement Readiness Tips */}
            <section aria-labelledby="tips-heading" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-6">
              <h2 id="tips-heading" className="text-2xl font-bold text-gray-800 mb-6">
                Placement Readiness Tips
              </h2>
              <div className="space-y-4">
                {analysisResults.placementTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-blue-100">
                <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Generate Improvement Plan
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-12 text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
          <p className="mb-6 opacity-90">
            Get personalized suggestions and increase your interview chances by 3x
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Download Analysis Report
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Try Premium Features
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Resume Analyzer. For educational purposes.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeAnalyzer;
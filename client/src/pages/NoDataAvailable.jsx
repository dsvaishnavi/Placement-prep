import { useNavigate, useLocation } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";

function NoDataAvailable({ theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic, category } = location.state || {};

  return (
    <div className={`min-h-screen pt-16 flex items-center justify-center ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
    }`}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className={`rounded-xl border p-8 text-center ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
        }`}>
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'
          }`}>
            <AlertCircle className={`w-10 h-10 ${
              theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
            }`} />
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            No Data Available
          </h1>

          {/* Message */}
          <p className={`text-lg mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {topic && `No questions available for "${topic}" topic.`}
            {category && !topic && `No questions available for "${category}" category.`}
            {!topic && !category && 'No questions available for this selection.'}
          </p>

          <p className={`text-sm mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            This topic is currently being prepared. Please check back later or try another topic.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-medium transition-colors ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={() => navigate('/aptitude')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-medium transition-colors ${
                theme === 'dark'
                  ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                  : 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <Home className="w-4 h-4" />
              Browse All Topics
            </button>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Additional Info */}
          <div className={`mt-8 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
            }`}>
              <strong>Tip:</strong> While this topic is being prepared, you can explore other available topics or take a comprehensive exam covering multiple topics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoDataAvailable;

# System Architecture - Aptitude Exam System

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Aptitude   │  │ AptitudeExam │  │    Admin     │      │
│  │   Page       │  │    Page      │  │    Panel     │      │
│  │              │  │              │  │              │      │
│  │ - Browse     │  │ - Take Exam  │  │ - Add Qs     │      │
│  │ - Filter     │  │ - Timer      │  │ - Edit Qs    │      │
│  │ - Search     │  │ - Submit     │  │ - Publish    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          │    HTTP/HTTPS    │                  │
          │    (Axios)       │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (Express.js)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Public Routes (No Auth)                │     │
│  ├────────────────────────────────────────────────────┤     │
│  │ GET  /aptitude/public/questions                     │     │
│  │ GET  /aptitude/public/exam                          │     │
│  │ GET  /aptitude/public/stats                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Protected Routes (Admin/Content Mgr)        │     │
│  ├────────────────────────────────────────────────────┤     │
│  │ GET    /aptitude/                                   │     │
│  │ GET    /aptitude/:id                                │     │
│  │ POST   /aptitude/                                   │     │
│  │ PUT    /aptitude/:id                                │     │
│  │ DELETE /aptitude/:id                                │     │
│  │ GET    /aptitude/stats/overview                     │     │
│  │ PATCH  /aptitude/bulk/status                        │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ Mongoose ODM
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │           AptitudeQuestion Collection               │     │
│  ├────────────────────────────────────────────────────┤     │
│  │ - questionNumber (auto-generated)                   │     │
│  │ - question (text)                                   │     │
│  │ - options (A, B, C, D)                              │     │
│  │ - correctAnswer (A/B/C/D)                           │     │
│  │ - difficulty (Easy/Medium/Hard)                     │     │
│  │ - category (Quantitative/Logical/Verbal/Non-verbal)│     │
│  │ - topic (string)                                    │     │
│  │ - solution (text, optional)                         │     │
│  │ - status (Draft/Published)                          │     │
│  │ - createdBy (User ref)                              │     │
│  │ - updatedBy (User ref)                              │     │
│  │ - tags (array)                                      │     │
│  │ - isActive (boolean)                                │     │
│  │ - timestamps (createdAt, updatedAt)                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagrams

### 1. Browse Questions Flow

```
User Opens Aptitude Page
         │
         ▼
┌────────────────────┐
│  Aptitude.jsx      │
│  useEffect()       │
└────────┬───────────┘
         │
         │ fetchQuestions()
         ▼
┌────────────────────┐
│  axios.get()       │
│  /public/questions │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  API Route         │
│  aptitudeRouter.js │
└────────┬───────────┘
         │
         │ AptitudeQuestion.find()
         ▼
┌────────────────────┐
│  MongoDB           │
│  Filter: Published │
└────────┬───────────┘
         │
         │ Return Questions
         ▼
┌────────────────────┐
│  Aptitude.jsx      │
│  setQuestions()    │
└────────┬───────────┘
         │
         ▼
Display Questions with Filters
```

### 2. Take Exam Flow

```
User Clicks "Start Exam"
         │
         ▼
┌────────────────────┐
│  navigate()        │
│  /aptitude-exam    │
│  state: {category} │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  AptitudeExam.jsx  │
│  useEffect()       │
└────────┬───────────┘
         │
         │ fetchExamQuestions()
         ▼
┌────────────────────┐
│  axios.get()       │
│  /public/exam      │
│  params: category  │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  API Route         │
│  aptitudeRouter.js │
└────────┬───────────┘
         │
         │ AptitudeQuestion.aggregate()
         │ $sample (random selection)
         ▼
┌────────────────────┐
│  MongoDB           │
│  Random Questions  │
└────────┬───────────┘
         │
         │ Return Questions
         ▼
┌────────────────────┐
│  AptitudeExam.jsx  │
│  setQuestions()    │
│  Start Timer       │
└────────┬───────────┘
         │
         ▼
User Answers Questions
         │
         ▼
Submit or Timer Expires
         │
         ▼
Calculate Results (Frontend)
         │
         ▼
Display Results Screen
```

### 3. Admin Add Question Flow

```
Admin Opens Admin Panel
         │
         ▼
Click "Add Question"
         │
         ▼
Fill Question Form
         │
         ▼
┌────────────────────┐
│  Submit Form       │
└────────┬───────────┘
         │
         │ axios.post()
         │ /aptitude/
         │ + JWT Token
         ▼
┌────────────────────┐
│  Auth Middleware   │
│  Verify Token      │
│  Check Role        │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  API Route         │
│  aptitudeRouter.js │
│  POST /            │
└────────┬───────────┘
         │
         │ Validate Data
         │ Create Question
         ▼
┌────────────────────┐
│  MongoDB           │
│  Insert Document   │
│  Auto-generate #   │
└────────┬───────────┘
         │
         │ Return Created Question
         ▼
┌────────────────────┐
│  Admin Panel       │
│  Show Success      │
│  Refresh List      │
└────────────────────┘
```

## 🔐 Authentication & Authorization

```
┌─────────────────────────────────────────────────────────┐
│                    Request Flow                          │
└─────────────────────────────────────────────────────────┘

Public Routes (No Auth)
├── /aptitude/public/questions
├── /aptitude/public/exam
└── /aptitude/public/stats

Protected Routes (Auth Required)
├── /aptitude/                    [Admin, Content Manager]
├── /aptitude/:id                 [Admin, Content Manager]
├── /aptitude/ (POST)             [Admin, Content Manager]
├── /aptitude/:id (PUT)           [Admin, Content Manager]
├── /aptitude/:id (DELETE)        [Admin, Content Manager]
├── /aptitude/stats/overview      [Admin, Content Manager]
└── /aptitude/bulk/status         [Admin, Content Manager]

Middleware Chain:
Request → auth() → requireRole() → Route Handler
           │         │
           │         └─ Check user.role
           └─ Verify JWT Token
```

## 📊 Component Hierarchy

```
App.jsx
├── Navbar
├── Routes
│   ├── /aptitude
│   │   └── Aptitude.jsx
│   │       ├── Overview Cards (Category Stats)
│   │       ├── Stats Dashboard
│   │       ├── Control Bar (Search & Filters)
│   │       └── Topics List
│   │
│   ├── /aptitude-exam
│   │   └── AptitudeExam.jsx
│   │       ├── Pre-Exam Screen
│   │       ├── Exam Interface
│   │       │   ├── Header (Timer, Flag)
│   │       │   ├── Question Display
│   │       │   ├── Options
│   │       │   ├── Navigation
│   │       │   └── Question Navigator
│   │       └── Results Screen
│   │
│   └── /admin
│       └── Admin.jsx
│           └── Aptitude Questions Tab
│               ├── Question List
│               ├── Add Question Form
│               ├── Edit Question Form
│               └── Statistics
│
└── Footer
```

## 🗄️ Database Schema Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    User Collection                       │
├─────────────────────────────────────────────────────────┤
│ _id: ObjectId                                            │
│ name: String                                             │
│ email: String                                            │
│ password: String (hashed)                                │
│ role: String (admin/content-manager/user)                │
│ isActive: Boolean                                        │
│ emailVerified: Boolean                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Referenced by
                     │
┌────────────────────▼────────────────────────────────────┐
│              AptitudeQuestion Collection                 │
├─────────────────────────────────────────────────────────┤
│ _id: ObjectId                                            │
│ questionNumber: Number (auto-generated)                  │
│ question: String                                         │
│ options: { A, B, C, D }                                  │
│ correctAnswer: String                                    │
│ difficulty: String                                       │
│ category: String                                         │
│ topic: String                                            │
│ solution: String                                         │
│ status: String (Draft/Published)                         │
│ createdBy: ObjectId → User._id                           │
│ updatedBy: ObjectId → User._id                           │
│ tags: [String]                                           │
│ isActive: Boolean                                        │
│ createdAt: Date                                          │
│ updatedAt: Date                                          │
└─────────────────────────────────────────────────────────┘
```

## 🔍 Query Patterns

### 1. Get Published Questions
```javascript
AptitudeQuestion.find({
  isActive: true,
  status: 'Published'
})
```

### 2. Get Random Exam Questions
```javascript
AptitudeQuestion.aggregate([
  { $match: { isActive: true, status: 'Published', category: 'Quantitative' } },
  { $sample: { size: 20 } }
])
```

### 3. Get Category Statistics
```javascript
AptitudeQuestion.aggregate([
  { $match: { isActive: true, status: 'Published' } },
  { $group: { _id: '$category', count: { $sum: 1 } } }
])
```

## 🎯 State Management

### Aptitude.jsx State
```javascript
{
  questions: [],              // All fetched questions
  loading: true,              // Loading state
  error: null,                // Error message
  searchQuery: "",            // Search filter
  selectedCategory: "All",    // Category filter
  selectedDifficulty: "All",  // Difficulty filter
  selectedTopic: "All Topics",// Topic filter
  sortBy: "default",          // Sort criteria
  expandedProblem: null       // Expanded question ID
}
```

### AptitudeExam.jsx State
```javascript
{
  questions: [],              // Exam questions
  loading: true,              // Loading state
  currentQuestionIndex: 0,    // Current question
  answers: {},                // User answers { index: option }
  flagged: Set(),             // Flagged question indices
  timeRemaining: null,        // Timer in seconds
  examStarted: false,         // Exam started flag
  examCompleted: false,       // Exam completed flag
  showResults: false,         // Show results screen
  error: null                 // Error message
}
```

## 🚀 Performance Optimizations

### Frontend
- `useMemo` for expensive computations (filtering, sorting)
- Lazy loading for routes
- Debounced search input
- Optimized re-renders

### Backend
- Database indexes on frequently queried fields
- Aggregation pipeline for statistics
- Selective field projection
- Connection pooling

### Database Indexes
```javascript
// Compound index for common queries
{ topic: 1, difficulty: 1, status: 1, category: 1 }

// Index for sorting
{ createdAt: -1 }

// Unique index
{ questionNumber: 1 }
```

## 🔄 Future Enhancements Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Future Components                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ExamResult Collection                                   │
│  ├── userId                                              │
│  ├── examId                                              │
│  ├── questions (array of question IDs)                   │
│  ├── answers (user's answers)                            │
│  ├── score                                               │
│  ├── timeTaken                                           │
│  └── completedAt                                         │
│                                                           │
│  UserProgress Collection                                 │
│  ├── userId                                              │
│  ├── topicProgress (map of topic → progress %)          │
│  ├── categoryProgress (map of category → progress %)    │
│  ├── totalExamsTaken                                     │
│  ├── averageScore                                        │
│  └── lastActivityDate                                    │
│                                                           │
│  Leaderboard Collection                                  │
│  ├── userId                                              │
│  ├── totalScore                                          │
│  ├── rank                                                │
│  └── achievements                                        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless API design
- JWT for authentication (no server sessions)
- Database connection pooling
- Load balancer ready

### Caching Strategy
```
┌─────────────┐
│   Redis     │ ← Cache frequently accessed data
└─────────────┘   - Published questions
                  - Category statistics
                  - User sessions
```

### CDN Integration
```
Static Assets → CDN → Users
- Images
- CSS/JS bundles
- Public resources
```

This architecture provides a solid foundation for a scalable, maintainable aptitude exam system with clear separation of concerns and room for future enhancements.

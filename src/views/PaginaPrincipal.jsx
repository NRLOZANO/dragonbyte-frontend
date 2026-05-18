import React, { useState, useRef, useEffect } from 'react';
import './PaginaPrincipal.css';

import videoIntro from '../assets/img/dragon-intro.webm.mp4';
import videoIdle from '../assets/img/dragon-idle.webm.mp4';
import videoInteract from '../assets/img/dragon-interact.webm.mp4';

const PaginaPrincipal = () => {
  const [menuLevel, setMenuLevel] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseLevel, setSelectedCourseLevel] = useState(null);
  const [quizStep, setQuizStep] = useState('theory');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [dragonState, setDragonState] = useState('intro');
  const [connectionDays, setConnectionDays] = useState(1);
  
  const [progress, setProgress] = useState({
    programming: { basic: true, intermediate: false, advanced: false },
    english: { basic: true, intermediate: false, advanced: false },
    currentLevelPerCourse: {
      java_foundations: 1,
      spring_boot_intermediate: 1,
      advanced_microservices: 1,
      english_essentials: 1,
      technical_english_inter: 1,
      business_english_adv: 1
    }
  });

  const videoRef = useRef(null);

  const mainCategories = [
    { name: 'Programming', desc: 'Master coding, frameworks, and software architecture.', icon: '💻' },
    { name: 'English', desc: 'Enhance your communication skills for the tech industry.', icon: '🗣️' },
    { name: 'Habits', desc: 'Track your daily streak and build consistent learning routines.', icon: '🔥' }
  ];

  const difficulties = ['Basic', 'Intermediate', 'Advanced'];

  const rawCoursesDataset = [
    {
      id: 'java_foundations',
      title: 'Java Foundations',
      description: 'Learn the core fundamentals of object-oriented programming, classes, structures, and Java syntax from scratch.',
      category: 'programming',
      difficulty: 'basic',
      levels: [
        {
          lv: 1,
          theory: 'Java is an object-oriented language. Everything is built around Classes and Objects which represent real-world entities.',
          questions: [
            { q: 'Is Java an object-oriented language?', options: ['Yes', 'No'], correct: 0 },
            { q: 'What is the standard extension of a Java source code file?', options: ['.java', '.class', '.exe'], correct: 0 },
            { q: 'Which component is strictly required to execute a compiled Java program?', options: ['JVM', 'Browser', 'Database'], correct: 0 },
            { q: 'What is the exact entry point method name of any standard Java application?', options: ['main', 'start', 'execute'], correct: 0 },
            { q: 'Which specific keyword is used to instantiate a new object in Java?', options: ['new', 'create', 'make'], correct: 0 },
            { q: 'What does the acronym OOP stand for in software development?', options: ['Object-Oriented Programming', 'Operational Object Process', 'Online Office Pack'], correct: 0 }
          ]
        },
        {
          lv: 2,
          theory: 'Variables store data. String is for text, int for integers, and boolean for true/false values.',
          questions: [
            { q: 'What data type stores whole numbers in Java?', options: ['int', 'String', 'double'], correct: 0 },
            { q: 'Which data type is used to store text characters?', options: ['String', 'char', 'Both'], correct: 2 },
            { q: 'What are the two possible values of a boolean variable?', options: ['true / false', '1 / 0', 'yes / no'], correct: 0 },
            { q: 'Which keyword defines a constant variable that cannot change?', options: ['final', 'static', 'const'], correct: 0 },
            { q: 'What is the default value of an uninitialized Object reference in Java?', options: ['null', '0', 'void'], correct: 0 },
            { q: 'How do you correctly declare an integer variable named age?', options: ['int age;', 'var age;', 'age = int;'], correct: 0 }
          ]
        }
      ]
    },
    {
      id: 'spring_boot_intermediate',
      title: 'Spring Boot Framework',
      description: 'Dive into dependency injection, project architectures, corporate data persistence, and foundational components.',
      category: 'programming',
      difficulty: 'intermediate',
      levels: [
        {
          lv: 1,
          theory: 'Spring Boot uses Dependency Injection to manage object lifecycles automatically through inversion of control containers.',
          questions: [
            { q: 'What does DI stand for in Spring?', options: ['Dependency Injection', 'Data Integration', 'Direct Interface'], correct: 0 },
            { q: 'Which annotation registers a class as a Spring-managed bean service?', options: ['@Service', '@BeanXML', '@InjectData'], correct: 0 },
            { q: 'What container handles bean creation and lifecycle management?', options: ['IoC Container', 'Tomcat Engine', 'Garbage Collector'], correct: 0 },
            { q: 'Which annotation is used to automatically inject a dependency?', options: ['@Autowired', '@InjectNow', '@LinkService'], correct: 0 },
            { q: 'In Spring, Inversion of Control delegates object creation to:', options: ['The framework container', 'The manual developer', 'The database engine'], correct: 0 },
            { q: 'Can a constructor be used for dependency injection in Spring?', options: ['Yes', 'No', 'Only via XML'], correct: 0 }
          ]
        },
        {
          lv: 2,
          theory: 'Spring Data JPA allows developers to interact with SQL databases using repositories without writing manual SQL queries.',
          questions: [
            { q: 'What does JPA stand for?', options: ['Jakarta Persistence API', 'Java Process Architecture', 'Joint Persistence Application'], correct: 0 },
            { q: 'Which interface do you extend to get standard CRUD operations?', options: ['JpaRepository', 'CrudController', 'SqlInterface'], correct: 0 },
            { q: 'Which annotation maps a Java class directly to a database table?', options: ['@Entity', '@TableOnly', '@DatabaseMap'], correct: 0 },
            { q: 'What annotation specifies the primary key property of an entity?', options: ['@Id', '@Key', '@PrimaryKey'], correct: 0 },
            { q: 'Does Spring Data JPA generate SQL queries automatically based on method names?', options: ['Yes', 'No', 'Only for deletes'], correct: 0 },
            { q: 'Which annotation establishes a one-to-many database relationship?', options: ['@OneToMany', '@MultiRelation', '@JoinTable'], correct: 0 }
          ]
        }
      ]
    },
    {
      id: 'advanced_microservices',
      title: 'Cloud & Microservices',
      description: 'Master enterprise distributed systems architecture, service discovery, API Gateways, and Spring Cloud ecosystem.',
      category: 'programming',
      difficulty: 'advanced',
      levels: [
        {
          lv: 1,
          theory: 'Microservices separate a large application into small independent services that communicate via HTTP REST protocols.',
          questions: [
            { q: 'What is a core characteristic of microservices?', options: ['Independent deployment', 'Shared single database process', 'Monolithic compiled block'], correct: 0 },
            { q: 'How do microservices typically communicate synchronously?', options: ['HTTP REST / gRPC', 'Direct memory reference', 'Shared local files'], correct: 0 },
            { q: 'Which pattern centralizes entry points to all underlying microservices?', options: ['API Gateway', 'Service Registry', 'Circuit Breaker'], correct: 0 },
            { q: 'What tool is widely used in Spring Cloud for service discovery?', options: ['Eureka', 'Gateway Server', 'Config Server'], correct: 0 },
            { q: 'What is a disadvantage of microservices over monoliths?', options: ['Increased system complexity', 'Slower scaling capabilities', 'Coupled technology stacks'], correct: 0 },
            { q: 'Can each microservice use a different programming language and database?', options: ['Yes', 'No', 'Only same databases'], correct: 0 }
          ]
        },
        {
          lv: 2,
          theory: 'Circuit Breakers prevent cascading failures in distributed systems by capturing faults and providing fallback mechanisms.',
          questions: [
            { q: 'What does a Circuit Breaker do when a service fails repeatedly?', options: ['Opens the circuit', 'Closes the circuit', 'Deletes the service instance'], correct: 0 },
            { q: 'Which library is commonly used for circuit breaking in modern Spring Cloud?', options: ['Resilience4j', 'Hystrix Legacy', 'Ribbon Client'], correct: 0 },
            { q: 'What happens when the circuit state is OPEN?', options: ['Requests fail fast instantly', 'Requests wait for a timeout', 'Requests go directly to backend database'], correct: 0 },
            { q: 'What is a fallback method used for?', options: ['Provide alternative default behavior', 'Retry the crashing process forever', 'Restart the server machine'], correct: 0 },
            { q: 'What intermediate state checks if the failing remote service has recovered?', options: ['Half-Open', 'Semi-Closed', 'Testing-Mode'], correct: 0 },
            { q: 'Does a circuit breaker improve system resilience?', options: ['Yes', 'No', 'Only for local storage systems'], correct: 0 }
          ]
        }
      ]
    },
    {
      id: 'english_essentials',
      title: 'English Essentials',
      description: 'Master foundational tenses, sentence structures, and everyday professional vocabulary.',
      category: 'english',
      difficulty: 'basic',
      levels: [
        {
          lv: 1,
          theory: 'The Present Simple tense describes habits, general truths, and unchanging situations. Add -s or -es for third-person singular.',
          questions: [
            { q: 'Which pronoun correctly replaces the phrase "The code script"?', options: ['It', 'He', 'They'], correct: 0 },
            { q: 'What is the correct irregular plural form of the word "child"?', options: ['children', 'childs', 'childrens'], correct: 0 },
            { q: 'Complete the sentence: "He ___ a software engineering student."', options: ['is', 'am', 'are'], correct: 0 },
            { q: 'Identify the word that functions as an action verb in this list:', options: ['Run', 'Blue', 'Quickly'], correct: 0 },
            { q: 'Complete the sentence: "They ___ English grammar modules every single day."', options: ['study', 'studies', 'studying'], correct: 0 },
            { q: 'What is the absolute antonym of the word "Basic"?', options: ['Advanced', 'Simple', 'Easy'], correct: 0 }
          ]
        },
        {
          lv: 2,
          theory: 'The Present Continuous tense is used for actions happening right now. Form: am/is/are + verb-ing.',
          questions: [
            { q: 'Complete: "I ___ coding right now."', options: ['am', 'is', 'are'], correct: 0 },
            { q: 'What is the "-ing" form of the verb "write"?', options: ['writing', 'writeing', 'writeting'], correct: 0 },
            { q: 'Which sentence describes an action happening right now?', options: ['She is reading.', 'She reads daily.', 'She read yesterday.'], correct: 0 },
            { q: 'Complete: "They ___ playing a video game."', options: ['are', 'is', 'am'], correct: 0 },
            { q: 'What is the negative form of "He is working"?', options: ['He is not working', 'He not working', 'He does not working'], correct: 0 },
            { q: 'Which auxiliary verb corresponds to the pronoun "We"?', options: ['are', 'am', 'is'], correct: 0 }
          ]
        }
      ]
    },
    {
      id: 'technical_english_inter',
      title: 'Technical Interaction',
      description: 'Develop fluency for standard agile daily standups, code reviews, and writing professional project documentation.',
      category: 'english',
      difficulty: 'intermediate',
      levels: [
        {
          lv: 1,
          theory: 'The Past Simple tense is used to describe completed actions in a specific time in the past. Regular verbs add -ed.',
          questions: [
            { q: 'What is the past simple form of the irregular verb "go"?', options: ['went', 'gone', 'goed'], correct: 0 },
            { q: 'Which word indicates a past time framework?', options: ['Yesterday', 'Tomorrow', 'Now'], correct: 0 },
            { q: 'Complete the standup phrase: "Yesterday, I ___ the login bug."', options: ['fixed', 'fix', 'fixing'], correct: 0 },
            { q: 'What auxiliary verb is used for questions in the Past Simple?', options: ['Did', 'Do', 'Does'], correct: 0 },
            { q: 'Which sentence is negative past simple?', options: ['I did not push the code.', 'I am not pushing code.', 'I don\'t push code.'], correct: 0 },
            { q: 'What is the past tense form of the verb "run"?', options: ['ran', 'runned', 'running'], correct: 0 }
          ]
        },
        {
          lv: 2,
          theory: 'The Present Perfect connects the past to the present. Form: have/has + past participle. Used for life experiences or ongoing results.',
          questions: [
            { q: 'Which auxiliary goes with the pronoun "She" in Present Perfect?', options: ['has', 'have', 'is'], correct: 0 },
            { q: 'What is the past participle of the verb "see"?', options: ['seen', 'saw', 'seeing'], correct: 0 },
            { q: 'Complete: "We ___ deployed three microservices this week."', options: ['have', 'has', 'did'], correct: 0 },
            { q: 'Which time word is commonly used with Present Perfect to indicate recently completed actions?', options: ['just', 'ago', 'last year'], correct: 0 },
            { q: 'Have you ___ worked with relational databases before?', options: ['ever', 'never yet', 'ago'], correct: 0 },
            { q: 'Identify the present perfect sentence structure:', options: ['I have finished my task.', 'I finished my task.', 'I am finishing my task.'], correct: 0 }
          ]
        }
      ]
    },
    {
      id: 'business_english_adv',
      title: 'Business English Elite',
      description: 'Perfect corporate level communication, complex system architecture presentations, negotiation, and high-level tech terminology.',
      category: 'english',
      difficulty: 'advanced',
      levels: [
        {
          lv: 1,
          theory: 'Conditionals express hypotheses. The First Conditional is for real future possibilities (If + present simple, will + verb).',
          questions: [
            { q: 'Complete: "If we approve the budget, we ___ hire more developers."', options: ['will', 'would', 'had'], correct: 0 },
            { q: 'Which conditional structure is used for general scientific truths?', options: ['Zero Conditional', 'First Conditional', 'Third Conditional'], correct: 0 },
            { q: 'Complete: "If you merge that branch now, conflicts ___ arise."', options: ['will', 'would have', 'did'], correct: 0 },
            { q: 'First conditional structure connects a condition with an outcome that is:', options: ['Highly probable in the future', 'Completely impossible in the past', 'An imaginary present'], correct: 0 },
            { q: 'What tense is used in the conditional clause of a First Conditional sentence?', options: ['Present Simple', 'Future Will', 'Past Perfect'], correct: 0 },
            { q: 'Complete: "If the server crashes, the system ___ trigger an alert."', options: ['will', 'would', 'was'], correct: 0 }
          ]
        },
        {
          lv: 2,
          theory: 'The Second Conditional expresses imaginary or improbable situations in the present or future (If + past simple, would + verb).',
          questions: [
            { q: 'Complete: "If I ___ the CTO, I would rewrite the core monolith."', options: ['were', 'am', 'will be'], correct: 0 },
            { q: 'When do you use the Second Conditional structure?', options: ['Hypothetical situations', 'Certain future plans', 'Past regrets'], correct: 0 },
            { q: 'Complete: "If they had unlimited capital, they ___ build a private data center."', options: ['would', 'will', 'should have'], correct: 0 },
            { q: 'Which phrase represents a Second Conditional condition correctly?', options: ['If I knew his email', 'If I know his email', 'If I will know his email'], correct: 0 },
            { q: 'In Second Conditional, "would" can be replaced with which modal to show capability?', options: ['could', 'must', 'shall'], correct: 0 },
            { q: 'Complete: "If we didn\'t have a git repository management flow, we ___ lose control."', options: ['would', 'will', 'do'], correct: 0 }
          ]
        }
      ]
    }
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setMenuLevel(cat === 'Habits' ? 3 : 2);
    if (dragonState === 'idle') setDragonState('interact');
  };

  const handleDifficultyClick = (dif) => {
    const catKey = selectedCategory.toLowerCase();
    const difKey = dif.toLowerCase();
    if (progress[catKey][difKey]) {
      setSelectedDifficulty(dif);
      setMenuLevel(3);
    }
  };

  const handleStartCourse = (course) => {
    setSelectedCourse(course);
    setMenuLevel(4);
  };

  const handleSelectLevel = (levelObj) => {
    const courseId = selectedCourse.id;
    const allowedLevel = progress.currentLevelPerCourse[courseId] || 1;
    if (levelObj.lv <= allowedLevel) {
      setSelectedCourseLevel(levelObj);
      setQuizStep('theory');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setMenuLevel(5);
    }
  };

  const handleAnswerSelect = (idx) => {
    const updated = [...userAnswers, idx];
    setUserAnswers(updated);
    if (currentQuestionIndex + 1 < selectedCourseLevel.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let score = 0;
      selectedCourseLevel.questions.forEach((q, i) => { if (updated[i] === q.correct) score++; });
      setQuizScore(score);
      setQuizStep('results');
      if (score === selectedCourseLevel.questions.length) {
        unlockNextLevel(selectedCourseLevel.lv);
      }
    }
  };

  const unlockNextLevel = (completedLv) => {
    const catKey = selectedCategory.toLowerCase();
    const courseId = selectedCourse.id;
    const currentMaxLevel = progress.currentLevelPerCourse[courseId] || 1;

    if (completedLv === currentMaxLevel) {
      const newProgress = { ...progress };
      if (completedLv < selectedCourse.levels.length) {
        newProgress.currentLevelPerCourse[courseId] = completedLv + 1;
      } else {
        if (selectedDifficulty === 'Basic') newProgress[catKey].intermediate = true;
        if (selectedDifficulty === 'Intermediate') newProgress[catKey].advanced = true;
      }
      setProgress(newProgress);
    }
  };

  const simulateNextDay = () => {
    setConnectionDays(prev => prev + 1);
  };

  const handleBack = () => {
    if (menuLevel === 5) setMenuLevel(4);
    else if (menuLevel === 4) setMenuLevel(3);
    else if (menuLevel === 3) setMenuLevel(selectedCategory === 'Habits' ? 1 : 2);
    else if (menuLevel === 2) setMenuLevel(1);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [dragonState]);

  const isTransparentView = menuLevel === 1 || (menuLevel === 3 && selectedCategory !== 'Habits');

  return (
    <div className="pagina-wrapper">
      <div className="fondo-pantalla-completa"></div>
      <video ref={videoRef} src={dragonState === 'idle' ? videoIdle : dragonState === 'interact' ? videoInteract : videoIntro} className="video-dragon" autoPlay muted playsInline loop={dragonState === 'idle'} onEnded={() => setDragonState('idle')} />
      
      <main className="pagina-principal-contenedor">
        <section className={`menu-categorias ${isTransparentView ? 'menu-transparente' : 'menu-solido'}`}>
          {menuLevel > 1 && <button className="btn-volver" onClick={handleBack}>⬅ Back</button>}

          {menuLevel === 1 && (
            <div className="lista-cursos-desacoplada">
              <h2 className="titulo-categorias global-title">Select your Path</h2>
              <div className="grid-categorias-independientes">
                {mainCategories.map((cat, i) => (
                  <div key={i} className="tarjeta-categoria-contenedor">
                    <h3>{cat.icon} {cat.name}</h3>
                    <p className="descripcion-curso-texto">{cat.desc}</p>
                    <button className="btn-iniciar-curso" onClick={() => handleCategoryClick(cat.name)}>Enter</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {menuLevel === 2 && (
            <div className="lista-botones">
              <h2 className="titulo-categorias">{selectedCategory}</h2>
              {difficulties.map((d, i) => {
                const locked = !progress[selectedCategory.toLowerCase()][d.toLowerCase()];
                return (
                  <button key={i} onClick={() => handleDifficultyClick(d)} className={`btn-categoria ${locked ? 'bloqueado' : ''}`}>
                    {locked ? '🔒' : '🔥'} {d}
                  </button>
                );
              })}
            </div>
          )}

          {menuLevel === 3 && selectedCategory !== 'Habits' && (
            <div className="lista-cursos-desacoplada">
              <h2 className="titulo-categorias global-title">{selectedDifficulty} Courses</h2>
              <div className="grid-categorias-independientes">
                {rawCoursesDataset.filter(c => c.category === selectedCategory.toLowerCase() && c.difficulty === selectedDifficulty.toLowerCase()).map(c => (
                  <div key={c.id} className="tarjeta-categoria-contenedor">
                    <h3>{c.title}</h3>
                    <p className="descripcion-curso-texto">{c.description}</p>
                    <button className="btn-iniciar-curso" onClick={() => handleStartCourse(c)}>Enter Course</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {menuLevel === 3 && selectedCategory === 'Habits' && (
            <div className="streak-container">
              <h2 className="titulo-categorias">Daily Habits</h2>
              <div className="streak-fuego">🔥</div>
              <div className="streak-numero">{connectionDays}</div>
              <p className="streak-texto">Days Streak</p>
              <button className="btn-iniciar-curso" onClick={simulateNextDay}>Check In Tomorrow</button>
            </div>
          )}

          {menuLevel === 4 && (
            <div className="roadmap-container">
              <h2 className="titulo-categorias">Course Roadmap</h2>
              <div className="roadmap-levels">
                {selectedCourse.levels.map((l) => {
                  const allowedLevel = progress.currentLevelPerCourse[selectedCourse.id] || 1;
                  const isLocked = l.lv > allowedLevel;
                  return (
                    <button key={l.lv} onClick={() => handleSelectLevel(l)} className={`btn-level ${isLocked ? 'level-locked' : 'level-unlocked'}`}>
                      {isLocked ? '🔒' : '⭐'} Level {l.lv}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {menuLevel === 5 && (
            <div className="quiz-container">
              <h2 className="titulo-categorias">Level {selectedCourseLevel.lv}</h2>
              {quizStep === 'theory' && (
                <div className="quiz-view">
                  <p className="quiz-theory-text">{selectedCourseLevel.theory}</p>
                  <button className="btn-iniciar-curso" onClick={() => setQuizStep('questions')}>Start Quiz</button>
                </div>
              )}
              {quizStep === 'questions' && (
                <div className="quiz-view">
                  <p className="quiz-progress">Question {currentQuestionIndex + 1} / {selectedCourseLevel.questions.length}</p>
                  <h3 className="quiz-question-text">{selectedCourseLevel.questions[currentQuestionIndex].q}</h3>
                  <div className="quiz-options-list">
                    {selectedCourseLevel.questions[currentQuestionIndex].options.map((opt, idx) => (
                      <button key={idx} className="btn-option" onClick={() => handleAnswerSelect(idx)}>{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {quizStep === 'results' && (
                <div className="quiz-view">
                  <div className="quiz-results-score">Score: {quizScore} / {selectedCourseLevel.questions.length}</div>
                  <p className="quiz-results-feedback">
                    {quizScore === selectedCourseLevel.questions.length ? '🎉 Level Mastered! Next one unlocked.' : '❌ Try again to unlock the next level.'}
                  </p>
                  <button className="btn-iniciar-curso" onClick={() => setMenuLevel(4)}>Return to Roadmap</button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
import Dexie from 'dexie';

// Education & Learning Database
export class EducationDB extends Dexie {
  constructor() {
    super('EducationDB');
    this.version(1).stores({
      studyPlans: 'id, subject, dueDate, completed',
      books: 'id, title, author, category, ownedBy, status, progress',
      exams: 'id, subject, date, syllabus',
      readingSessions: 'id, bookId, userId, startTime, endTime, pagesRead'
    });
  }
}

export const educationDB = new EducationDB();

// Initialize sample data
export async function initializeEducationData() {
  try {
    // Check if data already exists
    const existingPlans = await educationDB.studyPlans.count();
    if (existingPlans > 0) return;

    // Sample study plans
    const studyPlans = [
      {
        id: 'math-quarterly',
        subject: 'Mathematics',
        chapters: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
        dueDate: new Date('2025-12-15'),
        completedChapters: ['Algebra'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'science-midterm',
        subject: 'Science',
        chapters: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
        dueDate: new Date('2025-11-30'),
        completedChapters: ['Physics', 'Chemistry'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample books
    const books = [
      {
        id: 'ponniyin-selvan-1',
        title: 'Ponniyin Selvan: I',
        author: 'Kalki Krishnamurthy',
        category: 'historical',
        ownedBy: 'appa',
        status: 'reading',
        progress: 65,
        totalPages: 600,
        currentPage: 390,
        rating: 5,
        notes: 'Epic historical novel about Chola dynasty',
        addedAt: new Date('2025-01-15'),
        lastReadAt: new Date('2025-10-01')
      },
      {
        id: 'ramayana-tamil',
        title: 'Ramayana',
        author: 'Valmiki (Tamil Translation)',
        category: 'spiritual',
        ownedBy: 'paati',
        status: 'available',
        progress: 100,
        totalPages: 450,
        currentPage: 450,
        rating: 5,
        notes: 'Sacred text for spiritual guidance',
        addedAt: new Date('2025-02-01'),
        lastReadAt: new Date('2025-09-15')
      },
      {
        id: 'tamil-comics-1',
        title: 'Tamil Comic Adventures',
        author: 'Various',
        category: 'comics',
        ownedBy: 'children',
        status: 'available',
        progress: 0,
        totalPages: 50,
        currentPage: 0,
        addedAt: new Date('2025-03-01')
      },
      {
        id: 'quantum-physics',
        title: 'Introduction to Quantum Physics',
        author: 'Dr. Rajesh Kumar',
        category: 'academic',
        ownedBy: 'amma',
        status: 'reading',
        progress: 30,
        totalPages: 300,
        currentPage: 90,
        addedAt: new Date('2025-08-01'),
        lastReadAt: new Date('2025-09-20')
      }
    ];

    // Sample exams
    const exams = [
      {
        id: 'quarterly-math',
        subject: 'Mathematics',
        date: new Date('2025-12-15'),
        syllabus: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
        prepChecklist: ['Complete practice problems', 'Review formulas', 'Take mock test', 'Clear doubts'],
        completedPrep: ['Complete practice problems', 'Review formulas']
      },
      {
        id: 'half-yearly-science',
        subject: 'Science',
        date: new Date('2025-11-30'),
        syllabus: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
        prepChecklist: ['Lab experiments', 'Diagram practice', 'Formula memorization', 'Concept maps'],
        completedPrep: ['Lab experiments']
      }
    ];

    await educationDB.studyPlans.bulkAdd(studyPlans);
    await educationDB.books.bulkAdd(books);
    await educationDB.exams.bulkAdd(exams);

    console.log('Education data initialized successfully');
  } catch (error) {
    console.error('Error initializing education data:', error);
  }
}

export const initEducationDB = initializeEducationData;

// Study Plan Operations
export async function getStudyPlans() {
  return await educationDB.studyPlans.toArray();
}

export async function addStudyPlan(plan) {
  const id = `plan-${Date.now()}`;
  const newPlan = {
    ...plan,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await educationDB.studyPlans.add(newPlan);
  return newPlan;
}

export async function updateStudyPlan(id, updates) {
  await educationDB.studyPlans.update(id, { ...updates, updatedAt: new Date() });
}

export async function deleteStudyPlan(id) {
  await educationDB.studyPlans.delete(id);
}

export async function markChapterComplete(planId, chapter) {
  const plan = await educationDB.studyPlans.get(planId);
  if (plan && !plan.completedChapters.includes(chapter)) {
    plan.completedChapters.push(chapter);
    await updateStudyPlan(planId, { completedChapters: plan.completedChapters });
  }
}

// Book Operations
export async function getBooks() {
  return await educationDB.books.toArray();
}

export async function getBooksByCategory(category) {
  return await educationDB.books.where('category').equals(category).toArray();
}

export async function getBooksByOwner(owner) {
  return await educationDB.books.where('ownedBy').equals(owner).toArray();
}

export async function addBook(book) {
  const id = `book-${Date.now()}`;
  const newBook = {
    ...book,
    id,
    addedAt: new Date()
  };
  await educationDB.books.add(newBook);
  return newBook;
}

export async function updateBook(id, updates) {
  await educationDB.books.update(id, { ...updates, lastReadAt: new Date() });
}

export async function deleteBook(id) {
  await educationDB.books.delete(id);
}

export async function updateReadingProgress(bookId, progress, currentPage) {
  await educationDB.books.update(bookId, {
    progress,
    currentPage,
    lastReadAt: new Date()
  });
}

// Exam Operations
export async function getExams() {
  return await educationDB.exams.toArray();
}

export async function addExam(exam) {
  const id = `exam-${Date.now()}`;
  const newExam = { ...exam, id };
  await educationDB.exams.add(newExam);
  return newExam;
}

export async function updateExam(id, updates) {
  await educationDB.exams.update(id, updates);
}

export async function deleteExam(id) {
  await educationDB.exams.delete(id);
}

export async function markExamPrepComplete(examId, prepItem) {
  const exam = await educationDB.exams.get(examId);
  if (exam && !exam.completedPrep.includes(prepItem)) {
    exam.completedPrep.push(prepItem);
    await updateExam(examId, { completedPrep: exam.completedPrep });
  }
}

// Reading Session Operations
export async function startReadingSession(bookId, userId) {
  const session = {
    id: `session-${Date.now()}`,
    bookId,
    userId,
    startTime: new Date(),
    endTime: new Date(),
    pagesRead: 0
  };
  await educationDB.readingSessions.add(session);
  return session;
}

export async function endReadingSession(sessionId, pagesRead, notes) {
  await educationDB.readingSessions.update(sessionId, {
    endTime: new Date(),
    pagesRead,
    notes
  });
}

export async function getReadingSessions(bookId) {
  return await educationDB.readingSessions.where('bookId').equals(bookId).toArray();
}

// Statistics and Analytics
export async function getEducationStats() {
  const books = await getBooks();
  const plans = await getStudyPlans();
  const exams = await getExams();

  return {
    totalBooks: books.length,
    booksReading: books.filter(b => b.status === 'reading').length,
    booksCompleted: books.filter(b => b.status === 'completed').length,
    studyPlans: plans.length,
    completedChapters: plans.reduce((sum, plan) => sum + plan.completedChapters.length, 0),
    totalChapters: plans.reduce((sum, plan) => sum + plan.chapters.length, 0),
    upcomingExams: exams.filter(e => e.date > new Date()).length,
    avgBookRating: books.filter(b => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) / books.filter(b => b.rating).length || 0
  };
}
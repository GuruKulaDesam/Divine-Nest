import Dexie from "dexie";
class EducationDB extends Dexie {
  constructor() {
    super("EducationDB");
    this.version(1).stores({
      studyPlans: "id, subject, dueDate, completed",
      books: "id, title, author, category, ownedBy, status, progress",
      exams: "id, subject, date, syllabus",
      readingSessions: "id, bookId, userId, startTime, endTime, pagesRead"
    });
  }
}
const educationDB = new EducationDB();
async function getStudyPlans() {
  return await educationDB.studyPlans.toArray();
}
async function getBooks() {
  return await educationDB.books.toArray();
}
export {
  getBooks as a,
  getStudyPlans as g
};

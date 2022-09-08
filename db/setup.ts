import Database from "better-sqlite3";
const db = Database("./db/data.db", { verbose: console.log });

const applicants = [
  {
    name: "Hana",
    email: "hana@email.com",
  },
  {
    name: "Diell",
    email: "diell@email.com",
  },
  {
    name: "Dea",
    email: "dea@email.com",
  },
  {
    name: "Gent",
    email: "gent@email.com",
  },
];

const interviewers = [
  {
    name: "Nicolas",
    email: "nicolas@email.com",
  },
  {
    name: "Ed",
    email: "ed@email.com",
  },
  {
    name: "Dafina",
    email: "dafina@email.com",
  },
];

const interviews = [
  {
    date: "10/08/2022",
    score: 75,
    applicantId: 1,
    interviewerId: 1,
  },
  {
    date: "25/08/2022",
    score: 85,
    applicantId: 1,
    interviewerId: 3,
  },
  {
    date: "31/08/2022",
    score: 68,
    applicantId: 2,
    interviewerId: 2,
  },
  {
    date: "05/09/2022",
    score: 88,
    applicantId: 2,
    interviewerId: 1,
  },
  {
    date: "27/08/2022",
    score: 73,
    applicantId: 3,
    interviewerId: 3,
  },
  {
    date: "05/09/2022",
    score: 91,
    applicantId: 3,
    interviewerId: 1,
  },
  {
    date: "01/09/2022",
    score: 94,
    applicantId: 4,
    interviewerId: 1,
  },
  {
    date: "03/09/2022",
    score: 78,
    applicantId: 4,
    interviewerId: 2,
  },
];

const dropApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`);
dropApplicantsTable.run();
const createApplicantsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS applicants (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (id)
)
`);
createApplicantsTable.run();
const createApplicant = db.prepare(`
INSERT INTO applicants (name, email) VALUES (@name, @email)
`);

for (let applicant of applicants) createApplicant.run(applicant);
// const createInterviewsTable = db.prepare(``);
// const createInterview = db.prepare(``);
const dropInterviewersTable = db.prepare(`
DROP TABLE IF EXISTS interviewers
`);
dropInterviewersTable.run();
const createInterviewersTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviewers (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (id)
)`);
createInterviewersTable.run();
const createInterviewer = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (@name, @email)
`);
for (let interviewer of interviewers) createInterviewer.run(interviewer);

const dropTableInterviews = db.prepare(`
DROP TABLE IF EXISTS interviews;
`);
dropTableInterviews.run();

const createInterviewsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER,
    date TEXT NOT NULL,
    score INTEGER NOT NULL,
    applicantId INTEGER NOT NULL,
    interviewerId  INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (applicantId) REFERENCES applicants (id) ON DELETE CASCADE,
    FOREIGN KEY (interviewerId) REFERENCES interviewers (id) ON DELETE CASCADE
    )`);
createInterviewsTable.run();
const createInterview = db.prepare(`
 INSERT INTO interviews (date, score, applicantId, interviewerId) VALUES (@date, @score, @applicantId, @interviewerId)
 `);
for (let interview of interviews) createInterview.run(interview);

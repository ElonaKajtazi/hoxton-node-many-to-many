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

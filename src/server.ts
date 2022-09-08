import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const db = Database("./db/data.db", { verbose: console.log });
const getApplicants = db.prepare(`
SELECT * FROM applicants
`);
const getApplicantById = db.prepare(`
SELECT * FROM applicants WHERE id = @id
`);
const getInterviewsForApplicant = db.prepare(`
SELECT * FROM  interviews WHERE applicantId = @applicantId
`);

const getInterviwersForApplicant = db.prepare(`
SELECT interviewers.* FROM interviewers
JOIN interviews ON interviewers.id = interviews.interviewerId
WHERE interviews.applicantId = @applicantId;
`);
const getInterviewers = db.prepare(`
SELECT * FROM interviewers
`);
const getInterviewerById = db.prepare(`
SELECT * FROM interviewers WHERE id = @id
`);
const getInterviewsForInterviewer = db.prepare(`
SELECT * FROM  interviews WHERE interviewerId = @interviewerId;
`);
const getApplicantsForInterviewer = db.prepare(`
SELECT applicants.* from applicants
JOIN interviews ON applicants.id = interviews.applicantId
WHERE interviews.interviewerId = @interviewerId
`);

const getInterviews = db.prepare(`
SELECT * FROM interviews
`);

// const createApplicant = db.prepare(`
// INSERT INTO applicants (name, email) VALUES (@name, @email)
// `);
// const createInterviewer = db.prepare(`
// INSERT INTO interviewers (name, email) VALUES (@name, @email)
// `);
// const createInterview = db.prepare(`
//  INSERT INTO interviews (date, score, applicantId, interviewerId) VALUES (@date, @score, @applicantId, @interviewerId)
//  `);
app.get("/", (req, res) => {
  res.send(`<h1>Applicants/Interviews/Interviewers API</h1>
    <h2>Available resources:</h2>
    <ul>
      <li><a href="/applicants">Applicants</a></li>
      <li><a href="/interviews">Interviews</a></li>
      <li><a href="/interviewers">Interviewers</a></li>
    </ul>`);
});
app.get("/applicants", (req, res) => {
  const applicants = getApplicants.all();
  res.send(applicants);
});
app.get("/interviewers", (req, res) => {
  const interviewers = getInterviewers.all();
  res.send(interviewers);
});
app.get("/interviews", (req, res) => {
    const interviews = getInterviews.all();
    res.send(interviews);
  });
app.get("/applicants/:id", (req, res) => {
  const applicant = getApplicantById.get(req.params);
  if (applicant) {
    applicant.interviews = getInterviewsForApplicant.all({
      applicantId: applicant.id,
    });
    applicant.interviewers = getInterviwersForApplicant.all({
      applicantId: applicant.id,
    });
    res.send(applicant);
  } else {
    res.status(404).send({ error: "Applicant not found" });
  }
});
app.get("/interviewers/:id", (req, res) => {
  const interviewer = getInterviewerById.get(req.params);
  if (interviewer) {
    interviewer.interviews = getInterviewsForInterviewer.all({
      interviewerId: interviewer.id,
    });
    interviewer.applicants = getApplicantsForInterviewer.all({
      interviewerId: interviewer.id,
    });
    res.send(interviewer);
  } else {
    res.status(404).send({ error: "Interviewer not found" });
  }
});
app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`);
});

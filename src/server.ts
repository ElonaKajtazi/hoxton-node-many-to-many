import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const db = Database("./db/data.db", { verbose: console.log });

const getApplicantById = db.prepare(`
SELECT * FROM applicants WHERE id = @id
`);
const getInterviewForApplicant = db.prepare(`
SELECT * FROM  interviews WHERE applicantId = @applicantId
`);

const getInterviwerForApplicant = db.prepare(`
SELECT interviewers.* FROM interviewers
JOIN interviews ON interviewers.id = interviews.interviewerId
WHERE interviews.applicantId = @applicantId;
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

app.get("/applicants/:id", (req, res) => {
  const applicant = getApplicantById.get(req.params);
  if (applicant) {
    applicant.interviews = getInterviewForApplicant.all({
      applicantId: applicant.id,
    });
    applicant.interviewers = getInterviwerForApplicant.all({
      applicantId: applicant.id,
    });
    res.send(applicant);
  } else {
    res.status(404).send({ error: "Applicant not found" });
  }
});

app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`);
});

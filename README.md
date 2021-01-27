# Job-Application-WebApp

This project was made using MERN stack. WebApp which provides a platform for applicants to apply for jobs and recruiter to post job listings.

---
## How to use

### Frontend
```
cd frontend
npm install
```
To start the server:
```
npm start
```


### Backend
```
cd backend
npm install
```
To connect to database:
```
nodemon server
or 
npm server
```

--- 
## Features

### Applicant
- Fuzzy search - To search jobs via job title
- Sorting based on name, salary, date of posting, etc.
- Filter jobs based on salary, duration, jobtype (Full-time, part-time, work-from-home)
- My applications showing all their accepted and rejected jobs.

### Recruiter
- Dashboard showing all the jobs posted by the user and ability to view, edit and delete it accordingly
- Employees showing all the applicants whose applications were accepted by the user with their details


---
## Utilities
- Nodemon - utility that monitors any changes done in the code and restart server automatically.

- Mongoose - node module based on MongoDB. Provides with many features such as data validation, etc.

## Leave-Portal-TTD
This is a web application which allows PhD students/ Faculty members to send leave request to HOD of their respective departments.

## Installation

### Run Locally

First navigate to frontend directory

```bash
cd Client
```

Now install all the dependencies for React App

```bash
npm install --legacy-peer-deps
```

Then navigate to Backend directory

```bash
cd ../Backend
```

Now install all the dependencies for Express App

```bash
npm install
```

Now start the Backend server at 5000 port 

```bash
nodemon index.js
```
Navigate to frontend directory and start your React App at 3000 port

```bash
npm run start
```


## Documentation

#### This app can be used in following way
- First the user needs to login with BITS mail id to leave portal
- Then specify the reason for leave (multiple reasons for multiple leaves) in text field provided
- Then select the dates on which the user wants a leave.
- Enter their ID number for PhD students and PSRN number for faculty members in the input field.
- Select their department from the dropdown.
- Then submit the form
- Then email is sent to HOD of that department and if he/she approves the request it gets updated in the database.
- The HOD can change the approval later on by clicking the Reject button which will update the data in database.

## Tech Stack
<ol>
<li>ReactJS</li>
<li>TailwindCSS</li>
<li>Firebase</li>
<li>NodeJS</li>
<li>ExpressJS</li>
<li>Handlebars</li>
<li>MongoDB</li>
</ol>


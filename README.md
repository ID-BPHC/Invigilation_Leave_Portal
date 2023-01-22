## Invigilation Leave Portal
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

#### Student Portal
- First the user needs to login with ```BITS mail``` id to leave portal
- Then specify the reason for leave (multiple reasons for multiple leaves) in text field provided
- Then select the dates on which the user wants a leave.
- Enter their ```ID number``` for PhD students and ```PSRN number``` for faculty members in the input field.
- Select their department from the dropdown.
- Then submit the form.
- The leave request is added to the database which is reflected in HOD portal and admin portal.
- HOD can approve/deny the request.

#### HOD Portal
- When HOD logins with ```BITS mail``` id it displays list of all requests made by the students of their respective departments.
- Each request has name of PhD student, department of the PhD student, reason for leave, dates for which leave is applied,
- Now the HOD can either approve or deny the request.
- The leave status gets updated in the database and as well as reflects in frontend to the HOD.

#### Admin Portal
- When Admin logins with BITS mail id it displays list of all requests made by the students from all departments.
- Each request has name of PhD student, department of the PhD student, reason for leave, dates for which leave is applied,
- Now the Admin can either approve or deny the request.
- The leave status gets updated in the database and as well as reflects in frontend to the Admin.
- Admin can also ```add HODs``` for each department.
- Admin can view the list of all HODs.

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

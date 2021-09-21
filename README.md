# Outliers

A Customised Student Portal WebApp for Our branch students where only they can login and conduct class polls, have a todo list, share their achievements with others, view notices posted by CR and much more. This WebApp is build as a contest project by team Outliers at GeeksFiesta of GFG IIIT-BH Chapter.

# Frontend
The frontend of the project has been developed using Angular 8 framework. The technologies used in building the frontend are:
<ol>
  <li>HTML</li>
  <li>CSS</li>
  <li>SCSS</li>
  <li>JavaScript</li>
</ol>

with a little grid styling assist of Bootstrap. The entire frontend code has been structured in modules and compnents with support of in-app single layer routing and root service dependency injections.

<hr />

### <strong>Authentication Module</strong>

The authentication module contains code for validation only Computer Engineering students of 2019-23 batch to Sign Up/Login into the portal. The authentication credentials go through a linear layered conditions flow, validating : 
<ul>
    <li>If the email is of a IIIT Student</li>
    <li>If the email is of a B.Tech student</li>
    <li>If the email is of a 2019-23 batch student</li>
    <li>If the email is of a Computer Engineering branch student</li>
    <li>If the email exists in Computer Engineering branch</li>
    <li>If the email is already registered in portal</li>
</ul>  

The entire validation is done in backend by restful services and appropriate message is displayed in UI if the user is not authenticated.

#### <strong>Class Representative Authentication</strong>

The class representatives have access to exclusive features in portal hence their IDs were seperately registered in the backend. The credentials of the CRs are:
<ul>
    <li>
        Email : b519000@iiit-bh.ac.in
        ,
        Password : passcr
    </li>
    <li>
        Email : b519100@iiit-bh.ac.in
        ,
        Password : passcr
    </li>
</ul>


<hr />

### <strong>Navbar Component</strong>

The navbar component is designed to navigate through various components by routing to the respective routing links. The navbar component is placed in the main component and goes through no change while routing through different links.

<hr />

### <strong>Time Table</strong>

The timetable component displays the time table of the current semester. It is developed using pure HTML and CSS.

<hr />

### <strong>Notice Board</strong>

The notice board component contains all the important notices that are posted by the Class Representatives. All students of branch can view the notice list and individual notices. Only the class representatives can Post, Edit and Delete the notices from the notice board.

<hr />


### <strong>To Do List</strong>

The To Do List component is a component for individual students where students can create task and assign deadlines for themselves. Students can only view their own list. Any student has the power to 

<ul>
    <li>Create a task for themselves</li>
    <li>Assign a deadline for that task</li>
    <li>Mark Task As Completed</li>
    <li>Remove Task from the list</li>
</ul>

<hr />

### <strong>Polls</strong>

Polls component allows us to create YES/NO polls for entire class. Any student can create a poll and vote for any poll created by themselves or other students. The polls are automatically removed from the database after 10 days.

<hr />

### <strong>Profile</strong>

Once Logged in, any student can edit his/her personal details, like name , address, phone number, achievements, etc. The same profile details will be reflected in the student list component.

<hr />

### <strong>Student List</strong>

Each student can view the list of students in their branch and can view the basic details about them.

<hr />

# Backend 

### API 

All the api are coded in this folder

<hr />

### Hosting App

It hosts and redirects all the urls to frontend build files 

<hr />

### Outliers Folder

Contains all the configration files for backend

<hr />

### Hosting 

The website is hosted at https://teamoutliers.herokuapp.com/

<hr />

### Instruction to run on local machine
```
git clone https://github.com/abhinav-exp/Outliers.git
```
or 
```
git clone git@github.com:abhinav-exp/Outliers.git
```

after cloning 
```
cd Outliers 
python3 -m venv venv 
```

activate the virtual environment 
```
source venv/bin/activate
``` 
or 
```
venv\Scripts\activate
```

install and run server
```
pip install -r requirements.txt
python3 manage.py runserver
```

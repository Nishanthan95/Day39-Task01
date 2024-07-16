

Check it in postman
1.Create Student Endpoint
Post: http://localhost:5000/api/students/create

2.Create Mentor Endpoint
Post: http://localhost:5000/api/mentors/create

3.Assign Student to Mentor Endpoint
Post: http://localhost:5000/api/assign/assign

4.Change Mentor for a Particular Student Endpoint
Post: http://localhost:5000/api/assign/change

5.Show All Students for a Particular Mentor Endpoint
Get: http://localhost:5000/api/assign/students/mentorid

6.Show the Previously Assigned Mentor for a Particular Student Endpoint
Get: http://localhost:5000/api/assign/previous-mentor/studentid
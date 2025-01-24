 // Import required modules
 const express = require('express');
 const { resolve } = require('path');
 const studentsData = require('./data'); // Importing the students data from data.js
 
 // Initialize the app and port
 const app = express();
 const port = 3010;
 
 // Middleware to parse JSON
 app.use(express.static('static'));
 app.use(express.json());
 
 // Serve the main HTML page
 app.get('/', (req, res) => {
   res.sendFile(resolve(__dirname, 'pages/index.html'));
 });
 
 // API Endpoint: Retrieve Students Above Threshold
 app.post('/students/above-threshold', (req, res) => {
   const { threshold } = req.body;
 
   // Validate threshold input
   if (typeof threshold !== 'number' || threshold <= 0) {
     return res.status(400).json({
       error: 'Invalid threshold. Please provide a positive number.',
     });
   }
 
   // Extract and process students data
 //  const students = studentsData.students || []; // Assuming data.js exports an object with a "students" key
   const filteredStudents = studentsData.filter(student => student.total > threshold)
     .map(student => ({ name: student.name, total: student.total }));
 
   // Return filtered students
   res.json({
     count: filteredStudents.length,
     students: filteredStudents,
   });
 });
 
 // Start the server
 app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
 });
 
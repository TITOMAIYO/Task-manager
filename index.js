const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
   origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}
))



const apiRoutes= require('./routes/api');
const usersRoutes= require('./routes/users');

app.use(apiRoutes);
app.use(usersRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

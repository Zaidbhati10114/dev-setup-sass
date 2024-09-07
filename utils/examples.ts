export const data = [
  {
    title: "setting-up-react-with-redux",
    description:
      "This guide will help you integrate Redux into a React project for state management.",
    steps: [
      {
        stepNumber: 1,
        title: "Project Setup",
        explanation: "Create a new React project using Create React App.",
        codeSnippet: ["npx create-react-app my-redux-app"],
      },
      {
        stepNumber: 2,
        title: "Install Redux and React-Redux",
        explanation: "Install Redux and React-Redux using npm.",
        codeSnippet: ["npm install redux react-redux"],
      },
      {
        stepNumber: 3,
        title: "Create a Redux Store",
        explanation: "Set up the Redux store and provide it to your React app.",
        codeSnippet: [
          "// src/store.js\nimport { createStore } from 'redux';\nimport rootReducer from './reducers';\n\nconst store = createStore(rootReducer);\nexport default store;",
        ],
      },
      {
        stepNumber: 4,
        title: "Connect Redux to React",
        explanation:
          "Wrap your app with the Provider component and pass the store to it.",
        codeSnippet: [
          "// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { Provider } from 'react-redux';\nimport store from './store';\nimport App from './App';\n\nReactDOM.render(\n  <Provider store={store}>\n    <App />\n  </Provider>,\n  document.getElementById('root')\n);",
        ],
      },
      {
        stepNumber: 5,
        title: "Create a Redux Action and Reducer",
        explanation:
          "Define actions and reducers for your app's state management.",
        codeSnippet: [
          "// src/actions/index.js\nexport const increment = () => ({\n  type: 'INCREMENT'\n});\n\n// src/reducers/counter.js\nconst counter = (state = 0, action) => {\n  switch (action.type) {\n    case 'INCREMENT':\n      return state + 1;\n    default:\n      return state;\n  }\n};\nexport default counter;",
        ],
      },
    ],
  },
  {
    title: "setting-up-node.js-with-express",
    description:
      "Learn how to set up a basic web server using Node.js and Express.",
    steps: [
      {
        stepNumber: 1,
        title: "Initialize a Node.js Project",
        explanation: "Create a new Node.js project and initialize it with npm.",
        codeSnippet: ["mkdir my-express-app\ncd my-express-app\nnpm init -y"],
      },
      {
        stepNumber: 2,
        title: "Install Express",
        explanation: "Install the Express framework using npm.",
        codeSnippet: ["npm install express"],
      },
      {
        stepNumber: 3,
        title: "Create a Basic Server",
        explanation: "Set up a basic server to handle HTTP requests.",
        codeSnippet: [
          "// index.js\nconst express = require('express');\nconst app = express();\nconst PORT = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(PORT, () => {\n  console.log(`Server running on http://localhost:${PORT}`);\n});",
        ],
      },
      {
        stepNumber: 4,
        title: "Handle Routes",
        explanation:
          "Define routes to handle different HTTP methods and endpoints.",
        codeSnippet: [
          "// index.js\napp.post('/submit', (req, res) => {\n  res.send('Form submitted');\n});\n\napp.put('/update', (req, res) => {\n  res.send('Data updated');\n});\n\napp.delete('/delete', (req, res) => {\n  res.send('Data deleted');\n});",
        ],
      },
      {
        stepNumber: 5,
        title: "Use Middleware",
        explanation:
          "Learn how to use middleware to process requests before they reach the route handlers.",
        codeSnippet: [
          "// index.js\nconst bodyParser = require('body-parser');\napp.use(bodyParser.json());",
        ],
      },
    ],
  },
  {
    title: "setting-up-a-python-virtual-environment",
    description:
      "This guide shows you how to create and activate a Python virtual environment for managing dependencies.",
    steps: [
      {
        stepNumber: 1,
        title: "Install Virtualenv",
        explanation: "Install the virtualenv package using pip.",
        codeSnippet: ["pip install virtualenv"],
      },
      {
        stepNumber: 2,
        title: "Create a Virtual Environment",
        explanation: "Create a virtual environment in your project directory.",
        codeSnippet: ["virtualenv venv"],
      },
      {
        stepNumber: 3,
        title: "Activate the Virtual Environment",
        explanation: "Activate the virtual environment for your project.",
        codeSnippet: ["source venv/bin/activate"],
      },
      {
        stepNumber: 4,
        title: "Install Dependencies",
        explanation:
          "Install necessary packages within the virtual environment.",
        codeSnippet: ["pip install requests"],
      },
      {
        stepNumber: 5,
        title: "Deactivate the Virtual Environment",
        explanation: "When done, deactivate the virtual environment.",
        codeSnippet: ["deactivate"],
      },
    ],
  },
  {
    title: "setting-up-docker-for-a-node.js-application",
    description:
      "This guide explains how to containerize a Node.js application using Docker.",
    steps: [
      {
        stepNumber: 1,
        title: "Install Docker",
        explanation: "Download and install Docker for your operating system.",
        codeSnippet: [],
      },
      {
        stepNumber: 2,
        title: "Create a Dockerfile",
        explanation:
          "Create a Dockerfile to define the environment for your Node.js application.",
        codeSnippet: [
          'FROM node:14\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["node", "index.js"]',
        ],
      },
      {
        stepNumber: 3,
        title: "Build the Docker Image",
        explanation: "Build the Docker image for your application.",
        codeSnippet: ["docker build -t my-node-app ."],
      },
      {
        stepNumber: 4,
        title: "Run the Docker Container",
        explanation: "Run your application inside a Docker container.",
        codeSnippet: ["docker run -p 3000:3000 my-node-app"],
      },
      {
        stepNumber: 5,
        title: "Manage Docker Containers",
        explanation: "Learn basic Docker commands for managing containers.",
        codeSnippet: [
          "docker ps\n\ndocker stop <container_id>\n\ndocker rm <container_id>",
        ],
      },
    ],
  },
  {
    title: "setting-up-a-mysql-database",
    description:
      "This guide walks you through the setup of a MySQL database on your local machine.",
    steps: [
      {
        stepNumber: 1,
        title: "Install MySQL",
        explanation: "Download and install MySQL for your operating system.",
        codeSnippet: [],
      },
      {
        stepNumber: 2,
        title: "Secure MySQL Installation",
        explanation:
          "Run the MySQL secure installation script to set up a root password and remove insecure defaults.",
        codeSnippet: ["sudo mysql_secure_installation"],
      },
      {
        stepNumber: 3,
        title: "Log in to MySQL",
        explanation: "Log in to the MySQL server using the root account.",
        codeSnippet: ["mysql -u root -p"],
      },
      {
        stepNumber: 4,
        title: "Create a Database",
        explanation: "Create a new database for your application.",
        codeSnippet: ["CREATE DATABASE my_database;"],
      },
      {
        stepNumber: 5,
        title: "Create a User and Grant Permissions",
        explanation:
          "Create a new MySQL user and grant them permissions to your database.",
        codeSnippet: [
          "CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'password';\nGRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'localhost';\nFLUSH PRIVILEGES;",
        ],
      },
    ],
  },
  {
    title: "setting-up-git-and-github",
    description:
      "A beginner's guide to setting up Git and pushing your first repository to GitHub.",
    steps: [
      {
        stepNumber: 1,
        title: "Install Git",
        explanation: "Download and install Git on your system.",
        codeSnippet: ["sudo apt-get install git"],
      },
      {
        stepNumber: 2,
        title: "Configure Git",
        explanation: "Set up your Git username and email.",
        codeSnippet: [
          'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"',
        ],
      },
      {
        stepNumber: 3,
        title: "Create a New Repository",
        explanation:
          "Initialize a new Git repository in your project directory.",
        codeSnippet: ["git init"],
      },
      {
        stepNumber: 4,
        title: "Commit Your Code",
        explanation: "Stage and commit your changes.",
        codeSnippet: ["git add .\ngit commit -m 'Initial commit'"],
      },
      {
        stepNumber: 5,
        title: "Push to GitHub",
        explanation: "Push your local repository to GitHub.",
        codeSnippet: [
          "git remote add origin https://github.com/yourusername/your-repo.git\ngit push -u origin master",
        ],
      },
    ],
  },
];

const extractedData = [
  { title: "Setting up React with Redux", steps: 5 },
  { title: "Setting up Node.js with Express", steps: 5 },
  { title: "Setting up a Python Virtual Environment", steps: 5 },
  { title: "Setting up Docker for a Node.js Application", steps: 5 },
  { title: "Setting up a MySQL Database", steps: 5 },
  { title: "Setting up Git and GitHub", steps: 5 },
  { title: "Setting up a React Project with TypeScript", steps: 5 },
  { title: "Setting up a LAMP Stack on Ubuntu", steps: 5 },
  { title: "Setting up a Full-Stack MERN Application", steps: 5 },
  { title: "Setting up a WordPress Site", steps: 5 },
  { title: "Setting up a React Native Project", steps: 5 },
];

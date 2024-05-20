# Full Stack Open - University of Helsinki - 2024
## About the course
This repository includes my assignment submissions for the Helsinki University Full Stack Open 2021 course (https://fullstackopen.com/en/).

The course focuses on Modern JavaScript-based Web Development, particularly on building single-page applications with ReactJS that interact with REST APIs created using Node.js.

The course also covers additional topics, including:
- GraphQL: A modern alternative to REST APIs.
- TypeScript: An open-source, typed superset of JavaScript that compiles to plain JavaScript.
- React Native: An open-source UI software framework for creating native mobile applications using JavaScript.
- CI/CD: Continuous Integration (CI) and Continuous Delivery (CD).
- Docker Containers: An open platform for developing, shipping, and running applications by virtualizing the operating system on which it is installed.

## Part 0 - Fundamentals of Web apps

In this part, the course familiarizes students with the practicalities of taking the course. It provides an overview of the basics of web development and discusses the advances in web application development over the last few decades.

- [new note](link_to_solution) - The diagram shows how the browser and the server communicate when a user adds a note to a page containing JavaScript.
- [single page app](link_to_solution) - The diagram shows the communication between the browser and the server when a user opens a single page app in the browser.
- [new note (single page app)](link_to_solution) - The diagram shows how the browser and the server communicate when a user adds a note to a single page app.

[View solutions folder](link_to_solutions_folder)

## Part 1 - Introduction to React

This part introduces the React library, which will be used to write the code that runs in the browser. It also looks at some JavaScript features that are important for understanding React.

- [courseinfo](link_to_solution) - Simple course information page which counts the total number of exercises in the course.
- [unicafe](link_to_solution) - This app gathers feedback and generates statistics.
- [anecdotes](link_to_solution) - This app allows voting for random anecdotes and shows the most voted anecdote.

[View solutions folder](link_to_solutions_folder)

## Part 2 - Communicating with server

This part continues the introduction to React. First, it looks at how to render a data collection, like a list of names, to the screen. After this, it inspects how a user can submit data to a React application using HTML forms. Next, it focuses on how JavaScript code in the browser can fetch and handle data stored in a remote backend server. Lastly, it provides a quick look at a few simple ways of adding CSS styles to React applications.

- [courseinfo](link_to_solution) - Extended Course info app from Part 1.
- [phonebook](link_to_solution) - Phonebook app for adding, deleting, and editing contacts with numbers.
- [dataforcountries](link_to_solution) - A React app that fetches and displays information from the REST Countries and Weather Stack APIs.

## Part 3 - Programming a server with NodeJS and Express

In this part, the focus shifts towards the backend, implementing functionality on the server side of the stack. It involves implementing a simple REST API in Node.js using the Express library, with the application's data stored in a MongoDB database. At the end of this part, the application is deployed to the internet.

- [phonebook](link_to_solution) - The app source backend code.
- [phonebook](link_to_solution) - The app deployed on Heroku. Frontend from Part 2 and Backend from Part 3 work together.

## Part 4 - Testing Express servers, user administration

This part continues work on the backend. The first major theme is writing unit and integration tests for the backend. After covering testing, it looks at implementing user authentication and authorization.

- [bloglist](link_to_solution) - Allows users to save information (blog author, title, URL, and amount of upvotes from users) about interesting blogs they have found on the internet.

## Part 5 - Testing React apps

In this part, the course returns to the frontend, first exploring different possibilities for testing React code. It also implements token-based authentication to enable users to log in to the application.

- [bloglist-frontend](link_to_solution) - The app frontend code.

## Part 6 - Advanced state management

So far, the application's state and state logic have been placed directly inside React components. When applications grow larger, state management should be moved outside React components. This part introduces the Redux library, the most popular solution for managing the state of React applications. It covers the lightweight version of Redux directly supported by React, namely the React context and useReducer hook, as well as the React Query library that simplifies server state management.

- [unicafe-redux](link_to_solution) - The app source code.
- [redux-anecdotes](link_to_solution) - The app source code.

## Part 7 - React router, custom hooks, styling app with CSS and webpack

The seventh part of the course touches on several themes. First, it introduces React Router, which helps divide the application into different views based on the URL in the browser's address bar. After this, it explores additional ways to add CSS styles to React applications. Throughout the course, Vite has been used to build applications. It is also possible to configure the toolchain independently, and this part demonstrates how to do this with Webpack. It also covers hook functions and how to define a custom hook.

- [routed-anecdotes](link_to_solution) - The app source code.
- [ultimate-hooks](link_to_solution) - The app source code.
- [country-hook](link_to_solution) - The app source code.
- [bloglist-frontend](link_to_solution) - The app source code.
- [bloglist-backend](link_to_solution) - The app source code.

## Part 8 - GraphQL

This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and server.

- [library-backend](link_to_solution) - The app source code.
- [library-frontend](link_to_solution) - The app source code.

## Part 9 - TypeScript

In this part, the tools previously introduced are used to build end-to-end features in an existing ecosystem with predefined linters and an existing codebase written in TypeScript.

## Part 10 - React Native

This part teaches how to build native Android and iOS mobile applications with JavaScript and React using the React Native framework. It dives into the React Native ecosystem by developing an entire mobile application from scratch. Along the way, it covers concepts such as rendering native user interface components with React Native, creating beautiful user interfaces, communicating with a server, and testing a React Native application.

- [rate-repository-app](link_to_solution) - The app source code.

## Part 11 - CI/CD

This part explains why a Continuous Integration / Continuous Delivery (CI/CD) system should be used, what it can do, and how to get started with GitHub Actions, which is available to all GitHub users by default.

- [full-stack-open-pokedex](link_to_solution) - Exercise repository.
- [full-stack-open-pokedex](link_to_solution) - Deployed app.
- [phonebook-cicd](link_to_solution) - Exercise repository. Pipeline for another project.
- [phonebook-cicd](link_to_solution) - Deployed app.

## Part 12 - Containers

This part teaches how to package code into standard units of software called containers. Containers help develop software faster and easier. It also explores a new perspective on web development outside of the familiar Node.js backend and React frontend. Containers are utilized to create immutable execution environments for Node.js and React projects. They also make it easy to include multiple services with projects. With this flexibility, it explores and experiments with many different and popular tools by utilizing containers.

## Part 13 - Using relational databases

In the previous sections, MongoDB was used for storing data, which is a NoSQL database. NoSQL databases became very common over 10 years ago when the scaling of the internet started to cause problems for relational databases that used the older generation SQL query language.

Relational databases have since experienced a resurgence. Problems with scalability have been partially resolved, and they have adopted some features of NoSQL databases. This section explores different NodeJS applications that use relational databases, focusing on PostgreSQL, the leading open-source relational database.


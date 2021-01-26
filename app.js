// const createError = require('http-errors');
// const express = require("express");
// const mongoose = require("mongoose");
// const logger = require('morgan');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const Todo = require("./app/models/todo");

// mongoose.connect("mongodb://127.0.0.1:27017/todosDb", {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connection.once("open", () => {
//   console.log("Mongodb connection established successfully");
// });

// const PORT = 4000;

// const app = express();
// require('dotenv').config();

// app.use(logger('dev'));
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// // app.use(express.urlencoded({ extended: false }));
// // app.use(express.json());

// app.get("/", (req, res) => {
//   Todo.find((err, todos) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(todos);
//     }
//   });
// });

// app.post("/create", (req, res) => {
//   console.log('Data arrive', req);
//   const todo = new Todo(req.body);
//   console.log(todo);
//   todo
//     .save()
//     .then((todo) => {
//       res.json(todo);
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// });

// app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   Todo.findById(id, (err, todo) => {
//     res.json(todo);
//   });
// });

// app.post("/:id", (req, res) => {
//   const id = req.params.id;
//   Todo.findById(id, (err, todo) => {
//     if (!todo) {
//       res.status(404).send("Todo not found");
//     } else {
//       todo.text = req.body.text;

//       todo
//         .save()
//         .then((todo) => {
//           res.json(todo);
//         })
//         .catch((err) => res.status(500).send(err.message));
//     }
//   });
// });

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('errors/error');
// });

// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

// module.exports = app;



// const createError = require('http-errors');
// const express = require('express');
// const hbs = require('express-handlebars');
// const mongoose = require('mongoose');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const sassMiddleware = require('node-sass-middleware');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// const app = express();
// require('dotenv').config();

// // view engine setup
// app.set('views', path.join(__dirname, 'app/views'));
// app.set('view engine', 'hbs');
// app.engine('hbs', hbs({
//   extname: 'hbs',
//   defaultLayout: 'application',
//   layoutsDir: 'app/views/layouts',
//   partialsDir: 'app/views/partials',
// }));

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('errors/error');
// });

// module.exports = app;


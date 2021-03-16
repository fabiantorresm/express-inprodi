const createError = require('http-errors');
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require("body-parser");
const formData = require("express-form-data");
const os = require("os");
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const { connectionDatabase } = require('./config/database');

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
const app = express();

require('dotenv').config();
// parse data with connect-multiparty. 
app.use(formData.parse(options));
app.use(formData.union());

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'application',
	layoutsDir: 'app/views/layouts',
	partialsDir: 'app/views/partials',
}));

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false,  }));
// app.use(upload.array()); 
// app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use( express.static('public') );
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())
// Mis rutas
app.use('/',          require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/payments', require('./routes/payments'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('errors/error');
});


//OMITIR CONEXIÓN A BASE DEDATOS TEMPORALMENTE
connectionDatabase();
// Ejecución del servidor ...
app.listen( process.env.PORT, () => {
		console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

module.exports = app;
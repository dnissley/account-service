const express = require('express');
const logger = require('morgan');
const { pick } = require('lodash');

const accountRouter = require('./routes/account');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/account', accountRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// joi error handler
app.use((err, req, res, next) => {
  if (err.isJoi) {
    res.status(err.status || 500);
    res.send(pick(err, ['name', 'details']));
  } else {
    return next(err);
  }
});

// last chance error handler
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);

  if (req.app.get('env') === 'development') {
    res.send(err.stack);
    throw err;
  } else {
    res.send('Woops');
  }
});

module.exports = app;

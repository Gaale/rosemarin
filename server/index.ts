import session from 'express-session';
import express from 'express';

// const express = require('express');
const cors = require('cors');
import sequelize from './models';
import router from './router';
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
// const session = require('express-session');
const maxAge = parseInt(process.env.MAX_AGE!) || 3600000;
const secret = process.env.SESSION_SECRET || 'secret123';
const PORT = 3001;
app.use(cors(corsOptions));
app.use(express.json());
import fileUpload from 'express-fileupload';
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(
  session({
    secret: secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: maxAge,
    },
  })
);

app.use(router);

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}.`);
    });
  } catch (err) {
    console.log('error in server: ', err);
  }
})();

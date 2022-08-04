const express = require('express');
const cors = require('cors');
const sequelize = require('./models');
const Router = require('./router.js');
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
const session = require('express-session');
const maxAge = parseInt(process.env.MAX_AGE) || 3600000;
const secret = process.env.SESSION_SECRET || 'secret123';
const PORT = 3001;
app.use(cors(corsOptions));
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(
  session({
    path: '/',
    secret: secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: maxAge,
    },
  })
);

app.use(Router);

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

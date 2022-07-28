const express = require('express');
const cors = require('cors');
const sequelize = require('./models')
const Router = require("./router.js");
const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
}
const PORT = 3001;
app.use(cors(corsOptions));
app.use(express.json());
app.use(Router);


(async () => {
    try{
        await sequelize.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}.`);
        })
    } catch(err){
        console.log('error in server: ', err);
    }
})()
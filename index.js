const express = require('express');
const bodyParser = require('body-parser');
const { handleErrors } = require('./middleware/handleError');
const { router } = require('./routes/handler');
const { validateTransfer, validateTransferId } = require('./middleware/validateTransfer');
const PORT = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.json());
app.use(handleErrors);




app.use("/", validateTransfer, validateTransferId, router)









const start = async()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Transfer server started successfully on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
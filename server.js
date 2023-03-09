import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

app.get('/', (req, res)=>{
    res.status(200).json("Slash route works!");
});
app.use('/api', router);

connect().then(
    ()=>{
        app.listen(port, (err)=>{
            if(err){
                console.log('Can\'t listen to the specified port due to:\n'+err);
            }else{
                console.log('Listening at port:\n'+port);
            }
        })
    }
).catch(
    (error)=>{
        console.log('Can\'t connect to the database due to:\n'+error);
    }
);
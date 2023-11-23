import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import { config } from './config.js';

const app = express();
app.use(cors());
const router = express.Router()

app.use(express.json())

router.post('/verify', (req, res) => {
  try {
    jwt.verify(req.body.token, config.jwtSecret , (err, decode)=>{
      if(err){
        res.status(200).json({ status: false });
      }else{
        res.status(200).json({ status:true, data: decode });
      }
    });
  } catch(error) {
    res.status(500).json({ status: false })
  }
})

app.use('/',router);

app.listen(config.port, ()=>{
  console.log(`Server started on port ${config.port}`);
});

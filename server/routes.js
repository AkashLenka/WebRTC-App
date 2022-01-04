const express= require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log("server is running");
    res.send({repsonse: "Server is running"}).status(200);
});

module.exports = router;
const express= require('express');
const socket= require('socket.io');
const http= require('http');
const {adduser,deleteuser,getuserinroom,getuser}=require('./user');
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io=socket(server);
const router=require("./routes");

io.on('connect',(socket)=>{
    socket.on('connect',()=>{
        console.log("The user has been connected");
    });
    socket.on('disconnect',({id})=>{
        const user=deleteuser(id);
        if(user)
        {
            console.log("The user has been disconnected");
            socket.broadcast.to(user.room).emit('message',{user:'admin',Text:`The ${user.name} has left`});
            socket.emit('roomdata',{room:user.room, num_rooms:getuserinroom(user.room)});
        }
    });
    socket.on('join',({name,room})=>{
        const {error,user}=adduser({id:socket.id,name:name,room:room});

        //if(error)
          //  return callback(error);

        socket.emit('message',{user:'admin',Text:`Welcome ${user.name} to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',Text:`${user.name} has joined the room`});
        socket.emit('roomdata',{room: user.room, num_rooms:getuserinroom(user.room)});
        socket.join(user.room);
        //callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user=getuser(socket.id);
        socket.emit('sendmsg',{user:user,Text:message});
        console.log(message);
        callback();
    });
});

app.use(router);

server.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
});
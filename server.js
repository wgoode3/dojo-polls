const express = require("express"),
          app = express(),
         port = 8000;

app.use(express.static(__dirname + "/static"));

const server = app.listen(port, function(){
    console.log(`server is running on port: ${port}`);
});
const io = require('socket.io')(server);

const votes = {
    'yes': 0,
    'no': 0,
    'meh': 0
};

io.on('connection', function (socket) { 
  
    console.log(socket.id);

    socket.on('c', function(data){
        console.log(data);
        socket.emit('d', votes);
    })

    socket.on('vote', function(data){
        votes[data.choice]++;
        socket.emit('results', votes);
        socket.broadcast.emit('results', votes);
    });

      
});
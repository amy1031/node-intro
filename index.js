var express = require('express')
var bodyParser = require('body-parser')
var server = express()
var port = 3000


server.use(bodyParser.json())


server.get('/', function(req, res, next){
    res.send(200, "Hello I hear you...")
})

server.get('/banana', function(req, res, next) {
    res.send("Here is your banana")
})

var people = [{
    name: "Luke"
}, {
    name:"Obiwan"
}]
server.get('/people', function(req, res, next) {
    res.send(people)
})


server.get('/people/:id', function(req, res, next) {
    var id = req.params.id //it will build the params object for you
    console.log(id)
    if(people[id]){
    res.send(people[id])
    } else {
        res.send(404, {
            error: {
                message: "Sorry, no person at id " + id
            }
        })
    }
})





server.post('/people', function(req, res, next){
    var newPerson = req.body.person
    var secret = req.body.secret

    if(newPerson.name && secret == "These are not the droids you are looking for") {
        people.push(newPerson)
        res.send('Ok')
    } else {
        res.send(401, "Sorry, you must have a name to add a person")
    }
    
})






server.listen(port, function() {
    console.log("The server is working and listening for requests on port: ", port)
}) 
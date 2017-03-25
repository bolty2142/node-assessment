/**
 * Created by beebe on 3/24/2017.
 */
const express = require("express");
const bodyParser = require("body-parser");
const users = require("./userCtrl.js");

const app = express();


app.use(bodyParser.json());



app.get(`/api/users`, function(req, res){


        if(req.query.favorites){
            res.status(200).json(users.getUsersByFavorite(req.query))
        }
        else if(req.query.age){

                res.status(200).json(users.getUsersByAgeLimit(req.query.age))

        }
        else if(req.query.last_name){
            res.status(200).json(users.findUserByQuery("last_name", req.query.last_name))
        }
        else if(req.query.email){
            res.status(200).json(users.findUserByQuery(`email`, req.query.email))
        }

        else{

       let index = users.readAll();
        res.status(200).json(index)
    }
});


app.get(`/api/users/:id`, (req, res) =>{
    if(req.params.id > 0) {
        res.send(users.findUserById(req.params.id))
    }
    else res.status(404).send("Not found");
});

app.get(`/api/admins`, (req,res) =>{
    res.status(200).json(users.getAdmins())
});

app.get(`/api/nonadmins`, (req,res) =>{

        res.json(users.getNonAdmins("type", "user"));

})
app.put(`/api/users/:id`, (req,res) =>{

    res.status(200).json(users.updateUser(req.params.id, req.body));
});
app.post(`/api/users`, function(req,res){

    res.status(200).send(users.createUser(req.body));
});
app.delete(`/api/users/:id`, (req,res) =>{

    res.status(200).send(users.removeUser(req.params.id))
})








//
// app.listen(4000, () =>{
//     console.log("Im listing to you on 4000")
// });


module.exports = app;


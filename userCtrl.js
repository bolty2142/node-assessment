/**
 * Created by beebe on 3/24/2017.
 */
const users = require("./users.js");
let userArray = users.find();




exports.readAll = () => {
   return users.find();
};

exports.findUserById = (id) =>{
     return users.findOne("id", id);
};

exports.getAdmins = () => {
     return users.find("type", "admin");
};

exports.getNonAdmins = () =>{
    return users.find("type", "user");
};

exports.getUsersByFavorite = (fav) => {
    let favs = [];
    for(let i = 0; i < userArray.length; i++) {
        for(let j = 0; j < userArray[i].favorites.length; j++){
            if (userArray[i].favorites[j] === fav){
                favs.push(userArray[i])
            }
        }
    }
    if(favs.length > 0){
        return favs;
    }else{
        return null;
    }
}

exports.getUsersByAgeLimit = (Q) => {
    let usrs = users.find();
    let age = usrs.filter((val)=>{
        return val.age < Q
    })
     return age;
}

exports.findUserByQuery = (param1, param2) =>{
    return users.find(param1, param2);
}

exports.createUser = (body) =>{
    return users.add(body);
}

exports.updateUser = (id, body) =>{
    return users.update("id", id, body)
}

exports.removeUser = (id)=>{
    return users.remove("id", id);
}
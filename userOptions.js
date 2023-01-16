const {v4: uuidv4} = require('uuid');
const fs = require('fs')
const file = './users.json'

let fileContents;

fs.readFile(file, 'utf-8', (err, contents) => {
    if (err) {
        console.log(err);
        return
    }

    try {
        const infoObj = JSON.parse(contents);
        fileContents = infoObj;
    } catch (error) {
        console.log(error)
    }
})

function saveFile() {
    fs.writeFile(file, JSON.stringify(fileContents), (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function updateUserData(id, data) {
    fileContents["users"].forEach((elem, index) => {
        if (elem['UserID'] === id) {
            fileContents["users"][index] = data;
        }
    })
}

function getUserInfo(id) {
    let info;
    
    fileContents["users"].forEach(elem => {
        if (elem['UserID'] === id) {
            info = elem;
        }
    })

    return info
}

function getUsers() {
    return fileContents["users"]
}

function remove(id) {
    let info;
    
    fileContents['users'].forEach((elem, index) => {
        if (elem['UserID'] === id) {
            info = index;
        }
    })

    fileContents["users"].splice(info, 1)

    saveFile()
}

function add(obj) {
    let user = {
        'UserID': uuidv4(),
        'Username': obj.body.username,
        'Name': obj.body.name,
        'Email': obj.body.email,
        'Age': obj.body.age
    }

    fileContents["users"].push(user)

    saveFile()
}

exports.add = add;
exports.remove = remove;
exports.getUsers = getUsers;
exports.getUserInfo = getUserInfo;
exports.updateUserData = updateUserData;
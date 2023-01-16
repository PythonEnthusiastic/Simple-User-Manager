const userOptions = require('./userOptions.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {
        user_info: userOptions.getUsers()
    })
})

// display users by only using their name and when they click em then redirect to data

app.post('/', (req, res) => {
    userOptions.add(req)
    res.redirect('/')
})

app.get('/create-user', (req, res) => {
    res.render('create_user')
})

app.get('/users/:userID', (req, res) => {
    let info = userOptions.getUserInfo(req.params.userID)

    res.render('edit', {
        id: info['UserID'],
        name: info['Name'],
        username: info['Username'],
        age: info['Age'],
        email: info['Email']
    })
})

app.post('/users/:userID', (req, res) => {
    let id = req.params.userID;
    let newInfo = {
        'UserID': id,
        'Username': req.body.username,
        'Name': req.body.name,
        'Email': req.body.email,
        'Age': req.body.age
    }

    userOptions.updateUserData(id, newInfo)

    res.redirect('/')
})

app.get('/delete/:user', (req, res) => {
    userOptions.remove(req.params.user)
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Listening to port ' + port)
})

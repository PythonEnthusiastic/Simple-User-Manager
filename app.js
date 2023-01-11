const express = require('express');

const app = express();
const port = process.env.PORT || 4200;

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/users/:username', (req, res) => {
    
})

app.listen(port, () => {
    console.log('Listening to port' + port)
})

const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()

const path = require('path')

const PORT = process.env.PORT || 5000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

const otherstuff="Hey guys this is Ndroid"

//set handlebar routes
app.get('/', function (req, res) {
    res.render('home',{
        stuff: otherstuff
    });
});

//set static folder
app.use(express.static(__dirname+'/public'))

app.listen(PORT,()=>console.log('Server listening at port '+PORT))


//Stock Market App Using Node

const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()

const request = require('request')
const bodyParser = require('body-parser')

const path = require('path')

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

const otherstuff="Hey guys this is Ndroid"

//call api
function call_api(finishedAPI,name)
{
    request('https://cloud.iexapis.com/stable/stock/'+ name +'/quote?token=pk_ad1067ee00b141c183b79c8e42ce38bb',{json:true},(err,res,body)=>{
        if(err) return console.log(err)
        if(res.statusCode==200) finishedAPI(body) 
    })
}

//set handlebar index get routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home',{
            stock : doneAPI
        });
    },'fb') 
})

//set handlebar index post routes
app.post('/', function (req, res) {
    call_api(function(doneAPI){
       // stock_name=req.body.stock_name
        res.render('home',{
            stock : doneAPI
            //,stock_name:stock_name
        });
    },req.body.stock_name) 
});


//stock api key pk_ad1067ee00b141c183b79c8e42ce38bb


//about route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(__dirname+'/public'))

app.listen(PORT,()=>console.log('Server listening at port '+PORT))


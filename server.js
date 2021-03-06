
const express = require(`express`)
const app = express()
const path = require(`path`)
const url = require(`urllib`)

app.use(express.static(path.join(__dirname, `node_modules`)))
app.use(express.static(path.join(__dirname, `dist`)))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let fullData

url.request(`http://data.nba.net/10s/prod/v1/2018/players.json`, (err, res)=>{
    fullData=JSON.parse(res).league.standard
})

app.get(`/teams/:teamName`, function(req, res){  
    const teamId = teamToIDs[req.params.teamName]
    let players = []
    for (let i in fullData){
        if (fullData[i].teamId== teamId && fullData[i].isActive ){
            players.push(fullData[i])
        }
    }
    let relevantData = players.map(p =>{return{ 
        firstName:p.firstName, lastName:p.lastName, jersey:p.jersey, pos:p.pos
    }})

res.send(relevantData)
})


const port = 3001
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})
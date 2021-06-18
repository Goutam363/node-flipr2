const express=require("express")
const geoCode=require('./utils/geoCode.js')
const processing = require("./db/mongodb")
const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.post('/location',(req,res)=>{
    if(!req.body){
        return res.send({
            error:'You must provide an address...'
        })
    }
    addresses=req.body
    console.log(addresses)
    const result_address=[]
    let i=0
    for(const address of addresses)
    {
        geoCode(address,(error,{location,latitude,longitude}={})=>{
            if(error){
                return res.send({error})
            }
            result_address.push({
                add:location,
                location:[latitude,longitude]
            })
            if(i===addresses.length-1)
            {
                console.log(result_address)
                return res.send(result_address)
            }
            i++;
        })
    }
})

app.post('/process/:id',(req,res)=>{
    processing(req.body[0],req.params.id,req.query.name,(error,{output}={})=>{
        if(error){
            return res.send({error})
        }
        //console.log(output)
        res.setHeader('Name','Goutam Halder')
        res.setHeader('Contact','haldergoutam363@gmail.com')
        res.send(output)
    })
})

app.post('*',(req,res)=>{
    res.status(400).send('Make valid request')
})

app.use((req, res, next)=>{
    if(req.method==='GET'){
        res.send('GET requests are disabled...')
    }else{
        next()
    }
})

app.use((req, res, next)=>{
    if(req.method==='PATCH'){
        res.send('PATCH requests are disabled...')
    }else{
        next()
    }
})

app.use((req, res, next)=>{
    if(req.method==='DELETE'){
        res.send('DELETE requests are disabled...')
    }else{
        next()
    }
})

app.listen(port,()=>{
    console.log('Server is up at port '+port)
})
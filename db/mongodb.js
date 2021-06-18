const {MongoClient,ObjectID}=require('mongodb')

//const connectionURL='mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/'
const databaseName='__CONCOX__'
//const collection1='devices'
//const collection2='status'

const processing=(connectionURL,collection1,collection2,callback)=>{
    MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
        if(error){
            return console.log('Unable to connect to database...')
        }
        console.log('Database connected successfully...')
        const db=client.db(databaseName)

        db.collection(collection1).find({}).limit(30).toArray((error,devices)=>{
            if(error){
                return console.log('Unable to fetching data...')
            }
            // console.log(devices)
            const res={}
            for(let i=0;i<devices.length;i++){
                db.collection(collection2).find({case:devices[i].id.slice(1)}).limit(50).toArray((error,statuses)=>{
                    if(error){
                        return console.log('Unable to fetching data...')
                    }
                    for(let j=0;j<statuses.length;j++){
                        statuses[j]=statuses[j].gps
                    }
                    statuses.reverse()
                    // console.log(statuses)
                    res[devices[i].id]=statuses
                    if(i===devices.length-1){
                        //console.log(res)
                        callback(undefined,{output:res})
                    }
                })
            }
        })    
    })
}

module.exports=processing
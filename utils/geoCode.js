const request=require('request')
const apiKey='AIzaSyA5bwbEsAOUMOI4RK2zXcIayG4vjuQSpcw'

const geoCode=(address,callback)=>{
    const url='https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+apiKey
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the geoLocation service...',undefined)
        }else if(body.length===0){
            callback(' Location not found!!!',undefined)
        }else{
            callback(undefined,{
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng,
                location:body.results[0].formatted_address
            })
        }
    })    
}

module.exports=geoCode
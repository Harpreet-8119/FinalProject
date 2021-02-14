const request = require('postman-request')

const weather = (query,callback)=>{
    const api_key = '7a1b6d6342842744a32ab9e262c9f435'
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`
    request({url,json:true},(error,res,data)=>{
        if(error){
            callback('Connectivity Error',undefined)
        }
        else if(data.error){
            callback('Check the Location',undefined)
        }
        else{
            callback(undefined,data)
        }
    })
}

module.exports = weather
module.exports.setConfig = function(){
    process.env.MONGOOSE_CONNECT = "mongodb://localhost:27017/test"
    process.env.SECRET_KEY = "mykey"
    process.env.CLIENT_ID = '615403106003.620521868369';
    process.env.CLIENT_SECRET = 'f700f2c409f0ea70b944a4e2c683efe3';
}

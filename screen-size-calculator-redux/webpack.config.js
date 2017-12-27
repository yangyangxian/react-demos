module.exports = {
    entry:{
        screenCalculator : __dirname + '/src/index.js' 
    },
    output:{
        path: __dirname + '/dist',
        filename: '[name].js'
    }
}
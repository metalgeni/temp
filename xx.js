//console.log('!!!')

const http = require('http')
const moment = require('moment')
const fs = require('fs')
const server = http.createServer(function(req,res) {
    try {
        res.writeHead(200, {'Content-Type':'text\plain'})
        if(req.method == "POST") {
            //Console.LOG('!!!')
            let url = req.url
            // url = url.replace(/\//gi, '')
            // url = url.replace(/&/gi, ' ')


            // let text = str[0].replace('index=', '')
            let uid = getUrl(url, 'uid')
            let index = getUrl(url, 'index')
            //let standardTime = getUrl(url, 'standardTime')
            let now = moment()
            let filename
            let buf = 0 // 재생시간
            
            req.on('data', function(chunk) {
                buf = buf + chunk.length
                filename = now + '_' + uid + '_' + index + '.wav'
                fs.appendFileSync(filename, chunk)
            })
            
            req.on('end', function() {


                res.end('100099')
                console.log('finish ~ !!')
            })
        } else {
            res.end('Undefined request')
        }
    } catch (e) {
        res.end(e)
    }
})
server.listen(33201)
console.log('Server running on port 33201')


function getUrl(str, text) {
    let start = str.indexOf(text)


    if (start) {
        str = str.slice(start)


        let end = str.indexOf('&')
        if (0 <= end) {
            str = str.slice(0, end)
        }


        let mid = str.indexOf('=')


        str = str.slice(mid +1)


        return str
    } else {
        return null
    }
}
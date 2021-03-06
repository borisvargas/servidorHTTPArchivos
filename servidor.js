var http = require('http');     // modulo http
var url = require('url');        // modulo url GET
var fs = require('fs');     // modulo para ver archivos

// crear el servidor http
var servidor = http.createServer(function(request, response) { // request: recibir
    if (request.method == 'GET') {
        var uri = url.parse(request.url).pathname;
        console.log(uri);                               // /doc/test2.json
        if (fs.existsSync('.' + uri)) {                 // si existe ./doc/test2.json
            console.log('Encontrado....');
            var archivo = fs.readFileSync('.' + uri);   //  ./doc/test2.json
            var file_split = uri.split('/');
            var file_name = file_split[2];
            var ext_split = file_name.split('.');
            var file_ext = ext_split[1];
            if (file_ext === 'pdf') {
                response.writeHead(200, {'Content-Type': 'application/pdf'});
            }else {
                response.writeHead(200, {'Content-Type': 'text/plain'});
            }
            response.end(archivo, 'binary');
            return;
        } else {
            console.log('NO encontrado....');
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }
    }
});

servidor.listen(9876); // http://127.0.0.1:9876

console.log(' -- Servidor Iniciado -- ');
console.log( ' Escuchando http://127.0.0.1:9876');

// http://localhost:9876/doc/test2.json
// http://localhost:9876/doc/test.pdf
// http://localhost:9876/pub/test2.html
// http://localhost:9876/pub/iamgen.png
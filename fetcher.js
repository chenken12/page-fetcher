const net = require('net');
const fs = require('fs');

const filewrite = function(path, wdata) {
  fs.writeFile(path, wdata, err => {
    if (err) {
      console.error(err)
      return;
    }

    //file written successfully
    const stats = fs.statSync(path);
    console.log(`Downloaded and saved ${stats.size} bytes to ${path}.`);
  });
}

const connect = function(url, filePath, callwrite) {
  let urltohost = new URL(url);

  const conn = net.createConnection({ 
    //host: 'example.edu',
    host: urltohost.host,
    port: 80
  });
  
  conn.setEncoding('UTF8');
  
  conn.on('connect', () => {
    console.log(`Connected to server!`);
  
    conn.write(`GET / HTTP/1.1\r\n`);
    conn.write(`Host: example.edu\r\n`);
    conn.write(`\r\n`);
  });
  
  conn.on('data', (data) => {
    //console.log(data);
    callwrite(filePath, data);
    conn.end();
  });
};

const arg = process.argv.slice(2);
connect(arg[0], arg[1], filewrite);
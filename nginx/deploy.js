var shell = require('shelljs');

shell.exec("npm install --production");
shell.exec("pm2 start pm2.json");
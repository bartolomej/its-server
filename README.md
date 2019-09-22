# ITS server app
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


### Setup

To install and work on its run:

```shell
git clone https://github.com/bartolomej/its-server
cd its-server
npm install
```

Environment variables:

```
// database config
DB_PORT = <port-number>
DB_HOST = <host-address>
DB_USER = <username>
DB_PASSWORD = <password>
DB_NAME = <name>

// app config
PORT = <app-port>
```


### Code style

- check for style warnings: `npx standard` or `npm test`
- automatically format code: `npx standard --fix`

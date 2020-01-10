# Sparebnb

> Proxy Server rendering multiple modules for Sparebnb, a short-term vacation rental site


## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)

## Usage

```bash
# clone this repository
$ git clone https://github.com/1021sdc/patrick-proxy.git

# Install dependencies
$ npm install

# Run the app
$ npm run start-node
```

## Requirements

- [npm](http://npmjs.com)
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com)

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### SDC CRUD ROUTES:

#### GET ('/getAll/:id')

> express route which serves up all json data from individual modules

#### GET ('/photos/:id')

> express route which pulls info from the photos module

#### GET ('/listings/:id')

> express route which pulls info from the listings module

#### GET ('/reviews/:id')

> express route which pulls info from the reviews module

#### GET ('/MoreHomes')

> express route which pulls info from the more homes module

#### GET ('/booking')

> express route which pulls info from the booking/room module

#### GET ('/room')

> express route which pulls info from the more booking/room module

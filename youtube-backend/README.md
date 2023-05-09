
## Node Express.js Backend Starter Template

### Description

Starter Template for building demos and apps with node.js and express.js<br/>
Main purpose of this starter is to save developers time, which is usually spend on creating basic skeletons and structure when building demos and apps with nodejs and express.js

### What's inside

- [x] Pre-defined structure
- [x] Prepared code for databases connections
- [x] Pre-defined api controllers and services
- [x] Prepared validations for api
- [x] Pre-defined global app errors handling
- [x] Prepared strucure for middlewares
- [x] Prettier configerd
- [x] Eslint configured
- [x] Jest test environment configured
- [x] Swagger open api docs prepared for implementation
- [x] Pm2 support for production

### Before use

##### Envs

You need to setup envs before using the starter.<br/>

```bash
$ touch .env # create env file
# check .env.example for envs names
```

### How to use

- Before first launch:<br/>

  ```bash
   # before fisrt start
   npm install
  ```

- Start/stop app:<br/>

  ```bash
    # run in dev mode
    npm run start:dev 

    # run in prod mode
    npm run start:prod

    #run tests
    npm run test[:watch/:coverage]

    #format with prettier
    npm run format
  ```

### Swagger docs

Starter has pre-defined support of swagger docs. If open api docs are needed, expand swagger.json file with needed docs


### What's next

Main purpose of this starter template is to rid developers of creating the basic projects skeleton and spending a lot of time with setting up demos and projects configs.<br/>
- Feel free to use this starter template for building own apps, modify it as you need and actually change it whatever you like to fit your project demands.<br/>
- Feel free to add the database connection(s) that you need in the app. 
- Feel free to add the auth strategies that you need in the app.
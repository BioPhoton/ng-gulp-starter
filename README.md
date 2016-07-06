#Setup

for general information visit the official
[ionic guide](http://ionicframework.com/docs/guide/).


##Setup environment 

- nodeJs

The pre-requisite for building or running the project is to have
[node.JS](https://nodejs.org/en/download/) installed.
 
If you don't have the executable `npm` in your PATH you can check it with ```which npm``
Download and install the version for your OS.

!!!NOTICE!!!
Versions are not the same through OS.

Version 2 of `npm` is required; version 3 will not work on Linux. 
@TODO check versions for windows 

Linux/OS X downgrade:
    sudo npm install -g npm@latest-2

- ionic environment

To setup/re-setup the ionic development environment and all the project dependencies 
execute the script `setup-environment.sh` or go through the steps manually. 

The `setup-environment` script installs:
  - ionic 
  - cordova 
  - bower 
  - tsd

The following command in a shell will install all three.   
The script `setup-environment.sh` also performs this task.     

```bash
$ sudo npm install -g ionic cordova bower typings
```


## Setup project for desktop development
 
###Git

Check out the project
  ```bash
  $ git clone [repository] [project name]
  ```
Check that the current user have write permissions to the newly created folder.
Then cd into the folder and check out the master branch
  ```bash
  $ cd [project_name]
  $ git checkout master
  ```

### Project
0. cd into the [project_name] folder.
```bash
   cd [project_name]
```

To setup/re-setup the project execute the script `reset-project.sh` or go through the steps manually.

The `reset-project.sh` script:
  - cleans all auto-generated folders
  - installs all dependencies for
    - npm
    - bower
    - tsd
  - compiles the initial codebase
  - creates device depending resources (icons and splashscreen images)
  - installs all supported platforms of this project
  - installs all cordova plugins
  
  
```bash
./reset-project.bash
```
 
1. Setup node_modules folder

  In the branch is a package.json file which
  contains all required node modules required for the gulp tasks as
  well as the platforms and plugins for cordova.
   
  When executing this command following folders will be generated:
  - node_modules
  
```bash
npm install
```

2. Setup typings folder

  In the branch is a tsd.json file which
  contains all required type definitions required for the project.
   
  When executing this command following folders will be generated:
  - typings
  
```bash
tsd install
```

3. Load bower lib's

   Third party libraries are installed via the `bower`.
   
   When executing this command following folders will be generated:
   - www
     - lib

```bash
bower update
```

4. init project (compile basic content for www folder)

```bash
gulp project:init
```

5. Subsequent manual compilations are done with

```bash
gulp project:compile
```
    
or by using the ```project:watch``` task
```bash
gulp project:watch
```
      
  5. 1. Environment specific compilations are done by setting then ```NODE_ENV``` var.
     By default the environment is set to local
  
```bash
$NODE_ENV='staging' gulp project:compile
```


###Setup custom environment variables

The project is shipped with a default environment setting.  
This can be overridden by creating the specific 
environments [env].config.json files in the config folder.

To setup/re-setup your personal config file execute the script `setup-evn-vars.sh` or go through the steps manually.

The `setup-evn-vars.sh` script:
  - copies the base.config.json and renames it to the users input
  - sets up a symlink to local.config.json
  
1. cd into the ```config``` folder

```bash
$ cd config
```

2. To create your custom ```local``` environment settings copy the
shipped ```base.config.json```

```bash
$ cp base.config.json [YourStringHere].config.json
```

3. Now setup a symbolic link of this file named ```local.config.json```

```bash
$ ln -s [YourStringHere].config.js local.config.json
```

3. 1. You can also create just the ```local.config.json``` if you prefer to work without symlinks

```bash
$ cp base.config.json local.config.json
```



##Serve project locally

You can run the project (without native functionality) in the browser.
```bash
$ ionic serve
```

You could implement templatecache and minified css by using following command.
```bash
$ gulp project:optimize
```

##Serve project in emulator
@TODO write doc

##Serve project on device

To build your project for platforms or debugging over console setup codrova platforms and plugins.
These are defined in the package.json file

```bash
$ ionic state restore
$ ionic resources
```

This will create the platforms folder and loads cordova android and ios platform.
It also creates the plugins folder and loads the plugins defined in package.json

To run the project on your mobile phone run following command

```bash
$ ionic run android -d -l -c
```


##View remote

To easily share project progress use [ionic view](http://view.ionic.io/).
You can view it over the ionic app_id located in ionic.project in the root folder.  
app ID: *??????*
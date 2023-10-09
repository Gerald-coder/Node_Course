# NPM

this stands for node package manager, when you install nodejs, you also install npm, it has its own documentation called npmJs.com,
npm provides us with thousands of packages that we can install and use in our application

# difference between npm package and the node common core module

the difference is that npm packages are node modules that are created by third parties or developers

# meta data

this is a data providing information about one or more aspect of a particular data

# package.json file

THis is a file that contains all the packages that your application depends and runs on. it contains the metadata of your application like the projects name, description, author, packages used etc
it contains the collection of any given projects dependencies, which are modules that the project depends on to function properly
by running npm install command in a given project, you can install all the listed dependencies in the package.json that the project relies on

the package.json file will stay with your repository if it is sent to github, but the packages themselves wont be sent to github, making it possible to transfer less data

when you build or host your application, it installs those packages there without having to transfer them over from github

the package.jon file is what npm reads to know what packages to install in your project when you run 'npm install'

when you install a particular package, it lies in the node modules folder, and has its own package.json file hence it has its own dependencies as well

the package.json file data is in a form of an object, where the package is the key and the versions are the values e.g <"react-dom" : "^8.3.5">, here, the 8 represents the major version, the 3 is the minor version and the 5 represents the patch, the caret <^> in from of the versions means to go ahead and allow an update to the minor version and the patch if need be, but do not update the major version, as the major version can have breaking changes to your appliation, without the caret sign in preceeding the version of the packages, what it means is that only that version of the package is allowed and will work for the application

<~> but when this symbol is in front of the version, it means that only the patch can and should be updated
<"\*"> while using an asteric sign like this means to go ahead and update everything , both the major, minor and patch should be updated, this means that the application should run with the latest version if the package at all times, but this is not too save

when installing a package and you want to install a particular version , you put the name of the package and an @ symbol just after it with the specific version you want to install e.g <npm install uuid@8.4.5>, but just running <npm install uuid> installs the latest version of the package to you dependencies and marks it with the caret symbol of not updating any major changes

# dependencies and devdependencies

DEPENDENCIES: this are packages that are required for your application to run properly, they can be called production dependencies
DEVDEPENDENCIES: this are packages required for development and testing purposes, to install a package as a dev dependency, you use the comman "npm install <package-name> --save-dev" or for short "npm install <package-name> -D"
PEERDEPENDENCIES: are the packages that your package expects to be installed in the user's environment

# npm i nodemon -g

install this package, helps monitor your files and as you save, it automatically restarts your server, after its installation, you type the command "nodemon" on your command line and it is put into action.
it will search for the index.js file by default where you don't need to type it out again to watch the file, except you have other file names aside from index

# adding a package to your application

1. npm init: to initialize the application as a node app

# N/B

anything in the gitignore file will not be included when you initialize git in your project, like the node_module because there is a lot of data in the node_module

# Scritps

npm scripts are powerful and flexible tools that allow us to define custom commands and automate repetitive tasks with ease

# to check if there are updates in your packages in the package.json file

you run the comman <npm update>

# uninstalling packages

to unistall packages in the package.json file, you use the command <npm uninstall package-name> or <npm un package name> or <npm rm package-name>

but when you have a package that is a script, after uninstallation, the package leaves the dependencies or devdependencies but does not leave the script, you have to manually remove it from the script

// n/b EventEmitter calls all listeners synchronously in the order the are registered, but you can make listeners asynchronous using the setTimers or process.nextTick

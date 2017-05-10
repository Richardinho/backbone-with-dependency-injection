# Diogenes

A Dependency Injection library for Javascript.

### introduction
Dependency injection is a way of creating objects within a Javascript application that helps to make code cleaner, and facilitates testing by decoupling objects from the implementation of their dependencies.

### Installation
Use npm to pull package down from NPM.
```
    npm install --save Diogenes
```
Import constructor function and use to create an instance of the injector.
```
    let Diogenes = require('Diogenes');
    let injector = new Diogenes();
```
Dependency injection operates on POJSO (Plain Ol' Javascript Objects). Define constructor functions as normal, passing in dependencies through function parameters.
```
    let Dep1 = function () {}
    
    let Dep2 = function () {}
    
    let Foo = function (options) {
        this.dep1 = options.dep1;
        this.dep2 = options.dep2;
    }
```



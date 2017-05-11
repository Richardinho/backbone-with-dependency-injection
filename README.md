# DIogenes

A Dependency Injection library for Javascript.

### Introduction
Dependency injection is a way of creating objects within a Javascript application.
 Its advantages are that it helps to reduce object creation code boilerplate, making clode cleaner, and it facilitates testing by decoupling objects from their implementation.

I have written more generally on the subject of [dependency injection](http://blog.richardhunter.co.uk/index.php/9) on my blog.

I have also created a small [demo app](https://richardinho.github.io/Diogenes) which uses DIogenes in order to show it working as part of an application. The code for this app is within the repository.


#### Note on terminology
In the context of dependency injection, an object taking the role of a dependency being injected into another object is known as a 'service'. The object receiving the service is known as the 'client'. Within the DI system, objects take the role of both service and client according to whether they are being injected or being injected into.

### Installation
Use npm to pull package down from NPM.
```
    npm install --save Diogenes
```

### Tutorial

Begin by importing the constructor function and using that to create an instance of the injector.
```
    let Diogenes = require('Diogenes');
    let injector = new Diogenes();
```
Dependency injection operates on POJSO (Plain Ol' Javascript Objects). Define constructor functions as normal, passing in any dependencies they have through function parameters.
```
    let Dep1 = function () {

        this.name = 'I am dep1';
    }

    let Dep2 = function () {

        this.name = 'I am dep2';
    }

    let Foo = function (options) {
        this.dep1 = options.dep1;
        this.dep2 = options.dep2;
    }
    Foo.inject = ['dep1', 'dep2'];
```
Tell the injector about these objects, or services, using the `register()` function.
The first argument is the 'token' by which we refer to this service.
The second argument is the 'service provider' which is an object that teaches the injector how to create the service.
In this case, the service provider is the constructor function. 
The third argument is a constant which gives additional information to the injector as to how to create a service. 
Injector.INSTANCE tells the injector to create a new instance of the service every time a client object asks for it. 
Other constants are described below in the API section.

```
    injector.register('dep1', Dep1, Diogenes.INSTANCE );
    injector.register('dep2', Dep2, Diogenes.INSTANCE );
    injector.register('foo',  Foo,  Diogenes.INSTANCE );
```

An object declares its dependencies using annotations. In DI systems, annotations can take many different forms. In Diogenes, they consist of an  array of string service tokens, as shown in the above example. This array is assigned to the static `inject` property of the constructor function.

```
    Foo.inject = ['dep1', 'dep2'];
```

Note also that property on the options object by which we access a service is also derived from the service token. For this reason, tokens should not contain characters that are illegal within Javascript properties.

The last step is to bootstrap the DI system. This is done using the `start()` method. The first argument to `start()` is a service token representing the object at the root of our dependency tree. The DI system will instantiate this object and all of its dependencies, and, by recursion, all the objects that make up the dependency tree. The second argument is a call back which is called once this process is completed. It is passed the aforementioned root object.

```
    injector.start('foo', function (foo) {
        console.log(foo.dep1.name, foo.dep2.name);
    });
```
---

## API

### Constants
These are passed to the `register()` method to give instructions to the injector as to how to create services.

| Name                        | Purpose                                         |
|-----------------------------|-------------------------------------------------|
| `Diogenes.INSTANCE`         | Specifies that the injector should return a new instance of the service on every request. The service provider must be a constructor function.|
| `Diogenes.CACHE_INSTANCE`   | Specifies that the injector should return the same instance of the service on every request.The service provider must be a constructor function. |
| `Diogenes.FACTORY_FUNCTION` | Specifies that the injector should return the result of calling the service provider on every request.The service provider must be a function. |
| `Diogenes.VALUE`            | Specifies that the injector should return the service provider on every request. The service provider can be any type of javascript function, object, or primitive. |
---

### Instance methods

## register(token, serviceProvider, mode, locals)

Register a service with the injector. Optionally provide arguments to be passed to the service provider.

- `token` - string identifier for this service
- `serviceProvider` - object that teaches injector how to create the instance. Varies depending on the mode (see constants above)
- `mode` - constant(see above) which provides additional info to the injector on how to create the dependency
- `locals` - additional optional arguments that can be passed to the service provider. When the service worker is called these locals will be the second argument passed.


## has(token)

Returns true if service has been registered on the injector.

- `token` - string identifier for this service
    
## get(token)

Returns service identified by token.

- `token` - string identifier for this service
    
## start(token, callback)

Bootstrapping method.

- `token` - string identifier for the root object of dependency tree
- `callback` - called once dependency tree has been created. Is passed an instance of the root object.


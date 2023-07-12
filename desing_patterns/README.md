# Desing Patterns

Design patterns are common solutions to frequently occurring problems in software design. They're like pre-made blueprints that can be customized to solve a recurring design problem in your code.
You cannot choose a pattern and copy it into the program as if it were ready-made functions or libraries. The pattern is not a specific piece of code, but a general concept to solve a particular problem. You can follow the details of the pattern and implement a solution that fits the realities of your own program. [^1]
---
### Pattern Clasification
Patterns are generally classified into the following groups:
1. Creational patterns
2. Structural patterns
3. Behavioral patterns

---
### Pattern Types [^1]
Below is a list of patterns according to their classification:
##### Creational patterns
1. Factory Method
2. Abstract Factory
3. Builder
4. Prototype
5. Singleton

##### Structural patterns
1. Adapter
2. Bridge
3. Composite
4. Decorator
5. Facade
6. Flyweight
7. Proxy

##### Behavioral patterns
1. Chain of Responsability
2. Command
3. Iterator
4. Mediador
5. Memento
6. Observer
7. State
8. Strategy
9. Template Method
10. Visitor

---
### Desing Pattern: Factory Method
The Factory design pattern controls how objects will be created and provides you with a quick way to create new objects, as well as a uniform interface that defines the properties that your objects will have. You can add as many dog breeds as you like, as long as the methods and properties exposed by the breed types remain the same, they will work perfectly.
However, keep in mind that the Factory pattern can often result in a large number of classes that are difficult to manage. [^2]

Pattern Schema [^3]
![](https://upload.wikimedia.org/wikipedia/commons/4/43/W3sDesign_Factory_Method_Design_Pattern_UML.jpg)

Example:
```sh
function Factory() {
   this.createDog = function (breed) {
       let dog;

       if (breed === "labrador") {
           dog = new Labrador();
       } else if (breed === "bulldog") {
           dog = new Bulldog();
       } else if (breed === "golden retriever") {
           dog = new GoldenRetriever();
       } else if (breed === "german shepherd") {
           dog = new GermanShepherd();
       }

       dog.breed = breed;
       dog.printInfo = function () {
           console.log("nnBreed: " + dog.breed + "nShedding Level (out of 5): " + dog.sheddingLevel + "nCoat Length: " + dog.coatLength + "nCoat Type: " + dog.coatType)
       }

       return dog;
   }
}

function Labrador() {
   this.sheddingLevel = 4
   this.coatLength = "short"
   this.coatType = "double"
}

function Bulldog() {
   this.sheddingLevel = 3
   this.coatLength = "short"
   this.coatType = "smooth"
}

function GoldenRetriever() {
   this.sheddingLevel = 4
   this.coatLength = "medium"
   this.coatType = "double"
}

function GermanShepherd() {
   this.sheddingLevel = 4
   this.coatLength = "medium"
   this.coatType = "double"
}

function run() {

   let dogs = [];
   let factory = new Factory();

   dogs.push(factory.createDog("labrador"));
   dogs.push(factory.createDog("bulldog"));
   dogs.push(factory.createDog("golden retriever"));
   dogs.push(factory.createDog("german shepherd"));

   for (var i = 0, len = dogs.length; i < len; i++) {
       dogs[i].printInfo();
   }
}

run()
```



[^1]: https://refactoring.guru/es/design-patterns/what-is-pattern
[^2]: https://kinsta.com/es/blog/patrones-de-diseno-javascript/#qu-es-un-patrn-de-diseo-de-javascript
[^3]: https://en.wikipedia.org/wiki/Factory_method_pattern
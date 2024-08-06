# TypeScript Essential Training
This is the repository for the LinkedIn Learning course TypeScript Essential Training. The full course is available from [LinkedIn Learning][lil-course-url].

![TypeScript Essential Training][lil-thumbnail-url] 

TypeScript lets you write JavaScript the same way you always do. That’s because TypeScript compiles to plain JavaScript and works with any browser, any host, and any operating system. It adds a variety of helpful tools and syntax to an already mature language, bringing the power and productivity of open-source, object-oriented development to fully compatible, core JavaScript.

In this course, Jess Chadwick teaches you how to leverage the full power of the TypeScript language in your JavaScript applications. Revisit some of the JavaScript fundamentals before turning to the data types, classes, generics, modules, and decorators that are unique to TypeScript. Get tips on defining complex types, extending and extracting metadata from existing types, and working with JavaScript modules to make your code more efficient. You can even try out your new TypeScript skills with the practice challenges along the way.

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Installing
1. To use these exercise files, you must have the following installed:
	- [NodeJS](https://nodejs.org/en/) and npm (included in the NodeJS installer)
    - Text editor of your choice - [VS Code](https://code.visualstudio.com) is highly recommended
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.


### Instructor

Jess Chadwick 
                            
Full-Stack Web Developer

                            

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/jess-chadwick).

[lil-course-url]: https://www.linkedin.com/learning/typescript-essential-training-14687057
[lil-thumbnail-url]: https://cdn.lynda.com/course/2428199/2428199-1647545390894-16x9.jpg

# Personal Notes

### Primitives and built-in types

Example of adding TS to javascript code

```Typescript
// without 
let dispayName = "Standing Desk";
let inventoryType = "furniture";
let trackingNumber = "FSD3453"
let createDate = new Date();
let originalCost = 425;

function getInventoryItem(trackingNumber){

}

function saveInventoryItem(item){

}

let inventoryItem = getInventoryItem(trackingNumber);

inventoryItem.createDate = new Date();

saveInventoryItem(inventoryItem);

// with TS
let dispayNameTS: string = "Standing Desk";
//let dispayNameTS: string = 1234; will display error on compile time and on IDE
let inventoryTypeTS: string = "furniture";
let trackingNumberTS: string = "FSD3453"
let createDateTS: Date = new Date();
let originalCostTS: any = 425;
originalCostTS = "A lot of money"; // no error since we used any type to make use of JS dynamic programing

/*
function getInventoryItem(trackingNumber: string): void { //void when not returning anything
}


function getInventoryItemTS(trackingNumber: string): object { //unespecified object
    return null;
}

*/

function getInventoryItemTS(trackingNumber: string): {
    displayName: string;
    inventoryType: string;
    trackingNumber: string;
    createDate: Date;
    originalCost: number;
} { 
    return null;
}


function saveInventoryItemTS(item){

}

let inventoryItemTS = getInventoryItemTS(trackingNumber);

inventoryItem.createDate = new Date();

saveInventoryItem(inventoryItem);

```


### JavaScript Types:


- String
- Boolean
- Number
- BigInt
- Null
- Undefined
- Symbols
- Object (all JS objects like funcions, date, ragex, array, etc)

## Interfaces

interfaces a usefull way to give TypeScript more information about the code that you're writing,
by define properties of an object, but you can also use the syntax to define methods as well
and wich of those properties are aptional with the question mark "?"
"readonly" are properties that wont be allowed to change

```Typescript
interface InventoryItem {
    displayName: string;
    inventoryType: string;
    readonly trackingNumber: string; //unchangable
    createDate: Date;
    originalCost?: number; //optional

    addNote?(note: string): string;

    //also use this syntax:
    // addNote: (note: string) => string;
}
```


## Enums
 TS feature that allows a way to restrict possible values, usefull when using hard coded values on code like options

```Typescript
enum InventoryItemType {
    Computer, // will default value to 0
    Furniture // will default value to 1
}

enum InventoryItemTypeString {
    Computer = "computer", // defining the value of
    Furniture = "furniture"
}

//and then we pass our enum to interface definition 

interface InventoryItemWithEnum {
    displayName: string;
    inventoryType: InventoryItemTypeString;
    readonly trackingNumber: string; //unchangable
    createDate: Date;
    originalCost?: number; //optional

    addNote?(note: string): string;
}
```

## Literal Type
another way to define restriced values using the pipe operator "|"

```Typescript
interface InventoryItemWithLiteralType {
    displayName: string;
    inventoryType: "computer" | "furniture";
    readonly trackingNumber: string; //unchangable
    createDate: Date;
    originalCost?: number; //optional '?'

    addNote?(note: string): string;
}
```

## Multiple Types

You can tell TS that a variable can have different types with the pipe operator

```Typescript
let originalCostTSMultipleValues: string | number =  425;

// you can also use a reusable type "type" with the "type" keyword 

type CostType = number | string;

let costWithReusableType: CostType = "big money"

costWithReusableType = 123
```

## TS use in JS classes

TypeScript in Classes enhances experience for developers, take a look using an interface:

```Typescript
interface Category {
    name: string,
    displayName: string,
    subCategories: { name: string, displayName: string }[] //an array containing objects like this
  }
```
  
Even though it's a very common pattern in the JavaScript world to assign values to properties in the constructor
in TypeScript, all possible properties must be defined at the class level like this:
```Typescript
  class InventoryStore {
    _categories: Category[] = []; // An array containing Caterories (defualt to empty array when initialized)
    _items: InventoryItem[] = []; // an array containing InventoryItems (also defualt to empty array when initialized)
    _isInitialized: Promise<boolean>; // a Promise that returns a boolean value

    //(...)

    //how do I define a property on the class itself, rather than its instances? 
    //with the static keyword

    // Create a "static" singleton instance for the entire application to use
    static instance = new InventoryStore();
  }
```


 ## Access Modifiers: Private Variables

underscore + variable name is a very popular convention to identify variables 
that should not be accessed outside of the class.  
In JavaScript the underscores don't actually do anything, they're just a suggestion
TypeScript does a little better than that. Like most object oriented languages, 
TypeScript provides us with the ability to hide, or encapsulate some or all of our class members, 
by using something called Access Modifiers.

- private -> only visible to members within the same class
- protected -> visible to members within the same class and derived classes
- public (default) -> visible to all consumers


```Typescript
class InventoryStoreWithAccessModifiers {
    private _categories: Category[] = []; // An array containing Caterories (defualt to empty array when initialized)
    private _items: InventoryItem[] = []; // an array containing InventoryItems (also defualt to empty array when initialized)
    private _isInitialized: Promise<boolean>; // a Promise that returns a boolean value

    //(omited code...)

    protected _load() {
        return Promise.all([
          getFromStorage("Categories"),
          getFromStorage("Inventory")
        ]).then(([categories, items]) => {
          this._categories = categories;
          this._items = items;
        });
      }

      protected _save() {
        return saveToStorage("Inventory", this._items);
      }
  }

```

## Partial and Omit
The partial utility type allows you to mark all properties of a type as optional. 

When we're originally creating the item, it might make sense to require all of those fields 
as we're doing in the existing save inventory function, 
but what if we want to add an update inventory item function like this:

```Typescript
function updateInventoryNoPartial(trackingNumber: string, item: InventoryItem) {
}
```
TS will complain because we marked all properties as neccesary:

```Typescript
updateInventoryNoPartial("123", {
displayName: "updated name", //and we are only giving one property
})
```

To correct we use the Partial:

```Typescript
function updateInventoryWithPartial(trackingNumber: string, 
    item: Partial<InventoryItem>) {
}

// no complains TS is happy because has made all properties optional but need to be the righ type
updateInventoryWithPartial("123", {
    displayName: "updated name",
    })
```

A good example of the Omit use case:

Once a tracking number has been assigned, I don't ever want it to be changed. 
In other words, I want to keep people from updating the tracking number property


```Typescript
updateInventoryWithPartial("123", {
    displayName: "updated name",
    trackingNumber: 4546, // we dont want this
    })


function updateInventoryWithPartialAndOmit(trackingNumber: string, 
    item: Omit< Partial<InventoryItemWithLiteralType>, "trackingNumber" | "createDate">) { // tells to 'exclude' trackingNumber and createDate
}

updateInventoryWithPartialAndOmit("123", {
    displayName: "updated name",
    createDate: new Date(); // we dont want this TS will notice
    })

```



## Generics
 A way to decorate a component with a type syntax in such a way that it can describe a variety of types rather than a single one.


```Typescript
function clone(source){
    const serialized = JSON.stringify(source);
    return JSON.parse(serialized)
}

const cloned = clone(inventoryItem); // this type is any because TS doesnt know about our funciton internals

```

The following solves it but limits to only InventoryItems
What if you want to use for many types of items
```Typescript
function cloneTS(source: InventoryItem): //limited to recieve  InventoryItem type interface
InventoryItem { 
    const serialized = JSON.stringify(source);
    return JSON.parse(serialized)
}

```
This is where generics are handy, a "type variable" that is defined in the function definition.
Stands for any type that you want it to, 
and you can use it anywhere that you'd use a regular type name:

```Typescript
function cloneTSWithGenerics<T>(source: T): T {
    const serialized = JSON.stringify(source);
    return JSON.parse(serialized)
}

// meaning we want to return same type as the one introduced as a paremeter but a generic one

const clonedG = cloneTSWithGenerics<InventoryItem>(inventoryItemTS);
```

You can pass as many as you want:

```Typescript
function cloneManyGenerics<T, U>(source: T, options: U): T{
    const serialized = JSON.stringify(source);
    return JSON.parse(serialized)
}

const cMG = cloneManyGenerics(inventoryItemTS, {deep: true})
```

Also can be used when declaring interfaces:

```Typescript
interface KeyValuePair<Tkey, TValue> {
    Key: Tkey,
    Value: TValue
}
```

Then use those generics to declare the types
```Typescript
var keyValue: KeyValuePair<string, number> = { Key: "something", Value: 1234}
var keyValue2: KeyValuePair<number, boolean> = { Key: 123, Value: true}
```

Or use generics in a class:
```Typescript
class KeyValuePair<Tkey, TValue> {
    Key: Tkey;
    Value: TValue;
}
```

## Combining multiple types

White the use of type aliases to create dynamic and more powerfull types, with the keyword "type".

```Typescript
type MyTypeAlias = string;
```

Using the pipe operator when defining an alias:

```Typescript
type SomeDate = Date | string | number;

// Then you can use it in an interface

interface Contact {
    name: string;
    id: number;
    birthdate: SomeDate;
}
```

Also is possible is to combine multiple types together to create a new type.

```Typescript
// Here we include all fields from address on contact
interface Contact extends Address{
    name: string;
    id: number;
}

interface Address {
    street: string;
    state: string;
}
```
And if we wanted to have two types of contacts, one with address and one without:

```Typescript
interface Contact{
    name: string;
    id: number;
}

interface Address {
    street: string;
    state: string;
}

interface AddressableContact extends Contact, Address {}

//also we can use this other syntaxt to accomplish the same:

type AddressableContact2 extends Contact & Address;

```

Also is possible to use a type alias instead of a enum:

```Typescript
enum Status {
    Active = "active"
    Inactive = "inactive"
    New = "new"
}

type StatusAsAlias = "active" | "inactive" | "new"

interface Contact{
    name: string;
    id: number;
    status: StatusAsAlias;
}
```
## keyof operator
powerfull syntaxt to restrict values dynamicall and avoid hard to debug errors

To understand take a look at the code below


```Typescript
type ContactName = string;
type ContactStatus = "active" | "inactive" | "new"
type ContactBirthDate = Date | number | string

interface Contact {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
}

let primaryContact: Contact = {
    id: 12345,
    name: "Jamie Johnson",
    status: "active"
}

type ContactFields = keyof Contact
const field : ContactFields = "status"


function getValue(source, propertyName){
    return source[propertyName]
}
//this will work fine
const someProperty = getValue(primaryContact, 'id')

//this will not work returning undefined
const someProperty =  getValue(primaryContact, 'lastname')
```
To avoid we can use keyof to limit the values to valid properties of the contact type/interface


```Typescript
function getValue(source, propertyName: keyof Contact){
    return source[propertyName]
}
```

We also can refactor to a generic function to be reusable with other types

```Typescript

function getValue <T, U extends keyof T>(source:T, propertyName: U){
    return source[propertyName]
}

const value = getValue({min:1,max:34},"max")

```










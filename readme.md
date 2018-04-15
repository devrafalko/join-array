# Description
`join-array` joins the elements of an array into a [String] value, and returns that value. In addition you can specify:
* the **regular separator**, that separates the subsequent items' values
* the **last separator**, that separates the last and the last but one item's value
* the **maximal number** of items to join. If the array contains more items that expected, it ommits the middle ones, joins the last one to the [String] chain and returns this incomplete chain.
* the **message** that replaces the missing items in the [String] chain.
* how **each** item's value should be displayed in the chain

Any bugs found? Give me to know on [GitHub](https://github.com/devrafalko/join-array)

# Installation
`npm install join-array`

```javascript
const join = require('join-array');
const names = ['Rachel','Taylor','Julia','Robert','Jasmine','Lily','Madison'];
const config = {
  array: names,
  separator: ', ',
  last: ' and ',
  max: 4,
  maxMessage:(missed)=>`(${missed} more...)`,
  each:(value)=>value
};
const list = join(config); //Rachel, Taylor, Julia, (3 more...) and Madison
```

```javascript
const join = require('join-array');
const cars = ['BMW','Tesla','Audi','Honda','Aston Martin','Cadillac','Citroen'];

const list = join(cars, " | ", " | ", 3, "[...]"); //BMW | Tesla | [...] | Citroen
```

# Usage
##### Syntax:
* **`join(array:Array, separator:String|null, last:String|null, max:Number|null, maxMessage:Function|String|null, each:Function|null)`**  
* **`join(config:Object)`**  where `config` contains the following properties: `array:Array`, `separator:String|null`, `last:String|null`, `max:Number|null`, `maxMessage:Function|String|null`, `each:Function|null`.

> When the `null` is passed as the argument, the default value is used for this parameter.
> When the [Object] `config` property is omitted *(if optional)* or set to `null`, the default value is used for this property.


> The `TypeError` is thrown when any argument type or `config` property type is invalid.  
> Follow the `TypeError.message` instructions  to configure the module.
##### `array` [Array]
**Description:** Indicates the [Array] object, which items are joined into the [String] value.

##### `separator` [String|null] *(optional)*
**Default:** `", "`  
**Description:** It separates all but the last one subsequent items of the `array`.
##### `last` [String|null] *(optional)*
**Default:** `" and "`  
**Description:** It separates the last and the last but one item of the `array`.
##### `max` [Number|null] *(optional)*
**Default:** `Infinity`  
**Description:** If defined, it limits the number of `array` items to be joined; *eg. if the `max` equals **`10`** and the `array` contains 100 items, the **first 9** items and the **100th** one are joined.*
##### `maxMessage` [Function|String|null] *(optional)*
**Default:** ``(missed)=>`(${missed} more...)` ``  
**Description:** If the number of `array` items is bigger than the `max` value, the missed items are replaced by the `maxMessage` value.  
* When `[String]`, it is directly appended into the [String] chain before the last item.  
* When `[Function]`, it expects the [String] value to be returned. The `missed` argument passed through this function equals the number of missed items and can be used in the returned [String] message.

##### `each` [Function|null] *(optional)*
**Default:** `null` 
**Description:** If the `each` is defined, the module loops through each `array` item and calls the [Function] `each` with the following parameters: `each(item, iter, array)`. Use `each` function to modify the value. The **returned** value will be used in the chain.

```javascript
const join = require('join-array');
const ids = [1,2,3,4,5];
const config = {
  array: ids,
  each:(value)=>`"id. ${value}"`
};
const list = join(config); //"id. 1", "id. 2", "id. 3", "id. 4" and "id. 5"
```
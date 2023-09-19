# Elements class

以下文档来自[phpQuery Wiki](https://code.google.com/archive/p/phpquery/)

---

- [属性操作](#anchor1)
- [遍历操作](#anchor2)
- [DOM操纵](#anchor3)
- [form表单序列化](#anchor4)

这些API方法与jQuery DOM操作API方法完全一致，具体可以查看jQuery手册

<a name="anchor1">
## 属性操作
### Example
```php
QueryList::html($html)->find('a')->attr('href', 'newVal')->removeClass('className')->html('newHtml')->...
```
### Table of Contents
  * [Attr](#Attr.md)
  * [Class](#Class.md)
  * [HTML](#HTML.md)
  * [Text](#Text.md)
  * [Value](#Value.md)
### Attr
  * **[attr](http://docs.jquery.com/Attributes/attr)**[($name)](http://docs.jquery.com/Attributes/attr) Access a property on the first matched element. This method makes it easy to retrieve a property value from the first matched element. If the element does not have an attribute with such a name, undefined is returned.
  * **[attr](http://docs.jquery.com/Attributes/attr)**[($properties)](http://docs.jquery.com/Attributes/attr) Set a key/value object as properties to all matched elements.
  * **[attr](http://docs.jquery.com/Attributes/attr)**[($key, $value)](http://docs.jquery.com/Attributes/attr) Set a single property to a value, on all matched elements.
  * **[attr](http://docs.jquery.com/Attributes/attr)**[($key, $fn)](http://docs.jquery.com/Attributes/attr) Set a single property to a computed value, on all matched elements.
  * **[removeAttr](http://docs.jquery.com/Attributes/removeAttr)**[($name)](http://docs.jquery.com/Attributes/removeAttr) Remove an attribute from each of the matched elements.
### Class
  * **[addClass](http://docs.jquery.com/Attributes/addClass)**[($class)](http://docs.jquery.com/Attributes/addClass) Adds the specified class(es) to each of the set of matched elements.
  * **[hasClass](http://docs.jquery.com/Attributes/hasClass)**[($class)](http://docs.jquery.com/Attributes/hasClass) Returns true if the specified class is present on at least one of the set of matched elements.
  * **[removeClass](http://docs.jquery.com/Attributes/removeClass)**[($class)](http://docs.jquery.com/Attributes/removeClass) Removes all or the specified class(es) from the set of matched elements.
  * **[toggleClass](http://docs.jquery.com/Attributes/toggleClass)**[($class)](http://docs.jquery.com/Attributes/toggleClass) Adds the specified class if it is not present, removes the specified class if it is present.
### HTML 
  * **[html](http://docs.jquery.com/Attributes/html)**[()](http://docs.jquery.com/Attributes/html) Get the html contents (innerHTML) of the first matched element. This property is not available on XML documents (although it will work for XHTML documents).
  * **[html](http://docs.jquery.com/Attributes/html)**[($val)](http://docs.jquery.com/Attributes/html) Set the html contents of every matched element. This property is not available on XML documents (although it will work for XHTML documents).
### Text
  * **[text](http://docs.jquery.com/Attributes/text)**[()](http://docs.jquery.com/Attributes/text) Get the combined text contents of all matched elements.
  * **[text](http://docs.jquery.com/Attributes/text)**[($val)](http://docs.jquery.com/Attributes/text) Set the text contents of all matched elements.
### Value
  * **[val](http://docs.jquery.com/Attributes/val)**[()](http://docs.jquery.com/Attributes/val) Get the content of the value attribute of the first matched element.
  * **[val](http://docs.jquery.com/Attributes/val)**[($val)](http://docs.jquery.com/Attributes/val) Set the value attribute of every matched element.
  * **[val](http://docs.jquery.com/Attributes/val)**[($val)](http://docs.jquery.com/Attributes/val) Checks, or selects, all the radio buttons, checkboxes, and select options that match the set of values.

Read more at [Attributes](http://docs.jquery.com/Attributes) section on [jQuery Documentation Site](http://docs.jquery.com/).

<a name="anchor2">
## 遍历操作
### Example
```php
QueryList::html($html)->find('div > p')->add('div > ul')->filter(':has(a)')->find('p:first')->nextAll()->andSelf()->...
```
### Table of Contents 
  * [Filtering](#Filtering.md)
  * [Finding](#Finding.md)
  * [Chaining](#Chaining.md)
### Filtering 
  * **[eq](http://docs.jquery.com/Traversing/eq)**[($index)](http://docs.jquery.com/Traversing/eq) Reduce the set of matched elements to a single element.
  * **[hasClass](http://docs.jquery.com/Traversing/hasClass)**[($class)](http://docs.jquery.com/Traversing/hasClass) Checks the current selection against a class and returns true, if at least one element of the selection has the given class.
  * **[filter](http://docs.jquery.com/Traversing/filter)**[($expr)](http://docs.jquery.com/Traversing/filter) Removes all elements from the set of matched elements that do not match the specified expression(s).
  * **[filter](http://docs.jquery.com/Traversing/filter)**[($fn)](http://docs.jquery.com/Traversing/filter) Removes all elements from the set of matched elements that does not match the specified function.
  * **[is](http://docs.jquery.com/Traversing/is)**[($expr)](http://docs.jquery.com/Traversing/is) Checks the current selection against an expression and returns true, if at least one element of the selection fits the given expression.
  * **[map](http://docs.jquery.com/Traversing/map)**[($callback)](http://docs.jquery.com/Traversing/map) Translate a set of elements in the jQuery object into another set of values in an array (which may, or may not, be elements).
  * **[not](http://docs.jquery.com/Traversing/not)**[($expr)](http://docs.jquery.com/Traversing/not) Removes elements matching the specified expression from the set of matched elements.
  * **[slice](http://docs.jquery.com/Traversing/slice)**[($start, $end)](http://docs.jquery.com/Traversing/slice) Selects a subset of the matched elements.
### Finding 
  * **[add](http://docs.jquery.com/Traversing/add)**[($expr)](http://docs.jquery.com/Traversing/add) Adds more elements, matched by the given expression, to the set of matched elements.
  * **[children](http://docs.jquery.com/Traversing/children)**[($expr)](http://docs.jquery.com/Traversing/children) Get a set of elements containing all of the unique immediate children of each of the matched set of elements.
  * **[contents](http://docs.jquery.com/Traversing/contents)**[()](http://docs.jquery.com/Traversing/contents) Find all the child nodes inside the matched elements (including text nodes), or the content document, if the element is an iframe.
  * **[find](http://docs.jquery.com/Traversing/find)**[($expr)](http://docs.jquery.com/Traversing/find) Searches for all elements that match the specified expression. This method is a good way to find additional descendant elements with which to process.
  * **[next](http://docs.jquery.com/Traversing/next)**[($expr)](http://docs.jquery.com/Traversing/next) Get a set of elements containing the unique next siblings of each of the given set of elements.
  * **[nextAll](http://docs.jquery.com/Traversing/nextAll)**[($expr)](http://docs.jquery.com/Traversing/nextAll) Find all sibling elements after the current element.
  * **[parent](http://docs.jquery.com/Traversing/parent)**[($expr)](http://docs.jquery.com/Traversing/parent) Get a set of elements containing the unique parents of the matched set of elements.
  * **[parents](http://docs.jquery.com/Traversing/parents)**[($expr)](http://docs.jquery.com/Traversing/parents) Get a set of elements containing the unique ancestors of the matched set of elements (except for the root element). The matched elements can be filtered with an optional expression.
  * **[prev](http://docs.jquery.com/Traversing/prev)**[($expr)](http://docs.jquery.com/Traversing/prev) Get a set of elements containing the unique previous siblings of each of the matched set of elements.
  * **[prevAll](http://docs.jquery.com/Traversing/prevAll)**[($expr)](http://docs.jquery.com/Traversing/prevAll) Find all sibling elements before the current element.
  * **[siblings](http://docs.jquery.com/Traversing/siblings)**[($expr)](http://docs.jquery.com/Traversing/siblings) Get a set of elements containing all of the unique siblings of each of the matched set of elements. Can be filtered with an optional expressions.
### Chaining 
  * **[andSelf](http://docs.jquery.com/Traversing/andSelf)**[()](http://docs.jquery.com/Traversing/andSelf) Add the previous selection to the current selection.
  * **[end](http://docs.jquery.com/Traversing/end)**[()](http://docs.jquery.com/Traversing/end) Revert the most recent 'destructive' operation, changing the set of matched elements to its previous state (right before the destructive operation).

Read more at [Traversing](http://docs.jquery.com/Traversing) section on [jQuery Documentation Site](http://docs.jquery.com/).

<a name="anchor3">
## DOM操纵
### Example
```php
QueryList::html($html)->find('div.old')->replaceWith( $ql->find('div.new')->clone() )->appendTo('.trash')->prepend('Deleted')->...
```
### Table of Contents 
  * [Changing Contents](#Changing_Contents.md)
  * [Inserting Inside](#Inserting_Inside.md)
  * [Inserting Outside](#Inserting_Outside.md)
  * [Inserting Around](#Inserting_Around.md)
  * [Replacing](#Replacing.md)
  * [Removing](#Removing.md)
  * [Copying](#Copying.md)
### Changing Contents 
  * **[html](http://docs.jquery.com/Manipulation/html)**[()](http://docs.jquery.com/Manipulation/html) Get the html contents (innerHTML) of the first matched element. This property is not available on XML documents (although it will work for XHTML documents).
  * **[html](http://docs.jquery.com/Manipulation/html)**[($val)](http://docs.jquery.com/Manipulation/html) Set the html contents of every matched element. This property is not available on XML documents (although it will work for XHTML documents).
  * **[text](http://docs.jquery.com/Manipulation/text)**[()](http://docs.jquery.com/Manipulation/text) Get the combined text contents of all matched elements.
  * **[text](http://docs.jquery.com/Manipulation/text)**[($val)](http://docs.jquery.com/Manipulation/text) Set the text contents of all matched elements.
### Inserting Inside
  * **[append](http://docs.jquery.com/Manipulation/append)**[($content)](http://docs.jquery.com/Manipulation/append) Append content to the inside of every matched element.
  * **[appendTo](http://docs.jquery.com/Manipulation/appendTo)**[($content)](http://docs.jquery.com/Manipulation/appendTo) Append all of the matched elements to another, specified, set of elements.
  * **[prepend](http://docs.jquery.com/Manipulation/prepend)**[($content)](http://docs.jquery.com/Manipulation/prepend) Prepend content to the inside of every matched element.
  * **[prependTo](http://docs.jquery.com/Manipulation/prependTo)**[($content)](http://docs.jquery.com/Manipulation/prependTo) Prepend all of the matched elements to another, specified, set of elements.
### Inserting Outside 
  * **[after](http://docs.jquery.com/Manipulation/after)**[($content)](http://docs.jquery.com/Manipulation/after) Insert content after each of the matched elements.
  * **[before](http://docs.jquery.com/Manipulation/before)**[($content)](http://docs.jquery.com/Manipulation/before) Insert content before each of the matched elements.
  * **[insertAfter](http://docs.jquery.com/Manipulation/insertAfter)**[($content)](http://docs.jquery.com/Manipulation/insertAfter) Insert all of the matched elements after another, specified, set of elements.
  * **[insertBefore](http://docs.jquery.com/Manipulation/insertBefore)**[($content)](http://docs.jquery.com/Manipulation/insertBefore) Insert all of the matched elements before another, specified, set of elements.
### Inserting Around
  * **[wrap](http://docs.jquery.com/Manipulation/wrap)**[($html)](http://docs.jquery.com/Manipulation/wrap) Wrap each matched element with the specified HTML content.
  * **[wrap](http://docs.jquery.com/Manipulation/wrap)**[($elem)](http://docs.jquery.com/Manipulation/wrap) Wrap each matched element with the specified element.
  * **[wrapAll](http://docs.jquery.com/Manipulation/wrapAll)**[($html)](http://docs.jquery.com/Manipulation/wrapAll) Wrap all the elements in the matched set into a single wrapper element.
  * **[wrapAll](http://docs.jquery.com/Manipulation/wrapAll)**[($elem)](http://docs.jquery.com/Manipulation/wrapAll) Wrap all the elements in the matched set into a single wrapper element.
  * **[wrapInner](http://docs.jquery.com/Manipulation/wrapInner)**[($html)](http://docs.jquery.com/Manipulation/wrapInner) Wrap the inner child contents of each matched element (including text nodes) with an HTML structure.
  * **[wrapInner](http://docs.jquery.com/Manipulation/wrapInner)**[($elem)](http://docs.jquery.com/Manipulation/wrapInner) Wrap the inner child contents of each matched element (including text nodes) with a DOM element.
### Replacing 
  * **[replaceWith](http://docs.jquery.com/Manipulation/replaceWith)**[($content)](http://docs.jquery.com/Manipulation/replaceWith) Replaces all matched elements with the specified HTML or DOM elements.
  * **[replaceAll](http://docs.jquery.com/Manipulation/replaceAll)**[($selector)](http://docs.jquery.com/Manipulation/replaceAll) Replaces the elements matched by the specified selector with the matched elements.
### Removing 
  * **[empty](http://docs.jquery.com/Manipulation/empty)**[()](http://docs.jquery.com/Manipulation/empty) Remove all child nodes from the set of matched elements.
  * **[remove](http://docs.jquery.com/Manipulation/remove)**[($expr)](http://docs.jquery.com/Manipulation/remove) Removes all matched elements from the DOM.
### Copying 
  * **[clone](http://docs.jquery.com/Manipulation/clone)**[()](http://docs.jquery.com/Manipulation/clone) Clone matched DOM Elements and select the clones.
  * **[clone](http://docs.jquery.com/Manipulation/clone)**[($true)](http://docs.jquery.com/Manipulation/clone) Clone matched DOM Elements, and all their event handlers, and select the clones.

Read more at [Manipulation](http://docs.jquery.com/Manipulation) section on [jQuery Documentation Site](http://docs.jquery.com/).

<a name="anchor4">
## form表单序列化

 * **[serialize](http://docs.jquery.com/Ajax/serialize)**[()](http://docs.jquery.com/Ajax/serialize) Serializes a set of input elements into a string of data. This will serialize all given elements.

* **[serializeArray](http://docs.jquery.com/Ajax/serializeArray)**[()](http://docs.jquery.com/Ajax/serializeArray) Serializes all forms and form elements (like the .serialize() method) but returns a JSON data structure for you to work with.

### 例子：操作github登录表单

```php
$form = QueryList::get('https://github.com/login')->find('form');

$form->find('input[name=login]')->val('github user');
$form->find('input[name=password]')->val('github password');

$data = $form->serialize();
print_r($data);

$data = $form->serializeArray();
print_r($data);


```
输出:
```php
0%5Bname%5D=utf8&0%5Bvalue%5D=%E2%9C%93&1%5Bname%5D=authenticity_token&1%5Bvalue%5D=EKXMN7xae%2BFZBv8r3y8qO2ICAwjAm9wfVt0S%2F9G7YuB2B7h%2Biw%3D%3D&2%5Bname%5D=login&2%5Bvalue%5D=github+user&3%5Bname%5D=password&3%5Bvalue%5D=github+password&4%5Bname%5D=commit&4%5Bvalue%5D=Sign+in

Array
(
    [0] => Array
        (
            [name] => utf8
            [value] => ✓
        )

    [1] => Array
        (
            [name] => authenticity_token
            [value] =>EKXMN7xae+FZBv8r3y8qO2ICAwjAm9wfVt0S/9G7YuB2B7h+iw==
        )

    [2] => Array
        (
            [name] => login
            [value] => github user
        )

    [3] => Array
        (
            [name] => password
            [value] => github password
        )

    [4] => Array
        (
            [name] => commit
            [value] => Sign in
        )

)
```
# naming-convention
Simple naming convention implementation for javascript, this functions translates names to Upper or Lower Camel Case 

```javascript
String.toUCamelCase('my-name-convention'); // -> 'MyNameConvention' 
String.toUCamelCase('my-name-convention', {'CONVENTION': 'conv'}); // -> 'MyNameConv'

String.toLCamelCase('my-name-convention'); // -> 'myNameConvention'
String.toLCamelCase('my-name-convention', {'CONVENTION': 'conv'}); // -> 'myNameConv'

'my-name-convention'.toUCamelCase(); // -> 'MyNameConvention' 
'my-name-convention'.toUCamelCase({'CONVENTION': 'conv'}); // -> 'MyNameConv' 

'my-name-convention'.toLCamelCase(); // -> 'myNameConvention' 
'my-name-convention'.toLCamelCase({'CONVENTION': 'conv'}); // -> 'myNameConv' 


```

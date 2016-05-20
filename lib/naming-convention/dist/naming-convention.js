if (!String.defaults) String.defaults = {};

String.defaults.toCamelCaseOptions = {
    firstCharAsUpper: false,
    //keeps camel case if exists
    keepCamel: true,
    // indicates map to replace words founded 
    // the keys must be UPPER CASE
    //[{'FROM': 'TO'}]
    wordMap: null //{'FIND': 'replaceTo' , 'FIND2':'orRePLEACEtoo'}; 
};
String.toCamelCase = function (str, options) {
    if (!options) options = String.defaults.toCamelCaseOptions;
    var out = ((options.firstCharAsUpper ? ' ' : '') + str);
    
    //keeps partials camel case existences
    if(options.keepCamel) out = out.replace(/([A-Z])/, function (mathc, sep, c) { return ' ' + mathc; });

    //replaces non alpha chartacters '$#{}[]...'
    out = out.split(/[^a-z\xDF-\xFF]|^$/).join(' ');

    // uppercase characters preceded by a space or number
    out = out.replace(/(\-|_|\s)+(.)?/g, function (mathc, sep, c) {
        return (c ? c.toUpperCase() : '');
    });


    return str;
};
String.toUCamelCase = function (str, keepCamel, wordMap) {
    return String.toCamelCase(str, { keepCamel: keepCamel, wordMap: wordMap, firstCharAsUpper: true });
};
String.toLCamelCase = function (str, keepCamel, wordMap) {
    return String.toCamelCase(str, { keepCamel: keepCamel, wordMap: wordMap, firstCharAsUpper: false });
};

String.prototype.toUCamelCase = function (keepCamel, wordMap) {
    return String.toUCamelCase(this, keepCamel, wordMap);
};
String.prototype.toLCamelCase = function (keepCamel, wordMap) {
    return String.toLCamelCase(this, keepCamel, wordMap);
};

//alert(String.toCamelCase('codIGo_clien99te'));
//alert(String.toCamelCase('codIGo_clien99te', { wordMap: { 'CODIGO': 'id' } }));
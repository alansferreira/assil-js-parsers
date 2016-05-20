if (!String.defaults) String.defaults = {};

String.defaults.toCamelCaseOptions = {
    firstCharAsUpper: false,
    //keeps camel case if exists
    keepCamel: true,
    // indicates map to replace words founded 
    // the keys must be UPPER CASE
    //[{'CODIGO': 'cod', 'NOME': 'NM'}] -> will replace 'CODIGO' to 'cod'
    wordMap: null
};

// String.defaults.toCamelCaseOptions = [{'CODIGO': 'cod', 'NOME': 'NM'}];

String.toCamelCase = function (str, options) {
    if (!options) options = String.defaults.toCamelCaseOptions;
    var out = str;

    //keeps partials camel case existences
    if (options.keepCamel) {
        out = out.replace(/([A-Z])/g, function (mathc, sep, c) { return ' ' + mathc; });
    } else {
        out = out.toLowerCase();
    }
    //replaces non alpha chartacters '$#{}[]...'
    out = out.split(/[^A-Za-z\xDF-\xFF]|^$/g).join(' ');
    if (options.firstCharAsUpper) {
        out = ' ' + out;
    } else {
        out = out.trim();
    }

    if (options.wordMap) {
        out = out.replace(/(\w+)/g, function (mathc, sep, c) {
            var replacement = options.wordMap[mathc.toUpperCase()];
            return replacement ? replacement : mathc;
        });
    }

    // uppercase characters preceded by a space or number
    out = out.replace(/(\-|_|\s)+(.)?/g, function (mathc, sep, c) {
        return (c ? c.toUpperCase() : '');
    });

    return out;
};
String.toUCamelCase = function (str, keepCamel, wordMap) {
    return String.toCamelCase(str, { keepCamel: (keepCamel == undefined ? true : keepCamel), wordMap: wordMap, firstCharAsUpper: true });
};
String.toLCamelCase = function (str, keepCamel, wordMap) {
    return String.toCamelCase(str, { keepCamel: (keepCamel == undefined ? true : keepCamel), wordMap: wordMap, firstCharAsUpper: false });
};

String.prototype.toUCamelCase = function (keepCamel, wordMap) {
    return String.toUCamelCase(this, keepCamel, wordMap);
};
String.prototype.toLCamelCase = function (keepCamel, wordMap) {
    return String.toLCamelCase(this, keepCamel, wordMap);
};

//alert(String.toCamelCase('codIGo_clien99te'));
//alert(String.toCamelCase('codIGo_clien99te', { wordMap: { 'CODIGO': 'id' } }));


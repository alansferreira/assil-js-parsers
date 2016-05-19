if (!String.defaults) String.defaults = {};

String.defaults.toCamelCaseOptions = {
    firstCharAsUpper: false,
    // indicates map to replace words founded 
    // the keys must be UPPER CASE
    //[{'FROM': 'TO'}]
    wordMap: null //{'FIND': 'replaceTo' , 'FIND2':'orRePLEACEtoo'}; 
};
String.toCamelCase = function (str, options) {
    if (!options) options = String.defaults.toCamelCaseOptions;

    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff that I don't understand
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    if (options.wordMap) {
        parts = str.toString().split(' ');
        for (var i = 0; i < parts.length; i++) {
            if (options.wordMap[parts[i]]) parts[i] = options.wordMap[parts[i]];
        }
        str = parts.join(" ");
    }

    // uppercase characters preceded by a space or number
    str = (options.firstCharAsUpper ? ' ' : '') + str;
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
};
String.prototype.toCamelCase = function (options) {
    return String.toCamelCase(this, options);
};

//alert(String.toCamelCase('codIGo_clien99te'));
//alert(String.toCamelCase('codIGo_clien99te', { wordMap: { 'CODIGO': 'id' } }));
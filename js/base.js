Object.deepExtend = function (destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor &&
         source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    } 
    return destination;
};
String.prototype.replaceAll = function (search, replacement) {
    var ret = this.toString().replace(search, replacement);
     
    while (ret.indexOf(search)!=-1) {
        ret = ret.replace(search, replacement);
    }
    return ret;

};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, '');
};
String.isNullOrWhiteSpace = function (value) {
    return value == null || value.toString().trim()=="";
};
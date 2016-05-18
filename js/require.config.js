/// <reference path="../lib/jquery/dist/jquery.min.js" />
/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="../lib/named-regexp/lib/named-regexp.js" />
/// <reference path="../lib/angular-ui-ace/ui-ace.min.js" />

requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: '../lib/jquery/dist/jquery.min.js',
        angular: '../lib/angular/angular.min.js',
        'named-regexp': '../lib/named-regexp/lib/named-regexp.js',
        'ace-editor': '../lib/ace-builds/src-min-noconflict/ace.js',
        'angular-ui-ace': '../lib/angular-ui-ace/ui-ace.min.js',
        'sql-ansi-parser': 'sql.parsers.bundle.js',
    }
});
/// <reference path="../lib/jQuery/dist/jquery.min.js" />

/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="base.js" />
/// <reference path="sql.ansi.parser.js" />
/// <reference path="../lib/requirejs/require.min.js" />
/// <reference path="../lib/mustache.js/mustache.min.js" />

//////require(["jquery", "ace-editor", "angular", "angular-ui-ace", ]);

var app = angular.module('parserApp', ['ui.ace']);

var ctrl = app.controller("ctrl", function ($scope) {

    $scope.sqlScript = $("#sampleSource").text();
    $scope.template = '{{#databases}}' +
                      '\n{{name}}' +
                      '\n    {{#tables}}' +
                      '\n        {{#schema}}{{schema}}.{{/schema}}{{name}}{{#columns}}' +
                      '\n            {{name}} {{type}} {{#precision}}({{precision}}{{#scale}}, {{scale}}{{/scale}}){{/precision}} {{#isPrimary}}PK{{/isPrimary}}{{/columns}}' +
                      '\n    {{/tables}}' +
                      '\n{{/databases}}';

    $scope.output = "";

    $scope.databases = [{name: 'sample'}];
    
    $scope.parseAndApplyTemplate = function () {
        var scriptCopy = $scope.sqlScript;
        scriptCopy = scriptCopy.replace(/\t\r\n/, " ");

        $scope.databases[0].tables = sql.ansi.parser.tableScript(scriptCopy);

        $scope.output = Mustache.render($scope.template, { databases: $scope.databases });
    };

    $scope.aceOptionBase = {
        useWrapMode: false,
        theme: 'twilight',
        onChange: aceChanged = function (_ace) {
            $scope.parseAndApplyTemplate();
        }
    };
    $scope.aceOptionSource = $.extend({ mode: 'sql' }, $scope.aceOptionBase);
    $scope.aceOptionTemplate = $.extend({ mode: 'javascript' }, $scope.aceOptionBase);
    $scope.aceOptionOutput = $.extend({ mode: 'text' }, $scope.aceOptionBase);

});
/// <reference path="../lib/jQuery/dist/jquery.min.js" />

/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="base.js" />
/// <reference path="sql.ansi.parser.js" />

var app = angular.module('parserApp', ['ui.ace']);

var ctrl = app.controller("ctrl", function ($scope) {

    $scope.sqlScript = $("#sample").text();

    $scope.databases = [{name: 'sample'}];

    $scope.aceOption = {
        useWrapMode: false,
        theme: 'twilight',
        mode: 'sql',
        onChange: aceChanged = function (_ace) {
            var scriptCopy = $scope.sqlScript;
            scriptCopy = scriptCopy.replace(/\t\r\n/, " ");

            $scope.databases[0].tables = sql.ansi.parser.tableScript(scriptCopy);

        }
    };

});
/// <reference path="../lib/jQuery/dist/jquery.min.js" />

/// <reference path="../lib/angular/angular.min.js" />
/// <reference path="base.js" />
/// <reference path="sql.ansi.parser.js" />
/// <reference path="../lib/requirejs/require.min.js" />
/// <reference path="../lib/doT/doT.min.js" />

//////require(["jquery", "ace-editor", "angular", "angular-ui-ace", ]);

var app = angular.module('parserApp', ['ui.ace']);

var ctrl = app.controller("ctrl", function ($scope) {

    $scope.sqlScript = $("#sampleSource").text();
    $scope.template =
                        "{{~it.databases :db:dbi}}\n" +
                        "{{=db.name}}\n" +
                        "    {{~db.tables :tb:tbi}}{{='\\n    '}}\n" +
                        "    {{=tb.schema}}.{{=tb.name}}\n" +
                        "        {{~tb.columns :c:ci}}{{='\\n        '}}\n" +
                        "        {{=c.name}} {{=c.type}} {{=c.precision}} {{=c.scale}} {{=c.isPrimary}}\n" +
                        "        \n" +
                        "        {{~}}\n" +
                        "    \n" +
                        "    {{~}}\n" +
                        "{{~}} \n";


    $scope.output = "";

    $scope.databases = [{name: 'sample'}];
    
    $scope.parseAndApplyTemplate = function () {
        var scriptCopy = $scope.sqlScript;
        scriptCopy = scriptCopy.replace(/\t\r\n/, " ");

        $scope.databases[0].tables = sql.ansi.parser.tableScript(scriptCopy);

        $scope.output = doT.template($scope.template)({ databases: $scope.databases });
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
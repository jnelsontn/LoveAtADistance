'use strict';

app.config(($interpolateProvider) => {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');
});
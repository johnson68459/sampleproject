sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 're.keyprocessanalyreport',
            componentId: 'Processed_InProcessing_1List',
            contextPath: '/Processed_InProcessing_1'
        },
        CustomPageDefinitions
    );
});
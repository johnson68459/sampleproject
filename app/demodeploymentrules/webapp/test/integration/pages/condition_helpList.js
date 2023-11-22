sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 're.demodeploymentrules',
            componentId: 'condition_helpList',
            contextPath: '/condition_help'
        },
        CustomPageDefinitions
    );
});
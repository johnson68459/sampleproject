sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 're.keyprocessanalyreport',
            componentId: 'Processed_InProcessing_1ObjectPage',
            contextPath: '/Processed_InProcessing_1'
        },
        CustomPageDefinitions
    );
});
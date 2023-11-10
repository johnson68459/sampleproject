sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 're.invoicesumreport',
            componentId: 'InvoiceObjectPage',
            contextPath: '/Invoice'
        },
        CustomPageDefinitions
    );
});
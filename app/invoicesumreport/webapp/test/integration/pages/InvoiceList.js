sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 're.invoicesumreport',
            componentId: 'InvoiceList',
            contextPath: '/Invoice'
        },
        CustomPageDefinitions
    );
});
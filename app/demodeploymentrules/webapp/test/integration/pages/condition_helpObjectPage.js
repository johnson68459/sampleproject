sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 're.demodeploymentrules',
            componentId: 'condition_helpObjectPage',
            contextPath: '/condition_help'
        },
        CustomPageDefinitions
    );
});
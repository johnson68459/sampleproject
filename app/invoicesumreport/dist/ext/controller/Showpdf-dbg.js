sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        _showpdf: function(oEvent) {
            // MessageToast.show("Custom handler invoked.");
            this.showSideContent("GeneratedFacet1");
        }
    };
});

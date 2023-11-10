sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        're/invoicesumreport/test/integration/FirstJourney',
		're/invoicesumreport/test/integration/pages/InvoiceList',
		're/invoicesumreport/test/integration/pages/InvoiceObjectPage',
		're/invoicesumreport/test/integration/pages/Invoice_child_itemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, InvoiceList, InvoiceObjectPage, Invoice_child_itemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('re/invoicesumreport') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheInvoiceList: InvoiceList,
					onTheInvoiceObjectPage: InvoiceObjectPage,
					onTheInvoice_child_itemsObjectPage: Invoice_child_itemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);
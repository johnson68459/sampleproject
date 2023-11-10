sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        're/productivityreport/test/integration/FirstJourney',
		're/productivityreport/test/integration/pages/ProductivityList',
		're/productivityreport/test/integration/pages/ProductivityObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductivityList, ProductivityObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('re/productivityreport') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductivityList: ProductivityList,
					onTheProductivityObjectPage: ProductivityObjectPage
                }
            },
            opaJourney.run
        );
    }
);
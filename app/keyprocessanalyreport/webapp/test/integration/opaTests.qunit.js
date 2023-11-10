sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        're/keyprocessanalyreport/test/integration/FirstJourney',
		're/keyprocessanalyreport/test/integration/pages/Processed_InProcessing_1List',
		're/keyprocessanalyreport/test/integration/pages/Processed_InProcessing_1ObjectPage'
    ],
    function(JourneyRunner, opaJourney, Processed_InProcessing_1List, Processed_InProcessing_1ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('re/keyprocessanalyreport') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProcessed_InProcessing_1List: Processed_InProcessing_1List,
					onTheProcessed_InProcessing_1ObjectPage: Processed_InProcessing_1ObjectPage
                }
            },
            opaJourney.run
        );
    }
);
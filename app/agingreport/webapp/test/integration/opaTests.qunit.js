sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        're/agingreport/test/integration/FirstJourney',
		're/agingreport/test/integration/pages/AgingList',
		're/agingreport/test/integration/pages/AgingObjectPage'
    ],
    function(JourneyRunner, opaJourney, AgingList, AgingObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('re/agingreport') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAgingList: AgingList,
					onTheAgingObjectPage: AgingObjectPage
                }
            },
            opaJourney.run
        );
    }
);
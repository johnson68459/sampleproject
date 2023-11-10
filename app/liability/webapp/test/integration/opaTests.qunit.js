sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'my/liability/test/integration/FirstJourney',
		'my/liability/test/integration/pages/LiabilityList',
		'my/liability/test/integration/pages/LiabilityObjectPage'
    ],
    function(JourneyRunner, opaJourney, LiabilityList, LiabilityObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('my/liability') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheLiabilityList: LiabilityList,
					onTheLiabilityObjectPage: LiabilityObjectPage
                }
            },
            opaJourney.run
        );
    }
);
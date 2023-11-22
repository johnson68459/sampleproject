sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        're/assignmentruleselipo/test/integration/FirstJourney',
		're/assignmentruleselipo/test/integration/pages/mainObjectPage'
    ],
    function(JourneyRunner, opaJourney, mainObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('re/assignmentruleselipo') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThemainObjectPage: mainObjectPage
                }
            },
            opaJourney.run
        );
    }
);
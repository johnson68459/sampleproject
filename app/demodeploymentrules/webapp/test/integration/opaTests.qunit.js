sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        're/demodeploymentrules/test/integration/FirstJourney',
		're/demodeploymentrules/test/integration/pages/condition_helpList',
		're/demodeploymentrules/test/integration/pages/condition_helpObjectPage'
    ],
    function(JourneyRunner, opaJourney, condition_helpList, condition_helpObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('re/demodeploymentrules') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThecondition_helpList: condition_helpList,
					onThecondition_helpObjectPage: condition_helpObjectPage
                }
            },
            opaJourney.run
        );
    }
);
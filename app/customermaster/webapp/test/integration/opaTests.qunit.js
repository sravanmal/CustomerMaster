sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ust/sravan/customermaster/test/integration/FirstJourney',
		'ust/sravan/customermaster/test/integration/pages/CustomerMasterList',
		'ust/sravan/customermaster/test/integration/pages/CustomerMasterObjectPage',
		'ust/sravan/customermaster/test/integration/pages/BilltoAddressObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomerMasterList, CustomerMasterObjectPage, BilltoAddressObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ust/sravan/customermaster') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomerMasterList: CustomerMasterList,
					onTheCustomerMasterObjectPage: CustomerMasterObjectPage,
					onTheBilltoAddressObjectPage: BilltoAddressObjectPage
                }
            },
            opaJourney.run
        );
    }
);
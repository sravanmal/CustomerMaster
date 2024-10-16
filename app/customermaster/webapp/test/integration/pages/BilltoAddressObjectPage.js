sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ust.sravan.customermaster',
            componentId: 'BilltoAddressObjectPage',
            contextPath: '/CustomerMaster/Billto'
        },
        CustomPageDefinitions
    );
});
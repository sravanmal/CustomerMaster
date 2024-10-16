using CustomerMasterService as service from '../../srv/customer-master';
annotate service.CustomerMaster with @(
    
    UI.SelectionFields:[

        NAME1,
        NAMEV,
        CustomerNumber,
        TELF1

     ],
     UI.LineItem:[

        {
            $Type : 'UI.DataField',
            Value : CustomerNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Value : NAME1,
        },
        {
            $Type : 'UI.DataField',
            Value : NAMEV,
        },
        {
            $Type : 'UI.DataField',
            Value : PARAU,
        },
        {
            $Type : 'UI.DataField',
            Value : Payer,
        },
        {
            $Type : 'UI.DataField',
            Value : SORTL,
        },
     ],
     UI.HeaderInfo:{
        TypeName: 'Customer Master',
        TypeNamePlural: 'Customer Master',
    },

    UI.Facets:[
        {
            $Type : 'UI.CollectionFacet',
            Label: 'General Information',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label: 'Order Details',
                    Target : '@UI.Identification'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label: 'Configuration Details',
                    Target : '@UI.FieldGroup#Spiderman'
                },
            ],
        },
        
    ],
    UI.Identification:[
        {
            $Type : 'UI.DataField',
            Value : CustomerNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Value : NAME1,
        },
    ],
    UI.FieldGroup #Spiderman: {
        Label : 'PO pricing',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : NAMEV,
            },
            {
                $Type : 'UI.DataField',
                Value : PARNR,
            },
            {
                $Type : 'UI.DataField',
                Value : SORTL,
            },
            {
                $Type : 'UI.DataField',
                Value : TELF1,
            },
        ],

    },
);


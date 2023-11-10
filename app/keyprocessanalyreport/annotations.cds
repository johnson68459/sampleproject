using CatalogService as service from '../../srv/cat-service';

annotate service.Processed_InProcessing_1 with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: progress,
        Label: 'Progress',
    },
    {
        $Type: 'UI.DataField',
        Value: po,
        Label: 'PO',
    },
    {
        $Type: 'UI.DataField',
        Value: npo,
        Label: 'NPO',
    },
    {
        $Type: 'UI.DataField',
        Value: _all,
        Label: 'All',
    },
    {
        $Type         : 'UI.DataFieldForIntentBasedNavigation',
        SemanticObject: 'keyprocesschartsob',
        Action        : 'keyprocesschartact',
        Label         : 'Chart',
        // Inline        : true,
        // IconUrl       : 'sap-icon://business-objects-experience'
    },
]);

annotate service.Processed_InProcessing_1 with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'progress',
                Value: progress,
            },
            {
                $Type: 'UI.DataField',
                Label: 'po',
                Value: po,
            },
            {
                $Type: 'UI.DataField',
                Label: 'npo',
                Value: npo,
            },
            {
                $Type: 'UI.DataField',
                Label: '_all',
                Value: _all,
            },
        ],
    },
    UI.Facets                     : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup1',
    }, ]
);

annotate service.Processed_InProcessing_1 with @(UI.SelectionPresentationVariant #tableView: {
    $Type              : 'UI.SelectionPresentationVariantType',
    PresentationVariant: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem', ],
    },
    SelectionVariant   : {
        $Type        : 'UI.SelectionVariantType',
        SelectOptions: [],
    },
    Text               : 'Processed/In-Processing Invoices',
});

annotate service.Total_liabilities_1 with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: liabilities,
            Label: 'Liabilities',
        },
        {
            $Type: 'UI.DataField',
            Value: po_1,
            Label: 'PO',
        },
        {
            $Type: 'UI.DataField',
            Value: npo_1,
            Label: 'NPO',
        },
        {
            $Type: 'UI.DataField',
            Value: total_liabilities_1,
            Label: 'Total Liabilities',
        },
        {
            $Type         : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject: 'keyprocesschartsob',
            Action        : 'keyprocesschartact',
            Label         : 'Chart',
            // Inline        : true,
            // IconUrl       : 'sap-icon://business-objects-experience'
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Total liabilities',
    }
);

annotate service.Vendors with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Label: 'Vendor Code',
            Value: vendor_code,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Vendor Name',
            Value: vendor_name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Source of supply',
            Value: sos,
        },
        {
            $Type: 'UI.DataField',
            Label: ' Amount',
            Value: amount,
        },
        {
            $Type: 'UI.DataField',
            Label: 'currency',
            Value: currency,
        },
        {
            $Type         : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject: 'keyprocesschartsob',
            Action        : 'keyprocesschartact',
            Label         : 'Chart',
            // Inline        : true,
            // IconUrl       : 'sap-icon://business-objects-experience'
        },
    ],
    UI.SelectionPresentationVariant #tableView: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#tableView', ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
        Text               : 'Vendors',
    }
);

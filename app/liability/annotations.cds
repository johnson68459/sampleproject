using CatalogService as service from '../../srv/cat-service';

annotate service.Liability with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Vendor Name',
        // Position:10,
        Value: vendor_name,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Vendor No.',
        Value: vendor_no,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Comp Code',
        Value: company_code,
    },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Total No Of Invoice',
        Value                    : total_no_of_invoice,
        Criticality              : 3,
        CriticalityRepresentation: #WithoutIcon,

    },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Total Amount',
        Value                    : total_amount,
        Criticality              : 3,
        CriticalityRepresentation: #WithoutIcon,
    },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Total No Of Invoice Due',
        Value                    : total_no_of_invoice_due,
        Criticality              : 1,
        CriticalityRepresentation: #WithoutIcon,
    },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Total Due Amount',
        Value                    : total_due_amount,
        Criticality              : 1,
        CriticalityRepresentation: #WithoutIcon,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total No Of Invoice Overdue',
        Value: total_no_of_invoice_due_crossed,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Overdue Amt',
        Value: total_over_due_amount,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total No Of Invoice Posted',
        Value: total_no_of_invoice_paid,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Amt Posted',
        Value: total_paid_amount,
    },
    {
        $Type : 'UI.DataFieldForIntentBasedNavigation',
        SemanticObject : 'liabilitychartsob',
        Action : 'liabilitychartact',
        Label : 'Chart',
        // Inline: true,
        // IconUrl:'sap-icon://business-objects-experience'
    }
]);

annotate service.Liability with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'vendor_no',
                Value: vendor_no,
            },
            {
                $Type: 'UI.DataField',
                Label: 'company_code',
                Value: company_code,
            },
            {
                $Type: 'UI.DataField',
                Label: 'currency',
                Value: currency,
            },
            {
                $Type: 'UI.DataField',
                Label: 'overdue_flag',
                Value: overdue_flag,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_amount',
                Value: total_amount,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_amt_paid',
                Value: total_amt_paid,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_due_amount',
                Value: total_due_amount,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_no_of_invoice',
                Value: total_no_of_invoice,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_no_of_invoice_due',
                Value: total_no_of_invoice_due,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_no_of_invoice_due_crossed',
                Value: total_no_of_invoice_due_crossed,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_no_of_invoice_paid',
                Value: total_no_of_invoice_paid,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_no_of_paid_invoice',
                Value: total_no_of_paid_invoice,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_over_due_amount',
                Value: total_over_due_amount,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_paid_amount',
                Value: total_paid_amount,
            },
            {
                $Type: 'UI.DataField',
                Label: 'vendor_name',
                Value: vendor_name,
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

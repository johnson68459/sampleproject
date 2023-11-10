using CatalogService as service from '../../srv/cat-service';

annotate service.Invoice with @UI.PresentationVariant: {
    Visualizations: ['@UI.LineItem'],
    SortOrder     : [{
        $Type     : 'Common.SortOrderType',
        Property  : invoice_no,
        Descending: true
    }, ],
};


annotate service.Invoice with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Invoice No.',
        Value: invoice_no,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Vendor Name',
        Value: vendor_name,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Vendor No.',
        Value: vendor_no,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Document Type',
        Value: document_type,
    },
    // {
    //     $Type                    : 'UI.DataField',
    //     Label                    : 'Overdue Flag',
    //     Value                    : overdue_flag,
    //     Criticality              : ovrdueflag,
    //     CriticalityRepresentation: #WithIcon,
    // },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Overdue Flag',
        Value                    : overdue_flag,
        Criticality              : ovrdueflag,
        CriticalityRepresentation: #WithIcon,
    },
    // {
    //     $Type                    : 'UI.DataField',
    //     Label                    : 'Overdue Flag',
    //     Value                    : overdue_flag,
    //     Criticality              : {$edmJson: {$If: [
    //         {$Eq: [
    //             {$Path: 'document_status'},
    //             'tosap'
    //         ]},
    //         3,
    //         1
    //     ]}},
    //     CriticalityRepresentation: #WithIcon,
    // },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Invoice Status',
        Value                    : document_status,
        Criticality              : {$edmJson: {$If: [
            {$Eq: [
                {$Path: 'document_status'},
                'tosap'
            ]},
            3,
            1
        ]}},
        CriticalityRepresentation: #WithoutIcon,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Amount',
        Value: amount,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Invoice Date',
        Value: invoice_date,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Due Date',
        Value: due_date,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Payment Terms',
        Value: payment_terms,
    },
    {
        $Type                    : 'UI.DataField',
        Label                    : 'Days to Due',
        Value                    : days_to_due,
        Criticality              : ovrdueflag,
        CriticalityRepresentation: #WithoutIcon,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Ref-PO No.',
        Value: ref_po_num,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Comp Code',
        Value: company_code,
    },
    {
        $Type: 'UI.DataField',
        Label: 'AP Processor',
        Value: user_processing,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Approvers',
        Value: approvers.approver,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Start Date',
        Value: entry_date,
    },
    {
        $Type: 'UI.DataField',
        Label: 'End Date',
        Value: end_date,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Process Duration',
        Value: process_duration,
    },
    {
        $Type         : 'UI.DataFieldForIntentBasedNavigation',
        SemanticObject: 'invoicechartsob',
        Action        : 'invoicechartact',
        Label         : 'Chart',
    // Inline: true,
    // IconUrl:'sap-icon://business-objects-experience'
    },
]);

annotate service.Invoice with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: irn,
                Label: 'IRN'
            },
            {
                $Type: 'UI.DataField',
                Value: gstin,
                Label: 'GSTIN'
            },
            {
                $Type: 'UI.DataField',
                Value: doc_type_desc,
                Label: 'Document Type'
            },
            {
                $Type: 'UI.DataField',
                Value: ref_po_num,
                Label: 'Ref. Invoice No.'
            },
            {
                $Type: 'UI.DataField',
                Value: invoice_date,
                Label: 'Invoice Date'
            },
            {
                $Type: 'UI.DataField',
                Value: posting_date,
                Label: 'Posting Date'
            },
            {
                $Type: 'UI.DataField',
                Value: payment_terms,
                Label: 'Payment Terms'
            },
            {
                $Type: 'UI.DataField',
                Value: baseline_date,
                Label: 'Due Date'
            },
            {
                $Type: 'UI.DataField',
                Value: supplier_id,
                Label: 'Vendor Code'
            },
            {
                $Type: 'UI.DataField',
                Value: payment_method,
                Label: 'Payment Method'
            },
            {
                $Type: 'UI.DataField',
                Value: currency,
                Label: 'Currency'
            },
            {
                $Type: 'UI.DataField',
                Value: company_code,
                Label: 'Company Code'
            },
            {
                $Type: 'UI.DataField',
                Value: gl_account,
                Label: 'G/L Account'
            },
            {
                $Type: 'UI.DataField',
                Value: cost_center,
                Label: 'Cost Center'
            },
            {
                $Type: 'UI.DataField',
                Value: sgst_tot_amt,
                Label: 'SGST Amt'
            },
            {
                $Type: 'UI.DataField',
                Value: cgst_tot_amt,
                Label: 'CGST Amt'
            },
            {
                $Type: 'UI.DataField',
                Value: discount_per,
                Label: 'Discount%'
            },
            {
                $Type: 'UI.DataField',
                Value: total_discount_amount,
                Label: 'Discount Amt'
            },
            {
                $Type: 'UI.DataField',
                Value: tds_per,
                Label: 'TDS%'
            },
            {
                $Type: 'UI.DataField',
                Value: tds_tot_amt,
                Label: 'Tot TDS Amt'
            },
            {
                $Type: 'UI.DataField',
                Value: taxable_amount,
                Label: 'Taxable Amount'
            },
            {
                $Type: 'UI.DataField',
                Value: adjustment,
                Label: 'Adjustment'
            },
            {
                $Type: 'UI.DataField',
                Value: amount,
                Label: 'Amount (Total)'
            },
            {
                $Type: 'UI.DataField',
                Value: department_name,
                Label: 'Department'
            },
            {
                $Type: 'UI.DataField',
                Value: internal_order,
                Label: 'Internal Order'
            }

        ],
    },
    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'Invoice Data',
            Target: '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : '',
            ID    : 'Itemssection',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'Items',
                    Target: 'invoice_child_items/@UI.LineItem#Items',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '',
                    ID    : 'Comments',
                    Target: '@UI.FieldGroup#Comments',
                },
            ],
        },
    ]
);

//////////////gst percentage
annotate service.Invoice_child_items with @(UI.FieldGroup #gst_per: {Data: [
    {
        $Type: 'UI.DataField',
        Value: gst_per,
        Label: 'gst_per',

    },
    {
        $Type: 'UI.DataField',
        Value: cgst_per,
        Label: 'cgst_per',

    },
    {
        $Type: 'UI.DataField',
        Value: sgst_per,
        Label: 'sgst_per',
    }
]});

////////////
//////////////////gst amount
annotate service.Invoice_child_items with @(UI.FieldGroup #gst_amt: {Data: [
    {
        $Type: 'UI.DataField',
        Value: gst_amt,
        Label: 'gst_amt',

    },
    {
        $Type: 'UI.DataField',
        Value: cgst_amount,
        Label: 'cgst_amt',

    },
    {
        $Type: 'UI.DataField',
        Value: sgst_amount,
        Label: 'sgst_amount',
    }
]});
////////////

annotate service.Invoice_child_items with @(UI.LineItem #Items: [
    {
        $Type: 'UI.DataField',
        Value: item_no,
        Label: 'Item',
    },
    {
        $Type: 'UI.DataField',
        Value: hsn_code,
        Label: 'HSN Code',
    },
    {
        $Type: 'UI.DataField',
        Value: material,
        Label: 'Material',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Qty',
    },
    {
        $Type: 'UI.DataField',
        Value: amt_per_unit,
        Label: 'Unit Price',
    },
    {
        $Type: 'UI.DataField',
        Value: currency,
        Label: 'Currency',
    },
    {
        $Type: 'UI.DataField',
        Value: gl_account,
        Label: 'G/L Acc',
    },
    {
        $Type: 'UI.DataField',
        Value: plant,
        Label: 'Plant',
    },
    {
        $Type: 'UI.DataField',
        Value: discount,
        Label: 'Disc.(%)',
    },
    {
        $Type: 'UI.DataField',
        Value: discount_amount,
        Label: 'Discount Amount',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#gst_per',
        Label : 'GST%'
    },
    {
        $Type: 'UI.DataField',
        Value: taxable_amount,
        Label: 'Taxable Amt',
    },
    {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#gst_amt',
        Label : 'Tax Amt'
    },
    {
        $Type: 'UI.DataField',
        Value: total_amt_item,
        Label: 'Total Amt',
    }
]);

annotate service.Invoice_child_items with @(UI.HeaderInfo: {
    TypeName      : 'Items',
    TypeNamePlural: 'Items',
});

annotate service.Invoice with @(UI.FieldGroup #Comments: {
    $Type: 'UI.FieldGroupType',
    Data : [{
        $Type: 'UI.DataField',
        Value: app_comment,
        Label: 'Comments',
    }, ],
});

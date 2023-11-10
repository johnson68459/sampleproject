using CatalogService as service from '../../srv/cat-service';

annotate service.Aging with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Vendor',
        Value: vendor_name,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Invoice No.',
        Value: invoice_no,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Date',
        Value: date,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Amt Due',
        Value: amount_due,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Day Outstanding',
        Value: days_outstanding,
    },
    {
        $Type: 'UI.DataField',
        Label: '0-30 Days',
        Value: invoice_0_to_30,
    },
    {
        $Type: 'UI.DataField',
        Label: '31-60 Days',
        Value: invoice_31_to_60,
    },
    {
        $Type: 'UI.DataField',
        Label: '61-90 Days',
        Value: invoice_61_to_90,
    },
    {
        $Type: 'UI.DataField',
        Label: 'D>91 Days',
        Value: invoice_91_or_more,
    },
    {
        $Type : 'UI.DataFieldForIntentBasedNavigation',
        SemanticObject : 'agingchartsob',
        Action : 'agingchartact',
        Label : 'Chart',
        // Inline: true,
        // IconUrl:'sap-icon://business-objects-experience'
    },
]);

annotate service.Aging with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'amount_due',
                Value: amount_due,
            },
            {
                $Type: 'UI.DataField',
                Label: 'date',
                Value: date,
            },
            {
                $Type: 'UI.DataField',
                Label: 'days_outstanding',
                Value: days_outstanding,
            },
            {
                $Type: 'UI.DataField',
                Label: 'flag',
                Value: flag,
            },
            {
                $Type: 'UI.DataField',
                Label: 'invoice_0_to_30',
                Value: invoice_0_to_30,
            },
            {
                $Type: 'UI.DataField',
                Label: 'invoice_31_to_60',
                Value: invoice_31_to_60,
            },
            {
                $Type: 'UI.DataField',
                Label: 'invoice_61_to_90',
                Value: invoice_61_to_90,
            },
            {
                $Type: 'UI.DataField',
                Label: 'invoice_91_or_more',
                Value: invoice_91_or_more,
            },
            {
                $Type: 'UI.DataField',
                Label: 'invoice_no',
                Value: invoice_no,
            },
            {
                $Type: 'UI.DataField',
                Label: 'vendor_name',
                Value: vendor_name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'vendor_no',
                Value: vendor_no,
            },
        ],
    },
    UI.Facets                     : [{
            $Type : 'UI.ReferenceFacet',
            Label : 'Aging Overview based on Vendor',
            ID : 'AgingOverviewbasedonVendor',
            Target : 'aging_agg/@UI.LineItem#AgingOverviewbasedonVendor',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Aging Overview based on Vendor',
            ID : 'AgingOverviewbasedonVendor1',
            Target : 'aging_agg/@UI.Chart#chartSection',
        }, ]
);

annotate CatalogService.Aging_aggregate with @(UI: {Chart #Aging_aggregate: {
    $Type              : 'UI.ChartDefinitionType',
    ChartType          : #Column,
    Measures           : [
        'invoice_0_to_30',
        'invoice_31_to_60',
        '_61_to_90_days',
        'd_gt_90'
    ],
    MeasureAttributes  : [
        {
            $Type  : 'UI.ChartMeasureAttributeType',
            Measure: 'invoice_0_to_30',
            Role   : #Axis1
        },
        {
            $Type  : 'UI.ChartMeasureAttributeType',
            Measure: 'invoice_31_to_60',
            Role   : #Axis1
        },
        {
            $Type  : 'UI.ChartMeasureAttributeType',
            Measure: '_61_to_90_days',
            Role   : #Axis1
        },
        {
            $Type  : 'UI.ChartMeasureAttributeType',
            Measure: 'd_gt_90',
            Role   : #Axis1
        }
    ],
    Dimensions         : ['vendor_name'],
    DimensionAttributes: [{
        $Type    : 'UI.ChartDimensionAttributeType',
        Dimension: 'vendor_name',
        Role     : #Category
    }]
}});

annotate service.Aging with @(UI.SelectionPresentationVariant #tableView: {
    $Type              : 'UI.SelectionPresentationVariantType',
    PresentationVariant: {
        $Type         : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem', ],
    },
    SelectionVariant   : {
        $Type        : 'UI.SelectionVariantType',
        SelectOptions: [],
    },
    Text               : 'Vendors',
});

annotate service.Aging_bsd_comp_1 with @(
    UI.LineItem #tableView                    : [
        {
            $Type: 'UI.DataField',
            Value: cocd1000,
            Label: 'CoCd 1000',
        },
        {
            $Type: 'UI.DataField',
            Value: _0_to_30_days,
            Label: '0-30 Days',
        },
        {
            $Type: 'UI.DataField',
            Value: _31_to_60_days,
            Label: '31-60 Days',
        },
        {
            $Type: 'UI.DataField',
            Value: _61_to_90_days,
            Label: ' 61-90 Days',
        },
        {
            $Type: 'UI.DataField',
            Value: d_gt_90,
            Label: 'D>91 Days',
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
        Text               : 'Aging Overview based on Comp Code',
    }
);
annotate service.Aging_aggregate with @(
    UI.LineItem #AgingOverviewbasedonVendor : [
        {
            $Type : 'UI.DataField',
            Value : vendor_no,
            Label : 'Vendor No.',
        },{
            $Type : 'UI.DataField',
            Value : invoice_0_to_30,
            Label : '0-30 Days',
        },{
            $Type : 'UI.DataField',
            Value : invoice_31_to_60,
            Label : '31-60 Days',
        },{
            $Type : 'UI.DataField',
            Value : invoice_61_to_90,
            Label : '61-90 Days',
        },{
            $Type : 'UI.DataField',
            Value : invoice_91_or_more,
            Label : 'D>91 Days',
        },]
);

annotate service.Aging with @(
    UI.HeaderInfo : {
        TypeName : '     ',
        TypeNamePlural : '',
    }
);
annotate service.Aging_bsd_comp_1 with @(
    UI.HeaderInfo : {
        TypeName : '    ',
        TypeNamePlural : '',
    }
);

annotate service.Aging_aggregate with @(
    UI.HeaderInfo : {
        TypeName : '    ',
        TypeNamePlural : '',
    }
);
annotate service.Aging_aggregate with @(
    Analytics.AggregatedProperty #invoice_0_to_30_sum : {
        $Type : 'Analytics.AggregatedPropertyType',
        Name : 'invoice_0_to_30_sum',
        AggregatableProperty : invoice_0_to_30,
        AggregationMethod : 'sum',
        ![@Common.Label] : 'invoice_0_to_30 (Sum)',
    },
    UI.Chart #chartSection : {
        $Type : 'UI.ChartDefinitionType',
        ChartType : #Column,
        Dimensions : [
            vendor_name,
        ],
        DynamicMeasures : [
            '@Analytics.AggregatedProperty#invoice_0_to_30_sum',
            '@Analytics.AggregatedProperty#invoice_31_to_60_sum',
            '@Analytics.AggregatedProperty#_61_to_90_days_sum',
            '@Analytics.AggregatedProperty#d_gt_90_sum',
        ],
    }
);
annotate service.Aging_aggregate with @(
    Analytics.AggregatedProperty #invoice_31_to_60_sum : {
        $Type : 'Analytics.AggregatedPropertyType',
        Name : 'invoice_31_to_60_sum',
        AggregatableProperty : invoice_31_to_60,
        AggregationMethod : 'sum',
        ![@Common.Label] : 'invoice_31_to_60 (Sum)',
    }
);
annotate service.Aging_aggregate with @(
    Analytics.AggregatedProperty #_61_to_90_days_sum : {
        $Type : 'Analytics.AggregatedPropertyType',
        Name : '_61_to_90_days_sum',
        AggregatableProperty : _61_to_90_days,
        AggregationMethod : 'sum',
        ![@Common.Label] : '_61_to_90_days (Sum)',
    }
);
annotate service.Aging_aggregate with @(
    Analytics.AggregatedProperty #d_gt_90_sum : {
        $Type : 'Analytics.AggregatedPropertyType',
        Name : 'd_gt_90_sum',
        AggregatableProperty : d_gt_90,
        AggregationMethod : 'sum',
        ![@Common.Label] : 'd_gt_90 (Sum)',
    }
);

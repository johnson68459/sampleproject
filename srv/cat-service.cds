using my.bookshop as my from '../db/data-model';

service CatalogService {
    annotate AccountPayable_1 with @UI.Chart #AccountPayable_1: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate Aging_aggregate with @Aggregation.ApplySupported: {
        $Type                 : 'Aggregation.ApplySupportedType',
        GroupableProperties   : [vendor_name],
        AggregatableProperties: [
            {
                Property                   : invoice_0_to_30,
                SupportedAggregationMethods: ['sum']
            },
            {
                Property                   : invoice_31_to_60,
                SupportedAggregationMethods: ['sum']
            },
            {
                Property                   : _61_to_90_days,
                SupportedAggregationMethods: ['sum']
            },
            {
                Property                   : d_gt_90,
                SupportedAggregationMethods: ['sum']
            }
        ]
    };

    annotate Aging_aggregate with @UI.Chart #Aging_aggregate: {
        ChartType          : #Column,
        Measures           : [
            invoice_0_to_30,
            invoice_31_to_60,
            _61_to_90_days,
            d_gt_90
        ],
        MeasureAttributes  : [
            {
                Measure: invoice_0_to_30,
                Role   : #Axis1
            },
            {
                Measure: invoice_31_to_60,
                Role   : #Axis1
            },
            {
                Measure: _61_to_90_days,
                Role   : #Axis1
            },
            {
                Measure: d_gt_90,
                Role   : #Axis1
            }
        ],
        Dimensions         : [vendor_name],
        DimensionAttributes: [{
            Dimension: vendor_name,
            Role     : #Category
        }]
    };

    annotate Aging_bsd_comp_1 with @UI.Chart #Aging_bsd_comp_1: {
        ChartType          : #Column,
        Measures           : [
            _0_to_30_days,
            _31_to_60_days,
            _61_to_90_days,
            d_gt_90
        ],
        MeasureAttributes  : [
            {
                Measure: _0_to_30_days,
                Role   : #Axis1
            },
            {
                Measure: _31_to_60_days,
                Role   : #Axis1
            },
            {
                Measure: _61_to_90_days,
                Role   : #Axis1
            },
            {
                Measure: d_gt_90,
                Role   : #Axis1
            }
        ],
        Dimensions         : [cocd1000],
        DimensionAttributes: [{
            Dimension: cocd1000,
            Role     : #Category
        }]
    };

    annotate Invoice_overviewchart_1 with @UI.Chart #Invoice_overviewchart_1: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate Jan_Feb_Mar with @UI.Chart #Jan_Feb_Mar: {
        ChartType          : #Column,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate LiabilityBasedOnAmount_1 {
        years
        @Common.ValueListWithFixedValues
        @Common.ValueList: {
            Label         : 'label123',
            CollectionPath: 'Tableyears',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                ValueListProperty: 'year',
                LocalDataProperty: years
            }]
        };
    }

    annotate LiabilityBasedOnAmount_1 with @UI.Chart #LiabilityBasedOnAmount_1: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate LiabilityBasedOnAmount_1 with @UI.SelectionFields: [years];

    annotate MyTask with @UI.LineItem #mytask: [
        {
            $Type: 'UI.DataField',
            Label: 'INVOICE NO',
            Value: invoice_no
        },
        {
            $Type: 'UI.DataField',
            Label: 'SUPPLIER NAME',
            Value: sup_name
        },
        {
            $Type: 'UI.DataField',
            Label: 'DATE',
            Value: date
        },
        {
            $Type: 'UI.DataField',
            Label: 'AMOUNT',
            Value: amount
        }
    ];

    annotate Oct_Nov_Dec with @UI.Chart #Oct_Nov_Dec: {
        ChartType          : #Column,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate Overview_page with @UI.Chart #Overview_page: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate Overview_page_1 with @UI.LineItem #current_payable: [
        {
            $Type: 'UI.DataField',
            Value: current_payable
        },
        {
            $Type: 'UI.DataField',
            Value: demo
        }
    ];

    annotate Overview_page_1 with @UI.LineItem #over_due_amount: [
        {
            $Type: 'UI.DataField',
            Value: over_due_amount
        },
        {
            $Type: 'UI.DataField',
            Value: demo
        }
    ];

    annotate Overview_page_1 with @UI.LineItem #payable: [
        {
            $Type: 'UI.DataField',
            Value: payable_by_today
        },
        {
            $Type: 'UI.DataField',
            Value: payable_within_7days
        }
    ];

    annotate Overview_page_1 with @UI.LineItem #total_payable: [
        {
            $Type: 'UI.DataField',
            Value: total_payable
        },
        {
            $Type: 'UI.DataField',
            Value: demo
        }
    ];

    annotate Processed_InProcessing_1 with @UI.Chart #Processed_InProcessing_1: {
        ChartType          : #Column,
        Measures           : [
            po,
            npo
        ],
        MeasureAttributes  : [
            {
                Measure: po,
                Role   : #Axis1
            },
            {
                Measure: npo,
                Role   : #Axis1
            }
        ],
        Dimensions         : [progress],
        DimensionAttributes: [{
            Dimension: progress,
            Role     : #Category
        }]
    };

    annotate ProductivityReportOverview_1 {
        months
        @UI.OrderBy: count;
    }

    annotate ProductivityReportOverview_1 with @UI.Chart #ProductivityReportOverview_1: {
        ChartType          : #Line,
        Measures           : [invoices],
        MeasureAttributes  : [{
            Measure: invoices,
            Role   : #Axis1
        }],
        Dimensions         : [
            months,
            name
        ],
        DimensionAttributes: [
            {
                Dimension: months,
                Role     : #Category
            },
            {
                Dimension: name,
                Role     : #Category
            }
        ]
    };

    annotate ProductivityReportOverview_2 with @UI.Chart #ProductivityReportOverview_2: {
        ChartType          : #Column,
        Measures           : [
            process_value,
            inprocess_value
        ],
        MeasureAttributes  : [
            {
                Measure: process_value,
                Role   : #Axis1
            },
            {
                Measure: inprocess_value,
                Role   : #Axis1
            }
        ],
        Dimensions         : [name],
        DimensionAttributes: [{
            Dimension: name,
            Role     : #Category
        }]
    };

    annotate ProductivityReportOverviewdemo with @UI.Chart #ProductivityReportOverviewdemo: {
        ChartType          : #Line,
        Measures           : [
            finance_head,
            cfo
        ],
        MeasureAttributes  : [
            {
                Measure: finance_head,
                Role   : #Axis1
            },
            {
                Measure: cfo,
                Role   : #Axis2
            }
        ],
        Dimensions         : [months],
        DimensionAttributes: [{
            Dimension: months,
            Role     : #Category
        }]
    };

    annotate TotalAccountsPayable_1 with @UI.Chart #TotalAccountsPayable_1: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [
            chartDimension,
            years
        ],
        DimensionAttributes: [
            {
                Dimension: chartDimension,
                Role     : #Category
            },
            {
                Dimension: years,
                Role     : #Category
            }
        ]
    };

    annotate TotalAccountsPayable_1 with @UI.SelectionFields: [years];

    annotate Total_liabilities_2 with @UI.Chart #Total_liabilities_2: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    annotate VendorLiabilityReportforCompanyCode_1 with @UI.Chart #VendorLiabilityReportforCompanyCode_1: {
        ChartType          : #Column,
        Measures           : [
            due_amount,
            overdue_amount,
            processed_amount,
            total_amount
        ],
        MeasureAttributes  : [
            {
                Measure: due_amount,
                Role   : #Axis1
            },
            {
                Measure: overdue_amount,
                Role   : #Axis1
            },
            {
                Measure: processed_amount,
                Role   : #Axis1
            },
            {
                Measure: total_amount,
                Role   : #Axis1
            }
        ],
        Dimensions         : [vendor_name],
        DimensionAttributes: [{
            Dimension: vendor_name,
            Role     : #Category
        }]
    };

    annotate VendorLiabilityReportforCompanyCode_1 with @UI.SelectionFields: [years];

    annotate Vendorbasedonamount with @UI.Chart #Vendorbasedonamount: {
        ChartType          : #Column,
        Measures           : [amounts],
        MeasureAttributes  : [{Measure: amounts}],
        Dimensions         : [
            bquat_name,
            cvendors
        ],
        DimensionAttributes: [
            {
                Dimension: bquat_name,
                Role     : #Category
            },
            {
                Dimension: cvendors,
                Role     : #Category2
            }
        ]
    };

    annotate Vendorbasedonamount with @UI.PresentationVariant #pv: {
        SortOrder     : [{Property: bquat_name}],
        Visualizations: ['@UI.Chart#Vendorbasedonamount'],
        RequestAtLeast: [bquat_name]
    };

    annotate key_TotalAccountsPayable_1 with @UI.Chart #key_TotalAccountsPayable_1: {
        ChartType          : #Donut,
        Measures           : [chartMeasure],
        MeasureAttributes  : [{
            Measure: chartMeasure,
            Role   : #Axis1
        }],
        Dimensions         : [chartDimension],
        DimensionAttributes: [{
            Dimension: chartDimension,
            Role     : #Category
        }]
    };

    function getPdfUrl(invoice_no : Integer) returns LargeString;
    entity MasterCompanyCode                     as projection on my.MasterCompanyCode;

    @UI.DeleteHidden
    entity Invoice                               as projection on my.Invoice actions {
        action showpdf1();
    };

    @UI.DeleteHidden
    entity Invoice_child_items                   as projection on my.Invoice_child_items;

    @UI.DeleteHidden
    entity InvoiceApprover                       as projection on my.InvoiceApprover;

    @UI.DeleteHidden
    entity Approvers                             as projection on my.Approvers;

    @UI.DeleteHidden
    entity Invoice_overviewchart_1               as projection on my.Invoice_overviewchart_1;

    @UI.DeleteHidden
    entity AccountPayable_1                      as projection on my.AccountPayable_1;

    @UI.DeleteHidden
    entity Liability                             as projection on my.Liability;

    @UI.DeleteHidden
    entity Tableyears                            as projection on my.Tableyears;

    @UI.DeleteHidden
    entity LiabilityBasedOnAmount_1              as projection on my.LiabilityBasedOnAmount_1;

    @UI.DeleteHidden
    entity TotalAccountsPayable_1                as projection on my.TotalAccountsPayable_1;

    @UI.DeleteHidden
    entity VendorLiabilityReportforCompanyCode_1 as projection on my.VendorLiabilityReportforCompanyCode_1;

    @UI.DeleteHidden
    entity Aging                                 as projection on my.Aging;

    @UI.DeleteHidden
    entity Aging_aggregate                       as projection on my.Aging_aggregate;

    @UI.DeleteHidden
    entity Aging_bsd_comp_1                      as projection on my.Aging_bsd_comp_1;

    @UI.DeleteHidden
    entity Processed_InProcessing_1              as projection on my.Processed_InProcessing_1;

    @UI.DeleteHidden
    entity Total_liabilities_1                   as projection on my.Total_liabilities_1;

    entity Total_liabilities_2                   as projection on my.Total_liabilities_2;

    @UI.DeleteHidden
    entity key_TotalAccountsPayable_1            as projection on my.key_TotalAccountsPayable_1;

    @UI.DeleteHidden
    entity Vendors                               as projection on my.Vendors;

    entity Vendorbasedonamount                   as projection on my.Vendorbasedonamount;
    entity Jan_Feb_Mar                           as projection on my.Jan_Feb_Mar;
    entity Oct_Nov_Dec                           as projection on my.Oct_Nov_Dec;

    @UI.DeleteHidden
    entity Productivity                          as projection on my.Productivity;

    @UI.DeleteHidden
    entity ProductivityReportOverview_1          as projection on my.ProductivityReportOverview_1;

    entity ProductivityReportOverviewdemo        as projection on my.ProductivityReportOverviewdemo;

    @UI.DeleteHidden
    entity ProductivityReportOverview_2          as projection on my.ProductivityReportOverview_2;

    @UI.DeleteHidden
    entity Overview_page                         as projection on my.Overview_page;

    @UI.DeleteHidden
    entity Overview_page_1                       as projection on my.Overview_page_1;

    @UI.DeleteHidden
    entity MyTask                                as projection on my.MyTask;
}

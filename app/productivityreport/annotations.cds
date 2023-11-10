using CatalogService as service from '../../srv/cat-service';

annotate service.Productivity with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'User Name',
        Value: userid,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Role',
        Value: role,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Cycle Time',
        Value: cycle_time,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Processing Time',
        Value: processing_time,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Approval Time',
        Value: approval_time,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Processed',
        Value: total_processed,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total In-Processing',
        Value: inprocessing,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Time Spent',
        Value: total_timespent,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Avg. Time',
        Value: avg_time,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Approved',
        Value: approved,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Rejected',
        Value: rejected,
    },
    {
        $Type : 'UI.DataFieldForIntentBasedNavigation',
        SemanticObject : 'productivitychartsob',
        Action : 'productivitychartact',
        Label : 'Chart',
        // Inline: true,
        // IconUrl:'sap-icon://business-objects-experience'
    },
]);

annotate service.Productivity with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'approval_time',
                Value: approval_time,
            },
            {
                $Type: 'UI.DataField',
                Label: 'approved',
                Value: approved,
            },
            {
                $Type: 'UI.DataField',
                Label: 'avg_time',
                Value: avg_time,
            },
            {
                $Type: 'UI.DataField',
                Label: 'cycle_time',
                Value: cycle_time,
            },
            {
                $Type: 'UI.DataField',
                Label: 'delegated',
                Value: delegated,
            },
            {
                $Type: 'UI.DataField',
                Label: 'inprocessing',
                Value: inprocessing,
            },
            {
                $Type: 'UI.DataField',
                Label: 'processing_time',
                Value: processing_time,
            },
            {
                $Type: 'UI.DataField',
                Label: 'rejected',
                Value: rejected,
            },
            {
                $Type: 'UI.DataField',
                Label: 'role',
                Value: role,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_processed',
                Value: total_processed,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_timespent',
                Value: total_timespent,
            },
            {
                $Type: 'UI.DataField',
                Label: 'userid',
                Value: userid,
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

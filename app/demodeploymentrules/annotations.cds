using CatalogService as service from '../../srv/cat-service';

annotate service.condition_help with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'value',
            Value : value,
        },
        {
            $Type : 'UI.DataField',
            Label : 'value2',
            Value : value2,
        },
        {
            $Type : 'UI.DataField',
            Label : 'code',
            Value : code,
        },
    ]
);
annotate service.condition_help with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'value',
                Value : value,
            },
            {
                $Type : 'UI.DataField',
                Label : 'value2',
                Value : value2,
            },
            {
                $Type : 'UI.DataField',
                Label : 'code',
                Value : code,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);

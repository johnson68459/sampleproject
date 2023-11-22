using CatalogService as service from '../../srv/cat-service';

annotate service.main with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'ID',
        Value: ID,
    },
    {
        $Type: 'UI.DataField',
        Label: 'assighnment_rule_name',
        Value: assighnment_rule_name,
    },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'assignment_criteria',
    //     Value: assignment_criteria,
    // },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'condition',
    //     Value: condition,
    // },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'amount',
    //     Value: amount,
    // },
]);

annotate service.main with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'ID',
                Value: ID,
            },
            {
                $Type: 'UI.DataField',
                Label: 'assighnment_rule_name',
                Value: assighnment_rule_name,
            },
            // {
            //     $Type: 'UI.DataField',
            //     Label: 'assignment_criteria',
            //     Value: assignment_criteria,
            // },
            // {
            //     $Type: 'UI.DataField',
            //     Label: 'condition',
            //     Value: condition,
            // },
            // {
            //     $Type: 'UI.DataField',
            //     Label: 'amount',
            //     Value: amount,
            // },
            // {
            //     $Type: 'UI.DataField',
            //     Label: 'currency',
            //     Value: currency,
            // },
            // {
            //     $Type: 'UI.DataField',
            //     Label: 'amount_from',
            //     Value: amount_from,
            // },
            // {
            //     $Type: 'UI.DataField',
            //     Label: 'amount_to',
            //     Value: amount_to,
            // },
        ],
    },
    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Assignment Rule Name',
            ID : 'AssignmentRuleName',
            Target : '@UI.FieldGroup#AssignmentRuleName',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Assignment Rule',
            ID    : 'AssignmentRule',
            Target: 'rell1/@UI.LineItem#AssignmentRule',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Add members',
            ID    : 'Addmembers',
            Target: 'rel12/@UI.LineItem#Addmembers',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Comment',
            ID : 'comm',
            Target : '@UI.FieldGroup#comm',
        },
    ]
);

annotate service.child1 with @UI.HeaderInfo:{
    TypeName : ' ',
    TypeNamePlural : ' ',
};
annotate service.members with @UI.HeaderInfo:{
    TypeName : ' ',
    TypeNamePlural : ' ',
};

annotate service.child1 with @(UI.LineItem #AssignmentRule: [
    {
        $Type: 'UI.DataField',
        Value: assighnment_rule_name,
        Label: 'Assighnment Rule Name',
    },
    {
        $Type: 'UI.DataField',
        Value: assignment_criteria,
        Label: 'Assignment Criteria',
    },
    {
        $Type: 'UI.DataField',
        Value: condition,
        Label: 'Condition',
    },
    {
        $Type         : 'UI.DataField',
        Value         : amount,
        Label         : 'Amount',
        ![@UI.Hidden] : {$edmJson: {$Not: {$Or: [
            {$Or: [
                {$Eq: [
                    {$Path: 'condition'},
                    'Less Than'
                ]},
                {$Eq: [
                    {$Path: 'condition'},
                    'Equal To'
                ]},
            ]},
            {$Or: [
                {$Eq: [
                    {$Path: 'condition'},
                    'Less Than'
                ]},
                {$Eq: [
                    {$Path: 'condition'},
                    'More Than'
                ]},

            ]}
        ]}}}
    },
    // {
    //     $Type : 'UI.DataField',
    //     Value : amount_from,
    //     Label : 'amount_from',
    //     ![@UI.Hidden] : {$edmJson: {$Ne: [{$Path: 'assignment_criteria'},'Invoice Value',]}
    // },

    // },
    {
        $Type         : 'UI.DataField',
        Value         : amount_from,
        Label         : 'Amount From',
        ![@UI.Hidden] : {$edmJson: {$Or: [
            {$And: [
                {$Ne: [
                    {$Path: 'condition'},
                    'In Between'
                ]},
                true
            ]},
            {$And: [
                {$Eq: [
                    {$Path: 'assignment_criteria'},
                    'Document Type'
                ]},
                true
            ]},

        ]}}
    }

    ,
    {
        $Type         : 'UI.DataField',
        Value         : amount_to,
        Label         : 'Amount To',
        ![@UI.Hidden] : {$edmJson: {$Ne: [
            {$Path: 'condition'},
            'In Between',
        ]}}
    // ![@UI.Hidden]: IsActiveEntity
    },
    {
        $Type         : 'UI.DataField',
        Value         : currency,
        Label         : 'Currency',
        ![@UI.Hidden] : {$edmJson: {$Ne: [
            {$Path: 'assignment_criteria'},
            'Invoice Value',
        ]}}
    },
]);

annotate service.members with @(UI.LineItem #Addmembers: [{
    $Type: 'UI.DataField',
    Value: member_name,
    Label: 'Member Name',
},

 ]);

annotate service.child1 with {
    assignment_criteria @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'assignment_criteria_help',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: assignment_criteria,
                ValueListProperty: 'value2',
            }, ],
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.child1 with {
    condition @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'condition_help',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: condition,
                    ValueListProperty: 'value2',
                },
                {
                    $Type            : 'Common.ValueListParameterIn',
                    ValueListProperty: 'value',
                    LocalDataProperty: assignment_criteria,
                },
            ],
        },
        Common.ValueListWithFixedValues: true
    )
};
annotate service.child1 with {
    currency @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'currency_help',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : currency,
                    ValueListProperty : 'code',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.currency_help with {
    code @Common.Text : {
            $value : description,
            ![@UI.TextArrangement] : #TextLast,
        }
        
};
annotate service.members with {
    member_name @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'member_help',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : member_name,
                    ValueListProperty : 'name',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.member_help with {
    name @Common.Text : {
        $value : position,
        ![@UI.TextArrangement] : #TextLast,
    }
};
annotate service.members with {
    id1 @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'member_help',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : id1,
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'is_group',
                    LocalDataProperty : is_group,
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.child1 with @(
    UI.LineItem #AssignmentRuleName : [
    ]
);
annotate service.main with @(
    UI.FieldGroup #AssignmentRuleName : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : assighnment_rule_name,
                Label : '',
            },],
    }
);
annotate service.main with @(
    UI.FieldGroup #comm : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : comment,
                Label : '',
            },],
    }
);
annotate service.main with {
    comment @UI.MultiLineText : true
};

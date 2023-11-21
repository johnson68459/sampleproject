using CatalogService as service from '../../srv/cat-service';

annotate service.LiabilityBasedOnAmount_1 with {
    years @Common.FilterDefaultValue: '2023';
};

annotate service.TotalAccountsPayable_1 with {
    years @Common.FilterDefaultValue: '2023';
};

annotate service.VendorLiabilityReportforCompanyCode_1 with {
    years @Common.FilterDefaultValue: '2023';
};

annotate service.LiabilityBasedOnAmount_1 with @Capabilities.SearchRestrictions.Searchable:true;
annotate service.Total_liabilities_1 with @Capabilities.SearchRestrictions.Searchable:true;
annotate service.VendorLiabilityReportforCompanyCode_1 with @Capabilities.SearchRestrictions.Searchable:true;



annotate service.LiabilityBasedOnAmount_1 with {
    years
    @Common.ValueListWithFixedValues: true
    @Common.ValueList               : {
        $Type         : 'Common.ValueListType',
        Label         : 'Year',
        CollectionPath: 'Tableyears',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: years,
            ValueListProperty: 'year'
        }]
    }
};


// annotate service.LiabilityBasedOnAmount_1 with
// @Capabilities.FilterRestrictions: {
//     FilterExpressionRestrictions: [{
//     Property          : years,
//     AllowedExpressions: 'SingleValue'
// }]};

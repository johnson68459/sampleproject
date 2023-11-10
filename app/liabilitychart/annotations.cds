using CatalogService as service from '../../srv/cat-service';

annotate service.LiabilityBasedOnAmount_1 with {
    years @Common.FilterDefaultValue: '2023';
};
annotate service.TotalAccountsPayable_1 with {
    years @Common.FilterDefaultValue: '2023' ;
};
annotate service.VendorLiabilityReportforCompanyCode_1 with {
    years @Common.FilterDefaultValue: '2023';
};

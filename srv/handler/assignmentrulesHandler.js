const cds = require('@sap/cds');


module.exports = async function () {

    let { assignment_criteria_help, condition_help, currency_help, member_help, main, vendor_help } = this.entities;
    const c4re = await cds.connect.to('iflow');
    var first_assignment_criteria_help = true;

    this.before('READ', assignment_criteria_help, async (req) => {
        try {
            if (first_assignment_criteria_help) {
                // let pageno = 1;
                const entries = [];
                // while (true) {
                const resp = await c4re.get(`/dev/dropdown?drop_key=assignment_criteria`);
                cds.tx(req).run(DELETE(assignment_criteria_help));
                // const spaces = resp.content;
                const spaces = resp.body;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        value2: `${space.value2}`
                    });
                });
                // pageno++;
                // }
                await cds.tx(req).run(INSERT.into(assignment_criteria_help).entries(entries));
                // return spaces;
                first_assignment_criteria_help = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
    var firt_condition_help = true;
    this.before('READ', condition_help, async (req) => {
        try {
            if (firt_condition_help) {
                // let pageno = 1;
                const entries = [];
                // while (true) {
                // const resp = await c4re.get(`/dev/dropdown?drop_key=assignment_criteria`);
                cds.tx(req).run(DELETE(condition_help));
                // const spaces = resp.content;
                // const spaces = resp.body;
                //  const spaces = {equal,};

                // if (spaces.length == 0) {
                //     break;
                // }
                // spaces.forEach(space => {
                entries.push({
                    value: 'Document Type',
                    value2: 'Invoice',
                    code: 'RE'
                });
                entries.push({
                    value: 'Document Type',
                    value2: 'Debit Memo',
                    code: 'SU'
                });
                entries.push({
                    value: 'Document Type',
                    value2: 'Credit Memo',
                    code: 'KG'
                });
                entries.push({
                    value: 'Invoice Value',
                    value2: 'Equal To'
                });
                entries.push({
                    value: 'Invoice Value',
                    value2: 'In Between'
                });
                entries.push({
                    value: 'Invoice Value',
                    value2: 'Less Than'
                });
                entries.push({
                    value: 'Invoice Value',
                    value2: 'More Than'
                });
                entries.push({
                    value: 'Invoice type',
                    value2: 'Asset'
                });
                entries.push({
                    value: 'Invoice type',
                    value2: 'Material'
                });
                entries.push({
                    value: 'Invoice type',
                    value2: 'Service'
                });
                // entries.push({
                //     value: 'Jurisdiction Code',
                //     value2: '330612010--DEMO1'
                // });
                // entries.push({
                //     value: 'Jurisdiction Code',
                //     value2: 'CA0017000--Californnia'
                // });
                // entries.push({
                //     value: 'Jurisdiction Code',
                //     value2: 'NY0000000--NewYork'
                // });
                entries.push({
                    value: 'Supplier Type',
                    value2: 'Export'
                });
                entries.push({
                    value: 'Supplier Type',
                    value2: 'Domestic'
                });
                const resp = await c4re.get(`/dev/svendor`);
                const spaces = resp.body.search_help;
                spaces.forEach(space => {
                    entries.push({

                        value: 'Vendor',
                        value2: `${space.code}--${space.description}`,
                    });
                });
                const resp1 = await c4re.get(`/dev/search-help?master_id=0`);
                const spaces1 = resp1.body.search_help;
                spaces1.forEach(space => {
                    entries.push({

                        value: 'Jurisdiction Code',
                        value2: `${space.code}--${space.master_name}`,
                    });
                });




                // });
                // pageno++;
                // }
                await cds.tx(req).run(INSERT.into(condition_help).entries(entries));
                // return spaces;
                firt_condition_help = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    var first_currency_help = true;
    this.before('READ', currency_help, async (req) => {
        try {
            if (first_currency_help) {
                // let pageno = 1;
                const entries = [];
                // while (true) {
                const resp = await c4re.get(`/dev/search-help?master_id=12`);
                cds.tx(req).run(DELETE(currency_help));
                // const spaces = resp.content;
                const spaces = resp.body.search_help;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({
                        description: `${space.description}`,
                        code: `${space.code}`
                    });
                });
                // pageno++;
                // }
                await cds.tx(req).run(INSERT.into(currency_help).entries(entries));
                // return spaces;
                first_currency_help = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    var first_member_help = true;
    this.before('READ', member_help, async (req) => {
        try {
            if (first_member_help) {
                // let pageno = 1;
                const entries = [];
                // while (true) {
                const resp = await c4re.get(`/dev/assignment-approver?search_string=&assign_details=X`);
                cds.tx(req).run(DELETE(member_help));
                // const spaces = resp.content;
                const spaces = resp.body;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({

                        name: `${space.name}`,
                        id1: `${space.id}`,
                        is_group: `${space.is_group}`,
                        position: `${space.position}`
                    });
                });
                // pageno++;
                // }
                await cds.tx(req).run(INSERT.into(member_help).entries(entries));
                // return spaces;
                first_member_help = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
    var first_vendor_help = true;
    this.before('READ', vendor_help, async (req) => {
        try {
            if (first_vendor_help) {
                // let pageno = 1;
                const entries = [];
                // while (true) {
                const resp = await c4re.get(`/dev/svendor`);
                cds.tx(req).run(DELETE(vendor_help));
                // const spaces = resp.content;
                const spaces = resp.body.search_help;
                // if (spaces.length == 0) {
                //     break;
                // }
                spaces.forEach(space => {
                    entries.push({

                        code: `${space.code}`,
                        description: `${space.description}`,
                    });
                });
                // pageno++;
                // }
                await cds.tx(req).run(INSERT.into(vendor_help).entries(entries));
                // return spaces;
                first_vendor_help = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
    this.on('POST', main, async (req) => {
        // const var1 = await SELECT.from(member_help).where({ id1: '3' });
        // const var3 = req.data.rel12[0].member_name;
        // const var2 = await SELECT.from(member_help).where({ name: req.data.rel12[0].member_name });
        var params = req.data.assighnment_rule_name;
        var comment = req.data.comment;
        const arr1 = [];
        const arr2 = [];
        for (i = 0; i < req.data.rel12.length; i++) {
            const val = await SELECT.from(member_help).where({ name: req.data.rel12[i].member_name });
            arr1.push({
                approver: parseInt(val[0].id1),
                isgroup: val[0].is_group,
                level: `${""}`,
            });
            // req.data.rel12[i].member_name,
        }
        for (i = 0; i < req.data.rell1.length; i++) {

            let operatorSymbol;
            let value1;
            let assignment_criteria1;
            if (req.data.rell1[i].assignment_criteria == "Document Type") {
                assignment_criteria1 = "document_type"

            }
            else if (req.data.rell1[i].assignment_criteria == "Invoice Value") {
                assignment_criteria1 = "invoice_value"

            }
            else if (req.data.rell1[i].assignment_criteria == "Jurisdiction Code") {
                assignment_criteria1 = "jurisdiction_code"

            }
            else if (req.data.rell1[i].assignment_criteria == "Invoice type") {
                assignment_criteria1 = "invoice_type"

            }
            else {
                assignment_criteria1 = req.data.rell1[i].assignment_criteria;
            }





            if (req.data.rell1[i].condition === 'Equal To') {
                operatorSymbol = '=';
            } else if (req.data.rell1[i].condition === 'Less Than') {
                operatorSymbol = '<';
            } else if (req.data.rell1[i].condition === 'Less Than') {
                operatorSymbol = '>';
            }
            else if (req.data.rell1[i].condition === 'In Between') {
                operatorSymbol = 'between';
            }
            else {
                operatorSymbol = '='; // Defaulting to '=' for other cases
            }


            if (req.data.rell1[i].assignment_criteria == "Document Type" && req.data.rell1[i].condition == "Invoice") {
                value1 = "RE"

            }

            else if (req.data.rell1[i].assignment_criteria == "Document Type" && req.data.rell1[i].condition == "Debit Memo") {
                value1 = "SU"

            }
            else if (req.data.rell1[i].assignment_criteria == "Document Type" && req.data.rell1[i].condition == "Credit Memo") {
                value1 = "KG"

            }
            else if (req.data.rell1[i].assignment_criteria == "Vendor" || req.data.rell1[i].assignment_criteria == "Jurisdiction Code") {
                let var22 = req.data.rell1[i].condition.split('--');
                value1 = var22[0]
            }

            else {
                value1 = req.data.rell1[i].condition;
            }



            let type;
            if (req.data.rell1[i].assignment_criteria == 'Invoice Value') {
                type = 'number';
            } else {
                type = 'string';
            }



            if (req.data.rell1[i].assignment_criteria == 'Invoice Value' && req.data.rell1[i].amount != null) {
                value1 = req.data.rell1[i].amount;
                arr2.push({
                    decider: `invoice_value`,
                    operator: `=`,
                    type: `${type}`,
                    value1: `${value1}`,
                    value2: `${""}`,
                });
                arr2.push({
                    decider: 'currency',
                    operator: `=`,
                    type: `string`,
                    value1: `${req.data.rell1[i].currency}`,
                    value2: `${""}`,
                });
            }
            else if (req.data.rell1[i].assignment_criteria == 'Invoice Value' && req.data.rell1[i].condition == 'In Between') {
                arr2.push({
                    decider: 'invoice_value',
                    operator: 'between',
                    type: `${type}`,
                    value1: `${req.data.rell1[i].amount_from}`,
                    value2: `${req.data.rell1[i].amount_to}`,
                });
                arr2.push({
                    decider: 'currency',
                    operator: `=`,
                    type: `string`,
                    value1: `${req.data.rell1[i].currency}`,
                    value2: `${""}`,
                });
            }

            else {
                arr2.push({
                    decider: `${assignment_criteria1}`,
                    operator: `${operatorSymbol}`,
                    type: `${type}`,
                    value1: `${value1}`,
                    value2: ``,
                })

            }


        }




        // var mem_list = [];
        // mem_list = req.data.members;
        // var m_id=[];
        // mem_list.forEach(mem =>{
        //   m_id.push(mem.member_id);
        // })

        var body = {
            approvers: arr1,
            comments: req.data.comment,
            criteria: arr2
        }
        try {
            debugger
            var resp = await c4re.post(`/dev/rules?is_approval=n&rule_name=${params}`, body);
            // const createEntity = await INSERT.into(Groups).entries(req.data);
            if (statuscode = 200) {
                //   const g_id = req.data.group_id;
                //     const membersPromises = mem_list.map(async (memberData) => {
                //       cds.tx(req).run(DELETE(Members).where({ member_id : memberData.member_id }));
                //       const newMember = {
                //           ...memberData,
                //           group_id: g_id, // Set the group_id for the member
                //       };
                //       await INSERT.into(Members).entries(newMember);
                //   });
                //   await Promise.all(membersPromises);

                return req.data;
            } else {
                req.error({
                    message: 'Internal error while creating "Rules"',
                    code: 'RULES_NOT_CREATED'
                })
            }
        } catch (err) {
            req.error(500, err.message);
        }
    });
    this.before('POST', main, async (req) => {
        if (Array.isArray(req.data.rell1)) {
            const entries = req.data.rell1;
            entries.forEach(entry => {
                if (entry.amount_from != null && entry.amount_to != null) {
                    // if (req.data.gstin_uin === null) req.error ` GST NO is mandatory`;
                    if (entry.amount_to <= entry.amount_from) {
                        req.error({
                            message: 'Amount to should be greater than amount from',
                            code: 'AMOUNT'
                        });
                    }
                }
            })

        }
        return req.data;
    });
}
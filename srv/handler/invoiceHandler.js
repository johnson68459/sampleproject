const cds = require('@sap/cds');
const axios = require('axios');

module.exports = async function () {
    let = {
        Invoice,
        Invoice_child_items,
        Approvers,
        InvoiceApprover,
        Invoice_overviewchart_1,
        AccountPayable_1,
        Overview_page,
        Overview_page_1,
        MasterCompanyCode
    } = this.entities;

    // function formatNumber(number) {
    //     if (number >= 1000000) {
    //         return (number / 1000000).toFixed(2) + 'M';
    //     } else if (number >= 1000) {
    //         return (number / 1000).toFixed(2) + 'k';
    //     }
    //     return number.toString();
    // }

    function getTimeDifferenceFormatted(timestampStr1, timestampStr2) {
        if (timestampStr1 == ' ' || timestampStr2 == ' ') {
            return null;
        }
        const timestamp1 = new Date(timestampStr1);
        const timestamp2 = new Date(timestampStr2);


        const timeDifference = timestamp2 - timestamp1; // Difference in milliseconds

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60) / 1000));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function formatNumber(number) {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(2) + 'G';
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(2) + 'M';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(2) + 'k';
        }
        return number.toString();
    }

    this.on('getPdfUrl', async (req) => {
        debugger

        const fileLinkValue = await SELECT`file_link`.from(Invoice).where({ invoice_no: req.data.invoice_no });

        return fileLinkValue;
    });


    const c4re = await cds.connect.to('iflow');
    let firstRead = true;

    //     this.before("READ", Invoice, async (req) => {
    //         try {
    //             if (firstRead) {
    //                 let pgnum = 1;
    //                 const entries = [];
    //                 const approversEntries = [];
    //                 cds.tx(req).run(DELETE(Invoice));
    //                 cds.tx(req).run(DELETE(Approvers));

    //                 // while (true) {
    //                 const resp = await c4re.post(`/dev/dia-analytics?pageno=${pgnum}&nooflines=50`);




    //                 const spaces = resp.body.records;

    //                 // if (spaces.length === 0) {
    //                 //     break; // No more data to fetch
    //                 // }

    //                 for (const space of spaces) {
    //                     let inv = space.invoice_no;
    //                     const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${inv}`);
    //                     const entriesdemo = {
    //                         amount: space.amount,
    //                         amount_overdue: space.amount_overdue,
    //                         company_code: space.company_code,
    //                         currency: space.currency,
    //                         days_overdue: space.days_overdue,
    //                         // days_to_due: space.days_to_due,
    //                         document_status: space.document_status,
    //                         document_type: space.document_type,
    //                         due_date: space.due_date,
    //                         end_date: space.end_date,
    //                         end_time: space.end_time,
    //                         // entry_date: space.entry_date +' 07:09:45',//+ space.entry_time,
    //                         entry_date: space.entry_date + ' ' + space.entry_time,
    //                         entry_time: space.entry_time,
    //                         invoice_date: space.invoice_date,
    //                         invoice_no: space.invoice_no,
    //                         npo_flag: space.npo_flag,
    //                         number_of_approvers: space.number_of_approvers,
    //                         overdue_flag: '',//space.overdue_flag,
    //                         payment_status: space.payment_status,
    //                         payment_terms: space.payment_terms,
    //                         process_duration: space.process_duration,
    //                         reason_text: space.reason_text,
    //                         ref_po_num: space.ref_po_num,
    //                         update_date: space.update_date,
    //                         update_time: space.update_time,
    //                         user_processing: space.user_processing,
    //                         vendor_name: space.vendor_name,
    //                         vendor_no: space.vendor_no,
    //                         file_link: resp1.body.files[0]?.file_link || 'NA',

    //                     };
    //                     if (space.days_to_due == 'Paid') {
    //                         entriesdemo.days_to_due = space.days_to_due;
    //                         // entriesdemo.dtd = 3;
    //                     }
    //                     else if (space.days_to_due == '') {
    //                         entriesdemo.days_to_due = space.days_to_due;
    //                     }
    //                     else {
    //                         entriesdemo.days_to_due = space.days_to_due;
    //                         // entriesdemo.dtd = 1;
    //                     }
    //                     if (space.document_status == 'Posted' || space.document_status == 'tosap') {
    //                         // entriesdemo.o_d = 3;
    //                     }
    //                     else {
    //                         // entriesdemo.o_d = 1;
    //                     }




    //                     entries.push(entriesdemo);

    //                     space.approvers.forEach(approver => {
    //                         approversEntries.push({
    //                             approver: approver.approver,
    //                             isapproved: approver.isapproved,
    //                             isgroup: approver.isgroup,
    //                             level: approver.level,
    //                             name: approver.name,
    //                             invoice_no: space.invoice_no,
    //                             // toInvoice:space.invoice_no
    //                         });
    //                     });

    //                 };
    //                 // pgnum++;

    //                 // }

    //                 await cds.tx(req).run(INSERT.into(Invoice).entries(entries));

    //                 await cds.tx(req).run(INSERT.into(Approvers).entries(approversEntries));

    //                 firstRead = false;
    //             }
    //         } catch (err) {
    //             req.error(500, err.message);
    //         }
    //     })

    this.before("READ", MasterCompanyCode, async (req) => {
        try {
            if (firstRead) {
                const entries = [];


                const resp = await axios.get('https://7firau5x7b.execute-api.eu-central-1.amazonaws.com/einvoice-v1/search-help?master_id=1');
                const spaces = resp.data.body.search_help;
                let cnt = 1;
                spaces.forEach(space => {

                    entries.push(
                        {
                            id: (cnt++),
                            code: `${space.code}`,
                            master_name: `${space.master_name}`,
                            description: `${space.description}`
                        }
                    )
                })

                await cds.tx(req).run(INSERT.into(MasterCompanyCode).entries(entries));

            }
        } catch (err) {
            req.error(500, err.message);
        }


    })


    this.before("READ", Invoice, async (req) => {
        // firstRead = true;
        try {
            if (firstRead) {
                let pgnum = 1;
                const entries = [];
                const approversEntries = [];
                const batchSize = 100; // Number of lines to fetch at once
                let done = false;
                cds.tx(req).run(DELETE(Invoice));

                // while (!done) {
                const resp = await c4re.post(`/dev/dia-analytics?pageno=${pgnum}&nooflines=${batchSize}`);
                const spaces = resp.body.records;

                // if (spaces.length === 0) {
                //     done = true; // No more data to fetch
                // }

                const promises = spaces.map(async (space) => {
                    // Process each space in parallel
                    // ...
                    let inv = space.invoice_no;
                    const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${inv}`);
                    let entry_date = space.entry_date + ' ' + space.entry_time;
                    let end_date = space.end_date + ' ' + space.end_time;
                    const entriesdemo = {
                        amount: `${space.amount || '0'} ${space.currency}`,
                        user_processing: `${space.user_processing}`,
                        amount_overdue: `${space.amount_overdue || 'NA'}`,
                        company_code: `${space.company_code || 'NA'}`,
                        currency: `${space.currency || 'NA'}`,
                        days_overdue: `${space.days_overdue || 'NA'}`,
                        document_status: `${space.document_status || 'NA'}`,
                        document_type: `${space.document_type || 'NA'}`,
                        due_date: `${space.due_date}`,
                        end_date: `${space.end_date || 'NA'} ${space.end_time || 'NA'}`,
                        end_time: `${space.end_time || 'NA'}`,
                        entry_date: `${space.entry_date || 'NA'} ${space.entry_time || 'NA'}`,
                        entry_time: `${space.entry_time || 'NA'}`,
                        invoice_date: `${space.invoice_date || 'NA'}`,
                        invoice_no: Number(space.invoice_no),
                        npo_flag: `${space.npo_flag || 'NA'}`,
                        number_of_approvers: `${space.number_of_approvers || 'NA'}`,
                        payment_status: `${space.payment_status || 'NA'}`,
                        payment_terms: `${space.payment_terms + ' Days' || 'NA'}`,
                        process_duration: `${getTimeDifferenceFormatted(entry_date, end_date) || 'In Processing'}`,
                        reason_text: `${space.reason_text || 'NA'}`,
                        ref_po_num: `${space.ref_po_num || 'NA'}`,
                        update_date: `${space.update_date || 'NA'}`,
                        update_time: `${space.update_time || 'NA'}`,
                        vendor_name: `${space.vendor_name || 'NA'}`,
                        vendor_no: `${space.vendor_no || 'NA'}`,
                        adjustment: `${resp1.body.adjustment || 'NA'}`,
                        app_comment: `${resp1.body.app_comment || 'NA'}`,
                        approver_comments: `${resp1.body.approver_comments || 'NA'}`,
                        approver_id: `${resp1.body.approver_id || 'NA'}`,
                        baseline_date: `${resp1.body.baseline_date || 'NA'}`,
                        business_area: `${resp1.body.business_area || 'NA'}`,
                        cgst_tot_amt: `${resp1.body.cgst_tot_amt || 'NA'}`,
                        cost_center: `${resp1.body.cost_center || 'NA'}`,
                        country: `${resp1.body.country || 'NA'}`,
                        department_id: `${resp1.body.department_id || 'NA'}`,
                        department_name: `${resp1.body.department_name || 'NA'}`,
                        discount_per: `${resp1.body.discount_per || 'NA'}`,
                        doc_type_desc: `${resp1.body.doc_type_desc || 'NA'}`,
                        from_supplier: `${resp1.body.from_supplier || 'NA'}`,
                        gl_account: `${resp1.body.gl_account || 'NA'}`,
                        gstin: `${resp1.body.gstin || 'NA'}`,
                        igst_tot_amt: `${resp1.body.igst_tot_amt || 'NA'}`,
                        in_status: `${resp1.body.in_status || 'NA'}`,
                        internal_order: `${resp1.body.internal_order || 'NA'}`,
                        irn: `${resp1.body.irn || 'NA'}`,
                        is_igst: `${resp1.body.is_igst || 'NA'}`,
                        modified_date: `${resp1.body.modified_date || 'NA'}`,
                        npo: `${resp1.body.npo || 'NA'}`,
                        payment_method: `${resp1.body.payment_method || 'NA'}`,
                        posting_date: `${resp1.body.posting_date || 'NA'}`,
                        sap_invoice_no: `${resp1.body.sap_invoice_no || 'NA'}`,
                        sgst_tot_amt: `${resp1.body.sgst_tot_amt || 'NA'}`,
                        supplier_comments: `${resp1.body.supplier_comments || 'NA'}`,
                        supplier_id: `${resp1.body.supplier_id || 'NA'}`,
                        supplier_name: `${resp1.body.supplier_name || 'NA'}`,
                        tax_per: `${resp1.body.tax_per || 'NA'}`,
                        taxable_amount: `${resp1.body.taxable_amount || 'NA'}`,
                        tcs: `${resp1.body.tcs || 'NA'}`,
                        tds_per: `${resp1.body.tds_per || 'NA'}`,
                        tds_tot_amt: `${resp1.body.tds_tot_amt || 'NA'}`,
                        total_discount_amount: `${resp1.body.total_discount_amount || 'NA'}`,
                        user_invoice_id: `${resp1.body.user_invoice_id || 'NA'}`,
                        file_link: `${resp1.body.files[0]?.file_link || 'NA'}`,



                    };



                    if (space.days_to_due == 'Paid') {
                        entriesdemo.days_to_due = `${space.days_to_due || 'NA'}`;
                        // entriesdemo.dtd = 3;
                    }
                    else if (!space.days_to_due) {
                        entriesdemo.days_to_due = 'NA';
                    }
                    else {
                        entriesdemo.days_to_due = `${space.days_to_due + 'Days' || 'NA'}`;
                        // entriesdemo.dtd = 1;
                    }

                    if (entriesdemo.days_to_due.startsWith('-')) {
                        entriesdemo.ovrdueflag = 1;
                    }
                    else if (entriesdemo.days_to_due == 'Paid') {
                        entriesdemo.ovrdueflag = 3;
                    }
                    else {
                        entriesdemo.ovrdueflag = 2;
                    }
                    // console.log(typeof(entriesdemo.ovrdueflag));

                    entries.push(entriesdemo);

                    space.approvers.forEach(approver => {
                        approversEntries.push({
                            approver: `${approver.approver || 'NA'}`,
                            isapproved: `${approver.isapproved || 'NA'}`,
                            isgroup: `${approver.isgroup || 'NA'}`,
                            level: `${approver.level || 'NA'}`,
                            name: `${approver.name || 'NA'}`,
                            invoice_no: Number(space.invoice_no),
                            // toInvoice:space.invoice_no
                        });
                    });
                });

                await Promise.all(promises);
                //     pgnum++;
                // }

                // Batch insert data into the database
                await cds.tx(req).run(INSERT.into(Invoice).entries(entries));
                await cds.tx(req).run(INSERT.into(Approvers).entries(approversEntries));

                firstRead = false;
            }
        } catch (err) {
            req.error(500, err.message);
        }
    });


    this.before('READ', InvoiceApprover, async (req) => {
        firstRead = true;
        try {
            if (firstRead) {
                // const entries1 = [];
                const approversEntries = [];
                let inv = req.params[0].invoice_no;

                const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${inv}`);
                console.log(inv);
                cds.tx(req).run(DELETE(InvoiceApprover));
                cds.tx(req).run(DELETE(Invoice_child_items));

                const space = resp1.body;
                // space.approvers.forEach(s1 => {
                approversEntries.push({
                    member_id: `${space.member_id || 'NA'}`,
                    invoice_no: Number(space.invoice_no),
                    approved_date: `${space.approved_date}  || 'NA'`,
                    member_name: `${space.member_name}  || 'NA'`,
                })
                // })

                // })

                await cds.tx(req).run(INSERT.into(InvoiceApprover).entries(approversEntries));

                firstRead = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
    this.before('READ', Invoice_child_items, async (req) => {
        firstRead = true;
        try {
            if (firstRead) {

                let inv = req.params[0].invoice_no;
                const items = [];
                const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${inv}`);
                console.log(inv);
                cds.tx(req).run(DELETE(Invoice_child_items));

                const space = resp1.body;
                space.items.forEach(space => {
                    items.push({
                        // invoice_no: inv,
                        // amount: space.amount,
                        // amt_per_unit: space.amt_per_unit,
                        // cgst_amount: `CGST Amt:${(space.quantity * space.amt_per_unit) * (space.gst_per / 2) / 100}`,
                        // cgst_per: `CGST:${space.gst_per / 2}%`,
                        // cost_center: space.cost_center,
                        // currency: space.currency || 'NA',
                        // discount: space.discount,
                        // discount_amount: space.discount_amount,
                        // ebelp: space.ebelp,
                        // gl_account: space.plant || 'NA',
                        // gross_amount: space.gross_amount,
                        // gst_per: space.gst_per,
                        // gst_amt: (space.quantity * space.amt_per_unit) * (space.gst_per) / 100,
                        // hsn_code: space.hsn_code || 'NA',
                        // igst_amount: space.igst_amount,
                        // igst_per: space.igst_per,
                        // item_no: space.item_no,
                        // material: space.material,
                        // material_desc: space.material_desc,
                        // ocr_matched: space.ocr_matched,
                        // plant: space.plant,
                        // qc_check: space.qc_check,
                        // quantity: space.quantity,
                        // ref_po_no: space.ref_po_no,
                        // sgst_amount: `SGST Amt:${(space.quantity * space.amt_per_unit) * (space.gst_per / 2) / 100}`,
                        // sgst_per: `SGST:${space.gst_per / 2}%`,
                        // tax_code: space.tax_code,
                        // tax_value_amount: (space.quantity * space.amt_per_unit) * (space.gst_per / 100),
                        // taxable_amount: space.quantity * space.amt_per_unit,
                        // total_amt_item: (space.quantity * space.amt_per_unit) + (space.quantity * space.amt_per_unit) * (space.gst_per / 100),
                        // unit: space.unit,
                        invoice_no: `${inv}`,
                        amount: `${space.amount || 'NA'}`,
                        amt_per_unit: `${space.amt_per_unit || 'NA'}`,
                        cgst_amount: `CGST Amt:${((space.quantity * space.amt_per_unit) * (space.gst_per / 2) / 100)}`,
                        cgst_per: `CGST:${(space.gst_per / 2)}%`,
                        cost_center: `${space.cost_center || 'NA'}`,
                        currency: `${space.currency || 'NA'}`,
                        discount: `${space.discount || 'NA'}`,
                        discount_amount: `${space.discount_amount || 'NA'}`,
                        ebelp: `${space.ebelp || 'NA'}`,
                        gl_account: `${space.plant || 'NA'}`,
                        gross_amount: `${space.gross_amount || 'NA'}`,
                        gst_per: `${space.gst_per || 'NA'}`,
                        gst_amt: `${(space.quantity * space.amt_per_unit) * (space.gst_per / 100)}`,
                        hsn_code: `${space.hsn_code || 'NA'}`,
                        igst_amount: `${space.igst_amount || 'NA'}`,
                        igst_per: `${space.igst_per || 'NA'}`,
                        item_no: `${space.item_no || 'NA'}`,
                        material: `${space.material || 'NA'}`,
                        material_desc: `${space.material_desc || 'NA'}`,
                        ocr_matched: `${space.ocr_matched || 'NA'}`,
                        plant: `${space.plant || 'NA'}`,
                        qc_check: `${space.qc_check || 'NA'}`,
                        quantity: `${space.quantity || 'NA'}`,
                        ref_po_no: `${space.ref_po_no || 'NA'}`,
                        sgst_amount: `SGST Amt:${((space.quantity * space.amt_per_unit) * (space.gst_per / 2) / 100)}`,
                        sgst_per: `SGST:${(space.gst_per / 2)}%`,
                        tax_code: `${space.tax_code || 'NA'}`,
                        tax_value_amount: `${(space.quantity * space.amt_per_unit) * (space.gst_per / 100)}`,
                        taxable_amount: `${space.quantity * space.amt_per_unit || 'NA'}`,
                        total_amt_item: `${(space.quantity * space.amt_per_unit) + (space.quantity * space.amt_per_unit) * (space.gst_per / 100)}`,
                        unit: `${space.unit || 'NA'}`,



                    })
                })
                await cds.tx(req).run(INSERT.into(Invoice_child_items).entries(items));

                firstRead = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });



    //chart
    this.before('READ', Invoice_overviewchart_1, async (req) => {
        firstRead = true;
        try {
            if (firstRead) {
                const entries = [];

                const resp1 = await c4re.get(`/dev/invoice-overview`);
                cds.tx(req).run(DELETE(Invoice_overviewchart_1));
                const values = ["Draft", "Rejected", "New", "In Approval", "Processed"];
                const space = resp1.body;
                entries.push({
                    chartDimension: `${values[0]}`,
                    chartMeasure: Number(space.draft)
                })
                entries.push({
                    chartDimension: `${values[1]}`,
                    chartMeasure: Number(space.rejected)
                })
                entries.push({
                    chartDimension: `${values[2]}`,
                    chartMeasure: Number(space.new)
                })
                entries.push({
                    chartDimension: `${values[3]}`,
                    chartMeasure: Number(space.inapproval)
                })
                entries.push({
                    chartDimension: `${values[4]}`,
                    chartMeasure: Number(space.processed)
                })



                await cds.tx(req).run(INSERT.into(Invoice_overviewchart_1).entries(entries));
                firstRead = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    //chart
    this.before('READ', AccountPayable_1, async (req) => {
        firstRead = true;
        try {
            if (firstRead) {
                const entries = [];

                const resp1 = await c4re.get(`/dev/account-payable`);
                cds.tx(req).run(DELETE(AccountPayable_1));
                const values = ['Current Payable', 'Overdue', 'Processed']
                const space = resp1.body;
                entries.push({
                    chartDimension: `${values[0]}`,
                    chartMeasure: Number(space.due_amount).toFixed(2)
                })
                entries.push({
                    chartDimension: `${values[1]}`,
                    chartMeasure: Number(space.over_due_amount).toFixed(2)
                })
                entries.push({
                    chartDimension: `${values[2]}`,
                    chartMeasure: Number(space.processed_amt).toFixed(2)
                })


                await cds.tx(req).run(INSERT.into(AccountPayable_1).entries(entries));
                firstRead = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    this.before('READ', Overview_page, async (req) => {
        firstRead = true;
        try {
            if (firstRead) {
                const entries = [];

                const resp1 = await c4re.get(`/dev/overview`);
                cds.tx(req).run(DELETE(Overview_page));
                const values = ["Current Payable", "Overdue", "Payable today", "Payable in 7 days", "Total Payable"];
                const space = resp1.body;
                entries.push({
                    chartDimension: `${values[0]}`,
                    chartMeasure: `${values[0]} ${space.current_payable}`
                })
                entries.push({
                    chartDimension: `${values[1]}`,
                    chartMeasure: `${values[1]} ${space.over_due_amount}`
                })
                entries.push({
                    chartDimension: `${values[2]}`,
                    chartMeasure: `${values[2]} ${space.payable_by_today}`
                })
                entries.push({
                    chartDimension: `${values[3]}`,
                    chartMeasure: `${values[3]} ${space.payable_within_7days}`
                })
                entries.push({
                    chartDimension: `${values[4]}`,
                    chartMeasure: `${values[4]} ${space.total_payable}`
                })



                await cds.tx(req).run(INSERT.into(Overview_page).entries(entries));
                firstRead = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
    this.before('READ', Overview_page_1, async (req) => {
        firstRead = true;
        try {
            if (firstRead) {
                const entries = [];

                const resp1 = await c4re.get(`/dev/overview`);
                cds.tx(req).run(DELETE(Overview_page_1));
                const space = resp1.body;
                entries.push({
                    current_payable: `Current Payable: ${formatNumber(space.current_payable)}`,
                    over_due_amount: `Overdue: ${formatNumber(space.over_due_amount)}`,
                    payable_by_today: `Payable today:  ${formatNumber(space.payable_by_today)}`,
                    payable_within_7days: `Payable in 7 days: ${formatNumber(space.payable_within_7days)}`,
                    total_payable: `Total Payable: ${formatNumber(space.total_payable)}`
                })

                await cds.tx(req).run(INSERT.into(Overview_page_1).entries(entries));
                firstRead = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


}
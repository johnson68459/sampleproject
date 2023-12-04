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
        MasterCompanyCode,
        InvoiceObj
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
        // debugger

        const fileLinkValue = await SELECT`file_link`.from(InvoiceObj).where({ invoice_no: req.data.invoice_no });

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


    // this.before("READ", Invoice, async (req) => {
    //     // firstRead = true;
    //     try {
    //         if (Object.keys(req.data).length != 0) {
    //             console.log('hello');
    //             const entries = [];
    //             const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${req.data.invoice_no}`);
    //             const space = resp.body;
    //             await cds.tx(req).run(DELETE(InvoiceObj));
    //             // const promises = spaces.map(async (space) => {
    //             entries.push({
    //                 adjustment: `${space.adjustment || 'NA'}`,
    //                 amount: `${space.amount || 'NA'}`,
    //                 app_comment: `${space.app_comment || 'NA'}`,
    //                 approver_comments: `${space.approver_comments || 'NA'}`,
    //                 approver_id: `${space.approver_id || 'NA'}`,
    //                 approvers: `${space.approvers || 'NA'}`,
    //                 baseline_date: `${space.baseline_date || 'NA'}`,
    //                 business_area: `${space.business_area || 'NA'}`,
    //                 cgst_tot_amt: `${space.cgst_tot_amt || 'NA'}`,
    //                 company_code: `${space.company_code || 'NA'}`,
    //                 cost_center: `${space.cost_center || 'NA'}`,
    //                 country: `${space.country || 'NA'}`,
    //                 currency: `${space.currency || 'NA'}`,
    //                 department_id: `${space.department_id || 'NA'}`,
    //                 department_name: `${space.department_name || 'NA'}`,
    //                 discount_per: `${space.discount_per || 'NA'}`,
    //                 doc_type_desc: `${space.doc_type_desc || 'NA'}`,
    //                 document_type: `${space.document_type || 'NA'}`,
    //                 from_supplier: `${space.from_supplier || 'NA'}`,
    //                 gl_account: `${space.gl_account || 'NA'}`,
    //                 gstin: `${space.gstin || 'NA'}`,
    //                 igst_tot_amt: `${space.igst_tot_amt || 'NA'}`,
    //                 in_status: `${space.in_status || 'NA'}`,
    //                 internal_order: `${space.internal_order || 'NA'}`,
    //                 invoice_date: `${space.invoice_date || 'NA'}`,
    //                 invoice_no: `${space.invoice_no || 'NA'}`,
    //                 irn: `${space.irn || 'NA'}`,
    //                 is_igst: `${space.is_igst || 'NA'}`,
    //                 modified_date: `${space.modified_date || 'NA'}`,
    //                 npo: `${space.npo || 'NA'}`,
    //                 payment_method: `${space.payment_method || 'NA'}`,
    //                 payment_terms: `${space.payment_terms || 'NA'}`,
    //                 posting_date: `${space.posting_date || 'NA'}`,
    //                 ref_po_num: `${space.ref_po_num || 'NA'}`,
    //                 sap_invoice_no: `${space.sap_invoice_no || 'NA'}`,
    //                 sgst_tot_amt: `${space.sgst_tot_amt || 'NA'}`,
    //                 supplier_comments: `${space.supplier_comments || 'NA'}`,
    //                 supplier_id: `${space.supplier_id || 'NA'}`,
    //                 supplier_name: `${space.supplier_name || 'NA'}`,
    //                 tax_per: `${space.tax_per || 'NA'}`,
    //                 taxable_amount: `${space.taxable_amount || 'NA'}`,
    //                 tcs: `${space.tcs || 'NA'}`,
    //                 tds_per: `${space.tds_per || 'NA'}`,
    //                 tds_tot_amt: `${space.tds_tot_amt || 'NA'}`,
    //                 total_discount_amount: `${space.total_discount_amount || 'NA'}`,
    //                 user_invoice_id: `${space.user_invoice_id || 'NA'}`,
    //                 file_link: `${space.files[0]?.file_link || 'NA'}`,
    //             })
    //             // })
    //             await cds.tx(req).run(INSERT.into(InvoiceObj).entries(entries));
    //             // await Promise.all(promises);

    //             console.log();

    //             return req;
    //         }
    //         else {
    //             if (firstRead) {
    //                 let pgnum = 1;
    //                 const entries = [];
    //                 const approversEntries = [];
    //                 const batchSize = 100; // Number of lines to fetch at once
    //                 let done = false;
    //                 cds.tx(req).run(DELETE(Invoice));

    //                 while (!done) {
    //                     const resp = await c4re.post(`/dev/dia-analytics?pageno=${pgnum}&nooflines=${batchSize}`);
    //                     const spaces = resp.body.records;

    //                     if (spaces.length === 0 || pgnum == 10) {
    //                         done = true; // No more data to fetch
    //                     }

    //                     const promises = spaces.map(async (space) => {
    //                         // Process each space in parallel
    //                         // ...
    //                         let inv = space.invoice_no;
    //                         // const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${inv}`);
    //                         let entry_date = space.entry_date + ' ' + space.entry_time;
    //                         let end_date = space.end_date + ' ' + space.end_time;
    //                         const entriesdemo = {
    //                             amount: `${space.amount || '0'} ${space.currency}`,
    //                             user_processing: `${space.user_processing}`,
    //                             amount_overdue: `${space.amount_overdue || 'NA'}`,
    //                             company_code: `${space.company_code || 'NA'}`,
    //                             currency: `${space.currency || 'NA'}`,
    //                             days_overdue: `${space.days_overdue || 'NA'}`,
    //                             document_status: `${space.document_status || 'NA'}`,
    //                             document_type: `${space.document_type || 'NA'}`,
    //                             due_date: `${space.due_date}`,
    //                             end_date: `${space.end_date || 'NA'} ${space.end_time || 'NA'}`,
    //                             end_time: `${space.end_time || 'NA'}`,
    //                             entry_date: `${space.entry_date || 'NA'} ${space.entry_time || 'NA'}`,
    //                             entry_time: `${space.entry_time || 'NA'}`,
    //                             invoice_date: `${space.invoice_date || 'NA'}`,
    //                             invoice_no: Number(space.invoice_no),
    //                             npo_flag: `${space.npo_flag || 'NA'}`,
    //                             number_of_approvers: `${space.number_of_approvers || 'NA'}`,
    //                             payment_status: `${space.payment_status || 'NA'}`,
    //                             payment_terms: `${space.payment_terms + ' Days' || 'NA'}`,
    //                             process_duration: `${getTimeDifferenceFormatted(entry_date, end_date) || 'In Processing'}`,
    //                             reason_text: `${space.reason_text || 'NA'}`,
    //                             ref_po_num: `${space.ref_po_num || 'NA'}`,
    //                             update_date: `${space.update_date || 'NA'}`,
    //                             update_time: `${space.update_time || 'NA'}`,
    //                             vendor_name: `${space.vendor_name || 'NA'}`,
    //                             vendor_no: `${space.vendor_no || 'NA'}`,



    //                         };
    //                         // entriesdemo.file_link = entriesdemo.file_link.replace('https://l8m6p8a76e.execute-api.eu-central-1.amazonaws.com', 'https://elipo_backend-shy-echidna-yp.cfapps.us20.hana.ondemand.com');
    //                         // entriesdemo.file_link = `https://www.africau.edu/images/default/sample.pdf`;

    //                         // console.log(fileLink);


    //                         if (space.days_to_due == 'Paid') {
    //                             entriesdemo.days_to_due = `${space.days_to_due || 'NA'}`;
    //                             // entriesdemo.dtd = 3;
    //                         }
    //                         else if (!space.days_to_due) {
    //                             entriesdemo.days_to_due = 'NA';
    //                         }
    //                         else {
    //                             entriesdemo.days_to_due = `${space.days_to_due + 'Days' || 'NA'}`;
    //                             // entriesdemo.dtd = 1;
    //                         }

    //                         if (entriesdemo.days_to_due.startsWith('-')) {
    //                             entriesdemo.ovrdueflag = 1;
    //                         }
    //                         else if (entriesdemo.days_to_due == 'Paid') {
    //                             entriesdemo.ovrdueflag = 3;
    //                         }
    //                         else {
    //                             entriesdemo.ovrdueflag = 2;
    //                         }
    //                         // console.log(typeof(entriesdemo.ovrdueflag));

    //                         entries.push(entriesdemo);

    //                         space.approvers.forEach(approver => {
    //                             approversEntries.push({
    //                                 approver: `${approver.approver || 'NA'}`,
    //                                 isapproved: `${approver.isapproved || 'NA'}`,
    //                                 isgroup: `${approver.isgroup || 'NA'}`,
    //                                 level: `${approver.level || 'NA'}`,
    //                                 name: `${approver.name || 'NA'}`,
    //                                 invoice_no: Number(space.invoice_no),
    //                                 // toInvoice:space.invoice_no
    //                             });
    //                         });
    //                     });

    //                     await Promise.all(promises);
    //                     pgnum++;
    //                 }

    //                 // Batch insert data into the database
    //                 await cds.tx(req).run(INSERT.into(Invoice).entries(entries));
    //                 await cds.tx(req).run(INSERT.into(Approvers).entries(approversEntries));

    //                 firstRead = false;
    //             }
    //         }
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });


    this.before("READ", Invoice, async (req) => {
        try {
            if (Object.keys(req.data).length !== 0) {
                // Existing code for processing individual records
                console.log('hello');
                const entries = [];
                const resp = await c4re.post(`/dev/fetch-invoice?invoice_no=${req.data.invoice_no}`);
                const space = resp.body;
                let parentamt=0;
                let parenttamt=0;
                await cds.tx(req).run(DELETE(InvoiceObj));


                var doctype1 = await SELECT.from(Invoice).where({invoice_no:req.data.invoice_no});
                var doctype = await SELECT.one`document_type`.from(Invoice).where({invoice_no:req.data.invoice_no});
                space.items.forEach(space1 => {
                    parentamt = parentamt + Number((space1.quantity * space1.amt_per_unit) + (space1.quantity * space1.amt_per_unit) * (space1.gst_per / 100));
                    parenttamt += Number(space1.quantity * space1.amt_per_unit)
                })
                // var amt = await SELECT.from(Invoice_child_items).where({invoice_no:req.data.invoice_no});
                // var amt1 = await SELECT`sum(taxable_amount)`.from(Invoice_child_items).where({invoice_no:req.data.invoice_no});
                // const promises = spaces.map(async (space) => {
                entries.push({
                    adjustment: `${space.adjustment || 'NA'}`,
                    amount: `${parenttamt || 'NA'}`,
                    app_comment: `${space.app_comment || 'NA'}`,
                    approver_comments: `${space.approver_comments || 'NA'}`,
                    approver_id: `${space.approver_id || 'NA'}`,
                    approvers: `${space.approvers || 'NA'}`,
                    baseline_date: `${space.baseline_date || 'NA'}`,
                    business_area: `${space.business_area || 'NA'}`,
                    cgst_tot_amt: `${space.cgst_tot_amt || 'NA'}`,
                    company_code: `${space.company_code || 'NA'}`,
                    cost_center: `${space.cost_center || 'NA'}`,
                    country: `${space.country || 'NA'}`,
                    currency: `${space.currency || 'NA'}`,
                    department_id: `${space.department_id || 'NA'}`,
                    department_name: `${space.department_name || 'NA'}`,
                    discount_per: `${space.discount_per || 'NA'}`,
                    doc_type_desc: `${doctype || 'Invoice'}`,
                    document_type: `${doctype.document_type || 'NA'}`,
                    from_supplier: `${space.from_supplier || 'NA'}`,
                    gl_account: `${space.gl_account || 'NA'}`,
                    gstin: `${space.gstin || 'NA'}`,
                    igst_tot_amt: `${space.igst_tot_amt || 'NA'}`,
                    in_status: `${space.in_status || 'NA'}`,
                    internal_order: `${space.internal_order || 'NA'}`,
                    invoice_date: `${space.invoice_date || 'NA'}`,
                    invoice_no: `${space.invoice_no || 'NA'}`,
                    irn: `${space.irn || 'NA'}`,
                    is_igst: `${space.is_igst || 'NA'}`,
                    modified_date: `${space.modified_date || 'NA'}`,
                    npo: `${space.npo || 'NA'}`,
                    payment_method: `${space.payment_method || 'NA'}`,
                    payment_terms: `${space.payment_terms || 'NA'}`,
                    posting_date: `${space.posting_date || 'NA'}`,
                    ref_po_num: `${space.ref_po_num || 'NA'}`,
                    sap_invoice_no: `${space.sap_invoice_no || 'NA'}`,
                    sgst_tot_amt: `${space.sgst_tot_amt || 'NA'}`,
                    supplier_comments: `${space.supplier_comments || 'NA'}`,
                    supplier_id: `${space.supplier_id || 'NA'}`,
                    supplier_name: `${space.supplier_name || 'NA'}`,
                    tax_per: `${space.tax_per || 'NA'}`,
                    taxable_amount: `${parentamt || 'NA'}`,
                    tcs: `${space.tcs || 'NA'}`,
                    tds_per: `${space.tds_per || 'NA'}`,
                    tds_tot_amt: `${space.tds_tot_amt || 'NA'}`,
                    total_discount_amount: `${space.total_discount_amount || 'NA'}`,
                    user_invoice_id: `${space.user_invoice_id || 'NA'}`,
                    file_link: `${space.files[0]?.file_link || 'NA'}`,
                })
                // })
                await cds.tx(req).run(INSERT.into(InvoiceObj).entries(entries));
                // await Promise.all(promises);

                console.log();

                return req;
            } else {
                if (firstRead) {
                    const batchSize = 100;
                    let pgnum = 1;
                    const entries = [];
                    const approversEntries = [];

                    while (true) {
                        const resp = await c4re.post(`/dev/dia-analytics?pageno=${pgnum}&nooflines=${batchSize}`);
                        const spaces = resp.body.records;

                        if (spaces.length === 0 || pgnum === 2) {
                            break;
                        }

                        const promises = spaces.map(async (space) => {
                            // Process each space in parallel
                            // ...

                            // Existing code for processing each space
                            // Process each space in parallel
                            // ...

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



                            };
                            // entriesdemo.file_link = entriesdemo.file_link.replace('https://l8m6p8a76e.execute-api.eu-central-1.amazonaws.com', 'https://elipo_backend-shy-echidna-yp.cfapps.us20.hana.ondemand.com');
                            // entriesdemo.file_link = `https://www.africau.edu/images/default/sample.pdf`;

                            // console.log(fileLink);


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
                        pgnum++;
                    }

                    // Batch insert data into the database
                    // await cds.tx(req).run([
                    //     DELETE(Invoice),
                    //     INSERT.into(Invoice).entries(entries),
                    //     INSERT.into(Approvers).entries(approversEntries)
                    // ]);

                    await DELETE.from(Invoice);
                    await INSERT.into(Invoice).entries(entries);
                    await INSERT.into(Approvers).entries(approversEntries);

                    firstRead = false;
                }
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
                var i =0;
                const items = [];
                const resp1 = await c4re.post(`/dev/fetch-invoice?invoice_no=${inv}`);
                console.log(inv);
                cds.tx(req).run(DELETE(Invoice_child_items));
                let parentamt=0;
                let parenttamt=0;
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

                    parentamt=parentamt+Number(items[i].total_amt_item);
                    console.log(items[i].total_amt_item);
                    parenttamt=parenttamt+Number(items[i].taxable_amount);
                    console.log(parentamt);

                    i++;
                })

                await cds.tx(req).run(INSERT.into(Invoice_child_items).entries(items));
                // await cds.update(InvoiceObj).set({taxable_amount:parentamt,amount:parenttamt}).where({invoice_no:req.params[0].invoice_no});

                // var demo1 = await SELECT.from(InvoiceObj);
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
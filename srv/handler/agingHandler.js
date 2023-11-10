const cds = require('@sap/cds');

module.exports = async function () {
    let {
        Aging,
        Aging_aggregate,
        Aging_bsd_comp_1,

    } = this.entities;
    function formatNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(2) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(2) + 'k';
        }
        return number.toString();
    }
    const c4re = await cds.connect.to('iflow');

    let firstRead = true;
    this.before('READ', [Aging, Aging_aggregate], async (req) => {
        firstRead = true;
        try {
            if (firstRead) {
                if (req.params.length != 0) {
                    console.log(req.params[0].vendor_name);
                    cds.tx(req).run(DELETE(Aging_aggregate));
                    // const listoflia =await SELECT `invoice_91_or_more`.from(Aging);
                    const listofagi = await SELECT.from(Aging).columns('vendor_name', 'invoice_0_to_30', 'invoice_31_to_60', 'invoice_61_to_90', 'invoice_91_or_more').where({ vendor_name: req.params[0].vendor_name });

                    var total_invoice_91_or_more = 0.0;
                    var total_invoice_0_to_30 = 0.0;
                    var total_invoice_31_to_60 = 0.0;
                    var total_invoice_61_to_90 = 0.0;
                    let cnt = 1;
                    // var code = ['PO','NPO','ALL']
                    var demo = [];
                    for (const space of listofagi) {
                        total_invoice_0_to_30 += Number(space.invoice_0_to_30);
                        total_invoice_31_to_60 += Number(space.invoice_31_to_60);
                        total_invoice_61_to_90 += Number(space.invoice_61_to_90);
                        total_invoice_91_or_more += Number(space.invoice_91_or_more);
                    }

                    // If you need to format the totals with two decimal places, you can do it after the loop:
                    total_invoice_61_to_90 = total_invoice_61_to_90.toFixed(2);
                    total_invoice_91_or_more = total_invoice_91_or_more.toFixed(2);
                    demo.push({
                        id: `${cnt++}`,
                        vendor_no: `PO`,
                        vendor_name: `${req.params[0].vendor_name}`,
                        invoice_0_to_30: 0,
                        invoice_31_to_60: 0,
                        invoice_61_to_90: `0`,
                        invoice_91_or_more: `0`,
                        _61_to_90_days: 0,
                        d_gt_90: 0
                    });
                    demo.push({
                        id: `${cnt++}`,
                        vendor_no: `NPO`,
                        vendor_name: `${req.params[0].vendor_name}`,
                        invoice_0_to_30: (total_invoice_0_to_30),
                        invoice_31_to_60: total_invoice_31_to_60,
                        invoice_61_to_90: `${formatNumber(total_invoice_61_to_90)}`,
                        invoice_91_or_more: `${formatNumber(total_invoice_91_or_more)}`,
                        _61_to_90_days: total_invoice_61_to_90/2,
                        d_gt_90: total_invoice_91_or_more/2
                    });
                    demo.push({
                        id: `${cnt++}`,
                        vendor_no: `ALL`,
                        vendor_name: `${req.params[0].vendor_name}`,
                        invoice_0_to_30: total_invoice_0_to_30,
                        invoice_31_to_60: total_invoice_31_to_60,
                        invoice_61_to_90: `${formatNumber(total_invoice_61_to_90)}`,
                        invoice_91_or_more: `${formatNumber(total_invoice_91_or_more)}`,
                        _61_to_90_days: total_invoice_61_to_90/2,
                        d_gt_90: total_invoice_91_or_more/2
                    });

                    await cds.tx(req).run(INSERT.into(Aging_aggregate).entries(demo));


                }
                else {
                    const entries = [];

                    const resp = await c4re.post(`/dev/aging-report`);
                    cds.tx(req).run(DELETE(Aging));
                    // cds.tx(req).run(DELETE(Aging_aggregate));
                    const spaces = resp.body.output2;

                    spaces.forEach(space => {
                        entries.push({
                            "amount_due": `${space.amount_due}`,
                            "date": `${space.date}`,
                            "days_outstanding": `${space.days_outstanding}`,
                            "flag": `${space.flag}`,
                            "invoice_0_to_30": `${space.invoice_0_to_30}`,
                            "invoice_31_to_60": `${space.invoice_31_to_60}`,
                            "invoice_61_to_90": `${space.invoice_61_to_90}`,
                            "invoice_91_or_more": `${space.invoice_91_or_more}`,
                            "invoice_no": `${space.invoice_no}`,
                            "vendor_name": `${space.vendor_name}`,
                            "vendor_no": `${space.vendor_no}`

                        });

                    });

                    await cds.tx(req).run(INSERT.into(Aging).entries(entries));
                    // await cds.tx(req).run(INSERT.into(Aging_aggregate).entries(entries));
                    firstRead = false;
                }
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    let firstReadA1 = true;
    this.before('READ', Aging_bsd_comp_1, async (req) => {

        try {
            if (firstReadA1) {
                const entries = [];

                const resp = await c4re.post(`/dev/aging-report`);
                cds.tx(req).run(DELETE(Aging_bsd_comp_1));

                const spaces = resp.body.output1;

                entries.push({ cocd1000: 'PO', _0_to_30_days: spaces.po_0_30, _31_to_60_days: spaces.po_30_60, _61_to_90_days: spaces.po_60_90, d_gt_90: spaces.po_ab_90, company_code: spaces.company_code })
                entries.push({ cocd1000: 'NPO', _0_to_30_days: spaces.wpo_0_30, _31_to_60_days: spaces.wpo_30_60, _61_to_90_days: spaces.wpo_60_90, d_gt_90: spaces.wpo_ab_90, company_code: spaces.company_code })
                entries.push({ cocd1000: 'All', _0_to_30_days: spaces.total_0_30, _31_to_60_days: spaces.total_30_60, _61_to_90_days: spaces.total_60_90, d_gt_90: spaces.total_ab_90, company_code: spaces.company_code })

                await cds.tx(req).run(INSERT.into(Aging_bsd_comp_1).entries(entries));
                firstReadA1 = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
}
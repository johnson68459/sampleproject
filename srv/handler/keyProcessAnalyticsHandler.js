const cds = require('@sap/cds');

module.exports = async function () {
    let {
        Processed_InProcessing_1,
        Total_liabilities_1,
        Total_liabilities_2,
        key_TotalAccountsPayable_1,
        Vendorbasedonamount,
        Jan_Feb_Mar,
        Oct_Nov_Dec
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

    let firstReadP = true;

    this.before('READ', Processed_InProcessing_1, async (req) => {
        try {
            if (firstReadP) {
                const entries = [];

                const resp = await c4re.post(`/dev/key-process-analytics-report`);
                cds.tx(req).run(DELETE(Processed_InProcessing_1));

                const space = resp.body.output2;
                entries.push({ progress: 'InProcess', po: space.inprocess_po, npo: space.inprocess_npo, _all: space.inprocess_total });
                entries.push({ progress: 'Processed', po: space.processed_po, npo: space.processed_npo, _all: space.processed_total });
                entries.push({ progress: 'Total', po: space.total_po, npo: space.total_npo, _all: space.total_all });


                await cds.tx(req).run(INSERT.into(Processed_InProcessing_1).entries(entries));
                firstReadP = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    //key-analysis total liabilities
    let firstReadT = true;
    this.before('READ', Total_liabilities_1, async (req) => {

        try {
            if (firstReadT) {
                const entries = [];

                const resp = await c4re.post(`/dev/key-process-analytics-report`);
                cds.tx(req).run(DELETE(Total_liabilities_1));

                const space = resp.body.output3;
                entries.push({
                    liabilities: 'Current Liabilities',
                    po: Number(space.current_liability_po) || 0,
                    po_1: `${formatNumber(space.current_liability_po || 0)}`,
                    npo: Number(space.current_liability_npo) || 0,
                    npo_1: `${formatNumber(space.current_liability_npo || 0)}`,
                    total_liabilities: Number(space.total_current_liability) || 0,
                    total_liabilities_1: `${formatNumber(space.total_current_liability || 0)}`
                });
                entries.push({
                    liabilities: 'Over Due',
                    po: Number(space.overdue_po) || 0,
                    po_1: `${formatNumber(space.overdue_po || 0)}`,
                    npo: Number(space.overdue_npo) || 0,
                    npo_1: `${formatNumber(space.overdue_npo || 0)}`,
                    total_liabilities: Number(space.total_overdue) || 0,
                    total_liabilities_1: `${formatNumber(space.total_overdue || 0)}`
                });
                entries.push({
                    liabilities: 'Total',
                    po: Number(space.total_po) || 0,
                    po_1: `${formatNumber(space.total_po || 0)}`,
                    npo: Number(space.total_npo) || 0,
                    npo_1: `${formatNumber(space.total_npo || 0)}`,
                    total_liabilities: Number(space.total_processed_amount) || 0,
                    total_liabilities_1: `${formatNumber(space.total_processed_amount || 0)}`
                });




                await cds.tx(req).run(INSERT.into(Total_liabilities_1).entries(entries));
                firstReadT = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    let firstReadT2 = true;
    this.before('READ', Total_liabilities_2, async (req) => {

        try {
            if (firstReadT2) {
                const entries = [];

                const resp = await c4re.post(`/dev/key-process-analytics-report`);
                cds.tx(req).run(DELETE(Total_liabilities_2));

                const space = resp.body.output3;

                entries.push({
                    chartDimension: `Current Liabilities`,
                    chartMeasure: Number(space.total_current_liability)

                })

                entries.push({
                    chartDimension: `Over Due`,
                    chartMeasure: Number(space.total_overdue)

                })



                await cds.tx(req).run(INSERT.into(Total_liabilities_2).entries(entries));
                firstReadT2 = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    let firstReadkt = true;
    this.before('READ', key_TotalAccountsPayable_1, async (req) => {
        try {
            if (firstReadkt) {
                const entries = [];

                const resp = await c4re.get(`/dev/account-payable`);
                cds.tx(req).run(DELETE(key_TotalAccountsPayable_1));

                const values = ['Current Payable', 'Overdue', 'Processed']
                const space = resp.body;
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

                await cds.tx(req).run(INSERT.into(key_TotalAccountsPayable_1).entries(entries));
                firstReadkt = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    let firstReadkV = true;
    this.before('READ', Vendorbasedonamount, async (req) => {
        try {
            if (firstReadkV) {
                const entries = [];

                const resp = await c4re.get(`/dev/topvendors?userid=einvoiceportal@gmail.com`);
                cds.tx(req).run(DELETE(Vendorbasedonamount));
                const space = resp.body;

                for (let i = 0; i < space.length; i++) {
                    for (let j = 0; j < space[i].amounts.length; j++) {
                        entries.push({
                            cvendors: `${space[i].vendors[j]}`,
                            bquat_name: `(${(i + 1)}) ${space[i].quat_name}`,
                            amounts: Number(space[i].amounts[j]).toFixed(2)
                        })

                    }

                }

                await cds.tx(req).run(INSERT.into(Vendorbasedonamount).entries(entries));
                firstReadkt = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    })



    let firstReadJ = true;
    this.before('READ', Jan_Feb_Mar, async (req) => {
        try {
            if (firstReadJ) {
                const entries = [];

                const resp = await c4re.get(`/dev/topvendors?userid=einvoiceportal@gmail.com`);
                cds.tx(req).run(DELETE(Jan_Feb_Mar));
                const space = resp.body;

                for (let j = 0; j < space[0].amounts.length; j++) {
                    entries.push({
                        chartDimension: `${space[0].vendors[j]}`,
                        chartMeasure: Number(space[0].amounts[j]).toFixed(2)
                    })

                }

                await cds.tx(req).run(INSERT.into(Jan_Feb_Mar).entries(entries));
                firstReadJ = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    })

    let firstReadO = true;
    this.before('READ', Oct_Nov_Dec, async (req) => {
        try {
            if (firstReadO) {
                const entries = [];

                const resp = await c4re.get(`/dev/topvendors?userid=einvoiceportal@gmail.com`);
                cds.tx(req).run(DELETE(Oct_Nov_Dec));
                const space = resp.body;

                for (let j = 0; j < space[3].amounts.length; j++) {
                    entries.push({
                        chartDimension: `${space[3].vendors[j]}`,
                        chartMeasure: Number(space[3].amounts[j]).toFixed(2)
                    })

                }

                await cds.tx(req).run(INSERT.into(Oct_Nov_Dec).entries(entries));
                firstReadO = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    })

}
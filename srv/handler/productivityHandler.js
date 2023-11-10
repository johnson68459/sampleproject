const cds = require('@sap/cds');

//hours and minutes
function convertMinutesToHoursAndMinutes(minutes) {
    const isNegative = minutes < 0;
    minutes = Math.abs(minutes);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);

    const sign = isNegative ? '-' : '';
    const hoursString = hours === 0 ? '' : `${hours}H`;
    const minutesString = remainingMinutes === 0 ? '' : `${remainingMinutes}M`;

    return `${sign}${hoursString} ${minutesString}`;
}

//days hours and minutes
function convertMinutesToDaysHoursMinutes(minutes) {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = Math.round(minutes % 60);

    const daysString = days > 0 ? `${days}D ` : '';
    const hoursString = hours > 0 ? `${hours}H ` : '';
    const minutesString = remainingMinutes > 0 ? `${remainingMinutes}M` : '';

    return `${daysString}${hoursString}${minutesString}`;
}


module.exports = async function () {
    let {
        Productivity,
        ProductivityReportOverview_1,
        ProductivityReportOverviewdemo,
        ProductivityReportOverview_2
    } = this.entities;

    const c4re = await cds.connect.to('iflow');

    let firstReadP = true;
    this.before('READ', Productivity, async (req) => {
        firstReadP = true;
        try {
            if (firstReadP) {
                const entries = [];
                let cnt = 1;

                const resp = await c4re.post(`/dev/productivity-report`);
                cds.tx(req).run(DELETE(Productivity));

                const spaces = resp.body.output1;

                spaces.forEach(space => {
                    entries.push({
                        approval_time: `${convertMinutesToHoursAndMinutes(space.approval_time)}`,
                        approved: `${space.approved}`,
                        avg_time: `${convertMinutesToHoursAndMinutes(space.avg_time)}`,
                        cycle_time: `${convertMinutesToHoursAndMinutes(space.cycle_time)}`,
                        delegated: `${space.delegated}`,
                        inprocessing: `${space.inprocessing}`,
                        processing_time: `${convertMinutesToHoursAndMinutes(space.processing_time)}`,
                        rejected: `${space.rejected}`,
                        role: `${space.role}`,
                        total_processed: `${space.total_processed}`,
                        total_timespent: `${convertMinutesToDaysHoursMinutes(space.total_timespent)}`,
                        userid: `${space.userid}`

                    });
                });

                await cds.tx(req).run(INSERT.into(Productivity).entries(entries));
                firstReadP = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    let firstReadpo1 = true;
    this.before('READ', ProductivityReportOverviewdemo, async (req) => {
        
        try {
            if (firstReadpo1) {
                const entries = [];
                const entries1= [];

                const resp = await c4re.get(`/dev/productivity-overview`);
                // cds.tx(req).run(DELETE(ProductivityReportOverview_1));
                cds.tx(req).run(DELETE(ProductivityReportOverviewdemo));

                const spaces = resp.body;

                // spaces.forEach(space => {
                //     const group_id = space.groupid;
                //     const name_ = space.name;
                //     let invoices = space.invoices;
                //     // let mo
                //     for (let i = 0; i < invoices.length; i++) {
                //         entries.push({
                //             groupid: Number(group_id),
                //             invoices: Number(invoices[i]),
                //             months: `${(4 + i) + '(' + space.months[i] + ')'}`,
                //             name: `${name_}`,
                //             count: Number(i + 1),
                //         })
                //     }

                // });
                let invoices = spaces[0].invoices;
                for (let i = 0; i < invoices.length; i++) {
                    entries1.push({
                        finance_head:Number(spaces[0].invoices[i]),
                        cfo:Number(spaces[1].invoices[i]),
                        months:`${(4 + i) + '(' + spaces[0].months[i] + ')'}`
                    })
                }
                

                // await cds.tx(req).run(INSERT.into(ProductivityReportOverview_1).entries(entries));
                await cds.tx(req).run(INSERT.into(ProductivityReportOverviewdemo).entries(entries1));
                firstReadpo1 = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


    let firstReadpo2 = true;
    this.before('READ', ProductivityReportOverview_2, async (req) => {
        
        try {
            if (firstReadpo2) {
                const entries = [];

                const resp = await c4re.post(`/dev/productivity-report`);
                cds.tx(req).run(DELETE(ProductivityReportOverview_2));

                const spaces = resp.body.output2;

                entries.push({
                    name:'Ap Processor',
                    process_value:Number(spaces.processed_ap),
                    inprocess_value:Number(spaces.inprocess_ap)
                })

                entries.push({
                    name:'Shared service user',
                    process_value:Number(spaces.processed_ssu),
                    inprocess_value:Number(spaces.inprocess_ssu)
                })

                entries.push({
                    name:'Financial Controller',
                    process_value:Number(spaces.processed_fc),
                    inprocess_value:Number(spaces.inprocess_fc)
                })

                entries.push({
                    name:'Financial Head',
                    process_value:Number(spaces.processed_fh),
                    inprocess_value:Number(spaces.inprocess_fh)
                })

                entries.push({
                    name:'CFO',
                    process_value:Number(spaces.processed_cfo),
                    inprocess_value:Number(spaces.inprocess_cfo)
                })

                await cds.tx(req).run(INSERT.into(ProductivityReportOverview_2).entries(entries));
                firstReadpo2 = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });


}
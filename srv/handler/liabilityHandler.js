const cds = require('@sap/cds');

module.exports = async function () {
    let {
        Liability,
        Tableyears,
        LiabilityBasedOnAmount_1,
        TotalAccountsPayable_1,
        VendorLiabilityReportforCompanyCode_1,

    } = this.entities;

    const c4re = await cds.connect.to('iflow');
    function formatNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(2) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(2) + 'k';
        }
        return number.toString();
    }

    //Liability
    let firstReadL = true;
    this.before('READ', Liability, async (req) => {

        try {
            if (firstReadL) {
                const entries = [];
                const body = {
                    condn: [{
                        field: "company_code",
                        operator: "=",
                        value: "1000"
                    }]
                }

                const resp = await c4re.post('/dev/liability-report', body);
                cds.tx(req).run(DELETE(Liability));

                const spaces = resp.body;
                let cnt = 1;

                spaces.forEach(space => {
                    entries.push({
                        // id:cnt,
                        // vendor_no: space.vendor_no,
                        // company_code: space.company_code,
                        // currency: space.currency,
                        // overdue_flag: space.overdue_flag,
                        // total_amount: formatNumber(space.total_amount) + ' ' + space.currency,
                        // total_amt_paid: space.total_amt_paid,
                        // total_due_amount: formatNumber(space.total_due_amount) + ' ' + space.currency,
                        // total_no_of_invoice: space.total_no_of_invoice,
                        // total_no_of_invoice_due: space.total_no_of_invoice_due,
                        // total_no_of_invoice_due_crossed: space.total_no_of_invoice_due_crossed,
                        // total_no_of_invoice_paid: space.total_no_of_invoice_paid,
                        // total_no_of_paid_invoice: space.total_no_of_paid_invoice,
                        // total_over_due_amount: space.total_over_due_amount,
                        // total_paid_amount: space.total_paid_amount,
                        // vendor_name: space.vendor_name
                        "id": `${cnt}`,
                        "vendor_no": `${space.vendor_no}`,
                        "company_code": `${space.company_code}`,
                        "currency": `${space.currency}`,
                        "overdue_flag": `${space.overdue_flag}`,
                        "total_amount": `${formatNumber(space.total_amount)} ${space.currency}`,
                        "total_amt_paid": `${space.total_amt_paid}`,
                        "total_due_amount": `${formatNumber(space.total_due_amount)} ${space.currency}`,
                        "total_no_of_invoice": `${space.total_no_of_invoice}`,
                        "total_no_of_invoice_due": `${space.total_no_of_invoice_due}`,
                        "total_no_of_invoice_due_crossed": `${space.total_no_of_invoice_due_crossed}`,
                        "total_no_of_invoice_paid": `${space.total_no_of_invoice_paid}`,
                        "total_no_of_paid_invoice": `${space.total_no_of_paid_invoice}`,
                        "total_over_due_amount": `${space.total_over_due_amount}`,
                        "total_paid_amount": `${space.total_paid_amount}`,
                        "vendor_name": `${space.vendor_name}`



                    });
                    cnt++;

                });

                await cds.tx(req).run(INSERT.into(Liability).entries(entries));
                firstReadL = false;
            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    //
    // let firstReadG = true;
    // this.before('READ', [Tableyears, LiabilityBasedOnAmount_1, TotalAccountsPayable_1, VendorLiabilityReportforCompanyCode_1], async (req) => {
    //     try {
    //         if (firstReadG) {
    //             const yearUrl = await c4re.get('/dev/dropdown?drop_key=fiscal_year');
    //             const years = yearUrl.body.map(space => space.table_key);
    //             const valuesL = ['Due', 'Overdue'];
    //             const valuesT = ['Processed', 'Current Payable', 'Overdue'];
    //             // const valuesV = ['Due', 'Overdue'];
    //             const entries = [];//Liability
    //             const entries1 = [];
    //             const entries2 = [];
    //             const y = [];
    //             const yearSet = new Set();
    //             cds.tx(req).run(DELETE(VendorLiabilityReportforCompanyCode_1));
    //             cds.tx(req).run(DELETE(Tableyears));
    //             let cnt = 1;
    //             let count = 1;
    //             let cntr = 1;
    //             for (const year of years) {
    //                 if (!yearSet.has(year)) {
    //                     y.push({ "year": `${year}` });
    //                     yearSet.add(year);
    //                 }
    //                 const resp = await c4re.get(`/dev/liability-based-on-amount?fiscal_year=${year}&company_code=1000`);
    //                 const spaceL = resp.body.LiabilityBasedOnAmount;
    //                 const spaceT = resp.body.TotalAccountsPayable;

    //                 entries.push(
    //                     {
    //                         id: `${cnt++}`,
    //                         chartDimension: `${valuesL[0]}`,
    //                         chartMeasure: (spaceL.due_amount !== 0 ? Number(spaceL.due_amount).toFixed(2) : 0.00),
    //                         years: `${year}`,
    //                     });
    //                 entries.push(
    //                     {
    //                         id: `${cnt++}`,
    //                         chartDimension: `${valuesL[1]}`,
    //                         chartMeasure: spaceL.over_due_amount ? Number(spaceL.over_due_amount).toFixed(2) : 0.00,
    //                         years: `${year}`,
    //                     }
    //                 );
    //                 console.log(Number(spaceL.over_due_amount).toFixed(2));


    //                 entries1.push(
    //                     {
    //                         id: `${cntr++}`,
    //                         "chartDimension": `${valuesT[0]}`,
    //                         "chartMeasure": spaceT.processed_amount ? Number(spaceT.processed_amount).toFixed(2) : 0.00,
    //                         "years": `${year}`,
    //                         "nyears": `${year}`
    //                     }
    //                     ,
    //                     {
    //                         id: `${cntr++}`,
    //                         "chartDimension": `${valuesT[1]}`,
    //                         "chartMeasure": spaceT.due_amount ? Number(spaceT.due_amount).toFixed(2) : 0.00,
    //                         "years": `${year}`,
    //                         "nyears": `${year}`
    //                     },
    //                     {
    //                         id: `${cntr++}`,
    //                         "chartDimension": `${valuesT[2]}`,
    //                         "chartMeasure": spaceT.over_due_amount ? Number(spaceT.over_due_amount).toFixed(2) : 0.00,
    //                         "years": `${year}`,
    //                         "nyears": `${year}`
    //                     }
    //                 );
    //                 if (resp.body.VendorLiabilityReportforCompanyCode.length == 0) {
    //                     entries2.push({
    //                         id: `${count++}`,
    //                         "due_amount": 0.00,
    //                         "overdue_amount":0.00,
    //                         "processed_amount": 0.00,
    //                         "total_amount":0.00,
    //                         "vendor_name": ` `,
    //                         "vendor_no": ` `,
    //                         "years": `${year}`,

    //                     })
    //                     count++;
    //                 }
    //                 else {
    //                     resp.body.VendorLiabilityReportforCompanyCode.map((space) => {
    //                         entries2.push({
    //                             id: `${count++}`,
    //                             "due_amount": space.due_amount ? Number(space.due_amount).toFixed(2) : 0.00,
    //                             "overdue_amount": space.over_due_amount ? Number(space.over_due_amount).toFixed(2) : 0.00,
    //                             "processed_amount": space.processed_amount ? Number(space.processed_amount).toFixed(2) : 0.00,
    //                             "total_amount": space.total_amount ? Number(space.total_amount).toFixed(2) : 0.00,
    //                             "vendor_name": `${space.vendor_name}`,
    //                             "vendor_no": `${space.vendor_no}`,
    //                             "years": `${year}`,

    //                         })
    //                         count++;
    //                     });
    //                 }
    //                 cnt++;
    //                 // Remove existing records for the current year before inserting new data
    //                 await cds.tx(req).run(DELETE.from(LiabilityBasedOnAmount_1).where({ years: year }));
    //                 await cds.tx(req).run(DELETE.from(TotalAccountsPayable_1).where({ years: year }));
    //                 // await cds.tx(req).run(DELETE.from(VendorLiabilityReportforCompanyCode_1).where({ years: year }));

    //             }

    //             // Insert all entries in a single transaction
    //             await cds.tx(req).run(INSERT.into(LiabilityBasedOnAmount_1).entries(entries));
    //             await cds.tx(req).run(INSERT.into(TotalAccountsPayable_1).entries(entries1));
    //             await cds.tx(req).run(INSERT.into(VendorLiabilityReportforCompanyCode_1).entries(entries2));
    //             await cds.tx(req).run(INSERT.into(Tableyears).entries(y));

    //             firstReadG = false;

    //         }


    //         // return req;
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });


    let firstReadTableyears = true;
    let firstReadLiabilityBasedOnAmount = true;
    let firstReadTotalAccountsPayable = true;
    let firstReadVendorLiabilityReport = true;
    
    // Handler for Tableyears
    this.before('READ', Tableyears, async (req) => {
      try {
        if (firstReadTableyears) {
          const yearsData = await c4re.get('/dev/dropdown?drop_key=fiscal_year');
          const years = yearsData.body.map(space => space.table_key);
          const entries = years.map(year => ({ year: year }));
          cds.tx(req).run(DELETE(Tableyears));
          await cds.tx(req).run(INSERT.into(Tableyears).entries(entries));
          firstReadTableyears = false;
        }
      } catch (err) {
        req.error(500, err.message);
      }
    });
    
    // Handler for LiabilityBasedOnAmount_1
    this.before('READ', LiabilityBasedOnAmount_1, async (req) => {
      try {
        if (firstReadLiabilityBasedOnAmount) {
          const yearsData = await c4re.get('/dev/dropdown?drop_key=fiscal_year');
          const years = yearsData.body.map(space => space.table_key);
          const valuesL = ['Due', 'Overdue'];
          const entries = [];
          let cnt = 1;
          for (const year of years) {
            const resp = await c4re.get(`/dev/liability-based-on-amount?fiscal_year=${year}&company_code=1000`);
            const spaceL = resp.body.LiabilityBasedOnAmount;
    
            entries.push({
              id: `${cnt++}`,
              chartDimension: `${valuesL[0]}`,
              chartMeasure: spaceL.due_amount !== 0 ? Number(spaceL.due_amount).toFixed(2) : '0.00',
              years: `${year}`,
            });
    
            entries.push({
              id: `${cnt++}`,
              chartDimension: `${valuesL[1]}`,
              chartMeasure: spaceL.over_due_amount ? Number(spaceL.over_due_amount).toFixed(2) : '0.00',
              years: `${year}`,
            });
          }
    
          cds.tx(req).run(DELETE(LiabilityBasedOnAmount_1));
          await cds.tx(req).run(INSERT.into(LiabilityBasedOnAmount_1).entries(entries));
          firstReadLiabilityBasedOnAmount = false;
        }
      } catch (err) {
        req.error(500, err.message);
      }
    });
    
    // Handler for TotalAccountsPayable_1
    this.before('READ', TotalAccountsPayable_1, async (req) => {
      try {
        if (firstReadTotalAccountsPayable) {
          const yearsData = await c4re.get('/dev/dropdown?drop_key=fiscal_year');
          const years = yearsData.body.map(space => space.table_key);
          const valuesT = ['Processed', 'Current Payable', 'Overdue'];
          const entries = [];
          let cntr = 1;
          for (const year of years) {
            const resp = await c4re.get(`/dev/liability-based-on-amount?fiscal_year=${year}&company_code=1000`);
            const spaceT = resp.body.TotalAccountsPayable;
    
            entries.push({
              id: `${cntr++}`,
              chartDimension: `${valuesT[0]}`,
              chartMeasure: spaceT.processed_amount ? Number(spaceT.processed_amount).toFixed(2) : '0.00',
              years: `${year}`,
            });
    
            entries.push({
              id: `${cntr++}`,
              chartDimension: `${valuesT[1]}`,
              chartMeasure: spaceT.due_amount ? Number(spaceT.due_amount).toFixed(2) : '0.00',
              years: `${year}`,
            });
    
            entries.push({
              id: `${cntr++}`,
              chartDimension: `${valuesT[2]}`,
              chartMeasure: spaceT.over_due_amount ? Number(spaceT.over_due_amount).toFixed(2) : '0.00',
              years: `${year}`,
            });
          }
    
          cds.tx(req).run(DELETE(TotalAccountsPayable_1));
          await cds.tx(req).run(INSERT.into(TotalAccountsPayable_1).entries(entries));
          firstReadTotalAccountsPayable = false;
        }
      } catch (err) {
        req.error(500, err.message);
      }
    });
    
    // Handler for VendorLiabilityReportforCompanyCode_1
    this.before('READ', VendorLiabilityReportforCompanyCode_1, async (req) => {
      try {
        if (firstReadVendorLiabilityReport) {
          const yearsData = await c4re.get('/dev/dropdown?drop_key=fiscal_year');
          const years = yearsData.body.map(space => space.table_key);
          const entries = [];
          let count = 1;
          for (const year of years) {
            const resp = await c4re.get(`/dev/liability-based-on-amount?fiscal_year=${year}&company_code=1000`);
            if (resp.body.VendorLiabilityReportforCompanyCode.length === 0) {
              entries.push({
                id: `${count++}`,
                due_amount: '0.00',
                overdue_amount: '0.00',
                processed_amount: '0.00',
                total_amount: '0.00',
                vendor_name: '',
                vendor_no: '',
                years: `${year}`,
              });
            } else {
              resp.body.VendorLiabilityReportforCompanyCode.map(space => {
                entries.push({
                  id: `${count++}`,
                  due_amount: space.due_amount ? Number(space.due_amount).toFixed(2) : '0.00',
                  overdue_amount: space.over_due_amount ? Number(space.over_due_amount).toFixed(2) : '0.00',
                  processed_amount: space.processed_amount ? Number(space.processed_amount).toFixed(2) : '0.00',
                  total_amount: space.total_amount ? Number(space.total_amount).toFixed(2) : '0.00',
                  vendor_name: `${space.vendor_name}`,
                  vendor_no: `${space.vendor_no}`,
                  years: `${year}`,
                });
              });
            }
          }
    
          cds.tx(req).run(DELETE(VendorLiabilityReportforCompanyCode_1));
          await cds.tx(req).run(INSERT.into(VendorLiabilityReportforCompanyCode_1).entries(entries));
          firstReadVendorLiabilityReport = false;
        }
      } catch (err) {
        req.error(500, err.message);
      }
    });
    



}
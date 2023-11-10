const cds = require('@sap/cds');
const invoiceHandler = require('./handler/invoiceHandler');
const liabilityHandler = require('./handler/liabilityHandler');
const agingHandler = require('./handler/agingHandler');
const keyProcessAnalyticsHandler = require('./handler/keyProcessAnalyticsHandler');
const productivityHandler = require('./handler/productivityHandler');

module.exports = cds.service.impl(async function () {

    // Combine service handlers
    await invoiceHandler.call(this);
    await liabilityHandler.call(this);
    await agingHandler.call(this);
    await keyProcessAnalyticsHandler.call(this);
    await productivityHandler.call(this);
});

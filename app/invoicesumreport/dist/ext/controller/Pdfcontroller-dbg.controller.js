sap.ui.define(['sap/ui/core/mvc/ControllerExtension', 'sap/ui/model/json/JSONModel'], function (ControllerExtension, JSONModel) {
	'use strict';

	return ControllerExtension.extend('re.invoicesumreport.ext.controller.Pdfcontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf re.invoicesumreport.ext.controller.Pdfcontroller
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onAfterBinding: async function (oBindingContext) {
					debugger
					var oView = this.getView();
					const
						oExtensionAPI = this.base.getExtensionAPI(),
						oModel = oExtensionAPI.getModel(),
						sFunctionName = "getPdfUrl",
						oFunction = oModel.bindContext(`/${sFunctionName}(...)`);

					const oCustomer = await oBindingContext.requestObject(oBindingContext.getPath());
					oFunction.setParameter("invoice_no", oCustomer.invoice_no);

					await oFunction.execute();
					var oContext = oFunction.getBoundContext();

					var res = oContext.getObject();
					debugger
					// await oFunction.execute();
					debugger
					// oContext = oFunction.getBoundContext();

					// res = oContext.getObject();

					res = res.value.file_link;
					console.log(res); debugger
					var oModel1 = new JSONModel({
						pdfUrl: res
					});

					// Set the model to the view
					oView.setModel(oModel1, "pdfModel");


				}
			}
		}
	});
});

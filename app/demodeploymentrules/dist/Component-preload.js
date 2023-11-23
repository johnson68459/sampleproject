//@ui5-bundle re/demodeploymentrules/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"re/demodeploymentrules/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("re.demodeploymentrules.Component",{metadata:{manifest:"json"}})});
},
	"re/demodeploymentrules/i18n/i18n.properties":'# This is the resource bundle for re.demodeploymentrules\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=A Fiori application.',
	"re/demodeploymentrules/manifest.json":'{"_version":"1.58.0","sap.app":{"id":"re.demodeploymentrules","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.11.4","toolsId":"cb1ab830-cb38-4dfe-9994-2855f1418ad1"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.120.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"re.demodeploymentrules.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"condition_helpList","target":"condition_helpList"},{"pattern":"condition_help({key}):?query:","name":"condition_helpObjectPage","target":"condition_helpObjectPage"}],"targets":{"condition_helpList":{"type":"Component","id":"condition_helpList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/condition_help","variantManagement":"Page","navigation":{"condition_help":{"detail":{"route":"condition_helpObjectPage"}}}}}},"condition_helpObjectPage":{"type":"Component","id":"condition_helpObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/condition_help"}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"mgdappreport"}}'
}});
sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.ndbs.ui.librarymanegementui.controller.BookSearch", {
            onInit: function () {
                this.getRouter().getRoute("RouteBookSearch").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function() {
                let visibilitySettings = this.getModel("visibilityModel").getProperty('/Viewer/BookSearch');
                this.getModel("visibilityModel").setProperty('/Visibility', visibilitySettings);
            },
            onNavToView: function (oEvent) {
                this.getRouter().navTo(oEvent);
            },
        });
    });

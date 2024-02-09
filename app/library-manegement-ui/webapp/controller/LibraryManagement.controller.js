sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Fragment, MessageBox) {
        "use strict";

        return BaseController.extend("com.ndbs.ui.librarymanegementui.controller.LibraryManagement", {
            onInit: function () {
                this.getRouter().getRoute("RouteLibraryManagement").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function () {
                let visibilitySettings = this.getModel("visibilityModel").getProperty('/Viewer/LibraryManagement');
                this.getModel("visibilityModel").setProperty('/Visibility', visibilitySettings);
            },
            onNavToView: function (oEvent) {
                this.getRouter().navTo(oEvent);
            },
            onCreateBook: function () {
                let oView = this.getView(),
                    oEntry;

                if (!this._oNewBookDialog) {
                    this._oNewBookDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.ndbs.ui.librarymanegementui.fragments.library-management.BookAddPage",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._oNewBookDialog.then(function (oValueHelpDialog) {
                    oValueHelpDialog.open();
                    oEntry = this.getView().getModel().createEntry("/Books");
                    this.byId("sfNewBook").bindElement(oEntry.getPath());
                }.bind(this));
            },
            onCreateNewBook: function () {
                let oDataModel = this.getView().getModel();

                oDataModel.submitChanges({
                    success: function (oResponse) {
                        this.getView().byId("stBooks").rebindTable();
                    }.bind(this)
                });

                this._oNewBookDialog.then(function (oDialog) {
                    oDialog.close();
                })
            },
            onScanSuccess: function (oEvent) {
                if (oEvent.getParameter("cancelled")) {
                    MessageToast.show("Scan cancelled", { duration: 1000 });
                }
                else {
                    if (oEvent.getParameter("text")) {
                        this.getView().byId("smfBarcodeNumber").setValue(oEvent.getParameter("text"));
                    }
                    else {
                        oScanResultText.setText('');
                    }
                }
            },
            onCloseDialog: function (oEvent) {
                let sPath;

                switch (oEvent) {
                    case "_oNewBookDialog":
                        sPath = this.byId("sfNewBook").getBindingContext().getPath();
                        this.getView().getModel().resetChanges([sPath]);
                        break;
                }

                this[oEvent].then(function (oDialog) {
                    oDialog.close();
                });
            },
            preventCloseByEscapeAdd: function () {
                let sPath = this.byId("sfNewBook").getBindingContext().getPath();
                this.getView().getModel().resetChanges([sPath]);
                this._oNewBookDialog.then(function (oDialog) {
                    oDialog.close();
                });
            },
            changeEditted: function () {
                let oDataModel = this.getView().getModel();

                if (oDataModel.hasPendingChanges()) {
                    oDataModel.submitChanges();
                }
            },
            onDeleteBook: function () {
                let oUITable = this.getView().byId("uiTblBooks"),
                    iSelectedIndex = oUITable.getSelectedIndex(),
                    oModel = this.getView().getModel(),
                    oBindingContext;

                if (iSelectedIndex < 0) {
                    MessageBox.error(this.getResourceBundle().getText("errorDeletion"));
                    return;
                }

                oBindingContext = oUITable.getContextByIndex(iSelectedIndex);

                MessageBox.confirm(this.getResourceBundle().getText("confirmDeletion"), {
                    title: this.getResourceBundle().getText("confirm"),
                    onClose: function (oEvent) {
                        if (oEvent == "OK") {
                            oModel.remove(oBindingContext.getPath());
                        }
                    },
                    styleClass: "",
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                });
            },
            onDeleteAuthor: function () {

            },
            onCreateAuthor: function () {
                let oView = this.getView(),
                    oEntry;

                if (!this._oNewAuthorDialog) {
                    this._oNewAuthorDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.ndbs.ui.librarymanegementui.fragments.library-management.AuthorAddPage",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._oNewAuthorDialog.then(function (oValueHelpDialog) {
                    oValueHelpDialog.open();
                    oEntry = this.getView().getModel().createEntry("/Authors");
                    this.byId("sfNewAuthor").bindElement(oEntry.getPath());
                }.bind(this));
            }
        });
    });

sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Fragment, MessageBox, Filter, FilterOperator) {
        "use strict";

        return BaseController.extend("com.ndbs.ui.librarymanegementui.controller.LibraryManagement", {
            onInit: function () {
                this.getRouter().getRoute("RouteLibraryManagement").attachPatternMatched(this._onObjectMatched, this);
                this.byId("uiTblAuthors").attachBrowserEvent("dblclick", this._onDblClick.bind(this));
            },
            _onDblClick: function () {
                let oContentTable = this.getView().byId("uiTblAuthors"),
                    oSelectedItem = oContentTable.getSelectedItem(),
                    oSelectedObject,
                    oSelectedItemID,
                    oView = this.getView();

                if (!oSelectedItem) {
                    MessageBox.error("Please, select a row to edit content!");
                    return;
                }

                oSelectedObject = oSelectedItem.getBindingContext().getObject();
                oSelectedItemID = oSelectedObject.ID;

                if (!this._oDetailAuthorDialog) {
                    this._oDetailAuthorDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.ndbs.ui.librarymanegementui.fragments.library-management.AuthorDetailPage",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._oDetailAuthorDialog.then(function (oValueHelpDialog) {
                    oValueHelpDialog.open();
                    this.byId("sfDetailAuthor").bindElement(`/VAuthors(${oSelectedItemID})`);
                    this.byId("usDetailContentFile").getBinding("items").filter(new Filter("ID", FilterOperator.EQ, oSelectedItemID));
                }.bind(this));
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
                    case "_oNewAuthorDialog":
                        sPath = this.byId("sfNewAuthor").getBindingContext().getPath();
                        this.getView().getModel().resetChanges([sPath]);
                        break;
                    case "_oEditAuthorDialog":
                        sPath = this.byId("sfEditAuthor").getBindingContext().getPath();
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
                    oEntry = this.getView().getModel().createEntry("/Authors", {
                        properties: {
                            isAlive: true
                        }
                    });
                    this.byId("sfNewAuthor").bindElement(oEntry.getPath());
                }.bind(this));
            },
            onCreateNewAuthor: function () {
                let oModel = this.getView().getModel(),
                    sPath = this.getView().byId("sfNewAuthor").getBindingContext().getPath(),
                    oContentData,
                    aIncompleteItems = this.byId("usContentFile").getIncompleteItems();

                if (aIncompleteItems.length) {
                    let fileName = aIncompleteItems[0].getFileName();
                    oModel.setProperty(sPath + "/fileName", fileName);
                }
                else {
                    MessageBox.error("Upload content must be added!");
                    return;
                }

                oModel.setUseBatch(true);
                oModel.submitChanges({
                    success: function (oResponse) {
                        let sStatusCode = oResponse.__batchResponses[0].response?.statusCode;

                        if (sStatusCode === "400" || sStatusCode === "500" || sStatusCode === "403") {
                            this._oNewAuthorDialog.then(function (oDialog) {
                                oDialog.close();
                            });
                        }
                        else {
                            oContentData = oResponse.__batchResponses[0].__changeResponses[0].data;

                            this._updateContent(aIncompleteItems, oContentData.ID, "usContentFile");
                        }
                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
                this._oNewAuthorDialog.then(function (oDialog) {
                    oDialog.close();
                });
            },
            _updateContent: function (aContentItems, iContentID, uploadSetName) {
                aContentItems.forEach((item) => {
                    let url = `/odata/v2/library-management/Authors(${iContentID})/image`
                    item.addHeaderField(new sap.ui.core.Item({
                        key: "x-csrf-token",
                        text: this.getView().getModel().getSecurityToken()
                    }));
                    item.setUploadUrl(url);
                    var oUploadSet = this.byId(uploadSetName);
                    oUploadSet.uploadItem(item);
                });
            },
            onDeleteAuthor: function () {
                let oDataModel = this.getView().getModel(),
                    oContentTable = this.getView().byId("uiTblAuthors"),
                    oSelectedContentItem = oContentTable.getSelectedItem(),
                    oSelectedContentItemPath;

                if (!oSelectedContentItem) {
                    MessageBox.error("Please, select a row to delete!");
                    return;
                }

                oSelectedContentItemPath = oSelectedContentItem.getBindingContext().getPath();

                MessageBox.confirm("Selected entity will be deleted. Do you confirm?", {
                    title: "Confirmation ?",
                    onClose: function (oEvent) {
                        if (oEvent == "OK") {
                            oDataModel.remove(oSelectedContentItemPath);
                            this.getView().byId("stBooks").rebindTable();
                        }
                    }.bind(this),
                    styleClass: "",
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: sap.m.MessageBox.Action.OK,
                    initialFocus: null,
                    textDirection: sap.ui.core.TextDirection.Inherit
                });
            },
            onEditAuthor: function () {
                let oContentTable = this.getView().byId("uiTblAuthors"),
                    oSelectedItem = oContentTable.getSelectedItem(),
                    oSelectedObject,
                    oSelectedItemID,
                    oView = this.getView();

                if (!oSelectedItem) {
                    MessageBox.error("Please, select a row to edit content!");
                    return;
                }

                oSelectedObject = oSelectedItem.getBindingContext().getObject();
                oSelectedItemID = oSelectedObject.ID;

                if (!this._oEditAuthorDialog) {
                    this._oEditAuthorDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.ndbs.ui.librarymanegementui.fragments.library-management.AuthorEditPage",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._oEditAuthorDialog.then(function (oValueHelpDialog) {
                    oValueHelpDialog.open();
                    this.byId("sfEditAuthor").bindElement(`/Authors(${oSelectedItemID})`);
                    this.byId("usEditContentFile").getBinding("items").filter(new Filter("ID", FilterOperator.EQ, oSelectedItemID));
                }.bind(this));
            },
            onSaveEditAuthor: function () {
                let oModel = this.getView().getModel(),
                    isPendingChanges = false,
                    sPath = this.getView().byId("sfEditAuthor").getBindingContext().getPath(),
                    oContentDataID = this.getView().byId("uiTblAuthors").getSelectedItem().getBindingContext().getObject().ID,
                    aIncompleteItems = this.byId("usEditContentFile").getIncompleteItems(),
                    aContentItems = this.byId("usEditContentFile").getItems();

                if (this.isRenameEnabled) {
                    MessageBox.error("Please complete the rename process!");
                    return;
                }

                if (!aContentItems.length && !aIncompleteItems.length) {
                    MessageBox.error("Please add new file, can't save without any file!");
                    return;
                }
                if (aIncompleteItems.length) {
                    let fileName = aIncompleteItems[0]?.getFileName();
                    oModel.setProperty(sPath + "/fileName", fileName);
                }

                oModel.setUseBatch(true);

                if (oModel.hasPendingChanges()) {
                    isPendingChanges = true;
                    oModel.submitChanges({
                        success: function (oResponse) {
                            this.getView().byId("stAuthors").rebindTable();
                            let sStatusCode = oResponse.__batchResponses[0].response?.statusCode;

                            if (sStatusCode === "400" || sStatusCode === "500" || sStatusCode === "403") {
                                let sBindingPath = this.byId("stAuthors").getBindingContext().getPath();
                                oModel.resetChanges([sBindingPath]);
                            }

                            if (aIncompleteItems.length) {
                                this._updateContent(aIncompleteItems, oContentDataID, "usEditContentFile");
                            }

                        }.bind(this),
                        error: function (oError) {
                            sap.ui.core.BusyIndicator.hide();
                        }
                    });
                }
            },
            onFileUploadCompleted: function () {
                this.getView().byId("stAuthors").rebindTable();
            }
        });
    });

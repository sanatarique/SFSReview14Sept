({
  fetchCustDetails : function(component, event, helper) {
    helper.fetchDetailsHelper(component, event, helper);
  },

  doConCallout : function(component, event, helper) {
    console.log('insde click Controler');
    helper.doApexCallout(component, event, helper);
  },

  getSelectedRow : function (component, event, helper) {
    helper.getSelectedRowHelper(component, event, helper);
  },

  removeRows : function (component, event, helper) {
    helper.removeSelectedRows(component, event, helper);
  },

  addRowsDetails : function (component, event, helper) {
    helper.addRow(component, event, helper);
  },

  onSave : function(component, event, helper){
    helper.getSelectedRowHelper(component, event, helper);
  },

})
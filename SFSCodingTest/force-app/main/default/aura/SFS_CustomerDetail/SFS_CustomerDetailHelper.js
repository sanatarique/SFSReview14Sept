({
  fetchDetailsHelper : function(component, event, helper) {
    var columns = [
      {label: 'Creditor', fieldName: 'creditorName', type: 'text',editable:'true'},
      {label: 'First Name', fieldName: 'firstName', type: 'text'},
      {label: 'Last Name', fieldName: 'lastName', type: 'text'},
      {label: 'Min Pay%', fieldName: 'minPaymentPercentage', type: 'percent'},
      {label: 'Balance', fieldName: 'balance', type: 'currency',editable:'true'}
    ]
    component.set("v.columns",columns);
    console.log('insisde helper'+ component.get("v.columns"));
  },

  doApexCallout : function(component, event, helper) {
    var action = component.get("c.doCallout");
    action.setCallback(this, function(response){
      var state = response.getState();
      if (state === 'SUCCESS') {
        component.set("v.customerDetails",response.getReturnValue());
      } else if (state === 'ERROR') {
        var errors = response.getError();
        if (errors) {
            if (errors[0] && errors[0].message) {
                console.log("Error message: " +
                            errors[0].message);
            }
        } else {
           console.log("Unknown error");
          }
        } else {
          console.log('Something went wrong, Please check with your admin');
          }
    });
    $A.enqueueAction(action);
  },

  removeSelectedRows : function(component, event, helper) {
    var existingRecords = component.get("v.customerDetails");
    var delRecords = component.get("v.toDeleteRows");
    for(var item in delRecords){
      var rowIndex = existingRecords.indexOf(item);
      existingRecords.splice(rowIndex, 1);
    }
    component.set("v.customerDetails", existingRecords);
    console.log('$$$existingRecords'+existingRecords);
  },

  addRow : function(component, event, helper) {
    var existingRecords = component.get("v.customerDetails");
    existingRecords.push({'creditorName' : '',
                          'firstName' : '',
                          'lastName' : '',
                          'minPaymentPercentage' : '',
                          'balance' : '' });
    component.set("v.customerDetails", existingRecords);
  },

  getSelectedRowHelper : function (component, event, helper){
  var selectedRows = event.getParam('selectedRows');
  console.log('^^^^' + selectedRows);
    var totalAmt = 0;
    var count = 0;
    var toDelete = [];
    for (var i = 0; i < selectedRows.length; i++){
      totalAmt += selectedRows[i].balance;
      count = i+1;
      toDelete.push(selectedRows[i]);
    }
    component.set("v.TotalAmount",totalAmt);
    component.set("v.Count",count);
    component.set("v.toDeleteRows",toDelete);
  }
})
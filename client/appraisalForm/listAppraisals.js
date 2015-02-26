Template.listAppraisals.events ({
  'click .showAppraisal': function(event) {
    event.preventDefault();

    if (this.status == "created") {
      Router.go('editAppraisalForm', {_id: this._id})
    } else {
      Router.go('showAppraisalForm', {_id: this._id})
    }
  }
})

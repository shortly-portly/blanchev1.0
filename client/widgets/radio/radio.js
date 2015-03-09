Template.radio.helpers({
  isActive: function(value) {

    var answer = Reviews.findOne({_id: Session.get('reviewId')});

    var name = Template.parentData(1).name;
    console.log("radio name is....");
    console.log(name);

    console.log("value is...");
    console.log(value);

    console.log("anwer..");
    console.log(answer.data[name]);

    if (value == answer.data[Template.parentData(1).questionNo]) {
      return true;
    } else {
      return false;
    }
  },

  disabled: function() {

    if (Session.get('mode') === "view") {
      return "disabled";
    } else {
      return;
    }
  },
  radioName: function() {
    console.log(Template.parentData(1).questionNo);
    return Template.parentData(1).name;
  }
});

Template.newSlide.helpers({
  attributes: function(name) {

    return {
      class: "form-control",
      name: "Q" + this.questionNo + "-" + name,
      placeholder: name,

    }

  }

});

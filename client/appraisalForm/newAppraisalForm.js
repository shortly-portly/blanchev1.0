
var createAppraisalForm = function(evt, template, status) {
  var id;
  var errors = [];
  event.preventDefault();

  questions = Meteor.appraisalHelpers.collectQuestions(template);
  errors = Meteor.appraisalHelpers.validateQuestions(questions);


  title = template.find("input[name=title]").value;

  if (!title) {
    errors.push("Please Enter a Title");

  }

  if (errors.length > 0) {
    FlashMessages.sendError(errors);
    return
  };

  id = Appraisals.insert({
    title: title,
    nextQuestionNo: 1,
    status: status
  });

  /* For now assume that we created the Appraisal form ok */
  /* TODO: need to check form was created succesfully */

  Meteor.appraisalHelpers.createQuestions(id, questions);

  Session.set('questions', []);

  Router.go('editAppraisalForm', {
    _id: id
  });

  return id;

}



Template.newAppraisalForm.events({
  'click .saveAppraisalForm': function(evt, template) {

    createAppraisalForm(evt, template, "created");

  },
  'click .publishAppraisalForm': function(evt, template) {

    var id;
    id = createAppraisalForm(evt, template, 'published');

    var data = [];

    Questions.find({
      appraisal: id
    }).forEach(function(question) {
      data[question.questionNo] = question.default;
    });

    Meteor.users.find().forEach(function(user) {

      Reviews.insert({
        user: user._id,
        appraisal: id,
        data: data,
        status: "open"
      });

    })
  },

  'click .newTextArea': function(evt, template) {
    Meteor.appraisalHelpers.newQuestion('textArea');
  },

  'click .newWords': function(evt, template) {
    Meteor.appraisalHelpers.newQuestion('words');
  },
  'click .newRadar': function(evt, template) {
    Meteor.appraisalHelpers.newQuestion('radar');
  },

  'click .delete': function() {
    tempQuestions.remove({
      _id: this._id
    });
    Meteor.appraisalHelpers.reorderQuestions();
  }


});

Template.newAppraisalForm.helpers({
  tQuestions: function() {
    return tempQuestions.find();
  },
  typed: function() {
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)
    console.log(templateName);

    return templateName;
  }

});


Template.newAppraisalForm.created = function() {
  console.log("settng question no bac to 1");
  tempQuestions.remove({});
  Session.set("questionNo", 1);
};

var updateQuestion = function(question, newType) {


  var textSelector = "editor" + question.questionNo;
  var questionText = CKEDITOR.instances[textSelector].getData()

  tempQuestions.update(question._id, {$set: {type:newType, text: questionText}})
}

Template.questionMenu.events({
  'click .standard': function () {
    updateQuestion(this, "textArea");
  },
  'click .words': function () {
    updateQuestion(this, "words");
  },
  'click .radar': function() {
    updateQuestion(this, 'radar');
  },
  'click .radio': function() {
    updateQuestion(this, 'radio');
  },
  'click .slide': function() {
    updateQuestion(this, 'slide')
  }
})

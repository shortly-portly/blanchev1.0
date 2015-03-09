

var collectQuestionFns = {
  textArea: function(questionNo, template) {
    var data = {};
    var textSelector = "editor" + questionNo;

    data = {
      questionNo: questionNo,
      questionText: CKEDITOR.instances[textSelector].getData()
    }

    return data;

  },
  words: function(questionNo, template) {
    var data = {};
    var textSelector = "editor" + questionNo;

    console.log("question text");
    console.log(CKEDITOR.instances[textSelector].getData());

    data = {
      questionNo: questionNo,
      questionText: CKEDITOR.instances[textSelector].getData()
    }

    return data;

  },
  radar: function(questionNo, template) {
    var data = {};
    var textSelector = "editor" + questionNo;

    var options = [];
    var def = {};
    var label;

    for (i=0; i<6; i++) {
      find = "input[name=Q" + questionNo + "r" + i + "]";
      console.log(find);
      label = template.find(find).value;
      console.log("label ====");
      console.log(label);
      if (label !== "") {
        options[i] = label;
        def[label] = 0;
      }
    }

    data = {
      questionNo: questionNo,
      questionText: CKEDITOR.instances[textSelector].getData(),
      options: options,
      def: def
    }

    console.log("size...");
    console.log(data.options.length);
    return data;

  },

  slide: function(questionNo, template) {
    var data = {};
    var textSelector = "editor" + questionNo;

    var options = [];

    data = {
      questionNo: questionNo,
      questionText: CKEDITOR.instances[textSelector].getData(),
      low: template.find("input[name=Q" + questionNo + "-low]").value,
      mid:template.find("input[name=Q" + questionNo + "-mid]").value,
      high:template.find("input[name=Q" + questionNo + "-high]").value,
    }

    return data;
  },

  radio: function(questionNo, template) {
    var data = {};
    var textSelector = "editor" + questionNo;

    var options = [];


    for (i=0; i<6; i++) {
      find = "input[name=Q" + questionNo + "r" + i + "]";
      label = template.find(find).value;


      if (label !== "") {
        options[i] = {
          optionName: label,
          text: label
        }
      }
    }

    data = {
      questionNo: questionNo,
      questionText: CKEDITOR.instances[textSelector].getData(),
      options: options
    }

    console.log("size...");
    console.log(data.options.length);
    return data;

  }

}

var validateQuestionFns = {
  textArea: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },
  words: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },

  radio: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },

  slide: function(question) {
    errors = [];
    console.log(question);

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    if (!question.data.low) {
      errors.push(question.questionNo + ": Please enter a low value");
    }

    if (!question.data.high) {
      errors.push(question.questionNo + ": Please enter a high value");
    }

    return errors;
  },

  radar: function(question) {
    errors = [];

    if (St(question.data.questionText).isEmpty()) {
      errors.push(question.questionNo + ": Please enter a question");
    }

    if (question.data.options.length < 3) {
      errors.push(question.questionNo + ": Please enter at least 3 labels");
    }

    var uniqueOptions = _.uniq(question.data.options);
    if (uniqueOptions.length != question.data.options.length) {
      errors.push(question.questionNo + ": Labels must be unique");
    }

    _.each(question.data.options, function(option) {
      var compactOption = St(option).strip(' ');


      if (!St(compactOption).isAlphaNumeric()) {
        errors.push(question.questionNo + " : label must only be letters or numbers");
      }
    })


    return errors;
  }
}

var createQuestionFns = {
  textArea: function(id, question) {
    console.log("create questions...text area..");
    console.log(question)
    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      text: question.data.questionText,
      type: "textArea",
      default: ""
    })

  },
  words: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: question.data.name,
      text: question.data.questionText,
      type: "words",
      max: 5,
      default: ["", "", "", "", ""]
    })

  },

  radar: function(id, question) {

    console.log("about to create a radar question...");
    console.log(question);

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: question.data.name,
      text: question.data.questionText,
      type: "radar",
      options: question.data.options,
      default: question.data.def
    })
  },

  radio: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: "Q" + question.data.questionNo,
      text: question.data.questionText,
      type: "radio",
      options: question.data.options,
      default: question.data.options[0].optionName
    })
  },
  slide: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      text: question.data.questionText,
      type: "slide",
      low: question.data.low,
      mid: question.data.mid,
      high: question.data.high,
      default: 50
    })
  }



}

var updateQuestionFns = {
  textArea: function(id, question) {
    console.log("create questions...text area..");
    console.log(question)
    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      text: question.data.questionText,
      type: "textArea",
      default: ""
    })

  },
  words: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: question.data.name,
      text: question.data.questionText,
      type: "words",
      max: 5,
      default: ["", "", "", "", ""]
    })

  },
  radar: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: question.data.name,
      text: question.data.questionText,
      type: "radar",
      options: question.data.options,
      default: question.data.def
    })
  },
  radio: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: "Q" + question.data.questionNo,
      text: question.data.questionText,
      type: "radio",
      options: question.data.options,
      default: question.data.options[0].optionName
    })
  },

  slide: function(id, question) {

    Questions.insert({
      appraisal: id,
      questionNo: question.data.questionNo,
      name: "Q" + question.data.questionNo,
      text: question.data.questionText,
      type: "slide",
      low: question.data.low,
      mid: question.data.mid,
      high: question.data.high,
      default: 50
    })
  }
}


Meteor.appraisalHelpers = {
  reorderQuestions: function() {
    questionNo = 1;
    tempQuestions.find().forEach(function(question) {
      tempQuestions.update(question._id, {
        $set: {
          "questionNo": questionNo
        }
      });
      questionNo = questionNo + 1;
    })

    Session.set("questionNo", questionNo);
  },

  newQuestion: function(type) {
    questionNo = Session.get('questionNo');
    console.log("about to create a question");
    console.log(type);

    data = {
      type: type,
      questionNo: questionNo
    };

    questionNo = questionNo + 1;

    tempQuestions.insert(data);
    Session.set('questionNo', questionNo);

  },

  collectQuestions: function(template) {

    var questions = [];
    questions = tempQuestions.find().fetch();

    _.each(questions, function(question) {

      question.data = collectQuestionFns[question.type](question.questionNo, template);
    });

    return questions;
  },

  validateQuestions: function(questions) {
    var errors = [];
    var allErrors = [];

    _.each(questions, function(question) {

      errors = validateQuestionFns[question.type](question);
      if (errors.length > 0) {
        allErrors = allErrors.concat(errors);
      }
    });

    return allErrors;

  },

  createQuestions: function(id, questions) {
    _.each(questions, function(question) {

      createQuestionFns[question.type](id, question);

    });

  },

  updateQuestions: function(id, questions) {
    /* delete the questions on the server as some of them may have
       been deleted at the client */

       Meteor.call('deleteQuestions', id);


       _.each(questions, function(question) {

         createQuestionFns[question.type](id, question);

       })


  }

}

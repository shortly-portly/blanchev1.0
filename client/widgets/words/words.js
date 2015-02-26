Template.words.helpers({
  attributes: function(index) {

    var answer, words, value, mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };

    answer = Reviews.findOne({
      _id: Session.get('reviewId')
    });


    words = answer.data[this.questionNo];

    if (words && words[index]) {
      value = words[index];
    }

    return {
      type: "text",
      readonly: mode,
      class: "form-control",
      name: "Q" + this.questionNo + "w" + index,
      placeholder: index + 1,
      value: value
    }


  }

});

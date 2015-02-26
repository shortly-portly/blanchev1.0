Template.textArea.helpers({
  value: function(questionNo) {
    var answer = Reviews.findOne({_id: Session.get('reviewId')});
    console.log("Review Id is...." + Session.get('reviewId'));
    return answer.data[questionNo];
  },
  mode: function() {
    if (Session.get('mode') == 'view') {
      return 'readonly';
    }
  }
});

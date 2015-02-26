Template.slide.rendered = function() {

  var name = this.data.name;
  var answer = Reviews.findOne({_id: Session.get('reviewId')});

  var selector = "." + name;

  $(selector).noUiSlider({
    start: [ answer.data[name] ],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
    }
  });

  if (Session.get('mode') == "view") {
    $(selector).attr('disabled', 'disabled');
  }

};

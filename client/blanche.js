if (Meteor.isClient) {
  Radar = {};
  // counter starts at 0
  Meteor.subscribe('allUsers');
  /* Meteor.subscribe('reviews'); */
  /* Meteor.subscribe("questions"); */
  Meteor.subscribe('allAppraisalForms');
  Meteor.subscribe('reviews');

  Session.set("Mongol", {
  'collections': ['appraisals', 'questions', 'reviews', 'tempQuestions'],
  'display': true,
  'opacity_normal': ".7",
  'opacity_expand': ".9",
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

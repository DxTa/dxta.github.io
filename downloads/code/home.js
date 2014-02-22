$('.main-quote').on('load', function(){
  console.log('a');
  $(this).css('height',window.innerHeight - $('header').innerHeight());
});

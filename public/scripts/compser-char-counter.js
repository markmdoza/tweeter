$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const maxChars = 140;
  // This code snippet calculates the length of the value of the current element using jQuery and stores it in the variable "currentChars".
    const currentChars = $(this).val().length;
    const remainingChars = maxChars - currentChars;
    $('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').addClass('invalid');
    } else {
      $('.counter').removeClass('invalid');
    }
  })
  console.log('Document is ready');
});
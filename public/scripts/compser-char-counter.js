$(document).ready(function () {
  $('.new-tweet textarea').on('input', function () {
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
  });

  // New event listener for tweet submission
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();

    // Trim the textarea content to remove leading and trailing whitespace.
    const trimmedContent = tweetTextarea.val().trim();

    // Reset the textarea value to empty
    $('.new-tweet textarea').val('');

    // Reset the character count to 140 after submission.
    $('.counter').text(140);
  })
  console.log('Document is ready');
});
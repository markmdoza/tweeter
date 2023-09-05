/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Add an event listener for submit and prevent its default behavior.
$(document).ready(function () {
  const $errorElement = $(`#error-message`);
  $errorElement.hide();

  // Inside your client.js file and within the document ready function, define a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page.
  function loadTweets() {
    $.get('/tweets', function (data) {
      renderTweets(data);
    }).fail(function (xhr, status, error) {
      console.error('Error fetching tweets:', error);
      $errorElement.text('Error fetching tweets. Please try again later.');
      $errorElement.slideDown();
    });
  }
  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault(); // This will prevent its default behavior.
    $errorElement.slideUp();

    const formData = $(this).serialize();
    const tweetContent = $(this).find('textarea[name="text"]').val().trim();

    // Implement validation before sending the form data
    if (!tweetContent) {
      $errorElement.text('This cannot be empty.'); // Alert user if they leave the tweet empty.
      $errorElement.slideDown();
      return;
    }

    if (tweetContent.length > 140) {
      $errorElement.text('Maximum characters exceeded.')
      $errorElement.slideDown();
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: function (response) {
        console.log('Tweet submitted:', response);
        $('form textarea').val(''); // This clears the textarea
        loadTweets();
      },
      error: function (xhr, status, error) {
        console.error('There was an error submitting your tweet:', error);
        $errorElement.text('There was an error submitting your tweet. Please try again later.');
        $errorElement.slideDown();
      }
    });
  });
});

const createTweetElement = function (tweet) {
  const $tweet = $(`
  <article>
    <header id="user-header">
      <div class="username-image">
        <img class="pfp" src="./images/profile-hex.png" alt="Users Profile Photo">
        <h2>${tweet.user.name}</h2>
      </div>
      <p class="user-info">${tweet.user.handle}</p>
    </header>
    <textarea readonly>${tweet.content.text}</textarea>
  <footer>
    <div class="actions">
      <span class="tweet-age">${timeago.format(tweet.created_at)}</span>
      <div class="actions-right">
        <button><i class="fa-solid fa-bookmark"></i></button>
        <button><i class="fa-solid fa-retweet"></i></button>
        <button><i class="fa-solid fa-heart"></i></button>
      </div>
    </div>
  </footer>
  </article>
  `);

  return $tweet;
};

const renderTweets = function (tweets) {
  const $tweetsContainer = $('#tweets-container');
  $tweetsContainer.empty(); // This clears the previous tweets before rendering.

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  }
};

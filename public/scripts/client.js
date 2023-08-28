/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Add an event listener for submit and prevent its default behavior.
$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault(); // This will prevent its default behavior.
    
    const formData = $(this).serialize();
    
    // Inside your client.js file and within the document ready function, define a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page.
    function loadTweets() {
      $.get('/tweets', function(data) {
        renderTweets(data);
      });
    }
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: function(response) {
        console.log('Tweet submitted:', response);
        
        $('form textarea').val(''); // This clears the textarea
        loadTweets();
      }
    })
  })
})

const createTweetElement = function(tweet) {
  const $tweet = $(`
  <article>
  <header id="user-header">
  <img class="pfp" src="./images/profile-hex.png" alt="Users Profile Photo">
  <h2 class="user-name">Newton</h2>
  <div class="user-info">
  <div class="user-handle">
  <p>${tweet.user.handle}</p>
  </div>
  </div>
  </header>
  <div class="tweet-content">
  <textarea readonly>${tweet.content.text}</textarea>
  </div>
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

const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');
  $tweetsContainer.empty(); // This clears the previous tweets before rendering.
  
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
  }
};

loadTweets();

export const getDataProps = (utils, props) => {
  // Use JSON for Twitter; you won't be able to view the Tweet in the local
  // development environment without a CORS browser plugin, like Moesif CORS.
  const twitterPromise = utils.client
    .request(`https://publish.twitter.com/oembed?url=${props.embedTweetURL}`)
    .then((res) => res.json())
    .catch((e) => console.log(`Error when fetching Tweet: ${e}`))
  // CORS or Cross Origin Resource Sharing is a security measure that causes
  // you to take extra steps to show the content when working in your local
  // development environment. CORS means that your Tweet will not display in
  // the local development environment or in VOLT's Site Designer preview.
  // Nevertheless, your Tweet will display correctly in a VOLT Store.

  // You could use the utils.isRendering property and a trick known as JSONP
  // (JSON with padding) to bypass the CORS problem in order to make a preview
  // of your custom Tweet in VOLT's Site Designer. See this gist for JSONP:
  // https://gist.github.com/gf3/132080/d17a035fdae1bac6bac6753616dfd45d8a599d63#gistcomment-2090652

  // Alternatively you can use a proxy, like http://cors-anywhere.herokuapp.com
  // to bypass CORS. Either way, in production (a live or preview VOLT store)
  // you won't have a CORS error, because the data will be fetched by this code
  // on the server side (using request) and not on the client side. Only data
  // retrieved on the client side causes CORS errors, so the work around would
  // only be necessary to preview the Tweet locally or in VOLT's Site Designer.

  // Using the request helper function from the Element SDK (available as
  // utils.client.request) fixes "ReferenceError: fetch is not defined",
  // which would occur if you are trying to use fetch on the server side.
  // The Fetch API (window.fetch) is not defined on the server, since there
  // is no window object outside of the browser. Request acts like fetch.

  // Because the embed code for Tweets include <script> tags for their embed
  // scripts, which you will load separately, you need to remove them.
  const jsonEscape = (string) => string.replace(/<script.*<\/script>/, "")
  // Specifically, leaving the </script> tag will cause "SyntaxError:
  // unterminated string literal" error in some browsers, including Firefox.

  const errorMessage = "<p>Sorry, Tweet preview is not available.</p>"

  return twitterPromise.then((value) => (value ? value.html : errorMessage))
  // If the Promise didn't work for some reason, then you can't access the
  // property value.html, so you need to return a message to avoid a TypeError.

  // If you are returning multiple Promises, such as when retrieving several
  // social media posts, the function Promise.all can use an array of Promises:
  // return Promise.all([twitterPromiseOne, twitterPromiseTwo]).then(
  //   (values) => [
  //   values[0] ? jsonEscape(values[0].html) : null,
  //   values[1] ? jsonEscape(values[1].html) : null,
  // ])
}

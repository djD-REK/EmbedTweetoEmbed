import React, { useEffect } from "react"
import { css, StyleSheet } from "aphrodite/no-important"
import { getStyles } from "./getStyles"
import { defaultConfig } from "./configs"

const Block = (props) => {
  // Get the custom Aphrodite styles that will be used in this Block:
  const classes = StyleSheet.create(getStyles(props))
  // Load the Element SDK helper to join Atomic CSS classes with Aphrodite:
  const joinClasses = props.joinClasses
  // Destructure the oEmbed code snippets (HTML) from the data props:
  const embedTweetHTML = props.data
  // If you were embedding multiple social media posts, you could combine them:
  // const embedHTML = embedTweetOneHTML + embedTweetTwoHTML

  // Run the code once when the Block is rendered with React's Effect Hook:
  useEffect(() => {
    // Load Twitter's widgets.js, the external JavaScript file for Twitter:
    const twitterScript = document.createElement("script")
    twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js")
    twitterScript.setAttribute("async", true)
    const tweetElement = document.getElementsByClassName("twitter-tweet")[0]
    // Only add the Twitter file if there is a Tweet on the page to embed:
    tweetElement ? tweetElement.appendChild(twitterScript) : null
  }, [])
  // Using [] for useEffect's second argument will run the code only once.


  // To display HTML markup, React needs an object with the __html property:
  const outputAsMarkup = { __html: embedTweetHTML }

  // Create a <div> element with the banner text using the custom styles:
  const outputDiv = (
    <div
      // Use joinClasses to combine Atomic CSS classes with custom styles:
      className={joinClasses(
        "ma0 pa3 flex justify-around",
        css(classes.banner)
      )}
      // The Atomic CSS classes ma0 and pa3 set margins to 0 & padding to 1rem,
      // while flex & justify-around have CSS flexbox place space around items.

      // The dangerouslySetInnerHTML prop will render HTML except <script> tags
      dangerouslySetInnerHTML={outputAsMarkup}
    ></div>
  )

  // Google AMP pages won't load external JavaScript files, so this social
  // media embed Block won't be able to load on the AMP version. For the AMP
  // page, props.utils.isAmpRequest is true, so return null for an empty Block:
  return props.utils.isAmpRequest ? null : outputDiv
}

Block.defaultProps = defaultConfig

export default Block

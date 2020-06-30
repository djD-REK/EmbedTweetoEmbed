import { ElementPropTypes } from "@volusion/element-proptypes"

export const configSchema = {
  embedTweetURL: {
    label: "Twitter URL to embed",
    type: ElementPropTypes.string,
  },
}

export const defaultConfig = {
  embedTweetURL: "https://twitter.com/Twitter/status/1247570151064637442",
}

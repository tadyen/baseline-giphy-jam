// GIPHY
// should use .env and put into .gitignore but I'm exposing this just to keep the work transparent
// besides i dont really care if you see my giphy api key
type giphyConfigType = {
  baseUrl: string,
  apiKey: string,
  limit?: number,   // max terms returned
  offset?: number   // search offset
}

export const giphyConfig: giphyConfigType = {
  baseUrl: "https://api.giphy.com/v1/gifs/search/tags",
  apiKey: "5BJiEuM3R16y39z3KkAfm2EXrQNga7eE",
  limit: 25,
}

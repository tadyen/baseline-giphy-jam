// api controller for giphy search bar

import { giphyApiKey } from "../config/consts";
import axios, { AxiosError } from "axios";


// https://developers.giphy.com/docs/api/endpoint/#search
type giphyConfigType = {
  baseUrl: string,
  apiKey: string,
  limit?: number,   // max terms returned
  offset?: number   // search offset
  rating?: "g" | "pg" | "pg-13" | "r",
  bundle?: "clips_grip_picker" | "messaging_non_clips" | "sticker_layering" | "low_bandwidth",
}
const giphyConfig: giphyConfigType = {
  apiKey: giphyApiKey,
  baseUrl: "https://api.giphy.com/v1/gifs/search",
  limit: 5,
  rating: "g",
}

function toQueryURL(query: string | undefined): string | undefined{
  const {baseUrl, apiKey, limit, offset, rating} = giphyConfig
  const queryString = query ?
    `${baseUrl}?api_key=${apiKey}&q=${query}`
    + (limit ? `&limit=${limit}` : '')
    + (offset ? `&offset=${offset}` : '')
    + (rating ? `&rating=${rating}` : '')
  : undefined;
  return queryString
}
// https://developers.giphy.com/docs/api/schema/#gif-object
type giphyJsonData = {
  type: string,
  id: string,
  slug: string,
  url: string,
  bitly_url: string,
}
type giphyGetResponse = {
  data: giphyJsonData[],
  pagination: {
    total_count: number,
    count: number,
    offset: number,
  },
  meta: {
    msg: string,
    status: number,
    response_id: string,
  }
}

export const giphyController = {
  get: async (query: string | undefined)=>{
    const queryURL = toQueryURL(query);
    if (!queryURL) return undefined;
    console.log(queryURL);
    try {
      const response = await axios.get(queryURL);
      return response.data;
    } catch(error){
      console.error(error)
      return error
    }
  }
}

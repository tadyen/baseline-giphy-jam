// api controller for giphy search bar

import { giphyConfig } from "../config/consts";
import axios, { AxiosError } from "axios";

type giphyJsonData = {
  name: string,
  analytics_response_payload: string,
}

type giphyGetResponse = {
  data: giphyJsonData[],
  pagination: {
    count: number,
    offset: number,
  },
  meta: {
    msg: string | "OK",
    status: number,
    response_id: string,
  }
}

export const giphyController = {

  get: async (query: string)=>{
    const {baseUrl, apiKey, limit, offset} = giphyConfig
    const queryString =
      `${baseUrl}?api_key=${apiKey}&q=${query || ""}`
      + limit && `&limit=${limit}`
      + offset && `&offset=${offset}`
    ;
    try {
      const response = await axios.get(queryString);
      return response
    } catch(error){
      console.error(error)
      return error
    }
  }

}

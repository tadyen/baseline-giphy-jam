import * as React from "react";

type GifTilePropType = {
  slug: string,
  id: string
}
function GifTile({props}: {props: GifTilePropType}){
  const {id, slug} = props

  return(
    <div className="gifTile" id={id}>
      <iframe
        src={`https://giphy.com/embed/${id}`}
        width="384"
        height="480"
        className="giphy-embed"
        allowFullScreen
        >
      </iframe>
      <p>
        <a href={`https://giphy.com/gifs/${slug}`}>
          via GIPHY
        </a>
      </p>
    </div>
  )
}

export default function GifDeck({props}:{props: GifTilePropType[]}){
  const gifList = props;
  const gifTiles = gifList.map((tile)=>{
    return(
      <GifTile props={tile}/>
    )
  })
  return (
    <div className="gifDeck">
      {gifTiles}
    </div>
  )
}

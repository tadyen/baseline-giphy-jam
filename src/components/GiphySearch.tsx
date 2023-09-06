// https://mui.com/material-ui/react-app-bar/#system-PrimarySearchAppBar.tsx

import * as React from "react";
import { giphyController, giphyResponseDataType, giphyResponseType } from "../controllers/giphyController";

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';

const SearchResultContext = React.createContext<giphyResponseDataType[]>(null);

export default function GiphySearch(){
  const [response, setResponse] = React.useState<giphyResponseType | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);

  return(
    <div className="giphySearch">
      <SearchBar props={{setResponse, setLoading}}/>
      {
        loading
          ?
            <CircularProgress />
          :
            <SearchResultContext.Provider value={response?.data}>
              <GifDeck />
            </SearchResultContext.Provider>
      }
    </div>
  )
}

type SearchBarPropsType = {
  setResponse: React.Dispatch<React.SetStateAction<giphyResponseType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}
function SearchBar({props}: {props: SearchBarPropsType}){
  const {setResponse, setLoading} = props;
  const [query, setQuery] = React.useState<string>();
  const [inputPause, setInputPause] = React.useState<boolean>(false);

  React.useEffect(()=>{
    const delay = 1000; //delay in ms between search input ingestion
    setInputPause(true);
    setTimeout(() => {
      setInputPause(false);
    }, delay);
  },[query])

  React.useEffect(()=>{
    if( inputPause ) return;
    console.log(query)
    setLoading(true);
    const response = giphyController.get(query);
    response
      .then((result)=>{
        setResponse(result || undefined);
      })
      .catch((e)=>{
        console.error(e);
      })
      .finally(()=>{
        setLoading(false);
      })
    ;

  },[inputPause])

  return(
  <div className="giphySearchBar">
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search GIF…"
        inputProps={{
          'aria-label': 'search gif',
         }}
        fullWidth={true}
        onChange={(e)=>{setQuery(e.target.value)}}
      />
    </Search>
  </div>
  )
}

function GifDeck(){
  const searchResult = React.useContext(SearchResultContext);
  const gifTiles = searchResult?.map((tile)=>{
    const {id, slug} = tile;
    return(
      <GifTile props={{id, slug}} key={id}/>
    )
  })
  return (
    <div className="gifDeck">
      {gifTiles}
    </div>
  )
}

type GifTilePropsType = {
  id: string,
  slug: string,
}
function GifTile({props}: {props: GifTilePropsType, key: string}){
  const {id, slug} = props

  return(
    <div className="gifTile">
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: "solid 1px black",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

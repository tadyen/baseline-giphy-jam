// https://mui.com/material-ui/react-app-bar/#system-PrimarySearchAppBar.tsx

import * as React from "react";
import { giphyController } from "../controllers/giphyController";

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

export default function SearchBar(){
  const [query, setQuery] = React.useState<string>();
  const [inputPause, setInputPause] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState();

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
    const response = giphyController.get(query);
    response.then((result)=>{
      console.log(result)
    })

  },[inputPause])

  return(
  <>
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
  </>
  )
}

import { Button, Typography } from '@mui/material';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';

function LoadMore(props) {
  if (props.endOfPage) return <Typography>*** You have arrived the end of the list ***</Typography>
  return (<Button variant='contained' size="large" onClick={() => props.nextPage()} startIcon={<ArrowCircleDownTwoToneIcon />}> Load More </Button>);
}

export default LoadMore;

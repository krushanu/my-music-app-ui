import { Button } from '@mui/material';

function LoadMore(props) {
  return (
    <p>{props.endOfPage ? "*** You have arrived End of page ***" : <Button onClick={() => props.nextPage()}>Add</Button>}</p>
  );
}

export default LoadMore;




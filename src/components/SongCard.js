import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const SongCard = ({ songData }) => {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', m: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 320 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {songData.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Album : {songData.album_id}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Track : {songData.track}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://loremflickr.com/g/151/240/paris,girl/all"
        alt="album cover"
      />
    </Card>

  )
}

export default SongCard

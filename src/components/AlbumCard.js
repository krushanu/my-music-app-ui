import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

const AlbumCard = ({ albumData }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://loremflickr.com/g/350/240/paris,girl/all"
          alt="Album Img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${albumData.artist_id}. ${albumData.name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year of release: {albumData.year_released}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add
        </Button>
        <Button size="small" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>

  )
}

export default AlbumCard

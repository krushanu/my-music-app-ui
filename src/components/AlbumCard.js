import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import cartSlice from "../data/cartSlice"
import { useDispatch, useSelector } from "react-redux"

const AlbumCard = ({ albumData }) => {
  const { cartProductIds } = useSelector((state) => state.cart)
  const { addToCart, removeFromCart } = cartSlice.actions
  const dispatch = useDispatch()

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
        {!cartProductIds?.includes(albumData.name) && (<Button size="small" color="primary" onClick={() => dispatch(addToCart(albumData.name))} >
          Add
        </Button>)}
        {cartProductIds?.includes(albumData.name) && (<Button size="small" color="secondary" onClick={() => dispatch(removeFromCart(albumData.name))}>
          Remove
        </Button>)}
      </CardActions>
    </Card>
  )
}

export default AlbumCard

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import cartSlice from "../data/cartSlice"

const ArtistCard = ({ artistData }) => {
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
          alt="Artist Img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artistData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!cartProductIds?.includes(artistData.name) && (<Button size="small" color="primary" onClick={() => dispatch(addToCart(artistData.name))} >
          Add
        </Button>)}
        {cartProductIds?.includes(artistData.name) && (<Button size="small" color="secondary" onClick={() => dispatch(removeFromCart(artistData.name))}>
          Remove
        </Button>)}
      </CardActions>
    </Card>

  )
}

export default ArtistCard
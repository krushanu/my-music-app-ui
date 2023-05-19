import { Chip, Stack } from "@mui/material";
import cartSlice from "../data/cartSlice"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

const Collection = () => {

  const { cartProductIds } = useSelector((state) => state.cart)

  const { removeFromCart } = cartSlice.actions
  const dispatch = useDispatch()

  if (cartProductIds.length <= 0) return
  return (
      <Stack direction="row" spacing={1}>
        {cartProductIds.map((eachItem, index) => {
          return (
            <Chip
              variant="outlined"
              sx={{ justifyContent: "flex-start" }}
              key={eachItem + index}
              label={eachItem}
              onDelete={() => dispatch(removeFromCart(eachItem))}
            // onClick={handleClick}
            />
          )
        })}
      </Stack>
  )
}

export default Collection;

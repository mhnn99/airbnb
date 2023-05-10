import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "xs",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReviewModal = () => {
  const user = useSelector((state) => ({
    user: state.user,
    token: state.token,
  }));
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState({});
  const comment = React.useRef("");

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetch(
        `http://localhost:9000/user/orders/${user.user._id}`
      );
      const res = await orders.json();
      const order = res.ordersByUser.find((el) =>
        dayjs(el.checkoutDate).isBefore(dayjs())
      );
      if (order) {
        setBooking(order);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    fetchOrders();
  }, [user.user._id]);
  console.log(booking);
  const handleSubmit = async () => {
    const reviewPost = await fetch("http://localhost:9000/reviews", {
      method: "POST",
      body: JSON.stringify({
        userId: user.user._id,
        listingId: booking.listingId,
        comment: comment.current,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const res = await reviewPost.json();
    const deleteOrder = await fetch(
      `http://localhost:9000/orders/${booking._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How was your stay at {booking.listingName}?
          </Typography>

          <Box sx={{ mt: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Review"
              multiline
              maxRows={4}
              fullWidth
              onChange={(e) => (comment.current = e.target.value)}
            />
          </Box>
          <Button type="submit" onClick={() => handleSubmit()}>
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewModal;

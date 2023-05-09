
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ReviewModal = () =>{
    const user = useSelector(state=>({user:state.user,token:state.token}))
    const userBookings = useSelector(state=>state.bookings)
    const [open,setOpen] = useState(false)
    const [booking,setBooking] = useState({})

    useEffect(()=>{
        const fetchOrders = async () =>{
            const orders = await fetch(`http://localhost:9000/user/orders/${user.user._id}`)
            const res = await orders.json()
            const order = res.ordersByUser.find(el=>dayjs(el.checkoutDate).isBefore(dayjs()))
            console.log(order)
            if(order){
                setOpen(true)
                const bookingOrder = userBookings.find(el=>el.id===order.listingId)
                setBooking(bookingOrder)
            }else{
                setOpen(false)
            }
        }
        fetchOrders()
    },[user.user._id, userBookings])
    console.log(userBookings)
  
    return (
        <div>
        <Modal
          open={open}

          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              How was your stay at {booking.name}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Review
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField id="outlined-multiline-flexible" label="Multiline" multiline maxRows={4} />
              <Button type="submit">Send</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
}

export default ReviewModal
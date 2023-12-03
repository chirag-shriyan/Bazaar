import { Drawer } from '@mui/material';
import { IoMdClose } from "react-icons/io";

export default function Cart({ cartOpen, setCartOpen }) {

    return (

        <Drawer
            anchor='right'
            open={cartOpen}
            onClose={() => setCartOpen(false)}
        >

            <div className='w-[350px] max-md:w-screen'>

                <div className='m-3 flex justify-between items-center'>
                    <h1 className='text-xl'>Cart</h1>
                    <IoMdClose className='text-2xl cursor-pointer' onClick={() => setCartOpen(false)}/>
                </div>
                <hr />

            </div>

        </Drawer>

    )
}

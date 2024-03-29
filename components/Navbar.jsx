import React from 'react'
import Link from 'next/link'

import {AiOutlineShopping} from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'
const Navbar = () => {
  
  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
       <Link href='/'>J$tore</Link>
      </p>
      <button type='button' className='cart-icon' onClick={()=>{showCart === true ? setShowCart(false): setShowCart(true)}}>
      <AiOutlineShopping/>
      <span className='cart-item-qty top-0'>{totalQuantities}</span>
      </button>

      {showCart && <Cart/>}
    </div>
  )
  
}

export default Navbar

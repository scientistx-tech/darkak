import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='border'>
      <Image className='object-fill inset-0' src={"/images/category/catHero.png"} alt='' height={1000} width={1000}/>
    </div>
  )
}

export default Hero

// import { Link } from "react-router-dom"



import { Hero } from '@utils/types/hero.types'
import React from 'react'

// import { Button } from '@forms/button'

const HeroSection: React.FC<Hero> = ({ phrase, title, info, imag, children, elementposition }) => {
  return (
    <section className={`flex ${elementposition} items-center justify-between`}>
      <div className='w-2/6'> 
        <h3 className='text-lg'>{phrase}</h3>
        <h1 className='font-semibold text-4xl'>{title}</h1>
        <p className='text-xs py-2'>{info}</p> 
        <>{children}</>
      </div>
      <div className='w-2/3'>
        <img src={`/${imag}`} className='w-4/5 h-4/5'/>
      </div>
    </section>
  )
}

export { HeroSection }
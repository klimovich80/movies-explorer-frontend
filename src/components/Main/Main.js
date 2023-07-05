import React from 'react'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe'
import Portfolio from '../Portfolio'

export default function Main() {
    return (
        <main className='Main'>
            <Promo className='Promo' />
            <NavTab className='NavTab' />
            <AboutProject className='AboutProject' />
            <Techs className='Techs' />
            <AboutMe className='AboutMe' />
            <Portfolio className='Portfolio' />
        </main>
    )
}

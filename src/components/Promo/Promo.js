import React from 'react'
import './Promo.css'
import promoImage from '../../images/promo-image.svg'

export default function Promo() {
    return (
        <section className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__image' src={promoImage} alt='промо картинка' />
        </section>
    )
}

import React from 'react'
import './Techs.css'

export default function Techs() {
    return (
        <section className='techs'>
            <h2 className='techs__title section__title'>Технологии</h2>
            <h2 className='techs__description-title'>7 технологий</h2>
            <p className='techs__description-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__list'>
                <li className='list__item'>HTML</li>
                <li className='list__item'>CSS</li>
                <li className='list__item'>JS</li>
                <li className='list__item'>React</li>
                <li className='list__item'>Git</li>
                <li className='list__item'>Express.js</li>
                <li className='list__item'>MongoDB</li>
            </ul>

        </section>
    )
}

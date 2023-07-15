import { endpointAdaptiveWeb, endpointSPA, endpointStaticWeb } from '../../vendor/constants/endpoints'
import './Portfolio.css'
import { Link } from 'react-router-dom'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__items list'>
                <li className='portfolio__item'>
                    Статичный сайт
                    <Link className='portfolio__link link' target='_blank' to={endpointStaticWeb}>↗</Link>
                </li>
                <li className='portfolio__item'>
                    Адаптивный сайт
                    <Link className='portfolio__link link' target='_blank' to={endpointAdaptiveWeb}>↗</Link>
                </li>
                <li className='portfolio__item'>
                    Одностраничное приложение
                    <Link className='portfolio__link link' target='_blank' to={endpointSPA}>↗</Link>
                </li>
            </ul>
        </section>
    )
}

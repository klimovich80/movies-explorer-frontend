import { endpointAdaptiveWeb, endpointSPA, endpointStaticWeb } from '../../vendor/constants/endpoints'
import './Portfolio.css'
import { Link } from 'react-router-dom'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__items'>
                <li className='portfolio__item'>
                    Статичный сайт
                    <Link className='item__link' to={endpointStaticWeb}>↗</Link>
                </li>
                <li className='portfolio__item'>
                    Адаптивный сайт
                    <Link className='item__link' to={endpointAdaptiveWeb}>↗</Link>
                </li>
                <li className='portfolio__item'>
                    Одностраничное приложение
                    <Link className='item__link' to={endpointSPA}>↗</Link>
                </li>
            </ul>
        </section>
    )
}

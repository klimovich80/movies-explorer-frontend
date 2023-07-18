import { endpointAdaptiveWeb, endpointSPA, endpointStaticWeb } from '../../vendor/constants/endpoints'
import './Portfolio.css'
import { Link } from 'react-router-dom'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__items list'>
                <li className='portfolio__item'>

                    <Link className='portfolio__link link' target='_blank' to={endpointStaticWeb}>
                        Статичный сайт
                        <span className='portfolio__link_arrow'>↗</span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link className='portfolio__link link' target='_blank' to={endpointAdaptiveWeb}>
                        Адаптивный сайт
                        <span className='portfolio__link_arrow'>↗</span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link className='portfolio__link link' target='_blank' to={endpointSPA}>
                        Одностраничное приложение
                        <span className='portfolio__link_arrow'>↗</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}

import { ENDPOINT_ADAPTIVE_WEB, ENDPOINT_SPA, ENDPOINT_STATIC_WEB } from '../../vendor/constants/endpoints'
import './Portfolio.css'
import { Link } from 'react-router-dom'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__items list'>
                <li className='portfolio__item'>

                    <Link className='portfolio__link link' target='_blank' to={ENDPOINT_STATIC_WEB}>
                        Статичный сайт
                        <span className='portfolio__link-arrow'>↗</span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link className='portfolio__link link' target='_blank' to={ENDPOINT_ADAPTIVE_WEB}>
                        Адаптивный сайт
                        <span className='portfolio__link-arrow'>↗</span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link className='portfolio__link link' target='_blank' to={ENDPOINT_SPA}>
                        Одностраничное приложение
                        <span className='portfolio__link-arrow'>↗</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}

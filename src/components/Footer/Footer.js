import { Link } from 'react-router-dom';
import './Footer.css';
import { ENDPOINT_MY_GITHUB, ENDPOINT_PRAKTIKUM } from '../../vendor/constants/endpoints';

export default function Footer() {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__lower-part'
            ><p className='footer__copyright'>&copy; 2023 Pavel Klimovich</p>
                <ul className='footer__items list'>
                    <li className='footer__item'>
                        <Link className='footer__link link' target='_blank' to={ENDPOINT_PRAKTIKUM}>Яндекс.Практикум</Link>
                    </li>
                    <li className='footer__item'>
                        <Link className='footer__link link' target='_blank' to={ENDPOINT_MY_GITHUB}>Github</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

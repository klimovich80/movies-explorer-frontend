import './PageNotFound.css'
import { useNavigate } from 'react-router-dom'
export default function PageNotFound() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <section className='page-not-found'>
            <h2 className='page-not-found__title'>404</h2>
            <p className='page-not-found__text'>Страница не найдена</p>
            <button className='page-not-found__button' onClick={goBack}>Назад</button>
        </section>
    )
}

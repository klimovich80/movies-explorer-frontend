import './AboutMe.css'
import { Link } from 'react-router-dom'
import { endpointMyGithub } from '../../vendor/constants/endpoints'
import myPortfolioImage from '../../images/portfolio.jpg'

export default function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__header section-title'>Студент</h2>
            <article className='about-me__article'>
                <img className='about-me__image' src={myPortfolioImage} alt="мое фото" />
                <h2 className='about-me__title'>Павел</h2>
                <h3 className='about-me__description'>Веб-разработчик, 43 года</h3>
                <p className='about-me__text'>Родился в Белоруссии. По профессии - артист балета. Много путешествовал по миру. Общался с людьми из разных стран.
                    Свободно разговариваю, пишу и читаю на английском языке. Понимаю и немного общаюсь на французском.
                    Сейчас живу в Крыму с женой и четырьмя детьми. Вечерами веду свою школу ирландского танца. Увлекаюсь бегом, подводными погружениями и конным спортом.
                    Дома организовал небольшой частный конный клуб. Всегда любил программировать, сам изучал на любительском уровне С++, PHP, Visual Basic. Это очень помогало решать организационные задачи.
                    Захотел систематизировать свои знания и подойти к вопросу на профессииональном уровне.
                    Сейчас заканчиваю курс веб-разработки, планирую создать интересный цифровой продукт и немного фрилансить.
                </p>
                <Link className='about-me__link link' to={endpointMyGithub} target='_blank'>Github</Link>
            </article>
        </section>
    )
}

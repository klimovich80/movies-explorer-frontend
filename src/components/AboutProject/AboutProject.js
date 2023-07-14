import './AboutProject.css'

export default function AboutProject() {
    return (
        <section className='about-project'>
            <h2 className='about-project__title section__title'>О проекте</h2>

            <div className='about-project__articles'>
                <article className='about-project__article'>
                    <h3 className='about-project__header'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className='about-project__article'>
                    <h3 className='about-project__header'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>

            <div className='about-project__duration'>
                <div className='about-project__one-week'>
                    <p className='about-project__time one-week'>1 неделя</p>
                    <p className='about-project__stage-name'>Back-end</p>
                </div>
                <div className='about-project__four-week'>
                    <p className='about-project__time four-weeks'>4 недели</p>
                    <p className='about-project__stage-name'>Front-end</p>
                </div>
            </div>
        </section>
    )
}

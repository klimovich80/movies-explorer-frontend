import React from 'react'
import './AboutProject.css'

export default function AboutProject() {
    return (
        <section className='about-project'>
            <h2 className='about-project__title section__title'>О проекте</h2>

            <div className='about-project__articles'>
                <article className='about-project__article'>
                    <h3 className='article__header'>Дипломный проект включал 5 этапов</h3>
                    <p className='article__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className='about-project__article'>
                    <h3 className='article__header'>На выполнение диплома ушло 5 недель</h3>
                    <p className='article__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>

            <div className='about-project__duration'>
                <div className='duration__one-week'>
                    <p className='duration__time time__week'>1 неделя</p>
                    <p className='duration__stage-name'>Back-end</p>
                </div>
                <div className='duration__four-week'>
                    <p className='duration__time time__four-weeks'>4 недели</p>
                    <p className='duration__stage-name'>Front-end</p>
                </div>
            </div>
        </section>
    )
}

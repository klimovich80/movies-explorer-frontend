import './AboutProject.css'

export default function AboutProject() {
    return (
        <section class='about-project'>
            <h2 class='about-project__title section__title'>О проекте</h2>

            <div class='about-project__articles'>
                <article class='about-project__article'>
                    <h3 class='about-project__header'>Дипломный проект включал 5 этапов</h3>
                    <p class='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article class='about-project__article'>
                    <h3 class='about-project__header'>На выполнение диплома ушло 5 недель</h3>
                    <p class='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>

            <div class='about-project__duration'>
                <div class='about-project__one-week'>
                    <p class='about-project__time one-week'>1 неделя</p>
                    <p class='about-project__stage-name'>Back-end</p>
                </div>
                <div class='about-project__four-week'>
                    <p class='about-project__time four-weeks'>4 недели</p>
                    <p class='about-project__stage-name'>Front-end</p>
                </div>
            </div>
        </section>
    )
}

import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm({ isShort, setShort }) {
    return (
        <section className='search'>
            <form className='search__form'>
                <div className='search__container'>
                    <input className='search__input' type='search' placeholder='Фильм' />
                    <button className='search__button button' type='submit' aria-label='Поиск'>Поиск</button>
                </div>
                <FilterCheckbox isShort={isShort} setShort={setShort} />
            </form>
        </section>
    )
}

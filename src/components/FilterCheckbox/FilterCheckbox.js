import './FilterCheckbox.css'

export default function FilterCheckbox({ isShort, setShortMovies }) {
    return (
        <div className='filter'>
            <input className='filter__checkbox'
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={isShort} />
            <span class="filter__visible-checkbox" onClick={setShortMovies}></span>
            <label className='filter__label' for='search__checkbox'>Короткометражки</label>
        </div>

    )
}

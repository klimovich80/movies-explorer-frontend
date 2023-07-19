import './FilterCheckbox.css'

export default function FilterCheckbox({ isShort, setShortMovies }) {
    return (
        <div className='filter'>
            <input className='filter__checkbox'
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={isShort}
                onChange={() => { }} />
            <span className="filter__visible-checkbox" onClick={setShortMovies}></span>
            <label className='filter__label' htmlFor='search__checkbox'>Короткометражки</label>
        </div>

    )
}

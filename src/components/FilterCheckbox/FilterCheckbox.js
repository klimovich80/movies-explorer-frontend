import './FilterCheckbox.css'

export default function FilterCheckbox({ isShort, setShort }) {
    return (
        <div className='filter'>
            <input className='filter__checkbox'
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={isShort}
                onChange={() => { }} />
            <span className="filter__visible-checkbox" onClick={setShort}></span>
            <p className='filter__label'>Короткометражки</p>
        </div>

    )
}

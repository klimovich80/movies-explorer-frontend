import { useEffect, useRef } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox({
    isShort,
    setShort
}) {
    const inputRef = useRef(null);

    function handleCheckbox() {
        const input = inputRef.current.checked;
        setShort(!input)
        setShortFilter(!input)
    }
    function setShortFilter(isShort) {
        localStorage.setItem('isShort', isShort)
    }

    useEffect(() => {
        setShort(JSON.parse(localStorage.getItem('isShort')) || false)
    }, [])

    return (
        <div className='filter'>
            <input className='filter__checkbox'
                ref={inputRef}
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={isShort}
                onChange={() => { }} />
            <span className="filter__visible-checkbox" onClick={handleCheckbox}></span>
            <label className='filter__label' htmlFor='search__checkbox'>Короткометражки</label>
        </div>

    )
}

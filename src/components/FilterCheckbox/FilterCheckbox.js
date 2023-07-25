import { useEffect, useRef, useState } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox() {
    const inputRef = useRef(null);

    const [checked, setChecked] = useState(false)

    function handleCheckbox() {
        const input = inputRef.current.checked;
        setChecked(!input)
        setShortFilter(!input)
    }
    function setShortFilter(isShort) {
        localStorage.setItem('isShort', isShort)
        console.log(localStorage);
    }

    useEffect(() => {
        setChecked(JSON.parse(localStorage.getItem('isShort')))
    }, [])

    return (
        <div className='filter'>
            <input className='filter__checkbox'
                ref={inputRef}
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={checked}
                onChange={() => { }} />
            <span className="filter__visible-checkbox" onClick={handleCheckbox}></span>
            <label className='filter__label' htmlFor='search__checkbox'>Короткометражки</label>
        </div>

    )
}

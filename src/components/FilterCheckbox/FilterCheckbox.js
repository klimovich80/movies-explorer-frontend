import { useEffect, useState } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox() {

    const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('isShort')))

    function handleCheckbox() {
        setChecked(!checked)
    }
    function setShortFilter() {
        localStorage.setItem('isShort', checked)
        console.log(localStorage);
    }

    useEffect(() => {
        setChecked(JSON.parse(localStorage.getItem('isShort')))
        console.log(localStorage);
    }, [])

    return (
        <div className='filter'>
            <input className='filter__checkbox'
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={checked}
                // обрабатываем изменения чекбокса функцией
                onChange={setShortFilter()} />
            {/* меняем положение чекбокса спаном */}
            <span className="filter__visible-checkbox" onClick={handleCheckbox}></span>
            <label className='filter__label' htmlFor='search__checkbox'>Короткометражки</label>
        </div>

    )
}

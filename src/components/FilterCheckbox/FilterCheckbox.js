import { useEffect, useState } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox({
    searchMovie,
    inputValue,
    isSavedMoviesPage,
}) {

    // стэйт для чекбокса
    const [checked, setChecked] = useState(false)
    // при первом рендеринге страницы
    useEffect(() => {
        // если в локальной памяти есть значение isShort
        localStorage.getItem('isShort') !== null
            // устанавливаем положение чекбокса согласно isShort
            ? setChecked(JSON.parse(localStorage.getItem('isShort')))
            // задаем нужное значение в локальную память
            : localStorage.setItem('isShort', checked)
    }, [])

    // по клику на чекбокс
    function handleCheckboxChange(e) {
        // получаем актуальное положение чекбокса
        const isCheckBoxSetShort = e.target.checked;
        // заносим его значение в локальную память
        localStorage.setItem('isShort', isCheckBoxSetShort)
        // запускаем функцию поиска фильмов
        searchMovie(isSavedMoviesPage, inputValue);
        // меняем его на нужное визуальное положение
        setChecked(!checked);
    }

    return (
        <div className='filter'>
            <input className='filter__checkbox'
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={checked}
                onChange={handleCheckboxChange} />
            <label
                className='filter__label'
                htmlFor='search__checkbox'
            >Короткометражки</label>
        </div>

    )
}

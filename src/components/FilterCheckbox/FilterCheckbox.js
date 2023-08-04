import { useEffect, useState } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox({
    isShort,
    setShort,
    searchMovie,
    inputValue,
    isSavedMoviesPage,
    setShortLocal,
    // checked,
    // setChecked
}) {

    // стэйт для чекбокса
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(JSON.parse(localStorage.getItem('isShort')))
    }, [])

    // function handleCheckbox() {
    //     console.log('checkbox: ' + checked);
    //     //переменная сохранения текущего состояния чекбокса
    //     const checkBox = inputRef.current.checked;
    //     const checkedValue = checkBox.value;
    //     console.log(checkedValue);
    //     // устанавливаем значение стэйта короткометражек в текущее положение чекбокса
    //     setChecked(checkBox);
    //     // вызываем функцию установки значения локалсторадже
    //     setShortLocal(checkBox);
    //     // вызываем функцию поиска фильмов/сохраненных фильмов по искомому значению
    //     searchMovie(isSavedMoviesPage, inputValue);
    // }

    // //функция установки значения локал сторадже
    // function setShortLocal(shortFlag) {
    //     console.log(`isShort on SearchFilter -> localStorage: ${shortFlag}`);
    //     // устанавливаем занчение текущего положения чекбокса
    //     localStorage.setItem('isShort', !shortFlag)
    // }
    function handleCheckboxChange(e) {
        // getting actual checkbox position
        const isCheckBoxSetShort = e.target.checked;
        localStorage.setItem('isShort', isCheckBoxSetShort)
        console.log(isCheckBoxSetShort);
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

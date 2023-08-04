import { useEffect, useRef } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox({
    isShort,
    setShort,
    searchMovie,
    movie,
    isSavedMoviesPage
}) {
    const inputRef = useRef(null);

    function handleCheckbox() {
        const input = inputRef.current.checked;
        if (isSavedMoviesPage) {
            console.log('set checkbox for short movies');
            setShort(input)
            return
        }
        setShort(input);
        setShortFilter(input);
        searchMovie(isSavedMoviesPage, movie);
    }
    function setShortFilter(shortFlag) {
        console.log(`isShort on SearchFilter: ${shortFlag}`);
        isSavedMoviesPage
            ? setShort(shortFlag)
            : localStorage.setItem('isShort', shortFlag)
    }

    useEffect(() => {
        //this goes well
        console.log('filterCheckbox useEffect');
        console.log('setting checkbox position on first rendering');
        isSavedMoviesPage
            ? setShort(true)
            : setShort(JSON.parse(localStorage.getItem('isShort')))
    }, [])

    return (
        <div className='filter'>
            <input className='filter__checkbox'
                ref={inputRef}
                type='checkbox'
                id='search__checkbox'
                name='filter__checkbox'
                checked={!isShort}
                onChange={() => { }} />
            <span
                className="filter__visible-checkbox"
                onClick={handleCheckbox}
            ></span>
            <label
                className='filter__label'
                htmlFor='search__checkbox'
            >Короткометражки</label>
        </div>

    )
}

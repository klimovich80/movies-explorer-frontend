import './MyInput.css'
import { forwardRef } from 'react'

export function MyInput({ children, ...props }, ref) {
    return (
        <div className='my-input__conatiner'>
            <input
                {...props}
                ref={ref ? ref : null}
                className={'my-input__input input'} value={props.value} placeholder={props.placeholder} />
            <span className={'my-input__error error'}>{props.error}</span>
        </div>
    )
}

const forwardedMyInput = forwardRef(MyInput);

export default forwardedMyInput;

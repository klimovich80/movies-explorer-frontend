import './MyInput.css'

export default function MyInput({ children, ...props }) {
    return (
        <div className='my-input__conatiner'>
            <input className={
                props.isProfile
                    ? 'my-input__input_type_profile input'
                    : 'my-input__input input'
            } value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
            <span className={
                props.isDisabled
                    ? 'my-input__error_hidden error'
                    : props.isProfile
                        ? 'my-input__error_type_profile error'
                        : 'my-input__error error'
            }>error</span>
        </div>
    )
}

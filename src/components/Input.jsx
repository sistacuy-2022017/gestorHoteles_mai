/* eslint-disable react/prop-types */

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea,
    className, // Añadir className aquí
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field)
    }

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field)
    }

    return (
        <>
            {label && (
                <div className="auth-form-label">
                    <span>{label}</span>
                </div>
            )}
            {textarea ? (
                <textarea
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    rows={5}
                    style={{ maxWidth: '400px' }}
                    className={className} // Añadir className aquí
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    className={className} // Añadir className aquí
                />
            )}
            <span className="auth-form-validation-message">
                {showErrorMessage && validationMessage}
            </span>
        </>
    )
}

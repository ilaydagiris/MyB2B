import React from 'react'
import PropTypes from 'prop-types'

function TextInput({ changeHandler, label, placeholder, type }) {
    return (
        <>
            <label className="mr-auto font-semibold text-md text-gray-500 mt-2">{label}</label>
            <input type={type || "text"} className="transition-colors ease-in-out bg-white border-2 border-gray-300 focus:border-blue-600 rounded-xl py-1 px-2 focus:outline-none" onKeyUp={changeHandler} placeholder={placeholder} />
        </>
    )
}

TextInput.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
}

export default TextInput

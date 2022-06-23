import React from 'react'
import PropTypes from 'prop-types'

function LoginForm({ children, title }) {
    return (
        <div className="bg-gray-100 rounded-xl p-10 m-auto flex flex-col w-96">
            <h1 className="text-2xl font-bold mx-auto mb-5">{title}</h1>
            {children}
        </div>
    )
}

LoginForm.propTypes = {
    title: PropTypes.string.isRequired
}

export default LoginForm

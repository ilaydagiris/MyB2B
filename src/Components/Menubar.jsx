import React from 'react'
import PropTypes from 'prop-types'

function Menubar({ setRoute, user }) {
    return (
        <div className="flex flex-row w-full container py-2 px-2 bg-gray-100 text-gray-800 mx-auto mt-5 rounded-xl select-none">
            <h1 className="font-bold mr-auto my-auto">MyB2B</h1>
            <p className="ml-auto mr-2 my-auto">Merhaba <span className="font-semibold">{user.email}</span></p>
            <button onClick={() => { setRoute("login") }} className="bg-red-500 rounded-lg py-1 px-2 text-white">Çıkış</button>
        </div>
    )
}

Menubar.propTypes = {
    setRoute: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Menubar

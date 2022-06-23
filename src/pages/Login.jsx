import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../Components/LoginForm'
import TextInput from '../Components/TextInput'
import Button from '../Components/Button'
import Error from '../Components/Error'

function Login({ setRoute, setUser, users }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    function login(){
        let user = users.find(x => x.email === username)
        if (!user){
            setError("Kullanıcı bulunamadı.")
            return
        }
        if (user.password !== password){
            setError("Hatalı şifre.")
            return
        }
        setUser(user)
        setRoute(`${user.role}-dashboard`)
    }

    return (
        <div className="flex w-full h-full">
            <LoginForm title={"MyB2B"}>
                <Error error={error} />
                <TextInput label="Kullanıcı Adı" changeHandler={(e) => {setUsername(e.target.value)}} />
                <TextInput label="Şifre" type="password" changeHandler={(e) => {setPassword(e.target.value)}} />
                <Button text="Giriş" action={login} />
            </LoginForm>
        </div>
    )
}

Login.propTypes = {
    setRoute: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

export default Login

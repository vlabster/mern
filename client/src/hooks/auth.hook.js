import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {

    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userEmail, setEmail] = useState(null)

    const login = useCallback((jwtToken, id, email) => {

        setToken(jwtToken)
        setUserId(id)
        setEmail(email)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userEmail: email
        }))

    }, [])

    const logout = useCallback(() => {

        setToken(null)
        setUserId(null)
        setEmail(null)
        localStorage.removeItem(storageName)

    }, [])

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userEmail)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready, userEmail }
}   
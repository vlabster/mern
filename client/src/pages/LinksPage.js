import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'
import {useMessage} from '../hooks/message.hook'

export const LinksPage = () => {

    const message = useMessage()

    const [links, setLinks] = useState([])

    const { loading, request } = useHttp()

    const { token, logout } = useContext(AuthContext)

    const deleteLink = async (event, id) => {
        event.preventDefault()
        try {
            const fetched = await request(`/api/link/${id}`, 'DELETE', null, { Authorization: `Bearer ${token}` })
            console.log(fetched)
            setLinks(links.filter(item => item._id !== id))
        }
        catch(e) {
            if (e.message === 'Нет авторизации') {
                logout()
                return
            }
            message('Ошибка удаления ссылки')
        }
        
    }

    const fetchLinks = useCallback( async () => {

        try {
            const fetched = await request('/api/link', 'GET', null, { Authorization: `Bearer ${token}` })
            setLinks(fetched)
        }
        catch(e) {
            if (e.message === 'Нет авторизации') {
                logout()
            }
        }

    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinksList links={links} deleteLink={deleteLink}/>} 
        </>
    )
}
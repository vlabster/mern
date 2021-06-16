import { PromiseProvider } from 'mongoose'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'

export const LinksList = ({ links }) => {

    const { loading, error, request, clearError } = useHttp()
    const [list, setLinks] = useState([])

    useEffect(() => {
        setLinks(links)
    }, [links])

    const deleteLink = (event, id) => {
        event.preventDefault()
        setLinks(list.filter(item => item._id !== id))
    }

    if (!list.length) {
        return <p classame="center">Ссылки отсутствуют</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная ссылка</th>
                <th>Сокращённая ссылка</th>
                <th>Открыть</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
                { list.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{ index + 1 }</td>
                            <td>{ link.from }</td>
                            <td>{ link.to }</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Открыть</Link>
                            </td>
                            <td>    
                                <a className="waves-effect waves-light btn-small blue" onClick={(e) => {deleteLink(e, link._id, index)}}>Удалить</a>
                                {/* <a className="waves-effect waves-light btn-small blue" onClick={this.deleteLink.bind(this, link._id, index)}>Удалить</a> */}
                            </td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>

                <Route path="/links" exact>
                    <LinksPage />
                </Route>

                <Route path="/create" exact>
                    <CreatePage />
                </Route>

                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>

            </Switch>
        )
    }

    return (
        <Switch>

        </Switch>
    )
}
import React , { Suspense }  from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
const ImagesLoad = React.lazy(() => import('./pages/ImagesLoad'));


const routes = {
    root: {
        exact: true,
        path: '/',
        component: ImagesLoad,
    },
}

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
                <div className={"container"}>
                    <Switch>
                        <Route {...routes.root} />
                        {/*<Route {...routes.BoardView} />*/}
                    </Switch>
                </div>
            </Suspense>
        </BrowserRouter>
    )
}

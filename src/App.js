import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from '~/components/Layout';

import React, { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* <Route path="/" element={<Navigate to="/login" />} /> */}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                        //  : (
                        //     <Route
                        //         key={index}
                        //         path={route.path}
                        //         element={
                        //             <Fragment>
                        //                 <Login />
                        //             </Fragment>
                        //         }
                        //     />
                        // );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

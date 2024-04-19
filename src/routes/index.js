import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Tutorial';
import Login from '~/pages/Login';
import Tutorial from '~/pages/Tutorial';
import DepartmentList from '~/pages/Department List';

const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/list-department', component: DepartmentList },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/tutorial', component: Tutorial, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

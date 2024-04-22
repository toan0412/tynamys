import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Tutorial';
import Login from '~/pages/Login';
import Tutorial from '~/pages/Tutorial';
import DepartmentList from '~/pages/Department List';
import AbilityList from '~/pages/Ability List';
import PositionList from '~/pages/Postition List';

const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/list-department', component: DepartmentList },
    { path: '/list-position', component: PositionList },
    { path: '/list-personnel', component: AbilityList },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/tutorial', component: Tutorial, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

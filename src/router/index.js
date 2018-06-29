import pages from "../pages";
const {Login,Details,RequestList} = pages;
const routes = [
    { path: '/', component: Login, exact: true },
    { path: '/login', component: Login},
    { path: '/details', component: Details},
    { path: '/requestList', component: RequestList},
    { path: '*', component: Login}
]; 

export default routes;
import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './components/login/LoginPage.vue';
import SignupPage from './components/login/SignupPage.vue';
import PedidoPage from './components/pedido/PedidoPage.vue';
import ListaPedidoPage from './components/listaPedido/ListaPedidoPage.vue';
import DashboardPage from './components/dashboard/DashboardPage.vue';
import AdminPage from './components/admin/AdminPage.vue';

Vue.use(Router);

const routes = [
    { path: '/', name: 'log', component: LoginPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/signup', name: 'singup', component: SignupPage },
    { path: '/pedido', name: 'pedido', component: PedidoPage },
    { path: '/lista', name: 'listaPedido', component: ListaPedidoPage },
    { path: '/dashboard', name: 'dashboard', component: DashboardPage },
    { path: '/admin', name: 'admin', component: AdminPage },
];

export default new Router({
    routes,
});
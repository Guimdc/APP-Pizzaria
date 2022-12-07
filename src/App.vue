<template>
    <v-app>
        <div id="content">
            <main>
                <v-content>
                    <router-view />
                </v-content>
            </main>
        </div>
    </v-app>
</template>

<script>
import apiConfig from './components/api/apiConfig';
export default {
    name: 'App',
    mixins: [apiConfig],
    created() {
        this.createInterceptors();
        if (window.localStorage.authToken && window.localStorage.userId && window.localStorage.userNome && window.localStorage.userEmail) {
            this.$store.commit('setAuthToken', window.localStorage.authToken);
            this.$store.commit('setUserId', window.localStorage.userId);
            this.$store.commit('setUserNome', window.localStorage.userNome);
            this.$store.commit('setUserEmail', window.localStorage.userEmail);
            this.$store.commit('setPerfil', window.localStorage.perfil);
            if (this.$store.state.perfil == "cliente") {
                this.$router.push('/pedido');
            } else if (this.$store.state.perfil == "admin") {
                this.$router.push('/dashboard');
            }

        } else {
            this.$router.push('/login');
        }
    },
};
</script>

<style>
#content {
    display: flex;
}

main {
    width: 100vw;
    display: flex;
    margin-left: 0vw;
}

html {
    overflow-y: auto
}

#app {
    background-repeat: no-repeat;
    background: url('./images/pizza.png');
    background-size: cover;
    overflow: auto;
}
</style>
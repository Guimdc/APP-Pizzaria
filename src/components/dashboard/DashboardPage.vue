<template>
    <v-container fluid>
        <v-row justify="center" height="100vh">
            <v-col cols="12" lg="8" md="10" sm="12" class="col d-flex">
                <v-flex class="div2 flex-column d-flex align-center">
                    <div class="mt-4">
                        <v-btn dark class="mr-2">
                            <v-icon color="white" class="mr-1">mdi-chart-multiple
                            </v-icon>
                            <h4 class="white--text">Dashboard</h4>
                        </v-btn>
                        <v-btn class="mr-2" @click="goLista()">
                            <v-icon class="mr-1">mdi-format-list-bulleted-square
                            </v-icon>
                            <h4>Pedidos</h4>
                        </v-btn>
                        <v-btn class="mr-2" @click="goAdmin()">
                            <v-icon class="mr-1">mdi-cog-outline
                            </v-icon>
                            <h4>Organização</h4>
                        </v-btn>
                        <v-btn class="mr-2" color="error" @click="logout">
                            <v-icon class="mr-1">mdi-logout-variant
                            </v-icon>
                            <h4>Logout</h4>
                        </v-btn>
                    </div>

                    <div class="d-flex flex-wrap div justify-center mt-2">
                        <v-card width="45%" class="mr-2">
                            <v-card-title>Bordas mais vendidos</v-card-title>
                            
                        </v-card>
                    
                   
                        <v-card width="45%">
                            <v-card-title>Massas mais vendidas</v-card-title>
                        </v-card>
                    
                    </div>
                    
                    

                </v-flex>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import api from '../api/api';
export default {
    name: 'ListaPage',
    mixins: [api],
    mixins: [api],
    data() {
        return {
            email: window.localStorage.userEmail,
            senha: '',
        };
    },
    methods: {
        logout() {
            this.$store.commit('setAuthToken', "");
            this.$store.commit('setUserId', "");
            this.$store.commit('setUserNome', "");
            this.$store.commit('setUserEmail', "");
            this.$store.commit('setPerfil', "");
            this.$store.commit('setLogged', false);
            this.$router.push('/login');
        },
        goLista() {
            this.$router.push('/lista');
        },
        goAdmin() {
            this.$router.push('/admin');
        }
    }

}
</script>
<style>
.div{
    width: 100%;
}
</style>
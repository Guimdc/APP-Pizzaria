<template>
    <v-container fluid v-if="this.$store.state.perfil=='admin'">
        <v-row justify="center" height="100vh">
            <v-col cols="12" lg="10" md="10" sm="12" class="col d-flex">
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
                        <v-btn class="mr-2" color="error" @click="logout">
                            <v-icon class="mr-1">mdi-logout-variant
                            </v-icon>
                            <h4>Logout</h4>
                        </v-btn>
                    </div>

                    <div class="d-flex flex-wrap div justify-center mt-2">
                        <v-card width="90%" class="" v-if="$vuetify.breakpoint.xsOnly">
                            <v-card-title>Bordas mais vendidas</v-card-title>
                            <v-divider></v-divider>
                            <apexchart width="89%" type="donut" :options="options" :series="series"></apexchart>
                        </v-card>
                        <v-card width="45%" class="mr-2" v-else>
                            <v-card-title>Bordas mais vendidas</v-card-title>
                            <v-divider></v-divider>
                            <apexchart width="89%" type="donut" :options="options" :series="series"></apexchart>
                        </v-card>

                        <v-card width="90%" class="mt-2" v-if="$vuetify.breakpoint.xsOnly">
                            <v-card-title>Sabores mais vendidos</v-card-title>
                            <v-divider></v-divider>
                            <apexchart width="100%" type="donut" :options="options2" :series="series2"></apexchart>
                        </v-card>
                        <v-card width="45%" v-else>
                            <v-card-title>Sabores mais vendidos</v-card-title>
                            <v-divider></v-divider>
                            <apexchart width="100%" type="donut" :options="options2" :series="series2"></apexchart>
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
    name: 'DashboardPage',
    mixins: [api],
    data() {
        return {
            options: {
                labels: [],
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#FF0000',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                }
            },
            series: [],
            series2: [],
            options2: {
                labels: [],
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#7F0000',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                }
            },


        };
    },
    created() {
        this.get('/dashboard/borda').then((response) => {
            response.data.forEach(element => {
                this.options.labels.push(element.borda);
                this.series.push(element.num);
            });
            this.get('dashboard/sabor').then((response) => {
                response.data.forEach(element => {
                    this.options2.labels.push(element.sabor);
                    this.series2.push(element.num);
                });
            })
        })
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
.div {
    width: 100%;
}
</style>
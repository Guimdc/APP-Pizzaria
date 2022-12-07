<template>
    <v-container fluid>
        <v-row justify="center" height="100vh">
            <v-col cols="12" lg="10" md="10" sm="12" class="col d-flex">
                <div class="div2 flex-column d-flex align-center">
                    <div class="mt-4">
                        <v-btn class="mr-2" @click="goDashboard()">
                            <v-icon class="mr-1">mdi-chart-multiple
                            </v-icon>
                            <h4>Dashboard</h4>
                        </v-btn>
                        <v-btn dark class="mr-2">
                            <v-icon color="white" class="mr-1">mdi-format-list-bulleted-square
                            </v-icon>
                            <h4 class="white--text">Pedidos</h4>
                        </v-btn>
                        <v-btn class="mr-2" @click="goAdmin()">
                            <v-icon class="mr-1">mdi-cog-outline
                            </v-icon>
                            <h4>Organização</h4>
                        </v-btn>
                        <v-btn class="mr-2" color="error" @click="logout()">
                            <v-icon class="mr-1">mdi-logout-variant
                            </v-icon>
                            <h4>Logout</h4>
                        </v-btn>
                    </div>
                    <div class="divTable">
                        <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Pesquise..." single-line
                            hide-details class="mb-2">
                        </v-text-field>
                        <v-data-table :headers="headers" :items="pedidos" :search="search" :items-per-page="20">
                            <template v-slot:item.acao="{ item }">
                                <v-select class="mb-n2" item-value="item.status" :items="status"
                                    v-model="situacao[item.idpedido]"
                                    @change="onChange(situacao[item.idpedido], item.idpedido)"></v-select>
                            </template>
                            <template v-slot:item.del="{ item }">
                                <v-btn icon @click="apagar(item.idpedido)">
                                    <v-icon color="error">
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </div>

                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import api from '../api/api';

export default {
    name: 'ListaPage',
    mixins: [api],
    data() {
        return {
            search: '',
            headers: [
                { text: 'ID', value: 'idpedido' },
                { text: 'Cliente', value: 'cliente' },
                { text: 'Sabores', value: 'sabores' },
                { text: 'Borda', value: 'borda' },
                { text: 'Massa', value: 'massa' },
                { text: 'Tamanho', value: 'tamanho' },
                { text: 'Situação', value: 'acao', sortable: false },
                { text: 'Cancelar', value: 'del', sortable: false },
            ],
            pedidos: [],
            status: ["Em produção", "Pronto", "Concluído"],
            situacao: [],
        }
    },
    created() {
        this.get('/pedido/').then((response) => {
            console.log(response.data);
            this.pedidos = response.data
            this.pedidos.forEach(element => {
                element.sabores = element.sabores.join(", ");
                this.situacao[element.idpedido] = element.status
            });
        })
    },
    methods: {
        onChange(situacao, id) {
            this.put(`/pedido/status/${id}`, { status: situacao }).then((response) => {
                this.get('/pedido/').then((response) => {
                    console.log(response.data);
                    this.pedidos = response.data
                    this.pedidos.forEach(element => {
                        element.sabores = element.sabores.join(", ");
                        this.situacao[element.idpedido] = element.status
                    });
                })
            })
        },
        apagar(id) {
            this.delete(`/pedido/${id}`).then((response) => {
                this.get('/pedido/').then((response) => {
                    console.log(response.data);
                    this.pedidos = response.data
                    this.pedidos.forEach(element => {
                        element.sabores = element.sabores.join(", ");
                        this.situacao[element.idpedido] = element.status
                    });
                })
            })
        },
        logout() {
            this.$store.commit('setAuthToken', "");
            this.$store.commit('setUserId', "");
            this.$store.commit('setUserNome', "");
            this.$store.commit('setUserEmail', "");
            this.$store.commit('setPerfil', "");
            this.$store.commit('setLogged', false);
            this.$router.push('/login');
        },
        goDashboard(){
            this.$router.push('/dashboard');
        },
        goAdmin(){
            this.$router.push('/admin');
        }
    }


}
</script>

<style scoped>
.div2 {
    max-height: 90vh;
}

.divTable {
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
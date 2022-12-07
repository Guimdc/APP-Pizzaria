<template>
    <v-container fluid>
        <v-row justify="center" height="100vh">
            <v-col cols="12" lg="4" md="6" sm="8" class="col d-flex">
                <div class="div2 flex-column d-flex align-center">
                    <h2 class="white--text">
                        <v-btn @click="goLogin()" icon class="mr-2" color="white">
                            <v-icon>mdi-logout-variant</v-icon>
                        </v-btn>Faça seu pedido aqui!
                    </h2>
                    <div class="overflow-auto">
                        <div fluid class="d-flex justify-start">
                            <h3 class="white--text">Massa</h3>
                        </div>
                        <v-divider dark></v-divider>
                        <div class="d-flex flex-wrap">
                            <v-checkbox dark v-for="massa in massas" :label="massa.massa" class="checkbox"
                                v-model="selectMassa" :value="massa.massa"></v-checkbox>
                        </div>
                        <div fluid class="d-flex justify-start">
                            <h3 class="white--text">Borda</h3>
                        </div>
                        <v-divider dark></v-divider>
                        <div class="d-flex flex-wrap">
                            <v-checkbox dark v-for="borda in bordas" :label="borda.borda" class="checkbox"
                                v-model="selectBorda" :value="borda.borda"></v-checkbox>
                        </div>
                        <div fluid class="d-flex justify-start">
                            <h3 class="white--text">Tamanho</h3>
                        </div>
                        <v-divider dark></v-divider>
                        <div class="d-flex flex-wrap">
                            <v-checkbox dark v-for="tamanho in tamanhos" :label="tamanho.tamanho" class="checkbox"
                                v-model="selectTamanho" :value="tamanho"></v-checkbox>
                        </div>
                        <div fluid class="d-flex justify-start">
                            <h3 class="white--text">Sabor (Máximo 3)</h3>
                        </div>
                        <v-divider dark></v-divider>
                        <div class="d-flex flex-wrap">
                            <v-checkbox dark v-for="sabor in sabores" :label="sabor.sabor" class="checkbox"
                                v-model="selectSabores" :value="sabor.sabor"
                                :disabled="selectSabores.length > 2 && selectSabores.indexOf(sabor.sabor) === -1"></v-checkbox>
                        </div>
                    </div>
                    <v-btn width="100%" @click="pedido()">CONFRIMAR PEDIDO (R${{ selectTamanho.preco }})</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import api from '../api/api';

export default {
    name: "PedidoPage",
    mixins: [api],
    data() {
        return {
            massas: [],
            bordas: [],
            tamanhos: [],
            sabores: [],
            selectMassa: "",
            selectBorda: "",
            selectTamanho: {},
            selectSabores: [],
        }
    },
    created() {
        this.get('/pizza/massa').then((response) => {
            console.log(response.data);
            this.massas = response.data;
            this.get('/pizza/borda').then((response) => {
                console.log(response.data);
                this.bordas = response.data;
                this.get('/pizza/tamanho').then((response) => {
                    console.log(response.data);
                    this.tamanhos = response.data;
                    this.get('/pizza/sabor').then((response) => {
                        console.log(response.data);
                        this.sabores = response.data;
                    })
                })
            })
        })
    },
    methods: {
        pedido() {
            if (this.selectBorda && this.selectMassa && this.selectTamanho && this.selectSabores) {
                this.post(`/pedido/`, { massa: this.selectMassa, borda: this.selectBorda, id: this.$store.state.userId, tamanho: this.selectTamanho.tamanho, status: "Em produção", sabor: this.selectSabores }).then((response) => {
                    this.selectBorda = "";
                    this.selectMassa = "";
                    this.selectTamanho = {};
                    this.selectSabores = [];
                })
            }
        },
        goLogin() {
            this.$store.commit('setAuthToken', "");
            this.$store.commit('setUserId', "");
            this.$store.commit('setUserNome', "");
            this.$store.commit('setUserEmail', "");
            this.$store.commit('setPerfil', "");
            this.$store.commit('setLogged', false);
            this.$router.push('/login');
        }
    }


}
</script>

<style scoped>
div {
    width: 100%;
}

.div2 {
    max-height: 90vh;
}

.checkbox {
    width: auto;
    margin-right: 15px;
}
</style>

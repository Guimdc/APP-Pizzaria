<template>
    <v-container fluid>
        <v-row justify="center" height="100vh" width="100vw">
            <v-col cols="12" lg="4" md="6" sm="8" class="col d-flex">
                    <div class="div2 flex-column d-flex align-center">
                        <h2 class="white--text">CADASTRO NA PIZZARIA</h2>
                        <v-text-field v-model="nome" class="input" label="Nome" dark></v-text-field>
                        <v-text-field v-model="email" class="input" label="Email" dark></v-text-field>
                        <v-text-field v-model="senha" class="input" label="Senha" dark type="password"></v-text-field>
                        <v-btn @click="singup" width="100%">Cadastrar</v-btn>
                    </div>
            
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import api from '../api/api';
    const md5 = require("md5");
    export default {
        name: 'LoginPage',
        mixins: [api],
        data() {
            return {
                nome: "",
                email: "",
                senha:'',
            };
        },
        methods: {
            singup(){
                if(this.nome && this.email && this.senha){
                    this.post('/user/singup', {nome: this.nome, email: this.email, senha: md5(this.senha)}).then((response) => {
                        this.$router.push('/login');
                    })
                }
            }
        },
    }

</script>

<style>
.input{
    width: 100%;
}

.col{
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
}
.div2{
    width: 100%;
    background: rgba(0, 0, 0, 0.72);
    border-radius: 10px;
    padding: 10px 20px 10px 20px;
}

</style>


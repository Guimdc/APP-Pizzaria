<template>
    <v-container fluid>
        <v-row justify="center" height="100vh" width="100vw">
            <v-col cols="12" lg="4" md="6" sm="8" class="col d-flex">
                    <div class="div2 flex-column d-flex align-center">
                        <h2 class="white--text">ENTRAR NA PIZZARIA</h2>
                        <v-text-field v-model="email" class="input" label="Email" dark></v-text-field>
                        <v-text-field v-model="senha" class="input mb-4" label="Senha" dark type="password"></v-text-field>
                        <v-btn @click="login" width="100%">ENTRAR</v-btn>
                        <u style="cursor: pointer" class="cadastro white--text" @click="singup()">Não possui conta? Cadastre-se</u>
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
                email: window.localStorage.userEmail,
                senha:'',
            };
        },
        methods: {
            login(){
                if (this.email && this.senha) {
                    this.post(`/user/login`,{email:this.email, senha:md5(this.senha)}).then((response) => {
                        this.$store.commit('setAuthToken', response.data.token);
                        this.$store.commit('setUserId', response.data.user.id);
                        this.$store.commit('setUserNome', response.data.user.nome);
                        this.$store.commit('setUserEmail', response.data.user.email);
                        this.$store.commit('setPerfil', response.data.user.perfil);
                        this.$store.commit('setLogged', true);
                        if(this.$store.state.perfil=="cliente"){
                            this.$router.push('/pedido');
                        }else if(this.$store.state.perfil=="admin"){
                            this.$router.push('/dashboard');
                        }       
                    }).catch(() => {
                        this.searchOnGoing = false;
                    });
                    
                } 
            },
            singup(){
                this.$router.push('/signup');
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


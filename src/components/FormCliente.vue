<template>
  <MessegesDeAlerts
    :txt_mensagem="msg"
    :class="estiloDaMensagem"
    v-show="msg"
    :estilo="estilo"
  />
  <div class="container-md">
    <TituloPagina :titulo="titulo"/>
    <form class="w-75 m-auto" @submit.prevent="criarCadastro($event)">
      <div class="form-group">
        <label for="nome">Nome do Cliente</label>
        <input
          type="text"
          class="form-control"
          :style="campo_info"
          id="nome"
          v-model="nome"
          placeholder="Digite o nome do cliente"
        >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          :style="campo_info"
          id="email"
          v-model="email"
          placeholder="Digite o email"
        >
      </div>
      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input
          type="text"
          class="form-control"
          :style="campo_info"
          id="telefone"
          v-model="telefone"
          placeholder="Digite o telefone"
        >
      </div>
      <ButtomBase :btn_text="btn" />
    </form>
  </div>
</template>

<script>
import ButtomBase from "@/components/shared/Buttom-base";
import MessegesDeAlerts from "@/components/MessegesDeAlerts";
import TituloPagina from "@/components/shared/TituloPagina";
import { API_BASE_URL } from '@/config';

export default {
  name: "FormCliente",
  components: {
    ButtomBase,
    MessegesDeAlerts,
    TituloPagina
  },
  data() {
    return {
      btn: 'Concluir',
      titulo: 'FORMULÁRIO DE CADASTRO DE CLIENTES',
      campo_info: null,
      msg: null,
      estilo: null,
      nome: null,
      email: null,
      telefone: null
    }
  },
  methods: {
  async criarCadastro(e) {
    e.preventDefault();
    const data = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone
    };
    const dataJson = JSON.stringify(data);

    if (this.nome && this.email && this.telefone) {
      try {
        await fetch(`${API_BASE_URL}/clientes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dataJson
        });

        this.msg = `Cliente cadastrado com sucesso!`;
        this.estilo = 'sucesso';
        this.$emit('clienteCadastrado');  

      } catch (error) {
        console.log(error)
        this.msg = `Erro ao cadastrar cliente!`;
        this.estilo = 'erro';
      }
    } else {
      this.msg = 'Preencha todos os campos obrigatórios!';
      this.estilo = 'erro';
    }

    setTimeout(() => this.msg = "", 3000);
    this.nome = "";
    this.email = "";
    this.telefone = "";

    
  }
},
  computed: {
    estiloDaMensagem() {
      return this.estilo === 'sucesso' ? 'alert-success' : 'alert-danger';
    }
  }
}


</script>

<style scoped>
</style>

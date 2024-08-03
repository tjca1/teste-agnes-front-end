<template>
  <MessegesDeAlerts class="mensagem" :txt_mensagem="msg" :class="estiloDaMensagem" v-show="msg"/>

  <TituloPagina :titulo="titulo"/>

  <div class="container-md d-flex flex-wrap justify-content-lg-start m-auto">
    <div
      class="card flex-wrap mb-3 mt-3 m-lg-3"
      style="max-width: 18rem;"
      v-for="dados in clientes"
      :key="dados.id"
    >
      <div class="card-header">
        <h5 class="card-title text-capitalize">#{{ dados.id }}</h5>
      </div>
      <div class="card-body">
        <div class="card-text d-flex flex-column">
          <label>Nome</label>
          <input type="text" v-model="dados.nome">
        </div>
        <div class="card-text d-flex flex-column">
          <label for="email">Email</label>
          <input type="email" v-model="dados.email">
        </div>
        <div class="card-text d-flex flex-column">
          <label for="telefone">Telefone</label>
          <input type="text" v-model="dados.telefone">
        </div>
        <div class="div-botao">
          <ButtomBase @click.prevent="deleteCliente(dados.id)" :btn_text="excluir"/>
          <ButtomBase @click.prevent="updateCliente(dados)" :btn_text="alterar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TituloPagina from "@/components/shared/TituloPagina";
import ButtomBase from "@/components/shared/Buttom-base";
import MessegesDeAlerts from "@/components/MessegesDeAlerts";
import { API_BASE_URL } from '@/config';

export default {
  name: "ListaClientes",
  components: { TituloPagina, ButtomBase, MessegesDeAlerts },
  data() {
    return {
      titulo: "LISTA DE CLIENTES",
      msg: null,
      estilo: null,
      excluir: 'Excluir',
      alterar: 'Alterar',
      clientes: [] 
    };
  },
  methods: {
    async getClientes() {
    try {
      const req = await fetch(`${API_BASE_URL}/clientes`);
      if (!req.ok && req.status === 404) {
        this.msg = "Nenhum cliente encontrado.";
        this.estilo = 'info';
        this.clientes = []; 
      } else {
        const data = await req.json();
        this.clientes = data.length ? data : [];
        if (this.clientes.length === 0) {
          this.msg = "Nenhum cliente encontrado.";
          this.estilo = 'info';
        }
      }
    } catch (error) {
      this.msg = "Erro ao buscar clientes. Por favor, tente novamente mais tarde.";
      this.estilo = 'erro';
      console.error("Erro ao buscar clientes:", error);
    }
  },
    async deleteCliente(id) {
      try {
        await fetch(`${API_BASE_URL}/clientes/${id}`, { method: "DELETE" });
        this.msg = `Cliente de N°${id}, removido com sucesso!`;
        this.estilo = 'sucesso';
      } catch (error) {
        this.msg = `Erro ao remover cliente!`;
        this.estilo = 'erro';
      }
      setTimeout(() => this.msg = "", 3000);
      this.getClientes(); 
    },
    async updateCliente(dados) {
      try {
        const dataJson = JSON.stringify({
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone
        });

        await fetch(`${API_BASE_URL}/clientes/${dados.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: dataJson
        });

        this.msg = `Cliente de N°${dados.id} atualizado com sucesso!`;
        this.estilo = 'sucesso';
      } catch (error) {
        this.msg = `Erro ao atualizar cliente!`;
        this.estilo = 'erro';
      }
      setTimeout(() => this.msg = "", 3000);
      this.getClientes();
    }
  },
  mounted() {
    this.getClientes(); 
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

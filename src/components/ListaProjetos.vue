<template>
  <MessegesDeAlerts class="mensagem" :txt_mensagem="msg" :class="estiloDaMensagem" v-show="msg"/>

  <TituloPagina :titulo="titulo"/>

  <div class="container-md d-flex flex-wrap justify-content-lg-start m-auto">
    <div
      class="card flex-wrap mb-3 mt-3 m-lg-3"
      style="max-width: 18rem;"
      v-for="projeto in projetos"
      :key="projeto.id"
    >
      <div class="card-header">
        <h5 class="card-title text-capitalize">#{{ projeto.id }}</h5>
      </div>
      <div class="card-body">
        <div class="card-text d-flex flex-column">
          <label>Nome</label>
          <input type="text" v-model="projeto.nome">
        </div>
        <div class="card-text d-flex flex-column">
          <label>Status</label>
          <select v-model="projeto.status" @change="handleStatusChange(projeto)">
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
        <div class="card-text d-flex flex-column">
          <label>Cliente</label>
          <input disabled type="text" :value="projeto.clienteNome" readonly>
        </div>
        <div class="div-botao">
          <ButtomBase @click.prevent="deleteProjeto(projeto.id)" :btn_text="excluir"/>
          <ButtomBase @click.prevent="updateProjeto(projeto)" :btn_text="alterar"/>
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
  name: "ListaProjetos",
  components: { TituloPagina, ButtomBase, MessegesDeAlerts },
  data() {
    return {
      titulo: "LISTA DE PROJETOS",
      msg: null,
      estilo: null,
      excluir: 'Excluir',
      alterar: 'Alterar',
      projetos: [] 
    };
  },
  methods: {
    async getProjetos() {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos`);

      if (!response.ok) {
        if (response.status === 404) {
          this.msg = "Nenhum projeto encontrado.";
          this.estilo = 'info';
          this.projetos = []; 
        } else {
          throw new Error(`Erro HTTP ${response.status}`);
        }
      } else {
        const data = await response.json();
        this.projetos = data.length ? data : [];
        if (this.projetos.length === 0) {
          this.msg = "Nenhum projeto encontrado.";
          this.estilo = 'info';
        }
      }
        } catch (error) {
        this.msg = "Erro ao buscar projetos. Por favor, tente novamente mais tarde.";
        this.estilo = 'erro';
        console.error("Erro ao buscar projetos:", error);
        }
    },
    async deleteProjeto(id) {
      try {
        await fetch(`${API_BASE_URL}/projetos/${id}`, { method: "DELETE" });
        this.msg = `Projeto de N°${id}, removido com sucesso!`;
        this.estilo = 'sucesso';
      } catch (error) {
        this.msg = `Erro ao remover projeto!`;
        this.estilo = 'erro';
      }
      setTimeout(() => this.msg = "", 3000);
      this.getProjetos(); 
    },
    async updateProjeto(projeto) {
      try {
        const dataJson = JSON.stringify({
          nome: projeto.nome,
          status: projeto.status,
          clienteId: projeto.clienteId
        });

        await fetch(`${API_BASE_URL}/projetos/${projeto.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: dataJson
        });

        this.msg = `Projeto de N°${projeto.id} atualizado com sucesso!`;
        this.estilo = 'sucesso';
      } catch (error) {
        this.msg = `Erro ao atualizar projeto!`;
        this.estilo = 'erro';
      }
      setTimeout(() => this.msg = "", 3000);
      this.getProjetos();
    }
  },
  mounted() {
    this.getProjetos(); 
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

<template>
  <div>
    <MessegesDeAlerts class="mensagem" :txt_mensagem="msg" :class="estiloDaMensagem" v-show="msg"/>
    <TituloPagina :titulo="titulo"/>

    <div class="container-md d-flex flex-wrap justify-content-lg-start m-auto">
      <div
        class="card flex-wrap mb-3 mt-3 m-lg-3"
        style="max-width: 18rem;"
        v-for="atividade in atividades"
        :key="atividade.id"
      >
        <div class="card-header">
          <h5 class="card-title text-capitalize">#{{ atividade.id }}</h5>
        </div>
        <div class="card-body">
          <div class="card-text d-flex flex-column">
            <label>Nome</label>
            <input type="text" v-model="atividade.nome"/>
          </div>
          <div class="card-text d-flex flex-column">
            <label>Descrição</label>
            <input type="text" v-model="atividade.descricao"/>
          </div>
          <div class="card-text d-flex flex-column">
            <label>Projeto</label>
            <input type="text" :value="atividade.projetoNome" readonly/>
          </div>
          <div class="card-text d-flex flex-column">
            <label>Cliente</label>
            <input type="text" :value="atividade.clienteNome" readonly/>
          </div>
          <div class="div-botao">
            <ButtomBase @click.prevent="deleteAtividade(atividade.id)" :btn_text="excluir"/>
            <ButtomBase @click.prevent="updateAtividade(atividade)" :btn_text="alterar"/>
          </div>
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
  name: 'ListaAtividades',
  components: { TituloPagina, ButtomBase, MessegesDeAlerts },
  data() {
    return {
      titulo: "LISTA DE ATIVIDADES",
      msg: null,
      estilo: null,
      excluir: 'Excluir',
      alterar: 'Alterar',
      atividades: [] 
    };
  },
  methods: {
    async getAtividades() {
      try {
        const response = await fetch(`${API_BASE_URL}/atividades`);
        if (!response.ok && response.status === 404) {
          this.msg = "Nenhuma atividade encontrada.";
          this.estilo = 'info';
          this.atividades = []; 
        } else {
          const data = await response.json();
          this.atividades = data.length ? data : [];
          if (this.atividades.length === 0) {
            this.msg = "Nenhuma atividade encontrada.";
            this.estilo = 'info';
          }
        }
      } catch (error) {
        this.msg = "Erro ao buscar atividades. Por favor, tente novamente mais tarde.";
        this.estilo = 'erro';
        console.error("Erro ao buscar atividades:", error);
      }
    },
    async deleteAtividade(id) {
      try {
        await fetch(`${API_BASE_URL}/atividades/${id}`, {
          method: "DELETE"
        });
        this.msg = "Atividade excluída com sucesso!";
        this.estilo = 'sucesso';
        this.getAtividades(); 
      } catch (error) {
        this.msg = "Erro ao excluir atividade!";
        this.estilo = 'erro';
        console.error("Erro ao excluir atividade:", error);
      }
    },
    async updateAtividade(atividade) {
      const data = {
        ...atividade
      };
      const dataJson = JSON.stringify(data);

      try {
        await fetch(`${API_BASE_URL}/atividades/${atividade.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: dataJson
        });
        this.msg = "Atividade atualizada com sucesso!";
        this.estilo = 'sucesso';
      } catch (error) {
        this.msg = "Erro ao atualizar atividade!";
        this.estilo = 'erro';
        console.error("Erro ao atualizar atividade:", error);
      }
    }
  },
  computed: {
    estiloDaMensagem() {
      return this.estilo === 'sucesso' ? 'alert-success' : this.estilo === 'info' ? 'alert-info' : 'alert-danger';
    }
  },
  created() {
    this.getAtividades();
  }
}
</script>

<style scoped>
</style>

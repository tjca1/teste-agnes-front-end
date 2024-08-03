<template>
  <div>
    <TituloPagina :titulo="titulo"/>
    <div class="container">
      <FormGerenciarAtividades @adicionarClienteProjeto="adicionarClienteProjeto"/>
      <ListaGerenciarAtividades :atividades="atividades"/>
    </div>
  </div>
</template>

<script>
import TituloPagina from "@/components/shared/TituloPagina";
import FormGerenciarAtividades from "@/components/FormGerenciarAtividades";
import ListaGerenciarAtividades from "@/components/ListaGerenciarAtividades";
import { API_BASE_URL } from '@/config';

export default {
  name: 'GerenciarAtividades',
  components: { TituloPagina, FormGerenciarAtividades, ListaGerenciarAtividades },
  data() {
    return {
      titulo: "Gerenciar Atividades",
      atividades: [] 
    };
  },
  methods: {
    async fetchAtividades() {
      try {
        const response = await fetch(`${API_BASE_URL}/atividades`);
        if (response.ok) {
          this.atividades = await response.json();
        } else {
          this.atividades = [];
        }
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    },
    async adicionarClienteProjeto({ atividadeId, clienteId, projetoId }) {
      try {
        const response = await fetch(`${API_BASE_URL}/atividades/${atividadeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clienteId, projetoId })
        });
        if (response.ok) {
          this.fetchAtividades();
        }
      } catch (error) {
        console.error("Erro ao adicionar cliente e projeto à atividade:", error);
      }
    }
  },
  created() {
    this.fetchAtividades();
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 1rem;
}
</style>

<template>
  <div class="form-container">
    <div class="form-group">
      <label for="atividade">Atividade</label>
      <select v-model="selectedAtividadeId" id="atividade" class="form-control" @change="updateSelectedAtividade">
        <option v-for="atividade in atividades" :key="atividade.id" :value="atividade.id">
          {{ atividade.nome }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="cliente">Cliente</label>
      <select v-model="selectedClienteId" id="cliente" class="form-control">
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nome }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="projeto">Projeto</label>
      <select v-model="selectedProjetoId" id="projeto" class="form-control">
        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
          {{ projeto.nome }}
        </option>
      </select>
    </div>

    <ButtomBase :btn_text="btnText" @click="adicionar" />
  </div>
</template>

<script>
import ButtomBase from "@/components/shared/Buttom-base";
import { API_BASE_URL } from '@/config';

export default {
  name: 'FormGerenciarAtividades',
  components: { ButtomBase },
  data() {
    return {
      atividades: [],
      clientes: [],
      projetos: [],
      selectedAtividadeId: null,
      selectedClienteId: null,
      selectedProjetoId: null,
      btnText: 'Adicionar'
    };
  },
  methods: {
    async fetchAtividadesClientesProjetos() {
      try {
        const atividadesResponse = await fetch(`${API_BASE_URL}/atividades`);
        const clientesResponse = await fetch(`${API_BASE_URL}/clientes`);
        const projetosResponse = await fetch(`${API_BASE_URL}/projetos`);

        if (atividadesResponse.ok) this.atividades = await atividadesResponse.json();
        if (clientesResponse.ok) this.clientes = await clientesResponse.json();
        if (projetosResponse.ok) this.projetos = await projetosResponse.json();
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    async updateSelectedAtividade() {
      const atividade = this.atividades.find(a => a.id === this.selectedAtividadeId);
      if (atividade) {
        this.selectedClienteId = atividade.clienteId || null;
        this.selectedProjetoId = atividade.projetoId || null;
      }
    },
    adicionar() {
      this.$emit('adicionarClienteProjeto', {
        atividadeId: this.selectedAtividadeId,
        clienteId: this.selectedClienteId,
        projetoId: this.selectedProjetoId
      });
    }
  },
  created() {
    this.fetchAtividadesClientesProjetos();
  }
}
</script>

<style scoped>
.form-container {
  margin-bottom: 1rem;
  max-width: 600px; 
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
.form-control {
  width: 100%;
}
</style>

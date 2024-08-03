<template>
  <div class="container-md">
    <MessegesDeAlerts :txt_mensagem="msg" :class="estiloDaMensagem" v-show="msg"/>
    <TituloPagina :titulo="titulo"/>

    <form class="w-75 m-auto" @submit.prevent="criarAtividade">
      <div class="form-group">
        <label for="nome">Nome da Atividade</label>
        <input
          type="text"
          class="form-control"
          id="nome"
          v-model="nome"
          placeholder="Digite o nome da atividade"
        />
      </div>
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input
          type="text"
          class="form-control"
          id="descricao"
          v-model="descricao"
          placeholder="Digite a descrição"
        />
      </div>
      <div class="form-group">
        <label for="projeto">Projeto</label>
        <select v-model="projetoId" class="form-control">
          <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
            {{ projeto.nome }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="cliente">Cliente</label>
        <select v-model="clienteId" class="form-control">
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nome }}
          </option>
        </select>
      </div>
      <ButtomBase :btn_text="btn"/>
    </form>
  </div>
</template>

<script>
import ButtomBase from "@/components/shared/Buttom-base";
import MessegesDeAlerts from "@/components/MessegesDeAlerts";
import TituloPagina from "@/components/shared/TituloPagina";
import { API_BASE_URL } from '@/config';

export default {
  name: 'FormAtividade',
  components: {
    ButtomBase,
    MessegesDeAlerts,
    TituloPagina
  },
  data() {
    return {
      btn: 'Concluir',
      titulo: 'FORMULÁRIO DE CADASTRO DE ATIVIDADES',
      msg: null,
      estilo: null,
      nome: null,
      descricao: null,
      projetoId: null,
      clienteId: null,
      projetos: [],
      clientes: []
    }
  },
  async created() {
    await this.getProjetos();
    await this.getClientes();
  },
  methods: {
    async getProjetos() {
      try {
        const response = await fetch(`${API_BASE_URL}/projetos`);
        const data = await response.json();
        this.projetos = data;
      } catch (error) {
        this.msg = "Erro ao buscar projetos. Por favor, tente novamente mais tarde.";
        this.estilo = 'erro';
        console.error("Erro ao buscar projetos:", error);
      }
    },
    async getClientes() {
      try {
        const response = await fetch(`${API_BASE_URL}/clientes`);
        const data = await response.json();
        this.clientes = data;
      } catch (error) {
        this.msg = "Erro ao buscar clientes. Por favor, tente novamente mais tarde.";
        this.estilo = 'erro';
        console.error("Erro ao buscar clientes:", error);
      }
    },
    async criarAtividade() {
      const data = {
        nome: this.nome,
        descricao: this.descricao,
        projetoId: this.projetoId,
        clienteId: this.clienteId
      };
      const dataJson = JSON.stringify(data);

      if (this.nome && this.descricao && this.projetoId && this.clienteId) {
        try {
          await fetch(`${API_BASE_URL}/atividades`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson
          });

          this.msg = "Atividade cadastrada com sucesso!";
          this.estilo = 'sucesso';
          this.$emit('atividadeCadastrada');

        } catch (error) {
          this.msg = "Erro ao cadastrar atividade!";
          this.estilo = 'erro';
          console.error("Erro ao cadastrar atividade:", error);
        }
      } else {
        this.msg = "Preencha todos os campos obrigatórios!";
        this.estilo = 'erro';
      }

      setTimeout(() => this.msg = "", 3000);
      this.nome = "";
      this.descricao = "";
      this.projetoId = null;
      this.clienteId = null;
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

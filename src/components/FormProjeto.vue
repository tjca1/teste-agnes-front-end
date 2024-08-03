<template>
  <MessegesDeAlerts
    :txt_mensagem="msg"
    :class="estiloDaMensagem"
    v-show="msg"
    :estilo="estilo"
  />
  <div class="container-md">
    <TituloPagina :titulo="titulo"/>
    <form class="w-75 m-auto" @submit.prevent="criarProjeto($event)">
      <div class="form-group">
        <label for="nome">Nome do Projeto</label>
        <input
          type="text"
          class="form-control"
          :style="campo_info"
          id="nome"
          v-model="nome"
          placeholder="Digite o nome do projeto"
        />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select
          class="form-control"
          :style="campo_info"
          id="status"
          v-model="status"
        >
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDO">Concluído</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cliente">Cliente</label>
        <select
          class="form-control"
          :style="campo_info"
          id="cliente"
          v-model="clienteId"
        >
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nome }}
          </option>
        </select>
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
  name: "FormProjeto",
  components: {
    ButtomBase,
    MessegesDeAlerts,
    TituloPagina
  },
  data() {
    return {
      btn: 'Concluir',
      titulo: 'FORMULÁRIO DE CADASTRO DE PROJETOS',
      campo_info: null,
      msg: null,
      estilo: null,
      nome: '',
      status: 'EM_ANDAMENTO',
      clienteId: null,
      clientes: [] 
    }
  },
  async created() {
   
    try {
      const response = await fetch(`${API_BASE_URL}/clientes`);
      this.clientes = await response.json();
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  },
  methods: {
    async criarProjeto(e) {
      e.preventDefault();
      const data = {
        nome: this.nome,
        status: this.status,
        clienteId: this.clienteId
      };
      const dataJson = JSON.stringify(data);

      if (this.nome && this.status && this.clienteId) {
        try {
          await fetch(`${API_BASE_URL}/projetos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson
          });

          this.msg = `Projeto cadastrado com sucesso!`;
          this.estilo = 'sucesso';
          this.$emit('projetoCadastrado');  
        } catch (error) {
          this.msg = `Erro ao cadastrar projeto!`;
          this.estilo = 'erro';
        }
      } else {
        this.msg = 'Preencha todos os campos obrigatórios!';
        this.estilo = 'erro';
      }

      setTimeout(() => this.msg = "", 3000);
      this.nome = "";
      this.status = "EM_ANDAMENTO";
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

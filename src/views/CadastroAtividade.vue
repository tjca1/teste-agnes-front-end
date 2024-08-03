<template>
  <div>
    <FormAtividade @atividadeCadastrada="atualizarListaAtividades"/>
    <ListaAtividades ref="listaAtividades"/>
  </div>
</template>

<script>
import FormAtividade from "@/components/FormAtividade";
import ListaAtividades from "@/components/ListaAtividades";

export default {
  name: 'CadastroAtividade',
  components: {
    FormAtividade,
    ListaAtividades
  },
  methods: {
    atualizarListaAtividades() {
      if (this.$refs.listaAtividades && this.$refs.listaAtividades.getAtividades) {
        this.$refs.listaAtividades.getAtividades();
      } else {
        console.error("Erro ao acessar o método getAtividades no componente ListaAtividades.");
      }
    }
  }
}
</script>

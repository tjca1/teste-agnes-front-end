<template>
  <div>
    <div class="card-img-left home">
      <FormProjeto @projetoCadastrado="atualizarListaProjetos"/>
    </div>
    <div class="card-img-left home">
      <ListaProjetos ref="listaProjetos"/>
    </div>
  </div>
</template>

<script>
import FormProjeto from "@/components/FormProjeto";
import ListaProjetos from "@/components/ListaProjetos";

export default {
  name: 'CadastroProjeto',
  components: {
    FormProjeto,
    ListaProjetos
  },
  methods: {
    atualizarListaProjetos() {
      if (this.$refs.listaProjetos && this.$refs.listaProjetos.getProjetos) {
        this.$refs.listaProjetos.getProjetos();
      } else {
        console.error("Erro ao acessar o método getProjetos no componente ListaProjetos.");
      }
    }
  }
}
</script>

<style scoped>

</style>

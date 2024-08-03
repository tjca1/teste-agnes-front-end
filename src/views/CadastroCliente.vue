<template>
  <div class="card-img-left home">
    <FormCliente @clienteCadastrado="atualizarListaClientes"/>
  </div>
  <div class="card-img-left home">
    <ListaClientes ref="listaClientes"/>
  </div>
</template>

<script>
import FormCliente from "@/components/FormCliente";
import ListaClientes from "@/components/ListaClientes";

export default {
  name: 'CadastroCliente',
  components: {
    FormCliente,
    ListaClientes
  },
  methods: {
    atualizarListaClientes() {
      if (this.$refs.listaClientes && this.$refs.listaClientes.getClientes) {
        this.$refs.listaClientes.getClientes();
      } else {
        console.error("Erro ao acessar o método getClientes no componente ListaClientes.");
      }
    }
  }
}
</script>

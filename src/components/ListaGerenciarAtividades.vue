<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Atividade</th>
          <th>Projetos</th>
          <th>Clientes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="atividade in atividades" :key="atividade.id">
          <td>{{ atividade.nome }}</td>
          <td>
            <ul>
              <li>{{ atividade.projetoNome }}</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>{{ atividade.clienteNome }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListaGerenciarAtividades',
  props: {
    atividades: Array
  }
}
</script>

<style scoped>
.table {
  margin-bottom: 1rem;
}
</style>

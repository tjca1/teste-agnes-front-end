import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/CadastroCliente.vue')
  },
  {
    path: '/cadastro_clientes',
    name: 'cadastroClientes',
    component: () => import( '../views/CadastroCliente.vue')
  },
  {
    path: '/cadastro_projetos',
    name: 'cadastroProjetos',
    component: () => import( '../views/CadastroProjeto.vue')
  },
  {
    path: '/cadastro_atividades',
    name: 'cadastroAtividades',
    component: () => import( '../views/CadastroAtividade.vue')
  },
  {
    path: '/gerenciar-atividades',
    name: 'GerenciarAtividades',
    component: () => import( '../views/GerenciarAtividades.vue')
  }



  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

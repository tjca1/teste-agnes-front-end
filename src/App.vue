<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
    <div class="container-md ">
      <a class="navbar-brand" href="#">
        <img src="./assets/logo-do-agnes.png" width="50" height="30" class="d-inline-block align-top" alt="">
      </a>

    <div class="container-md">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Alterna navegação">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav">
       
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cadastro
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" to="/cadastro_clientes">Cliente</router-link></li>
            <li><router-link class="dropdown-item" to="/cadastro_projetos">Projeto</router-link></li>
            <li><router-link class="dropdown-item" to="/cadastro_atividades">Atividade</router-link></li>
          </ul>
        </div>
      <div>  <router-link class="nav-link" to="/gerenciar-atividades">Gerencia Atividades</router-link></div>

      </div>
    </div>
  </div>
    </div>
  </nav>
  <router-view/>
</template>

<style>

</style>

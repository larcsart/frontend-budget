<template>
  <div class="header">
      <div class="content">
        <div class="representative">
          <div class="avatar">R</div>
          <span class="name">Representante</span>
        </div>
        <div class="buttons">
          <button
            class="new-order"
            v-if="$route.name === 'Home'"
            @click="$router.push('/new-order')">
            <v-icon name="plus-circle"></v-icon> Novo Pedido
          </button>
          <!-- <button class="new-product" v-if="$route.name === 'Products'">
            New Product
          </button> -->
        </div>
      </div>
    </div>
</template>

<style lang="sass">
  @import "./Header.scss"

</style>

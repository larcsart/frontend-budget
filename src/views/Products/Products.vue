<template>
  <div class="products">
    <div class="content">
      <div class="add-product">
        <div class="title">
          <v-icon name="box" ></v-icon>
          <h1>Produtos</h1>
        </div>

        <form @submit="addProduct">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            required
            v-model="product.name"
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            required
            v-model="product.price"
          />
          <input
            type="number"
            name="weight"
            placeholder="Peso"
            required
            v-model="product.weight"
          />
          <button type="submit" :disabled="loading">
            <v-icon name="plus-circle"></v-icon>
            <span>Adicionar Produto</span>
          </button>
        </form>
      </div>

      <Table :headers="headers" :items="listProducts" />

    </div>
  </div>
</template>

<script src="./Products.js"></script>

<style lang="sass">
  @import "./Products.scss"
</style>

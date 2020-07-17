<template>
  <div class="order">
    <div class="content">
      <div class="command">
        <div class="title">
          <v-icon name="shopping-cart"></v-icon>
          <h1>
            Pedido {{ idOrder }}
          </h1>
          <div class="status" v-show="idStatus === 1">
              <span>status:</span>
              <div class="orcamento">Orçamento</div>
          </div>
          <div class="status" v-show="idStatus === 2">
            <span>status:</span>
            <div class="pedido">Pedido</div>
          </div>
        </div>

        <form @submit="addProduct">
          <span>Produto: </span>
          <select
            class="productSelect"
            id="productSelect"
            name="productSelect"
            v-model="productSelect"
            :disabled="idStatus === 2"
          >
            <option
              v-for="(product, productIndex) in products"
              :key="productIndex"
              :value="productIndex"
            >
              {{ product.name }}
            </option>
          </select>
          <button
            type="submit"
            class="addProduct"
            :class="{'button-disabled': idStatus === 2}"
            :disabled="idStatus === 2"
          >
            <v-icon name="plus-circle"></v-icon> <span>Adicionar Product</span>
          </button>
        </form>
      </div>

      <Table :headers="headers" :items="listProducts" />

      <div class="resume">
        <div class="totals">
          <Total :icon="'dollar-sign'" :label="'Preço Total'" :value="totalPrice"/>
          <Total :icon="'truck'" :label="'Peso Total'" :value="totalWeight"/>
          <Total :icon="'layers'" :label="'Quantidade Total'" :value="totalAmount"/>
        </div>
        <div class="buttons" v-show="!loadingSave">
          <button
            :class="{
              'button-actived': hasProduct,
              'button-disabled': !hasProduct
            }"
            :disabled="!hasProduct"
            @click="saveOrder"
          >
            Salvar
          </button>
          <button
            :class="{
              'button-disabled' : !canFinalize,
              'button-actived': canFinalize,
            }"
            :disabled="!canFinalize"
            @click="finalizeOrder"
          >
            Finalizar
          </button>
        </div>
        <div class="loading" v-show="loadingSave">
          <Loading />
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./Order.js"></script>

<style lang="sass">
  @import "./Order.scss"
</style>

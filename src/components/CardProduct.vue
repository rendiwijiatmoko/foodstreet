<template>
  <div class="card card-product">
  <img :src="'assets/images/' + product.gambar" class="card-img-top" alt="..." width="367" height="270">
  <div class="card-body">
    <h5 class="card-title">{{product.nama}}</h5>
    <p class="card-text">
      Harga : Rp {{product.harga}}
    </p>
    <router-link :to="url" class="btn btn-success"><b-icon-cart/> Pesan</router-link>
  </div>
</div>
</template>

<script>
export default {
    name:'CardProduct',
    props:['product'],
    computed:{
      url(){
        return `/food/${this.product.id}`
      }
    }
}
</script>

<style>

</style>
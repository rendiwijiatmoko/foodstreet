<template>
  <div class="cart">
    <Navbar :updateKeranjangs="keranjangs" />
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <!-- breadcrumb -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>

              <li class="breadcrumb-item active" aria-current="page">
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in keranjangs" :key="data.id">
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="`../assets/images/` + data.products.gambar"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ data.products.nama }}</strong>
                  </td>
                  <td>{{ data.keterangan ? data.keterangan : "-" }}</td>
                  <td>{{ data.jumlah_pemesanan }}</td>
                  <td align="right">Rp {{ data.products.harga }}</td>
                  <td align="right">
                    <strong
                      >Rp
                      {{ data.products.harga * data.jumlah_pemesanan }}</strong
                    >
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusKeranjang(data.id)" />
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga: </strong>
                  </td>
                  <td align="right">
                    <strong> Rp {{ totalHarga }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama: </label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja: </label>
              <input
                type="number"
                class="form-control"
                v-model="pesan.noMeja"
              />
            </div>
            <button
              type="submit"
              class="btn btn-success float-right"
              @click="checkout"
            >
              <b-icon-cart /> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      keranjangs: [],
      pesan: {},
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then(() => {
          this.$toast.error("Sukses Hapus keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissable: true,
          });

          axios
            .get(`http://localhost:3000/keranjangs`)
            .then((response) => this.setKeranjangs(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;

        axios
          .post("http://localhost:3000/pesanans", this.pesan)
          .then(() => {
            // Hapus keranjang
            this.keranjangs.map((item) => {
              return axios
                .delete(`http://localhost:3000/keranjangs/${item.id}`)
                .catch((err) => console.log(err));
            });
             
            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Sukses dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissable: true,
            });
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.error("Nama dan Nomor meja harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissable: true,
        });
      }
      // console.log(this.pesan, "haisl")
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/keranjangs`)
      .then((response) => this.setKeranjangs(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce((items, data) => {
        return items + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>

<style>
</style>
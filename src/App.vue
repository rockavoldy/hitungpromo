<template>
  <div id="app">
    <div class="container mx-auto mt-2">
      <div id="header" class="text-center">
        <h1 class="text-lg capitalize">Hitung Promo</h1>
        <h2 class="text-base">
          Sebuah kalkulator sederhana untuk membagi diskon secara merata ke
          setiap item
        </h2>
      </div>

      <div>
        <button class="my-2" @click="addItem()"><BtnAddItem /></button>
        <table class="table w-full border">
          <thead>
            <tr class="table-row flex flex-wrap text-center bg-gray-400">
              <th class="table-cell py-1 w-4/12">Nama</th>
              <th class="table-cell py-1">Harga</th>
              <th class="table-cell py-1">Jumlah</th>
              <th class="table-cell py-1">Total</th>
              <th class="table-cell py-1">Hapus</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in listItems" :key="index">
            <tr
              class="table-row flex flex-wrap text-center"
              :class="index % 2 == 0 ? 'bg-gray-100' : 'bg-gray-200'"
            >
              <td class="table-cell px-2 py-1 border">
                <input
                  class="border rounded w-full py-1 px-2 text-gray-700 leading-tight"
                  v-model="item.nama"
                  placeholder="Beef Burger"
                />
              </td>
              <td class="table-cell px-2 py-1 border">
                <input
                  type="number"
                  min="0"
                  class="border w-full rounded py-1 px-2 text-gray-700 leading-tight"
                  v-model="item.harga"
                  placeholder="10000"
                />
              </td>
              <td class="table-cell px-2 py-1 border flex">
                <input
                  type="number"
                  min="1"
                  max="999"
                  class="border rounded py-1 pl-2 pr-1 text-gray-700 leading-tight"
                  v-model="item.jumlah"
                  placeholder="1"
                />
              </td>
              <td class="table-cell px-2 py-1 border">
                <div
                  class="border bg-white w-full rounded py-1 px-2 leading-tight"
                >
                  {{ (item.harga * item.jumlah) | currency }}
                </div>
              </td>
              <td class="table-cell px-2 py-1 border">
                <button class="my-1" @click="removeItem(index)">
                  <BtnRemoveItem />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BtnAddItem from "@/components/BtnAddItem.vue";
import BtnRemoveItem from "@/components/BtnRemoveItem.vue";
export default {
  name: "App",
  components: {
    BtnAddItem,
    BtnRemoveItem,
  },
  data() {
    return {
      listItems: [
        {
          nama: "",
          harga: 10000,
          jumlah: 1,
        },
      ],
    };
  },
  methods: {
    addItem() {
      this.listItems.push({ nama: "", harga: 10000, jumlah: 1 });
    },
    removeItem(index) {
      if (this.listItems.length === 1) {
        return false;
      }
      this.listItems.splice(index, 1);
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

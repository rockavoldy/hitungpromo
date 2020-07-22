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
        <div class="flex flex-wrap justify-between px-2 my-2 md:px-0">
          <button @click="addItem()" :class="steps == 1 ? '' : 'hidden'">
            <BtnAddItem />
          </button>
          <button @click="steps--" :class="steps != 1 ? '' : 'hidden'">
            <BtnPrev />
          </button>
          <button @click="steps++" :class="steps != 3 ? '' : 'hidden'">
            <BtnNext />
          </button>
        </div>
        <div v-if="steps == 1">
          <table class="hidden md:table w-full border">
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
                :class="index % 2 == 0 ? 'bg-gray-100' : 'bg-gray-300'"
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
                    class="border bg-white w-full rounded py-1 px-2 leading-tight inline-block text-left"
                  >{{ (item.harga * item.jumlah) | currency }}</div>
                </td>
                <td class="table-cell px-2 py-1 border">
                  <button class="my-1" @click="removeItem(index)">
                    <BtnRemoveItem />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            class="table w-full border md:hidden"
            v-for="(item, index) in listItems"
            :key="index"
          >
            <thead>
              <tr class="table-row flex flex-wrap text-center bg-gray-400">
                <th class="table-cell px-2 py-1 border">Item</th>
                <th class="table-cell px-2 py-1 border">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-row flex flex-wrap text-left"
                :class="index % 2 == 0 ? 'bg-gray-100' : 'bg-gray-200'"
              >
                <td class="table-cell px-2 py-1 border">
                  <tr class="table-row">
                    <td class="table-cell px-2 py-1">
                      <label :for="'itemNama' + index">Nama</label>
                      <input
                        :id="'itemNama' + index"
                        class="border rounded w-full py-1 px-2 text-gray-700 leading-tight"
                        v-model="item.nama"
                        placeholder="Beef Burger"
                      />
                    </td>
                  </tr>
                  <tr class="table-row">
                    <td class="table-cell px-2 py-1">
                      <tr class="table-row">
                        <td class="table-cell">
                          <label :for="'itemHarga' + index">Harga</label>
                          <input
                            :id="'itemHarga' + index"
                            type="number"
                            min="0"
                            class="border rounded w-full py-1 px-2 text-gray-700 leading-tight"
                            v-model="item.harga"
                            placeholder="10000"
                          />
                        </td>
                        <td class="table-cell">
                          <label :for="'itemQty' + index">Qty</label>
                          <input
                            :id="'itemQty' + index"
                            type="number"
                            min="1"
                            max="999"
                            class="border rounded w-full py-1 pl-2 pr-1 text-gray-700 leading-tight"
                            v-model="item.jumlah"
                            placeholder="1"
                          />
                        </td>
                      </tr>
                    </td>
                  </tr>
                  <tr class="table-row">
                    <td class="table-cell px-2 py-1">
                      <label :for="'itemTotal' + index">Total</label>
                      <div
                        :id="'itemTotal' + index"
                        class="border w-full rounded py-1 px-2 leading-tight inline-block text-left"
                      >{{ (item.harga * item.jumlah) | currency }}</div>
                    </td>
                  </tr>
                </td>

                <td class="table-cell px-2 py-1 border text-center">
                  <button class="my-1" @click="removeItem(index)">
                    <BtnRemoveItem />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="steps == 2">
          <table class="table w-full border">
            <thead>
              <tr class="table-row flex flex-wrap text-center bg-gray-400">
                <th class="table-cell py-1 w-auto">No</th>
                <th class="table-cell py-1 w-6/12">Nama</th>
                <th class="table-cell py-1 w-auto">Jumlah</th>
                <th class="table-cell py-1 w-4/12">Total</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in listItems" :key="index">
              <tr
                class="table-row flex flex-wrap text-center"
                :class="index % 2 == 0 ? 'bg-gray-100' : 'bg-gray-300'"
              >
                <th class="table-cell py-1">{{ index + 1 }}</th>
                <td class="table-cell px-2 py-1 border text-left">
                  <span>{{ item.nama }}</span>
                </td>
                <td class="table-cell px-2 py-1 border">
                  <span>{{ item.jumlah }}</span>
                </td>
                <td class="table-cell px-2 py-1 border">
                  <span>{{ (item.harga * item.jumlah) | currency }}</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-row bg-gray-400">
                <td class="table-cell text-right border pr-2" colspan="3">Subtotal</td>
                <td class="table-cell border pl-1">
                  <span>{{ subtotal | currency }}</span>
                </td>
              </tr>
              <tr class="table-row bg-gray-400">
                <td class="table-cell text-right border pr-2" colspan="3">Grand total</td>
                <td class="table-cell border pl-1">
                  <span>{{ grandtotal | currency }}</span>
                </td>
              </tr>
              <tr class="table-row bg-gray-400 border">
                <td class="table-cell border px-2 py-1" colspan="4">
                  <div class="flex flex-wrap">
                    <div class="w-3/12 text-right pr-2 text-gray-900 text-sm md:text-md">
                      <label for="diskon">Diskon</label>
                    </div>
                    <div class="w-auto">
                      <input
                        id="diskon"
                        type="number"
                        min="0"
                        max="999999999"
                        class="border rounded py-1 px-2 text-gray-700 leading-tight"
                        v-model="diskon"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="table-row bg-gray-400 border">
                <td class="table-cell border px-2 py-1" colspan="4">
                  <div class="flex flex-wrap">
                    <div class="w-3/12 text-right pr-2 text-gray-900 text-sm md:text-md">
                      <label for="ongkir">Delivery</label>
                    </div>
                    <div class="w-auto">
                      <input
                        id="ongkir"
                        type="number"
                        min="0"
                        max="999999999"
                        class="border rounded py-1 px-2 text-gray-700 leading-tight"
                        v-model="ongkir"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="table-row bg-gray-400 border">
                <td class="table-cell border px-2 py-1" colspan="4">
                  <div class="flex flex-wrap">
                    <div class="w-3/12 text-right pr-2 text-gray-900 text-sm md:text-md">
                      <label for="pajak">PPN 10%</label>
                    </div>
                    <div class="w-auto">
                      <span>
                        <input
                          id="pajak"
                          class="text-gray-700 leading-tight"
                          type="checkbox"
                          v-model="ppn"
                        />
                        <label for="pajak" class="text-xs md:text-sm text-gray-700 px-1 py-2">
                          <span class="text-red-500">*</span>Jika Subtotal belum termasuk PPN
                        </label>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnAddItem from "@/components/BtnAddItem.vue";
import BtnNext from "@/components/BtnNext.vue";
import BtnPrev from "@/components/BtnPrev.vue";
import BtnRemoveItem from "@/components/BtnRemoveItem.vue";
export default {
  name: "App",
  components: {
    BtnAddItem,
    BtnRemoveItem,
    BtnPrev,
    BtnNext
  },
  data() {
    return {
      steps: 1,
      diskon: 0,
      ongkir: 0,
      ppn: false,
      listItems: [
        {
          nama: "Beef Burger",
          harga: 10000,
          jumlah: 1
        }
      ]
    };
  },
  computed: {
    subtotal() {
      let ret = 0;
      this.listItems.forEach(el => {
        ret += el.harga * el.jumlah;
      });

      return ret;
    },
    grandtotal() {
      return this.subtotal + (this.ppn ? this.subtotal / 10 : 0);
    }
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
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

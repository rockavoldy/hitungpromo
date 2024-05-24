<template>
  <div id="app">
    <nav
      class="w-full fixed top-0 left-0 right-0 bg-gray-700 flex flex-wrap items-center justify-between md:justify-center px-3 py-2"
    >
      <div class="text-center w-full mb-2 block md:hidden">
        <h1 class="font-bold text-white">Hitung Promo</h1>
        <p class="text-xs text-gray-100">
          Sebuah kalkulator sederhana untuk membagi diskon secara merata ke
          setiap item
        </p>
      </div>
      <div class="md:w-3/12 flex justify-start">
        <BtnAddItem
          @click.native="addItem()"
          :class="steps == 1 ? '' : 'hidden'"
        />
        <BtnPrev @click.native="steps--" :class="steps != 1 ? '' : 'hidden'" />
      </div>
      <div class="md:w-6/12 text-center hidden md:block">
        <h1 class="font-bold text-white">Hitung Promo</h1>
        <p class="text-sm text-gray-100">
          Sebuah kalkulator sederhana untuk membagi diskon secara merata ke
          setiap item
        </p>
      </div>
      <div class="md:w-3/12 flex text-right justify-end">
        <BtnNext @click.native="steps++" :class="steps != 3 ? '' : 'hidden'" />
        <BtnInstall
          :class="steps == 3 ? '' : 'hidden'"
          v-if="deferredPrompt != null"
          @click.native="install()"
        />
      </div>
    </nav>
    <div class="container mx-auto mt-32 md:mt-20">
      <div>
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
                  >
                    {{ (item.harga * item.jumlah) | currency }}
                  </div>
                </td>
                <td class="table-cell px-2 py-1 border">
                  <BtnRemoveItem @click.native="removeItem(index)" />
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
                      >
                        {{ (item.harga * item.jumlah) | currency }}
                      </div>
                    </td>
                  </tr>
                </td>

                <td class="table-cell px-2 py-1 border text-center">
                  <BtnRemoveItem @click.native="removeItem(index)" />
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
                <td class="table-cell text-right border pr-2" colspan="3">
                  Subtotal
                </td>
                <td class="table-cell border pl-1">
                  <span>{{ subtotal | currency }}</span>
                </td>
              </tr>
              <tr class="table-row bg-gray-400">
                <td class="table-cell text-right border pr-2" colspan="3">
                  Grand total
                </td>
                <td class="table-cell border pl-1">
                  <span>{{ grandtotal | currency }}</span>
                </td>
              </tr>
              <tr class="table-row bg-gray-400 border">
                <td class="table-cell border px-2 py-1" colspan="4">
                  <div class="flex flex-wrap">
                    <div
                      class="w-3/12 text-right pr-2 pt-1 text-gray-900 text-sm md:text-md"
                    >
                      <label for="diskon">Discount</label>
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
                    <div
                      class="w-3/12 text-right pr-2 pt-1 text-gray-900 text-sm md:text-md"
                    >
                      <label for="ongkir">Delivery & Services</label>
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
                    <div
                      class="w-3/12 text-right pr-2 pt-1 text-gray-900 text-sm md:text-md"
                    >
                      <label for="pajak">Pajak</label>
                    </div>
                    <div class="w-auto">
                      <input
                        id="ppn"
                        type="number"
                        min="0"
                        max="100"
                        class="border rounded py-1 px-2 text-gray-700 leading-tight"
                        v-model="ppn"
                      />&nbsp;%
                      <span>
                        <label
                          for="pajak"
                          class="text-xs md:text-sm text-gray-700 px-1 py-2"
                        >
                          <span class="text-red-500">*</span>Isi dengan persen
                          jika total belum termasuk pajak (PPN, Service tax)
                        </label>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="steps == 3">
          <table class="table w-full border">
            <thead>
              <tr class="table-row flex flex-wrap text-center bg-gray-400">
                <th class="table-cell py-1 w-4/12">Nama</th>
                <th class="table-cell py-1">Harga</th>
                <th class="table-cell py-1">Diskon</th>
                <th class="table-cell py-1">PPN ({{ this.ppn }}%)</th>
                <th class="table-cell py-1">Total</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in calculatedItems" :key="index">
              <tr
                class="table-row flex flex-wrap text-center"
                :class="index % 2 == 0 ? 'bg-gray-100' : 'bg-gray-300'"
              >
                <td class="table-cell px-2 py-1 border">
                  <span
                    class="rounded w-full py-1 px-2 text-gray-700 leading-tight"
                    >{{ item.nama }}</span
                  >
                </td>
                <td class="table-cell px-2 py-1 border">
                  <span
                    class="w-full rounded py-1 px-2 text-gray-700 leading-tight"
                    >{{ item.harga | currency }}</span
                  >
                </td>
                <td class="table-cell px-2 py-1 border flex">
                  <span
                    class="rounded py-1 pl-2 pr-1 text-gray-700 leading-tight"
                    >{{ item.potongan | currency }}</span
                  >
                </td>
                <td class="table-cell px-2 py-1 border flex">
                  <span
                    class="rounded py-1 pl-2 pr-1 text-gray-700 leading-tight"
                    >{{ item.pajak | currency }}</span
                  >
                </td>
                <td class="table-cell px-2 py-1 border">
                  <div class="rounded py-1 px-2 leading-tight text-left">
                    {{ (item.total + ongkirPerItem) | currency }}
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-row flex flex-wrap text-left">
                <td class="table-cell bg-gray-400" colspan="5">
                  <span class="text-gray-700">
                    Ongkos Kirim/item:&nbsp;{{ ongkirPerItem | currency }}
                  </span>
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
import BtnAddItem from '@/components/BtnAddItem.vue';
import BtnNext from '@/components/BtnNext.vue';
import BtnInstall from '@/components/BtnInstall.vue';
import BtnPrev from '@/components/BtnPrev.vue';
import BtnRemoveItem from '@/components/BtnRemoveItem.vue';
export default {
  name: 'App',
  components: {
    BtnAddItem,
    BtnRemoveItem,
    BtnPrev,
    BtnNext,
    BtnInstall,
  },
  data() {
    return {
      steps: 1,
      diskon: 0,
      ongkir: 0,
      ppn: 0,
      listItems: [
        {
          nama: 'Beef Burger',
          harga: 10000,
          jumlah: 1,
        },
      ],
      ongkirPerItem: 0,
      calculatedItems: [],
      defferedPrompt: null,
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });
    if (this.$workbox) {
      this.$workbox.addEventListener('waiting', () => {
        this.showUpdateUI = true;
      });
    }
  },
  watch: {
    steps: function(val) {
      if (val == 3) {
        this.calculate();
      }
    },
  },
  computed: {
    subtotal() {
      let ret = 0;
      this.listItems.forEach((el) => {
        ret += el.harga * el.jumlah;
      });

      return ret;
    },
    grandtotal() {
      const netPrice = this.subtotal - this.diskon;
      const totlaPpn = this.ppn ? netPrice * (this.ppn / 100) : 0;
      return netPrice + totlaPpn + Number(this.ongkir);
    },
    persenDiskon() {
      return Math.abs(Number(this.diskon)) / this.grandtotal;
    },
  },
  methods: {
    async dismiss() {
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
    addItem() {
      this.listItems.push({ nama: '', harga: 10000, jumlah: 1 });
    },
    removeItem(index) {
      if (this.listItems.length === 1) {
        return false;
      }
      this.listItems.splice(index, 1);
    },
    calculate() {
      let calculatedItems = [];
      this.listItems.forEach((el) => {
        let harga = Number(el.harga);
        const proporsi = harga / this.subtotal;
        const potongan = proporsi * this.diskon;
        const pajak = this.ppn ? (harga - potongan) * (this.ppn / 100) : 0;
        calculatedItems.push({
          nama: el.nama,
          harga: Number(harga),
          pajak: Number(pajak),
          potongan: Number(potongan),
          total: Number(Math.round(harga - potongan) + pajak),
        });
      });
      this.ongkirPerItem = Math.round(this.ongkir / calculatedItems.length);
      this.calculatedItems = calculatedItems;
    },
  },
};
</script>

<style>
body {
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

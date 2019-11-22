<template>
  <div class="container mx-auto">
    <div class="text-center p-5">
      <h1 class="text-lg">Hitung Promo</h1>
      <h2 class="text-base">Aplikasi untuk menghitung dan membagi promo agar terbagi rata</h2>
      <div class="text-right p-2">
        <button class="bg-blue-500 hover:bg-blue-700 py-2 px-2 rounded" @click="addItems">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="#FFFFFF"
              d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
            />
          </svg>
        </button>
      </div>
      <div class="rounded shadow-lg items-center flex align-center w-full bg-gray-200 flex-wrap">
        <div class="table w-full border">
          <div class="table-row flex flex-wrap bg-gray-400 text-center">
            <div class="table-cell p-2 w-auto">
              <label class="block text-gray-700 font-bold">No.</label>
            </div>
            <div class="table-cell p-2 w-4/12">
              <label class="block text-gray-700 font-bold">Nama</label>
            </div>
            <div class="table-cell p-2 w-3/12">
              <label class="block text-gray-700 font-bold">Harga</label>
            </div>
            <div class="table-cell p-2 w-1/12">
              <label class="block text-gray-700 font-bold">Jumlah</label>
            </div>
            <div class="table-cell p-2 w-3/12">
              <label class="block text-gray-700 font-bold">Total</label>
            </div>
            <div class="table-cell p-2 w-1/12">
              <label class="block text-gray-700 font-bold">Aksi</label>
            </div>
          </div>
          <div
            class="table-row flex flex-wrap"
            :class="((index%2 === 0) ? 'bg-gray-500' : 'bg-gray-400')"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="table-cell w-auto p-3 border">
              <label class="block text-gray-700 font-bold">{{ index + 1 }}</label>
            </div>
            <div class="table-cell w-2/6 p-3 border">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="item.nama"
                placeholder="Beef Burger"
              />
            </div>
            <div class="table-cell w-1/6 p-3 border">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="item.harga"
                v-mask="'#########'"
                placeholder="10000"
              />
            </div>
            <div class="table-cell w-1/6 p-2 border">
              <span class="inline-block">
                <svg
                  viewBox="0 0 24 24"
                  class="h-6 w-6 text-gray-700 fill-current hover:text-gray-900"
                  @click="item.jumlah++"
                >
                  <path
                    d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
                  />
                </svg>
                {{ item.jumlah }}
                <svg
                  viewBox="0 0 24 24"
                  class="h-6 w-6 text-gray-700 fill-current hover:text-gray-900"
                  @click="item.jumlah > 1 ? item.jumlah-- : false"
                >
                  <path
                    d="M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
                  />
                </svg>
              </span>
            </div>
            <div class="table-cell w-1/6 p-3 border">
              <span>{{ item.harga * item.jumlah | currency }}</span>
            </div>
            <div class="table-cell w-1/6 p-3 border">
              <button
                class="bg-blue-500 hover:bg-blue-700 font-bold p-2 h-8 w-8 rounded-full"
                @click="removeItem(index)"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4">
                  <path
                    fill="#FFFFFF"
                    d="M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="table-row flex flex-wrap">
            <div class="table-cell px-2 w-auto"></div>
            <div class="table-cell px-2 w-2/6"></div>
            <div class="table-cell px-2 w-1/6"></div>
            <div class="table-cell px-2 w-1/6">
              <label class="block text-gray-700 font-bold mb-1 mb-0 pr-4">Total</label>
            </div>
            <div class="table-cell px-2 w-1/6 p-2">{{ subtotal | currency }}</div>
          </div>
          <div class="table-row flex flex-wrap">
            <div class="table-cell px-2 w-auto"></div>
            <div class="table-cell px-2 w-2/6"></div>
            <div class="table-cell px-2 w-1/6"></div>
            <div class="table-cell px-2 w-1/6">
              <label class="block text-gray-700 font-bold mb-1 mb-0 pr-4">Grand Total</label>
            </div>
            <div class="table-cell px-2 w-1/6 p-2">{{ subtotalWithTax | currency }}</div>
          </div>
        </div>
        <div class="flex w-full">
          <div class="p-2 w-2/6 flex">
            <div class="w-1/3 py-2">
              <label class="block text-gray-500 font-bold text-right mb-1 mb-0 pr-4">Discount</label>
            </div>
            <div class="w-2/3">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Discount"
                v-mask="'#########'"
                v-model="discount"
              />
            </div>
          </div>
          <div class="p-2 w-2/6 flex">
            <div class="w-1/3 py-2">
              <label class="block text-gray-500 font-bold text-right mb-1 mb-0 pr-4">Ongkos Kirim</label>
            </div>
            <div class="w-2/3">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ongkos Kirim"
                v-mask="'#########'"
                v-model="ongkir"
              />
            </div>
          </div>
          <div class="p-3 w-1/6">
            <label class="block text-gray-500 font-bold text-right mb-1 mb-0 pr-4">
              <input type="checkbox" v-model="pajak" />
              <span class="text-sm">belum PPN 10%</span>
            </label>
          </div>
          <div class="p-2 w-1/6 text-right">
            <button class="bg-blue-500 hover:bg-blue-700 py-2 px-2 rounded" @click="calculate">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="#FFFFFF"
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="rounded shadow-lg items-center flex align-center w-full bg-gray-200 flex-wrap mt-20"
        v-if="openCalculated"
      >
        <div class="table w-full border">
          <div class="table-row flex bg-gray-400 text-center">
            <div class="table-cell p-2 w-auto">
              <label class="block text-gray-700 font-bold">No.</label>
            </div>
            <div class="table-cell p-2 w-3/12">
              <label class="block text-gray-700 font-bold">Nama</label>
            </div>
            <div class="table-cell p-2 w-3/12">
              <label class="block text-gray-700 font-bold">Harga</label>
            </div>
            <div class="table-cell p-2 w-2/12">
              <label class="block text-gray-700 font-bold">Pajak</label>
            </div>
            <div class="table-cell p-2 w-2/12">
              <label class="block text-gray-700 font-bold">Potongan</label>
            </div>
            <div class="table-cell p-2 w-2/12">
              <label class="block text-gray-700 font-bold">Total</label>
            </div>
          </div>
          <div
            class="table-row flex flex-wrap"
            :class="((index%2 === 0) ? 'bg-gray-500' : 'bg-gray-400')"
            v-for="(item, index) in calculatedItems"
            :key="index"
          >
            <div class="table-cell p-2 w-auto">
              <label class="block text-gray-700 font-bold">{{ index+1 }}</label>
            </div>
            <div class="table-cell p-2 w-3/12">
              <label class="block text-gray-700 font-bold">{{ item.nama }}</label>
            </div>
            <div class="table-cell p-2 w-3/12">
              <label class="block text-gray-700 font-bold">{{ item.harga | currency }}</label>
            </div>
            <div class="table-cell p-2 w-2/12">
              <label class="block text-gray-700 font-bold">{{ item.pajak | currency }}</label>
            </div>
            <div class="table-cell p-2 w-2/12">
              <label class="block text-gray-700 font-bold">{{ item.potongan | currency }}</label>
            </div>
            <div class="table-cell p-2 w-2/12">
              <label
                class="block text-gray-700 font-bold"
              >{{ item.total + ongkirPerItem | currency }}</label>
            </div>
          </div>
        </div>
        <div class="flex bg-gray-300 w-full">
          <div class="w-4/12 text-left p-3">
            <label
              class="block text-gray-700 font-bold"
            >Ongkos Kirim/item:&nbsp;{{ ongkirPerItem | currency }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discount: null,
      ongkir: null,
      pajak: false,
      grandtotal: 0,
      ongkirPerItem: 0,
      items: [
        {
          nama: null,
          harga: null,
          jumlah: 1
        }
      ],
      calculatedItems: [],
      openCalculated: false
    };
  },
  computed: {
    subtotal() {
      let ret = 0;
      this.items.forEach(element => {
        const total = element.harga * element.jumlah;
        ret += total;
      });
      return ret;
    },
    subtotalWithTax() {
      let ret = 0;
      let pajak = 0;
      this.pajak ? (pajak = this.subtotal / 10) : (pajak = 0);
      ret = this.subtotal + pajak;
      return ret;
    },
    discountPercentage() {
      const discount = new Number(this.discount);
      return Math.abs(discount) / this.subtotalWithTax;
    }
  },
  methods: {
    addItems() {
      this.items.push({ nama: null, harga: null, jumlah: 1 });
    },
    removeItem(index) {
      if (this.items.length === 1) {
        return false;
      }
      this.items.splice(index, 1);
    },
    calculatePajak() {
      let pajak = 0;
      this.pajak ? (pajak = this.subtotal / 10) : (pajak = 0);
      this.subtotalWithTax = this.subtotal + pajak;
    },
    calculateItem() {
      let kirim = [];
      this.items.forEach(el => {
        let harga = new Number(el.harga);
        let pajak = 0;
        this.pajak ? (pajak = harga / 10) : (pajak = 0);
        const potongan = (harga + pajak) * this.discountPercentage;
        if (el.jumlah > 1) {
          for (let i = 0; i < el.jumlah; i++) {
            kirim.push({
              nama: el.nama,
              harga: harga,
              pajak: pajak,
              potongan: potongan,
              total: harga + pajak - potongan
            });
          }
        } else {
          kirim.push({
            nama: el.nama,
            harga: harga,
            pajak: pajak,
            potongan: potongan,
            total: Math.round(harga + pajak) - potongan
          });
        }
      });
      const ongkir = new Number(this.ongkir);
      this.ongkirPerItem = Math.round(ongkir / kirim.length);
      this.calculatedItems = kirim;
    },
    calculate() {
      this.calculateItem();
      console.log(this.discountPercentage);
      console.log(this.items);
      console.log(this.calculatedItems);
      console.log(this.ongkirPerItem);
      this.openCalculated = true;
    }
  }
};
</script>
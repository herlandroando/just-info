<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Button from 'primevue/button';
import { ref } from 'vue';

const phase = ref(1);
const time = ref(100);
let interval = 0;
const actionNextPhase = () => {
  phase.value++;
  if (phase.value == 3) {
    interval = setInterval(() => {
      // time.value -= 1000;
      phase.value++;
    }, time.value);

  };
}

</script>

<template>
  <div :class="{'wrapper':true, 'end':phase>21}">
    <template v-if="phase == 1">
      <Button @click="actionNextPhase">Pilih Dia!</Button>
      <small>Atau</small>
      <Button @click="actionNextPhase">Pilih Kamu!</Button>
    </template>
    <template v-if="phase == 2">
      <h4>Sebenarnya sama aja dia itu adalah kamu dan kamu adalah dia.</h4>
      <Button @click="actionNextPhase">Pilih Diriku!</Button>
    </template>
    <template v-if="phase == 3">
      <h4>Aku emang telah memilihmu apapun yang terjadi. Apa yang perlu ditanyakan lagi.</h4>
    </template>
    <template v-if="phase == 4">
      <h4>Walaupun dia terkadang suka marah</h4>
    </template>
    <template v-if="phase == 5">
      <h4>Terkadang membuatku kesal</h4>
    </template>
    <template v-if="phase == 6">
      <h4>Entah hal tersebut hanya ingin membuatku mencubit pipinya.</h4>
    </template>
    <template v-if="phase == 7">
      <h4>Aneh bukan?</h4>
    </template>
    <template v-if="phase == 8">
      <h4>Yap karena aku telah jatuh cinta sama dia sejak awal</h4>
    </template>
    <template v-if="phase == 9">
      <h4>Bukan hanya hal tersebut yang membuatku jadi begini</h4>
    </template>
    <template v-if="phase == 10 || phase==11">
      <h4>Cantik? Semua mah ada. Tetapi di mataku, dia adalah orang yang tercantik.</h4>
      <small class="text-error" v-if="phase==11">BTW yang bilang J - word ke dia gw sumpel mulutnya pake tempe
        nanti...</small>
    </template>
    <template v-if="phase == 12">
      <h4>Gemesin mah dari awal dah keliatan kan kenapa pen cubit</h4>
    </template>
    <template v-if="phase == 13">
      <h4>Pintar masak? Beh bukan pintar masak lagi, pintar yang diajarin masak dah (Apaan sih). Coba aja dah rasa.
        Nagih sumpah</h4>
    </template>
    <template v-if="phase == 14">
      <h4>Dari cumi, kornet, sayur sup, perkedel tahu, banyak dah pokoknya</h4>
    </template>
    <template v-if="phase == 15">
      <h4>Terampil? Tangannya sekali sentuh apapun auto naik 1000% entah kekuatannya, kecantikannya, maupun keunikannya
      </h4>
    </template>
    <template v-if="phase == 16">
      <h4>Terlalu banyak hal yang membuatku jatuh cinta sama dia (yang lagi baca)</h4>
    </template>
    <template v-if="phase == 17">
      <h4>Dari semua itu, satu hal yang ingin ku ucapkan</h4>
    </template>
    <template v-if="phase == 18">
      <h4>Aku Sayang Kamu dan Terima kasih telah mempercayaiku, kuat dengan aku hingga saat ini</h4>
    </template>
    <template v-if="phase == 19">
      <h4>Terima kasih telah memilihku</h4>
    </template>
    <template v-if="phase == 20">
      <h4>Dan</h4>
    </template>
    <template v-if="phase == 21">
      <h4>Selamat Ulang Tahun ke 23!</h4>
    </template>
    <template v-if="phase>=22">
      <h4>Selamat Ulang Tahun ke 23!</h4>
      <p>Panjang umur dan selalu dilancarkan hidupnya dan rejekinya di dunia dan di akhirat nanti. Jangan capek dengan
        an yang terkadang membuat rin badmood.</p>
      <p>Terima kasih telah mempercayai aku. Aku akan selalu berusaha untuk menjadi yang terbaik untukmu.</p>
      <!-- <div style="width:50%"> -->
        <img style="height:50%;"
          src="https://cdn.dribbble.com/users/43762/screenshots/5606342/media/8f8208256ce9d6de6b6a572352342eb3.gif" />
      <!-- </div> -->
    </template>



  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #242424;
  transition: all 0.5s ease;
  padding: 30px;
}

.wrapper.end {
  background-color: #fff;
  color: #000;
}

.text-error {
  color: #ff0000;
}
</style>

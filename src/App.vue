<script setup>
import Button from "primevue/button";
import Game from "./components/Game.vue";
import { computed, onMounted, ref } from "vue";
import DynamicDialog from 'primevue/dynamicdialog';
import InputText from 'primevue/inputtext';
import { useDialog } from "primevue/usedialog";
import Galeri from "./components/Galeri.vue";

const introText = [
  "",
  "Kau berpikir ini gelap saja?",
  "Biar kubantu sedikit...",
  "Namun sebelum itu...",
  "Aku ingin tahu kamu siapa?...",
  "Ok, aku percaya kamu...",
  "Aku akan membantumu...",
  "Ciyaattt...",
  "",
]
const dialog = useDialog();

const galleryState = ref(false);
const gameState = ref('intro');
const introStep = ref(0);
const introInterval = ref(null);
const stateBg = ref(false);
const stateFlash = ref(false);
const score = ref(0);
const name = ref('');
const recognition = computed(() => {

  let nl = name.value.toLowerCase();
  if (nl === 'arini') {
    return 'Sebentar... Jangan dihapus! aku berusaha mengingatnya...'
  } else if (['ayu', 'dewi', 'widyaningsih'].includes(nl)) {
    return 'Hmmm... mohon maaf terlalu banyak yang mengakuinya...'
  } else if (['ay', 'syng', 'sayang', 'honey'].includes(nl)) {
    return 'Iya iya... aku juga sayang kamu... namun aku tidak mengenalmu...'
  } else if (nl === '') {
    return 'Jawab isian di atas ya...'
  } else {
    return 'Aku tidak mengenalmu...'
  }
});

const intro = computed(() => {
  return gameState.value === 'intro';
});
const showFast = computed(() => {
  return {
    visibility: stateBg.value ? "visible" : "hidden"
  }
});
const showSlow = computed(() => {
  return {
    visibility: stateBg.value ? "hidden" : "visible"
  }
});
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});
particlesJS.load('particles-js2', 'assets/particles_fast.json', function () {
  console.log('callback - particles.js config loaded');
});

function onClickGallery(value = null) {
  if (value === null) {
    galleryState.value = true;
    return;
  }
  galleryState.value = value;
  console.log(value, galleryState.value, "APP STATE gallery" );
}

function onClick() {
  if (gameState.value === 'main-menu') {
    stateFlash.value = true;
    setTimeout(() => {
      stateBg.value = true;
    }, 400);
    setTimeout(() => {
      gameState.value = 'game';
      stateFlash.value = false;
    }, 1000);
  }
  else {
    localStorage.setItem('score', score.value);
    localStorage.setItem('lastLogin', new Date().getTime());
    stateFlash.value = true;
    setTimeout(() => {
      stateBg.value = false;
    }, 400);
    setTimeout(() => {
      gameState.value = 'main-menu';
      stateFlash.value = false;
    }, 1000);
  }
}

function onScore(type) {
  if (type === 'gold') {
    score.value += 10;
  }
  else {
    score.value += 1;
  }
}

onMounted(() => {
  localStorage.getItem('score') ? score.value = parseInt(localStorage.getItem('score')) : score.value = 0;
  introInterval.value = setInterval(() => {
    if (introStep.value === 2) {
      let lastLogin = localStorage.getItem('lastLogin');
      console.log(lastLogin, new Date().getTime(), new Date().getTime() - lastLogin, 1000 * 60 * 30);

      // if last login is less than 30 minutes ago then go to game else need to relogin
      if (lastLogin && new Date().getTime() - lastLogin < 1000 * 60 * 30) {
        introStep.value = 7;
        return;
      }
      introStep.value = 3;
      return;
    }
    if (introStep.value === 4) {
      if (name.value.toLowerCase() === 'arini') {
        introStep.value = 5;
        localStorage.setItem('lastLogin', new Date().getTime());
        return;
      }
      return;
    }

    introStep.value++;
    if (introStep.value > introText.length - 1) {
      gameState.value = 'main-menu';
      clearInterval(introInterval.value);
    }
  }, 300);
});

</script>

<template>
  <div class="wrapper">
    <div id="particles-js" class="particle" :style="!intro ? showSlow : { opacity: '0' }"></div>
    <div id="particles-js2" class="particle" :style="!intro ? showFast : { visibility: 'hidden' }"></div>
    <div class="main-container">
      <div v-if="!intro" class="play-container">
        <div v-if="gameState === 'main-menu'" class="main-menu">
          <Button style="width: 100%;" label="Mulai Pencarian!" :disabled="stateFlash" severity="success"
            @click="onClick" />
          <Button style="width: 100%; margin-top: 1rem;" label="Galeri" :disabled="stateFlash" severity="info"
            @click="onClickGallery(null)" />
          <br>
          <b>Gambar yang kamu kumpulkan : {{ score }}</b>
          <small class="">Kami merekomendasikan untuk main di hp dengan posisi tegak</small>
        </div>
        <Game :score="score" v-else @click:back-button="onClick" @click:item="onScore" />
      </div>
      <div v-else="intro" class="intro" style="display: flex; flex-direction: column; justify-content: center;">
        <p class="text-white text-center text-2xl font-bold">{{ introText[introStep] }}</p>
        <InputText v-if="introStep === 4" class="text-center" placeholder="Masukkan nama kamu" v-model="name" />

        <small v-if="introStep === 4" class="text-white" :class="{ correct: name.toLowerCase() === 'arini' }"
          style="margin-top: 1rem; text-align: center;">{{ recognition }}</small>
      </div>
    </div>
    <div :class="{ 'flash-container': true, 'active': stateFlash }"></div>
  </div>
  <div>
    <DynamicDialog></DynamicDialog>
  </div>
  <div style="position: fixed; top: 0; left: 0; z-index: 1000;">
    <Galeri :score="score" :state="galleryState" @update:state="onClickGallery" />

  </div>
</template>

<style>
.correct {
  color: #00ff00;
}

.img-floating {
  position: fixed;
  z-index: 1;
  width: 100vw;
  top: 0;
  left: 0;
}

.play-container .main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  /* background-color: #242424; */
  transition: all 0.3s ease;
  padding: 30px;
}

.wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  /* background-color: #242424; */
  transition: all 0.3s ease;
  overflow: hidden;
}

.main-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: #242424; */
  transition: all 0.3s ease;
}

.particle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  transition: all 0.6s ease;
  opacity: 1;
}

.flash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: all 0.6s ease;
  background-color: #fff;
  opacity: 0;
  z-index: 1;
}

.flash-container.active {
  opacity: 1;
  z-index: 3;
}
</style>

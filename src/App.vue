<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Button from 'primevue/button';
import Image from 'primevue/image';
import { onMounted, ref } from 'vue';
import party from "party-js";

const phase = ref(1);
const time = ref(2000);
const click = ref(0);
const balloon = ref(null);
const imgFloatingContainer = ref(null);
const images = [
  'https://i.ibb.co/bL6cY3L/Whats-App-Image-2023-05-01-at-18-08-06.jpg',
  'https://i.ibb.co/D56x1zV/Whats-App-Image-2023-05-01-at-18-08-04777.jpg',
  'https://i.ibb.co/S34nQXB/1.jpg',
  'https://i.ibb.co/pb9qQDh/Whats-App-Image-2023-05-01-at-18-08-022.jpg',
  'https://i.ibb.co/WcYDw0h/Whats-App-Image-2023-05-01-at-18-08-034.jpg',
  'https://i.ibb.co/W3KxS1K/Whats-App-Image-2023-05-01-at-18-08-0355.jpg',
  'https://i.ibb.co/v13bbGz/Whats-App-Image-2023-05-01-at-18-08-001.jpg',
  'https://i.ibb.co/yF4NDMq/Whats-App-Image-2023-05-01-at-18-08-01.jpg',
  'https://i.ibb.co/0rP2Yd2/Whats-App-Image-2023-05-01-at-18-08-02.jpg',
  'https://i.ibb.co/w048JzC/Whats-App-Image-2023-05-01-at-18-08-003.jpg',
  'https://i.ibb.co/QcRBYsL/Whats-App-Image-2023-05-01-at-18-08-04.jpg',
  'https://i.ibb.co/3MFsk42/Whats-App-Image-2023-05-01-at-18-07-58.jpg',
  'https://i.ibb.co/GQkf2yp/Whats-App-Image-2023-05-01-at-18-07-59.jpg',
  'https://i.ibb.co/qdB1rLv/Whats-App-Image-2023-05-01-at-18-07-582.jpg',
  'https://i.ibb.co/ZBBpdsn/Whats-App-Image-2023-05-01-at-18-08-00.jpg',
  'https://i.ibb.co/t2SdVLJ/Whats-App-Image-2023-05-01-at-18-07-592.jpg',
  'https://i.ibb.co/qnMPhH2/Whats-App-Image-2023-05-01-at-18-08-051.jpg',
  'https://i.ibb.co/GkfznxM/Whats-App-Image-2023-05-01-at-18-08-047.jpg',
  'https://i.ibb.co/TrDGM86/Whats-App-Image-2023-05-01-at-18-08-0411.jpg',
]
let interval = 0
let soundInterval = 0

//mount function
onMounted(() => {

  interval = setInterval(() => {
    // time.value -= 1000;
    if (phase.value >= 3) {
      console.log('end');
      time.value = 4000;
      clearInterval(interval);
      return;
    };
    phase.value++;
    console.log(phase.value);
  }, time.value);

});

function handleClickedBalloon() {
  if (phase.value < 3) {
    return;
  }
  //make balloon shake
  balloon.value.$el.classList.add('shake');
  setTimeout(() => {
    balloon.value.$el.classList.remove('shake');
  }, 500);

  click.value++;

  if (click.value >= 10) {
    party.sparkles(balloon.value.$el, {
      count: party.variation.range(50, 100),
      size: party.variation.range(1, 6),
      gravity: party.variation.range(1, 6),
      colors: ['#bb0000', '#ffffff']
    });

    //play sound pop
    let audio = new Audio('/just-info/public/assets/pop.wav');
    audio.play();

    //playy another sound
    audio = new Audio('/just-info/public/assets/hbd.mp3');
    //make volume lower and then higher
    audio.volume = 0.1;
    audio.play();

    soundInterval = setInterval(() => {
      if (audio.volume >= 1) {
        clearInterval(soundInterval);
        return;
      }
      audio.volume += 0.1;
    }, 100)

    setInterval(() => {
      party.confetti(document.body, {
        count: party.variation.range(10, 20),
        size: party.variation.range(1, 6),
        gravity: party.variation.range(1, 6),
        colors: ['#bb0000', '#ffffff']
      });
    }, 1000);

    balloon.value.$el.classList.add('disappear');
    balloon.value.$el.classList.remove('shake');
    setTimeout(() => {
      balloon.value.$el.classList.remove('disappear');
      //delete balloon
      balloon.value.$el.remove();
      balloon.value = null;
    }, 500);
    phase.value++;
    interval = setInterval(() => {
      // time.value -= 1000;
      if (phase.value >= 8) {
        console.log('end');
        clearInterval(interval);
        return;
      };
      phase.value++;
      console.log(phase.value);
    }, time.value);

    //make random image fall from top every 2s and dissapear
    setInterval(() => {
      let randomImage = images[Math.floor(Math.random() * images.length)];
      // dont make it outside the screen
      let randomX = Math.floor(Math.random() * (window.innerWidth - 100));
      let randomSize = 100 + Math.floor(Math.random() * 100);
      let randomRotate = Math.floor(Math.random() * 360);
      let randomDuration = Math.floor(Math.random() * 10);
      randomDuration = randomDuration < 3 ? 3 : randomDuration;
      // let randomDelay = Math.floor(Math.random() * 10);
      let randomTiming = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']
      let randomDirection = ['normal', 'reverse', 'alternate', 'alternate-reverse']
      let randomFill = ['forwards', 'backwards', 'both']
      // let randomPlay = ['paused', 'running'][Math.floor(Math.random() * 2)];

      randomTiming = randomTiming[Math.floor(Math.random() * randomTiming.length)];
      randomDirection = randomDirection[Math.floor(Math.random() * randomDirection.length)];
      randomFill = randomFill[Math.floor(Math.random() * randomFill.length)];

      let image = document.createElement('img');
      image.src = randomImage;
      image.style.position = 'absolute';
      image.style.top = '0';
      image.style.left = `${randomX}px`;
      image.style.width = `${randomSize}px`;
      image.style.transform = `rotate(${randomRotate}deg)`;
      // image.style.opacity = `${randomOpacity}`;
      image.style.zIndex = '1';
      image.style.pointerEvents = 'none';
      image.style.animation = `fall ${randomDuration}s ${randomTiming} ${randomDirection} ${randomFill}`;
      imgFloatingContainer.value.appendChild(image);

      setTimeout(() => {
        image.remove();
      }, randomDuration * 1000);
    }, 500);
  }
}

</script>

<template>
  <div :class="{ 'wrapper': true, 'end': click >= 10 }">
    <Image class="balloon" src="/just-info/public/assets/balloon.png" width="200" @click="handleClickedBalloon" ref="balloon" />
    <h3 v-if="phase == 1">Gelap sekali disini...</h3>
    <h3 v-if="phase == 2">Oh, apakah kau baru datang?</h3>
    <h3 v-if="phase == 3">Bisakah kau klik/tekan aku sebanyak mungkin?</h3>
    <h3 v-if="phase == 3">Kau sudah menekan aku sebanyak {{ click }} kali</h3>
    <h1 v-if="phase == 4">Selamat Ulang Tahun</h1>
    <h3 style="font-size: x-large;" v-if="phase == 4">untuk</h3>
    <h2 style="text-align: center;font-size: xx-large; font-weight: bold; line-height: 1.5;" v-if="phase == 4">Ayah saya,
      Heru Sukoco</h2>
    <h3 v-if="phase == 5">Semoga panjang umur, sehat selalu, dan selalu diberikan kemudahan dalam segala hal</h3>
    <h3 v-if="phase == 6">Terima kasih sudah menjadi ayah yang baik</h3>
    <h3 style="font-size: xx-large; line-height: 1.5;" v-if="phase == 7">Jangan lupa ke dokter ya pak untuk cek kesehatan
    </h3>
    <h3 v-if="phase == 8">Sekali lagi, selamat ulang tahun pak!</h3>
  </div>
  <div class="img-floating" ref="imgFloatingContainer">
  </div>
</template>

<style>
.img-floating {
  position: fixed;
  z-index: 1;
  width: 100vw;
  top: 0;
  left: 0;
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
  background-color: #242424;
  transition: all 0.3s ease;
  padding: 30px;
}

.small-img {
  width: 100px;
  height: auto;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
  object-fit: cover;
  object-position: center;
  border: 2px solid #fff;
}

.wrapper.end {
  background-color: #fff;
  color: #000;
}

.text-error {
  color: #ff0000;
}

@media screen and (max-width: 768px) {
  .wrapper {
    gap: 0.3rem;
  }
}

.balloon {
  animation: balloon 3s ease-in-out infinite;
}

.balloon.shake {
  animation: shake 0.5s ease-in-out infinite;
}

.balloon.disappear {
  animation: disappear 0.5s ease-in-out;
}

@keyframes fall {
  0% {
    transform: translateY(-100vh);
    opacity: 1;
  }

  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes disappear {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.5);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-30px);
  }

  50% {
    transform: translateX(30px);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes balloon {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>

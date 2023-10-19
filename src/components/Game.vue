<template>
    <div class="game-container">
        <div class="menubar">
            <p>Score: {{ props.score }}</p>
            <div style="display: flex; justify-content: end; align-items: center; gap: 1rem;">
                <PButton label="Tutorial" @click="onClickTutorial" />
                <PButton label="Simpan & Keluar" @click="onExit" severity="danger" />
            </div>
        </div>
        <div class="canvas-game">
        </div>
    </div>
</template>


<script setup>
import Tutorial from './Tutorial.vue';
import Galeri from './Galeri.vue';
import PButton from 'primevue/button';
import { useDialog } from 'primevue/usedialog';

const dialog = useDialog();

import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { pictures, pointNeeds } from '../data/galery';
import PopUpImage from './PopUpImage.vue';

const emit = defineEmits(['click:backButton', 'click:item']);
const props = defineProps({
    score: Number,
});
const collectedPictureId = ref(localStorage.getItem('collectedPictureId') ? localStorage.getItem('collectedPictureId') : 0);
const gameState = ref('tutorial');
const itemRef = ref([

]);
const randomizerSummons = ref(null);

// make delta time
const dt = 1 / 60;

onMounted(() => {
    if (props.score === 0) {
        gameState.value = 'tutorial';
        dialog.open(Tutorial, {
            props: {
                modal: true, header: "Tutorial", style: { width: '90vw' },
            },
            onClose: onClickTutorialComplete,
        })
    } else {
        random();
        gameState.value = 'game';
    }

    render();
});

onUnmounted(() => {
    console.log('unmounted');
    console.log(randomizerSummons.value)
    if (randomizerSummons.value)
        clearInterval(randomizerSummons.value);
    randomizerSummons.value = null;
});

watch(() => props.score, (newVal, oldVal) => {
    // get last index pointNeeds less than score and obtained picture can't be more than last index
    let lastIndex = pointNeeds.findIndex((point) => point > newVal) - 1;

    console.log('get last index', lastIndex);
    if (lastIndex === -1) return;
    else {
        console.log(lastIndex, collectedPictureId.value);
        if (lastIndex + 1 > collectedPictureId.value || collectedPictureId.value == 0) {
            let gotImages = pictures.filter((picture) => {
                console.log(picture.id, collectedPictureId.value, lastIndex + 1, picture.id > collectedPictureId.value, picture.id <= lastIndex + 1);
                return picture.id > collectedPictureId.value && picture.id <= lastIndex + 1;
                // 1 // 1 | // 1 // 1
            });
            console.log(gotImages, lastIndex);
            // localStorage.setItem('collectedPictureId', lastIndex + 1);
            gameState.value = 'paused';
            localStorage.setItem('collectedPictureId', lastIndex + 1);
            collectedPictureId.value = lastIndex + 1;
            localStorage.setItem('score', props.score);
            dialog.open(PopUpImage, {
                props: {
                    modal: true, header: "Anda Mendapatkan Gambar Baru!", style: { width: '90vw' },
                },
                data: {
                    images: gotImages,
                },
                onClose: () => {
                    gameState.value = 'game';
                },
            })
        }
    }
})

// make render function run every 1/60 second
const render = () => {
    requestAnimationFrame(render);
    update();
};

// make update function
const update = () => {
    // update item
    itemRef.value.forEach((item) => {
        if (gameState.value === 'paused') return;
        if (item.isClicked) {
            if (item.scale < 0) {
                item.element.remove();
                itemRef.value.splice(itemRef.value.indexOf(item), 1);
                return;
            }
            item.scale -= 0.01;
            item.element.style.transform = `translate(${item.x}px, ${item.y}px) scale(${item.scale})`;
            return;
        };
        item.y += item.speed * dt;
        item.speed += item.gravity * dt;
        item.element.style.transform = `translate(${item.x}px, ${item.y}px)`;
        if (item.y > window.innerHeight + 100) {
            item.element.remove();
            itemRef.value.splice(itemRef.value.indexOf(item), 1);
        }
    });
};

function randomItem() {
    const item = {
        x: Math.random() * window.innerWidth,
        y: -100,
        speed: 0,
        gravity: 0.5,
        scale: 1,
        element: document.createElement('div'),
        isClicked: false,
        type: 'normal',
    };
    const image = document.createElement('img');
    if (Math.random() > 0.8) {
        item.element.className = 'item gold';
        item.type = 'gold';
        item.speed = getRandomInt(200, 400)
    } else {
        item.element.className = 'item normal';
        item.speed = getRandomInt(100, 200)
    }
    item.element.style.transform = `translate(${item.x}px, ${item.y}px)`;

    image.src = '/assets/s.png';
    image.className = 'img';
    image.draggable = false;

    item.element.appendChild(image);

    item.element.addEventListener('click', () => {
        if (item.isClicked) return;
        item.isClicked = true;
        emit('click:item', item.type);
    });

    document.getElementsByClassName('canvas-game')[0].appendChild(item.element);
    itemRef.value.push(item);

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


const onExit = () => {
    emit('click:backButton');
};

const onClickTutorialComplete = () => {
    if (gameState.value === 'tutorial') {
        random();
    }
    gameState.value = 'game';
}

const random = () => {
    randomizerSummons.value = setInterval(() => {
        if (gameState.value === 'paused') return;
        setTimeout(() => {
            if (gameState.value === 'paused') return;
            if (itemRef.value.length > 10) return;
            randomItem();
            console.log('summon');
        }, Math.random() * 1000) * 5;
    }, 1000);
}

const onClickTutorial = () => {
    gameState.value = 'paused';
    dialog.open(Tutorial, {
        props: {
            modal: true, header: "Tutorial", style: { width: '90vw' },
        },
        onClose: onClickTutorialComplete,
    })
}

</script>

<style>
.game-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    /* background-color: #000000; */
}

.menubar {
    padding: 1rem;
    width: 100%;
    /* height: 100px; */
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    /* background-color: #000000; */
}

.canvas-game {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    z-index: 1;
    /* background-color: #000000; */
}

.img {
    width: 10rem;
    height: 10rem;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.item.gold .img {
    filter: hue-rotate(90deg) brightness(1.5) contrast(1.2);
}

.item.normal .img {
    filter: grayscale(100%) brightness(0.5) contrast(1.2);
}

.item {
    position: fixed;
}

@media screen and (max-width: 600px) {
    .img {
        width: 7rem;
        height: 7rem;
    }
}
</style>
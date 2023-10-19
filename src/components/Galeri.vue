<template>
    <Galleria v-model:visible="state" @update:visible="onStateChange" :value="images" :responsiveOptions="responsiveOptions"
        :pt="{
            item: {
                style: {
                    'height': '80vh',
                }
            },
            closeButton: {
                style: {
                    'z-index': '1000',
                }
            }
        }" :numVisible="5" containerStyle="max-width: 100%; overflow:hidden; max-height: 100vh" :fullScreen="true">
        <template #item="slotProps">
            <img v-if="slotProps.item.points <= score" :src="slotProps.item.link" :alt="slotProps.item.title"
                class="img-selected-gallery" />
            <img v-else src="/assets/s.png" alt="Terkunci" class="img-selected-gallery" />
        </template>
        <template #thumbnail="slotProps">
            <img v-if="slotProps.item.points <= score" :src="slotProps.item.link" :alt="slotProps.item.title"
                class="img-gallery" />
            <img v-else src="/assets/s.png" alt="Terkunci" class="img-gallery" />
        </template>
        <template #caption="slotProps">
            <template v-if="slotProps.item.points <= score">
                <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div>
                <p class="text-normal text-white">{{ slotProps.item.description }}</p>
            </template>
            <template v-else>
                <div class="text-xl mb-2 font-bold">Terkunci!</div>
                <p class="text-normal text-white">Butuh mengumpulkan gambar hingga {{ slotProps.item.points }} untuk membuka
                    gambar ini</p>
            </template>
        </template>
    </Galleria>
</template>

<script setup>
import Galleria from 'primevue/galleria';
import { pictures } from '../data/galery';
import { ref, watch } from 'vue';

const images = pictures;

const props = defineProps({
    state: Boolean,
    score: Number,
});
const emit = defineEmits(['update:state']);

const state = ref(props.state);


const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 7,
    },
    {
        breakpoint: '768px',
        numVisible: 5,
        numScroll: 3,
    },
    {
        breakpoint: '560px',
        numVisible: 3,
        numScroll: 3,
    },
];

const onStateChange = (value) => {
    state.value
    console.log(value, 'state gallery clicked');
    emit('update:state', value);
};

watch(() => props.state, (value) => {
    state.value = value;
    console.log(value, 'state gallery');
    emit('update:state', value);
});

</script>

<style scoped>
.img-gallery {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.text-xl {
    font-size: 1.25rem;
}

.text-normal {
    font-size: 0.75rem;
}

.text-white {
    color: #fff;
}

.font-bold {
    font-weight: bold;
}

.img-selected-gallery {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
}
</style>
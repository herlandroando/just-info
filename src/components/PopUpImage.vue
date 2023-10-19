
<template>
    <div class="tutorial" v-if="images.length > 0">
        <img :src="images[step].link" :alt="images[step].title" class="img"  style="margin-bottom: 1em;"/>
        <b>{{ images[step].title }}</b>
        <span>{{ images[step].description }}</span>
        <div class="button-container">
            <Button v-if="step < images.length - 1" style="margin-top: 1rem; width: 100%;" label="Selanjutnya"
                severity="success" @click="onClickNext" />
            <Button v-if="step > 0" style="margin-top: 1rem; width: 100%;" label="Sebelumnya" severity="secondary"
                @click="onClickPrev" />
            <Button style="margin-top: 1rem; width: 100%;" label="Tutup" @click="dialogRef.close();"
                severity="danger" />
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { inject, onMounted, ref } from 'vue';


const step = ref(0);
const images = ref([]);
const onClickNext = () => {
    step.value++;
};

const onClickPrev = () => {
    step.value--;
    if (step.value < 0) {
        step.value = 0;
    }
};

// get inject
const dialogRef = inject('dialogRef')

onMounted(() => {
    console.log(dialogRef.value.data.images);
    images.value = dialogRef.value.data.images
})

</script>

<style scoped>
small {
    color: grey;
    font-size: 0.8rem;
}

.tutorial {
    padding: 1rem;
    /* text-align: center; */
    /* font-size: 1.2rem; */
    /* font-weight: bold; */
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;
}

.button-container {
    display: flex;
    flex-direction: column;
    /* gap: 0.5rem; */
    justify-content: center;
}

.img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.t-item.gold .img {
    filter: hue-rotate(90deg) brightness(1.5) contrast(1.2);
}

.t-item.normal .img {
    filter: grayscale(100%) brightness(0.5) contrast(1.2);
}

.t-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}
</style>
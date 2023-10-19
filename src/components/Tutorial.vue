
<template>
    <div class="tutorial">
        <template v-if="step === 0">
            <span>Ini adalah tutorial... <small>(Ya tau kali)</small></span>
            <br>
            <span>Inti dari game ini adalah <b>kamu harus mengambil gambar yang telah hilang</b> di sebuah kekosongan ini.
                <small>(Kiw
                    kiw...)</small></span>
        </template>
        <template v-else-if="step === 1">
            <span>Ada dua jenis gambar yang bisa kamu ambil, yaitu:</span>

            <div class="t-item gold">
                <img src="/assets/s.png" alt="gold" class="img" />
                <span>Gambar Warna - Nilai 10</span>
            </div>

            <div class="t-item normal">
                <img src="/assets/s.png" alt="normal" class="img" />
                <span>Gambar Hitam Putih - Nilai 1</span>
            </div>
        </template>
        <template v-else-if="step === 2">
            <span>Tenang... Setelah kamu mengumpulkan gambar dengan jumlah tertentu, kamu akan mendapatkan hadiah
                <b>yang sangat membuatmu tersenyum</b>! <small>(Yakin aja dulu yekan...)</small></span>

            <p>Terakhir adalah... <b>Aku sayang kamu...</b> eh maksudnya <b>selamat bermain dan mengumpulkan hadiahnya!</b>
            </p>
        </template>
        <div class="button-container">
            <Button v-if="step < 2" style="margin-top: 1rem; width: 100%;" label="Selanjutnya" severity="success" @click="onClickNext" />
            <Button v-if="step === 2" style="margin-top: 1rem; width: 100%;" label="Tutup" @click="onClickNext" severity="danger" />
            <Button v-if="step > 0" style="margin-top: 1rem; width: 100%;" label="Sebelumnya" severity="secondary" @click="onClickPrev" />
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { inject, ref } from 'vue';

const step = ref(0);
const onClickNext = () => {
    step.value++;
    if (step.value > 2) {
        dialogRef.value.close();
    }
};

const onClickPrev = () => {
    step.value--;
    if (step.value < 0) {
        step.value = 0;
    }
};

// get inject
const dialogRef = inject('dialogRef')

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
    width: 5rem;
    height: 5rem;
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
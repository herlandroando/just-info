<template>
    <img v-for="item in items" :key="item.id" :src="item.link" :alt="item.title" class="img" />
</template>

<script setup>
import { pictures } from '../data/galery';

const items = pictures
</script>
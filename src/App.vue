<script setup lang="ts">
import MainView from './views/MainView.vue';

import { useProductsProvider } from '@/providers/ProductsProvider';
import { useEditProductProvider } from './providers/EditProductProvider';
import { useChangeCategoryProvider } from './providers/ChangeCategoryProvider';

useProductsProvider();
useEditProductProvider();
useChangeCategoryProvider();
</script>

<template>
	<div class="app-wrapper">
		<MainView />
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.app-wrapper {
	position: relative;
	max-width: 100vw;
	height: 100vh;
	height: 100dvh;
	background-color: $dirtyWhite;
	overflow: hidden;
	overflow: clip;
}

@media (min-width: 720px) {
	.app-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>

<script setup lang="ts"></script>

<template>
	<div class="empty-shopping-list-wrapper">
		<img src="/img/happy_shopper.png" alt="happy shopper jumping with shopping bags" class="empty-shopping-list-img" />
		<p class="empty-shopping-list-title">Your list is empty</p>
		<p class="empty-shopping-list-text">Use the button below to add products</p>
	</div>
</template>

<style lang="scss" scoped>
.empty-shopping-list-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 1%;
	height: 100%;
}

.empty-shopping-list-img {
	margin-bottom: 2.4rem;
	width: 40%;
	max-width: 128px;
}

.empty-shopping-list-title {
	margin-bottom: 0.8rem;
	font-size: 1.8rem;
}

.empty-shopping-list-text {
	opacity: 0.8;
}

@media (min-height: 460px) {
	.empty-shopping-list-wrapper {
		margin-bottom: 6.4rem;
	}
}

@media (min-width: 720px) {
	.empty-shopping-list-img {
		max-width: 144px;
	}
}
</style>

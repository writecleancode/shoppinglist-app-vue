<script setup lang="ts">
import CheckIcon from '@/assets/icons/CheckIcon.vue';

const props = defineProps({
	isBought: {
		type: Boolean,
		default: false,
	},
	animationType: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<button class="status-btn" :aria-label="isBought ? 'mark product as not bought' : 'mark product as bought'">
		<span class="status-btn-circle" :class="[{ bought: isBought }, animationType]"></span>
		<div class="status-btn-icon-wrapper" :class="[{ bought: isBought }, animationType]">
			<CheckIcon />
		</div>
		<div class="status-btn-bars-wrapper" :class="animationType">
			<span class="bar bar-top"></span>
			<span class="bar bar-top-left"></span>
			<span class="bar bar-left"></span>
			<span class="bar bar-bottom-left"></span>
			<span class="bar bar-bottom"></span>
			<span class="bar bar-bottom-right"></span>
			<span class="bar bar-right"></span>
			<span class="bar bar-top-right"></span>
		</div>
	</button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

@keyframes hide-circle {
	0% {
		clip-path: polygon(0 50%, 0 0, 101% 0, 101% 101%, 0 101%, 0 50%, 50% 50%);
	}

	12.5% {
		clip-path: polygon(0 50%, 0 0, 101% 0, 101% 101%, 0 101%, 0 101%, 50% 50%);
	}

	37.5% {
		clip-path: polygon(0 50%, 0 0, 101% 0, 101% 101%, 101% 101%, 101% 101%, 50% 50%);
	}

	62.5% {
		clip-path: polygon(0 50%, 0 0, 101% 0, 101% 0, 101% 0, 101% 0, 50% 50%);
	}

	87.5% {
		clip-path: polygon(0 50%, 0 0, 0 0, 0 0, 0 0, 0 0, 50% 50%);
	}

	100% {
		clip-path: polygon(0 50%, 0 0, 0 0, 0 0, 0 0, 0 50%, 50% 50%);
	}
}

@keyframes reveal-check-one {
	0% {
		translate: 0 0;
	}

	100% {
		translate: 8px 8px;
	}
}

@keyframes reveal-check-two {
	0% {
		translate: 0 0;
	}

	100% {
		translate: 9px -11px;
	}
}

@keyframes bars-slide {
	0% {
		translate: 100% 0;
	}

	100% {
		translate: -100% 0;
	}
}

.status-btn {
	position: relative;
	padding: 0.8rem;
	border: none;
	background-color: transparent;
}

.status-btn-circle {
	display: block;
	position: relative;
	z-index: 1;
	border: 2px solid $secondary;
	border-radius: 50%;
	width: 24px;
	height: 24px;

	&.no-animation {
		animation: none;
	}

	&.check-animation {
		animation: hide-circle 0.2s linear forwards;
	}

	&.uncheck-animation {
		animation: hide-circle 0.2s linear 0.1s reverse both;
	}

	&.bought {
		&.no-animation,
		&.check-animation {
			visibility: hidden;
		}
	}
}

.status-btn-icon-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	border-radius: 40%;

	&::before,
	&::after {
		content: '';
		position: absolute;
		background-color: #fff;
	}

	&::before {
		top: 11px;
		left: 0px;
		width: 13px;
		height: 5px;
		rotate: 43deg;
	}

	&::after {
		top: 1px;
		left: 11px;
		width: 5px;
		height: 14px;
		rotate: 38deg;
	}

	&.no-animation {
		&::before,
		&::after {
			animation: none;
		}
	}

	&.check-animation {
		&::before {
			animation: reveal-check-one 0.05s linear 0.2s forwards;
		}

		&::after {
			animation: reveal-check-two 0.05s linear 0.25s forwards;
		}
	}

	&.uncheck-animation {
		&::before {
			animation: reveal-check-one 0.05s linear reverse both;
		}

		&::after {
			animation: reveal-check-two 0.05s linear reverse both;
		}
	}

	&.bought {
		&.no-animation,
		&.check-animation {
			&::before,
			&::after {
				background-color: transparent;
			}
		}
	}
}

.status-btn-bars-wrapper {
	position: absolute;
	inset: 0;
	z-index: 0;

	.bar {
		display: block;
		position: absolute;
		width: 8px;
		height: 3px;
		border-radius: 100px;
		background-color: #fff;
		overflow: clip;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 100px;
			background-color: #0f9e0d;
			translate: 100% 0;
		}

		&:nth-child(odd)::after {
			&.check-animation {
				animation: bars-slide 0.25s ease-out 0.25s;
			}
		}

		&:nth-child(even)::after {
			&.check-animation {
				animation: bars-slide 0.45s ease-out 0.25s;
			}
		}
	}

	&.check-animation {
		.bar {
			&:nth-child(odd)::after {
				animation: bars-slide 0.25s ease-out 0.25s;
			}

			&:nth-child(even)::after {
				animation: bars-slide 0.45s ease-out 0.25s;
			}
		}
	}

	.bar-top {
		top: 0;
		left: 50%;
		transform-origin: 0 50%;
		translate: 0 -50%;
		rotate: 90deg;
	}

	.bar-top-left {
		top: 20%;
		left: 20%;
		translate: -50% -50%;
		rotate: 45deg;
	}

	.bar-left {
		top: 50%;
		left: 0;
		translate: 0 -50%;
	}

	.bar-bottom-left {
		bottom: 20%;
		left: 20%;
		translate: -50% 50%;
		rotate: -45deg;
	}

	.bar-bottom {
		bottom: 0;
		left: 50%;
		transform-origin: 0 50%;
		translate: 0 50%;
		rotate: -90deg;
	}

	.bar-bottom-right {
		bottom: 20%;
		right: 20%;
		translate: 50% 50%;
		rotate: -135deg;
	}

	.bar-right {
		top: 50%;
		right: 0;
		rotate: 180deg;
	}

	.bar-top-right {
		top: 20%;
		right: 20%;
		translate: 50% -50%;
		rotate: 135deg;
	}
}
</style>

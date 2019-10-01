<!--
  - @copyright Copyright (c) 2019 Marco Ambrosini <marcoambrosini@pm.me>
  -
  - @author Marco Ambrosini <marcoambrosini@pm.me>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
-->

<template>
	<a
		href="#"
		class="app-content-list-item">
		<!-- default slot for avatar or icon -->
		<slot name="icon" />
		<div class="app-content-list-item-line-one">
			<slot name="title" />
		</div>
		<div class="app-content-list-item-line-two">
			<slot name="subtitle" />
		</div>
		<span
			v-if="{hasDetails}"
			class="app-content-list-item-details">
			{{ details }}
		</span>
		<Actions
			v-if="hasActions"
			menu-align="right"
			class="app-content-list-item-actions">
			<slot name="actions" />
		</Actions>
		<slot
			name="counter"
			class="app-content-list-item-counter" />
	</a>
</template>

<script>
import Actions from '../Actions/Actions'

export default {
	name: 'AppContentListItem',

	components: {
		Actions
	},

	props:	{
		/**
		 * The details text displayed in the upper right part
		 */
		details: {
			type: String,
			default: ''
		}
	},
	computed: {
		hasDetails() {
			return (this.details !== '' && !this.$slots.counter)
		},
		hasActions() {
			return (this.$slots.actions)
		}

	}
}
</script>

<style lang="scss" scoped>

.app-content-list-item {
	position: relative;
	height: 68px;
	cursor: pointer;
	padding: 10px 7px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	flex: 0 0 auto;

	/* Icon fixes */
	&,
	> .app-content-list-item-menu {
		> [class^='icon-'],
		> [class*=' icon-'] {
			order: 4;
			width: 24px;
			height: 24px;
			margin: -7px; // right padding of item
			padding: 22px;
			opacity: .3;
			cursor: pointer;
			&:hover,
			&:focus {
				opacity: .7;
			}
			&[class^='icon-star'],
			&[class*=' icon-star'] {
				opacity: .7;
				&:hover,
				&:focus {
					opacity: 1 ;
				}

			}
			&.icon-starred {
				opacity: 1 ;
			}
		}
	}

	&:hover,
	&:focus,
	&.active {
		background-color: var(--color-background-dark);
		// display checkbox on hover/focus/active
		.app-content-list-item-checkbox.checkbox + label {
			display: flex;
		}
	}

	.app-content-list-item-checkbox.checkbox + label,
	.app-content-list-item-star {
		position: absolute;
		height: 40px;
		width: 40px;
		z-index: 50;
	}

	.app-content-list-item-checkbox.checkbox {
		&:checked,
		&:hover,
		&:focus,
		&.active {
			+ label {
				// display checkbox if checked
				display: flex;
				// if checked, lower the opacity of the avatar
				+ .app-content-list-item-icon {
					opacity: .7;
				}
			}
		}
		+ label {
			top: 14px;
			left: 7px;
			// hidden by default, only chown on hover-focus or if checked
			display: none;
			&::before {
				margin: 0;
			}
			/* Hide the star, priority to the checkbox */
			~ .app-content-list-item-star {
				display: none;
			}
		}
	}

	.app-content-list-item-star {
		display: flex;
		top: 10px;
		left: 32px;
		background-size: 16px;
		height: 20px;
		width: 20px;
		margin: 0;
		padding: 0;
	}

	.app-content-list-item-icon {
		position: absolute;
		display: inline-block;
		height: 40px;
		width: 40px;
		line-height: 40px;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 10px;
		color: #fff;
		text-align: center;
		font-size: 1.5em;
		text-transform: capitalize;
		object-fit: cover;
		user-select: none;
		cursor: pointer;
		top: 50%;
		margin-top: -20px;
	}

	.app-content-list-item-line-one,
	.app-content-list-item-line-two {
		display: block;
		padding-left: 50px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		order: 1;
		flex: 1 1 0px;
		padding-right: 10px;
		cursor: pointer;
	}

	.app-content-list-item-line-two {
		opacity: .5;
		order: 3;
		flex: 1 0;
		flex-basis: calc(100% - 44px);
	}

	.app-content-list-item-details {
		order: 2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100px;
		opacity: .5;
		font-size: 80%;
		user-select: none;
	}

	.app-content-list-item-actions {
		order: 5;
	}

	.app-content-list-item-counter {
		order: 6;
	}
}

</style>

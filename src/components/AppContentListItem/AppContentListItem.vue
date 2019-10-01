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
		<slot />
		<div
			class="app-content-list-item-line-one">
			{{ title }}
		</div>
		<div
			class="app-content-list-item-line-two">
			{{ subtitle }}
		</div>
		<span
			v-if="{hasDetails}"
			class="app-content-list-item-details">
			{{ details }}
		</span>
		<slot name="actions" />
		<slot name="counter" />

	</a>
</template>

<script>
export default {
	name: 'AppContentListItem',

	props:	{
		/**
		 * The title of the item
		 */
		title: {
			type: String,
			required: true
		},
		/**
		 * The subtitle of the item
		 */
		subtitle: {
			type: String,
			required: true
		},
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
			if (this.details !== '' && !this.$slots.counter) {
				return true
			} else return false
		}
	}

}

</script>

<style lang="scss" scoped>

</style>

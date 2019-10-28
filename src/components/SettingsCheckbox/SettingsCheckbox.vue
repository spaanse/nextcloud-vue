<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  - @author Greta Doci <gretadoci@gmail.com>
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
  -
  -->
<docs>
## One checkbox with a hint

```vue
<template>
		<SettingsCheckbox
			label="some text"
			hint="some hint"
			v-model="checkedTarget"/>
</template>
```
</docs>

<template>
	<p>
		<input
			:id="id"
			type="checkbox"
			class="checkbox"
			:checked="value"
			:disabled="disabled"
			@keydown.enter.exact.prevent="checkInput" @change="onChange">
		<label ref="label" :for="id">{{ label }}</label><br>
		<em v-if="hint !== ''">{{ hint }}</em>
	</p>
</template>

<script>

export default {
	name: 'SettingsCheckbox',
	props: {
		/**
		 * id attribute of the checkbox element
		 */
		id: {
			type: String,
			default: 'settings-checkbox-' + this.GenRandomId

		},
		label: {
			type: String,
			required: true
		},
		/**
		 * hint of the checkbox element
		 */
		hint: {
			type: String,
			default: ''
		},

		/**
		 * checked state of the the checkbox element
		 */
		checked: {
			type: Boolean,
			default: false
		},
		/**
		 * value of the checkbox input
		 */
		value: {
			type: [String, Number],
			default: ''
		},
		/**
		 * disabled state of the checkbox element
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		checkInput(event) {
			// by clicking we also trigger the change event
			this.$refs.label.click()
		},
		onChange(event) {
			/**
			 * Emitted when the checkbox state is changed
			 * @type {boolean}
			 */
			this.$emit('update:checked', this.$refs.checkbox.checked)
			/**
			 * Emitted when the checkbox state is changed
			 * @type {Event}
			 */
			this.$emit('change', event)
			if (this.$refs.checkbox.checked) {
				/**
				 * Emitted when the checkbox is checked
				 * @type {Event}
				 */
				this.$emit('check')
			} else {
				/**
				 * Emitted when the checkbox is unchecked
				 * @type {Event}
				 */
				this.$emit('uncheck')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 15px;
}

</style>

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

<template>
	<div class="section">
		<h2>{{ title }}</h2>
		<p>{{ description }}</p>
		<a href="docUrl" class="icon-info" :title="t('settings', 'Open Documentation')"/>
		<slot> </slot>
	</div>
</template>

<script>
export default {
	name: 'SettingsSection',
	components: {

	},
	props: {
		title: {
			type: String,
			default: '',
			required: true
		},
		description: {
			type: String,
			default: ''
		}
	}
}

</script>

<style lang="scss" scoped>
	.section {
		margin-bottom: auto;
		display: block;
		padding: 30px;
	}
	.icon-info {
		padding: 11px 20px;
		vertical-align: text-bottom;
		opacity: 0.5;
		background-position: center;
	}
	//titles
	h2 {
		font-weight: bold;
		font-size: 20px;
	}
	p {
		margin-bottom: 15px;
	}

</style>

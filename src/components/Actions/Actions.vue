<!--
  - @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
  -
  - @author John Molakvoæ <skjnldsv@protonmail.com>
  - @author Marco Ambrosini <marcoambrosini@pm.me
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
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<!-- Accessibility guidelines:
https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html -->

<docs>
### Single action

```
<Actions>
	<ActionButton icon="icon-delete" @click="alert('Delete')">Delete</ActionButton>
</Actions>
```

### Multiple actions

```
<Actions>
	<ActionButton icon="icon-edit" @click="alert('Edit')">Edit</ActionButton>
	<ActionButton icon="icon-delete" @click="alert('Delete')">Delete</ActionButton>
	<ActionLink icon="icon-external" title="Link" href="https://nextcloud.com" />
</Actions>
```

### Multiple actions with custom icon

```
<Actions default-icon="icon-edit">
	<ActionButton icon="icon-edit" @click="alert('Edit')">Edit</ActionButton>
	<ActionButton icon="icon-delete" @click="alert('Delete')">Delete</ActionButton>
	<ActionLink icon="icon-external" title="Link" href="https://nextcloud.com" />
</Actions>
```
</docs>
<template>
	<!-- if only one action, check if we need to bind to click or not -->
	<element v-if="isValidSingleAction && !forceMenu"
		v-tooltip.auto="firstAction.text"
		:aria-label="firstAction.text"
		v-bind="firstActionBinding"
		:class="[firstAction.icon, firstActionClass]" class="action-item action-item--single"
		rel="noreferrer noopener"
		@[firstActionEventBinding]="execFirstAction">
		<!-- fake slot to gather main action -->
		<span :aria-hidden="true" hidden>
			<!-- @slot All action elements passed into the default slot will be used -->
			<slot />
		</span>
	</element>

	<!-- more than one action -->
	<div v-else v-show="hasMultipleActions || forceMenu"
		:class="{'action-item--open': opened}"
		class="action-item"
		@keydown.up.exact.prevent="focusPreviousAction"
		@keydown.down.exact.prevent="focusNextAction"
		@keydown.shift.tab.prevent="focusPreviousAction"
		@keydown.page-up.exact.prevent="focusFirstAction"
		@keydown.page-down.exact.prevent="focusLastAction">
		<!-- If more than one action, create a popovermenu -->
		<Popover
			placement="auto"
			container="body"
			boundaries-element="body"
			:handle-resize="true"
			:open.sync="opened">
			<a slot="trigger"
				class="icon action-item__menutoggle"
				:class="defaultIcon"
				href="#" aria-haspopup="true"
				:aria-controls="randomId"
				:aria-expanded="opened" />
			<div v-if="opened"
				ref="menu"
				tabindex="-1"
				@mousemove="onMouseFocusAction">
				<!-- menu content -->
				<ul :id="randomId" tabindex="-1">
					<slot />
				</ul>
			</div>
		</Popover>
	</div>
</template>
<script>
import Tooltip from 'Directives/Tooltip'
import GenRandomId from 'Utils/GenRandomId'
import ValidateSlot from 'Utils/ValidateSlot'
import Popover from 'Components/Popover'
// This is the list of ALL the ALLOWED components
// in the default SLOT
const allowedChildren = [
	'ActionButton',
	'ActionCheckbox',
	'ActionInput',
	'ActionLink',
	'ActionRadio',
	'ActionRouter',
	'ActionSeparator',
	'ActionText',
	'ActionTextEditable'
]

const focusableSelector = '.focusable'

/**
 * The Actions component can be used to display one ore more actions.
 * If only a single action is provided, it will be rendered as an inline icon.
 * For more, a menu indicator will be shown and a popovermenu containing the
 * actions will be opened on click.
 *
 * @since 0.10.0
 */
export default {
	name: 'Actions',

	directives: {
		tooltip: Tooltip
	},

	components: {
		Popover
	},

	props: {
		/**
		 * Specify the open state of the popover menu
		 */
		open: {
			type: Boolean,
			default: false
		},

		/**
		 * Force the actions to display in a three dot menu
		 */
		forceMenu: {
			type: Boolean,
			default: false
		},

		/**
		 * Icon to show for the toggle menu button
		 * when more than one action is inside the actions component.
		 * Only replace the default three-dot icon if really necessary.
		 */
		defaultIcon: {
			type: String,
			default: 'action-item__menutoggle--default-icon'
		}
	},

	data() {
		return {
			actions: [],
			opened: false,
			focusIndex: 0,
			randomId: 'menu-' + GenRandomId(),
			offsetX: 0,
			offsetY: 0,
			// Making children reactive!
			// By binding this here, vuejs will track the object content
			// Needed for firstAction reactivity !!!
			children: this.$children
		}
	},

	computed: {
		/**
		 * Is there more than one action?
		 */
		hasMultipleActions() {
			return this.actions.length > 1
		},
		/**
		 * Is there any first action ?
		 * And is it allowed as a standalone element ?
		 */
		isValidSingleAction() {
			return this.actions.length === 1
				&& this.firstActionElement !== null
		},
		/**
		 * First action vnode
		 */
		firstActionVNode() {
			return this.actions[0]
		},
		/**
		 * Reactive binding to the first children
		 * Since we're here, it means we already passed all the proper checks
		 * we can assume the first action is the first children too
		 */
		firstAction() {
			return this.children[0]
				? this.children[0]
				: {}
		},

		/**
		 * Binding of the first action to the template
		 */
		firstActionBinding() {
			if (this.firstActionVNode && this.firstActionVNode.componentOptions) {
				const tag = this.firstActionVNode.componentOptions.tag
				if (tag === 'ActionLink') {
					return {
						is: 'a',
						href: this.firstAction.href,
						target: this.firstAction.target
					}
				}
				if (tag === 'ActionRouter') {
					return {
						is: 'router-link',
						to: this.firstAction.to,
						exact: this.firstAction.exact
					}
				}
				if (tag === 'ActionButton') {
					return {
						is: 'button'
					}
				}
			}
			// other action types are not allowed as standalone buttons
			return null
		},

		// return the event to bind if the firstActionVNode have an action
		firstActionEvent() {
			return this.firstActionVNode
				&& this.firstActionVNode.componentOptions
				&& this.firstActionVNode.componentOptions.listeners
				&& this.firstActionVNode.componentOptions.listeners.click
		},
		firstActionEventBinding() {
			return this.firstActionEvent ? 'click' : null
		},
		firstActionClass() {
			const staticClass = this.firstActionVNode && this.firstActionVNode.data.staticClass
			const dynClass = this.firstActionVNode && this.firstActionVNode.data.class
			return `${staticClass} ${dynClass}`
		}
	},

	beforeMount() {
		// init actions
		this.initActions()

		// filter invalid menu items
		ValidateSlot(this.$slots.default, allowedChildren, this)
	},
	beforeUpdate() {
		// ! since we're using $slots to manage our actions
		// ! we NEED to update the actions if anything change

		// update children & actions
		// no need to init actions again since we bound it to $children
		// and the array is now reactive
		// init actions
		this.initActions()
		ValidateSlot(this.$slots.default, allowedChildren, this)
	},

	methods: {

		// MENU KEYS & FOCUS MANAGEMENT
		// focus nearest focusable item on mouse move
		// DO NOT change the focus if the target is already focused
		// this will prevent issues with input being unfocused
		// on mouse move
		onMouseFocusAction(event) {
			if (document.activeElement === event.target) {
				return
			}

			const menuItem = event.target.closest('li')
			if (menuItem) {
				const focusableItem = menuItem.querySelector(focusableSelector)
				if (focusableItem) {
					const focusList = this.$refs.menu.querySelectorAll(focusableSelector)
					const focusIndex = Array.prototype.indexOf.call(focusList, focusableItem)
					if (focusIndex > -1) {
						this.focusIndex = focusIndex
						this.focusAction()
					}
				}
			}
		},
		removeCurrentActive() {
			const currentActiveElement = this.$refs.menu.querySelector('li.active')
			if (currentActiveElement) {
				currentActiveElement.classList.remove('active')
			}
		},
		focusAction() {
			// TODO: have a global disabled state for non input elements
			const focusElement = this.$refs.menu.querySelectorAll(focusableSelector)[this.focusIndex]
			if (focusElement) {
				const liMenuParent = focusElement.closest('li')
				focusElement.focus()
				if (liMenuParent) {
					this.removeCurrentActive()
					liMenuParent.classList.add('active')
				}
			}
		},
		focusPreviousAction() {
			this.focusIndex = Math.max(this.focusIndex - 1, 0)
			this.focusAction()
		},
		focusNextAction() {
			this.focusIndex = Math.min(this.focusIndex + 1, this.$refs.menu.querySelectorAll(focusableSelector).length - 1)
			this.focusAction()
		},
		focusFirstAction() {
			this.focusIndex = 0
			this.focusAction()
		},
		focusLastAction() {
			this.focusIndex = this.$el.querySelectorAll(focusableSelector).length - 1
			this.focusAction()
		},

		// ACTIONS MANAGEMENT
		// exec the first action
		execFirstAction(event) {
			if (this.firstActionEvent) {
				this.firstActionEvent(event)
			}
		},
		initActions() {
			// filter out invalid slots
			this.actions = (this.$slots.default || []).filter(node => !!node && !!node.componentOptions)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~Fonts/scss/iconfont-vue';

.action-item {
	position: relative;
	display: inline-block;

	// put a grey round background when menu is opened
	// or hover-focused
	&--single:hover,
	&--single:focus,
	&--single:active,
	&__menutoggle:hover,
	&__menutoggle:focus,
	&__menutoggle:active{
		border-radius: $clickable-area / 2;
		// good looking on dark AND white bg
		background-color: $icon-focus-bg !important; // override default server
		opacity: $opacity_full;
	}

	&.action-item--open .action-item__menutoggle {
		opacity: $opacity_full;
		border-radius: $clickable-area / 2;
		background-color: $action-background-hover;
	}

	// icons
	&--single,
	&__menutoggle {
		box-sizing: border-box;
		width: $clickable-area;
		height: $clickable-area;
		margin: 0;
		padding: $icon-margin;

		cursor: pointer;

		border: none;
		background-color: transparent;
	}

	// icon-more
	&__menutoggle {
		// align menu icon in center
		display: flex;
		align-items: center;
		justify-content: center;

		opacity: $opacity_normal;

		&:before {
			content: '';
		}

		&--default-icon {
			font-size: $icon-size;
			@include iconfont('more');
		}
	}

	&--single {
		opacity: $opacity_normal;
		&:hover,
		&:focus,
		&:active {
			opacity: $opacity_full;
		}
		// hide anything the slot is displaying
		& > [hidden] {
			display: none;
		}
	}
}
</style>

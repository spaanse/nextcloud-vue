/**
 * @copyright Copyright (c) 2020 Raimund Schlüßler <raimund.schluessler@mailbox.org>
 *
 * @author Raimund Schlüßler <raimund.schluessler@mailbox.org>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { config } from '@vue/test-utils'

global.TRANSLATIONS = []

// Mock nextcloud translate functions
config.mocks.$t = function(app, string) {
	return string
}
config.mocks.t = config.mocks.$t
global.t = config.mocks.$t

config.mocks.$n = function(app, singular, plural, count) {
	return singular
}
config.mocks.n = config.mocks.$n
global.n = config.mocks.$n

global.SCOPE_VERSION = 1

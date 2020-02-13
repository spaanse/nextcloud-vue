import GetText from 'node-gettext'
import { getLocale } from '@nextcloud/l10n'

const gt = new GetText()
TRANSLATIONS.map(data => gt.addTranslations(data.locale, 'messages', data.json))
gt.setLocale(getLocale())

export default gt

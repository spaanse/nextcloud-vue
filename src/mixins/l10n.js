import gt from '../l10n'

export default {
	methods: {
		t: gt.gettext.bind(gt),
		n: gt.ngettext.bind(gt)
	}
}

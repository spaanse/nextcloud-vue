const { GettextExtractor, JsExtractors } = require('gettext-extractor');

let extractor = new GettextExtractor();

extractor
    .createJsParser([
        JsExtractors.callExpression('t', {
            arguments: {
                text: 0,
                context: 1
            }
        }),
    ])
    .parseFilesGlob('./src/**/*.@(ts|js|vue)');

extractor.savePotFile('./l10n/messages.pot');

extractor.printStats();

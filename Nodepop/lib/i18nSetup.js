'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true, // This option causes language files to be reloaded if they change
  syncFiles: true, // This option creates literals in all languages at once
  cookie: 'nodepop-locale',
});

// i18n used in scripts
i18n.setLocale('en');

module.exports = i18n;

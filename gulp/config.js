var gulpConfig = {
  webPath: 'web',
  appPath: 'web/app',
  buildPath: 'web/app/build',
  vendorComponentsPath: 'web/components',
  compileFiles: {
    javascript: {
      'application.js': [
        'web/app/application.js',
        'web/app/components/core/module.js',
        'web/app/components/**/module.js',
        'web/app/components/**/*.js'
      ],
      'core-libraries.js': [
        'web/components/svg-injector/dist/svg-injector.min.js',
        'web/components/data-validation/data-validation.js',
        'web/components/jshashes/hashes.js',
        'web/components/javascript-utilities/utilities.js',
        'web/components/search-query/search-query.js',
        'web/components/jquery/dist/jquery.js',
        'web/components/angular/angular.js',
        'web/components/angular-messages/angular-messages.js',
        'web/components/angular-ui-router/release/angular-ui-router.js',
        'web/components/angular-mockable-http-provider/mockable-http-provider.js'
      ],
      'libraries.js': [
        'web/components/nucleus-angular*/module.js',
        'web/components/nucleus-angular*/**/*.js',
      ]
    },
    sass: {
      'web/app/styles/main.scss': 'web/app/build/main.css'
    }
  },
  sourceFiles: {
    javascript: [
      '*.js',
      '!gulpfile.js'
    ],
    html: [
      'web/*.html',
      'web/components/**/*.html',
      'web/app/components/**/*.html'
    ],
    sass: [
      'web/app/**/*.scss',
      'web/components/**/*.scss'
    ]
  },
  bowerCopy: [
    'lodash/dist/lodash.js',
    'svg-injector/dist/svg-injector.min.js',
    'data-validation/data-validation.js',
    'jshashes/hashes.js',
    'javascript-utilities/utilities.js',
    'search-query/search-query.js',
    'jquery/dist/jquery.js',
    'angular/angular.js',
    'angular-messages/angular-messages.js',
    'angular-ui-router/release/angular-ui-router.js',
    'nucleus-angular*/module.js',
    'nucleus-angular*/values.js',
    'nucleus-angular*/*-directive.js',
    'nucleus-angular*/*-factory.js',
    'nucleus-angular*/*-provider.js',
    'nucleus-angular*/*-controller.js',
    'nucleus-angular*/assets/**/*.*',
    'angular-mockable-http-provider/mockable-http-provider.js',
    'bourbon/dist/**/*.*',
    'neat/app/**/*.*'
  ]
};

module.exports = gulpConfig;

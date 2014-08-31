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
      'web/app/application.js',
      'web/app/components/**/*.js',
      '!web/app/components/**/*.spec.js'
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
    // 'nucleus-angular-core/module.js',
    // 'nucleus-angular-core/helper-factory.js',
    // 'nucleus-angular-core/defaults-factory.js',
    // 'nucleus-angular-core/values.js',
    // 'nucleus-angular-svg/module.js',
    // 'nucleus-angular-svg/helper-factory.js',
    // 'nucleus-angular-svg/svg-directive.js',
    // 'nucleus-angular-beat/module.js',
    // 'nucleus-angular-beat/beat-factory.js',
    // 'nucleus-angular-event/module.js',
    // 'nucleus-angular-event/event-directive.js',
    // 'nucleus-angular-form/module.js',
    // 'nucleus-angular-form/helper-factory.js',
    // 'nucleus-angular-form/email-directive.js',
    // 'nucleus-angular-form/match-directive.js',
    // 'nucleus-angular-form/max-value-directive.js',
    // 'nucleus-angular-form/min-value-directive.js',
    // 'nucleus-angular-form/range-value-directive.js',
    // 'nucleus-angular-form/max-length-directive.js',
    // 'nucleus-angular-form/min-length-directive.js',
    // 'nucleus-angular-form/range-length-directive.js',
    // 'nucleus-angular-form/required-directive.js',
    // 'nucleus-angular-form/equals-directive.js',
    // 'nucleus-angular-form/input-directive.js',
    // 'nucleus-angular-form/input-element-directive.js',
    // 'nucleus-angular-form/input-element-validation-directive.js',
    // 'nucleus-angular-form/resettable-directive.js',
    // 'nucleus-angular-tooltip/module.js',
    // 'nucleus-angular-tooltip/tooltip-directive.js',
    // 'nucleus-angular-extend-text/module.js',
    // 'nucleus-angular-extend-text/extend-text-controller.js',
    // 'nucleus-angular-extend-text/extend-text-directive.js',
    // 'nucleus-angular-auto-focus/module.js',
    // 'nucleus-angular-auto-focus/auto-focus-directive.js',
    // 'nucleus-angular-sass-framework/assets/**.*',
    'angular-mockable-http-provider/mockable-http-provider.js',
    'bourbon/dist/**/*.*',
    'neat/app/**/*.*'
  ]
};

module.exports = gulpConfig;

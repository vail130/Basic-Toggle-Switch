require.config
  shim:
    'jquery':
      exports: '$'
    'switch':
      deps: ['jquery']
    'underscore':
      exports: '_'
  
  paths:
    'es5-shim': 'vendor/es5-shim.min'
    'jquery': 'vendor/jquery.min'
    'underscore': 'vendor/underscore.min'
    'switch': 'vendor/jquery.basic-toggle-switch'
 
require [
  'es5-shim'
  'jquery'
  'underscore'
  'switch'
  'text!views/app.html'
], (ES5, $, _, BTS, appTemplate) ->
  $ ->
    $('#application').html _.template appTemplate
    $('.switch').each ->
      $(this).basicToggleSwitch()
    
    $switchOutput = $('.switch-output').first();
    $('.event-switch').basicToggleSwitch
      on: ->
        $switchOutput.html("<span class='span3' style='color: green;'>Switch is on</span>")
      off: ->
        $switchOutput.html("<span class='span3' style='color: red;'>Switch is on</span>")
      toggle: ->
        $switchOutput.append("<span class='span3'>Switch is toggled.</span>")

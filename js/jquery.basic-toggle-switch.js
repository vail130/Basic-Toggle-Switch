/*
 * jQuery Basic Toggle Switch Plugin 0.1.0
 * https://github.com/vail130/Basic-Toggle-Switch
 *
 * Copyright 2013, Vail Gold
 * https://vailgold.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function($) {
  
  var methods = {
    init: function(options) {
      var data = {
        state: (this.data('state') === 'on' ? 'on' : 'off'),
        originalHTML: this.get(0).outerHTML
      };
      
      var $switch = $(
        "<a href='#' class='bts-switch'>" +
          "<span class='bts-label bts-label-off'>Off</span>" +
          "<span class='bts-label bts-label-on'>On</span>" +
          "<i class='bts-toggle'></i>" +
        "</a>"
      );
      this.replaceWith($switch);
      
      if(typeof options === 'object' && options.hasOwnProperty) {
        if(options.hasOwnProperty('on') && typeof options.on === 'function') {
          $switch.on('on.basicToggleSwitch', options.on);
        }
        if(options.hasOwnProperty('off') && typeof options.off === 'function') {
          $switch.on('off.basicToggleSwitch', options.off);
        }
        if(options.hasOwnProperty('toggle') && typeof options.toggle === 'function') {
          $switch.on('toggle.basicToggleSwitch', options.toggle);
        }
        if(options.hasOwnProperty('state') && options.state === 'on') {
          data.state = 'on';
        }
      }
      
      $switch.data('basicToggleSwitch', data);
      
      if(data.state === 'on') {
        $switch.addClass('bts-on')
      }
      
      $switch.on('click', function(event) {
        event.preventDefault();
        methods.toggle.call($(this));
      });
      
      return $switch;
    },
    on: function() {
      var data = this.data('basicToggleSwitch');
      data.state = 'on';
      
      return this.addClass('bts-on')
        .data('basicToggleSwitch', data)
        .trigger('on.basicToggleSwitch', arguments)
        .trigger('toggle.basicToggleSwitch', arguments);
    },
    off: function() {
      var data = this.data('basicToggleSwitch');
      data.state = 'off';
      
      return this.removeClass('bts-on')
        .data('basicToggleSwitch', data)
        .trigger('off.basicToggleSwitch', arguments)
        .trigger('toggle.basicToggleSwitch', arguments);
    },
    toggle: function() {
      return (
        this.data('basicToggleSwitch').state === 'on'
          ? methods.off.apply(this, arguments)
          : methods.on.apply(this, arguments)
      );
    },
    state: function() {
      return this.data('basicToggleSwitch').state;
    },
    active: function() {
      return this.data('basicToggleSwitch').state === 'on';
    },
    destroy: function() {
      return this.off('.basicToggleSwitch')
        .replaceWith(this.data('basicToggleSwitch').originalHTML)
        .data('basicToggleSwitch', void 0);
    }
  };
  
  $.fn.basicToggleSwitch = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || method === void 0) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.basicToggleSwitch');
    }
  };

})(jQuery);

/**
 * skylark-domx-plugins-toggles - The skylark toggle plugin library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx-plugins/skylark-domx-plugins-toggles/
 * @license MIT
 */
!function(e,t){var i=t.define,require=t.require,a="function"==typeof i&&i.amd,s=!a&&"undefined"!=typeof exports;if(!a&&!i){var r={};i=t.define=function(e,t,i){"function"==typeof i?(r[e]={factory:i,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var i=t.split("/"),a=e.split("/");i.pop();for(var s=0;s<a.length;s++)"."!=a[s]&&(".."==a[s]?i.pop():i.push(a[s]));return i.join("/")}(t,e)}),resolved:!1,exports:null},require(e)):r[e]={factory:null,resolved:!0,exports:i}},require=t.require=function(e){if(!r.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=r[e];if(!module.resolved){var i=[];module.deps.forEach(function(e){i.push(require(e))}),module.exports=module.factory.apply(t,i)||null,module.resolved=!0}return module.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-domx-plugins-toggles/toggles",["skylark-domx-plugins-base/plugins"],function(e){"use strict";return e.toggles={}}),e("skylark-domx-plugins-toggles/checkbox",["skylark-langx/langx","skylark-domx/browser","skylark-domx/eventer","skylark-domx/noder","skylark-domx/geom","skylark-domx/query","skylark-domx-plugins-base","./toggles"],function(e,t,i,a,s,r,o,n){var l=o.Plugin.inherit({klassName:"Checkbox",pluginName:"lark.toggles.checkbox",options:{ignoreVisibilityCheck:!1},_construct:function(t,i){this.overrided(t,i);var a=this.$();if("label"!==t.tagName.toLowerCase())throw new Error("Checkbox must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/checkbox.html for example of proper markup. Call `.checkbox()` on the `<label>` not the `<input>`");if(this.$label=a,this.$chk=this.$label.find('input[type="checkbox"]'),this.$container=a.parent(".checkbox"),!this.options.ignoreVisibilityCheck&&this.$chk.css("visibility").match(/hidden|collapse/))throw new Error("For accessibility reasons, in order for tab and space to function on checkbox, checkbox `<input />`'s `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.");var s=this.$chk.attr("data-toggle");this.$toggleContainer=r(s),this.$chk.on("change",e.proxy(this.itemchecked,this)),this.setInitialState()},setInitialState:function(){var e=this.$chk,t=e.prop("checked"),i=e.prop("disabled");this.setCheckedState(e,t),this.setDisabledState(e,i)},setCheckedState:function(e,t){var i=e,a=this.$label,s=this.$toggleContainer;t?(i.prop("checked",!0),a.addClass("checked"),s.removeClass("hide hidden"),a.trigger("checked.lark.checkbox")):(i.prop("checked",!1),a.removeClass("checked"),s.addClass("hidden"),a.trigger("unchecked.lark.checkbox")),a.trigger("changed.lark.checkbox",t)},setDisabledState:function(e,t){var i=r(e),a=this.$label;return t?(i.prop("disabled",!0),a.addClass("disabled"),a.trigger("disabled.lark.checkbox")):(i.prop("disabled",!1),a.removeClass("disabled"),a.trigger("enabled.lark.checkbox")),i},itemchecked:function(e){var t=r(e.target),i=t.prop("checked");this.setCheckedState(t,i)},toggle:function(){var e=this.isChecked();e?this.uncheck():this.check()},check:function(){this.setCheckedState(this.$chk,!0)},uncheck:function(){this.setCheckedState(this.$chk,!1)},isChecked:function(){var e=this.$chk.prop("checked");return e},enable:function(){this.setDisabledState(this.$chk,!1)},disable:function(){this.setDisabledState(this.$chk,!0)},destroy:function(){return this.$label.remove(),this.$label[0].outerHTML}});return l.prototype.getValue=l.prototype.isChecked,o.register(l),n.Checkbox=l}),e("skylark-domx-plugins-toggles/collapse",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-query","skylark-domx-plugins-base","./toggles"],function(e,t,i,a,s,r){"use strict";var o=s.Plugin.inherit({klassName:"Collapse",pluginName:"lark.toggles.collapse",options:{toggle:!0},_construct:function(e,t){this.overrided(e,t),this.$element=this.$(),this.transitioning=null,this.options.toggle&&this.toggle()},dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){if(!this.transitioning&&!this.$element.hasClass("in")){var a=i.create("show.collapse");if(this.$element.trigger(a),!a.isDefaultPrevented()){var s=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded",!0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[s](""),this.transitioning=0,this.$element.trigger("shown.collapse")};if(!t.support.transition)return r.call(this);var n=e.camelCase(["scroll",s].join("-"));this.$element.one("transitionEnd",e.proxy(r,this)).emulateTransitionEnd(o.TRANSITION_DURATION)[s](this.$element[0][n])}}},hide:function(){if(!this.transitioning&&this.$element.hasClass("in")){var a=i.create("hide.collapse");if(this.$element.trigger(a),!a.isDefaultPrevented()){var s=this.dimension();this.$element[s](this.$element[s]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.transitioning=1;var r=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.collapse")};if(!t.support.transition)return r.call(this);this.$element[s](0).one("transitionEnd",e.proxy(r,this)).emulateTransitionEnd(o.TRANSITION_DURATION)}}},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}});return o.TRANSITION_DURATION=350,s.register(o),r.Collapse=o}),e("skylark-domx-plugins-toggles/radio",["skylark-langx/langx","skylark-domx/browser","skylark-domx/eventer","skylark-domx/noder","skylark-domx/geom","skylark-domx/query","skylark-domx-plugins-base","./toggles"],function(e,t,i,a,s,r,o,n){var l=o.Plugin.inherit({klassName:"Radio",pluginName:"lark.toggles.radio",options:{ignoreVisibilityCheck:!1},_construct:function(t,i){if(this.overrided(t,i),"label"!==t.tagName.toLowerCase())throw new Error("Radio must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/radio.html for example of proper markup. Call `.radio()` on the `<label>` not the `<input>`");if(this.$label=this.$(),this.$radio=this.$label.find('input[type="radio"]'),this.groupName=this.$radio.attr("name"),!this.options.ignoreVisibilityCheck&&this.$radio.css("visibility").match(/hidden|collapse/))throw new Error("For accessibility reasons, in order for tab and space to function on radio, `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.");var a=this.$radio.attr("data-toggle");this.$toggleContainer=r(a),this.$radio.on("change",e.proxy(this.itemchecked,this)),this.setInitialState()},setInitialState:function(){var e=this.$radio,t=e.prop("checked"),i=e.prop("disabled");this.setCheckedState(e,t),this.setDisabledState(e,i)},resetGroup:function(){var e=r('input[name="'+this.groupName+'"]');e.each(function(e,t){var i=r(t),a=i.parent(),s=i.attr("data-toggle"),o=r(s);a.removeClass("checked"),o.addClass("hidden")})},setCheckedState:function(e,t){var i=e,a=i.parent(),s=i.attr("data-toggle"),o=r(s);t?(this.resetGroup(),i.prop("checked",!0),a.addClass("checked"),o.removeClass("hide hidden"),a.trigger("checked.lark.radio")):(i.prop("checked",!1),a.removeClass("checked"),o.addClass("hidden"),a.trigger("unchecked.lark.radio")),a.trigger("changed.lark.radio",t)},setDisabledState:function(e,t){var i=r(e),a=this.$label;return t?(i.prop("disabled",!0),a.addClass("disabled"),a.trigger("disabled.lark.radio")):(i.prop("disabled",!1),a.removeClass("disabled"),a.trigger("enabled.lark.radio")),i},itemchecked:function(e){var t=r(e.target);this.setCheckedState(t,!0)},check:function(){this.setCheckedState(this.$radio,!0)},uncheck:function(){this.setCheckedState(this.$radio,!1)},isChecked:function(){var e=this.$radio.prop("checked");return e},enable:function(){this.setDisabledState(this.$radio,!1)},disable:function(){this.setDisabledState(this.$radio,!0)},destroy:function(){return this.$label.remove(),this.$label[0].outerHTML}});return l.prototype.getValue=l.prototype.isChecked,o.register(l),n.Radio=l}),e("skylark-domx-plugins-toggles/tab",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-domx-plugins-base","./toggles"],function(e,t,i,a,s,r,o,n){"use strict";var l=o.Plugin.inherit({klassName:"Tab",pluginName:"lark.toggles.tab",_construct:function(t,i){this.element=r(t),this.target=i&&i.target,this.element.on("click.domx.toggles.tab",e.proxy(function(e){e.preventDefault(),this.show()},this))},show:function(){var e=this.element,t=e.closest("ul:not(.dropdown-menu)"),a=this.target||e.data("target");if(a||(a=(a=e.attr("href"))&&a.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var s=t.find(".active:last a"),o=i.create("hide.lark.tab",{relatedTarget:e[0]}),n=i.create("show.lark.tab",{relatedTarget:s[0]});if(s.trigger(o),e.trigger(n),!n.isDefaultPrevented()&&!o.isDefaultPrevented()){var l=r(a);this.activate(e.closest("li"),t),this.activate(l,l.parent(),function(){s.trigger({type:"hidden.lark.tab",relatedTarget:e[0]}),e.trigger({type:"shown.lark.tab",relatedTarget:s[0]})})}}},activate:function(e,i,a){var s=i.find("> .active"),r=a&&t.support.transition&&(s.length&&s.hasClass("fade")||!!i.find("> .fade").length);function o(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),a&&a()}s.length&&r?s.one("transitionEnd",o).emulateTransitionEnd(l.TRANSITION_DURATION):o(),s.removeClass("in")}});return l.TRANSITION_DURATION=150,o.register(l),n.Tab=l}),e("skylark-domx-plugins-toggles/main",["./toggles","./checkbox","./collapse","./radio","./tab"],function(e){return e}),e("skylark-domx-plugins-toggles",["skylark-domx-plugins-toggles/main"],function(e){return e})}(i),!a){var o=require("skylark-langx-ns");s?module.exports=o:t.skylarkjs=o}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-toggles.js.map

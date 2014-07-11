(function($) {
	/*
	 * Auto-growing textareas; technique ripped from Facebook
	 */
	$.fn.autogrow = function(options) {
		this.filter('textarea').each(function() {

			var $this = $(this),
			minHeight = $this.outerHeight(),
			lineHeight = $this.css('lineHeight'),
			maxAllowedHeight = options.maxHeight && parseInt(options.maxHeight) > 0 ? parseInt(options.maxHeight) : 0,
			maxAllowedChars = options.maxChars && parseInt(options.maxChars) > 0 ? parseInt(options.maxChars) : 0;

			var shadow = $('<div></div>').css({
				position:   'absolute',
				top:        -10000,
				left:       -10000,
				width:      $(this).width(),
				fontSize:   $this.css('fontSize'),
				fontFamily: $this.css('fontFamily'),
				lineHeight: $this.css('lineHeight'),
				resize:     'none'
			}).appendTo(document.body);

			var update = function() {
				var val = this.value;
				if(maxAllowedChars > 0 && val.length > maxAllowedChars) {
					val = val.substring(0, maxAllowedChars);
					this.value = val;
					return;
				}
				val = val.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/&/g, '&amp;')
					.replace(/\n/g, '<br/>');
				shadow.html(val);
				var newShadowHeight = Math.max(shadow.height() + 20, minHeight);
				if(maxAllowedHeight > 0 && newShadowHeight > maxAllowedHeight) {
					newShadowHeight = maxAllowedHeight;
				}
				$(this).css('height', newShadowHeight);
			};

			$(this).change(update).keyup(update).keydown(update);
			update.apply(this);
		});
		return this;
	}
})(jQuery);
+function($) {
	var INDICATOR_CLASS = 'simple-draggable-indicator',
		INDICATOR_STYLEID = 'simpleDraggableIndicator',
		INDICATOR_STYLE = [
			'.' + INDICATOR_CLASS + ' {',
				'position: absolute;',
				'width: 100%;',
				'height: 3px;',
				'background: #333;',
				'opacity: 0.6;',
			'}'
		].join('')

	$.fn.simpleDraggable = function(callback) {
		var list = $(this),
			indicator = $('<div class="'+INDICATOR_CLASS+'"></div>')

		if (!$('#'+INDICATOR_STYLEID).length)
			$('<style id="'+INDICATOR_STYLEID+'">'+INDICATOR_STYLE+'</style>').prependTo('head')

		function onMouseMove(e) {
			var prev = list.children().filter(function() {
				return !$(this).hasClass(INDICATOR_CLASS) && $(this).offset().top < e.pageY
			}).last()

			if (prev.length) {
				if (!prev.next().is(indicator))
					indicator.remove().insertAfter(prev)
			}
			else {
				if (!list.children().first().is(indicator))
					indicator.remove().prependTo(list)
			}

			e.preventDefault()
		}

		function onMouseUp(e) {
			var index = list.children().index(indicator)

			indicator.remove()

			$(document).off('mousemove', onMouseMove).off('mouseup', onMouseUp)

			callback && callback(index)
		}

		$(document).on('mousemove', onMouseMove).on('mouseup', onMouseUp)
	}
}(window.jQuery)
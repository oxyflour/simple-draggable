+function($) {
	var INDICATOR_CLASS = 'simple-draggable-indicator',
		STARTITEM_CLASS = 'simple-draggable-start',
		INDICATOR_STYLEID = 'simpleDraggableStyle',
		INDICATOR_STYLE = [
			'.' + INDICATOR_CLASS + ' {',
				'position: absolute;',
				'width: 100%;',
				'height: 2px;',
				'background: #aaa;',
				'opacity: 0.5;',
			'}',
			'.' + STARTITEM_CLASS + ' {',
				'opacity: 0.5;',
			'}',
		].join('')

	$.fn.simpleDraggable = function(callback, downEvent) {
		var list = $(this),
			indicator = $('<div class="'+INDICATOR_CLASS+'"></div>'),
			startItem = null

		if (!$('#'+INDICATOR_STYLEID).length)
			$('<style id="'+INDICATOR_STYLEID+'">'+INDICATOR_STYLE+'</style>').prependTo('head')

		function onMouseMove(e) {
			var next = null
			list.children().get().some(function(elem) {
				return (elem = $(elem)) && !elem.hasClass(INDICATOR_CLASS) &&
					elem.offset().top + elem.height() > e.pageY && (next = elem)
			})

			if (next) {
				if (!next.prev().is(indicator))
					indicator.remove().insertBefore(next)
			}
			else {
				if (!list.children().last().is(indicator))
					indicator.remove().appendTo(list)
			}

			if (next && !startItem)
				startItem = next.addClass(STARTITEM_CLASS)

			e.preventDefault()
		}

		function onMouseUp(e) {
			var index = list.children().index(indicator)

			if (indicator.parent().length)
				indicator.remove()
			
			if (startItem)
				startItem.removeClass(STARTITEM_CLASS)

			$(document).off('mousemove', onMouseMove).off('mouseup', onMouseUp)

			callback && callback(index)
		}

		$(document).on('mousemove', onMouseMove).on('mouseup', onMouseUp)

		downEvent && onMouseMove(downEvent)

		return this
	}
}(window.jQuery)
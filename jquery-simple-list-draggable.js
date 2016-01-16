+function($) {
	var INDICATOR_CLASS = 'simple-draggable-indicator',
		INDICATOR_SHOWN_CLASS = 'simple-draggable-indicator-shown',
		STRATITEM_SHOWN_CLASS = 'simple-draggable-start-shown',
		STARTITEM_SHOWN_DELAY = 200,
		INDICATOR_STYLE_ID = 'simpleDraggableStyle',
		INDICATOR_STYLE_CONTENT = [
			'.' + INDICATOR_CLASS + ' {',
				'position: absolute;',
				'width: 100%;',
				'height: 2px;',
				'background: #aaa;',
				'opacity: 0.0;',
			'}',
			'.' + INDICATOR_SHOWN_CLASS + ' {',
				'opacity: 0.5;',
			'}',
			'.' + STRATITEM_SHOWN_CLASS + ' {',
				'opacity: 0.5;',
			'}',
		].join('')

	$.fn.simpleDraggable = function(callback, downEvent) {
		var list = $(this),
			indicator = $('<div class="'+INDICATOR_CLASS+'"></div>'),
			startItem = null

		if (!$('#'+INDICATOR_STYLE_ID).length)
			$('<style id="'+INDICATOR_STYLE_ID+'">'+INDICATOR_STYLE_CONTENT+'</style>').prependTo('head')

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

			if (next && !startItem) {
				startItem = next
				setTimeout(function() {
					startItem && startItem.addClass(STRATITEM_SHOWN_CLASS)
					indicator && indicator.addClass(INDICATOR_SHOWN_CLASS)
				}, STARTITEM_SHOWN_DELAY)
			}

			e.preventDefault()
		}

		function onMouseUp(e) {
			var index = list.children().index(indicator)

			if (indicator.parent().length) {
				indicator.remove()
				indicator = null
			}
			
			if (startItem) {
				startItem.removeClass(STRATITEM_SHOWN_CLASS)
				startItem = null
			}

			$(document).off('mousemove', onMouseMove).off('mouseup', onMouseUp)

			callback && callback(index)
		}

		$(document).on('mousemove', onMouseMove).on('mouseup', onMouseUp)

		downEvent && onMouseMove(downEvent)

		return this
	}
}(window.jQuery)
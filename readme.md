#simple-list-draggable

call it when mouse is down on list then you can get position index when mouse up
```
$('#list li').on('mousedown', function(e) {
	$('#list').simpleDraggable(function(index) {
		console.log(index)
	})
})
```

##License
MIT
expandContactBar = ()->
	$('#contact-bar').addClass 'expanded'


$('#portfolioLink').click (e)->
	e.preventDefault()
	$.scrollTo '#portfolio', 500, {offset: -140}

$('#contactLink').click (e)->
	e.preventDefault()
	expandContactBar()
	$('#contactName').focus()

conditionizr.config
  tests: 
    'ie8': ['class'],
    'ie9': ['class'],
    'ie10': ['class']
  
expandContactBar = ()->
  $('#contact-bar').addClass 'expanded'

hideContactBar = ()->
  $('#contact-bar').removeClass 'expanded'

$('#contact-bar').on 'click', (e)->
  if $(e.target).attr('id') is 'close'
    hideContactBar()
  else
    expandContactBar()

$('#contact-bar #close').click (e)->
  e.preventDefault()
  hideContactBar()

$('#contact-form input').focus (e)->
  expandContactBar()

$('#portfolioLink').click (e)->
  e.preventDefault()
  offset = if $('html').hasClass('logo-enabled') then -100 else 0
  $.scrollTo '#portfolio', 500, {offset: offset}

$('#contactLink').click (e)->
  e.preventDefault()

  if !conditionizr.ie8 && !conditionizr.ie9 && !conditionizr.ie10
    expandContactBar()
  else
    $.scrollTo '#closing', 500

$('#contact-form form').submit (e)->
  e.preventDefault()

  name = $('#contactName').val()
  email = $('#contactEmail').val()
  message = $('#contactEmail').val()

  if not (name and email and message)
    swal 
      title: "Whoops."
      text: "Please ensure you have a contact name, email and message."
      type: "error"
      allowOutsideClick: true

  else
    $.post '/contact/', 
      name: name,
      email: email,
      message: message,
      _csrf: window.csrf
    , (data, statsus)->
      swal 
        title: "Thanks!"
        text: "I'll get back to you as soon as possible."
        type: "success"
        allowOutsideClick: true
expandContactBar = ()->
  $('#contact-bar').addClass 'expanded'

$('#contact-form input').focus (e)->
  expandContactBar()

$('#portfolioLink').click (e)->
  e.preventDefault()
  $.scrollTo '#portfolio', 500, {offset: -140}

$('#contactLink').click (e)->
  e.preventDefault()
  expandContactBar()
  $('#contactName').focus()

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

function filterItems (filterField, titles) {
  var userInput = filterField.value

  titles.forEach(function (element) {
    var item = element.parentNode.parentNode
    var title = element.textContent.trim()
    var keywords = []
    var desc = []

    item.querySelectorAll('.keywords li').forEach(function (element) {
      keywords.push(element.textContent.trim())
    })

    item.querySelectorAll('.desc').forEach(function (element) {
      desc.push(element.textContent.trim())
    })

    if (filterMatch(userInput, [title, keywords, desc]) || userInput === '') {
      item.classList.remove('hidden')
    } else {
      item.classList.add('hidden')
    }
  })
}

function filterMatch (needle, haystack) {
  var regex = new RegExp(needle, 'i')
  var match = false

  haystack.forEach(function (element) {
    if (regex.test(element)) match = true
  })

  return match
}

window.addEventListener('load', function () {
  var container = document.body.querySelectorAll('.container')[0]
  var titles = document.body.querySelectorAll('.item h2 a')
  var timeout = null

  var node = document.createElement('p')
  node.innerHTML = '<input type="text" placeholder="Filter items with RegEx (Esc to clear)" class="filter" />'
  document.body.insertBefore(node, container)

  var filterField = document.body.querySelectorAll('.filter')[0]

  filterField.addEventListener('input', function () {
    filterItems(filterField, titles)
  })

  filterField.addEventListener('keyup', function () {
    clearTimeout(timeout)

    timeout = setTimeout(function () {
      window.location.hash = encodeURIComponent(filterField.value)
    }, 1000)
  })

  document.body.addEventListener('keydown', function (keyPressed) {
    if (keyPressed.key === 'Escape' || keyPressed.key === 'Esc' || keyPressed.keyCode === 27) {
      keyPressed.preventDefault()
      window.location.hash = ''
      filterField.value = ''
      filterField.focus()
      filterItems(filterField, titles)
    }
  })

  filterField.focus()
  filterField.value = ''
  filterField.value = decodeURIComponent(window.location.hash.substr(1))

  filterItems(filterField, titles)
})

const ghAPI = 'https://api.github.com/users'

const STORE = {
  username: '',
  repos: []
}

function render() {
  const searchResults = STORE.repos.map(repo =>
    `<li><a href="${repo.url}" target="_blank">${repo.name}</a></li>`
  )

  $('.js-search-results').html(searchResults)
}

function handleSearch() {
  $('.main-form').on('submit', function(event) {
    event.preventDefault()
    STORE.username = $('#username').val()

    fetch(`${ghAPI}/${STORE.username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }).then(res => res.json())
      .then(data => {
        data.map(repo => {
          STORE.repos.push({name: repo.name, url: repo.html_url})
        })

        render()
      })
  })
  
}

$(handleSearch)
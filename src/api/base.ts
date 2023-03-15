const env = 'development'

const url = {
  'development': 'http://localhost:7000/',
  'production': '/api/'
}

export default {
  base_url: url[env]
}

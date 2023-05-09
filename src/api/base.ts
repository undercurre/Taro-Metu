const env = 'dev'

const url = {
  'dev': 'http://localhost:3000/',
  'prod': 'http://81.71.85.68:8086/api/'
}

export default {
  base_url: url[env]
}

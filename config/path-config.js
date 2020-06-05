module.exports = {

  development: {
    auth_sv: 'https://chotuve-grupo2-auth-server-dev.herokuapp.com'
  },
  testing: {
    auth_sv: 'https://httpbin.org/status/200'
  },
  testing_failing_auth: {
    auth_sv: 'https://httpbin.org/status/400'
  },
  production: {
    auth_sv: ''
  }
}

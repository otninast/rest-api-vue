<template>
<div>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>



          <v-card-text>
            <v-alert v-if="non_field_errors" :value="true" type="error">
              {{non_field_errors[0]}}
            </v-alert>
            <v-form>
              <v-text-field
              prepend-icon="person"
              v-model="data.username"
              label="Login ID"
              :rules="[v => !!v || 'Login ID is required']"
              required
              ></v-text-field>
              <v-text-field
              prepend-icon="lock"
              v-model="data.password"
              label="Password"
              :rules="[v => !!v || 'Password is required']"
              required
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              ></v-text-field>
            </v-form>
          </v-card-text>



          <v-card-actions>
            <v-layout>
              <v-flex>
                <v-btn @click="login" color="primary">Login</v-btn>
                <v-btn to="/create" color="success">Create</v-btn>
              </v-flex>
              <v-flex>
                <v-btn @click="loginAsGuest" color="orange" outline>Guest User</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'
// import http from '../http'

export default {
  name: 'Login',
  props: ['res', 'errs', 'errors', 'non_field_errors'],
  data() {
    return {
      data: {
        username: null,
        // user: null,
        password: null,
      },
      show: false,
    }
  },
  methods: {

    getUser: function () {
      axios
        .get(process.env.VUE_APP_API_URL_BASE+'/login_user/')
        .then(response => {
          this.$store.commit('setUser', response.data.data.user)
          if (response.data.data.profile) {
            this.$store.commit('setProfile', response.data.data.profile)
          }
        })
        .catch(error => (this.error = error))
    },

    login: function() {
      axios
        .post(process.env.VUE_APP_API_URL_BASE+'/auth/', this.data)
        .then(response => {
          localStorage.setItem('token', 'JWT '+response.data.token),
          axios.defaults.headers.common['Authorization'] = localStorage.token
        })
        .then(() => {
          this.getUser()
          this.$router.push('/')
        })
        .catch(response => {
          this.errors = response.response.data
          this.non_field_errors = response.response.data.non_field_errors
        })
    },

    loginAsGuest: function() {
      axios
        .post(process.env.VUE_APP_API_URL_BASE+'/auth/',
          {
            'username': process.env.VUE_APP_API_USER_ID,
            'password': process.env.VUE_APP_API_USER_PASS
          })
        .then(response => {
          localStorage.setItem('token', 'JWT '+response.data.token),
          axios.defaults.headers.common['Authorization'] = localStorage.token
        })
        .then(() => {
          this.getUser()
          this.$router.push('/')
        })
        .catch(response => {
          this.errors = response.response.data
          this.non_field_errors = response.response.data.non_field_errors
        })
    },

  }
}
</script>

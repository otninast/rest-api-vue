<template>
<div>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>



          <v-card-text>
            <v-alert type="error">
              <div v-for="error in errors" :key="error.id">{{ error }}</div>
              <div v-for="error in non_field_errors" :key="error.id">{{ error }}</div>
              <!-- <div>{{errors}}</div>
              <div>{{non_field_errors}}</div> -->
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
            <v-spacer></v-spacer>
            <v-btn @click="login" color="primary">Login</v-btn>
            <v-btn to="/create" color="success">Create</v-btn>
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
        // .get('http://127.0.0.1:8000/login_user/')
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
        // .post('http://127.0.0.1:8000/auth/', this.data)
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
  }
}
</script>

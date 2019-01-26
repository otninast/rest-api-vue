<template>
<div>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12>
      <v-card>
        <v-card-title class="indigo white--text">
          <h1>USER CREATE</h1>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="createErrors" :value="true" type="error">
            <h4>{{createErrors.username[0]}}</h4>
          </v-alert>
          <v-form>
            <v-text-field
              v-model="data.username"
              v-validate="'required|alpha_num|min:4|max:20'"
              :error-messages="errors.collect('username')"
              name="username"
              label="Login ID"
              prepend-icon="person">
            </v-text-field>
            <v-layout>
              <!-- <span v-if="errors.has('username')" class="red-.-text">{{ errors.first('username') }}</span> -->
            </v-layout>
            <v-text-field
              v-model="data.password"
              v-validate="'required|alpha_num|min:8|max:20'"
              :error-messages="errors.collect('password')"
              name="password"
              ref="password"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              prepend-icon="lock"
              @click:append="show1 = !show1">
            </v-text-field>
            <v-layout>
              <!-- <span v-if="errors.has('password')" class="red-.-text">{{ errors.first('password') }}</span> -->
            </v-layout>
            <v-text-field
              v-model="repass"
              name="repassword"
              v-validate="'required|confirmed:password'"
              :error-messages="errors.collect('repassword')"
              :append-icon="show2 ? 'visibility_off' : 'visibility'"
              :type="show2 ? 'text' : 'password'"
              label="Password Again"
              prepend-icon="lock"
              @click:append="show2 = !show2">
            </v-text-field>
            <v-layout>
              <!-- <ul>
                <li v-for="error in errors.all()" :key="error">{{ error }}</li>
              </ul> -->
            </v-layout>
            <v-btn to="/login">back</v-btn>
            <v-btn @click="create" color="success">USER Create</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Create',
  props: ['info', 'createErrors', 'non_field_errors'],
  data() {
    return {
      data: {
        varidate: null,
        username: null,
        password: null,
      },
      show1: false,
      show2: false,
      repass: null,
    }
  },
  methods: {
    create: function() {
      this.$validator.validate().then(result => {
        if (result) {
          axios
            .post(process.env.VUE_APP_API_URL_BASE+'/users/', this.data)
            .then(response => {
              this.info = response
              this.$router.push('/login')
            })
            .catch(errors => {
              this.createErrors = errors.response.data
              this.non_field_errors = errors.response.data.non_field_errors
            })
        }
      })
    }
  },
}
</script>

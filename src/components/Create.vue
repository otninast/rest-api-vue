<template>
<div>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12>
      <v-card>
        <v-card-title>
          <v-alert type="error">
            {{errors}}
            {{non_field_errors}}
          </v-alert>
        </v-card-title>
        <v-card-title class="indigo white--text">
          <h1>CREATE</h1>
        </v-card-title>
        <v-card-text>
          <v-alert :value="errors" type="error">
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </v-alert>
          <v-form>
            <v-text-field
            v-model="data.username"
            label="Login ID"
            required
            :rules="[v => !!v || 'username is required']"
            prepend-icon="person"
            ></v-text-field>
            <v-text-field
            v-model="data.password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            required
            :rules="[v => !!v || 'password is required']"
            prepend-icon="lock"
            @click:append="show1 = !show1"
            ></v-text-field>
            <!-- <v-text-field
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :type="show2 ? 'text' : 'password'"
            label="Password"
            required
            :rules="[v => v !== data.password || 'password do not match']"
            prepend-icon="lock"
            @click:append="show2 = !show2"
            ></v-text-field> -->
            <v-btn @click="create">Create</v-btn>
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
  props: ['info', 'errors', 'non_field_errors'],
  data() {
    return {
      data: {
        username: null,
        password: null,
      },
      show1: false,
      show2: false,
    }
  },
  methods: {
    create: function() {
      axios
        .post('http://127.0.0.1:8000/users/', this.data)
        .then(response => (this.info = response))
        .then(this.$router.push('/login'))
        .catch(response => {
          this.errors = response.response.data
          this.non_field_errors = response.response.data.non_field_errors
        })
    }
  },
}
</script>

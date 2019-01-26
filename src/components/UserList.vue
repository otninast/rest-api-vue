<template>
<div>
  <v-container>
    <div v-for="(user, userlabel) in userlist" :key="userlabel">
      <v-card class="my-4">
        <v-card-title primary-title class="indigo white--text">
          <h1>{{user.username}}</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap align-center justify-center mb-2>

            <v-flex xs4 md4 lg4>
              <v-layout column justify-center align-center>
                <v-flex xs12 md12 lg12>
                  <h2>{{user.username}}</h2>
                </v-flex>
                <v-flex xs12 md12 lg12>
                  <v-avatar size="120" color="grey">
                    <img :src="user.profile.profile_image">
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-flex>


            <v-flex xs8 md8 lg8>
              <v-layout column justify-start>

                  <v-layout row align-center mb-2>
                    <v-flex  xs6 md6 lg6>
                      <v-subheader class="text-xs-left">Full Name</v-subheader>
                    </v-flex>
                    <v-flex xs6 md6 lg6>
                      <div class="text-xs-left">{{user.profile.family_name}} {{user.profile.first_name}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap align-center mb-2>
                    <v-flex  xs6 md6 lg6>
                      <v-subheader class="text--left">Birthday</v-subheader>
                    </v-flex>
                    <v-flex xs6 md6 lg6>
                      <div class="text-xs-left">{{user.profile.birthday}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap align-center mb-2>
                    <v-flex  xs6 md6 lg6>
                      <v-subheader class="text-xs-left">Sex</v-subheader>
                    </v-flex>
                    <v-flex  xs6 md6 lg6>
                      <div class="text-xs-left">{{user.profile.sex}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap align-center mb-2>
                    <v-flex  xs6 md6 lg6>
                      <v-subheader class="text-xs-left">Style One</v-subheader>
                    </v-flex>
                    <v-flex  xs6 md6 lg6>
                      <div class="text-xs-left">{{user.profile.style_one}}</div>
                    </v-flex>
                  </v-layout>

              </v-layout>
            </v-flex>

          </v-layout>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserList',
  props: ['errors'],
  data() {
    return {
      url: process.env.VUE_APP_API_URL_BASE + '/users/',
      userlist: null,
    }
  },
  methods: {
    getList: function() {
      axios
        .get(this.url)
        .then(response => (this.userlist = response.data.results))
        .catch(error => (this.errors = error))
    },
    getDetail: function(id) {
      this.$router.push(`/userlist/${id}`)
    },
  },
  created() {
    this.getList()
  }
}
</script>

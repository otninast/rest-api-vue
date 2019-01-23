<template>
<div>
  <v-container>
    <div v-for="(user, userlabel) in userlist" :key="userlabel">
      <v-card class="my-4">
        <v-card-title primary-title class="indigo white--text">
          <h1>{{user.username}}</h1>
        </v-card-title>
        <v-card-text>
          <!-- <div v-for="(item, itemlabel) in user" :key="itemlabel"> -->
            <v-layout row align-center justify-center mb-2>
              <v-flex xs3>
                <v-layout column justify-center align-center>
                  <h2>{{user.username}}</h2>
                  <v-avatar size="120" color="grey">
                    <img :src="user.profile.profile_image">
                  </v-avatar>
                </v-layout>
              </v-flex>

              <v-flex xs12>
                <v-layout column wrap>

                  <v-layout row align-center justify-center mb-2>
                    <v-flex xs3>
                      <v-subheader>Full Name</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                      <div>{{user.profile.family_name}} {{user.profile.first_name}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row align-center justify-center mb-2>
                    <v-flex xs3>
                      <v-subheader>Birthday</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                      <div>{{user.profile.birthday}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row align-center justify-center mb-2>
                    <v-flex xs3>
                      <v-subheader>Sex</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                      <div>{{user.profile.sex}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row align-center justify-center mb-2>
                    <v-flex xs3>
                      <v-subheader>Style One</v-subheader>
                    </v-flex>
                    <v-flex xs3>
                      <div>{{user.profile.style_one}}</div>
                    </v-flex>
                  </v-layout>

                </v-layout>
              </v-flex>
            </v-layout>



          <!-- </div> -->
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

<template>
<div id="app">

  <v-navigation-drawer fixed v-model="drawer" app>

    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="'http://127.0.0.1:8000' + $store.state.profile.profile_image" v-if="$store.state.profile">
            <img v-else>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="$store.state.user">{{$store.state.user.username}}</v-list-tile-title>
            <v-list-tile-title v-else>Gest User</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense>
      <v-divider></v-divider>

      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/profile">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/userlist">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>User List</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/input">
        <v-list-tile-action>
          <v-icon>note_add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Input</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/test">
        <v-list-tile-action>
          <v-icon>contact_mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Test</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>

  <v-toolbar app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span>SWIM-RECORD.</span>
      <span class="font-weight-light">MATERIAL DESIGN</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout">Logout</v-btn>
    <!-- <v-btn to="/login">Logout</v-btn> -->
  </v-toolbar>

</div>
</template>

<script>
import axios from 'axios'
// import NavigationBar from './NavigationBar'

export default {
  name: 'Header',
  data() {
    return {
      drawer: null,
      // token: localStorage['token'].slice(4),
      // user: localStorage['user'],
      // frofile: localStorage['profile'],
    }
  },
  methods: {
    // logout: function () {
    //   axios
    //     .post('http://127.0.0.1:8000/logout/', {"token": this.token}, {"Content-Type": "application/json"})
    //     .then(() => {
    //       alert(localStorage['token'])
    //       alert(axios.default.headers.common['Authorization'])
    //       localStorage['token'] = null
    //       axios.default.headers.common['Authorization'] = null
    //       alert(localStorage['token'])
    //       alert(axios.default.headers.common['Authorization'])
    //       this.$router.push('/login')
    //     })
    // }
    logout: function () {

      window.console.log('@@@@@@@@@@@@@@@@@@@@')
      window.console.log(localStorage["token"])
      window.console.log(axios.defaults.headers.common['Authorization'])
      window.console.log(this.$store.state)

      localStorage.removeItem("token")
      axios.defaults.headers.common['Authorization'] =null
      this.$store.state.user = null
      this.$store.state.profile = null

      window.console.log('@@@@@@@@@@@@@@@@@@@@')
      window.console.log(localStorage["token"])
      window.console.log(axios.defaults.headers.common['Authorization'])
      window.console.log(this.$store.state)

      this.$router.push('/login')
    }
  }
}
</script>

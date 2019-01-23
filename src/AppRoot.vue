<template>
<v-app id="approot">
  <Header />

  <v-content>
    <router-view/>
  </v-content>

  <Footer />
</v-app>
</template>

<script>
import Header from './components/construction/Header'
import Footer from './components/construction/Footer'

export default {
  name: 'AppRoot',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
#approot {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

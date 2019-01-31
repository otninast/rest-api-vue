<template>
<div>
  <div v-for="item in items" :key="item.id" >
    <v-layout my-5 wrap justify-center v-if="!loading">
      <v-flex xs10 md10 lg8>
        <v-card>

          <v-card-title primary-title class="teal darken-2 white--text">
            <h3>{{item.training_date}}</h3>
            <v-spacer></v-spacer>
              <h3 class="mr-2">{{item.username.username}}</h3>
            <v-avatar size="60" color="grey">
              <img :src="item.username.profile.profile_image">
            </v-avatar>
          </v-card-title>

          <v-card-text>
            <v-layout column justify-center>

              <v-layout row wrap justify-center align-center>
                <v-flex xs4 md3 lg3>
                  <v-subheader>Score : </v-subheader>
                </v-flex>
                <v-flex xs8 md6 lg6>
                  <v-rating
                    v-model="item.self_assessment_score"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$vuetify.icons.ratingFull"
                    half-increments
                    readonly>
                  </v-rating>
                </v-flex>
              </v-layout>

              <v-layout row wrap justify-center align-center>
                <v-flex xs6 md3 lg3>
                  <v-subheader>Reflection : </v-subheader>
                </v-flex>
                <v-flex xs6 md6 lg6>
                  <div class="text-xs-left">{{ item.daily_reflection }}</div>
                </v-flex>
              </v-layout>

              <div v-if="item.training_menu">
                <div v-for="menu in item.training_menu" :key="menu.id">

                  <v-layout row wrap justify-center align-center>
                    <v-flex xs6 md3 lg3>
                      <v-subheader>Menu Name : </v-subheader>
                    </v-flex>
                    <v-flex xs6 md6 lg6>
                      <div class="text-xs-left">{{menu.menu_name.menu_name}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap justify-center align-center>
                    <v-flex xs6 md3 lg3>
                      <v-subheader>Style : </v-subheader>
                    </v-flex>
                    <v-flex xs6 md6 lg6>
                      <div class="text-xs-left">{{menu.style}}</div>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap justify-center align-center>
                    <v-flex xs6 md3 lg3>
                      <v-subheader>Menu Detail : </v-subheader>
                    </v-flex>
                    <v-flex xs6 md6 lg6>
                      <div class="text-xs-center">
                        {{menu.distance}}m × {{menu.how_many_times}}count -{{menu.time_circle}}"
                      </div>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap justify-center align-center>
                    <v-flex xs12 md3 lg3>
                      <v-subheader>Summary: </v-subheader>
                    </v-flex>
                    <!-- <v-layout xs12 md9 lg9 row justify-center> -->
                      <v-flex xs4 md3 lg3>
                        <v-text-field
                          :value="menu.mean_time + ' sec'"
                          label="mean"
                          box
                          readonly
                          class="title "
                          color="blue-grey lighten-2">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4 md3 lg3>
                        <v-text-field
                          :value="menu.max_time + ' sec'"
                          label="max"
                          box
                          readonly
                          class="title mx-1">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4 md3 lg3>
                        <v-text-field
                          :value="menu.min_time + ' sec'"
                          label="min"
                          box
                          readonly
                          class="title">
                        </v-text-field>
                      </v-flex>
                    <!-- </v-layout> -->
                  </v-layout>

                  <v-layout row wrap justify-center align-center>
                    <v-flex xs12 md12 lg2>
                      <v-subheader>graph : </v-subheader>
                    </v-flex>
                    <v-flex xs12 md12 lg10>
                      <v-img :src="menu.graph"></v-img>
                    </v-flex>
                  </v-layout>

                  <hr>
                </div>
              </div>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue white--text" @click="getDetail(item.id)">Detail</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </div>
  <div class="text-xs-center" v-if="loading">
    <v-progress-circular
      :size="80"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
  <div class="text-xs-center my-4">
    <v-pagination
      v-model="page"
      @input="getList(firstUrl + '?page=' + page)"
      @next="next()"
      @previous="previous()"
      :length="Math.ceil(count/5)"
      :total-visible="7"
    ></v-pagination>
    <!-- <p>{{page}}</p>
    <p class="title"><code>next</code>:{{nextPage}}</p>
    <p class="title"><code>pre</code>:{{previousPage}}</p>
    <h3>{{text}}</h3> -->
  </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = localStorage.token

export default {
  name: 'TrainingList',
  props: ['info', 'tmp'],
  data() {
    return {
      errors: null,
      loading: false,
      // text: 'start',
      firstUrl: process.env.VUE_APP_API_URL_BASE + '/training_program/',
      page: 1,
      number: null,
      items: null,
      count: null,
      nextPage: null,
      previousPage: null,
    }
  },
  methods: {
    getList: function(url) {
      this.loading = true
      axios
        .get(url)
        .then(response => {
          this.items = response.data.results
          this.count = response.data.count
          this.nextPage = response.data.next
          this.previousPage = response.data.previous
          this.loading = false
        })
        .catch(error => (this.errors = error))
    },
    getDetail: function(id) {
      this.$router.push(`/${id}`)
    },
    next: function () {
      this.loading = true
      // this.text = "next"
      this.getList(this.nextPage)
    },
    previous: function () {
      this.loading = true
      // this.text = "pre"
      this.getList(this.previousPage)
    }
  },
  created() {
    this.loading = true
    this.getList(this.firstUrl)
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>

<template>
<div>{{error}}
  <div v-for="item in items" :key="item.id">
    <v-layout my-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <!-- <v-img :src="item.training_image" v-if="item.training_image" aspect-ratio="2.75">
          </v-img> -->

          <v-card-title primary-title class="teal darken-2 white--text">
            <h3>{{item.training_date}}</h3>
            <v-spacer></v-spacer>
              <h3 class="mr-2">{{item.username.username}}</h3>
            <v-avatar size="60" color="grey">
              <img :src="item.username.profile.profile_image">
            </v-avatar>
          </v-card-title>

          <v-card-text>

            <v-layout row align-center>
              <v-subheader>Score : </v-subheader>
              <v-rating v-model="item.self_assessment_score" color="yellow darken-3" background-color="grey darken-1" empty-icon="$vuetify.icons.ratingFull" half-increments readonly=true></v-rating>
            </v-layout>


            <v-subheader>Reflection : </v-subheader>
            <div>{{ item.daily_reflection }}</div>

            <div v-if="item.training_menu">
              <div v-for="menu in item.training_menu" :key="menu.id">


                <v-layout row align-center>
                  <v-subheader>Menu Name : </v-subheader>
                  <code>{{menu.menu_name.menu_name}}</code>
                  <!-- <variables>{{menu.menu_name.menu_name}}</variables> -->
                  <!-- <div>{{menu.menu_name.menu_name}}</div> -->
                </v-layout>


                <v-layout row align-center>
                  <v-subheader>Style : </v-subheader>
                  <div>{{menu.style}}</div>
                </v-layout>

                <v-layout row align-center>
                  <v-subheader>Menu Detail : </v-subheader>
                  <div class="text-md-center">
                    {{menu.distance}}m
                    ×
                    {{menu.how_many_times}}count
                    -{{menu.time_circle}}"</div>
                </v-layout>

                <!-- <v-layout row align-center>
                  <v-subheader>Summary: </v-subheader>
                  <v-layout column>
                    <div class="text-md-center">
                      mean-.-{{menu.mean_time}}sec
                    </div>
                    <div class="text-md-center">
                      max-.-{{menu.max_time}}sec
                    </div>
                    <div class="text-md-center">
                      min-.-{{menu.min_time}}sec
                    </div>
                  </v-layout>
                </v-layout> -->

                <v-layout row align-center>
                  <v-subheader>Summary: </v-subheader>
                  <!-- <v-layout column> -->
                    <!-- <v-flex xs1> -->

                      <v-text-field :value="menu.mean_time + ' sec'" label="mean" box readonly class="title " color="blue-grey lighten-2">
                      </v-text-field>
                    <!-- </v-flex> -->
                    <!-- <v-flex xs1> -->
                      <v-text-field :value="menu.max_time + ' sec'" label="max" box readonly class="title mx-1">
                      </v-text-field>
                    <!-- </v-flex> -->
                    <!-- <v-flex xs1> -->
                      <v-text-field :value="menu.min_time + ' sec'" label="min" box readonly class="title">
                      </v-text-field>

                    <!-- </v-flex> -->
                  <!-- </v-layout> -->
                </v-layout>

                <v-layout row align-center>
                  <v-subheader>graph : </v-subheader>

                  <v-img :src="menu.graph"></v-img>

                  </v-layout>

                <!-- <v-layout row align-center>
                  <v-subheader>Time : </v-subheader>
                  <v-layout column>
                    <div v-for="time in menu.result_time" :key="time.id">
                      <div class="text-md-center">
                        No.{{time.num_of_order}}
                      -.-.->>
                        {{time.result_time}}sec</div>
                    </div>
                  </v-layout>
                </v-layout> -->

                <hr>
                <!-- <strong>{{ menu }}</strong> -->
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="getDetail(item.id)">Detail{{item.id}}</v-btn>
            <v-btn color="red">Update</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </div>
  <!-- <h2>{{items}}@@@@@@@@</h2> -->
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = localStorage.token

export default {
  name: 'TrainingList',
  props: ['items', 'info', 'tmp', 'error'],
  data() {
    return {
      // url: 'http://127.0.0.1:8000/training_program/',
      url: process.env.VUE_APP_API_URL_BASE + '/training_program/',
      // storage: localStorage,
      number: null,
    }
  },
  methods: {
    getList: function() {
      axios
        .get(this.url)
        .then(response => (this.items = response.data.results))
        .catch(error => (this.items = error))
    },
    getDetail: function(id) {
      this.$router.push(`/${id}`)
      // axios
      //   .get(`http://127.0.0.1:8000/training_program/${id}/`)
      //   .then(response => (this.info = response.data))
    },
  },
  created() {
    this.getList()
  }
}
</script>

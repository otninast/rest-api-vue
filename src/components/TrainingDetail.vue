<template>
<div>
  <v-container>

    <v-alert type="error">
      {{errors}}
    </v-alert>

    <v-card>

      <v-card-title primary-title class="indigo white--text">
        <h1>{{detailData.training_date}}</h1>
        <v-spacer></v-spacer>
        <h1>{{detailData.username.username}}</h1>
      </v-card-title>

      <v-card-text>
        <div v-for="menu in detailData.training_menu" :key="menu.id">

          <v-layout row align-center justify-center>
            <v-flex xs3>
              <v-subheader>Menu Name : </v-subheader>
            </v-flex>
            <v-flex xs3>
              <code class="title">{{menu.menu_name.menu_name}}</code>
            </v-flex>
          </v-layout>


          <v-layout row align-center justify-center>
            <v-flex xs3>
              <v-subheader>Style : </v-subheader>
            </v-flex>
            <v-flex xs3>
              <div class="title text-md-left">{{menu.style}}</div>
            </v-flex>
          </v-layout>

          <v-layout row align-center justify-center>
            <v-flex xs3>
              <v-subheader>Menu Detail : </v-subheader>
            </v-flex>
            <v-flex xs3>
              <div class="text-md-left title">
                {{menu.distance}}m
                ×
                {{menu.how_many_times}}
                  -{{menu.time_circle}}"</div>
            </v-flex>
          </v-layout>

          <!-- <v-layout row align-center justify-center>
            <v-flex xs3>
              <v-subheader>Time abs: </v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-layout column>
                <div class="text-md-center">
                  mean..{{menu.mean_time}}sec
                </div>
                <div class="text-md-center">
                  max..{{menu.max_time}}sec
                </div>
                <div class="text-md-center">
                  min..{{menu.min_time}}sec
                </div>
              </v-layout>
            </v-flex>
          </v-layout> -->



              <v-layout row justify-center my-3>
                <v-flex xs2 mx-1>
                  <v-text-field :value="menu.mean_time + ' sec'" label="mean" outline color="blue-grey lighten-2" readonly class="title">
                  </v-text-field>
                </v-flex>
                <v-flex xs2 mx-1>
                  <v-text-field :value="menu.max_time + ' sec'" label="max" outline color="blue-grey lighten-2" readonly class="title">
                  </v-text-field>
                </v-flex>
                <v-flex xs2 mx-1>
                  <v-text-field :value="menu.min_time + ' sec'" label="min" outline color="blue-grey lighten-2" readonly class="title">
                  </v-text-field>
                </v-flex>
              </v-layout>





          <v-layout row justify-center align-center>
              <v-subheader>graph : </v-subheader>
              <v-img :src="menu.graph"></v-img>
          </v-layout>

          <!-- <v-layout row align-center justify-center>
            <v-flex xs3>
              <v-subheader>Time : </v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-layout column>
                <div v-for="time in menu.result_time" :key="time.id">
                  <div class="text-md-center">
                    No.{{time.num_of_order}}
                    ......>>
                    {{time.result_time}}sec</div>
                </div>
              </v-layout>
            </v-flex>
          </v-layout> -->

          <v-layout align-center justify-center my-3>
            <v-data-table
            :headers="headers"
            :items="menu.result_time"
            class="elevation-1"
            >
              <template slot="items" slot-scope="row">
                <tr @click="row.expanded = !row.expanded">
                  <td class="text-xs-left">{{row.item.num_of_order}}</td>
                  <td>{{row.item.result_time}}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="row">
                <v-card flat>
                  <v-card-text>
                    <v-layout row align-center justify-center>
                      <div v-for="lap in row.item.lap_time" :key="lap.id">
                        <div class="mx-3">{{lap.lap_time}}</div>
                      </div>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </template>
            </v-data-table>
          </v-layout>

          <hr>
          <!-- <strong>{{ menu }}</strong> -->
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/" color="info">back</v-btn>
        <v-spacer></v-spacer>
        <div v-if="$store.state.user">
          <div v-if="$store.state.user.username == detailData.username.username">
            <v-btn color="success" class="mx-1">update</v-btn>
            <v-btn color="error">delete</v-btn>
          </div>
          <span v-else></span>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'
// import DataTable from './construction/DataTable.vue'

// let data = null

export default {
  name: "TrainingDetail",
  components: {
    // DataTable,
  },
  props: ['detailData'],
  data() {
    return {
      url: `${process.env.VUE_APP_API_URL_BASE}/training_program/${this.$route.params.id}/`,
      errors: null,
      // detailData: null,

      headers: [
        {
          text: 'Order',
          value: 'num_of_order',
        },
        {
          text: 'Time(second)',
          value: 'result_time'
        },
      ],

    }
  },
  methods: {
    getDetailDate: function() {
      axios
        .get(this.url)
        .then(response => {
          this.detailData = response.data

        })
        .catch(error => (this.errors = error))
    },
  },
  mounted() {
    this.getDetailDate()
  },
  // computed: {
  //   returnData: function () {
  //     let mean_time
  //     mean_time = this.detailData.training_menu.mean_time
  //     return mean_time
  //   }
  // }

}
</script>

<template>
<div>
  <v-container>

    <!-- <v-alert type="error">
      {{errors}}
    </v-alert> -->

    <v-card>
      <v-card-title primary-title class="indigo white--text">
        <h1>{{detailData.training_date}}</h1>
        <v-spacer></v-spacer>
        <h1>{{detailData.username.username}}</h1>
      </v-card-title>

      <v-card-text>
        <div v-for="menu in detailData.training_menu" :key="menu.id">

          <v-layout row align-center justify-center>
            <v-flex>
              <v-subheader>Menu Name : </v-subheader>
            </v-flex>
            <v-flex>
              <code class="title">{{menu.menu_name.menu_name}}</code>
            </v-flex>
          </v-layout>


          <v-layout row align-center justify-center>
            <v-flex>
              <v-subheader>Style : </v-subheader>
            </v-flex>
            <v-flex>
              <div class="title text-md-left">{{menu.style}}</div>
            </v-flex>
          </v-layout>

          <v-layout row align-center justify-center>
            <v-flex>
              <v-subheader>Menu Detail : </v-subheader>
            </v-flex>
            <v-flex>
              <div class="text-md-left title">
                {{menu.distance}}m
                ×
                {{menu.how_many_times}}
                -{{menu.time_circle}}"</div>
            </v-flex>
          </v-layout>



          <v-layout row justify-center my-3>
            <v-flex mx-1 md2>
              <v-text-field :value="menu.mean_time + ' sec'" label="mean" outline color="blue-grey lighten-2" readonly class="title">
              </v-text-field>
            </v-flex>
            <v-flex mx-1 md2>
              <v-text-field :value="menu.max_time + ' sec'" label="max" outline color="blue-grey lighten-2" readonly class="title">
              </v-text-field>
            </v-flex>
            <v-flex mx-1 md2>
              <v-text-field :value="menu.min_time + ' sec'" label="min" outline color="blue-grey lighten-2" readonly class="title">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout column>
            <v-flex>
              <v-subheader>graph : </v-subheader>
            </v-flex>
            <v-flex>
              <v-img :src="menu.graph"></v-img>
            </v-flex>
          </v-layout>

          <v-layout align-center justify-center my-3>
            <v-data-table :headers="headers" :items="menu.result_time" class="elevation-1">
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
            <v-dialog v-model="dialog" width="500">
              <v-btn color="error" slot="activator">delete</v-btn>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>

                </v-card-title>
                <v-card-text>
                  <h2>Delete OK?</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-flex justify-center>
                    <v-btn class="red white--text" @click="deletePost">Delete</v-btn>
                    <v-btn class="gray" @click="dialog = false">cansel</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

export default {
  name: "TrainingDetail",
  props: ['detailData'],
  data() {
    return {
      url: `${process.env.VUE_APP_API_URL_BASE}/training_program/${this.$route.params.id}/`,
      errors: null,
      dialog: false,
      headers: [{
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
    deletePost: function () {
      axios
        .delete(this.url)
        .then(response => {
          this.detailData = response.data
          this.$router.push('/')
        })
        .catch(error => (this.errors = error))
    }
  },
  mounted() {
    this.getDetailDate()
  },
}
</script>

<template>
<v-container>


  <div v-if="errors">
    <v-alert :value="true" type="error">

      <div>{{ errors.data.status }}</div>

      <div v-for="(message, key) in errors.data.status_message" :key="message.id">
        {{key}} : {{message}}
      </div>
    </v-alert>
  </div>

  <v-card id="trainingData">
    <v-card-title primary-title=true class="teal lighten-3">
      <h3>Input Form</h3>
    </v-card-title>

    <v-card-text>
      <v-form>

        <v-layout row>
          <v-flex xs6>
          <v-subheader>Training Date : </v-subheader>
        </v-flex>

        <v-flex xs6 sm6 md4>
              <v-menu
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="trainingData.training_date"
                  label="Picker without buttons"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="trainingData.training_date" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-flex>

          </v-layout>

        <v-textarea
        v-model="trainingData.daily_reflection"
        label="Outline textarea"
        value=""
        :rules="[v => !!v || 'Reflection is required']"
        outline
        ></v-textarea>

        <v-layout row>
          <v-subheader>Score : </v-subheader>
        <v-rating
          v-model="trainingData.self_assessment_score"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$vuetify.icons.ratingFull"
          half-increments
          hover
          :rules="[v => !!v || 'Score is required']"
        ></v-rating>
      </v-layout>

      <v-layout column>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" color="indigo" round outline>image</v-btn>
        <v-card>
          <v-card-title primary-title class="cyan darken-4 white--text">
            <v-layout justify-center>
              <h3>New Profile Image</h3>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <croppa v-model="croppa"
              :width="300"
              :height="300"
              :show-remove-button="true"
              remove-button-color="black"
              :show-loading="true"
              :file-size-limit="2097152"
              accept="image/*"
              @file-type-mismatch="handleCroppaFileTypeMismatch"
              @file-size-exceed="alert('file size exceeds')"
              >
            ></croppa>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn @click="trainingData.training_image = croppa.generateDataUrl('image/*', 1.0), dialog=false" class="primary">UPLOAD</v-btn>
              <v-btn @click="dialog=false">cancel</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex>
        <v-avatar size="130" v-if="trainingData.training_image">
          <img :src="trainingData.training_image">
        </v-avatar>
        </v-flex>
      </v-layout>


      </v-form>
    </v-card-text>

    <v-card-footer>
    </v-card-footer>
  </v-card>



  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>


  <v-card id="menuData">
    <v-card-title primary-title=true class="teal lighten-4">
      <h3>Detail Form</h3>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-layout column justify-center>

          <v-layout row>
            <v-flex xs4>
              <v-subheader>Menu Name : </v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select v-model="menuData.menu_name" :items="MenuName" label="Select" prepend-icon="fitness_center"></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs4>
              <v-subheader>Style : </v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select v-model="menuData.style" :items="['Fr', 'Ba', 'Br', 'Fly', 'IM']" label="Select" prepend-icon="pool"></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs4>
              <v-subheader>Distance : </v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select v-model="menuData.distance" :items="[50, 100, 200, 400, 800]" label="Select" prepend-icon="arrow_upward"></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs4>
              <v-subheader>How many times? : </v-subheader>
            </v-flex>
            <v-flex xs6>
              <!-- <v-select v-model="menuData.how_many_times" :items="[1, 2, 3, 4, 5]" label="Select" prepend-icon="360"></v-select> -->
              <v-slider
                v-model="menuData.how_many_times"
                step="1"
                :min="1"
                :max="30"
                thumb-label
                ticks
                label="Select"
                prepend-icon="360"
              ></v-slider>
            </v-flex>
            <v-flex shrink style="width: 80px" ml-3>
              <v-text-field v-model="menuData.how_many_times" type="number" suffix="" class="mt-0" hide-details single-line>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs4>
              <v-subheader>Circle Time : </v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-slider v-model="menuData.time_circle" :min="30" :max="180" :step="5" label="time circle" prepend-icon="timer"></v-slider>
            </v-flex>
            <v-flex shrink style="width: 80px" ml-3>
              <v-text-field v-model="menuData.time_circle" type="number" suffix="sec" class="mt-0" hide-details single-line>
              </v-text-field>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>


  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <v-divider></v-divider>


  <v-card id="resultTime">

    <v-card-title primary-title=true class="teal lighten-5">
      <h3>Result Time Form</h3>
    </v-card-title>

    <v-card-text>
<v-layout justify-center column>
          <v-form>

            <v-layout column justify-center align-center>
              <v-btn @click="continueAddInput">Continue Add Input</v-btn>
              <v-switch
                 :label="`Lap Time: ${isLapTime.toString()}`"
                 v-model="isLapTime"
               ></v-switch>

             </v-layout>


            <div v-for="input in resultTime" :key="input.id" :hidden="hidden">
              <v-layout row>
                <v-flex>
                  <v-subheader> Number.{{input.num_of_order}} : </v-subheader>
                </v-flex>
                <v-flex>
                  <v-text-field
                  :id="input.id"
                  v-model="input.result_time_str"
                  v-bind:label="'Number' + input.num_of_order"
                  mask="time-with-seconds"
                  messages="##:##:##"
                  box
                  ></v-text-field>

                  <v-layout v-if="input.lapTime" row align-center>
                    <!-- <v-flex> -->
                      <div v-for="lap in input.lapTime" :key="lap.id">
                        <v-text-field
                        :label="lap.num_of_lap*50 + 'm'"
                        v-model="lap.lap_time"
                        :num_of_order="input.num_of_order"
                        mask="time-with-seconds"
                        outline class="mx-1">
                        </v-text-field>
                      </div>
                    <!-- </v-flex> -->
                  </v-layout>

                </v-flex>
              </v-layout>



              <!-- <v-flex xs6>
                <v-spacer></v-spacer>
              </v-flex> -->







            </div>
            <!-- <v-btn @click="addInput">Add Input</v-btn> -->

          </v-form>
  </v-layout>
    </v-card-text>
  </v-card>


  <v-btn @click="postAllData" color="success" large>Submit</v-btn>

  <!-- <div v-for="(input, label) in resultTime" :key="label">
      <div>
        {{input.lapTime}}
      </div>
  </div> -->
  <!-- <div v-for="input in lapTime" :key="input.id">{{input}}</div> -->
  <div>{{info}}</div>

</v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InputData',
  components: {

  } ,
  plops: ['TrainingProgram', 'errors', 'info'],
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      counter: 1,
      croppa: null,
      dialog: false,
      bs64: null,

      isLapTime: false,
      hidden: true,

      urlTrainingProgram: process.env.VUE_APP_API_URL_BASE + '/training_program/',
      urlMenuName: process.env.VUE_APP_API_URL_BASE + '/menu_name/',
      url: process.env.VUE_APP_API_URL_BASE + '/datainput/',
      MenuName: null,
      errors: null,
      val: "00:00:00",

      trainingData: {
        training_date: new Date().toISOString().substr(0, 10),
        daily_reflection: '',
        self_assessment_score: 3,
        training_image: null,
      },

      menuData: {
        menu_name: 'All-Out',
        distance: 100,
        style: 'Fr',
        time_circle: 60,
        how_many_times: 5,
      },

      resultTime: [
        {
          num_of_order: 1,
          result_time_str: null,
          // lapTime:null
        }
      ],
      // lapTime: null,
    }
  },

  methods: {
    getTrainingProgram: function() {
      axios
        .get(this.urlTrainingProgram)
        .then(response => (this.TrainingProgram = response))
    },
    postTrainingProgram: function() {
      axios
        .post(this.urlTrainingProgram, this.trainingData)
        .then(response => (this.TrainingProgram = response))
    },
    getMenuName: function() {
      axios
        .get(this.urlMenuName)
        .then(response => (this.MenuName = response.data.results.map(x => x.menu_name)))
    },
    postAllData: function () {
      axios
        .post(this.url, {
          'trainingData': this.trainingData,
          'menuData': this.menuData,
          'resultTime': this.resultTime
        })
        .then(response => {
          this.info = response
          this.$router.push('/')
        })
        .catch(error => (this.errors = error.response))
    },


    addLapTime: function (arg) {
      let num_of_lap = 0
      let num_of_order = arg
      let lapTime = []
      let n = 0
      while (n < (this.menuData.distance/50) -1) {
        n++
        lapTime.push({
          'num_of_order': num_of_order,
          'num_of_lap':++num_of_lap,
          'lap_time': null
        })
      }
      window.console.log(lapTime)
      return lapTime
    },

    addInput: function() {
      this.resultTime.push({
        num_of_order: ++this.counter,
        result_time: null,
        result_time_str: null,
        lapTime: this.isLapTime ? this.addLapTime(this.counter) : null
      })
      // if (this.isLapTime == true) {
      //   this.resultTime['lapTime'].push(this.addLapTime(this.counter))
      // }
    },

    continueAddInput: function() {
      this.counter = 0
      this.resultTime = []

      var n = 0
      while (n < this.menuData.how_many_times) {
        n++
        this.addInput()
      }
      // if (this.isLapTime == true) {
      //   this.addLapTime()
      // }
      this.hidden = false
    },
  },

  mounted() {
    this.getMenuName()
  }
}
</script>

<styles>
</styles>

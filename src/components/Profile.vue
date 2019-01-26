<template>
<div>
  <v-container>
    <v-alert :value="error" type="error">
      <p>{{error}}</p>
    </v-alert>
    <v-alert :valur="message" type="success">
      <p>{{message}}</p>
    </v-alert>
    <v-card>
      <v-card-title primary-title class="indigo white--text">
        <v-layout justify-center>
          <h1>{{$store.state.user.username}}'s Profile</h1>
        </v-layout>
      </v-card-title>

      <v-card-text>
        <v-layout column justify-center>

          <v-layout row wrap justify-center align-center>
            <v-flex xs4 md4 lg4>
              <v-subheader>UserName : </v-subheader>
            </v-flex>
            <v-flex xs6 md6 lg4>
              <v-text-field v-model="$store.state.user.username" readonly>
              </v-text-field>
            </v-flex>
          </v-layout>



        <v-layout row wrap justify-center align-center>
          <v-flex xs4 md4 lg4>
            <v-subheader class="text-xs-left">Profile Image : </v-subheader>
          </v-flex>

          <v-flex xs6 md6 lg4>
            <v-layout column justify-center>
              <v-flex xs12 md12 lg12>
                <v-dialog
                  v-model="dialog"
                  :disabled="is_edit"
                  persistent max-width="600px">
                  <v-btn
                    slot="activator"
                    :disabled="is_edit"
                    color="indigo"
                    round outline>
                    profile image
                  </v-btn>
                  <v-card>
                    <v-card-title primary-title class="indigo darken-2 white--text">
                      <v-layout justify-center>
                        <h2>New Profile Image</h2>
                      </v-layout>
                    </v-card-title>
                    <v-card-text>
                      <croppa
                      v-model="croppa"
                      :width="300"
                      :height="300"
                      :show-remove-button="true"
                      remove-button-color="black"
                      :show-loading="true"
                      :file-size-limit="2097152"
                      accept="image/*"
                      @file-type-mismatch="handleCroppaFileTypeMismatch"
                      @file-size-exceed="alert('file size exceeds')">
                      </croppa>
                    </v-card-text>
                    <v-card-actions>
                      <v-layout justify-center>
                        <v-btn @click="setValueForArg(croppa.generateDataUrl('image/*', 1.0)), dialog=false" class="primary">update</v-btn>
                        <v-btn @click="dialog=false">cancel</v-btn>
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
              <v-flex xs12 md12 lg12>
                <v-avatar size="120" color="green">
                  <img :src="profile.profile_image" v-if="profile.profile_image"/>
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>



        <v-layout row wrap justify-center align-center>
          <v-flex xs4 md4 lg4>
            <v-subheader class="text-xs-left">Full Name : </v-subheader>
          </v-flex>
          <v-flex xs3 md3 lg2>
            <v-text-field v-model="profile.family_name" label="family name" :readonly="is_edit">
            </v-text-field>
          </v-flex>
          <!-- <v-flex md1 lg1>
          </v-flex> -->
          <v-flex xs3 md3 lg2>
            <v-text-field v-model="profile.first_name" label="first name" :readonly="is_edit">
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-center align-center>
          <v-flex xs4 md4 lg4>
            <v-subheader class="text-xs-left">Birthday : </v-subheader>
          </v-flex>
          <v-flex xs6 sm6 md4 :readonly="is_edit">
            <v-menu
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              :readonly="is_edit">
              <v-text-field
                slot="activator"
                v-model="profile.birthday"
                label="Picker without buttons"
                prepend-icon="event"
                :readonly="is_edit"
              ></v-text-field>
              <v-date-picker
                v-model="profile.birthday"
                @input="menu = false"
                :readonly="is_edit"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-center align-center>
          <v-flex xs4 md4 lg4>
            <v-subheader class="text-xs-left">Sex : </v-subheader>
          </v-flex>
          <v-flex xs6 md6 lg4>
            <v-select v-model="profile.sex" :readonly="is_edit" :items="['Man', 'Woman', 'Other']">
            </v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-center align-center>
          <v-flex xs4 md4 lg4>
            <v-subheader class="text-xs-left">Style One : </v-subheader>
          </v-flex>
          <v-flex xs6 md6 lg4>
            <v-select
              v-model="profile.style_one"
              :items="['Fr', 'Ba', 'Br', 'Fly', 'IM']"
              :readonly="is_edit">
            </v-select>
          </v-flex>
        </v-layout>

        </v-layout>
      </v-card-text>


      <v-divider></v-divider>


      <v-card-actions>
        <v-layout row wrap align-center justify-center>
          <v-flex xs5 md3 lg3>
            <v-btn @click="updateProfile()" :disabled="is_edit" large color="orange">update profile</v-btn>
            <!-- <v-btn v-else @click="createProfile()" :disabled="is_edit" large color="orange">create profile</v-btn> -->
          </v-flex>
          <v-flex xs5 md3 lg3>
            <v-btn
              @click="is_edit = !is_edit"
              outline
              fab
              color="indigo"
              v-if="$store.state.user.username !== 'Guest'">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              :disabled="is_edit"
              outline
              fab
              color="indigo"
              v-else>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>



    </v-card>
  </v-container>

  <!-- <div v-for="(item, label) in profile" :key="label">
    <v-layout row justify-center>
      <label>{{label}}.......</label>
      <p strong>{{item}}</p>
    </v-layout>
  </div> -->

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  props: ['info', 'error', 'message'],
  data() {
    return {
      profileUrl: process.env.VUE_APP_API_URL_BASE + '/profile/',
      profile: null,
      errors: null,
      is_edit: true,
      dialog: false,
      menu: null,
    }
  },
  methods: {
    getProfile: function() {
      axios
        .get(this.profileUrl)
        .then(response => {
          if(response.data.results[0]){
            this.profile = response.data.results[0]
          }
          else{
            this.profile = this.$store.state.profile
          }

        })
        .chatch(errors => (this.errors = errors))
    },
    updateProfile: function() {
      let url = this.profileUrl + String(this.profile.id) + "/"
      axios
        .put(url, this.profile)
        .then(response => {
          this.info = response
          this.is_edit = true
          this.message = 'Update Success!'
        })
        .catch(error => (this.error = error))
    },
    // createProfile: function() {
    //   let url = this.profileUrl
    //   axios
    //     .post(url, this.profile)
    //     .then(response => {
    //       this.info = response
    //       this.is_edit = true
    //     })
    //     .catch(error => (this.error = error))
    // },
    setValueForArg: function(value) {
      this.profile.profile_image = value
    },
    // setEmptyProfile: function () {
    //   this.profilr = {
    //     birthday: null,
    //     family_name: null,
    //     first_name: null,
    //     profile_image: null,
    //     sex: null,
    //     style_one: null,
    //
    //   }
    // }
  },
  mounted() {
    this.getProfile()
  },
}
</script>

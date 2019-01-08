<template>
<div>

  <!-- <v-container v-if="profile"> -->
  <v-container>
    <v-alert type="error">
      <p>{{error}}</p>
    </v-alert>

    <v-card>
      <v-card-title primary-title class="indigo white--text">
        <v-layout justify-center>
          <!-- <h1>{{profile.user.username}}'s Profile</h1> -->
          <h1>{{$store.state.user.username}}'s Profile</h1>
        </v-layout>
      </v-card-title>

      <v-card-text>


        <v-layout row justify-center>
          <v-flex xs3>
            <v-subheader>UserName : </v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="$store.state.user.username" readonly>
            </v-text-field>
          </v-flex>
        </v-layout>



        <v-layout row justify-center>

          <v-flex xs3>
            <v-subheader>Profile Image : </v-subheader>
          </v-flex>

          <v-flex xs3>
            <v-layout column>
              <v-dialog
              v-model="dialog"
              :disabled="is_edit"
              persistent max-width="600px">
                <v-btn
                slot="activator"
                :disabled="is_edit"
                color="indigo"
                round outline>profile image</v-btn>
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
              <v-layout justify-center>
                <v-avatar size="120" color="green">
                  <img :src="profile.profile_image">
                </v-avatar>
              </v-layout>
            </v-layout>
          </v-flex>
        </v-layout>



        <v-layout row justify-center>
          <v-flex xs3>
            <v-subheader>Full Name : </v-subheader>
          </v-flex>
          <v-flex xs1>
            <v-text-field v-model="profile.family_name" label="family name" :readonly="is_edit">
            </v-text-field>
          </v-flex>
          <v-flex xs1>
          </v-flex>
          <v-flex xs1>
            <v-text-field v-model="profile.first_name" label="first name" :readonly="is_edit">
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs3>
            <v-subheader>Birthday : </v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="profile.birthday" :readonly="is_edit">
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs3>
            <v-subheader>Sex : </v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-select v-model="profile.sex" :readonly="is_edit" :items="['Man', 'Woman', 'Other']">
            </v-select>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs3>
            <v-subheader>Style One : </v-subheader>
          </v-flex>
          <v-flex xs3>
            <!-- <v-text-field v-model="profile.style_one" :readonly="is_edit">
            </v-text-field> -->
            <v-select v-model="profile.style_one" :items="['Fr', 'Ba', 'Br', 'Fly', 'IM']" :readonly="is_edit">
            </v-select>
          </v-flex>
        </v-layout>

      </v-card-text>


      <v-divider></v-divider>


      <v-card-actions>
        <v-layout row align-center justify-center>
          <v-flex xs2>
            <v-btn v-if="profile.id" @click="updateProfile()" :disabled="is_edit" large color="orange">update profile</v-btn>
            <v-btn v-else @click="createProfile()" :disabled="is_edit" large color="orange">create profile</v-btn>
          </v-flex>
          <v-flex xs2>
            <v-btn @click="is_edit = !is_edit" outline fab color="indigo">
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
  props: ['info', 'error'],
  data() {
    return {
      profileUrl: 'http://127.0.0.1:8000/profile/',
      profile: null,
      errors: null,
      is_edit: true,
      dialog: false,
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
        })
        .catch(error => (this.error = error))
    },
    createProfile: function() {
      let url = this.profileUrl
      axios
        .post(url, this.profile)
        .then(response => {
          this.info = response
          this.is_edit = true
        })
        .catch(error => (this.error = error))
    },
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

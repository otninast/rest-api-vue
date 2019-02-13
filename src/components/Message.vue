<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex lg6>
        <v-form>
          <v-text-field
            v-model="email"
            name="email"
            label="Your E-mail Addres"
          ></v-text-field>
          <v-text-field
            v-model="name"
            name="name"
            label="Your Full Name"
            v-validate="'required'"
            :error-messages="errors.collect('name')"
          ></v-text-field>
          <v-text-field
            v-model="subject"
            name="subject"
            box
            class="mt-3"
            label="Subject"
            v-validate="'required'"
            :error-messages="errors.collect('subject')"
          ></v-text-field>
          <v-textarea
            v-model="body"
            name="message"
            outline
            auto-grow
            label="Message"
            v-validate="'required'"
            :error-messages="errors.collect('message')"
          ></v-textarea>
          <v-layout column wrap justify-center>
            <v-flex>
              <v-alert
                :value="alert"
                color="success"
                icon="check_circle">
                  Accept!
                  Thank you for your message!
              </v-alert>
            </v-flex>
            <v-flex>
              <v-btn to="/" color="grey white--text">back</v-btn>
              <v-btn
                color="indigo lighten-1 white--text"
                large
                round
                @click="submit"
                :loading="loading"
                :disabled="loading">
                  send message
                  <v-icon right dark>send</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'contact',
  data () {
    return {
      loader: null,
      loading: false,
      readonly: true,
      alert: false,
      url: 'https://5xa6lbyfw8.execute-api.ap-northeast-1.amazonaws.com/production/submit',
      email: '',
      name: '',
      subject: '',
      body: '',
      response: null,
      error: null
    }
  },
  methods: {
    submit: function () {
      this.$validator.validate().then(result => {
        if (result) {

          this.loader = 'loading'
          axios
            .post(this.url,
              { 'subject': '[スイムレコード]' + this.subject,
                'body': '[Name]' + '\n' + this.name + '\n\n' + '[Email]' + '\n' + this.email + '\n\n' + '[Message]' + '\n' + this.body })
            .then(res => {
              this.response = res
            })
            .catch(err => {
              this.error = err
            })
        }
      })
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => {
        this[l] = false
        this.alert = true
      }, 3000)
      this.loader = null
    }
  }
}
</script>

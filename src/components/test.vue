<template>
<div>
  <input @change="selectedFile" type="file" name="file">
  <v-btn @click="upload" type="submit" color="success">アップロード</v-btn>
  <v-btn href="http://tech.aainc.co.jp/archives/10714">参考</v-btn>
  <h3>{{info}}</h3>

  <v-container fluid>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img :src="imageUrl" height="150" v-if="imageUrl" />
      <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
      <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
      <v-btn href="https://jsfiddle.net/meyubaraj/fLbe7r72/">jsfiddle</v-btn>
      <v-btn href="https://qiita.com/komatzz/items/f2a25db16aca388845d3">qiita</v-btn>
      <v-btn href="http://salary.katsulabo.com/%E3%80%90vue-js%E3%80%91%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%EF%BC%88%E8%A4%87%E6%95%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%EF%BC%89%E3%81%AE/">blog</v-btn>
    </v-flex>
  </v-container>

<v-divider></v-divider>
<v-divider></v-divider>
<v-divider></v-divider>


  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-slider
          v-model="slider"
          :min="16"
          :max="256"
          label="Size"
          thumb-label
        ></v-slider>

        <v-switch
          v-model="tile"
          label="Tile"
        ></v-switch>
      </v-flex>

      <v-flex
        xs12
        sm6
        md8
        align-center
        justify-center
        layout
        text-xs-center
      >
        <v-avatar
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img :src="imageUrl" alt="avatar">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
  <v-btn href="https://vuetifyjs.com/en/components/avatars#introduction">Vuetify avatars</v-btn>

<v-divider></v-divider>
<v-divider></v-divider>
<v-divider></v-divider>

  <v-container fluid>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">

      <croppa v-model="myCroppa"
          :width="300"
          :height="300"
          :show-remove-button="true"
          remove-button-color="black"
          :show-loading="true"
          :file-size-limit="2097152"
          accept="image/png"
          @file-type-mismatch="onFileTypeMismatch"
          @file-size-exceed="onFileSizeExceed">
        ></croppa>

      <v-btn href="https://qiita.com/yassyskywalker/items/66a536ed3eaff8670538">Qiita</v-btn>
      <v-btn href="https://zhanziyang.github.io/vue-croppa/#/">Vue Croppa</v-btn>

    </v-flex>
  </v-container>

  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn href="http://pythonskywalker.hatenablog.com/entry/2017/01/05/130835" color="primary">text</v-btn>
    <v-btn href="http://sakataharumi.hatenablog.jp/entry/2018/10/20/010806" color="primary">text</v-btn>
    <v-btn href="http://racchai.hatenablog.com/entry/2016/04/12/Django_REST_framework_%E8%B6%85%E5%85%A5%E9%96%80" color="primary">text</v-btn>
    <v-btn href="https://techblog.raccoon.ne.jp/archives/52880270.html" color="primary">text</v-btn>
    <v-btn href="https://minamo173.com/2017/12/14/vue-js-meetup-6/" color="primary">text</v-btn>
    <v-btn href="https://raspberly.hateblo.jp/entry/2018/11/01/235900" color="primary">text</v-btn>
    <v-btn href="https://tech.smarthr.jp/entry/2017/02/13/182200" color="primary">text</v-btn>
    <v-btn href="" color="primary">text</v-btn>
    <v-btn href="" color="primary">text</v-btn>
    <v-btn href="" color="primary">text</v-btn>

  </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Test',
  props: ['info'],
  data() {
    return {
      // info: null,
      uploadFile: null,
      yourFileKey: 'image_key',
      yourUploadUrl: 'http://127.0.0.1:8000/test_func/',

      title: "Image Upload",
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',

      slider: 56,
      tile: false,
    }
  },

  methods: {
    selectedFile: function(e) {
      // 選択された File の情報を保存しておく
      e.preventDefault()
      let files = e.target.files
      this.uploadFile = files[0]
    },

    upload: function() {
      // FormData を利用して File を POST する
      let formData = new FormData()
      formData.append(this.yourFileKey, this.uploadFile);
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios
        .post(this.yourUploadUrl, formData, config)
        .then(function(response) {
          this.info = response
        })
        .catch(function(error) {
          this.info = error
        })
    },

    pickFile() {
      this.$refs.image.click()
    },

    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  },

  computed: {
      avatarSize () {
        return `${this.slider}px`
      }
    }
}
</script>

<template>
<div class="record-form">

  <!-- <ChildComponent :parentword="parentword" :items="info" /> -->
  <v-container>
    <!-- <v-layout align-center justify-center column> -->
    <v-layout justify-center column>
      <v-form>


        <!-- <div hidden> -->
        <!-- <v-text-field v-model="number" label="How Many?"/> -->
        <v-btn @click="continueAddInput">Continue Add Input</v-btn>
      <!-- </div> -->


        <div v-for="input in inputs" :key="input.id">
          <v-layout row>
            <v-flex>
              <v-subheader> {{input.id}} : </v-subheader>
            </v-flex>
            <v-flex>
              <v-text-field :id="input.id" v-model="input.value" v-bind:label="input.id" />
            </v-flex>
          </v-layout>
        </div>

        <v-btn @click="addInput">Add Input</v-btn>

      </v-form>
    </v-layout>
  </v-container>

<div hidden>
  <v-container>
    <h3>Author Register Form</h3>
    <!-- <div>{{info}}</div> -->
    <v-form>
      <v-text-field v-model="AuthorsName" type="text" name="name" placeholder="Author's Name"></v-text-field>
      <v-text-field v-model="AuthorsId" type="text" name="id" placeholder="Author's ID"></v-text-field>
      <p>{{AuthorsName}}</p>
      <p>{{AuthorsId}}</p>
      <v-btn v-on:click="postAuthor">POST</v-btn>
      <v-btn v-on:click="getAuthor">GET</v-btn>
      <v-btn v-on:click="deleteAuthor">DELETE</v-btn>
      <div v-for="inf in info" :key="inf.id">{{inf}}</div>
    </v-form>
  </v-container>
</div>

</div>
</template>

<script>
import axios from 'axios'
// import ChildComponent from './ChildComponent'

export default {
  name: 'RecordForm',
  components: {
    // ChildComponent
  },
  props: ['number'],
  data() {
    return {
      AuthorsName: '',
      info: '',
      url: 'http://127.0.0.1:8000/authors/',
      AuthorsId: '',
      counter: 1,
      inputs: [{
        id: 'Number.1',
        label: 'Enter Fruit Name',
        value: '',
      }],
    }
  },
  methods: {
    postAuthor: function() {
      axios
        .post('http://127.0.0.1:8000/authors/', {
          name: this.AuthorsName
        })
        .then(response => (this.info = response))
    },
    getAuthor: function() {
      axios
        .get(this.url + this.AuthorsId)
        .then(response => (this.info = response))
    },
    deleteAuthor: function() {
      axios
        .delete(this.url + this.AuthorsId)
        .then(response => (this.info = response))
    },
    addInput: function() {
      this.inputs.push({
        id: `Number.${++this.counter}`,
        label: 'Enter Fruit Name',
        value: '',
      })
    },
    continueAddInput: function() {
      this.counter = 0
      this.inputs = []
      var n = 0
      while (n < this.number) {
        n++
        this.addInput()
      }
    }
  }
}
</script>

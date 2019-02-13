<template>
<v-container>
  <v-layout column wrap justify-center>

    <v-flex lg4 md4 xs4>
      <v-select
        v-model="school"
        :items="res.schools"
        label="Select Schools"
        prepend-icon="fitness_center"
        multiple
        chips
      >
      </v-select>
    </v-flex>

    <v-flex lg4>
      <v-select
        v-model="year"
        :items="res.years"
        label="Select Years"
        prepend-icon="fitness_center"
        multiple
        chips
      ></v-select>
    </v-flex>

    <v-flex>
      <v-select
        v-model="sex"
        :items="res.sex"
        label="Select Sex"
        prepend-icon="people_outline"
        multiple
        chips
      ></v-select>
    </v-flex>


    <v-layout row wrap justify-center>

      <v-flex xs10 md5 lg5 mx-1>
        <v-select
          v-model="style"
          :items="res.styles"
          label="Select Styles"
          prepend-icon="bar_chart"
          outline
          chips>
        </v-select>
      </v-flex>

      <v-flex xs10 md5 lg5 mx-1>
        <v-select
          v-model="distance"
          :items="res.distances"
          label="Select Distances"
          prepend-icon="show_chart"
          outline
          chips>
        </v-select>
      </v-flex>

    </v-layout>

    <v-flex>
      <v-btn
        color="primary"
        @click="getGraphAndTableData"
        round
        large>
        submit data
      </v-btn>
    </v-flex>
  </v-layout>

  <!-- <v-layout row wrap>
    {{school}}{{sex}}{{year}}{{style}}{{distance}}
  </v-layout> -->
  <v-layout row wrap justify-center v-if="res_">
    <v-flex xs12 md12 lg12>
      <img :src="res_.image"/>
    </v-flex>
    <v-flex xs12 md12 lg10>
      <v-data-table
        :headers="res_.header"
        :items="res_.rows"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.Year }}</td>
          <td>{{ props.item.Name }}</td>
          <td class="text-xs-right">{{ props.item.Time }}</td>
          <td class="text-xs-right">{{ props.item.Rank }}</td>
          <td class="text-xs-right">{{ props.item.Team }}</td>
          <td class="text-xs-right">{{ props.item.Age }}</td>
          <td class="text-xs-right">{{ props.item.Sex }}</td>
          <td class="text-xs-right">{{ props.item.Style }}</td>
          <td class="text-xs-right">{{ props.item.Distance }}</td>
          <td class="text-xs-right">{{ props.item.kyu }}</td>
        </template>
      </v-data-table>

      <!-- <span v-html="res_.table"></span>
      <div>
        {{res_.rows}}
      </div> -->
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchData',
  // component: {
  //   Table: this.res_.table
  // },
  data () {
    return {
      url: process.env.VUE_APP_API_URL_BASE,
      res: null,
      err: null,
      res_: null,
      err_: null,
      school: '',
      year: null,
      style: '',
      distance: null,
      sex: '',
    }
  },
  methods: {
    getSchools: function () {
      axios
        .get(this.url + '/schoolsname/')
        .then(res => this.res = res.data.data)
        .chatch(err => this.err = err)
    },
    getGraphAndTableData: function () {
      axios
        .post(this.url + '/graphandtabledata/',
              {
                'school': this.school,
                'year': this.year,
                'sex': this.sex,
                'style': this.style,
                'distance': this.distance
              })
        .then(res => this.res_ = res.data.data)
        .chatch(err => this.err_ = err)
    },
  },
  created () {
    this.getSchools()
  }
}
</script>

<style lang="css" scoped>
</style>

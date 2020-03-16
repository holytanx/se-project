<template>
  <v-card>
    <v-toolbar
      color="purple"
      dark
      flat
      prominent 
    >
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
        >
          <v-tab
            v-for="historyTab in historyTabs"
            :key="historyTab"
          >
            {{ historyTab }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-data-table
          :headers="addReduceHistory"
          :items="actionActivities"></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-data-table
          :headers="transectionHistory"
          :items="transection"></v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<style>
</style>

<script>
import firebase from "firebase";
import { db } from "../main";
import AddReduceProjectHistory from "../components/AddReduceProjectHistory";
export default {
  data() {
    return {
      tabs: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      historyTabs:[
        'ประวัติการเพิ่มลดโครงการ', 'ประวัติการโอนย้ายงบประมาณ'
      ],
      addReduceHistory:[
        {text:'วัน/เวลา', value: 'time', align: 'start'},
        {text:'โครงการ', value: 'sub_project'}, 
        {text:'เพิ่ม/ลด', value: 'tpye'},
        {text:'เพิ่มโดย', value: 'user'}
      ],
      transectionHistory:[
        {text:'จำนวนงบประมาณ (บาท)', value: 'amount', align: 'start'},
        {text:'จากโครงการ', value: 'from_project'},
        {text:'มาโครงการ', value: 'to_project'},
        {text:'วัน/เวลา', value: 'time'},
        {text:'โอนโดย', value: 'user'}
      ],
      actionActivities:[],
      transection:[]
    }
  },
  mounted(){
    const vm = this
      db.collection("action_activities").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {  
          console.log(doc.data())             
          vm.actionActivities.push(doc.data())
          console.log(this.actionActivities)
        });
      })
      db.collection("old_transaction_activities").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {  
          console.log(doc.data())             
          vm.transection.push(doc.data())
          console.log(this.transection)
        });
      })
    }
};
</script>
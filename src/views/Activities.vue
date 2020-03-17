<template>
  <v-card>
    <v-toolbar
      centered
    >
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
    fixed-tabs
    background-color="indigo"
    dark
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
          :items="transaction"></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-data-table
          :headers="expenseHistory"
          :items="expense"></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-data-table
          :headers="disburseHistory"
          :items="disburse"></v-data-table>
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
export default {
  data() {
    return {
      tabs: null,
      historyTabs:[
        'ประวัติการเพิ่มลดโครงการ', 'ประวัติการโอนย้ายงบประมาณ','ประวัติการขออนุมัติใช้','ประวัติการเบิกงบประมาณ'
      ],
      addReduceHistory:[
        {text:'วัน/เวลา', value: 'date', align: 'start'},
        {text:'รายละเอียด', value: 'description'},
        {text:'ผู้แก้ไข', value: 'user_name'},
        {text:'', value: 'user_email'},
        {text:'สาขาวิชา', value: 'user_department'}

      ],
      transectionHistory:[

        {text:'วัน/เวลา', value: 'date'},
        {text:'รายละเอียด', value: 'description'},
        {text:'โอนโดย', value: 'user_name'},
        {text:'', value: 'user_email'},
        {text:'สาขาวิชา', value: 'user_department'},
        {text:'จำนวนงบประมาณ (บาท)', value: 'amount'},
      ],
        expenseHistory:[

        {text:'วัน/เวลา', value: 'date'},
        {text:'รายละเอียด',value: 'details'},
        {text:'รายละเอียดการขออนุมัติ', value: 'description'},
        {text:'ผู้ขออนุมัติใช้', value: 'user_name'},
        {text:'', value: 'user_email'},
        {text:'สาขาวิชา', value: 'user_department'},
      ],
        disburseHistory:[
        {text:'วัน/เวลา', value: 'date'},
        {text:'รายละเอียด',value: 'details'},
        {text:'รายละเอียดการเบิกจ่าย', value: 'description'},
        {text:'ผู้เบิกจ่าย', value: 'user_name'},
        {text:'', value: 'user_email'},
        {text:'สาขาวิชา', value: 'user_department'},
      ],
      actionActivities:[],
      transaction:[],
      expense:[],
      disburse:[],
    }
  },
  created(){
    const vm = this

     db.collection("action_activities")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
         if(doc.data().type == 'add'){
                vm.actionActivities.push({
              ...doc.data(),
              date: doc.data().time.toDate(),

              description: 'เพิ่มโครงการย่อย ' + doc.data().sub_name +" ภายใต้โครงการ" + doc.data().project_name
                }
              )              
          }else{
                vm.actionActivities.push({
              ...doc.data(),
              date: doc.data().time.toDate(),

              description: 'ลบโครงการย่อย ' + doc.data().sub_name +" ภายใต้โครงการ" + doc.data().project_name
                }
              )
          } 
        });
      });
     db.collection("old_transaction_activities")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
                vm.transaction.push({
              ...doc.data(),
              date: doc.data().time.toDate(),
              description: 'โอนเงินจาก ' + doc.data().from_project +"ไปยัง" + doc.data().to_project
                }
              )              
        });
      });
    db.collection("sub_transaction_activities")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
         if(doc.data().type == 'expense'){
                vm.expense.push({
              ...doc.data(),
              date: doc.data().time.toDate(),

              details: 'ขออนุมัติเงินใช้จำนวน ' + doc.data().amount +"บาท ภายใต้โครงการ" + doc.data().sub_name
                }
              )              
          }else{
                vm.disburse.push({
              ...doc.data(),
              date: doc.data().time.toDate(),

              details: 'ขอเบิกจ่าย ' + doc.data().amount +"บาท ภายใต้โครงการ" + doc.data().sub_name
                }
              )
          }             
        });
      });
    }
};
</script>
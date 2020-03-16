<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">
    <v-container style="height: 1500px;">
      <br />
      <br />
      <h5>ประวัติโครงการย้อนหลัง</h5>
      <br />
      <br />

      <v-select
        v-model="enabled"
        :items="years"
        label="เลือกปีการศึกษา"
        clearable
      ></v-select>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :single-expand="singleExpand"
        item-key="name"
        class="elevation-1"
      >
      </v-data-table>
      <br />
      <br />
      <v-data-table
        :headers="headers"
        :items="finish_projects"
        :single-expand="singleExpand"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>โครงการย้อนหลังทั้งหมด</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </v-sheet>
</template>
<script>
import firebase from "firebase";
import { db } from "../main";
import { counter } from "@fortawesome/fontawesome-svg-core";
export default {
  data() {
    return {
      enabled: null,
      search: null,
      years: [],
      finish_projects: [],
      deptID:null,
      headers: [
        {
          text: "โครงการหลัก",
          align: "start",
          sortable: false,
          value: "project_name",

        },
        { text: "โครงการย่อย", value: "sub_name" },
        
        { text: "ประเด็นยุทธ์ศาสตร์", value: "si_id" },
        { text: "ยุทธศาสตร์", value: "s_id" },
        { text: "กลยุทธ์", value: "t_id" },
        { text: "ผู้รับผิดชอบ", value: "person_in_charge" },
        { text: "งบประมาณ", value: "budget" },
        { text: "คงเหลือ", value: "budget_remain" },
        { text: "โอนเข้า", value: "deposit" },
        { text: "โอนออก", value: "withdraw" },
        { text: "ปีการศึกษา", value: "year" },
        { text: "รายละเอียด", value: "action", sortable: false }
      ]
    };
  },

  computed: {
    showSelect() {
      return (
        this.isEnabled("header.data-table-select") ||
        this.isEnabled("item.data-table-select")
      );
    },
    hideHeaders() {
      return !this.showSelect;
    },
    isLoading() {
      return this.isEnabled("progress");
    }
  },

  watch: {
    enabled() {
      var year_id = this.enabled;
      console.log("enabled: ", year_id.toString());
      function getProjects(item) {
        let i = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        if (i.year == year_id) {
          console.log("I can get one");
          return i;
        }
      }
      var project_list = this.finish_projects.filter(getProjects);
      this.items = project_list;
    }
  },
  methods: {
    initialize() {
      var d = new Date();
      var old = d.getFullYear() + 543 - 23;
      var now = d.getFullYear() + 543;
      var diff = now - old;

      for (var i = old; i < now; i++) {
        this.years.push(i);
      }
    },
    isEnabled(slot) {
      return this.enabled === slot;
    }
  },
  mounted() {
    var id = this;
    
  },
  created() {
    this.initialize();
    if(firebase.auth().currentUser){
        this.isLoggined = true;
        this.currentUser = firebase.auth().currentUser.email;
        this.user = this.currentUser
        console.log(this.currentUser)

        db.collection("users").get().then(
          querySnapshot => {
            querySnapshot.forEach(doc=>{
              if(doc.data().email == this.user){
                this.deptID = doc.data().dept_id
                this.user_name = doc.data().name
                this.user_email = doc.data().email
                this.user_department = doc.data().deptname
            if(this.deptID == 0 || parseInt(this.deptID) == 0){
                  console.log("EE")
                  this.sub_project_doc = "ee_subproject"
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())

                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('ee_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                          
                        }
                      )
         }
         else if (this.deptID == 1 || parseInt(this.deptID )==1 ){
                  console.log("CE")
                  this.sub_project_doc = "ce_subproject"
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())

                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }                         
                        })
                      })
                      db.collection('ce_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                          if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }
                else if (this.deptID == 2 || parseInt(this.deptID )==2 ){
                  console.log("AE")
                  this.sub_project_doc = "ae_subproject"
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('ae_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }
                else if (this.deptID == 3 || parseInt(this.deptID )==3){
                  this.sub_project_doc = "ie_subproject"

                  console.log("IE")
                       db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('ie_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }
                else if (this.deptID == 4 || parseInt(this.deptID )==4){
                  this.sub_project_doc = "me_subproject"

                  console.log("ME")
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('me_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                             if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }
                else if (this.deptID == 5 || parseInt(this.deptID )==5){
                  this.sub_project_doc = "env_subproject"

                  console.log("ENVI")
                       db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('env_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }                
else if (this.deptID == 6 || parseInt(this.deptID )==6){
                  this.sub_project_doc = "che_subproject"

                  console.log("CHEM")
                       db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('che_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }
               else if (this.deptID == 7 || parseInt(this.deptID )==7){
                  console.log("COE")
                  this.sub_project_doc = "coe_subproject"

                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())

                          if(parseInt(doc.data().dept_id) == this.deptID && (doc.data().isFinish == true)){
                            this.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain,doc.data().project_name]
                              })
                          }
                          
                        })
                      })
                      db.collection('coe_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            if(doc.data().isFinish == true){
                            this.finish_projects.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().sub_name,
                              'value': [doc.id,doc.data().sub_name]
                            })
                            }
                          })
                        }
                      )
                }                                
              }
            })
          }
        )
     } 
    
  }
};
</script>

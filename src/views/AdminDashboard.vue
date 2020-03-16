
<template>
  <v-container class="grey lighten-5">
    <v-dialog
        v-model="view" persistent max-width="600px"
        >
        <v-card>
          <v-card-title>
            <span class="headline">โครงการย่อย</span>
          </v-card-title>
          <v-data-table
          :headers="sub_headers"
          :items="sub_project"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
          </template>
        </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="view = false">EXIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

 <v-dialog v-model="dialog_edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">แก้ไขโครงการ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.project_name" label="ชื่อโครงการ" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
              <v-select
              v-model="editedItem.si_id"
                :items="strategicissues"
                label="ประเด็นยุทธศาสตร์"
                
              ></v-select>
              </v-col>
                <v-col cols="12" sm="4">
                <v-select
               v-model="editedItem.s_id"
                  :items="strategic"
                  label="ยุทธ์ศาสตร์"
                  
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
              v-model="editedItem.t_id"
                  :items="tactics"
                  label="กลยุทธ์"
                  
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.indicator" label="ตัวชี้วัด" type="text" ></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field v-model="editedItem.target" label="ค่าเป้าหมาย" type="text" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.person_in_charge" label="ผู้รับผิดชอบ" type="text" ></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field v-model="editedItem.budget" label="งบประมาณ" type="number" ></v-text-field>
              </v-col>                         
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog_edit = false">ยกเลิก</v-btn>
          <v-btn color="green" text @click="save_edit">แก้ไข</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>       
  <div class="row">
      <div class="col">
         <v-card-title>
      โครงการหลัก (กำลังดำเนินการ)
      <v-spacer></v-spacer>

    </v-card-title>
      </div>
  </div>
  <div class="row">
    <div class="col">
  <v-data-table
      :search="search"

    :headers="headers"
    :items="projects"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>        
      <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="mb-2" v-on="on">เพิ่มโครงการหลัก</v-btn>
          </template>
          <v-card>
            <v-card-text>
                    <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field v-model="add_project_name" label="ชื่อโครงการ" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
              <v-select
              v-model="add_dept_id"
                :items="departments"
                label="สาขาวิชา"
                required
              ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="add_year" label="ปีการศึกษา" type="text" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
              <v-select
              v-model="add_si_id"
                :items="strategicissues"
                label="ประเด็นยุทธศาสตร์"
                required
              ></v-select>
              </v-col>
                <v-col cols="12" sm="4">
                <v-select
               v-model="add_s_id"
                  :items="strategic"
                  label="ยุทธ์ศาสตร์"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
              v-model="add_t_id"
                  :items="tactics"
                  label="กลยุทธ์"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="add_indicator" label="ตัวชี้วัด" type="text" required></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field v-model="add_target" label="ค่าเป้าหมาย" type="text" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="add_person_in_charge" label="ผู้รับผิดชอบ" type="text" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="add_budget" label="งบประมาณ" type="number" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="success" text @click="add_project">เพิ่ม</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
     <template v-slot:item.deptname="{ item }">
      <v-chip :color="getColor(item.deptname)" dark>{{ item.deptname }}</v-chip>
    </template>
    <template v-slot:item.action="{ item }">

            <v-icon
        small
        class="mr-2"
        @click="viewItem(item)"
      >
        mdi-card-search
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
    </template>
  </v-data-table>
  </div>
  </div>
  </v-container>
</template>

<script>

import firebase from "firebase";
import {db} from '../main' 
import { counter } from '@fortawesome/fontawesome-svg-core';

  export default {
    data: () => ({
      search: '',
      projects:[],
      sub_project:[],
      ae_subproject: [],
      ce_subproject: [],
      che_subproject: [],
      coe_subproject: [],
      ee_subproject: [],
      env_subproject: [],
      ie_subproject: [],
      me_subproject: [],
      departments:[],
      tactics:[],
      strategic:[],
      strategicissues:[],
      years:[],
      dialog: false,
      dialog_edit: false,
      view: false,
      add_project_name: '',
      add_dept_id:'',
      add_si_id: '',
      add_s_id: '',
      add_t_id: '',
      add_indicator:'',
      add_target:'',
      add_person_in_charge:'',
      add_budget:null,
      add_budget_remain:null,
      add_note:'',
      add_result:'',
      add_year:'',
      add_result_description:'',
      add_problems:'',
      add_isFinish:null,
      headers: [

          {
            text: 'สาขาวิชา',
            align: 'start',
            sortable: false,
            value: 'deptname',
          },
          { text: 'ชื่อโครงการ', value: 'project_name' },

          { text: 'ประเด็นยุทธ์ศาสตร์', value: 'si_id' },
          { text: 'ยุทธศาสตร์', value: 's_id' },
          { text: 'กลยุทธ์', value: 't_id' },
          { text: 'ผู้รับผิดชอบ', value: 'person_in_charge' },
          { text: 'งบประมาณ', value: 'budget' },
          { text: 'คงเหลือ', value: 'budget_remain' },
          { text: 'โอนเข้า', value: 'deposit' },
          { text: 'โอนออก', value: 'withdraw' },
          { text: 'รายละเอียด', value: 'action', sortable: false },
          // {text: 'สถานะ' , value: 'isFinish'}
        ],
        sub_headers: [
          { text: 'ชื่อโครงการย่อย', value: 'sub_name' },
          { text: 'ประเด็นยุทธ์ศาสตร์', value: 'si_id' },
          { text: 'ยุทธศาสตร์', value: 's_id' },
          { text: 'กลยุทธ์', value: 't_id' },
          { text: 'ตัวชี้วัด', value: 'indicator' },
          { text: 'กลุ่มเป้าหมาย', value: 'target' },
          { text: 'ผู้รับผิดชอบ', value: 'person_in_charge' },
          { text: 'งบประมาณ', value: 'budget' },
          { text: 'คงเหลือ', value: 'budget_remain' },
          // {text: 'สถานะ' , value: 'isFinish'}
        ],
      editedIndex: -1,
      editedItem: {
        id: '',
        project_name: '',
          si_id: null,
          s_id: null,
          t_id: null,
          indicator: '',
          target: '',
          person_in_charge: '',
          note:'',
          result:'',
          result_description:'',
          problems:'',
          isFinish:null,
          dept_id:null,
          budget: null,
          budget_remain: null
      },
      
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    // watch: {
    //   dialog (val) {
    //     val || this.close()
    //   },
    // },

    created () {
    db.collection('strategicissues').get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            'value' : parseInt(doc.data().si_id),
            'text' : doc.data().si_id,
            id : doc.id
          }
          this.strategicissues.push(data)
        })
      }
    )
     db.collection('strategic').get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            'value' : parseInt(doc.data().s_id),
            'text' : doc.data().s_id,
            id : doc.id
          }
          this.strategic.push(data)
        })
      }
    )
     db.collection('tactics').get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            'value' : parseInt(doc.data().t_id),
            'text' : doc.data().t_id,
            id : doc.id
          }
          this.tactics.push(data)
        })
      }
    )
     db.collection('departments').get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            ...doc.data(),
            id : doc.id,
           'value': [doc.id,doc.data().deptname],
            'text': doc.data().deptname
          }
          this.departments.push(data)
          console.log(data)
        })
      }
    )
    db.collection('projects').get().then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          if(doc.data().isFinish == false){
          var filteredDept = this.filterdeptName(doc.data().dept_id);
          var subfilteredDept = this.sub_filterdeptName(doc.data().dept_id);
          console.log(subfilteredDept)
          console.log(filteredDept)
          const data ={
            ...doc.data(),
            id : doc.id,
            deptname: filteredDept,
          }
          this.projects.push(data)
          db.collection(subfilteredDept).get().then(
                querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if(doc.data().isFinish == false){
                    const subdata ={
                      ...doc.data(),
                      id : doc.id,
                    }
                    this.sub_project.push(subdata)
                      }
                    }
                    )
                  }
                )
          
          }
        }
        )
      }
    )
    },

    methods: {
      viewItem (item) {
        this.view = true
      },
      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog_edit = true
      },
        add_project(){
        var is = this.add_isFinish
        if(is == null){
          this.add_isFinish = false
        }
             db.collection('projects').add({
                project_name: this.add_project_name,
                year: this.add_year,
                dept_id: this.add_dept_id[0],
                si_id: this.add_si_id,
                s_id: this.add_s_id,
                t_id: this.add_t_id,
                indicator: this.add_indicator,
                person_in_charge: this.add_person_in_charge,
                target:this.add_target,
                note:this.add_note,
                result:this.add_result,
                result_description:this.add_result_description,
                problems:this.add_problems,
                isFinish:this.add_isFinish,
                budget: parseInt(this.add_budget),
                budget_remain: parseInt(this.add_budget),
        })
        .then(function(docRef) {
            console.log("เพิ่มโครงการ ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        this.dialog = false
      },
      save_edit(){
          console.log(this.editedItem.id)
          db.collection('projects').doc(this.editedItem.id).update({
            project_name: this.editedItem.project_name,
            si_id:parseInt(this.editedItem.si_id),
            s_id:parseInt(this.editedItem.s_id),
            t_id:parseInt(this.editedItem.t_id),
            indicator: this.editedItem.indicator,
            target: this.editedItem.target,
            person_in_charge: this.editedItem.person_in_charge,
            budget: this.editedItem.budget,
            budget_remain: this.editedItem.budget_remain
          }).then(function(docRef){
          console.log("updated a project successfully")
          })
                    this.dialog_edit = false

      },
            deleteItem (item) {
        const index = this.projects.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.projects.splice(index, 1) && 
                db.collection('projects').doc(item.id).delete().then(function() {
          console.log("Project successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing project: ", error);
      });
      },
      
      filterdeptName(project){
          if(project == '0'  || parseInt(project) == 0){
            return "EE"
          }else if(project == '1'  || parseInt(project) == 1){
            return 'CE'
          }
          else if(project == '2'  || parseInt(project) == 2){
            return 'AE'
          }
          else if(project == '3'  || parseInt(project) == 3){
            return 'IE'
          }
          else if(project == '4'  || parseInt(project) == 4){
            return 'ME'
          }
          else if(project == '5'  || parseInt(project) == 5){
            return 'ENVI'
          }
          else if(project == '6'  || parseInt(project) == 6){
            return 'CHEM'
          }
          else if(project == '7' || parseInt(project) == 7 ){
            return 'COE'
          }
      },
      getColor(name){
          if(name == 'EE')
           return 'red'
          else if(name == 'CE')
           return 'purple'
          else if(name == 'AE')
           return 'indigo'
          else if(name == 'IE')
           return 'cyan'
          else if(name == 'ME')
           return 'green'
          else if(name == 'ENVI')
           return 'orange'
          else if(name == 'CHEM')
           return 'brown'
          else if(name == 'COE')
           return 'grey'          

      },
      sub_filterdeptName(project){
          if(project == '0'  || parseInt(project) == 0)
            return "ee_subproject"
          else if(project == '1'  || parseInt(project) == 1)
            return 'ce_subproject'
          else if(project == '2'  || parseInt(project) == 2)
            return 'ae_subproject'
          else if(project == '3'  || parseInt(project) == 3)
            return 'ie_subproject'
          else if(project == '4'  || parseInt(project) == 4)
            return 'me_subproject'
          else if(project == '5'  || parseInt(project) == 5)
            return 'env_subproject'
          else if(project == '6'  || parseInt(project) == 6)
            return 'che_subproject'
          else if(project == '7'  || parseInt(project) == 7)
            return 'coe_subproject'
      }
    }
   
    }
</script>
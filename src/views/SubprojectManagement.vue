<template>
  <div>
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
                <v-text-field v-model="editedItem.note" label="หมายเหตุ" type="text" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.result" label="ผลการดำเนินงาน" type="text" ></v-text-field>
              </v-col>             
               <v-col cols="12">
                <v-text-field v-model="editedItem.result_description" label="รายละเอียดผลการดำเนินงาน" type="text" ></v-text-field>
              </v-col>             
              <v-col cols="12">
                <v-text-field v-model="editedItem.problems" label="ปัญหาอุปสรรค" type="text" ></v-text-field>
              </v-col>            

                <v-col cols="12">
                    <v-checkbox v-model="editedItem.isFinish" :label="'สถานะการดำเนินการ'"></v-checkbox>
              </v-col>                  
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_edit = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>       
<v-dialog v-model="dialog_edit_sub" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">แก้ไขโครงการย่อย</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.sub_name" label="ชื่อโครงการย่อย" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
              <v-select
              v-model="edited_subItem.si_id"
                :items="strategicissues"
                label="ประเด็นยุทธศาสตร์"
              ></v-select>
              </v-col>
                <v-col cols="12" sm="4">
                <v-select
               v-model="edited_subItem.s_id"
                  :items="strategic"
                  label="ยุทธ์ศาสตร์"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
              v-model="edited_subItem.t_id"
                  :items="tactics"
                  label="กลยุทธ์"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.indicator" label="ตัวชี้วัด" type="text" ></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field v-model="edited_subItem.target" label="ค่าเป้าหมาย" type="text" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.person_in_charge" label="ผู้รับผิดชอบ" type="text" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.budget" label="งบประมาณ" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.budget_remain" label="งบประมาณคงเหลือ (ตามแผน)" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.note" label="หมายเหตุ" type="text" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.result" label="ผลการดำเนินงาน" type="text" required></v-text-field>
              </v-col>             
               <v-col cols="12">
                <v-text-field v-model="edited_subItem.result_description" label="รายละเอียดผลการดำเนินงาน" type="text" required></v-text-field>
              </v-col>             
              <v-col cols="12">
                <v-text-field v-model="edited_subItem.problems" label="ปัญหาอุปสรรค" type="text" required></v-text-field>
              </v-col>            

                <v-col cols="12">
                    <v-checkbox v-model="edited_subItem.isFinish" :label="'สถานะการดำเนินการ'"></v-checkbox>
              </v-col>                  
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_edit_sub = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save_sub">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>       
      <v-dialog v-model="dialog_view" width="600px">
      <v-card>
        <v-card-title >
          <span class="headline">{{editedItem.project_name}}</span>
        </v-card-title>
        <v-card-text>
          <p>ประเด็นยุทธ์ศาสตร์: {{editedItem.si_id}}</p>
          <p>ยุทธ์ศาสตร์: {{editedItem.s_id}}</p>
          <p>กลยุทธ์: {{editedItem.t_id}}</p>
          <p>ตัวชี้วัด: {{editedItem.indicator}}</p>
          <p>ค่าเป้าหมาย: {{editedItem.target}}</p>
          <p>ผู้รับผิดชอบ: {{editedItem.person_in_charge}}</p>
          <p>งบประมาณตามแผน: {{editedItem.budget}}</p>
          <p>คงเหลือตามแผน: {{editedItem.budget_remain}}</p>
          <p>โอนเข้า: {{editedItem.deposit}}</p>
          <p>โอนออก: {{editedItem.withdraw}}</p>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_view = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
  <v-data-table
    :headers="headers"
    :items="projects"
    :single-expand="singleExpand"
    item-key="name"
    class="elevation-1"
  >
  
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>โครงการที่กำลังดำเนินการอยู่ (โครงการหลัก)</v-toolbar-title>
        <v-spacer></v-spacer>
            <div class="my-2">
      <v-dialog v-model="dialog_deposit" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="warning" dark v-on="on">โอนออก
        <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">ทำรายการโอนเงิน</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="projects"
                  label="เลือกโครงการที่ต้องการโอนเข้า*"
                  v-model="selected_deposit_project"
                  required
                ></v-select>
              </v-col>
                
              <v-col cols="12" >
                <v-select
                  v-model="selected_finish_project"
                  :items="finish_projects"
                  label="เลือกโครงการที่ต้องการโอนออกจาก*"
                  required
                ></v-select>
              </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="selected_finish_project[1]"
                    label="จำนวนเงินคงเหลือที่สามารถโอนได้ (บาท)"
                    disabled
                  ></v-text-field>
                </v-col>
              <v-col cols="12">
                <v-text-field label="จำนวนเงินที่ต้องการโอน (บาท)" v-model="deposit_amount" type="number" required></v-text-field>
              </v-col>             
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog_deposit = false">ยกเลิก</v-btn>
          <v-btn color="success" text @click="deposit_budget">ทำรายการ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>          </div>
      </v-toolbar>
    </template>
      <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="viewItem(item)"
      >
        mdi-file-find
      </v-icon>
       <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    </v-data-table>
    <br>
    <br>
  
  <h5>โครงการย่อย </h5>
  <v-dialog v-model="dialog_addsubproject" persistent max-width="600px">
      <template v-slot:activator="{ on }">        
        <v-btn color="success" dark v-on="on">เพิ่มโครงการย่อย</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มโครงการย่อย</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
              v-model="add_project_id"
                  :items="projects"
                  label="โครงการหลัก"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="add_sub_name" label="ชื่อโครงการย่อย" required></v-text-field>
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
              <v-col cols="12">
                <v-text-field v-model="add_budget_remain" label="งบประมาณคงเหลือ (ตามแผน)" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="add_note" label="หมายเหตุ" type="text" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="add_result" label="ผลการดำเนินงาน" type="text" ></v-text-field>
              </v-col>             
               <v-col cols="12">
                <v-text-field v-model="add_result_description" label="รายละเอียดผลการดำเนินงาน" type="text" ></v-text-field>
              </v-col>             
              <v-col cols="12">
                <v-text-field v-model="add_problems" label="ปัญหาอุปสรรค" type="text" ></v-text-field>
              </v-col>            

                <v-col cols="12">
                    <v-checkbox v-model="add_isFinish" :label="'สถานะการดำเนินการ'"></v-checkbox>
              </v-col>  
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" text @click="dialog_addsubproject = false">ปิด</v-btn>
          <v-btn color="success" text @click="add_subproject">เพิ่ม</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-select v-model.lazy="enabled" :items="projects" label="เลือกโครงการหลัก" clearable></v-select>
    <v-data-table
      :headers="headers_sub"
      :items="items"
      :search="search"
      hide-default-footer
      item-key="name"
      class="elevation-1"
    > 
    
     <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="viewItem(item)"
      >
        mdi-file-find
      </v-icon>
       <v-icon
        small
        class="mr-2"
        @click="edit_subItem(item)"
      >
        mdi-pencil
      </v-icon>
        <v-icon
        small
        class="mr-2"
        @click="delete_subItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>    
    <template v-slot:item.isFinish="{ item }">
      <v-icon v-if="item.isFinish === false" small class="mr-2">mdi-autorenew</v-icon>
      <v-icon v-if="item.isFinish === true" small class="mr-2">mdi-check-circle</v-icon>

    </template>  
    </v-data-table>
    </div>
</template>

<script>

import firebase from "firebase";
import {db} from '../main' 
import { counter } from '@fortawesome/fontawesome-svg-core';

export default {
  name: 'RegularDashboard',


    data() {
    return {
      add_project_id: '',
      add_sub_name: '',
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
      add_result_description:'',
      add_problems:'',
      add_isFinish:null,
      sub_project_doc:"",
      enabled: null,
      sub_project: [],
      finish_projects: [],
      selected_finish_project: [],
      deposit_amount:null,
      search: null,
      dialog_edit: false,
      dialog_edit_sub: false,
      dialog_view: false,
      dialog_addsubproject : false,
      dialog_deposit: false,
      selected_deposit_project:null,
      editedIndex: -1,
      isLoggedin: false,
       expanded: {},
        singleExpand: false,
        editedItem: {
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
      },
        edited_subItem: {
          sub_name: '',
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
          budget: null,
          budget_remain: null
      },
        headers: [
          {
            text: 'ชื่อโครงการ',
            align: 'start',
            sortable: false,
            value: 'project_name',
          },
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
        headers_sub:[
          {
            text: 'ชื่อโครงการย่อย',
            align: 'start',
            sortable: false,
            value: 'sub_name',
          },
          { text: 'ประเด็นยุทธ์ศาสตร์', value: 'si_id' },
          { text: 'ยุทธศาสตร์', value: 's_id' },
          { text: 'กลยุทธ์', value: 't_id' },
          { text: 'ผู้รับผิดชอบ', value: 'person_in_charge' },
          { text: 'งบประมาณ', value: 'budget' },
          { text: 'คงเหลือ', value: 'budget_remain' },
          { text: 'รายละเอียด', value: 'action', sortable: false }, 
          {text: 'สถานะ', value:'isFinish'}
        
        ],

        projects:[],
        strategicissues : [],
        strategic: [],
        tactics: [],
      
    };
  },
   computed: {
    },
     watch: {
      enabled () {
          // this.items = this.projects
          var main = this.enabled
          function getSub(item){
            let sub = Object.fromEntries(Object.entries(item).map(([key,value])=> [key,value]))
            console.log(sub.project_id)
            if(sub.project_id == main){
              return sub
            }
          }
          var list = this.sub_project.filter(getSub)
          this.items = list
      },
    },
  methods: {
        editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog_edit = true
      },
        edit_subItem(item){
        this.edited_subItem = Object.assign({}, item)
        this.dialog_edit_sub = true
        },
        viewItem(item){
        this.editedItem = Object.assign({}, item)
         this.dialog_view = true
        },
        delete_subItem (item) {
        const index = this.sub_project.indexOf(item)
        console.log(item.id)        
        confirm('ต้องการลบโครงการย่อยนี้ใช่ไหม?') && this.sub_project.splice(index, 1) &&
        db.collection(this.sub_project_doc).doc(item.id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      },
        save(){
          if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem)
          console.log("save : ", this.editedItem.id)
        } else {
          var item = this.editedItem
            db.collection("projects").doc(item.id).update({
                'project_name': item.project_name,
                'si_id': item.si_id,
                's_id': item.s_id,
                't_id': item.t_id,
                'person_in_charge': item.person_in_charge,
                'indicator': item.indicator,
                'target':item.target,
                'note':item.note,
                'result':item.result,
                'result_description':item.result_description,
                'problems':item.problems,
                'isFinish':item.isFinish,
            })
            .then(function() {
                console.log("edit: ",item.id)
            });       
        }
        this.dialog_edit = false
      },
          isEnabled (slot) {
        return this.enabled === slot
      },
            close () {
        this.dialog_edit = false
      },
         save_sub(){
          if (this.editedIndex > -1) {
          Object.assign(this.sub_project[this.editedIndex], this.edited_subItem)
          console.log("save : ", this.edited_subItem.id)
        } else {
          var item = this.edited_subItem
            db.collection(this.sub_project_doc).doc(item.id).update({
                "sub_name": item.sub_name,
                "si_id": item.si_id,
                "s_id": item.s_id,
                "t_id": item.t_id,
                "indicator": item.indicator,
                "person_in_charge": item.person_in_charge,
                "target":item.target,
                "note":item.note,
                "result":item.result,
                "result_description":item.result_description,
                "problems":item.problems,
                "isFinish":item.isFinish,
                "budget": parseInt(item.budget),
                "budget_remain": parseInt(item.budget_remain),
            })
            .then(function() {
                console.log("edit: ",item.id)
            });       
        }
        this.dialog_edit_sub = false
      },
      add_subproject(){
        var is = this.add_isFinish
        if(is == null){
          this.add_isFinish = false
      }
      
              db.collection(this.sub_project_doc).add({
                sub_name: this.add_sub_name,
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
                budget_remain: parseInt(this.add_budget_remain),
                project_id: this.add_project_id

        })
        .then(function(docRef) {
            console.log("เพิ่มโครงการย่อย ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

      },
      deposit_budget(){
        console.log(this.selected_finish_project)
        console.log(this.selected_deposit_project)
        console.log(this.deposit_amount)
        var deposit_amount = parseInt(this.deposit_amount)
        var finish_project_id = this.selected_finish_project[0]
        var finish_project_budget =this.selected_finish_project[1]
        var target_project_id = this.selected_deposit_project
        var target_project = this.projects.filter(function(project){
          return project.id == target_project_id
        })
        //update target project budget 
        console.log(typeof target_project[0].budget)
        console.log(typeof target_project[0].budget_remain)
        console.log(typeof deposit_amount)
        db.collection("projects").doc(target_project_id).update({
          budget_remain: target_project[0].budget_remain+deposit_amount,
          deposit: target_project[0].deposit+deposit_amount

        })
        db.collection("projects").doc(finish_project_id).update({
          budget_remain: parseInt(finish_project_budget)-deposit_amount,
          withdraw:firebase.firestore.FieldValue.increment(deposit_amount)

        })         
        this.dialog_deposit = false
      }
  },
  mounted() {
    var id = this
      if(firebase.auth().currentUser){
        this.isLoggined = true;
        this.currentUser = firebase.auth().currentUser.email;
        this.user = this.currentUser
        db.collection("users").get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
        // doc.data() is never undefined for query doc snapshots
              if(doc.data().email == firebase.auth().currentUser.email){
                id.deptID = doc.data().dept_id
                if(id.deptID == 0 || parseInt(id.deptID) == 0){
                  console.log("EE")
                  id.sub_project_doc = "ee_subproject"
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('ee_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }else if (id.deptID == 1 || parseInt(id.deptID )==1 ){
                  console.log("CE")
                  id.sub_project_doc = "ce_subproject"
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('ce_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }
                }else if (id.deptID == 2 || parseInt(id.deptID )==2 ){
                  console.log("AE")
                  id.sub_project_doc = "ae_subproject"
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('ae_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }else if (id.deptID == 3 || parseInt(id.deptID )==3){
                  id.sub_project_doc = "ie_subproject"

                  console.log("IE")
                       db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('ee_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }
                else if (id.deptID == 4 || parseInt(id.deptID )==4){
                  id.sub_project_doc = "me_subproject"

                  console.log("ME")
                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('me_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }                
                else if (id.deptID == 5 || parseInt(id.deptID )==5){
                  id.sub_project_doc = "env_subproject"

                  console.log("ENVI")
                       db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('env_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }
                else if (id.deptID == 6 || parseInt(id.deptID )==6){
                  id.sub_project_doc = "che_subproject"

                  console.log("CHEM")
                       db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('che_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }    
                else if (id.deptID == 7 || parseInt(id.deptID )==7){
                  console.log("COE")
                  id.sub_project_doc = "coe_subproject"

                      db.collection('projects').get().then(
                      querySnapshot => {
                        //  console.log(querySnapshot)
                        querySnapshot.forEach(doc => {
                          // this.pp.push(doc.data())
                          if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == false) ){
                            var main_id = doc.id                            
                            id.projects.push({
                              ...doc.data(), 
                              id : doc.id,
                              'text' : doc.data().project_name,
                              'value': doc.id
                              })
                          }
                          else if(parseInt(doc.data().dept_id) == id.deptID && (doc.data().isFinish == true)){
                            id.finish_projects.push({
                              ...doc.data(), 
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': [doc.id,doc.data().budget_remain]
                              })
                          }
                          
                        })
                      })
                      db.collection('coe_subproject').get().then(
                        querySnapshot =>{
                          querySnapshot.forEach(doc => {
                            id.sub_project.push({
                              ...doc.data(),
                              id : doc.id
                              ,
                              'text' : doc.data().project_name,
                              'value': doc.id
                            })
                          })
                        }
                      )
                }          
          })
        })
      }
  },
  created(){

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
  }
}
</script>

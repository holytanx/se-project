<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>จัดการสมาชิก</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="edit_dialog" max-width="600px">
              <v-card>
        <v-card-title>
          <span class="headline">แก้ไขสมาชิก</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ชื่อ/username*"  v-model="editedItem.name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="editedItem.email"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.deptname"
                    label="สาขาวิชา/ฝ่าย (ปัจจุบัน)"
                    disabled
                  ></v-text-field>
                </v-col>
              <v-col cols="12">
                <v-select
                  :items="departments"
                  label="สาขาวิชา/ฝ่าย"
                  required
                  v-model="editedItem.dept"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="edit_dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save_edit()">Save</v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
           <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="mb-2" v-on="on">เพิ่มสมาชิก</v-btn>
          </template>
              <v-card>
        <v-card-title>
          <span class="headline">เพิ่มสมาชิก</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ชื่อ/username*" type="text" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" type="email" v-model="email"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" v-model="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="departments"
                  label="สาขาวิชา/ฝ่าย"
                  required
                  v-model="dept"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="registerAuth(); addMember();">Save</v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
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
</template>
<script>
import firebase from "firebase";
import {db} from '../main';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
// import {addAdminRole} from '../admin.js'
  export default {
    name: "MembersManagement",
   data: () => ({
      dialog: false,
      edit_dialog: false,
      headers: [
        {
          text: 'ชื่อ',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'อีเมลล์', value: 'email' },
        { text: 'สาขาภาควิชา', value: 'dept.text' },
        { text: 'รายละเอียด', value: 'action', sortable: false },
      ],
      name:'',
      email:'',
      password:'',
      dept: null,
      users: [],
      departments:[],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        email: '',
        dept: null,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted () {
        var ref = this
        db.collection('departments').get().then(
         querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            'value': [doc.id,doc.data().deptname],
            'text': doc.data().deptname
          }
          ref.departments.push(data)
        })
      }
    )
        db.collection('users').get().then(
         querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            ...doc.data(),
            id : doc.id,
            dept: {
              'value' : doc.data().dept_id,
              'text': doc.data().deptname
            } 
          }
          ref.users.push(data)
          console.log("this is user: ", data)
        })
      }
    )
},

    methods: {
       editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.edit_dialog = true
      },
       registerAuth(){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Account created for " + this.email);
            // this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        )},
         addMember(){
              db.collection("users").add({
          email : this.email,
          dept_id: parseInt(this.dept[0]),
          deptname: this.dept[1],
          name: this.name
        })
        .then(function(docRef) {
            console.log("user written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    ,

      deleteItem (item) {
        const index = this.users.indexOf(item)
        console.log(item.id)
        var user = firebase.auth().currentUser;
        console.log(user)
       confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1) && 
        db.collection("users").doc(item.id).delete().then(function() {
            console.log("User successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing user: ", error);
        });
       
      },

      // close () {
      //   this.dialog = false
      //   setTimeout(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   }, 300)
      // },

      save_edit() {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          // console.log(this.editedItem.dept[0])
          console.log(this.editedItem.id)
          db.collection('users').doc(this.editedItem.id).update({
            dept_id: this.editedItem.dept_id,
            deptname:this.editedItem.deptname,
            email:this.editedItem.email,
            name: this.editedItem.name,

          })
          console.log("updated an user successfully")
          this.edit_dialog = false
        }
        
        // this.close()
      },
    }
  }
</script>
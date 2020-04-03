<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="600">
    <v-container style="height: 1500px;">
    <v-container  >
      <div class="row justify-center">
        <div class="col-auto">
          <v-dialog v-model="dialog_add_si" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn elevation="6" rounded outlined color="success" dark v-on="on"
                >เพิ่มประเด็นยุทธ์ศาสตร์
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </template>
            <v-card >
              <v-card-title>
                <span class="headline">เพิ่มประเด็นยุทธ์ศาสตร์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="ประเด็นยุทธ์ศาสตร์ที่*"
                        v-model="si_id"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อ(รายละเอียด)*"
                        v-mode="si_name"
                        type="name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  color="error" text @click="dialog_add_si = false"
                  >ยกเลิก</v-btn
                >
                <v-btn color="success" text @click="add_si">เพิ่ม</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog_edit_si" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">แก้ไขประเด็นยุทธ์ศาสตร์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem_si.si_id"
                        label="ประเด็นยุทธ์ศาสตร์ที่"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem_si.si_name"
                        label="ชื่อ(รายละเอียด)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog_edit_si = false"
                  >ยกเลิก</v-btn
                >
                <v-btn color="success" text @click="save_edit_si">บันทึก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-auto">
          <v-dialog v-model="dialog_add_s" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn elevation="6" outlined rounded color="warning" dark v-on="on"
                >เพิ่มยุทธ์ศาสตร์
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span  class="headline">เพิ่มยุทธ์ศาสตร์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="ยุทธ์ศาสตร์ที่*"
                        v-model="s_id"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อ(รายละเอียด)*"
                        v-mode="s_name"
                        type="name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog_add_s = false"
                  >ยกเลิก</v-btn
                >
                <v-btn color="success" text @click="add_s">เพิ่ม</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog_edit_s" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">แก้ไขยุทธ์ศาสตร์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem_s.s_id"
                        label="ยุทธ์ศาสตร์ที่"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem_s.s_name"
                        label="ชื่อ(รายละเอียด)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog_edit_s = false"
                  >ยกเลิก</v-btn
                >
                <v-btn color="success" text @click="save_edit_s">บันทึก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-auto">
          <v-dialog v-model="dialog_add_t" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn elevation="6" outlined rounded color="error" dark v-on="on"
                >เพิ่มกลยุทธ์
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">เพิ่มกลยุทธ์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="กลยุทธ์ที่*"
                        v-model="t_id"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อ(รายละเอียด)*"
                        v-mode="t_name"
                        type="name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog_add_t = false"
                  >ยกเลิก</v-btn
                >
                <v-btn color="success" text @click="add_t">เพิ่ม</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog_edit_t" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">แก้ไขกลยุทธ์</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem_t.t_id"
                        label="กลยุทธ์ที่"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem_t.t_name"
                        label="ชื่อ(รายละเอียด)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog_edit_t = false"
                  >ยกเลิก</v-btn
                >
                <v-btn color="success" text @click="save_edit_t">บันทึก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col">
          <v-data-table
            :headers="si_headers"
            :items="strategicissues"
            dense
            class="elevation-6"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="headline font-weight-bold">ประเด็นยุทธ์ศาสตร์</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.si_id="{ item }">
              <v-chip :color="getColor_si(item.si_id)" dark>{{
                item.si_id
              }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="edit_si(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col">
          <v-data-table
            :headers="s_headers"
            :items="strategic"
            dense
            class="elevation-6"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="headline font-weight-bold">ยุทธ์ศาสตร์</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.s_id="{ item }">
              <v-chip :color="getColor_s(item.s_id)" dark>{{
                item.s_id
              }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="edit_s(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </div>

        <div class="col">
          <v-data-table
            :headers="t_headers"
            :items="tactics"
            dense
            class="elevation-6"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title class="title font-weight-bold">กลยุทธ์</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.t_id="{ item }">
              <v-chip :color="getColor_t(item.t_id)" dark>{{
                item.t_id
              }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="edit_t(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-container>
    </v-container>
  </v-sheet>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
// import {addAdminRole} from '../admin.js'
export default {
  data() {
    return {
      dialog_add_si: false,
      dialog_add_s: false,
      dialog_add_t: false,
      dialog_edit_si: false,
      dialog_edit_s: false,
      dialog_edit_t: false,
      si_headers: [
        {
          text: "ประเด็นยุทธ์ศาสตร์ที่",
          align: "start",
          sortable: false,
          value: "si_id"
        },
        { text: "ชื่อ", value: "si_name" },
        { text: "แก้ไข", value: "action" }
      ],
      s_headers: [
        {
          text: "ยุทธ์ศาสตร์ที่",
          align: "start",
          sortable: false,
          value: "s_id"
        },
        { text: "ชื่อ", value: "s_name" },
        { text: "แก้ไข", value: "action" }
      ],
      t_headers: [
        {
          text: "กลยุทธ์ที่",
          align: "start",
          sortable: false,
          value: "t_id"
        },
        { text: "ชื่อ", value: "t_name" },
        { text: "แก้ไข", value: "action" }
      ],
      strategicissues: [],
      si_id: null,
      si_name: "",
      editedItem_si: {
        si_id: null,
        si_name: "",
        id: null
      },
      strategic: [],
      s_id: null,
      s_name: "",
      editedItem_s: {
        s_id: null,
        s_name: "",
        id: null
      },
      tactics: [],
      t_id: null,
      t_name: "",
      editedItem_t: {
        t_id: null,
        t_name: "",
        id: null
      }
    };
  },
  methods: {
    getColor_si(item) {
      return "green";
    },

    getColor_s(item) {
      return "orange";
    },
    getColor_t(item) {
      return "red";
    },
    add_si() {
      db.collection("strategicissues").add({
        si_id: parseInt(this.si_id),
        si_name: this.si_name
      });
    },
    add_s() {
      db.collection("strategic").add({
        s_id: parseInt(this.s_id),
        s_name: this.s_name
      });
    },
    add_t() {
      db.collection("tactics").add({
        t_id: parseInt(this.t_id),
        t_name: this.t_name
      });
    },
    edit_si(item) {
      this.dialog_edit_si = true;
      this.editedItem_si = Object.assign({}, item);
    },
    edit_s(item) {
      this.dialog_edit_s = true;
      this.editedItem_s = Object.assign({}, item);
    },
    edit_t(item) {
      this.dialog_edit_t = true;
      this.editedItem_t = Object.assign({}, item);
    },
    save_edit_si() {
      var item = this.editedItem_si;
      db.collection("strategicissues")
        .doc(item.id)
        .update({
          si_name: item.si_name
        });
      this.dialog_edit_si = false;
    },
    save_edit_s() {
      var item = this.editedItem_s;
      db.collection("strategic")
        .doc(item.id)
        .update({
          s_name: item.s_name
        });
      this.dialog_edit_s = false;
    },
    save_edit_t() {
      var item = this.editedItem_t;
      db.collection("tactics")
        .doc(item.id)
        .update({
          t_name: item.t_name
        });
      this.dialog_edit_t = false;
    }
  },
  created() {
    db.collection("strategicissues")
      .orderBy("si_id", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            ...doc.data(),
            id: doc.id
          };
          this.strategicissues.push(data);
        });
      });
    db.collection("strategic")
      .orderBy("s_id", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            ...doc.data(),
            id: doc.id
          };
          this.strategic.push(data);
        });
      });
    db.collection("tactics")
      .orderBy("t_id", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            ...doc.data(),
            id: doc.id
          };
          this.tactics.push(data);
        });
      });
  }
};
</script>

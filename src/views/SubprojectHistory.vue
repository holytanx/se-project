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
      headers: [
        {
          text: "ชื่อโครงการ",
          align: "start",
          sortable: false,
          value: "project_name"
        },
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
    if (firebase.auth().currentUser) {
      this.isLoggined = true;
      this.currentUser = firebase.auth().currentUser.email;
      this.user = this.currentUser;
      db.collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().email == firebase.auth().currentUser.email) {
              id.deptID = doc.data().dept_id;
              if (id.deptID == 0 || parseInt(id.deptID) == 0) {
                console.log("EE");
                id.sub_project_doc = "ee_subproject";
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      if (
                        parseInt(doc.data().dept_id) == id.deptID &&
                        doc.data().isFinish == true
                      ) {
                        id.finish_projects.push({
                          ...doc.data(),
                          id: doc.id
                        });
                      }
                    });
                  });
              } else if (id.deptID == 1 || parseInt(id.deptID) == 1) {
                console.log("CE");
                id.sub_project_doc = "ce_subproject";
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      if (
                        parseInt(doc.data().dept_id) == id.deptID &&
                        doc.data().isFinish == true
                      ) {
                        id.finish_projects.push({
                          ...doc.data(),
                          id: doc.id
                        });
                      }
                    });
                  });
              }
            } else if (id.deptID == 2 || parseInt(id.deptID) == 2) {
              console.log("AE");
              id.sub_project_doc = "ae_subproject";
              db.collection("projects")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(doc => {
                    if (
                      parseInt(doc.data().dept_id) == id.deptID &&
                      doc.data().isFinish == true
                    ) {
                      id.finish_projects.push({
                        ...doc.data(),
                        id: doc.id
                      });
                    }
                  });
                });
            } else if (id.deptID == 3 || parseInt(id.deptID) == 3) {
              id.sub_project_doc = "ie_subproject";

              console.log("IE");
              db.collection("projects")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(doc => {
                    if (
                      parseInt(doc.data().dept_id) == id.deptID &&
                      doc.data().isFinish == true
                    ) {
                      id.finish_projects.push({
                        ...doc.data(),
                        id: doc.id
                      });
                    }
                  });
                });
            } else if (id.deptID == 4 || parseInt(id.deptID) == 4) {
              id.sub_project_doc = "me_subproject";

              console.log("ME");
              db.collection("projects")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(doc => {
                    if (
                      parseInt(doc.data().dept_id) == id.deptID &&
                      doc.data().isFinish == true
                    ) {
                      id.finish_projects.push({
                        ...doc.data(),
                        id: doc.id
                      });
                    }
                  });
                });
            } else if (id.deptID == 5 || parseInt(id.deptID) == 5) {
              id.sub_project_doc = "env_subproject";

              console.log("ENVI");
              db.collection("projects")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(doc => {
                    if (
                      parseInt(doc.data().dept_id) == id.deptID &&
                      doc.data().isFinish == true
                    ) {
                      id.finish_projects.push({
                        ...doc.data(),
                        id: doc.id
                      });
                    }
                  });
                });
            } else if (id.deptID == 6 || parseInt(id.deptID) == 6) {
              id.sub_project_doc = "che_subproject";

              console.log("CHEM");
              db.collection("projects")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(doc => {
                    if (
                      parseInt(doc.data().dept_id) == id.deptID &&
                      doc.data().isFinish == true
                    ) {
                      id.finish_projects.push({
                        ...doc.data(),
                        id: doc.id
                      });
                    }
                  });
                });
            } else if (id.deptID == 7 || parseInt(id.deptID) == 7) {
              console.log("COE");
              id.sub_project_doc = "coe_subproject";
              db.collection("projects")
                .get()
                .then(querySnapshot => {
                  //  console.log(querySnapshot)
                  querySnapshot.forEach(doc => {
                    if (
                      parseInt(doc.data().dept_id) == id.deptID &&
                      doc.data().isFinish == true
                    ) {
                      id.finish_projects.push({
                        ...doc.data(),
                        id: doc.id
                      });
                    }
                  });
                });
            }
          });
        });
    }
  },
  created() {
    this.initialize();
  }
};
</script>

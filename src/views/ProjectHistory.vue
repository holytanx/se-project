<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">
    <v-container style="height: 1500px;">
      <v-container>
        <v-card class="mt-4 mx-auto" elevation="8">
          <v-sheet
            class="v-sheet--offset--history mx-auto"
            color="red lighten-2"
            elevation="10"
            max-width="calc(100% - 94%)"
            style="height: 60px;"
          >
            <v-icon class="mt-4 mx-5" color="white">mdi-file-document</v-icon>
          </v-sheet>
          <v-row>
            <v-col cols="8">
              <v-card-title class="headline font-weight-bold"
                >ประวัติโครงการย้อนหลัง</v-card-title
              >
            </v-col>
            <v-col>
              <v-select
                v-model="enabled"
                :items="years"
                label="เลือกปีการศึกษา"
                clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.deptname="{ item }">
              <v-chip :color="getColor(item.deptname)" dark>{{
                item.deptname
              }}</v-chip>
            </template>
          </v-data-table>
        </v-card>

        <br />
        <br />
        <v-card class="mt-4 mx-auto" elevation="8">
          <v-sheet
            class="v-sheet--offset--history mx-auto"
            color="red lighten-2"
            elevation="8"
            max-width="calc(100% - 94%)"
            style="height: 60px;"
          >
            <v-icon class="mt-4 mx-5" color="white">mdi-file-cloud</v-icon>
          </v-sheet>
          <v-data-table
            :headers="headers"
            :items="finish_projects"
            :single-expand="singleExpand"
            item-key="name"
            class="elevation-1"
          >
            <template v-slot:item.deptname="{ item }">
              <v-chip :color="getColor(item.deptname)" dark>{{
                item.deptname
              }}</v-chip>
            </template>

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title class="headline font-weight-bold"
                  >โครงการย้อนหลังทั้งหมด</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
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
          text: "สาขาวิชา",
          align: "start",
          sortable: false,
          value: "deptname"
        },
        { text: "โครงการ", value: "project_name" },

        { text: "ประเด็นยุทธ์ศาสตร์", value: "si_id" },
        { text: "ยุทธศาสตร์", value: "s_id" },
        { text: "กลยุทธ์", value: "t_id" },
        { text: "ผู้รับผิดชอบ", value: "person_in_charge" },
        { text: "งบประมาณ", value: "budget" },
        { text: "คงเหลือ", value: "budget_remain" },
        { text: "โอนเข้า", value: "deposit" },
        { text: "โอนออก", value: "withdraw" },
        { text: "รายละเอียด", value: "action", sortable: false }
        // {text: 'สถานะ' , value: 'isFinish'}
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

  mounted() {},

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
    isEnabled(slot) {
      return this.enabled === slot;
    },
    filterdeptName(project) {
      if (project == "0" || parseInt(project) == 0) {
        return "EE";
      } else if (project == "1" || parseInt(project) == 1) {
        return "CE";
      } else if (project == "2" || parseInt(project) == 2) {
        return "AE";
      } else if (project == "3" || parseInt(project) == 3) {
        return "IE";
      } else if (project == "4" || parseInt(project) == 4) {
        return "ME";
      } else if (project == "5" || parseInt(project) == 5) {
        return "ENVI";
      } else if (project == "6" || parseInt(project) == 6) {
        return "CHEM";
      } else if (project == "7" || parseInt(project) == 7) {
        return "COE";
      }
    },
    getColor(name) {
      if (name == "EE") return "red";
      else if (name == "CE") return "purple";
      else if (name == "AE") return "indigo";
      else if (name == "IE") return "cyan";
      else if (name == "ME") return "green";
      else if (name == "ENVI") return "orange";
      else if (name == "CHEM") return "brown";
      else if (name == "COE") return "grey";
    },
    initialize() {
      var d = new Date();
      var old = d.getFullYear() + 543 - 23;
      var now = d.getFullYear() + 543;
      var diff = now - old;

      for (var i = old; i < now; i++) {
        this.years.push(i);
      }
    }
  },
  created() {
    this.initialize();

    db.collection("projects")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().isFinish == true) {
            var filteredDept = this.filterdeptName(doc.data().dept_id);
            console.log(filteredDept);
            const data = {
              ...doc.data(),
              id: doc.id,
              deptname: filteredDept
            };
            this.finish_projects.push(data);
            console.log(this.finish_projects);
          }
        });
      });
  }
};
</script>

<style>
.v-sheet--offset--history {
  top: -14px;
  right: 490px;
  position: relative;
}
</style>

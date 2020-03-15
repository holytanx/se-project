<template>
  <nav>
    <v-app-bar
      v-if="!isLoggined"
      app
      absolute
      color="#c43926"
      dark
      :collapse="!true"
      :collapse-on-scroll="true"
      scroll-target="#scrolling-techniques-6"
      scroll-threshold="300"
    >
      <v-toolbar-title>
        <div class="d-flex align-center">
          <span class="mr-2 display-1 font-weight light">
            Budget Management
          </span>
        </div></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn href="" target="_blank" text>
        <span class="mr-2" v-if="!isLoggined"
          ><router-link tag="h6" to="/Login"
            >เข้าสู่ระบบ <v-icon>mdi-account</v-icon></router-link
          ></span
        >
      </v-btn>
    </v-app-bar>
    <v-app-bar
      v-if="isLoggined"
      app
      absolute
      color="#c43926"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="300"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(254,108,97,.6), rgba(196,57,38,.9)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon
        v-if="isLoggined"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div class="d-flex align-center">
          <span class="mr-2 display-1 font-weight light">
            Budget Management
            <v-btn v-if="this.deptID === 10 || 10 === parseInt(this.deptID)" id="adminBT" rounded dark
              >ADMIN <v-icon dark right>mdi-checkbox-marked-circle</v-icon></v-btn
            >
            <v-btn v-if="this.deptID === 14 || 14 === parseInt(this.deptID)" id="adminBT" rounded dark
              >DEAN <v-icon dark right>mdi-checkbox-marked-circle</v-icon></v-btn
            >
          </span>
        </div></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn href="" target="_blank" text>
        <span class="mr-2" v-if="!isLoggined"
          ><router-link tag="h6" to="/Login">เข้าสู่ระบบ</router-link></span
        >

        <span class="mr-2" v-if="isLoggined"
          >{{ this.username }}<span>({{ this.user }})</span></span
        >

        <!-- <p class="mr-2" v-if="isLoggined">{{this.name}}</p>
        <p class="mr-2" v-if="isLoggined">{{this.user}}<p> -->

        <span class="mr-2" v-if="isLoggined" v-on:click="logout"
          >ออกจากระบบ <v-icon>mdi-account-alert</v-icon></span
        >
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      width="300"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      app
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-2'">
          <v-list-item-avatar>
            <img
              src="https://upload.wikimedia.org/wikipedia/th/a/a6/Engineering_KKU_Thai_Emblem.png"
            />
          </v-list-item-avatar>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">EN KKU</v-list-item-title>
              <v-list-item-subtitle>Engineering KKU</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-divider></v-divider>
        <div v-if="this.deptID === 10 || 10 === parseInt(this.deptID)">
          <v-list-item
            v-for="item in admin_items"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-if="this.deptID === 14 || 14 === parseInt(this.deptID)">
          <v-list-item
            v-for="item in dean_items"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div
          v-if="
            this.deptID != 14 &&
              14 != parseInt(this.deptID) &&
              this.deptID != 10 &&
              10 != parseInt(this.deptID)
          "
        >
          <v-list-item
            v-for="item in regular_items"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-content>
            <v-list-item-title justify="center" v-if="this.deptID == 10"
              >ยินดีต้อนรับแอดมิน (ฝ่ายแผน)
              <v-icon>fas fa-user</v-icon></v-list-item-title
            >
            <v-list-item-title justify="center" v-if="this.deptID == 14"
              >ยินดีต้อนรับคณบดี/รอง
            </v-list-item-title>
            <v-list-item-title
              justify="center"
              v-if="this.deptID != 10 && this.deptID != 14"
              >ยินดีต้อนรับสมาชิกทั่วไป ({{
                filterdeptName(deptID)
              }})</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "Navbar",
  data() {
    return {
      dept: "",
      isLoggined: false,
      currentUser: false,
      user: "",
      username: "",
      deptID: null,
      link: "",
      drawer: false,
      group: null,

      admin_items: [
        {
          title: "จัดการโครงการ (เพิ่ม/ลบ/แก้ไข)",
          icon: "mdi-view-dashboard",
          link: "/admindashboard"
        },
        {
          title: "ประวัติย้อนหลังโครงการ",
          icon: "mdi-history",
          link: "/projecthistory"
        },
        {
          title: "จัดการ ยุทธ์ศาสตร์ (เพิ่ม/ลบ/แก้ไข)",
          icon: "mdi-strategy",
          link: "/strategymanagement"
        },
        {
          title: "จัดการสมาชิก / ผู้ใช้",
          icon: "mdi-account-plus-outline",
          link: "/membersmanagement"
        },
        {
          title: "ประวัติการทำรายการ",
          icon: "mdi-clipboard-list-outline",
          link: "/activities"
        }
      ],
      dean_items: [
        {
          title: "สรุปยอดงบประมาณรายปี",
          icon: "mdi-view-dashboard",
          link: "/deantotalbudget"
        },
        {
          title: "สรุปยอดงบประมาณแต่ละสาขารายปี",
          icon: "mdi-account",
          link: "/"
        },
        {
          title: "ตรวจสอบโครงการที่กำลังดำเนินการ",
          icon: "mdi-timer-sand",
          link: "/"
        }
      ],
      regular_items: [
        {
          title: "หน้าหลัก",
          icon: "mdi-view-dashboard",
          link: "/regulardashboard"
        },
        {
          title: "จัดการโครงการ (เพิ่ม/ลบ/แก้ไข)",
          icon: "mdi-layers-search",
          link: "/subprojectmanagement"
        },
        {
          title: "ประวัติย้อนหลังโครงการ",
          icon: "mdi-history",
          link: "/subprojecthistory"
        },
        {
          title: "ประวัติการทำรายการ",
          icon: "mdi-clipboard-list-outline",
          link: "/activities"
        }
      ],
      color: "#c43926",
      right: false,
      miniVariant: false,
      expandOnHover: true,
      background: false
    };
  },
  created() {
    var id = this;
    if (firebase.auth().currentUser) {
      this.isLoggined = true;
      this.currentUser = firebase.auth().currentUser.email;
      this.user = this.currentUser;
      db.collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.data().email == firebase.auth().currentUser.email) {
              id.deptID = doc.data().dept_id;
              console.log("name", doc.data().name);
              id.username = doc.data().name;
              console.log(id.deptID);
              if (id.deptID == 10 || parseInt(id.deptID) == 10) {
                console.log("OK, You're an admin!");
                id.link = "/AdminDashboard";
              } else if (id.deptID == 14 || parseInt(id.deptID) == 14) {
                console.log("OK, You're a dean");
                id.link = "/DeanDashboard";
              } else {
                console.log("OK, You're regular member");
                id.link = "/RegularDashboard";
              }
            }
          });
        });
    }
  },
  methods: {
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
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
      console.log("Logout");
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>

<style>
#adminBT {
  background-image: linear-gradient(
    to right,
    #f46b45 0%,
    #eea849 51%,
    #f46b45 100%
  );
}
</style>

<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Email</th>
          <th class="text-left">ฝ่าย/สาขา</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.email">
          <td>{{ item.email }}</td>
          <td>{{ item.dept_id }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import firebase from "firebase";
import {db} from '../main';

  export default {
    name: "MembersManagement",
    data () {
      return {
        users: [
         
        ],
        departments:[

        ]
      }
    },
    created(){
        db.collection('users').onSnapshot(res=>
        {
            const changes = res.docChanges();
            changes.forEach(change=>
            {
                if(change.type === 'added'){
                    this.users.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                }
            })
        })
        db.collection('departments').onSnapshot(res=>
        {
            const changes = res.docChanges();
            changes.forEach(change=>
            {
                this.departments.push({
                    dept_id: change.doc.id,
                    ...change.doc.data()
                })
            })

        })
    }
  }
</script>
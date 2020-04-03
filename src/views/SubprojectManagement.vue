<template>
  <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="800">
    <v-container style="height: 1500px;">
      <v-dialog v-model="dialog_edit" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">แก้ไขโครงการ</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.project_name"
                    label="ชื่อโครงการ"
                    required
                  ></v-text-field>
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
                  <v-text-field
                    v-model="editedItem.indicator"
                    label="ตัวชี้วัด"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.target"
                    label="ค่าเป้าหมาย"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.person_in_charge"
                    label="ผู้รับผิดชอบ"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.note"
                    label="หมายเหตุ"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.result"
                    label="ผลการดำเนินงาน"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.result_description"
                    label="รายละเอียดผลการดำเนินงาน"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.problems"
                    label="ปัญหาอุปสรรค"
                    type="text"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="editedItem.isFinish"
                    :label="'สถานะการดำเนินการ'"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_edit = false"
              >Close</v-btn
            >
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
                  <v-text-field
                    v-model="edited_subItem.sub_name"
                    label="ชื่อโครงการย่อย"
                    required
                  ></v-text-field>
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
                  <v-text-field
                    v-model="edited_subItem.indicator"
                    label="ตัวชี้วัด"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.target"
                    label="ค่าเป้าหมาย"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.person_in_charge"
                    label="ผู้รับผิดชอบ"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.budget"
                    label="งบประมาณ"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.note"
                    label="หมายเหตุ"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.result"
                    label="ผลการดำเนินงาน"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.result_description"
                    label="รายละเอียดผลการดำเนินงาน"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="edited_subItem.problems"
                    label="ปัญหาอุปสรรค"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="edited_subItem.isFinish"
                    :label="'สถานะการดำเนินการ'"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog_edit_sub = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="save_sub">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog_view" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editedItem.project_name }}</span>
          </v-card-title>
          <v-card-text>
            <p>ประเด็นยุทธ์ศาสตร์: {{ editedItem.si_id }}</p>
            <p>ยุทธ์ศาสตร์: {{ editedItem.s_id }}</p>
            <p>กลยุทธ์: {{ editedItem.t_id }}</p>
            <p>ตัวชี้วัด: {{ editedItem.indicator }}</p>
            <p>ค่าเป้าหมาย: {{ editedItem.target }}</p>
            <p>ผู้รับผิดชอบ: {{ editedItem.person_in_charge }}</p>
            <p>งบประมาณตามแผน: {{ editedItem.budget }}</p>
            <p>คงเหลือตามแผน: {{ editedItem.budget_remain }}</p>
            <p>โอนเข้า: {{ editedItem.deposit }}</p>
            <p>โอนออก: {{ editedItem.withdraw }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog_view = false"
              >Close</v-btn
            >
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
            <v-toolbar-title
              >โครงการที่กำลังดำเนินการอยู่ (โครงการหลัก)</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <div class="my-2">
              <v-dialog v-model="dialog_deposit" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn rounded color="warning" dark v-on="on"
                    >โอนออกระหว่างโครงการหลัก
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

                        <v-col cols="12">
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
                          <v-text-field
                            label="จำนวนเงินที่ต้องการโอน (บาท)"
                            v-model="deposit_amount"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialog_deposit = false"
                      >ยกเลิก</v-btn
                    >
                    <v-btn color="success" text @click="deposit_budget"
                      >ทำรายการ</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)">
            mdi-file-find
          </v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
      <br />
      <br />

      <h5>โครงการย่อย</h5>
      <v-row justify="end">
        <v-col cols="1" md="1">
          <v-dialog v-model="dialog_addsubproject" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="success" class="col-auto" dark v-on="on"
                >เพิ่มโครงการย่อย</v-btn
              >
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
                      <v-text-field
                        v-model="add_sub_name"
                        label="ชื่อโครงการย่อย"
                        required
                      ></v-text-field>
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
                      <v-text-field
                        v-model="add_indicator"
                        label="ตัวชี้วัด"
                        type="text"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="add_target"
                        label="ค่าเป้าหมาย"
                        type="text"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="add_person_in_charge"
                        label="ผู้รับผิดชอบ"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-if="add_project_id != null"
                        v-model="add_project_id[2]"
                        label="จำนวนเงินคงเหลือในโครงการหลัก (บาท)"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="add_budget"
                        label="งบประมาณ"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="add_note"
                        label="หมายเหตุ"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="add_result"
                        label="ผลการดำเนินงาน"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="add_result_description"
                        label="รายละเอียดผลการดำเนินงาน"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="add_problems"
                        label="ปัญหาอุปสรรค"
                        type="text"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-checkbox
                        v-model="add_isFinish"
                        :label="'สถานะการดำเนินการ'"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger" text @click="dialog_addsubproject = false"
                  >ปิด</v-btn
                >
                <v-btn color="success" text @click="add_subproject"
                  >เพิ่ม</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="1" md="1">
          <v-dialog v-model="dialog_expense" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="amber lighten-1" dark v-on="on">ขออนุมัติใช้</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">ขออนุมัติใช้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="expense_project_id"
                        :items="projects"
                        label="โครงการหลัก"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-if="subprojects_selected.length !== 0"
                        v-model="expense_sub_project_id"
                        :items="subprojects_selected"
                        label="โครงการย่อย"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="expense_amount"
                        label="จำนวนเงิน (บาท)"
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="expense_description"
                        label="คำอธิบาย"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger" text @click="dialog_expense = false"
                  >ปิด</v-btn
                >
                <v-btn color="success" text @click="expense_subproject"
                  >เพิ่ม</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="1" md="1">
          <v-dialog v-model="dialog_disburse" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="red lighten-2" dark v-on="on">เบิกจ่าย</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">เบิกจ่าย</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="expense_project_id"
                        :items="projects"
                        label="โครงการหลัก"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-if="subprojects_selected.length !== 0"
                        v-model="disburse_sub_project_id"
                        :items="subprojects_selected"
                        label="โครงการย่อย"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="disburse_amount"
                        label="จำนวนเงิน (บาท)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="disburse_description"
                        label="คำอธิบาย"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger" text @click="dialog_disburse = false"
                  >ปิด</v-btn
                >
                <v-btn color="success" text @click="disburse_subproject"
                  >เพิ่ม</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="1" md="1"> </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="1" md="2">
          <v-dialog v-model="dialog_deposit_sub" persistent max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="light-blue darken-3" dark v-on="on"
                >โอนเงินระหว่างโครงการย่อย</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline"
                  >โอนเงินระหว่างโครงการย่อย (ภายใต้โครงการหลักเดียวกัน)</span
                >
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="selected_deposit_mainproject"
                        :items="projects"
                        label="โครงการหลัก"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="selected_deposit_subproject_from"
                        :items="subproject_deposit_finish"
                        label="จากโครงการ"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="selected_deposit_subproject_to"
                        :items="subproject_deposit_unfinish"
                        label="ไปยัง"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-if="selected_deposit_subproject_from != null"
                        v-model="selected_deposit_subproject_from[1]"
                        label="จำนวนเงินที่สามารถโอนได้"
                        type="number"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="deposit_sub_amount"
                        label="จำนวนเงิน (บาท)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="deposit_description"
                        label="คำอธิบาย"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger" text @click="dialog_deposit_sub = false"
                  >ปิด</v-btn
                >
                <v-btn color="success" text @click="deposit_budget_subproject"
                  >โอน</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="1" md="2">
          <v-dialog
            v-model="dialog_deposit_submain"
            persistent
            max-width="800px"
          >
            <template v-slot:activator="{ on }">
              <v-btn color="deep-purple darken-1" dark v-on="on"
                >โอนเงินเข้าโครงการย่อย</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline"
                  >โอนเงินจากโครงการหลักเข้าโครงการย่อย</span
                >
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="selected_deposit_mainsub"
                        :items="finish_projects"
                        label="จากโครงการ"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="selected_deposit_submain_to"
                        :items="submain_deposit_unfinish"
                        label="ไปโครงการ"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-if="selected_deposit_mainsub != null"
                        v-model="selected_deposit_mainsub[1]"
                        label="จำนวนเงินที่สามารถโอนได้"
                        type="number"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="deposit_amount"
                        label="จำนวนเงิน (บาท)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="deposit_description"
                        label="คำอธิบาย"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="danger"
                  text
                  @click="dialog_deposit_submain = false"
                  >ปิด</v-btn
                >
                <v-btn color="success" text @click="deposit_budget_submain"
                  >โอน</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-select
        v-model.lazy="enabled"
        :items="projects"
        label="เลือกโครงการหลัก"
        clearable
      ></v-select>

      <v-data-table
        :headers="headers_sub"
        :items="items"
        :search="search"
        hide-default-footer
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)">
            mdi-file-find
          </v-icon>
          <v-icon small class="mr-2" @click="edit_subItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="delete_subItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.isFinish="{ item }">
          <v-icon v-if="item.isFinish === false" small class="mr-2"
            >mdi-autorenew</v-icon
          >
          <v-icon v-if="item.isFinish === true" small class="mr-2"
            >mdi-check-circle</v-icon
          >
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
  name: "RegularDashboard",

  data() {
    return {
      user_name: "",
      user_email: "",
      user_department: "",
      add_project_id: null,
      add_sub_name: "",
      add_si_id: "",
      add_s_id: "",
      add_t_id: "",
      add_indicator: "",
      add_target: "",
      add_person_in_charge: "",
      add_budget: null,
      add_budget_remain: null,
      add_note: "",
      add_result: "",
      add_result_description: "",
      add_problems: "",
      add_isFinish: null,
      sub_project_doc: "",
      enabled: null,
      deptID: null,
      sub_project: [],
      finish_projects: [],
      finish_subprojects: [],
      selected_finish_project: [],
      submain_deposit_unfinish: [],
      deposit_sub_amount: null,
      deposit_description: null,
      deposit_amount: null,
      search: null,
      dialog_edit: false,
      dialog_edit_sub: false,
      dialog_view: false,
      dialog_addsubproject: false,
      dialog_deposit: false,
      dialog_deposit_sub: false,
      dialog_expense: false,
      dialog_disburse: false,
      dialog_deposit_submain: false,
      expense_sub_project_id: null,
      disburse_sub_project_id: null,
      subprojects_selected: [],
      selected_deposit_project: null,
      subproject_deposit_unfinish: [],
      subproject_deposit_finish: [],
      deposit_subproject_finish_amount: null,
      selected_deposit_mainproject: null,
      selected_deposit_mainsub: null,
      selected_deposit_submain_to: null,

      selected_deposit_subproject_from: null,
      selected_deposit_subproject_to: null,
      editedIndex: -1,
      isLoggedin: false,
      expense_amount: null,
      expense_description: "",
      disburse_amount: null,
      disburse_description: "",

      expanded: {},
      singleExpand: false,
      editedItem: {
        project_name: "",
        si_id: null,
        s_id: null,
        t_id: null,
        indicator: "",
        target: "",
        person_in_charge: "",
        note: "",
        result: "",
        result_description: "",
        problems: "",
        isFinish: null
      },
      edited_subItem: {
        sub_name: "",
        si_id: null,
        s_id: null,
        t_id: null,
        indicator: "",
        target: "",
        person_in_charge: "",
        note: "",
        result: "",
        result_description: "",
        problems: "",
        isFinish: null,
        budget: null,
        budget_remain: null
      },
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
        { text: "โอนเข้า", value: "deposit" },
        { text: "โอนออก", value: "withdraw" },
        { text: "คงเหลือตามแผน", value: "budget_remain" },
        { text: "ขออนุมัติใช้", value: "expense_amount" },
        { text: "คงเหลือจากหลักการ", value: "expense_remain" },
        { text: "เบิกจ่าย", value: "disburse_amount" },
        { text: "คงเหลือจากเบิกจ่าย", value: "disburse_remain" },
        { text: "รายละเอียด", value: "action", sortable: false }
        // {text: 'สถานะ' , value: 'isFinish'}
      ],
      headers_sub: [
        {
          text: "ชื่อโครงการย่อย",
          align: "start",
          sortable: false,
          value: "sub_name"
        },
        { text: "ประเด็นยุทธ์ศาสตร์", value: "si_id" },
        { text: "ยุทธศาสตร์", value: "s_id" },
        { text: "กลยุทธ์", value: "t_id" },
        { text: "ผู้รับผิดชอบ", value: "person_in_charge" },
        { text: "งบประมาณ", value: "budget" },
        { text: "โอนเข้า", value: "deposit" },
        { text: "โอนออก", value: "withdraw" },
        { text: "คงเหลือตามแผน", value: "budget_remain" },
        { text: "ขออนุมัติใช้", value: "expense_amount" },
        { text: "คงเหลือจากหลักการ", value: "expense_remain" },
        { text: "เบิกจ่าย", value: "disburse_amount" },
        { text: "คงเหลือจากเบิกจ่าย", value: "disburse_remain" },
        { text: "รายละเอียด", value: "action", sortable: false },
        { text: "สถานะ", value: "isFinish" }
      ],

      projects: [],
      strategicissues: [],
      strategic: [],
      tactics: [],
      expense_project_id: null
    };
  },
  computed: {},
  watch: {
    enabled() {
      // this.items = this.projects
      var main = this.enabled[0];
      function getSub(item) {
        let sub = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        console.log(sub.project_id);
        if (sub.project_id == main) {
          return sub;
        }
      }
      var list = this.sub_project.filter(getSub);
      this.items = list;
    },
    expense_project_id() {
      var main = this.expense_project_id[0];
      function isEmpty(obj) {
        return false;
      }
      console.log("show main ", main);
      function get(item) {
        let sub = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        let selected = { text: "", value: "" };
        if (sub.project_id == main && sub.isFinish == false) {
          selected.text = sub.sub_name;
          selected.value = sub.id;
          return selected;
        } else if (isEmpty(selected)) {
          //
        }
      }
      var list = this.sub_project.filter(get);
      console.log(list.length);
      this.subprojects_selected = list;
    },
    expense_sub_project_id() {
      var main = this.expense_sub_project_id;
      console.log("subproject selected to expense : ", main[1]);
    },
    disburse_sub_project_id() {
      var main = this.disburse_sub_project_id;
      console.log("subproject selected to expense : ", main[1]);
    },

    // โอนระหว่างโครงการย่อย
    selected_deposit_mainproject() {
      var main = this.selected_deposit_mainproject[0];
      console.log("hello main", main);
      function isEmpty(obj) {
        return false;
      }
      function getunfinish(item) {
        let sub = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        let selected = { text: "", value: "" };
        if (sub.project_id == main && sub.isFinish == false) {
          console.log("sub");
          selected.text = sub.sub_name;
          selected.value = sub.id;
          return selected;
        } else if (isEmpty(selected)) {
          //
        }
      }
      var tolist = this.sub_project.filter(getunfinish);
      this.subproject_deposit_unfinish = tolist;
      function getfinish(item) {
        let sub = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        let selected = { text: "", value: "" };
        if (sub.project_id == main && sub.isFinish == true) {
          console.log("sub");
          selected.text = sub.sub_name;
          selected.value = sub.id;
          return selected;
        } else if (isEmpty(selected)) {
          //
        }
      }
      var fromlist = this.sub_project.filter(getfinish);
      this.subproject_deposit_finish = fromlist;
    },

    selected_deposit_mainsub() {
      function getunfinishsub(item) {
        let sub = Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value])
        );
        let selected = { text: "", value: "" };
        if (sub.isFinish == false) {
          selected.text = sub.sub_name;
          selected.value = sub.id;
          return selected;
        }
      }
      var tosublist = this.sub_project.filter(getunfinishsub);
      this.submain_deposit_unfinish = tosublist;
    }
  },
  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog_edit = true;
    },
    edit_subItem(item) {
      this.edited_subItem = Object.assign({}, item);
      this.dialog_edit_sub = true;
    },
    viewItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog_view = true;
    },
    delete_subItem(item) {
      const index = this.sub_project.indexOf(item);
      console.log("delete sub", item.id);
      confirm("ต้องการลบโครงการย่อยนี้ใช่ไหม?") &&
        this.sub_project.splice(index, 1) &&
        db
          .collection(this.sub_project_doc)
          .doc(item.id)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      db.collection("action_activities")
        .add({
          type: "delete",
          time: firebase.firestore.FieldValue.serverTimestamp(),
          user_name: this.user_name,
          user_email: this.user_email,
          user_department: this.user_department,
          sub_name: item.sub_name
        })
        .then(function(docRef) {
          console.log("deleting sub-project log written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error delet Log sub project: ", error);
        });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem);
        console.log("save : ", this.editedItem.id);
      } else {
        var item = this.editedItem;
        db.collection("projects")
          .doc(item.id)
          .update({
            project_name: item.project_name,
            si_id: item.si_id,
            s_id: item.s_id,
            t_id: item.t_id,
            person_in_charge: item.person_in_charge,
            indicator: item.indicator,
            target: item.target,
            note: item.note,
            result: item.result,
            result_description: item.result_description,
            problems: item.problems,
            isFinish: item.isFinish
          })
          .then(function() {
            console.log("edit: ", item.id);
          });
      }
      this.dialog_edit = false;
    },
    isEnabled(slot) {
      return this.enabled === slot;
    },
    close() {
      this.dialog_edit = false;
    },
    save_sub() {
      if (this.editedIndex > -1) {
        Object.assign(this.sub_project[this.editedIndex], this.edited_subItem);
        console.log("save : ", this.edited_subItem.id);
      } else {
        var item = this.edited_subItem;
        db.collection(this.sub_project_doc)
          .doc(item.id)
          .update({
            sub_name: item.sub_name,
            si_id: item.si_id,
            s_id: item.s_id,
            t_id: item.t_id,
            indicator: item.indicator,
            person_in_charge: item.person_in_charge,
            target: item.target,
            note: item.note,
            result: item.result,
            result_description: item.result_description,
            problems: item.problems,
            isFinish: item.isFinish,
            budget: parseInt(item.budget),
            budget_remain: parseInt(item.budget),
            expense_remain: parseInt(item.budget),
            disburse_remain: parseInt(item.budget)
          })
          .then(function() {
            console.log("edit: ", item.id);
          });
      }
      this.dialog_edit_sub = false;
    },
    add_subproject() {
      var is = this.add_isFinish;
      if (is == null) {
        this.add_isFinish = false;
      }

      db.collection(this.sub_project_doc)
        .add({
          sub_name: this.add_sub_name,
          si_id: this.add_si_id,
          s_id: this.add_s_id,
          t_id: this.add_t_id,
          indicator: this.add_indicator,
          person_in_charge: this.add_person_in_charge,
          target: this.add_target,
          note: this.add_note,
          result: this.add_result,
          result_description: this.add_result_description,
          problems: this.add_problems,
          isFinish: this.add_isFinish,
          budget: parseInt(this.add_budget),
          budget_remain: parseInt(this.add_budget),
          project_id: this.add_project_id[0],
          disburse_amount: 0,
          disburse_remain: parseInt(this.add_budget),
          expense_amount: 0,
          expense_remain: parseInt(this.add_budget),
          withdraw: 0,
          deposit: 0
        })
        .then(function(docRef) {
          console.log("เพิ่มโครงการย่อย ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      db.collection("action_activities")
        .add({
          type: "add",
          time: firebase.firestore.FieldValue.serverTimestamp(),
          user_name: this.user_name,
          user_email: this.user_email,
          user_department: this.user_department,
          sub_name: this.add_sub_name,
          project_name: this.add_project_id[1]
        })
        .then(function(docRef) {
          console.log("sub-project log written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding Log sub project: ", error);
        });
      this.dialog_addsubproject = false;
    },
    expense_subproject() {
      // เก็บรายการขออนุมัติใช้ย่อย
      if (this.expense_sub_project_id !== null) {
        db.collection("sub_transaction_activities")
          .add({
            amount: parseInt(this.expense_amount),
            type: "expense",
            time: firebase.firestore.FieldValue.serverTimestamp(),
            user_name: this.user_name,
            user_email: this.user_email,
            user_department: this.user_department,
            sub_name: this.expense_sub_project_id[1],
            description: this.expense_description
          })
          .then(function(docRef) {
            console.log("sub-transaction log written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding Log sub transaction: ", error);
          });
      }
      // เก็บรายการขออนุมัติใหญ่
      if (this.expense_sub_project_id === null) {
        db.collection("sub_transaction_activities")
          .add({
            amount: parseInt(this.expense_amount),
            type: "expenseMain",
            time: firebase.firestore.FieldValue.serverTimestamp(),
            user_name: this.user_name,
            user_email: this.user_email,
            user_department: this.user_department,
            project_name: this.expense_project_id[1],
            description: this.expense_description
          })
          .then(function(docRef) {
            console.log("sub-transaction log written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding Log sub transaction: ", error);
          });
      }
      // ขออนุมัติใช้สำหรับโครงการใหญ่ไม่มีย่อย
      if (this.expense_sub_project_id === null) {
        db.collection("projects")
          .doc(this.expense_project_id[0])
          .update({
            expense_remain: firebase.firestore.FieldValue.increment(
              -parseInt(this.expense_amount)
            ),
            expense_amount: firebase.firestore.FieldValue.increment(
              parseInt(this.expense_amount)
            )
          });
        console.log(
          "Amount expense for main : ",
          this.expense_amount,
          "id : ",
          this.expense_project_id[0]
        );
        this.dialog_expense = false;
        // ขออนุมัติใช้สำหรับโครงการย่อย
      } else {
        db.collection("projects")
          .doc(this.expense_project_id[0])
          .update({
            expense_remain: firebase.firestore.FieldValue.increment(
              -parseInt(this.expense_amount)
            ),
            expense_amount: firebase.firestore.FieldValue.increment(
              parseInt(this.expense_amount)
            )
          });
        db.collection(this.sub_project_doc)
          .doc(this.expense_sub_project_id[0])
          .update({
            expense_remain: firebase.firestore.FieldValue.increment(
              -parseInt(this.expense_amount)
            ),
            expense_amount: firebase.firestore.FieldValue.increment(
              parseInt(this.expense_amount)
            )
          });
        console.log(
          "Amount expense for sub : ",
          this.expense_amount,
          "id : ",
          this.expense_sub_project_id[0]
        );
        this.dialog_expense = false;
      }
    },
    disburse_subproject() {
      // ประวัติการทำรายของโครงการย่อย
      if (this.disburse_sub_project_id == null) {
        db.collection("sub_transaction_activities")
          .add({
            amount: parseInt(this.disburse_amount),
            type: "disburseMain",
            time: firebase.firestore.FieldValue.serverTimestamp(),
            user_name: this.user_name,
            user_email: this.user_email,
            user_department: this.user_department,
            project_name: this.expense_project_id[1],
            description: this.disburse_description
          })
          .then(function(docRef) {
            console.log("sub-transaction log written with ID: ", docRef.id);
          });
        // ประวัติการทำรายของโครงการย่อย
      } else if (this.disburse_sub_project_id != null) {
        db.collection("sub_transaction_activities")
          .add({
            amount: parseInt(this.disburse_amount),
            type: "disburse",
            time: firebase.firestore.FieldValue.serverTimestamp(),
            user_name: this.user_name,
            user_email: this.user_email,
            user_department: this.user_department,
            sub_name: this.disburse_sub_project_id[1],
            description: this.disburse_description
          })
          .then(function(docRef) {
            console.log("sub-transaction log written with ID: ", docRef.id);
          });
      }

      // เบิกจ่ายหลัก
      if (this.disburse_sub_project_id == null) {
        db.collection("projects")
          .doc(this.expense_project_id[0])
          .update({
            disburse_remain: firebase.firestore.FieldValue.increment(
              -parseInt(this.disburse_amount)
            ),
            disburse_amount: firebase.firestore.FieldValue.increment(
              parseInt(this.disburse_amount)
            )
          });
        console.log(
          "Amount disburse for main : ",
          this.disburse_amount,
          "id : ",
          this.expense_project_id[0]
        );
        this.dialog_disburse = false;
        // เบิกจ่ายย่อย
      } else {
        db.collection("projects")
          .doc(this.expense_project_id[0])
          .update({
            disburse_remain: firebase.firestore.FieldValue.increment(
              -parseInt(this.disburse_amount)
            ),
            disburse_amount: firebase.firestore.FieldValue.increment(
              parseInt(this.disburse_amount)
            )
          });
        db.collection(this.sub_project_doc)
          .doc(this.disburse_sub_project_id[0])
          .update({
            disburse_remain: firebase.firestore.FieldValue.increment(
              -parseInt(this.disburse_amount)
            ),
            disburse_amount: firebase.firestore.FieldValue.increment(
              parseInt(this.disburse_amount)
            )
          });
        console.log(
          "Amount disburse for subproject : ",
          this.disburse_amount,
          "id : ",
          this.disburse_sub_project_id[0]
        );
        this.dialog_disburse = false;
      }
    },

    deposit_budget() {
      console.log("this from", this.selected_finish_project);
      console.log("this to", this.selected_deposit_project[1]);
      console.log("this amount to deposit", this.deposit_amount);
      var deposit_amount = parseInt(this.deposit_amount);
      var finish_project_id = this.selected_finish_project[0];
      var finish_project_budget = this.selected_finish_project[1];
      var finish_project_name = this.selected_finish_project[2];
      var target_project_id = this.selected_deposit_project[0];
      var target_project_name = this.selected_deposit_project[1];
      var subproject_title = this.sub_project_doc;
      var user_name = this.user_name;
      var user_email = this.user_email;
      var user_department = this.user_department;

      var target_project = this.projects.filter(function(project) {
        return project.id == target_project_id;
      });
      //update target project budget
      var mainRef = db.collection("projects").doc(finish_project_id);
      mainRef.get().then(function(doc) {
        if (doc.exists) {
          db.collection("projects")
            .doc(target_project_id)
            .update({
              budget_remain: firebase.firestore.FieldValue.increment(
                deposit_amount
              ),
              deposit: firebase.firestore.FieldValue.increment(deposit_amount),
              expense_remain: firebase.firestore.FieldValue.increment(
                deposit_amount
              ),
              disburse_remain: firebase.firestore.FieldValue.increment(
                deposit_amount
              )
            });
          db.collection("projects")
            .doc(finish_project_id)
            .update({
              disburse_remain: firebase.firestore.FieldValue.increment(
                -deposit_amount
              ),
              withdraw: firebase.firestore.FieldValue.increment(deposit_amount)
            });
        } else {
          console.log("this from project is sub project");
        }
        db.collection("old_transaction_activities")
          .add({
            time: firebase.firestore.FieldValue.serverTimestamp(),
            user_name: user_name,
            type: "oldMain",
            user_email: user_email,
            user_department: user_department,
            from_project: finish_project_name,
            to_project: target_project_name,
            amount: parseInt(deposit_amount)
          })
          .then(function(docRef) {
            console.log(
              "depositing between projects log written with ID: ",
              docRef.id
            );
          })
          .catch(function(error) {
            console.error("Error depositing Log: ", error);
          });
      });
      this.dialog_deposit = false;
    },
    deposit_budget_subproject() {
      console.log("main", this.selected_deposit_mainproject);
      console.log("from: ", this.selected_deposit_subproject_from);
      console.log("to: ", this.selected_deposit_subproject_to);
      console.log("amount: ", this.deposit_sub_amount);
      var sub_doc = this.sub_project_doc;
      var user_email = this.user_email;
      var deposit_description = this.deposit_description;
      var user_name = this.user_name;
      var user_department = this.user_department;
      var main = this.selected_deposit_mainproject;
      var from = this.selected_deposit_subproject_from;
      var to = this.selected_deposit_subproject_to;
      var amount = parseInt(this.deposit_sub_amount);

      //update from
      db.collection(sub_doc)
        .doc(from[0])
        .update({
          disburse_remain: firebase.firestore.FieldValue.increment(-amount),
          budget_remain: firebase.firestore.FieldValue.increment(-amount),
          expense_remain: firebase.firestore.FieldValue.increment(-amount),
          withdraw: firebase.firestore.FieldValue.increment(amount)
        });
      //update to
      db.collection(sub_doc)
        .doc(to[0])
        .update({
          budget_remain: firebase.firestore.FieldValue.increment(amount),
          deposit: firebase.firestore.FieldValue.increment(amount),
          expense_remain: firebase.firestore.FieldValue.increment(amount),
          disburse_remain: firebase.firestore.FieldValue.increment(amount)
        });
      // update main project
      db.collection("projects")
        .doc(main[0])
        .update({
          withdraw: firebase.firestore.FieldValue.increment(amount),
          deposit: firebase.firestore.FieldValue.increment(amount)
        });
      db.collection("old_transaction_activities")
        .add({
          time: firebase.firestore.FieldValue.serverTimestamp(),
          user_name: user_name,
          type: "oldSub",
          user_email: user_email,
          user_department: user_department,
          project_name: main[2],
          from_project: from[2],
          to_project: to[1],
          amount: parseInt(amount),
          description: deposit_description
        })
        .then(function(docRef) {
          console.log(
            "depositing between sub projects log written with ID: ",
            docRef.id
          );
        })
        .catch(function(error) {
          console.error("Error depositing Log: ", error);
        });
    },
    deposit_budget_submain() {
      var main = this.selected_deposit_mainsub;
      var to = this.selected_deposit_submain_to;
      var amount = parseInt(this.deposit_amount);
      var desp = this.deposit_description;
      var sub_doc = this.sub_project_doc;
      var subRef = db.collection(sub_doc).doc(to[0]);
      var user_email = this.user_email;
      var deposit_description = this.deposit_description;
      var user_name = this.user_name;
      var user_department = this.user_department;
      // update from
      db.collection("projects")
        .doc(main[0])
        .update({
          withdraw: firebase.firestore.FieldValue.increment(amount),
          budget_remain: firebase.firestore.FieldValue.increment(-amount),
          expense_remain: firebase.firestore.FieldValue.increment(-amount),
          disburse_remain: firebase.firestore.FieldValue.increment(-amount)
        });
      // update to
      db.collection(sub_doc)
        .doc(to[0])
        .update({
          deposit: firebase.firestore.FieldValue.increment(amount),
          budget_remain: firebase.firestore.FieldValue.increment(amount),
          expense_remain: firebase.firestore.FieldValue.increment(amount),
          disburse_remain: firebase.firestore.FieldValue.increment(amount)
        });
      // update to (main project)
      subRef.get().then(function(doc) {
        if (doc.exists) {
          var project_id = doc.data().project_id;
          db.collection("projects")
            .doc(project_id)
            .update({
              deposit: firebase.firestore.FieldValue.increment(amount),
              budget_remain: firebase.firestore.FieldValue.increment(amount),
              expense_remain: firebase.firestore.FieldValue.increment(amount),
              disburse_remain: firebase.firestore.FieldValue.increment(amount)
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      db.collection("old_transaction_activities")
        .add({
          time: firebase.firestore.FieldValue.serverTimestamp(),
          user_name: user_name,
          type: "oldsubmain",
          user_email: user_email,
          user_department: user_department,
          from_project: main[2],
          to_project: to[2],
          amount: parseInt(amount),
          description: deposit_description
        })
        .then(function(docRef) {
          console.log(
            "depositing between sub and main log written with ID: ",
            docRef.id
          );
        })
        .catch(function(error) {
          console.error("Error depositing Log: ", error);
        });
    }
  },
  mounted() {
    var id = this;
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggined = true;
      this.currentUser = firebase.auth().currentUser.email;
      this.user = this.currentUser;
      console.log(this.currentUser);

      db.collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().email == this.user) {
              this.deptID = doc.data().dept_id;
              this.user_name = doc.data().name;
              this.user_email = doc.data().email;
              this.user_department = doc.data().deptname;
              if (this.deptID == 0 || parseInt(this.deptID) == 0) {
                console.log("EE");
                this.sub_project_doc = "ee_subproject";
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("ee_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 1 || parseInt(this.deptID) == 1) {
                console.log("CE");
                this.sub_project_doc = "ce_subproject";
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("ce_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 2 || parseInt(this.deptID) == 2) {
                console.log("AE");
                this.sub_project_doc = "ae_subproject";
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("ae_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 3 || parseInt(this.deptID) == 3) {
                this.sub_project_doc = "ie_subproject";

                console.log("IE");
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("ie_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 4 || parseInt(this.deptID) == 4) {
                this.sub_project_doc = "me_subproject";

                console.log("ME");
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("me_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 5 || parseInt(this.deptID) == 5) {
                this.sub_project_doc = "env_subproject";

                console.log("ENVI");
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("env_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 6 || parseInt(this.deptID) == 6) {
                this.sub_project_doc = "che_subproject";

                console.log("CHEM");
                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("che_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              } else if (this.deptID == 7 || parseInt(this.deptID) == 7) {
                console.log("COE");
                this.sub_project_doc = "coe_subproject";

                db.collection("projects")
                  .get()
                  .then(querySnapshot => {
                    //  console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                      // this.pp.push(doc.data())
                      if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == false
                      ) {
                        var main_id = doc.id;
                        this.projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().project_name,
                            doc.data().disburse_remain
                          ]
                        });
                      } else if (
                        parseInt(doc.data().dept_id) == this.deptID &&
                        doc.data().isFinish == true
                      ) {
                        this.finish_projects.push({
                          ...doc.data(),
                          id: doc.id,
                          text: doc.data().project_name,
                          value: [
                            doc.id,
                            doc.data().disburse_remain,
                            doc.data().project_name
                          ]
                        });
                      }
                    });
                  });
                db.collection("coe_subproject")
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      this.sub_project.push({
                        ...doc.data(),
                        id: doc.id,
                        text: doc.data().sub_name,
                        value: [
                          doc.id,
                          doc.data().disburse_remain,
                          doc.data().sub_name
                        ]
                      });
                    });
                  });
              }
            }
          });
        });
    }

    db.collection("strategicissues")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            value: parseInt(doc.data().si_id),
            text: doc.data().si_id,
            id: doc.id
          };
          this.strategicissues.push(data);
        });
      });
    db.collection("strategic")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            value: parseInt(doc.data().s_id),
            text: doc.data().s_id,
            id: doc.id
          };
          this.strategic.push(data);
        });
      });
    db.collection("tactics")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            value: parseInt(doc.data().t_id),
            text: doc.data().t_id,
            id: doc.id
          };
          this.tactics.push(data);
        });
      });
  }
};
</script>

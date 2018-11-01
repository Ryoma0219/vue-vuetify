<template>
  <v-layout row justify-center>
    <v-dialog v-model="visible" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">新しいタスク</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex>
              <v-text-field label="タイトル" required v-model="titleInput"></v-text-field>
            </v-flex>
            <div>
              <v-text-field label="詳細あれば書いてね!" v-model="contentInput"></v-text-field>
            </div>
            <v-flex>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="expiredDateInput"
                  label="Date"
                ></v-text-field>
                <v-date-picker v-model="expiredDateInput" no-title @input="menu = false"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close()">Close</v-btn>
          <v-btn v-if="insertMode" color="blue darken-1" flat @click.native="save()">Save</v-btn>
          <v-btn v-else color="blue darken-1" flat @click.native="update()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'new-todo',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedTodo: {
      type: Object,
      default: null
    },
    insertMode: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      titleInput: '',
      contentInput: '',
      expiredDateInput: '',
      menu: false
    }
  },
  methods: {
    close () {
      this.clearInput()
      this.$emit('close')
    },
    save () {
      this.$emit('save', {
        title: this.titleInput,
        content: this.contentInput,
        expiredDate: this.expiredDateInput
      })
      this.clearInput()
    },
    update () {
      this.$emit('update', {
        todo_id: this.selectedTodo.todo_id,
        title: this.titleInput,
        content: this.contentInput,
        expiredDate: this.expiredDateInput
      })
    },
    formatDate (date) {
      return date.replace(/-/g, '')
    },
    clearInput () {
      this.titleInput = ''
      this.contentInput = ''
      this.expiredDateInput = ''
    }
  },
  watch: {
    selectedTodo (value) {
      this.titleInput = value.title
      this.contentInput = value.content
      this.expiredDateInput = value.expire_date
    }
  }
}
</script>
<style>
  .v-dialog {
    border-radius: 4px
  }
</style>

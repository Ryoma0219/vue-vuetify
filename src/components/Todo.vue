<template>
  <div id="wrapper">
    <div>todoリスト</div>
    <v-btn round outline color="primary" center dark @click="open()">
      <v-icon>add</v-icon>タスクを追加</v-btn>
    <v-list one-line>
      <div v-for="item in notFinishedTodo" :key="item.todo_id">
        <v-hover>
          <v-list-tile avatar slot-scope="{ hover }" :class="`elevation-${ hover ? 2: 0.1 }`" class="mx-auto">
            <v-list-tile-avatar  style="justify-content:center">
              <v-btn icon color="blue" flat @mouseover="over(item)" @mouseleave="leave(item)">
                <v-icon color="success" v-if="item.icon === 'check'" @click="item.is_finished = '1';updateTitle(item)">check</v-icon>
                <v-icon v-else>radio_button_unchecked</v-icon>
              </v-btn>
            </v-list-tile-avatar>
            <v-text-field flat v-model="item.title" @change="updateTitle(item)"></v-text-field>
            <v-list-tile-action style="justify-content:center">
              <v-btn flat icon color="primary" @click="edit(item.todo_id)"><v-icon>edit</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-hover>
      </div>
    </v-list>
    <br />
    <v-list one-line>
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>完了済み（{{ getFinishedCount }}件）</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="item in finishedTodo"
          :key="item.todo_id"
          no-action>
            <v-list-tile-avatar  style="justify-content:center">
              <v-btn icon flat color="success" @mouseover="over(item)" @mouseleave="leave(item)">
                <v-icon>check</v-icon>
              </v-btn>
            </v-list-tile-avatar>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.content }}</v-list-tile-sub-title>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <new-todo :visible="visible"
              :insertMode="insertMode"
              :selectedTodo="selectedTodo"
              @close="close()"
              @update="update($event)"
              @save="save($event)"
    ></new-todo>
  </div>
</template>

<script>
import NewTodo from './NewTodo'
import $m from 'moment'
export default {
  name: 'landing-page',
  data () {
    return {
      name: '',
      todoList: [
        {
          todo_id: '',
          content: '',
          category_id: '',
          expire_date: '',
          sub_task_ids: [],
          is_finished: '0',
          create_date: '',
          title: ''
        }
      ],
      notifications: false,
      visible: false,
      icon: 'radio_button_unchecked',
      selectedTodo: {},
      insertMode: true,
      apiKey: 'yKcwO4hUh3aEA3HwnH0zL6dapv6ScaJBnQNvLsXg'
    }
  },
  methods: {
    open (link) {
      this.insertMode = true
      this.visible = true
    },
    close () {
      this.visible = false
    },
    edit (key) {
      console.log(key)
      this.selectedTodo = this.todoList.find((item) => {
        return item.todo_id === key
      })
      this.insertMode = false
      this.visible = true
    },
    async getTodo () {
      // ここにhttpリクエスト書く
      // api呼び出し
      this.$http
        .get('https://e7cpy2uxli.execute-api.ap-northeast-1.amazonaws.com/todo-dev', {
          headers: { 'x-api-key': this.apiKey }
        })
        .then(
          response => {
            console.log(response)
            this.todoList = response.data
          })
        .catch(
          err => {
            console.log(err)
            alert('通信に失敗しました。リクエストの上限に達しました。')
          })
    },
    async putTodo (item) {
      this.$http
        .post('https://e7cpy2uxli.execute-api.ap-northeast-1.amazonaws.com/todo-dev', {
          headers: { 'x-api-key': this.apiKey },
          body: item
        })
        .then(
          response => {
            this.getTodo()
          })
        .catch(
          err => {
            console.log(err)
            alert('通信に失敗しました。リクエストの上限に達しました。')
          })
    },
    complete (value) {
      // alert(id)
    },
    save (input) {
      this.visible = false
      let newTodo = {
        todo_id: this.getHashId(),
        content: input.content,
        category_id: '0',
        expire_date: input.expiredDate,
        sub_task_ids: [],
        is_finished: '0',
        create_date: this.getCurrentDate(),
        title: input.title,
        icon: 'radio_button_unchecked'
      }
      // this.todoList.push(newTodo)
      // localStorage.setItem('todo', JSON.stringify(this.todoList))
      this.putTodo(newTodo)
    },
    updateTitle (item) {
      this.putTodo(item)
    },
    update (input) {
      this.visible = false
      var index = this.todoList.findIndex((item) => {
        return item.todo_id === input.todo_id
      })
      this.todoList[index].title = input.title
      this.todoList[index].content = input.content
      this.todoList[index].expire_date = input.expiredDate
      this.todoList[index].icon = 'radio_button_unchecked'
      this.putTodo(this.todoList[index])
    },
    getHashId () {
      let strong = 1000
      console.log(new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16))
      return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
    },
    getCurrentDate () {
      return $m().format('YYYYMMDDHHmmss')
    },
    over (item) {
      item.icon = 'check'
    },
    leave (item) {
      item.icon = 'radio_button_unchecked'
    }
  },
  computed: {
    notFinishedTodo () {
      if (typeof this.todoList !== 'object') {
        return false
      }
      return this.todoList.filter((item) => {
        return item.is_finished === '0'
      })
    },
    finishedTodo () {
      return this.todoList.filter((item) => {
        return item.is_finished === '1'
      })
    },
    getFinishedCount () {
      return this.finishedTodo.length
    }
  },
  mounted () {
    this.getTodo()
  },
  components: {
    NewTodo
  }
}
</script>

<style>
.v-list {
  padding: 0
}
</style>

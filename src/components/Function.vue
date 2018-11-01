<template>
  <div id="wrapper">
    <h3 class="text">Choose Your Function</h3>
    <main>
      <b-link @click="saveFunc('login')">
        <b-card title="Login"
            img-src="https://picsum.photos/600/300/?image=20"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; color: #a0a0a0"
            class="mb-3">
        </b-card>
      </b-link>
      <b-link @click="saveFunc('menu')">
        <b-card title="Menu"
            img-src="https://picsum.photos/600/300/?image=21"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; color: #a0a0a0"
            class="mb-3">
        </b-card>
      </b-link>
      <b-link @click="saveFunc('search')">
        <b-card title="Search"
            img-src="https://picsum.photos/600/300/?image=22"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; color: #a0a0a0"
            class="mb-3">
        </b-card>
      </b-link>
    </main>
    <main>
      <b-link @click="saveFunc('list')">
        <b-card title="List"
            img-src="https://picsum.photos/600/300/?image=23"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; color: #a0a0a0"
            class="mb-3">
        </b-card>
      </b-link>
      <b-link @click="saveFunc('contents')">
        <b-card title="Contents"
            img-src="https://picsum.photos/600/300/?image=24"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; color: #a0a0a0"
            class="mb-3">
        </b-card>
      </b-link>
      <b-link @click="saveFunc('insert')">
        <b-card title="Insert"
            img-src="https://picsum.photos/600/300/?image=26"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; color: #a0a0a0"
            class="mb-3">
        </b-card>
      </b-link>
    </main>
      <div style="text-align: center">
        <b-link to="/">
          <b-button variant="primary">&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;</b-button>
        </b-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'next-page',
  data () {
    return {
      hoshino: this.$store.state.message
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    ryoma () {
      this.$store.commit('setMessage', 'hoshinode-su')
    },
    saveFunc (funcName) {
      this.$router.push('device')
      this.$store.commit('setFunction', funcName)
    }
  }
}
</script>
<style scoped>
.text {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.img-card {
  max-width: 10rem;
  color: #a0a0a0;
}
</style>

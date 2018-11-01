<template>
  <v-layout justify-center>
    <v-flex>
        <v-card>
          <v-container
            fluid
            grid-list-md
          >
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                v-bind="{ [`xs${card.flex}`]: true }"
                :key="card.title"
              >
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${ hover ? 12: 2 }`"
                    class="mx-auto"
                    style="cursor: pointer"
                  >
                    <v-img
                      @click.native="movePage(card.link)"
                      :src="card.src"
                      height="200px"
                    >
                      <v-container
                        fill-height
                        fluid
                        pa-2
                      >
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline white--text" v-text="card.title"></span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon><v-icon>favorite</v-icon></v-btn>
                      <v-btn icon><v-icon>bookmark</v-icon></v-btn>
                      <v-btn icon><v-icon>share</v-icon></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'landing-page',
  data () {
    return {
      hoshino: this.$store.state.message,
      cards: [
        { title: 'Todo List', src: 'https://www.pakutaso.com/shared/img/thumb/iPad0I9A8032_TP_V.jpg', flex: 6, link: 'todo' },
        { title: 'Video', src: 'https://www.pakutaso.com/shared/img/thumb/suisseDSCF9732_TP_V.jpg', flex: 6, link: 'result' },
        { title: '自己紹介', src: 'https://www.pakutaso.com/shared/img/thumb/KAZUKIhgfdrfgh_TP_V.jpg', flex: 6, link: 'device' }
      ]
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    ryoma () {
      this.$store.commit('setMessage', 'hoshinode-su')
    },
    saveDevice (deviceName) {
      this.$router.push('result')
      this.$store.commit('setDevice', deviceName)
    },
    movePage (pageName) {
      this.$router.push(pageName)
    }
  }
}
</script>

<style lang="stylus">
  #keep
    .v-navigation-drawer__border
      display: none
  v-card
    cursor: pointer
</style>

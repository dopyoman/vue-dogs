<template>
  <v-skeleton-loader
          :loading="loading"
          type="card"
  >
    <v-card max-height="800"  class="dog-breeds">
      <v-list>
        <v-subheader>BREADS</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :breed="i"
                  :sub-breeds="item"
          >
            <v-list-item-content>
              <v-list-item-title v-text="i"></v-list-item-title>
            </v-list-item-content>
          </list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-skeleton-loader>

</template>

<script>
    // @ is an alias to /src
    import { mapState, mapActions, mapMutations} from 'vuex'
    import ListItem from "../components/ListItem";

    export default {
        name: 'home',
        components: {ListItem},
        data: () => ({
            item: 1,
        }),
      computed: mapState({
        items: state => state.breeds,
        loading: state => state.loadingData
      }),
      methods: {
          ...mapActions([
                  'getBreads'
          ]),
        ...mapMutations([
                'startLoadingData',
                'stopLoadingData'
        ])
      },
      created() {
          this.startLoadingData();
          this.getBreads().then(() => {
            this.stopLoadingData()
          });
      }
    }
</script>

<style>
    .home {
        padding: 2em;
    }
  .dog-breeds {
    overflow: auto;
    text-transform: capitalize;
  }
</style>

<template>
    <v-list-item :to="breedPath">
        <v-list-item-content>
            <v-list-item-title>{{breed}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
            <div class="sub-breed-chips">
                <v-chip class="chip" v-for="(subBreed, i) in subBreeds"
                        :key=i :color="colorMap(i)">{{subBreed[0]}}</v-chip>
            </div>

        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import {colorMap} from "../utils/ColorMapper";

    export default {
        name: "ListItem",
        props: ['breed', 'subBreeds'],
        methods: {
            colorMap: index => colorMap(index)
        },
        computed: {
            breedPath() {
                return "/breed/" + this.breed
            }
        }
    }
</script>

<style scoped>

    .sub-breed-chips {
        display: flex;
        min-width: 75px;
        max-width: 150px;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .chip {
        margin: 2px;
        min-width: 32px;
        justify-content: center;
    }



</style>

<template>
    <v-card max-width="800">
        <v-img class="white--text align-end"
               height="300px"
               :src="dogImage"
               lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMtxS/DQADWgGUeov3DwAAAABJRU5ErkJggg=="
        >
            <v-btn color="accent"
                   fab
                   dark
                   small
                   top
                   right
                   absolute
            >
                <v-icon>mdi-autorenew</v-icon>
            </v-btn>
            <v-card-title class="breed-detail-title">{{title}}</v-card-title>

        </v-img>

        <v-card-subtitle>Sub Breeds</v-card-subtitle>

        <v-card-text>
            <div class="sub-breed-chips" v-if="subBreeds[breed].length > 0">
                <v-chip class="chip" v-for="(subBreed, i) in subBreeds[breed]"
                        v-on:click="getSubBreed(subBreed)"
                        :key=i :color="colorMap(i)">{{subBreed}}
                </v-chip>
            </div>
            <div v-else>None :(</div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                    color="orange"
                    text
                    v-on:click="getRandomImage"
            >
                Change Image
            </v-btn>

        </v-card-actions>

    </v-card>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import {colorMap} from "../utils/ColorMapper";

    export default {
        name: "BreedDetails",
        props: ['breed'],
        data() {
            return {
                dogImage: '',
                subBreed: '',
            }
        },
        methods: {
            ...mapActions([
                'getDogImages',
                'getSubBreedImages'
            ]),
            ...mapMutations([
                'startLoadingData',
                'stopLoadingData'
            ]),
            colorMap: index => colorMap(index),
            getSubBreed(subBreed) {
                this.startLoadingData();
                const breed = this.breed;
                this.getSubBreedImages({breed, subBreed}).then(() => {
                    this.stopLoadingData()
                    this.subBreed = `${subBreed}-${breed}`;
                    this.dogImage = this.dogImages[this.subBreed][0];
                })
            },
            getRandomImage() {
                const numberOfImages = this.dogImages[this.breedKey].length;
                const randomIndex = Math.floor(Math.random()*numberOfImages);
                this.dogImage = this.dogImages[this.breedKey][randomIndex];
            }
        },
        computed: {
            ...mapState({
                dogImages: state => state.dogImages,
                subBreeds: state => state.breeds
            }),
            title() {
                if (this.subBreed) {
                    return this.subBreed.split('-').join(" ");
                }
                return this.breed;
            },
            breedKey() {
                return this.subBreed ? this.subBreed : this.breed;
            }
        },
        created() {
            this.startLoadingData();
            this.getDogImages(this.breed).then(() => {
                this.stopLoadingData();
                if (!this.dogImages[this.breed]) {
                    this.$route('/');
                }
                this.dogImage = this.dogImages[this.breed][0];
            })
        }
    }
</script>

<style scoped>
    .chip {
        margin: 2px;
    }
    .breed-detail-title {
        text-transform: capitalize;
    }

</style>

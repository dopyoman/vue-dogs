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
                   class="load-new-image-button"
                   v-on:click="getRandomImage"
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

    </v-card>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import {isEmpty} from 'lodash';
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
                'getBreads',
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
                const randomIndex = Math.floor(Math.random() * numberOfImages);
                const newFetchedImage = this.dogImages[this.breedKey][randomIndex];
                if (this.dogImage === newFetchedImage) {
                    this.getRandomImage()
                }
                this.dogImage = newFetchedImage;
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
        async created() {
            this.startLoadingData();

            if (isEmpty(this.subBreed)) {
                console.log('get breeds');
                await this.getBreads()
            }

            await this.getDogImages(this.breed);

            this.dogImage = this.dogImages[this.breed][0];

            this.stopLoadingData()

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

    .load-new-image-button {
        top: 20px !important;
    }

</style>

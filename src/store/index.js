import Vue from 'vue'
import Vuex from 'vuex'
import ky from 'ky';
import {BASE_API} from "./DogApi";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cache: {},
        breeds: {},
        breadsFetched: false,
        dogImages: {},
        loadingData: false,
    },
    mutations: {
        startLoadingData(state) {
            state.loadingData = true;
        },
        stopLoadingData(state) {
            state.loadingData = false;
        },
        setBreedsList(state, breeds) {
            state.breeds = breeds;
            state.breedFetched = true;
        },
        setDogImages(state, {dogImages, breed}) {
            console.log(state.dogImages)
            state.dogImages[breed] = dogImages;
        }
    },
    actions: {
        async getBreads({commit, state}) {
            if (!state.breadsFetched) {
                const dogBreeds = await ky(BASE_API + 'breeds/list/all').json();
                if (dogBreeds.status === "success") {
                    commit('setBreedsList', dogBreeds.message);
                }
            }

        },

        async getDogImages({commit}, breed) {
            const dogPic = await ky(`${BASE_API}breed/${breed}/images`).json();
            if (dogPic.status === 'success') {
                const dogImages = dogPic.message;
                commit('setDogImages', {dogImages, breed});
            }
        },

        async getSubBreedImages({commit}, {breed, subBreed}) {
            const dogPics = await ky(`${BASE_API}breed/${breed}/${subBreed}/images`).json()
            if (dogPics.status === 'success') {
                const dogImages = dogPics.message;
                breed = `${subBreed}-${breed}`;
                commit('setDogImages', {dogImages, breed});
            }
        }
    },
    modules: {}
})

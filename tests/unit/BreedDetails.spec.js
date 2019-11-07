import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import {bulldog} from "./vuexTestState";
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import BreedDetils from '@/views/BreedDetails.vue'

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(VueRouter);

describe('BreedDetails.vue', () => {
    let actions;
    let mutations;
    let store;
    let state = bulldog;

    beforeEach(() => {
        actions = {
            getBreads: jest.fn(),
            getDogImages: jest.fn(),
            getSubBreedImages: jest.fn()
        }
        mutations = {
            startLoadingData: jest.fn(),
            stopLoadingData: jest.fn()
        }
        store = new Vuex.Store({
            actions,
            mutations,
            state
        })

    })

    it('a hoc that renders props.breed details of the dogs', () => {
        const breed = 'bulldog';
        const view = shallowMount(BreedDetils, {
            propsData: {breed},
            store,
            localVue
        });

        expect(view.find('.breed-detail-title').text()).toMatch(breed);
    });

    it('should change images when the update button has been pressed', done => {
        const breed = 'bulldog';

        const view = shallowMount(BreedDetils, {
            propsData: {breed},
            store,
            localVue
        });

        view.vm.$nextTick(() => {
            view.vm.getRandomImage();
            const oldImage = view.vm.dogImage;
            expect(oldImage).toBeTruthy();

            // simulate clicking update button
            view.vm.getRandomImage();
            expect(oldImage).not.toMatch(view.vm.dogImage);
            done()
        })


    })
})

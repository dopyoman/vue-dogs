import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';

import BreedDeatils from '@/views/BreedDetails.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('BreedDetails.vue', () => {
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            getBreads: jest.fn(),
            getDogImages: jest.fn(),
            getSubBreedImages: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    it('a hoc that renders props.breed details of the dogs', () => {
        const breed = 'terrier';
        const view = mount(BreedDeatils, {
            propsData: { breed },
            store,
            localVue
        });

        expect(view.contains('.breed-detail-title', breed));
    })
})

import { shallowMount } from "@vue/test-utils";
import SectionRequestError from "./../../components/SectionRequestError.vue";

const authErrors = {
    name: ["El campo nombre es obligatorio"],
    username: ["El campo usuario es obligatorio"],
    email: ["El campo email es obligatorio"],
    pais_id: ["El campo pais es obligatorio"],
    password: ["El campo password es obligatorio"],
    // agregar has
    has: function (field) {
        return this[field] !== undefined;
    },
    // agregar get
    get: function (field) {
        return this[field][0];
    },
};

// renderizado
describe("SectionRequestError.vue", () => {
    test("Verificar que el componente se renderice", () => {
        const wrapper = shallowMount(SectionRequestError, {
            propsData: { authErrors },
        });
        expect(wrapper.exists()).toBe(true);
    });
});

// verificar clases
describe("SectionRequestError.vue", () => {
    test("Verificar que el componente tenga la clase alert", () => {
        const wrapper = shallowMount(SectionRequestError, {
            propsData: { authErrors },
        });
        expect(wrapper.classes("alert")).toBe(true);
    });
});

// verificar texto
describe("SectionRequestError.vue", () => {
    test("Verificar que el componente tenga el texto 'El campo nombre es obligatorio'", () => {
        const wrapper = shallowMount(SectionRequestError, {
            propsData: { authErrors },
        });
        expect(wrapper.text()).toContain("El campo nombre es obligatorio");
    });
});

// devolver un true o false si el componente no tiene hasErrors
describe("SectionRequestError.vue", () => {
    test("Verificar que el componente no tenga hasErrors", () => {
        const wrapper = shallowMount(SectionRequestError, {
            propsData: { authErrors },
        });
        expect(wrapper.vm.hasErrors).toBe(true);
    });
});

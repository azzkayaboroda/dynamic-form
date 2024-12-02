<template>
    <div>
        <h1 v-if="formData">{{ formData.title }}</h1>
        <form v-if="formData" @submit.prevent="onSubmit">
            <component v-for="control in filteredControls" :is="resolveComponent(control.control)" :key="control.id" v-bind="control" :value="formValues[control.id]" @update="updateControlValue" @reset="onReset"></component>
            <div v-if="errors.length" class="errors">
                <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FormJSON, Control } from '@/types/FormTypes'; // Импорт типа
import formDataJson from '@/mock/form.json'; // Импорт JSON
import TextInput from '@/components/TextInput.vue';
import ButtonControl from '@/components/ButtonControl.vue';
import LabelControl from '@/components/LabelControl.vue';
import SelectInput from '@/components/SelectInput.vue';
import RadioInput from '@/components/RadioInput.vue';
import CheckboxInput from '@/components/CheckboxInput.vue';

export default Vue.extend({
    data() {
        return {
            formData:  formDataJson as FormJSON | null,
            errors: [] as string[],
            formValues: {} as Record<string, any>
        };
    },
    computed: {
    filteredControls(): Control[] {
      return this.formData?.controls.filter((control) => this.isControlVisible(control)) || [];
    },
  },
    created() {
        try {
            const response = require('@/mock/form.json');
            this.formData = response.default || response;
            this.loadFormFromStorage();
            console.log('Form Data Loaded:', this.formData);
        } catch (error) {
            console.error('Ошибка загрузки JSON:', error);
        }
    },
    methods: {
        resolveComponent(controlType: string) {
            const components: Record<string, any> = {
                TEXT: TextInput,
                SELECT: SelectInput,
                RADIO: RadioInput,
                CHECKBOX: CheckboxInput,
                BUTTON: ButtonControl,
                LABEL: LabelControl
            };
            return components[controlType] || 'div';
        },
        updateControlValue(id: string, value: string) {
            this.$set(this.formValues, id, value);
            this.saveFormToStorage();
        },
        saveFormToStorage() {
            localStorage.setItem('formData', JSON.stringify(this.formValues));
        },
        loadFormFromStorage() {
            const savedData = localStorage.getItem('formData');
            if (savedData) {
                this.formValues = JSON.parse(savedData);
                console.log(savedData);

            }
        },
        onSubmit() {
            if (!this.formData) {
                console.error('Данные формы отсутствуют.');
                return;
            }

            this.errors = [];
            this.formData.controls.forEach((control) => {
                if (control.required && !this.formValues[control.id]) {
                    this.errors.push(`${control.caption} обязательно для заполнения`);
                }
            });

            if (this.errors.length === 0) {
                console.log('Данные формы:', this.formValues);
                localStorage.removeItem('formData');
            }
        },
        onReset() {
             this.formValues = {};
            localStorage.removeItem('formData');
        },
        isControlVisible(control) {
            if (!control.visibilityDependsOn) {
                return true;
            }

            const dependency = control.visibilityDependsOn;
            const dependentValue = this.formValues[dependency.controlId];

            return dependentValue === dependency.value;
        }
    },
});
</script>

<style>
form {
    max-width: 400px;
    margin: 0 auto;
}

div {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 5px;
}

select {
    width: 100%;
    padding: 8px;
    margin-bottom: 5px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin: 5px 15px;
}

button:hover {
    background-color: #45a049;
}

.errors {
    color: red;
}
</style>

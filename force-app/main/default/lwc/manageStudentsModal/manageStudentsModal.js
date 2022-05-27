import { LightningElement, api, track } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentsAssignmentController.getAllStudents';
import changeRegistration from '@salesforce/apex/StudentsAssignmentController.changeRegistration';

export default class ManageStudentsModal extends LightningElement {

    @api recordId;
    @api registeredStudents = [];
    @track options = [];
    @track values = [];
    selectedStudents = [];
    toAdd = [];
    toDelete = [];
    disabledButton = true;

    closeModal() {
        this.dispatchEvent(new CustomEvent("closemodal"));
    }

    connectedCallback() {
        getAllStudents()
        .then(data => {
            this.options = data.map(record => ({ label: record.name, value: record.id }));
            this.values = this.registeredStudents.map(record => record.id);
        })
        .catch(error => {
            this.error = error;
        })
    }

    handleChange(event) {
        this.selectedStudents = event.detail.value;
        if (this.selectedStudents.length >= 0) {
            this.disabledButton = false;
        }
    }

    submitDetails() {
        this.toAdd = this.selectedStudents.filter(x => !this.registeredStudents.map(item => item.id).includes(x));
        this.toDelete = this.registeredStudents.map(item => item.id).filter(x => !this.selectedStudents.includes(x));
        changeRegistration ({ currentCourseId: this.recordId, toAdd: this.toAdd, toDelete: this.toDelete})
        .then(() => {
            this.dispatchEvent(new CustomEvent('refreshstudents'))
            this.closeModal();
        });
    }
}
import { LightningElement, api, track } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentsAssignmentController.getAllStudents';

export default class ManageStudentsModal extends LightningElement {

    @api recordId;
    @api registeredStudents = [];
    @track options = [];
    @track values = [];
    selectedStudents = [];

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
    }
    
}
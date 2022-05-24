import { LightningElement, api, wire, track } from 'lwc';
import getStudents from '@salesforce/apex/StudentsAssignmentController.getStudents';

const DELAY = 300;

export default class studentsAssignment extends LightningElement {

    searchKey = '';
    @api recordId;
    @track showModal = false;
    students = [];

    openModal() {
        this.showModal = true;
    }
    closeModal() {
        this.showModal = false;
    }

    @wire(getStudents, { currentCourseId: '$recordId', searchKey: '$searchKey' })
    wiredStudents({ error, data }) {
        if (data) {
            this.students = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }
}
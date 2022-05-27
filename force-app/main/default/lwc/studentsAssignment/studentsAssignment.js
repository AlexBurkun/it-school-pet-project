import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getStudents from '@salesforce/apex/StudentsAssignmentController.getStudents';

const DELAY = 300;

export default class studentsAssignment extends LightningElement {

    searchKey = '';
    wiredStudentsResult;
    @api recordId;
    @track showModal = false;
    students = [];

    openModal() {
        this.showModal = true;
        this.searchKey = '';
    }
    closeModal() {
        this.showModal = false;
    }

    @wire(getStudents, { currentCourseId: '$recordId', searchKey: '$searchKey' })
    wiredStudents(result) {
        this.wiredStudentsResult = result;
        if (result.data) {
            this.students = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.students = undefined;
        }
    }

    successHandler() {
        const toast = new ShowToastEvent({
            title: 'Registration changing',
            message: 'Students registration were successfully changed!',
            variant: 'success',
        });
        this.dispatchEvent(toast);
        return refreshApex(this.wiredStudentsResult);
    }

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }
}
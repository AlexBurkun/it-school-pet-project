import { LightningElement } from 'lwc';

export default class ManageStudentsModal extends LightningElement {

    closeModal() {
        this.dispatchEvent(new CustomEvent("closemodal"));
    }
    
}
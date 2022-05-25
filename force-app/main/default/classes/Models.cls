public class Models {
    public class Student {
        @AuraEnabled
        public Id id;
        @AuraEnabled
        public String name;

        public Student(Registration__c record) {
            this.id = record.Student__c;
            this.name = record.Student__r.Name;
        }

        public Student(Student__c record) {
            this.id = record.Id;
            this.name = record.Name;
        }
    }
}

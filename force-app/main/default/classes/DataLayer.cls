public with sharing class DataLayer {
    public static List<Registration__c> getStudents(Id currentCourseId, String searchKey) {
        Boolean checkStudentReadAccess = SecurityUtil.checkStudentReadAccess();
        String key = '%' + searchKey + '%';
        List<Registration__c> currentCourseStudents = [
            SELECT Id, Student__c, Student__r.Name 
            FROM Registration__c 
            WHERE Course__c = :currentCourseId
                AND Student__r.Name LIKE :key
        ];
        return currentCourseStudents;
    }

    public static List<Student__c> getAllStudents() {
        Boolean checkStudentReadAccess = SecurityUtil.checkStudentReadAccess();
        List<Student__c> allStudents = [SELECT Id, Name FROM Student__c];
        return allStudents;
    }

    public static void changeRegistration(Id currentCourseId, List<Id> toAdd, List<Id> toDelete) {
        List<Registration__c> studentsToAdd = new List<Registration__c>();
        for (Id forInsert: toAdd) {
            studentsToAdd.add(new Registration__c(Course__c = currentCourseId, Student__c = forInsert));
        }
        List<Registration__c> studentsToDelete = [SELECT Id FROM Registration__c WHERE Course__c = :currentCourseId AND Student__c IN :toDelete];
        insert studentsToAdd;
        delete studentsToDelete;
    }
}

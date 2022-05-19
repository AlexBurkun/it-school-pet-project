public with sharing class StudentsAssignmentController {

    @AuraEnabled(cacheable=true)
    public static List<Registration__c> getStudents(Id currentCourse, String searchKey) {
        String key = '%' + searchKey + '%';
        List<Registration__c> currentCourseStudents = [
            SELECT Id,
                   Student__c,
                   Student__r.Name 
            FROM Registration__c 
            WHERE Course__c = :currentCourse 
                AND Student__r.Name LIKE :key
            WITH SECURITY_ENFORCED
        ];
        return currentCourseStudents;
    }
}
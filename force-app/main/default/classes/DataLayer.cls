public with sharing class DataLayer {
    public static List<Registration__c> getStudents(Id currentCourseId, String searchKey) {
        String key = '%' + searchKey + '%';
        List<Registration__c> currentCourseStudents = [
            SELECT Id, Student__c, Student__r.Name 
            FROM Registration__c 
            WHERE Course__c = :currentCourseId
                AND Student__r.Name LIKE :key
        ];
        return currentCourseStudents;
    }
}

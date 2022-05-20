public with sharing class SecurityUtil {
    public static Boolean checkStudentReadAccess() {
        if (!Schema.sObjectType.Student__c.isAccessible()) {
            throw new AuraHandledException('You don\'n have access to the object');
        }
        return true;
    }
}

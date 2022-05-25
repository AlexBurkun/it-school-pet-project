public with sharing class StudentsAssignmentController {
    private static Boolean checkValidity(Id currentCourseId) {
        if (currentCourseId == NULL) {
            throw new AuraHandledException('Id not found');
        }  
        String sObjName = currentCourseId.getSObjectType().getDescribe().getName();
        if (sObjName != 'Course__c') {
            throw new AuraHandledException('Id don\'t belong to Course Object');
        }
        return true;
    }

    @AuraEnabled(cacheable=true)
    public static List<Models.Student> getStudents(Id currentCourseId, String searchKey) {
        Boolean checkValidity = StudentsAssignmentController.checkValidity(currentCourseId);
        List<Models.Student> currentCourseStudentsModels = StudentAssignmentHelper.getStudents(currentCourseId, searchKey);
        return currentCourseStudentsModels;
    }

    @AuraEnabled(cacheable=true)
    public static List<Models.Student> getAllStudents() {
        List<Models.Student> allStudents = StudentAssignmentHelper.getAllStudents();
        return allStudents;
    }
}
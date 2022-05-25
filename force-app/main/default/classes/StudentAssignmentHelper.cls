public with sharing class StudentAssignmentHelper {
    public static List<Models.Student> getStudents(Id currentCourseId, String searchKey) {
        List<Registration__c> currentCourseStudents = DataLayer.getStudents(currentCourseId, searchKey);
        List<Models.Student> models = new List<Models.Student>();
        for (Registration__c createStudentsModels: currentCourseStudents) {
            models.add(new Models.Student(createStudentsModels));
        }
        return models;
    }

    public static List<Models.Student> getAllStudents() {
        List<Student__c> allStudents = DataLayer.getAllStudents();
        List<Models.Student> models = new List<Models.Student>();
        for (Student__c createStudentsModels: allStudents) {
            models.add(new Models.Student(createStudentsModels));
        }
        return models;
    }
}

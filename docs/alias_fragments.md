```
{
  AllCourses: getCourses{
    ...CourseFields
  }

  Course1: getCourse(id:"5e8682735d7b2d31c3cb1f95"){
    ...CourseFields
    teacher
  }
  Course2: getCourse(id:"5e8682735d7b2d31c3cb1f95"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}
```

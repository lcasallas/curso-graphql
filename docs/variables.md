##### Para tipo queries

```
query GetCourse2 ($course: ID!){
  getCourse(id: $course){
    _id
    title
    people{
      _id
      name
    }
  }
}
```

#### Para tipo mutation

```
mutation AddPersonToCourse2 ($course: ID!, $person: ID!){
  addPeople(courseID:$course, personID:$person){
    _id
    title
  }
}
```

```
mutation CreateNewCourse($createinput: CourseInput!) {
  createCourse(input: $createinput){
  	_id
    title
    level
  }
}
```

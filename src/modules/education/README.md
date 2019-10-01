## Get all categories

This endpoint returns all categories.

##### HTTP REQUEST

`GET /education/category`

##### RESPONSE

```json
[
  {
    "uid": "7c9323ba-9f26-4718-896c-1cc287e7d140",
    "name": "Mathematics",
    "description": "Learn fundamentals of algebra,...",
    "overview": "Category1 overview"
  },
  {
    "uid": "c3dd1282-5f5b-4d30-ab0f-9c5b51e4cf9e",
    "name": "Computer Science",
    "description": "Learn programming, fundamentals of computing,...",
    "overview": "Category2 overview"
  }
]
```


## Get subcategories

This endpoint returns all subcategories of some category.

##### HTTP REQUEST

`GET /education/category/:categoryUid/subcategory`

##### RESPONSE

```json
[
  {
    "uid": "7c9323ba-45d1-49f4-b994-628fc5d113da",
    "name": "Programming in JavaScript",
    "description": "SubCategory1 description"
  },
  {
     "uid": "29e3a29c-45d1-49f4-b994-628fc5d113da",
     "name": "Arduino Programming",
     "description": "SubCategory2 description"
   }
]
```


## Get courses

This endpoint returns all courses of some subcategory.

##### HTTP REQUEST

`GET /education/category/:categoryUid/subcategory/:subcategoryUid/course`

##### RESPONSE

```json
[
  {
    "uid": "3c283e40-0b2b-48a8-810d-0a9ceedf5c85",
    "title": "Javascript fundamentals",
    "description": "Test course 2",
    "tags": ["js", "programming"],
    "content": "# Test markdown content",
    "created": "2019-09-25"
  },
  {
    "uid": "a127b2a4-cd32-411a-840a-5d6c8d2abb76",
    "title": "Javascript vs Java",
    "description": "Test course 1",
    "tags": ["js", "java", "programming"],
    "content": "# Test markdown content",
    "created": "2019-09-25"
  }
]
```
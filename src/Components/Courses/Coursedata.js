const courses = [
  {
    id: "1",
    title: "Frontend Development",
    description:
      "Learn frontend web development using modern technologies such as HTML, CSS, and JavaScript. Build interactive user interfaces and responsive web applications. This course covers fundamental concepts and advanced techniques in frontend development.",
    category: "Frontend",
    image: "https://img-c.udemycdn.com/course/750x422/1199058_8435_3.jpg",
    prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript"],
    duration: "6 weeks",
    lectures: 12,
    assignments: 8,
    instructor: "John Doe",
    videos: [
      {
        id: "1",
        title: "Introduction to HTML",
        url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
        poster: "https://mdbootstrap.com/wp-content/uploads/2019/01/html.jpg",
        subvideos: [
          {
          id: "1",
          title: "1.HTML Introduction",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          poster: "https://mdbootstrap.com/wp-content/uploads/2019/01/html.jpg",
          },
          {
            id: "2",
            title: "2.HTML Introduction",
            url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
            poster: "https://mdbootstrap.com/wp-content/uploads/2019/01/html.jpg",
            },
            

        ]
      },
      {
        id: "2",
        title: "Styling with CSS",
        url: "https://www.youtube.com/watch?v=ZXsQAXx_ao0",
        poster:"https://mdbootstrap.com/wp-content/uploads/2019/01/css.jpg",
        subvideos: [
          {
          id: "1",
          title: "1.CSS Styling",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          poster: "https://mdbootstrap.com/wp-content/uploads/2019/01/css.jpg",
          },
          {
            id: "2",
            title: "2.CSS Styling",
            url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
            poster: "https://mdbootstrap.com/wp-content/uploads/2019/01/css.jpg",
            },
            

        ]
      },
      {
        id: "3",
        title: "JavaScript Basics",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        poster:"https://img-c.udemycdn.com/course/750x422/917724_114b_12.jpg",
        subvideos: [
          {
          id: "1",
          title: "1.Javascript Scripts",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          poster: "https://img-c.udemycdn.com/course/750x422/917724_114b_12.jpg",
          },
          {
            id: "2",
            title: "2.Javascript Scripts",
            url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
            poster: "https://img-c.udemycdn.com/course/750x422/917724_114b_12.jpg",
            },
            

        ]
      },
    ],
  },
  {
    id: "2",
    title: "Backend Development",
    description:
      "Master backend development concepts and techniques using frameworks like Node.js, Express, and databases like MongoDB. Create powerful server-side applications and APIs. This course covers both the basics and advanced topics in backend development.",
    category: "Backend",
    image: "https://www.amigoscode.com/assets/thumbnails/courses/javascript-mastery.png",
    prerequisites: ["Intermediate knowledge of JavaScript"],
    duration: "8 weeks",
    lectures: 14,
    assignments: 10,
    instructor: "Jane Smith",
    videos: [
      {
        id: "1",
        title: "Node.js Basics",
        url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
        poster: "https://wallpapercave.com/wp/wp12220879.png",
      },
      {
        id: "2",
        title: "Express.js Routing",
        url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        poster: "https://mdbootstrap.com/wp-content/uploads/2019/01/html.jpg",
      },
    ],
  },
    {
      id: "3",
      title: "Database Management",
      description:
        "Explore database management systems (DBMS) including SQL and NoSQL databases. Learn to design, implement, and optimize databases for efficient data storage and retrieval. This course covers relational and non-relational database concepts.",
      category: "Database",
      image: "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/6496a7fb16c8.png",
      prerequisites: ["Basic understanding of databases"],
      duration: "7 weeks",
      lectures: 10,
      assignments: 6,
      instructor: "Alex Johnson",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
    {
      id: "4",
      title: "JavaScript Fundamentals",
      description:
        "Get started with JavaScript programming language. Learn the basics of JavaScript syntax, data types, control flow, and functions. Build foundational skills for web development. This course is suitable for beginners.",
      category: "Frontend",
      image: "https://img-c.udemycdn.com/course/750x422/1489822_4768_4.jpg",
      prerequisites: ["No prerequisites required"],
      duration: "4 weeks",
      lectures: 8,
      assignments: 5,
      instructor: "Emily Brown",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
    {
      id: "5",
      title: "Node.js Essentials",
      description:
        "Learn the essentials of Node.js runtime environment. Build scalable and efficient server-side applications using Node.js, and explore its ecosystem of modules and libraries. This course is for developers interested in backend development.",
      category: "Backend",
      image: "https://www.weetechsolution.com/wp-content/uploads/2022/08/What-is-Nodejs.jpg",
      prerequisites: ["Intermediate knowledge of JavaScript"],
      duration: "5 weeks",
      lectures: 10,
      assignments: 7,
      instructor: "Michael Clark",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
    {
      id: "6",
      title: "SQL Mastery",
      description:
        "Master Structured Query Language (SQL) for relational databases. Learn to create, query, and manipulate databases using SQL commands. Develop skills essential for data management. This course covers advanced SQL topics.",
      category: "Database",
      image: "https://img-c.udemycdn.com/course/480x270/928212_c8af_2.jpg",
      prerequisites: ["Basic understanding of databases"],
      duration: "6 weeks",
      lectures: 12,
      assignments: 8,
      instructor: "Sophia Miller",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
    {
      id: "7",
      title: "React.js Basics",
      description:
        "Discover the basics of React.js library for building user interfaces. Learn about components, props, state management, and JSX syntax. Start building interactive web applications with React. This course is suitable for beginners.",
      category: "Frontend",
      image: "https://img-b.udemycdn.com/course/750x422/1254420_f6cb_4.jpg",
      prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript"],
      duration: "5 weeks",
      lectures: 10,
      assignments: 6,
      instructor: "David Wilson",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
          poster: "https://example.com/poster1.jpg", 

        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
    {
      id: "8",
      title: "Data Structures",
      description:
        "Discover the basics of React.js library for building user interfaces. Learn about components, props, state management, and JSX syntax. Start building interactive web applications with React. This course is suitable for beginners.",
      category: "DSA",
      image: "https://img-b.udemycdn.com/course/480x270/5833610_d40b.jpg",
      prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript"],
      duration: "5 weeks",
      lectures: 10,
      assignments: 6,
      instructor: "David Wilson",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
          poster: "https://example.com/poster1.jpg", 

        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
    {
      id: "8",
      title: "Calculus 1",
      description:
        "Discover the basics of React.js library for building user interfaces. Learn about components, props, state management, and JSX syntax. Start building interactive web applications with React. This course is suitable for beginners.",
      category: "Math",
      image: "https://cdn.vectorstock.com/i/preview-1x/81/74/algebra-concept-thin-line-golden-horizontal-banner-vector-47578174.jpg",
      prerequisites: ["Basic knowledge of HTML, CSS, and JavaScript"],
      duration: "5 weeks",
      lectures: 10,
      assignments: 6,
      instructor: "David Wilson",
      videos: [
        {
          id: "1",
          title: "Node.js Basics",
          url: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
          poster: "https://example.com/poster1.jpg", 

        },
        {
          id: "2",
          title: "Express.js Routing",
          url: "https://www.youtube.com/watch?v=JRtHBq29Ck0",
        },
      ],
    },
  ];
  
  export default courses;
  
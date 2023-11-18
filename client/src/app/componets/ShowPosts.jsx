import React, { useEffect, useState } from 'react';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {}, [
    fetch(`/api/v1/posts?skip=${page}&limit=10`)
      .then(res.json())
      .then(() => setPosts(res.data)),
  ]);

  return (
    <div>
      {posts.map((post) => {
        return (
          <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>{tags}</p>
          </>
        );
      })}
    </div>
  );
};

export default ShowPosts;

// dummy post data
// "posts": [
//     {
//         "title": "post 1",
//         "description": "description 1"
//     },
//     {
//         "title": "post 2",
//         "description": "description 2"
//     },
//     {
//         "title": "post 3",
//         "description": "description 3"
//     },
//     {
//         "title": "post 4",
//         "description": "description 4"
//     },
//     {
//         "title": "post 5",
//         "description": "description 5"
//     },
//     {
//         "title": "post 6",
//         "description": "description 6"
//     },
//     {
//         "title": "post 7",
//         "description": "description 7"
//     },
//     {
//         "title": "post 8",
//         "description": "description 8"
//     },
//     {
//         "title": "post 9",
//         "description": "description 9"
//     },
//     {
//         "title": "post 10",
//         "description": "description 10"
//     }
// ]

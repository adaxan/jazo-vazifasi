//! Foydalanuvchilar qoshish!!
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }
  function addUser(e) {
    e.preventDefault();
    const newUser = { id: users.length + 1, name, email };  
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow mt-20">
      <h1 className="text-xl font-bold text-center mb-4">Foydalanuvchilar</h1>
      <form onSubmit={addUser} className="space-y-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ism"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Qo'shish
        </button>
      </form>
      <ul className="mb-4">
        {users.map((user) => (
          <li key={user.id} className="p-3 border-b">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


//? Kitoblar qoshish
// import React, { useState } from "react";

// function App() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [auth, setAuth] = useState("");
//   function addBook(e) {
//     e.preventDefault();
//     const newBook = {
//       id: books.length + 1,
//       title,
//       auth,
//       status: "O'qilmagan",
//     };
//     setBooks([...books, newBook]);
//     setTitle("");
//     setAuth("");
//   }
//   function toggleStatus(id) {
//     const updatedBooks = books.map((book) =>
//       book.id == id
//         ? { ...book, status: book.status == "O'qilgan" ? "O'qilmagan" : "O'qilgan" }
//         : book
//     );
//     setBooks(updatedBooks);
//   }
//   function deleteBook(id) {
//     const updatedBooks = books.filter((book) => book.id !== id);
//     setBooks(updatedBooks);
//   }

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow mt-20">
//       <h1 className="text-xl font-bold text-center mb-4">Kitoblar Ro'yxati</h1>
//       <form onSubmit={addBook} className="space-y-4 mb-6">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Kitob nomi"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           value={auth}
//           onChange={(e) => setAuth(e.target.value)}
//           placeholder="Muallif ismi"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Kitob Qo'shish
//         </button>
//       </form>
//       <ul className="space-y-4">
//         {books.map((book) => (
//           <li
//             key={book.id}
//             className={`p-4 rounded shadow flex items-center justify-between ${
//               book.status == "O'qilgan" ? "bg-green-100" : "bg-red-100"
//             }`}
//           >
//             <div>
//               <p className="font-bold">{book.title}</p>
//               <p className="text-sm text-gray-700">{book.auth}</p>
//               <p className="text-xs mt-1">{book.status}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => toggleStatus(book.id)}
//                 className={`px-4 py-2 rounded text-white ${
//                   book.status == "O'qilgan" ? "bg-green-500" : "bg-red-500"
//                 }`}
//               >
//                 {book.status == "O'qilgan" ? "O'qilmagan" : "O'qilgan"}
//               </button>
//               <button
//                 onClick={() => deleteBook(book.id)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 O'chirish
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


//* Ish qidirish
// import React, { useState, useEffect } from "react";

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState(""); 
//   const [filteredPosts, setFilteredPosts] = useState([]); 
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data);
//         setFilteredPosts(data);
//       });
//   }, []);
//   function handleSearch(e) {
//     const query = e.target.value.toLowerCase();
//     setSearch(query);
//     const results = posts.filter((post) =>
//       post.title.toLowerCase().includes(query)
//     );
//     setFilteredPosts(results);
//   }

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow mt-20">
//       <h1 className="text-xl font-bold text-center mb-4">Ishlarni Filtrlash</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={search}
//           onChange={handleSearch}
//           placeholder="Sarlavha bo'yicha qidirish"
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <ul className="space-y-4">
//         {filteredPosts.length > 0 && (
//           filteredPosts.map((post) => (
//             <li
//               key={post.id}
//               className="p-4 bg-white rounded shadow border-b border-gray-200"
//             >
//               <h2 className="font-bold">{post.title}</h2>
//               <p className="text-sm text-gray-700">{post.body}</p>
//             </li>
//           ))
//         )
//           }
//       </ul>
//     </div>
//   );
// }

// export default App;

//? Film qidirish
// import React, { useState } from "react";

// function App() {
//   const [movieName, setMovieName] = useState(""); 
//   const [movies, setMovies] = useState([]); 
//   const [error, setError] = useState(""); 
//   function fetchMovies() {
//     const apiKey = "c5c6095"; 
//     const url = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.Response === "False") {
//           setError("Film topilmadi!");
//           setMovies([]);
//         } else {
//           setMovies(data.Search);
//           setError("");
//         }
//       })
//       .catch(() => {
//         setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring!");
//         setMovies([]);
//       });
//   }

//   return (
//     <div className="p-4 max-w-xl mx-auto bg-gray-100 rounded shadow mt-20">
//       <h1 className="text-xl font-bold text-center mb-4">Film Qidiruvi</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={movieName}
//           onChange={(e) => setMovieName(e.target.value)}
//           placeholder="Film nomini kiriting"
//           className="w-full p-2 border rounded"
//         />
//         <button
//           onClick={fetchMovies}
//           className="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Qidirish
//         </button>
//       </div>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {movies.map((movie) => (
//           <div key={movie.imdbID} className="bg-white rounded shadow p-4">
//             <img
//               src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
//               alt={movie.Title}
//               className="w-full h-64 object-cover rounded mb-2"
//             />
//             <h2 className="font-bold text-lg">{movie.Title}</h2>
//             <p className="text-gray-700">Yili: {movie.Year}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

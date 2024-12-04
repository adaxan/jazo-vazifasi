import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [auth, setAuth] = useState("");
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      });
  }, []);
  function addUser(e) {
    e.preventDefault();
    const newUser = { id: users.length + 1, name, email };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  }
  function addBook(e) {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      title,
      auth,
      status: "O'qilmagan",
    };
    setBooks([...books, newBook]);
    setTitle("");
    setAuth("");
  }
  function toggleStatus(id) {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? { ...book, status: book.status === "O'qilgan" ? "O'qilmagan" : "O'qilgan" }
        : book
    );
    setBooks(updatedBooks);
  }
  function deleteBook(id) {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(results);
  }
  function fetchMovies() {
    const apiKey = "c5c6095";
    const url = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setError("Film topilmadi!");
          setMovies([]);
        } else {
          setMovies(data.Search);
          setError("");
        }
      })
      .catch(() => {
        setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring!");
        setMovies([]);
      });
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded shadow mt-20 space-y-10">
      <h1 className="text-2xl font-bold text-center">Barcha Funksiyalar</h1>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Foydalanuvchilar</h2>
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
        <ul>
          {users.map((user) => (
            <li key={user.id} className="p-3 border-b">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Kitoblar</h2>
        <form onSubmit={addBook} className="space-y-4 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Kitob nomi"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={auth}
            onChange={(e) => setAuth(e.target.value)}
            placeholder="Muallif ismi"
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
        <ul>
          {books.map((book) => (
            <li key={book.id} className="p-4 border-b">
              <p>{book.title} - {book.auth}</p>
              <p>Status: {book.status}</p>
              <button onClick={() => toggleStatus(book.id)}>Statusni o'zgartirish</button>
              <button onClick={() => deleteBook(book.id)}>O'chirish</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Ishlarni Filtrlash</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Ishlarni qidirish"
          className="w-full p-2 border rounded mb-4"
        />
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id} className="p-4 border-b">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Filmlar Qidiruvi</h2>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Film nomini kiriting"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={fetchMovies}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
        >
          Qidirish
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="p-4 border rounded">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
                className="w-full h-64 object-cover mb-2"
              />
              <h3>{movie.Title}</h3>
              <p>Yili: {movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
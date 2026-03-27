import "./instagram.css";

export default function Instagram() {

  const posts = [
    {
      img: "https://placehold.co/400x400",
      link: "https://instagram.com/bellagi.modaintima"
    },
    {
      img: "https://placehold.co/400x400",
      link: "https://instagram.com/bellagi.modaintima"
    },
    {
      img: "https://placehold.co/400x400",
      link: "https://instagram.com/bellagi.modaintima"
    },
    {
      img: "https://placehold.co/400x400",
      link: "https://instagram.com/bellagi.modaintima"
    },
    {
      img: "https://placehold.co/400x400",
      link: "https://instagram.com/bellagi.modaintima"
    },
    {
      img: "https://placehold.co/400x400",
      link: "https://instagram.com/bellagi.modaintima"
    }
  ];

  return (
    <section className="instagram container">

      <div className="instagram-container">

        <span className="subtitle">NOSSO INSTAGRAM</span>
        <h2>Siga e inspire-se</h2>

        <div className="insta-grid">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-item"
            >
              <img src={post.img} alt="instagram post" />

              <div className="overlay">
                <span>📸</span>
              </div>
            </a>
          ))}
        </div>

        <a
          href="https://instagram.com/bellagi.modaintima"
          target="_blank"
          rel="noopener noreferrer"
          className="insta-btn"
        >
          @bellagi.modaintima
        </a>

      </div>

    </section>
  );
}
import "./_404.scss";

const Page_404: React.FC = () => {
  return (
    <section className="page_404">
      <img
        src="./img/_404.webp"
        alt="Page Not Found image"
        className="img_404"
      />
      <>
        <h1>Page was not found.</h1>
        <h3>
          Click <a href="/">here</a> to navigate back to the main page.
        </h3>
      </>
    </section>
  );
};

export default Page_404;

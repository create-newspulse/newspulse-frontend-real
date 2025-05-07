{article.urlToImage ? (
  <Image
    src={article.urlToImage}
    alt={article.title}
    width={400}
    height={250}
    className="rounded-t-md object-cover"
  />
) : (
  <Image
    src="/fallback.jpg"
    alt="No Image"
    width={400}
    height={250}
    className="rounded-t-md object-cover"
  />
)}

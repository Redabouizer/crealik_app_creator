import PropTypes from "prop-types"
import { Typography } from "@material-tailwind/react"

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear()

  return (
    <footer className="py-4">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}{" "}
          <a
            href={brandLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>{" "}
          - Connecting Brands with UGC Creators
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  brandName: "Crealik",
  brandLink: "https://crealik.ma",
  routes: [
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
}

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
}

Footer.displayName = "/src/widgets/layout/footer.jsx"

export default Footer

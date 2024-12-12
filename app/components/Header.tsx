export default function Header() {
  const links = [
    {
      label: 'Products',
      href: '/products',
    },
    {
      label: 'Solutions',
      href: '#',
    },
    {
      label: 'Resources',
      href: '#',
    },
    {
      label: 'About',
      href: '/about',
    },
  ]

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-2">
        <div className="flex lg:flex-1">
          <a href="/" className="flex max-w-52 py-2">
            <span className="sr-only">Your Company</span>
            <img
              src='/assets/logos/bloomreach.svg'
              alt='logo'
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
        {links.map((item) => (
          <a key={item.label} href={item.href} className="text-sm/6 font-semibold text-gray-900">
            {item.label}
          </a>
        ))}

        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log in
          </a>
        </div>
      </nav>

    </header>
  )
}
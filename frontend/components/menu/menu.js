import Link from 'next/link'

const Menu = props => {
	return (
		<ul>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<li>
				<Link href="/projects">
					<a>Our projects</a>
				</Link>
			</li>
			<li>
				<a href="https://boards.4channel.org/g/catalog#s=wdg" target="_blank" rel="noopener noreferrer">The latest /wdg/ thread</a>
			</li>
			<li>
				<a href="https://github.com/persunde/wdg-projects" target="_blank" rel="noopener noreferrer">This sites repo</a>
			</li>
		</ul>
	)
}

export default Menu
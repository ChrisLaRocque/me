// Card animation
const wraps = document.querySelectorAll('.card-wrap')

wraps.forEach(wrap => {
	const card = wrap.querySelector('.card');
	const cardScreen = card.querySelector('.card-screen')
	const screen = cardScreen.querySelector('.card-screen-img')
	const heading = card.querySelector('h3')
	const icons = card.querySelector('.icons')
	const button = card.querySelector('button')

	// Moving animation
	wrap.addEventListener('mousemove', (e) => {
		let xAxis = ((window.innerWidth / 2) - e.clientX) / 70;
		let yAxis = ((window.innerHeight / 2) - e.clientY) / 90;
		card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`
	})

	// Pop out on mouse enter
	wrap.addEventListener('mouseenter', (e) => {
		card.style.transition = 'none'
		// Pop out
		cardScreen.style.transform = "translateZ(90px)";
		heading.style.transform = "translateZ(80px)"
		icons.style.transform = "translateZ(60px)"
		button.style.transform = "translateZ(80px)"
		// Screen scroll, varied based on screen length
		screen.classList.contains('bc') ? screen.style.transform = "translateY(-800px)" : null
		screen.classList.contains('spartan') ? screen.style.transform = "translateY(-750px)" : null
		screen.classList.contains('pfs') ? screen.style.transform = "translateY(-400px)" : null
	})
	
	// Pop in on mouse leave
	wrap.addEventListener('mouseleave', (e) => {
		card.style.transition = 'all 0.5s ease'
		// Pop in
		card.style.transform = `rotateX(0deg) rotateY(0deg)`
		cardScreen.style.transform = "translateZ(0px)";
		heading.style.transform = "translateZ(0px)"
		icons.style.transform = "translateZ(0px)"
		button.style.transform = "translateZ(0px)"
		// Screen un-scroll
		screen.style.transform = "translateY(0px)"
	})
})

// Language icons hover
const iconContainers = document.querySelectorAll('.icons');
iconContainers.forEach(container => {
	const icons = container.querySelectorAll('span')
	icons.forEach(icon => {
		icon.addEventListener('mouseenter', (e) => {
			icon.style.transform = "scale(1.05)";
		})
		icon.addEventListener('mouseleave', (e) => {
			icon.style.transform = "scale(1)";
		})
	})
})

// Fullpage
new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
	navigation: false,
	anchors: ['top', 'projects', 'skills'],
	resetSliders: true,
	controlArrows: false,
});
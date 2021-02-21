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
		// console.log(e)
		let xAxis = ((window.innerWidth / 2) - e.clientX) / 50;
		let yAxis = ((window.innerHeight / 2) - e.clientY) / 50;

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
	licenseKey: '1F447BB1-4D004BDD-B7EFE2DF-8C8A359D',
	autoScrolling:true,
	navigation: false,
	anchors: ['top', 'projects', 'skills'],
	resetSliders: true,
	resetSlidersKey: 'EABFDA98-73DE4B01-93828DBA-8CF7CEEA',
	controlArrows: false,
});

// Observers
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const slideIn = new IntersectionObserver(function(entries){
	entries.forEach(entry => {
		let leftSlideys = entry.target.querySelectorAll('.left');
		let rightSlideys = entry.target.querySelectorAll('.right');
		if(entry.intersectionRatio > 0){
			leftSlideys.forEach(slidey => {
				let length = getRandomArbitrary(1, 3)
				slidey.style.animation = `slideLeft 2s forwards ease-in-out`;
				slidey.style.animationDelay = `${length}s`;
			})
			rightSlideys.forEach(slidey => {
				let length = getRandomArbitrary(0, 2)
				slidey.style.animation = `slideRight 2s forwards ease-in-out`;
				slidey.style.animationDelay = `${length}s`;
			})
		}
		else {
			leftSlideys.forEach(slidey => {
				slidey.style.animation = 'none';
			})
			rightSlideys.forEach(slidey => {
				slidey.style.animation = 'none';
			})
		}
	});
})
const slideFadeUp = new IntersectionObserver(function(entries){
	entries.forEach(entry => {
		let randoDelay = Math.random().toFixed(2);
		let slideys = entry.target.querySelectorAll('.slide-fade-up');
		if(entry.intersectionRatio > 0){
			for(let i = 0; i < slideys.length; i++){
				slideys[i].style.animation = `slideFadeUp 1s forwards ease-in-out`
				slideys[i].style.animationDelay = `${+(i * randoDelay)}s`
			}
		}
	})
})
const pullFocus = new IntersectionObserver(function(entries) {
	entries.forEach(entry => {
		let blur = entry.target.querySelector('.blur')
		// console.log('found a blur')
		if(entry.intersectionRatio > 0){
			blur.style.animation = `pullFocus 1s forwards ease-in-out`
			// console.log('set the animation on', entry.target, " to ", entry.target.style.animation)
		}
	})
})

const skillsSection = document.querySelector('.skills');
const skillTables = document.querySelectorAll('.skill-table')
const sections = document.querySelectorAll('.section')

slideIn.observe(skillsSection)
skillTables.forEach(skillTable => {
	slideFadeUp.observe(skillTable)
})
// sections.forEach(section => {
// 	pullFocus.observe(section)
// })